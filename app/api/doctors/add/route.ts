import { prisma } from "@/lib/prisma";
import { Doctor } from "@/lib/types";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest) => {
	try {
		const data: Doctor = await req.json();

		const res = await prisma.doctor.create({
			data: {
				email: data.email,
				firstName: data.firstName,
				lastName: data.lastName,
				patronymic: data.patronymic,
				startTime: data.startTime,
				endTime: data.endTime,
				breakTime: data.breakTime,
				appointmentDuration: data.appointmentDuration,
				appointments: {
					create: []
				},
				conclusions: {
					create: []
				}
			}
		});

		if (!res) return new NextResponse("Не удалось создать доктора.", { status: 400 });

		return new NextResponse("Доктор успешно создан.", { status: 200 });
	} catch (error) {
		return new NextResponse("Не удалось создать доктора. Ошибка: " + error, { status: 500 });
	}
}