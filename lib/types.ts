export type User = {
	id: string
	email: string
	verified: boolean

	firstName?: string
	lastName?: string
	patronymic?: string
	birthDate?: string
	pasport?: string
	issued?: string
	departmentCode?: string
	dateOfIssue?: string
	adress?: string
	snils?: string
	inn?: string
	phoneNumber?: string

	appointments?: Appointment[]
	conclusions?: MedicalConclusion[]
}

export type Doctor = {
	id: string
	firstName: string
	lastName: string
	patronymic: string

	appointments?: Appointment[]
	conclusions?: MedicalConclusion[]
}

export type Appointment = {
	userId: string
	doctorId: string

	date: string
	time: string
}

export type MedicalConclusion = {
	userId: string
	doctorId: string

	complaints: string
	anamnesis: string
	od: number
	os: number
	eyelids: string
	cornea: string
	frontCam: string
	lacrimal: string
	iris: string
	pupil: string
	lens: string
	vitreous: string
}
