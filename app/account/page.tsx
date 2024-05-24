"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import mainLogo from "../../public/logo.png";
import { useClerk, useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

import { Doctor, User } from "@/lib/types";
import { isDoctor } from "@/lib/utils";

const Account = () => {
  const [userData, setUserData] = useState<User | null>(null);
  const [doctorData, setDoctorData] = useState<Doctor | null>(null);

  const { signOut } = useClerk();
  const { user } = useUser();
  const router = useRouter();

  useEffect(() => {
    const getUserData = async () => {
      if (user) {
        const res = await fetch(`/api/users/${user.id}`);

        if (res.ok) setUserData(await res.json());
        else router.push(`/account/edit/${user.id}`);
      }
    };

    const getDoctorData = async () => {
      if (user) {
        const res = await fetch(`/api/doctors/byEmail/${user.primaryEmailAddress}`);

        if (res.ok) setDoctorData(await res.json());
      }
    };

    if (user?.organizationMemberships[0]?.role === "org:admin")
      router.push("/admin");
    else if (user?.organizationMemberships[0]) getDoctorData();
    else getUserData();
  }, [router, user]);

  const _user = userData ?? doctorData;

  return (
    <div>
      <div className="flex justify-center items-center h-[150px]">
        <div className="pl-[100px] p-[0px] min-w-fit">
          <Image className="w-[105px] h-[50px]" src={mainLogo} alt="" />
        </div>
        <div className="flex flex-row w-full p-24 gap-28 text-[14px]">
          <div className="flex flex-row items-center gap-5">
            <div className="w-[12px] h-[85px] rounded-[5px] bg-gradient-to-b from-[#BE2E21] via-[#F2DF3A] to-[#0693E3]"></div>
            <p>
              Адрес:<br></br>
              Карла Маркса 218 БЦ “Найди”, 4 этаж
            </p>
          </div>
          <div className="flex flex-row items-center gap-5">
            <div className="w-[12px] h-[85px] rounded-[5px] bg-gradient-to-b from-[#BE2E21] via-[#F2DF3A] to-[#0693E3]"></div>
            <p>
              Телефон:<br></br>
              +7 (3412) 269-220
            </p>
          </div>
          <div className="flex flex-row items-center gap-5">
            <div className="content w-[12px] h-[85px] rounded-[5px] bg-gradient-to-b from-[#BE2E21] via-[#F2DF3A] to-[#0693E3]"></div>
            <p>
              E-mail:<br></br>
              clinica@okvision.ru
            </p>
          </div>
        </div>
        <div className="mr-[100px]">
          <Button
            className="w-28"
            onClick={() => {
              router.replace("./");
            }}
          >
            Главная
          </Button>
        </div>
      </div>
      <div className="flex justify-center space-x-36 items-center h-[60px] bg-darkGrey">
        <div>
          <Link href={"#"}>О клинике</Link>
        </div>
        <div>
          <Link href={"#"}>Услуги</Link>
        </div>
        <div>
          <Link href={"#"}>Цены</Link>
        </div>
        <div>
          <Link href={"#"}>Болезни глаз</Link>
        </div>
        <div>
          <Link href={"#"}>Оптика</Link>
        </div>
        <div>
          <Link href={"#"}>Специалисты</Link>
        </div>
      </div>

      <Tabs defaultValue="account">
        <TabsList className="w-full bg-lightBlue gap-10">
          <TabsTrigger value="account">Личный кабинет</TabsTrigger>
          <TabsTrigger value="conclusions">Заключения</TabsTrigger>
          <TabsTrigger value="appointments">Приемы</TabsTrigger>
        </TabsList>
        <TabsContent value="account">
          <div className="flex flex-col pl-56 pt-12 max-w-screen-lg">
            <div className="text-[22px] pb-6">
              <span>Личный кабинет</span>
            </div>
            {(userData && (
              <div className="pl-12 space-y-4">
                <div className="flex flex-row">
                  <span className="w-[300px]">ФИО</span>
                  <div>{`${userData?.lastName} ${userData?.firstName} ${userData?.patronymic}`}</div>
                </div>
                <div className="flex flex-row">
                  <span className="w-[300px]">Дата рождения</span>
                  <div>{`${userData?.birthDate}`}</div>
                </div>
                <div className="flex flex-row">
                  <span className="w-[300px]">Серия и номер паспорта</span>
                  <div>{`${userData?.pasport}`}</div>
                </div>
                <div className="flex flex-row">
                  <span className="w-[300px]">Выдан</span>
                  <div>{`${userData?.issued}`}</div>
                </div>
                <div className="flex flex-row">
                  <span className="w-[300px]">Код подразделения</span>
                  <div>{`${userData?.departmentCode}`}</div>
                </div>
                <div className="flex flex-row">
                  <span className="w-[300px]">Дата выдачи</span>
                  <div>{`${userData?.dateOfIssue}`}</div>
                </div>
                <div className="flex flex-row">
                  <span className="w-[300px]">СНИЛС</span>
                  <div>{`${userData?.snils}`}</div>
                </div>
                <div className="flex flex-row">
                  <span className="w-[300px]">ИНН</span>
                  <div>{`${userData?.inn}`}</div>
                </div>
                <div className="flex flex-row">
                  <span className="w-[300px]">Адрес проживания</span>
                  <div>{`${userData?.adress}`}</div>
                </div>
                <div className="flex flex-row">
                  <span className="w-[300px]">Номер телефона</span>
                  <div>{`${userData?.phoneNumber}`}</div>
                </div>
                <div className="flex flex-row">
                  <span className="w-[300px]">Электронная почта</span>
                  <div>{`${userData?.email}`}</div>
                </div>
              </div>
            )) ||
              (doctorData && (
                <div className="pl-12 space-y-4">
                  <div className="flex flex-row">
                    <span className="w-[300px]">ФИО</span>
                    <div>{`${doctorData?.lastName} ${doctorData?.firstName} ${doctorData?.patronymic}`}</div>
                  </div>
                </div>
              ))}
            <div className="flex flex-row pt-8 pb-8">
              <div className="mr-[100px]">
                <Button className="w-64 py-6">
                  <Link href={`/account/edit/${userData?.id}`}>
                    Редактировать данные
                  </Link>
                </Button>
              </div>
              <div>
                <Button className="w-64 py-6">
                  <Link href={"#"}>Сменить логин/пароль</Link>
                </Button>
              </div>
            </div>
            <Button
              className="px-12 max-w-fit bg-lightGrey hover:bg-darkGrey hover:text-black ml-48 mb-8"
              onClick={() => {
                signOut();
                router.push("/login");
              }}
            >
              Выход из аккаунта
            </Button>
          </div>
        </TabsContent>
        <TabsContent value="conclusions">
          <div className="flex flex-col pl-56 pt-12 max-w-screen-lg">
            <div className="text-[22px] pb-6">
              <span>Мои медицинские заключения</span>
            </div>
            <Accordion type="multiple">
              {_user &&
                _user.conclusions?.map((conclusion, i) => (
                  <AccordionItem
                    key={i}
                    value={i.toString()}
                  >
                    <AccordionTrigger>
                      Заключение от{" " + new Date(conclusion.createdAt).toDateString()}
                    </AccordionTrigger>
                    <AccordionContent><p>
                      {
                        "Анамнез: " +
                        conclusion.anamnesis}</p>
                        <p>{"OD: " +
                        conclusion.od}</p>
                        <p>{
                          "OS: " +
                          conclusion.os
                        }</p>
                        <p>{"Веки: " +
                        conclusion.eyelids}</p>
                        <p>{
                        "Конъюнктива: "+
                        conclusion.conjunctiva}</p>
                        <p> {
                        "Роговица: " +
                        conclusion.cornea}</p>
                        <p>{
                        "Передняя камера: " +
                        conclusion.frontCam}</p>
                        <p>{
                        "Слёзные органы: " +
                        conclusion.lacrimal}</p>
                        <p>{"Радужная оболочка: " +
                        conclusion.iris}</p>
                        <p>{
                        "Зрачок: " +
                        conclusion.pupil}</p>
                        <p>{
                        "Хрусталик: " +
                        conclusion.lens}</p><p>{
                        "Стекловидное тело: " +
                        conclusion.vitreous}</p>
                    </AccordionContent>
                  </AccordionItem>
                ))}
            </Accordion>
          </div>
        </TabsContent>
        <TabsContent value="appointments">
          <div className="flex flex-col pl-56 pt-12 max-w-screen-lg">
            <div className="text-[22px] pb-6">
              <span>Мои приемы</span>
            </div>
            <Accordion type="multiple">
              {_user &&
                _user.appointments?.map((appointment, i) => (
                  <AccordionItem key={i} value={appointment.date}>
                    <AccordionTrigger>
                      Прием на осмотр на{" " + appointment.date}
                    </AccordionTrigger>
                    <AccordionContent>
                      {appointment.date + "<br/>" + appointment.time}
                      {isDoctor(_user) && (
                        <Link href={`/conclusion/${appointment.conclusionId}`} className="p-5 outline outline-1">
                          Перейти
                        </Link>
                      )}
                    </AccordionContent>
                  </AccordionItem>
                ))}
            </Accordion>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Account;
