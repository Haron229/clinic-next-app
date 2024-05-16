import { prisma } from "@/lib/prisma";
import { MedicalConclusion } from "@/lib/types";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest) => {
	try {
		const data: MedicalConclusion = await req.json();

		const res = await prisma.medicalConclusion.create({
			data: {
				complaints: data.complaints,
				anamnesis: data.anamnesis,
				od: data.od,
				os: data.os,
				eyelids: data.eyelids,
				cornea: data.cornea,
				frontCam: data.frontCam,
				lacrimal: data.lacrimal,
				iris: data.iris,
				pupil: data.pupil,
				lens: data.lens,
				vitreous: data.vitreous,
				doctorId: data.doctorId,
				userId: data.userId,
			}
		});

		const doc = await prisma.doctor.update({
			where: {
				id: data.doctorId,
			},
			data: {
				conclusions: {
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
				conclusions: {
					connect: {
						id: res.id,
					}
				}
			}
		});

		if (!res || !doc || !user) return new NextResponse("Не удалось создать медицинское заключение.", { status: 400 });

		return new NextResponse("Медицинское заключени успешно создано.", { status: 200 });
	} catch (error) {
		return new NextResponse("Не удалось создать медицинское заключение. Ошибка: " + error, { status: 500 });
	}
}