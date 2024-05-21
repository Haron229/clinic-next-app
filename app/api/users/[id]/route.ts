import { prisma } from "@/lib/prisma";
import { Appointment, MedicalConclusion, User } from "@/lib/types";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (req: NextRequest, { params }: { params: { id: string } }) => {
	try {
		const res = await prisma.user.findFirst({
			where: {
				id: params.id,
			},
			include: {
				appointments: true,
				conclusions: true
			}
		});

		if (!res) return new NextResponse("Не удалось найти пользователя.", { status: 400 });

		const user: User = {
			id: res.id,
			email: res.email,
			verified: res.verified,
			firstName: res.firstName ?? "",
			lastName: res.lastName ?? "",
			patronymic: res.patronymic ?? "",
			birthDate: res.birthDate ?? "",
			pasport: res.pasport ?? "",
			issued: res.issued ?? "",
			departmentCode: res.departmentCode ?? "",
			dateOfIssue: res.dateOfIssue ?? "",
			adress: res.adress ?? "",
			snils: res.snils ?? "",
			inn: res.inn ?? "",
			phoneNumber: res.phoneNumber ?? "",
			appointments: [
				...res.appointments.map((appointment: Appointment): Appointment => {
					return {
						userId: appointment.userId,
						doctorId: appointment.doctorId,
						date: appointment.date,
						time: appointment.time,
					}
				})
			],
			conclusions: [
				...res.conclusions.map((conclusion: MedicalConclusion): MedicalConclusion => {
					return {
						userId: conclusion.userId,
						doctorId: conclusion.doctorId,
						complaints: conclusion.complaints,
						anamnesis: conclusion.anamnesis,
						od: conclusion.od,
						os: conclusion.os,
						eyelids: conclusion.eyelids,
						conjunctiva: conclusion.conjunctiva,
						cornea: conclusion.cornea,
						frontCam: conclusion.frontCam,
						lacrimal: conclusion.lacrimal,
						iris: conclusion.iris,
						pupil: conclusion.pupil,
						lens: conclusion.lens,
						vitreous: conclusion.vitreous,
					}
				})
			]
		}

		return new NextResponse(JSON.stringify(user), { status: 200 });
	} catch (error) {
		return new NextResponse("Не удалось найти пользователя. Ошибка: " + error, { status: 500 });
	}
}

export const PATCH = async (req: NextRequest, { params }: { params: { id: string } }) => {
	try {
		const data: User = await req.json();

		const res = await prisma.user.update({
			where: {
				id: params.id
			},
			data: {
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
			}
		});

		if (!res) return new NextResponse("Не удалось обновить данные пользователя.", { status: 400 });

		return new NextResponse("Данные успешно обновлены.", { status: 200 });
	} catch (error) {
		return new NextResponse("Не удалось обновить данные пользователя. Ошибка: " + error, { status: 500 });
	}
}
