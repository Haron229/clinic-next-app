import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import mainLogo from "../../public/logo.png";

const Account = () => {
  // const result = await fetch(`/api/user/${}`, {
  //   method: "GET",
  // })
  // const user: User = await result.json();

  return (
    <div>
      <div className="flex justify-center items-center h-[150px]">
        <div className="pl-[100px] p-[0px] min-w-fit"><Image className="w-[105px] h-[50px]" src={mainLogo} alt=""/></div>
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
          <Button className="w-28">
            <Link href={"/login"}>Выход</Link>
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
        <div className="text-[22px] pb-6"><span>Личный кабинет</span></div>
        <div className="pl-12 space-y-4">
          <div className="flex flex-row">
            <span className="w-[300px]">ФИО</span>
            <div>Zakharchuk Sophya Igorevna</div>
          </div>
          <div className="flex flex-row">
            <span className="w-[300px]">Дата рождения</span>
            <div>jvghjk</div>
          </div>
          <div className="flex flex-row">
            <span className="w-[300px]">Серия и номер паспорта</span>
            <div>jvghjk</div>
          </div>
          <div className="flex flex-row">
            <span className="w-[300px]">Выдан</span>
            <div>Zakharchuk Sophya Igorevna</div>
          </div>
          <div className="flex flex-row">
            <span className="w-[300px]">Код подразделения</span>
            <div>jvghjk</div>
          </div>
          <div className="flex flex-row">
            <span className="w-[300px]">Дата выдачи</span>
            <div>jvghjk</div>
          </div>
          <div className="flex flex-row">
            <span className="w-[300px]">СНИЛС</span>
            <div>jvghjk</div>
          </div>
          <div className="flex flex-row">
            <span className="w-[300px]">ИНН</span>
            <div>jvghjk</div>
          </div>
          <div className="flex flex-row">
            <span className="w-[300px]">Адрес проживания</span>
            <div>Zakharchuk Sophya Igorevna</div>
          </div>
          <div className="flex flex-row">
            <span className="w-[300px]">Номер телефона</span>
            <div>jvghjk</div>
          </div>
          <div className="flex flex-row">
            <span className="w-[300px]">Электронная почта</span>
            <div>jvghjk</div>
          </div>
        </div>
        <div className="flex flex-row pt-8 pb-8">
          <div className="mr-[100px]">
            <Button className="w-64 py-6">
              <Link href={"/login"}>Редактировать данные</Link>
            </Button>
          </div>
          <div>
            <Button className="w-64 py-6">
              <Link href={"/login"}>Сменить логин/пароль</Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Account;
