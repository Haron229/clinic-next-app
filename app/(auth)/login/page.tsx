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
import Link from "next/link";

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
				router.push('/'); // push to account page
			}
		} catch (error: any) {
			if (error.errors[0].code === "form_identifier_not_found")
				alert("Пользователь не найден. Проверьте адрес электронной почты.");
			else if (error.errors[0].code === "form_password_incorrect")
				alert("Неверный пароль.");
		}
	}

	return (
		<Form {...form}>
			<form
				onSubmit={form.handleSubmit(onSubmit)}
				className="w-[400px] outline outline-1 rounded-xl p-4"
			>
				<FormField
					control={form.control}
					name="email"
					render={({ field }) => (
						<FormItem className="pb-4">
							<FormLabel>E-mail</FormLabel>
							<FormControl>
								<Input {...field} type="email" placeholder="Введите свой e-mail" />
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
								<Input {...field} type="password" placeholder="Введите свой пароль" />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<div className="flex justify-center pb-4">
					<Button type="submit">Войти</Button>
				</div>
				<Separator className="bg-slate-200 w-[275px] m-auto" />
				<div className="flex justify-center pt-2 text-sm text-slate-500">
					<span>Нет аккаунта?</span>
					<Link href={"/signup"} className="px-1 text-blue-500 hover:text-green-500">Зарегистрироваться</Link>
				</div>
			</form>
		</Form>
	);
}

export default Login;