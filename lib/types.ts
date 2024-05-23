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
	email: string
	firstName: string
	lastName: string
	patronymic: string
	startTime: string
	endTime: string
	breakTime: string
	appointmentDuration: string

	appointments?: Appointment[]
	conclusions?: MedicalConclusion[]
}

export type Appointment = {
	id: string
	userId: string
	doctorId: string
	conclusionId?: string

	date: string
	time: string
	isFinished: boolean
}

export type MedicalConclusion = {
	id: string
	createdAt: Date
	userId: string
	doctorId: string
	appointmentId: string

	complaints: string
	anamnesis: string
	od: number
	os: number
	eyelids: string
	conjunctiva: string
	cornea: string
	frontCam: string
	lacrimal: string
	iris: string
	pupil: string
	lens: string
	vitreous: string
}
