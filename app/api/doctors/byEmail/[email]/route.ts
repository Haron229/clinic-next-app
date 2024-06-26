import { prisma } from "@/lib/prisma";
import { Appointment, Doctor, MedicalConclusion } from "@/lib/types";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (req: NextRequest, { params }: { params: { email: string } }) => {
	try {
		const res = await prisma.doctor.findFirst({
			where: {
				email: params.email,
			},
			include: {
				appointments: {
					include: {
						conclusion: true
					}
				},
				conclusions: {
					include: {
						appointment: true
					}
				}
			}
		});

		if (!res) return new NextResponse("Не удалось найти доктора.", { status: 400 });

		const doc: Doctor = {
			id: res.id,
			email: res.email,
			firstName: res.firstName,
			lastName: res.lastName,
			patronymic: res.patronymic,
			startTime: res.startTime,
			endTime: res.endTime,
			breakTime: res.breakTime,
			appointmentDuration: res.appointmentDuration,
			appointments: [
				...res.appointments.map((appointment): Appointment => {
					return {
						id: appointment.id,
						userId: appointment.userId,
						doctorId: appointment.doctorId,
						date: appointment.date,
						time: appointment.time,
						isFinished: appointment.isFinished,
						conclusionId: appointment.conclusionId ?? "",
					}
				})
			],
			conclusions: [
				...res.conclusions.map((conclusion): MedicalConclusion => {
					return {
						id: conclusion.id,
						createdAt: conclusion.createdAt,
						userId: conclusion.userId,
						doctorId: conclusion.doctorId,
						appointmentId: conclusion.appointment?.id ?? "",
						complaints: conclusion.complaints ?? "",
						anamnesis: conclusion.anamnesis ?? "",
						od: conclusion.od ?? 0,
						os: conclusion.os ?? 0,
						eyelids: conclusion.eyelids ?? "",
						conjunctiva: conclusion.conjunctiva ?? "",
						cornea: conclusion.cornea ?? "",
						frontCam: conclusion.frontCam ?? "",
						lacrimal: conclusion.lacrimal ?? "",
						iris: conclusion.iris ?? "",
						pupil: conclusion.pupil ?? "",
						lens: conclusion.lens ?? "",
						vitreous: conclusion.vitreous ?? "",
					}
				})
			]
		}

		return new NextResponse(JSON.stringify(doc), { status: 200 });
	} catch (error) {
		return new NextResponse("Не удалось найти доктора. Ошибка: " + error, { status: 400 });
	}
}