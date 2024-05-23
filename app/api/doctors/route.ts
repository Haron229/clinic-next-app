import { prisma } from "@/lib/prisma";
import { Appointment, Doctor } from "@/lib/types";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (req: NextRequest) => {
	try {
		const res = await prisma.doctor.findMany({
			include: {
				appointments: true,
				conclusions: true
			}
		});

		if (!res) return new NextResponse("Не удалось найти докторов.", { status: 400 });

		const doctors: Doctor[] = [
			...res.map((doc): Doctor => {
				return {
					id: doc.id,
					email: doc.email,
					firstName: doc.firstName,
					lastName: doc.lastName,
					patronymic: doc.patronymic,
					startTime: doc.startTime,
					endTime: doc.endTime,
					breakTime: doc.breakTime,
					appointmentDuration: doc.appointmentDuration,
					appointments: [...doc.appointments.map((appointment): Appointment => {
						return {
							id: appointment.id,
							userId: appointment.userId,
							doctorId: appointment.doctorId,
							date: appointment.date,
							time: appointment.time,
							isFinished: appointment.isFinished,
						}
					})]
				}
			})
		];

		return new NextResponse(JSON.stringify(doctors), { status: 200 });
	} catch (error) {
		return new NextResponse("Не удалось найти докторов. Ошибка: " + error, { status: 500 });
	}
}