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
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Checkbox } from "@/components/ui/checkbox";
import { useEffect, useState } from "react";
import { MedicalConclusion, User } from "@/lib/types";

import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";

const formSchema = z.object({
  complaints: z.string(),
  anamnesis: z.string(),
  od: z.string(),
  os: z.string(),
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
  const [userData, setUserData] = useState<User | null>(null);

  const { user } = useUser();
  const router = useRouter();

  useEffect(() => {
    const getUserData = async () => {
      let res = await fetch(`/api/users/${params.id}`);
      setUserData(await res.json());
    };

    getUserData();
  }, [params.id]);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      complaints: "",
      anamnesis: "",
      od: "1.0",
      os: "1.0",
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

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    const conclusion: MedicalConclusion = {
      createdAt: new Date(),
      userId: userData?.id as string,
      doctorId: user?.id as string,
      complaints: values.complaints,
      anamnesis: values.anamnesis,
      od: parseInt(values.od),
      os: parseInt(values.os),
      eyelids: values.eyelids,
      conjunctiva: values.conjunctiva,
      cornea: values.cornea,
      frontCam: values.frontCam,
      lacrimal: values.lacrimal,
      iris: values.iris,
      pupil: values.pupil,
      lens: values.lens,
      vitreous: values.vitreous,
    };

    const res = await fetch("/api/conclusions/add", {
      method: "POST",
      body: JSON.stringify(conclusion),
    });

    if (res.ok) router.push("/account");
    else console.log(res.status);
  };

  return (
    <div className="container py-20">
      <div className="flex flex-col items-end">
        <Link href={"/account"}>
          <Button className="h-[71px] text-[24px]">
            Вернуться к списку приёмов
          </Button>
        </Link>
        <div className="pt-20 text-[24px]">
          Пациент:
          {` ${userData?.lastName} ${userData?.firstName} ${userData?.patronymic}`}
        </div>
      </div>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col gap-5 text-xl"
        >
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
            name="anamnesis"
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
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Выберите заключение" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="Спокойны">Спокойны</SelectItem>
                        <SelectItem value="Гиперемированы">
                          Гиперемированы
                        </SelectItem>
                        <SelectItem value="Отделяемое из мейбомиевых желез">
                          Отделяемое из мейбомиевых желез
                        </SelectItem>
                      </SelectContent>
                    </Select>
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
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Выберите заключение" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="Бледно-розовая">
                          Бледно-розовая
                        </SelectItem>
                        <SelectItem value="Чистая">Чистая</SelectItem>
                        <SelectItem value="Гиперемирована">
                          Гиперемирована
                        </SelectItem>
                        <SelectItem value="Рыхлая">Рыхлая</SelectItem>
                        <SelectItem value="Фолликулы">Фолликулы</SelectItem>
                        <SelectItem value="Отделяемое слизистое">
                          Отделяемое слизистое
                        </SelectItem>
                        <SelectItem value="Отделяемое гнойное">
                          Отделяемое гнойное
                        </SelectItem>
                        <SelectItem value="Отделяемое обильное">
                          Отделяемое обильное
                        </SelectItem>
                        <SelectItem value="Отделяемое скудное">
                          Отделяемое скудное
                        </SelectItem>
                      </SelectContent>
                    </Select>
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
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Выберите заключение" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="Прозрачная">Прозрачная</SelectItem>
                        <SelectItem value="Гладкая">Гладкая</SelectItem>
                        <SelectItem value="Сферичная">Сферичная</SelectItem>
                      </SelectContent>
                    </Select>
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
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Выберите заключение" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="Средней глубины">
                          Средней глубины
                        </SelectItem>
                        <SelectItem value="Глубокая">Глубокая</SelectItem>
                        <SelectItem value="Мелкая">Мелкая</SelectItem>
                        <SelectItem value="Влага прозрачная">
                          Влага прозрачная
                        </SelectItem>
                        <SelectItem value="Гифема">Гифема</SelectItem>
                        <SelectItem value="Гипопион">Гипопион</SelectItem>
                      </SelectContent>
                    </Select>
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
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Выберите заключение" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="1">1</SelectItem>
                        <SelectItem value="2">2</SelectItem>
                        <SelectItem value="3">3</SelectItem>
                        <SelectItem value="4">4</SelectItem>
                        <SelectItem value="5">5</SelectItem>
                        <SelectItem value="6">6</SelectItem>
                        <SelectItem value="7">7</SelectItem>
                        <SelectItem value="8">8</SelectItem>
                        <SelectItem value="9">9</SelectItem>
                      </SelectContent>
                    </Select>
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
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Выберите заключение" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="Сохранена">Сохранена</SelectItem>
                        <SelectItem value="Субатрофия">Субатрофия</SelectItem>
                        <SelectItem value="Атрофия зрачковой каймы">
                          Атрофия зрачковой каймы
                        </SelectItem>
                        <SelectItem value="Псевдоэксфолиации">
                          Псевдоэксфолиации
                        </SelectItem>
                      </SelectContent>
                    </Select>
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
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Выберите заключение" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="Круглый">Круглый</SelectItem>
                        <SelectItem value="Деформирован">
                          Деформирован
                        </SelectItem>
                        <SelectItem value="Реакция на свет живая">
                          Реакция на свет живая
                        </SelectItem>
                        <SelectItem value="Реакция на свет ослаблена">
                          Реакция на свет ослаблена
                        </SelectItem>
                        <SelectItem value="Реакция на свет отсутствует">
                          Реакция на свет отсутствует
                        </SelectItem>
                      </SelectContent>
                    </Select>
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
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Выберите заключение" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="Прозрачный">Прозрачный</SelectItem>
                        <SelectItem value="Помутнения субкапсулярные">
                          Помутнения субкапсулярные
                        </SelectItem>
                        <SelectItem value="Помутнения ядерные">
                          Помутнения ядерные
                        </SelectItem>
                        <SelectItem value="Помутнения заднекапсулярные">
                          Помутнения заднекапсулярные
                        </SelectItem>
                        <SelectItem value="Помутнения кортикальные">
                          Помутнения кортикальные
                        </SelectItem>
                      </SelectContent>
                    </Select>
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
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Выберите заключение" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="Прозрачное">Прозрачное</SelectItem>
                        <SelectItem value="Деструкция нитчатая">
                          Деструкция нитчатая
                        </SelectItem>
                        <SelectItem value="Деструкция астероидная">
                          Деструкция астероидная
                        </SelectItem>
                      </SelectContent>
                    </Select>
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
