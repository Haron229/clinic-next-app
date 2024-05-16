import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import mainLogo from "../../public/logo.png";
import examinationByDoctor from "../../public/examinationByDoctor.jpg";
import mainDoctor from "../../public/mainDoctor.jpg";
import examination from "../../public/examination.png";
import lens from "../../public/lens.png";
import airLens from "../../public/airLens.png";

export default function Home() {
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
        <div className="mr-[80px]">
          <Button>
            <Link href={"/login"}>Личный кабинет</Link>
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
      <div className="flex flex-row mt-[50px] bg-lightGrey">
        <div className="flex flex-col space-y-4 ml-[150px] pt-[95px]">
          <div className="uppercase underline text-2xl">Глазная клиника<br></br>кругозор</div>
          <div>Принимаем взрослых и детей с 0+ лет</div>
          <div>Принимаем пациентов 7 дней в неделю</div>
          <div>Подбираем все виды индивидуальных линз</div>
          <div>Собственная лаборатория при клинике</div>
          <div className="font-light">Заботимся о зрении с 1996 года.<br></br>Запишитесь на приём, и мы позаботимся о вас!</div>
          <div className="mr-[80px]">
            <Button className="text-[18px] font-normal w-[300px] h-[52px] mt-[20px]">
              <Link href={"#"}>Записаться на приём</Link>
            </Button>
          </div>
        </div>
        <div className="p-[0px] min-w-fit pl-[140px]">
          <Image className="w-[800px] h-[560px]" src={examinationByDoctor} alt=""/>
        </div>
      </div>
      <div className="flex justify-center space-x-40 mt-[50px]">
        {/* убрать изенение цвета при hover */}
        <div className="">
          <Button className="text-[16px] w-[280px] h-[46px] bg-darkGrey">
            <Link href={"#"}>Консультация</Link>
          </Button>
        </div>
        <div className="">
          <Button className="text-[16px] w-[280px] h-[46px] bg-darkGrey">
            <Link href={"#"}>Диагностика</Link>
          </Button>
        </div>
        <div className="">
          <Button className="text-[16px] w-[280px] h-[46px] bg-darkGrey">
            <Link href={"#"}>Лечение</Link>
          </Button>
        </div>
      </div>
      <div className="flex flex-col items-center mt-[70px] pb-16">
        <div className="underline font-semibold text-xl">
          <p>ОФТАЛЬМОЛОГИЧЕСКАЯ КЛИНИКА «КРУГОЗОР»</p>
        </div>
        <div className="flex mt-[30px]">
          <div><Image className="w-[200px] h-[300px]" src={mainDoctor} alt=""/></div>
          <div className="flex flex-col space-y-5 mt-[75px] ml-[70px]">
            <div className="font-light italic">
              «Клиника «Кругозор» — одна из ведущих офтальмологических клиник Москвы. Специалисты нашего<br></br>
              медицинского центра оказывают высококвалифицированную помощь в лечении и диагностике рефракционных<br></br>
              нарушений (в том числе близорукости и дальнозоркости). В клинике коррекции зрения «Кругозор» постоянно<br></br>
              проходят акции, помогающие пациентам сделать лечение доступным и более выгодным.»<br></br>
            </div>
            <div className="">
              Ведущий специалист офтальмологической клиники “Кругозор – Москва”,<br></br>
              доктор медицинских наук – Мягков Александр Владимирович<br></br>
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-col items-center bg-lightGrey">
        <div className="flex flex-row justify-center gap-24 pt-16">
            <div className="flex flex-col items-center w-[300px] h-[380px] bg-white pt-10">
            <Image className="w-[80px] h-[80px]" src={examination} alt=""/>
            <div className="pt-[20px]">
              <span>
              Прием офтальмолога<br></br><br></br>
              Своевременное<br></br>
              выявление и<br></br>
              коррекция нарушений<br></br>
              позволяют сохранить<br></br>
              зрение.
              </span>
            </div>
          </div>
          <div className="flex flex-col items-center w-[300px] h-[380px] bg-white pt-10">
            <Image className="w-[80px] h-[80px]" src={lens} alt=""/>
            <div className="pt-[20px]">
              <span>
              Индивидуальные<br></br>контактные линзы<br></br><br></br>
              Решение для пациентов<br></br>
              со сложными<br></br>
              аномалиями рефракции<br></br>
              или анатомическими<br></br>
              особенностями<br></br>
              строения глаза.
              </span>
            </div>
          </div>
          <div className="flex flex-col items-center w-[300px] h-[380px] bg-white pt-10">
            <Image className="w-[80px] h-[80px]" src={airLens} alt=""/>
            <div className="pt-[20px]">
              <span>
              Бифокальные мягкие<br></br>
              газопроницаемые<br></br>
              линзы<br></br><br></br>
              Эффективное решение<br></br>
              для контроля<br></br>
              прогрессирования<br></br>
              миопии у детей и<br></br>
              подростков.
              </span>
            </div>
          </div>
        </div>
        <div className="pt-12 pb-16">
          <Button className="text-[16px] w-[300px] h-[46px] bg-darkGrey">
            <Link href={"#"}>Все услуги</Link>
          </Button>
        </div>
      </div>

      <div className="flex flex-col bg-darkGrey pl-40 pt-16">
        <div className="flex flex-row gap-40 pb-12">
          <div className="p-[0px] min-w-fit"><Image className="w-[105px] h-[50px]" src={mainLogo} alt=""/></div>
          <div className="flex flex-col space-y-4">
            <Link href={"#"}>О клинике</Link>
            <Link href={"#"}>Болезни глаз</Link>
          </div>
          <div className="flex flex-col space-y-4">
            <Link href={"#"}>Цены</Link>
            <Link href={"#"}>Услуги</Link>
          </div>
          <div className="flex flex-col space-y-4">
            <Link href={"#"}>Оптика</Link>
            <Link href={"#"}>Специалисты</Link>
          </div>
        </div>
        <div className="flex flex-row items-center gap-48 pb-8 text-[14px]">
          <span>Кругозор Ижевск © 2023.</span>
          <span>Адрес: Карла Маркса 218 БЦ “Найди”, 4 этаж</span>
          <span>Телефон: +7(3412) 933-444<br></br>
          E-mail: clinica@okvision.ru</span>
        </div>
      </div>
    </div>
  );
}
