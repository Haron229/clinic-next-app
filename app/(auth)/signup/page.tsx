"use client";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { useSignUp } from "@clerk/nextjs";
import { useRouter } from "next/navigation";

import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
	FormDescription
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import Link from "next/link";

const formSchema = z.object({
	email: z.string().email({ message: "Введите корректный e-mail" }),
	password: z.string().min(8, { message: "Пароль должен содержать минимум 8 символов" }),
});

const Signup = () => {

	const { isLoaded, signUp, setActive } = useSignUp();
	const [pendingVerification, setPendingVerification] = useState(false);
	const [code, setCode] = useState("");
	const router = useRouter();

	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			email: "",
			password: "",
		}
	});

	const onSubmit = async (values: z.infer<typeof formSchema>) => {
		if (!isLoaded) return;

		try {
			await signUp.create({
				emailAddress: values.email,
				password: values.password
			});

			await signUp.prepareEmailAddressVerification({ strategy: "email_code" });
			setPendingVerification(true);
		} catch (error) {
			console.error(JSON.stringify(error, null, 2));
		}
	}

	const onPressVerify = async (values: z.infer<typeof formSchema>) => {
		if (!isLoaded) return;

		try {
			const completeSignUp = await signUp.attemptEmailAddressVerification({
				code,
			});

			if (completeSignUp.status === "complete") {
				await setActive({ session: completeSignUp.createdSessionId })
				router.push("/"); // push to account page
			}
			else {
				console.log(JSON.stringify(completeSignUp, null, 2));
			}
		} catch (error) {
			console.error(JSON.stringify(error, null, 2));
		}
	}

	return (
		<Form {...form}>
			<form
				onSubmit={form.handleSubmit(pendingVerification ? onPressVerify : onSubmit)}
				className="w-[400px] outline outline-1 rounded-xl p-4"
			>
				{!pendingVerification ?
					(<>
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
					</>)
					:
					(<>
						<FormItem className="pb-4">
							<FormDescription>На указанную почту отправлен код подтверждения.</FormDescription>
							<FormLabel>Код подтверждения</FormLabel>
							<Input value={code} placeholder="Введите код подтверждения" onChange={(e) => setCode(e.target.value)} />
						</FormItem>
					</>)
				}
				{!pendingVerification ?
					(<div className="flex justify-center pb-4">
						<Button type="submit">Зарегистрироваться</Button>
					</div>)
					:
					(<div className="flex justify-center pb-4">
						<Button type="submit">Подтвердить</Button>
					</div>)
				}
				<Separator className="bg-slate-200 w-[275px] m-auto" />
				<div className="flex justify-center pt-2 text-sm text-slate-500">
					<span>Уже есть аккаунт?</span>
					<Link href={"/login"} className="px-1 text-blue-500 hover:text-green-500">Войти</Link>
				</div>
			</form>
		</Form>
	);
}

export default Signup;