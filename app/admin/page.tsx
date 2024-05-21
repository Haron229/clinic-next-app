"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Doctor, User } from "@/lib/types";
import { Button } from "@/components/ui/button";

const Admin = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [doctors, setDoctors] = useState<Doctor[]>([]);

  const router = useRouter();

  useEffect(() => {
    const getData = async () => {
      const usersRes = await fetch("/api/users");
      const doctorsRes = await fetch("/api/doctors");

      if (usersRes.ok && doctorsRes.ok) {
        setUsers(await usersRes.json());
        setDoctors(await doctorsRes.json());
      } else console.log(usersRes.status, doctorsRes.status);
    };

    getData();
  }, []);

  return (
    <Tabs>
      <TabsList className="flex gap-10">
        <TabsTrigger value="patients">Пациенты</TabsTrigger>
        <TabsTrigger value="doctors">Врачи</TabsTrigger>
      </TabsList>
      <TabsContent value="patients">
        {users.map((user, i) => {
          return (
            <div key={i}>
              {`${user.lastName} ${user.firstName} ${user.patronymic}`}
            </div>
          );
        })}
      </TabsContent>
      <TabsContent value="doctors">
        {doctors.map((doctor, i) => {
          return (
            <div key={i}>
              {`${doctor.lastName} ${doctor.firstName} ${doctor.patronymic}`}
            </div>
          );
        })}
        <Button onClick={() => router.push("/admin/add/doctor")}>
          Добавить врача
        </Button>
      </TabsContent>
    </Tabs>
  );
};

export default Admin;
