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
import { User } from "@/lib/types";
import { useUser } from "@clerk/nextjs";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import Image from "next/image";
import Link from "next/link";
import mainLogo from "../../../../public/logo.png"

const formSchema = z.object({
  firstName: z.string(),
  lastName: z.string(),
  patronymic: z.string().optional(),
  birthDate: z.string(),
  pasport: z.string(),
  issued: z.string(),
  departmentCode: z.string(),
  dateOfIssue: z.string(),
  adress: z.string(),
  snils: z.string(),
  inn: z.string(),
  phoneNumber: z.string(),
});

const EditAccount = () => {
  const [isExisting, setIsExisting] = useState(false);

  const { user } = useUser();
  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  useEffect(() => {
    const getUserFromDb = async () => {
      const res = await fetch(`/api/users/${user?.id as string}`);

      if (res.ok) setIsExisting(true);
    };

    getUserFromDb();
  }, [user]);

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    const userData: User = {
      id: user?.id as string,
      email: user?.emailAddresses[0].emailAddress as string,
      verified: false,
      firstName: values.firstName,
      lastName: values.lastName,
      patronymic: values.patronymic,
      birthDate: values.birthDate,
      pasport: values.pasport,
      issued: values.issued,
      departmentCode: values.departmentCode,
      dateOfIssue: values.dateOfIssue,
      adress: values.adress,
      snils: values.snils,
      inn: values.inn,
      phoneNumber: values.phoneNumber,
    };

    if (isExisting) {
      const res = await fetch(`/api/users/${user?.id as string}`, {
        method: "PATCH",
        body: JSON.stringify(userData),
      });

      if (res.ok) router.push("/account");
    } else {
      const res = await fetch("/api/users/add", {
        method: "POST",
        body: JSON.stringify(userData),
      });

      if (res.ok) router.push("/account");
    }
  };

  return (
    <Form {...form}>
      <div className="flex items-center justify-between h-[150px]">
        <div className="pl-48 p-[0px] min-w-fit">
          <Image className="w-[105px] h-[50px]" src={mainLogo} alt="" />
        </div>
        <div className="mr-48">
          <Button>
            <Link href={"/account"}>Личный кабинет</Link>
          </Button>
        </div>
      </div>
      <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col ml-96 w-[600px]">
        <div className="text-2xl pb-8"><span>Заполните форму для завершения регистрации</span></div>
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
        <FormField
          control={form.control}
          name="birthDate"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Дата рождения</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="pasport"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Серия, номер паспорта</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="issued"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Кем выдан</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="departmentCode"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Код подразделения</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="dateOfIssue"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Дата выдачи</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="adress"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Адрес</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="snils"
          render={({ field }) => (
            <FormItem>
              <FormLabel>СНИЛС</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="inn"
          render={({ field }) => (
            <FormItem>
              <FormLabel>ИНН</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="phoneNumber"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Номер телефона</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
            </FormItem>
          )}
        />
        <Button type="submit" className="w-28 mt-5 mb-8">Сохранить</Button>
      </form>
    </Form>
  );
};

export default EditAccount;
