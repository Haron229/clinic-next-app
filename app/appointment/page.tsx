"use client";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import Header from "@/components/Header";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { ru } from "date-fns/locale";
import { format } from "date-fns";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { useEffect, useRef, useState } from "react";
import { PopoverClose } from "@radix-ui/react-popover";
import { Appointment, Doctor } from "@/lib/types";
import { calculateTimeWindows } from "@/lib/utils";

import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";

const formSchema = z.object({
  doctor: z.string(),
  date: z.string(),
  time: z.string(),
});

const AppointmentPage = () => {
  const { user } = useUser();
  const router = useRouter();

  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [doctor, setDoctor] = useState<Doctor | null>(null);
  const [date, setDate] = useState<Date>();
  const [schedule, setSchedule] = useState<Appointment[] | null>(null);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  useEffect(() => {
    const getDoctorsList = async () => {
      const res = await fetch("/api/doctors");
      if (res.ok) setDoctors(await res.json());
    };

    getDoctorsList();
  }, []);

  useEffect(() => {
    setSchedule(null);
  }, [doctor, date]);

  const popoverClose = useRef<HTMLButtonElement>(null);
  const handleDateClick = (day: Date) => {
    form.setValue("date", day.toDateString());
    setDate(day);
    popoverClose?.current?.click();
  };

  const getDoctorSchedule = () => {
    if (doctor && date) {
      setSchedule(doctor.appointments?.filter(filterByDate) ?? []);
    }
  };

  const filterByDate = (appointment: Appointment) => {
    return appointment.date === date?.toDateString() ? true : false;
  };

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    const appointment: Appointment = {
      userId: user?.id as string,
      doctorId: values.doctor,
      date: values.date,
      time: values.time,
      isFinished: false,
    };

    const res = await fetch("/api/appointments/add", {
      method: "POST",
      body: JSON.stringify(appointment),
    });

    if (res.ok) router.push("/account");
    else console.log(res.status);
  };

  return (
    <>
      <Header />
      <div>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="container">
            <h2 className="text-2xl">Запись на прием</h2>
            <FormField
              control={form.control}
              name="doctor"
              render={({ field }) => (
                <FormItem className="py-14">
                  <div className="flex justify-between w-full pb-14">
                    <FormLabel className="text-[24px]">
                      Услуга: осмотр
                    </FormLabel>
                    <span>Стоимость: 1000 рублей</span>
                  </div>
                  <Select
                    onValueChange={(value) => {
                      field.onChange(value);
                      setDoctor(doctors.find(({ id }) => id === value) ?? null);
                    }}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger className="w-[630px]">
                        <SelectValue placeholder="Специалист" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {doctors.map((doc, i) => {
                        return (
                          <SelectItem key={i} value={`${doc.id}`}>
                            {`${doc.lastName} ${doc.firstName} ${doc.patronymic}`}
                          </SelectItem>
                        );
                      })}
                    </SelectContent>
                  </Select>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="date"
              render={({ field }) => (
                <FormItem className="flex justify-between w-[630px]">
                  <div className="flex items-end gap-5">
                    <FormLabel className="text-[20px]">Дата:</FormLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button variant={"outline"} className="h-8">
                            {date
                              ? format(date, "dd.MM.yyyy")
                              : "Выберите дату"}
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto" align="start">
                        <Calendar
                          locale={ru}
                          mode="single"
                          selected={date}
                          onDayClick={handleDateClick}
                        />
                      </PopoverContent>
                      <PopoverClose ref={popoverClose} />
                    </Popover>
                  </div>
                  <Button
                    className="float-right"
                    onClick={() => getDoctorSchedule()}
                  >
                    Поиск
                  </Button>
                </FormItem>
              )}
            />
            {doctor && date && schedule && (
              <>
                <FormField
                  control={form.control}
                  name="time"
                  render={({ field }) => (
                    <FormItem className="py-10">
                      <div className="flex items-end gap-5">
                        <FormLabel className="text-[20px] text-nowrap">
                          Время приема:
                        </FormLabel>
                        <Select onValueChange={field.onChange}>
                          <FormControl>
                            <SelectTrigger className="w-fit">
                              <SelectValue placeholder="Выберите время приема" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {calculateTimeWindows(doctor).map(
                              (appointmentTime, i) => {
                                if (
                                  !schedule.find(
                                    ({ time }) => time === appointmentTime
                                  )
                                )
                                  return (
                                    <SelectItem key={i} value={appointmentTime}>
                                      {appointmentTime}
                                    </SelectItem>
                                  );
                              }
                            )}
                          </SelectContent>
                        </Select>
                      </div>
                    </FormItem>
                  )}
                />
                <Button
                  type="submit"
                  className="h-[68px] w-[278px] text-[20px]"
                >
                  Подтвердить выбор
                </Button>
              </>
            )}
          </form>
        </Form>
      </div>
    </>
  );
};

export default AppointmentPage;
