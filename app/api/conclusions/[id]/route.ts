import { prisma } from "@/lib/prisma";
import { MedicalConclusion } from "@/lib/types";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (req: NextRequest, { params }: { params: { id: string } }) => {
	try {
		const res = await prisma.medicalConclusion.findFirst({
			where: {
				id: params.id,
			},
			include: {
				appointment: true
			}
		});

		if (!res) return new NextResponse("Не удалось найти медицинское заключение.", { status: 400 });

		const conclusion: MedicalConclusion = {
			id: res.id,
			userId: res.userId,
			doctorId: res.doctorId,
			appointmentId: res.appointment?.id ?? "",
			complaints: res.complaints ?? "",
			anamnesis: res.anamnesis ?? "",
			od: res.od ?? 0,
			os: res.os ?? 0,
			eyelids: res.eyelids ?? "",
			conjunctiva: res.conjunctiva ?? "",
			cornea: res.cornea ?? "",
			frontCam: res.frontCam ?? "",
			lacrimal: res.lacrimal ?? "",
			iris: res.iris ?? "",
			pupil: res.pupil ?? "",
			lens: res.lens ?? "",
			vitreous: res.vitreous ?? "",
			createdAt: res.createdAt ?? "",
		}

		return new NextResponse(JSON.stringify(conclusion), { status: 200 });
	} catch (error) {
		return new NextResponse("Не удалось найти медицинское заключение. Ошибка: " + error, { status: 500 });
	}
}