"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import mainLogo from "../../public/logo.png";
import { useClerk, useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";

import { User } from "@/lib/types";

const Account = () => {
  const [userData, setUserData] = useState<User | null>(null);

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

    getUserData();
  }, [router, user]);

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
              signOut();
              router.push("/login");
            }}
          >
            Выход
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

      <div className="flex flex-col pl-56 pt-12 max-w-screen-lg">
        <div className="text-[22px] pb-6">
          <span>Личный кабинет</span>
        </div>
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
      </div>
    </div>
  );
};

export default Account;
