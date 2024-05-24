"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Doctor, User } from "@/lib/types";
import { Button } from "@/components/ui/button";
import { useClerk, useUser } from "@clerk/nextjs";

import Image from "next/image";
import Link from "next/link";
import mainLogo from "../../public/logo.png";

const Admin = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [doctors, setDoctors] = useState<Doctor[]>([]);

  const { user } = useUser();
  const router = useRouter();

  const { signOut } = useClerk();

  useEffect(() => {
    const getData = async () => {
      const usersRes = await fetch("/api/users");
      const doctorsRes = await fetch("/api/doctors");

      if (usersRes.ok && doctorsRes.ok) {
        setUsers(await usersRes.json());
        setDoctors(await doctorsRes.json());
      } else console.log(usersRes.status, doctorsRes.status);
    };

    if (user?.organizationMemberships[0]?.role !== "org:admin")
      router.push("/");
    else getData();
  }, [router, user]);

  const deleteDoctor = async () => {
    // const res = await
  };

  return (
    <>
      <div className="flex items-center justify-between h-[150px]">
        <div className="pl-[100px] p-[0px] min-w-fit">
          <Image className="w-[105px] h-[50px]" src={mainLogo} alt="" />
        </div>
        <div className="mr-[100px]">
          <Button
            className="w-28"
            onClick={() => {
              signOut();
              router.push("/login");
            }}
          >
            Выход
          </Button>
        </div>
      </div>
      <Tabs>
        <TabsList className="flex gap-10">
          <TabsTrigger value="patients">Пациенты</TabsTrigger>
          <TabsTrigger value="doctors">Врачи</TabsTrigger>
        </TabsList>
        <TabsContent value="patients" className="flex flex-col mx-auto w-[600px] justify-center pt-4">
          {users.map((user, i) => {
            return (
              <div key={i} className="py-1">
                {`${user.lastName} ${user.firstName} ${user.patronymic}`}
              </div>
            );
          })}
        </TabsContent>
        <TabsContent value="doctors" className="flex flex-col mx-auto w-[600px] justify-center">
          {doctors.map((doctor, i) => {
            return (
              <div key={i} className="flex items-baseline gap-5 py-2">
                <span>{`${doctor.lastName} ${doctor.firstName} ${doctor.patronymic}`}</span>
                {/* <Button onClick={() => deleteDoctor()}}>Удалить</Button> */}
              </div>
            );
          })}
          <Button className="w-40 mt-3" onClick={() => router.push("/admin/add/doctor")}>
            Добавить врача
          </Button>
        </TabsContent>
      </Tabs>
    </>
  );
};

export default Admin;
