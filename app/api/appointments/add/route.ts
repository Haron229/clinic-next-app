import { prisma } from "@/lib/prisma";
import { Appointment } from "@/lib/types";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest) => {
	try {
		const data: Appointment = await req.json();

		const res = await prisma.appointment.create({
			data: {
				date: data.date,
				time: data.time,
				isOccupied: true,
				doctorId: data.doctorId,
				userId: data.userId,
			}
		});

		const doc = await prisma.doctor.update({
			where: {
				id: data.doctorId,
			},
			data: {
				appointments: {
					connect: {
						id: res.id,
					}
				}
			}
		});

		const user = await prisma.user.update({
			where: {
				id: data.userId,
			},
			data: {
				appointments: {
					connect: {
						id: res.id,
					}
				}
			}
		});

		if (!res || !doc || !user) return new NextResponse("Не удалось создать запись к врачу.", { status: 400 });

		return new NextResponse("Запись к врачу успешно создана.", { status: 200 });
	} catch (error) {
		return new NextResponse("Не удалось создать запись к врачу. Ошибка: " + error, { status: 500 });
	}
}