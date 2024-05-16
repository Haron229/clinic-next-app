import { prisma } from "@/lib/prisma";
import { User } from "@/lib/types";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (req: NextRequest) => {
	try {
		const res = await prisma.user.findMany();

		if (!res) return new NextResponse("Не удалось найти пользователей.", { status: 400 });

		const users: User[] = [
			...res.map((user): User => {
				return {
					id: user.id,
					email: user.email,
					verified: user.verified,
					firstName: user.firstName ?? "",
					lastName: user.lastName ?? "",
					patronymic: user.patronymic ?? "",
					birthDate: user.birthDate ?? "",
					pasport: user.pasport ?? "",
					issued: user.issued ?? "",
					departmentCode: user.departmentCode ?? "",
					dateOfIssue: user.dateOfIssue ?? "",
					adress: user.adress ?? "",
					snils: user.snils ?? "",
					inn: user.inn ?? "",
					phoneNumber: user.phoneNumber ?? "",
				}
			})
		];

		return new NextResponse(JSON.stringify(users), { status: 200 });
	} catch (error) {
		return new NextResponse("Не удалось найти пользователей. Ошибка: " + error, { status: 500 });
	}
}