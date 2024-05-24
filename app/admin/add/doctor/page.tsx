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
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Doctor } from "@/lib/types";
import { useRouter } from "next/navigation";
import { useSignUp } from "@clerk/nextjs";

const formSchema = z.object({
  email: z.string().email(),
  password: z.string(),
  firstName: z.string(),
  lastName: z.string(),
  patronymic: z.string(),
  startTime: z.string(),
  endTime: z.string(),
  breakTime: z.string(),
  appointmentDuration: z.string(),
});

const AddDoctorPage = () => {
  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    const doctor: Doctor = {
      id: "",
      email: values.email,
      firstName: values.firstName,
      lastName: values.lastName,
      patronymic: values.patronymic,
      startTime: values.startTime,
      endTime: values.endTime,
      breakTime: values.breakTime,
      appointmentDuration: values.appointmentDuration,
    };

    const res = await fetch("/api/doctors/add", {
      method: "POST",
      body: JSON.stringify(doctor),
    });

    if (res.ok) {
      router.push("/admin");
    } else console.log(res.status);
  };

  return (
    <Form {...form}>
      <div className="flex items-center justify-between h-[130px] ml-20">
          <Button
            className="w-28"
            onClick={() => {
              router.back();
            }}
          >
            Назад
          </Button>
      </div>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col gap-5 w-[560px] ml-96"
      >
        <div className="flex justify-between gap-10">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Пароль</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
              </FormItem>
            )}
          />
          </div>
          <div className="">
            <div>
              <FormField
              control={form.control}
              name="lastName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Фамилия</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="firstName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Имя</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="patronymic"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Отчество</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                </FormItem>
              )}
            />
          </div>
        </div>
        <div className="flex justify-between gap-10">
          <FormField
            control={form.control}
            name="startTime"
            render={({ field }) => (
              <FormItem>
                <div className="flex items-center justify-between w-64">
                  <FormLabel className="text-nowrap">
                    Начало рабочего дня:
                  </FormLabel>
                  <FormControl>
                    <Input {...field} className="w-16" />
                  </FormControl>
                </div>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="endTime"
            render={({ field }) => (
              <FormItem>
                <div className="flex items-center justify-between w-64">
                  <FormLabel className="text-nowrap">
                    Конец рабочего дня:
                  </FormLabel>
                  <FormControl>
                    <Input {...field} className="w-16" />
                  </FormControl>
                </div>
              </FormItem>
            )}
          />
        </div>
        <FormField
          control={form.control}
          name="breakTime"
          render={({ field }) => (
            <FormItem>
              <div className="flex justify-between items-center w-64">
                <FormLabel>Обед:</FormLabel>
                <FormControl>
                  <Input {...field} className="w-16" />
                </FormControl>
              </div>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="appointmentDuration"
          render={({ field }) => (
            <FormItem>
              <div className="flex justify-between items-center w-64">
                <FormLabel className="text-nowrap">
                  Длительность приема:
                </FormLabel>
                <FormControl>
                  <Input {...field} className="w-16" />
                </FormControl>
              </div>
            </FormItem>
          )}
        />
        <Button type="submit" className="w-64">
          Добавить
        </Button>
      </form>
    </Form>
  );
};

export default AddDoctorPage;
