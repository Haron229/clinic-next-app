import { prisma } from "@/lib/prisma";
import { User } from "@/lib/types";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest) => {
	try {
		const data: User = await req.json();

		const res = await prisma.user.create({
			data: {
				email: data.email,
				firstName: data.firstName,
				lastName: data.lastName,
				patronymic: data.patronymic,
				birthDate: data.birthDate,
				pasport: data.pasport,
				issued: data.issued,
				departmentCode: data.departmentCode,
				dateOfIssue: data.dateOfIssue,
				adress: data.adress,
				snils: data.snils,
				inn: data.inn,
				phoneNumber: data.phoneNumber,
				appointments: {
					create: []
				},
				conclusions: {
					create: []
				}
			}
		});

		if (!res) return new NextResponse("Не удалось создать пользователя.", { status: 400 });

		return new NextResponse("Пользователь успешно создан.", { status: 200 });
	} catch (error) {
		return new NextResponse("Не удалось создать пользователя. Ошибка: " + error, { status: 500 });
	}
}