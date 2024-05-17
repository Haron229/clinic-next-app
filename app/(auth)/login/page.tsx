"use client";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useSignIn } from "@clerk/nextjs";
import { useRouter } from "next/navigation";

import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import Image from "next/image";
import Link from "next/link";
import mainLogo from "../../../public/logo.png";

const formSchema = z.object({
	email: z.string().email({ message: "Введите корректный e-mail" }),
	password: z.string().min(8, { message: "Пароль должен содержать минимум 8 символов" })
});

const Login = () => {

	const { isLoaded, signIn, setActive } = useSignIn();
	const router = useRouter();

	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			email: "",
			password: ""
		}
	});

	const onSubmit = async (values: z.infer<typeof formSchema>) => {
		if (!isLoaded) return;

		try {
			const result = await signIn.create({
				identifier: values.email,
				password: values.password
			});

			if (result.status === "complete") {
				await setActive({ session: result.createdSessionId });
				router.push('/account'); // push to account page
			}
		} catch (error: any) {
			if (error.errors[0].code === "form_identifier_not_found")
				alert("Пользователь не найден. Проверьте адрес электронной почты.");
			else if (error.errors[0].code === "form_password_incorrect")
				alert("Неверный пароль.");
		}
	}

	return (
		<div>
			<div className="flex justify-between items-center h-[150px]">
				<div className="pl-[100px] p-[0px] min-w-fit"><Image className="w-[105px] h-[50px]" src={mainLogo} alt=""/></div>
				<div className="mr-[100px]">
					<Button className="w-52 bg-darkGrey">
						<Link href={"../"}>Вернуться на главную</Link>
					</Button>
				</div>
			</div>
			<div className="flex flex-col items-center pt-28">
				<Form {...form}>
					<form
						onSubmit={form.handleSubmit(onSubmit)}
						className="flex flex-col justify-around w-96"
					>
						<FormField
							control={form.control}
							name="email"
							render={({ field }) => (
								<FormItem className="pb-4">
									<FormLabel>E-mail</FormLabel>
									<FormControl>
										<Input {...field} type="email" placeholder="Введите e-mail" />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name="password"
							render={({ field }) => (
								<FormItem className="pb-4">
									<FormLabel>Пароль</FormLabel>
									<FormControl>
										<Input {...field} type="password" placeholder="Введите пароль" />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<div className="flex justify-center pb-4">
							<Button type="submit" className="w-32">Войти</Button>
						</div>
						<Separator className="bg-slate-200 m-auto" />
						<div className="flex justify-between pt-2 text-sm text-slate-500">
							<span>Ещё не зарегистрированы?</span>
							<Link href={"/signup"} className="px-1 text-blue-500 hover:text-green-500">Регистрация</Link>
						</div>
					</form>
				</Form>
			</div>
		</div>
	);
}

export default Login;