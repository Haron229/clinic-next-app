"use client";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Checkbox } from "@/components/ui/checkbox";
import { useState } from "react";

const formSchema = z.object({
  complaints: z.string(),
  anamnezis: z.string(),
  od: z.number(),
  os: z.number(),
  eyelids: z.string(),
  conjunctiva: z.string(),
  cornea: z.string(),
  frontCam: z.string(),
  lacrimal: z.string(),
  iris: z.string(),
  pupil: z.string(),
  lens: z.string(),
  vitreous: z.string(),
});

const Conclusion = ({ params }: { params: { id: string } }) => {
  const [isChecked, setIsChecked] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      complaints: "",
      anamnezis: "",
      od: 1.0,
      os: 1.0,
      eyelids: "",
      conjunctiva: "",
      cornea: "",
      frontCam: "",
      lacrimal: "",
      iris: "",
      pupil: "",
      lens: "",
      vitreous: "",
    },
  });

  return (
    <div className="container py-20">
      <div className="flex flex-col items-end">
        <Link href={"/account"}>
          <Button className="h-[71px] text-[24px]">
            Вернуться к списку приёмов
          </Button>
        </Link>
        <div className="pt-20 text-[24px]">Пациент: </div>
      </div>
      <Form {...form}>
        <form className="flex flex-col gap-5 text-xl">
          <FormLabel className="text-[32px] pb-[30px]">
            Офтальмологический анамнез
          </FormLabel>
          <FormField
            control={form.control}
            name="complaints"
            render={({ field }) => (
              <FormItem>
                <div className="flex flex-row gap-[30px]">
                  <FormLabel>Жалобы:</FormLabel>
                  <FormControl>
                    <Textarea {...field} />
                  </FormControl>
                </div>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="anamnezis"
            render={({ field }) => (
              <FormItem>
                <div className="flex flex-row gap-[30px]">
                  <FormLabel>Анамнез:</FormLabel>
                  <FormControl>
                    <Textarea {...field} />
                  </FormControl>
                </div>
              </FormItem>
            )}
          />
          <FormLabel className="text-[32px] pt-10 pb-5">
            Осмотр органов зрения
          </FormLabel>
          <div className="flex flex-col gap-5 text-xl max-w-lg">
            <FormField
              control={form.control}
              name="od"
              render={({ field }) => (
                <FormItem>
                  <div className="flex flex-row items-center gap-[30px]">
                    <FormLabel>OD: острота зрения без коррекции</FormLabel>
                    <FormControl>
                      <Input {...field} className="w-[50px]" />
                    </FormControl>
                  </div>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="os"
              render={({ field }) => (
                <FormItem>
                  <div className="flex flex-row items-center gap-[30px]">
                    <FormLabel>OS: острота зрения без коррекции</FormLabel>
                    <FormControl>
                      <Input {...field} className="w-[50px]" />
                    </FormControl>
                  </div>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="eyelids"
              render={({ field }) => (
                <FormItem>
                  <div className="flex flex-row items-center gap-[30px]">
                    <FormLabel>Веки:</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                  </div>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="conjunctiva"
              render={({ field }) => (
                <FormItem>
                  <div className="flex flex-row items-center gap-[30px]">
                    <FormLabel>Конъюнктива:</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                  </div>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="cornea"
              render={({ field }) => (
                <FormItem>
                  <div className="flex flex-row items-center gap-[30px]">
                    <FormLabel>Роговица:</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                  </div>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="frontCam"
              render={({ field }) => (
                <FormItem>
                  <div className="flex flex-row items-center gap-[30px]">
                    <FormLabel className="text-nowrap">
                      Передняя камера:
                    </FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                  </div>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="lacrimal"
              render={({ field }) => (
                <FormItem>
                  <div className="flex flex-row items-center gap-[30px]">
                    <FormLabel className="text-nowrap">
                      Слёзные органы:
                    </FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                  </div>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="iris"
              render={({ field }) => (
                <FormItem>
                  <div className="flex flex-row items-center gap-[30px]">
                    <FormLabel className="text-nowrap">
                      Радужная оболочка:
                    </FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                  </div>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="pupil"
              render={({ field }) => (
                <FormItem>
                  <div className="flex flex-row items-center gap-[30px]">
                    <FormLabel>Зрачок:</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                  </div>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="lens"
              render={({ field }) => (
                <FormItem>
                  <div className="flex flex-row items-center gap-[30px]">
                    <FormLabel>Хрусталик:</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                  </div>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="vitreous"
              render={({ field }) => (
                <FormItem>
                  <div className="flex flex-row items-center gap-[30px]">
                    <FormLabel className="text-nowrap">
                      Стекловидное тело:
                    </FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                  </div>
                </FormItem>
              )}
            />
            <div className="flex flex-row items-center gap-[30px] py-10">
              <Checkbox onCheckedChange={() => setIsChecked(!isChecked)} />
              <FormLabel>Подтвердить введённые данные</FormLabel>
            </div>
            <div className="flex flex-row gap-[30px]">
              <Button
                className="h-[71px] text-[24px] disabled:bg-[#ECECEC]"
                disabled={!isChecked}
              >
                Распечатать
              </Button>
              <Button
                type="submit"
                className="h-[71px] text-[24px] disabled:bg-[#ECECEC]"
                disabled={!isChecked}
              >
                Отправить результаты осмотра
              </Button>
            </div>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default Conclusion;
