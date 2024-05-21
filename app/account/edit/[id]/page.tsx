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

const formSchema = z.object({
  firstName: z.string(),
  lastName: z.string(),
  patronymic: z.string(),
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

    const res = await fetch("/api/users/add", {
      method: isExisting ? "PATCH" : "POST",
      body: JSON.stringify(userData),
    });
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <FormField
          control={form.control}
          name="firstName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Имя</FormLabel>
              <FormControl>
                <Input />
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
                <Input />
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="patronymic"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Отчетсво</FormLabel>
              <FormControl>
                <Input />
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
                <Input />
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
                <Input />
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
                <Input />
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
                <Input />
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
                <Input />
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
                <Input />
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
                <Input />
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
                <Input />
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
                <Input />
              </FormControl>
            </FormItem>
          )}
        />
        <Button type="submit">Сохранить</Button>
      </form>
    </Form>
  );
};

export default EditAccount;
