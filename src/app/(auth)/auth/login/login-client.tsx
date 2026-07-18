"use client";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, useWatch } from "react-hook-form";
import { Button } from "@/components/layout";
import Link from "next/link";
import { useCallback, useState } from "react";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { useRouter } from "next/navigation";
import { GoArrowUpRight } from "react-icons/go";
import AuthQuote from "@/components/pages/Auth-Page-Components/AuthQuote";
import { useAuth } from "@/components/contexts/auth-context";
import { AxiosError } from "axios";
import toast from "react-hot-toast";
import { resendVerificationEmail } from "@/apis";
import { ILoginForm } from "@/models";
import { useTranslations } from "next-intl";

const LoginClient = () => {
	const router = useRouter();
	const { login } = useAuth();
	const t = useTranslations("AuthPage.login");
	const tc = useTranslations("AuthPage.common");

	const loginFormSchema = z.object({
		emailOrUsername: z.string().min(1, tc("required")),
		password: z
			.string()
			.min(1, tc("required"))
			.min(8, tc("passwordTooShort"))
			.regex(
				/^(?=.*?[A-Z])(?=(.*[a-z]){1,})(?=(.*[\d]){1,})(?=(.*[\W]){1,})(?!.*\s).{8,}$/, 
				tc("passwordStrong")
			),
		remember_me: z.boolean().optional(),
	});

	const [showPassword, setShowPassword] = useState(false);

	const {
		handleSubmit,
		register,
		control,
		formState: { errors, isSubmitting },
		reset,
	} = useForm<ILoginForm>({
		resolver: zodResolver(loginFormSchema),
		defaultValues: {
			remember_me: false,
		},
	});

	const emailOrUsernameValue = useWatch({
		control,
		name: "emailOrUsername",
		defaultValue: "",
	});

	const getForgotPasswordHref = useCallback(() => {
		const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
		if (emailRegex.test(emailOrUsernameValue)) {
			return `/auth/forgot-password?email=${encodeURIComponent(emailOrUsernameValue)}`;
		}
		return "/auth/forgot-password";
	}, [emailOrUsernameValue]);

	const onSubmit = async (data: ILoginForm) => {
		try {
			await login(data);
		} catch (err) {
			if (err instanceof AxiosError) {
				if (err.response?.status === 403) {
					const inputValue = data.emailOrUsername;
					const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
					const email = emailRegex.test(inputValue) ? inputValue : "";
					if (email) {
						void resendVerificationEmail(email)
							.then(() => {
								toast.success(tc("verificationEmailSent"));
							})
							.catch(() => {
								toast.error(tc("verificationEmailFailed"));
							});
						router.push(`/auth/verify-email?email=${encodeURIComponent(email)}`);
					} else {
						reset({ emailOrUsername: "" });
						toast.error(tc("useEmailInstead"));
					}
					return;
				}
				const errorMessage = err?.response?.data?.errors?.[0] || err?.response?.data?.message;
				toast.error(errorMessage || tc("loginFailed"));
				return;
			}
			toast.error(tc("loginFailed"));
		}
		reset();
	};

	return (
		<div className="flex h-full justify-center gap-5 md:gap-10 w-full items-stretch">
			<AuthQuote />
			<form
				onSubmit={handleSubmit(onSubmit)}
				className="md:border-secondary md:border-[3px] flex flex-col md:bg-white/10 rounded-[3.125rem] p-5 md:p-10 w-full max-w-3xl md:min-h-[710px]"
			>
				<div className="text-white text-center md:p-2.5 md:mb-[3.75rem] mb-12">
					<h2 className="text-2xl max-md:text-xl font-semibold md:text-2xl nohemi-font">
						{t("title")}
					</h2>
					<p className="urbanist-font font-medium text-xl max-md:text-lg">
						{t("subtitle")}
					</p>
				</div>
				<div className="md:px-2.5">
					<div className="space-y-2">
						<label
							htmlFor="emailOrUsername"
							className="text-white urbanist-font md:text-lg"
						>
							{t("emailLabel")}
						</label>
						<input
							id="emailOrUsername"
							placeholder={t("emailPlaceholder")}
							className="w-full border-[1.5px] py-3.5 px-5 text-base border-white placeholder:text-lg bg-white/10 rounded-2xl focus:outline-none urbanist-font text-white"
							{...register("emailOrUsername")}
						/>
					</div>
					{errors.emailOrUsername && (
						<label className="label mt-2 block">
							<span className="label-text-alt text-red-500 urbanist-font">
								{errors["emailOrUsername"]?.message}
							</span>
						</label>
					)}
				</div>
				<div className="mt-7 md:px-2.5">
					<div className="space-y-2">
						<label
							htmlFor="password"
							className="text-white urbanist-font md:text-lg"
						>
							{t("passwordLabel")}
						</label>
						<div className="relative">
							<input
								type={showPassword ? "text" : "password"}
								id="password"
								placeholder={t("passwordPlaceholder")}
								className="w-full border-[1.5px] py-3.5 px-5 border-white placeholder:text-lg bg-white/10 rounded-2xl focus:outline-none urbanist-font text-white"
								{...register("password")}
							/>
							<div className="absolute right-5 inset-y-0 top-[50%] transform -translate-y-[50%]">
								{showPassword ? (
									<AiOutlineEye
										className="w-6 h-6"
										color="white"
										onClick={() =>
											setShowPassword(!showPassword)
										}
									/>
								) : (
									<AiOutlineEyeInvisible
										className="w-6 h-6"
										color="white"
										onClick={() =>
											setShowPassword(!showPassword)
										}
									/>
								)}
							</div>
						</div>
					</div>
					{errors.password && (
						<label className="label mt-2 block">
							<span className="label-text-alt text-red-500 urbanist-font">
								{errors.password?.message}
							</span>
						</label>
					)}
				</div>
				<div className="grow flex flex-col md:justify-between mt-5 md:mt-7">
					<div className="flex md:justify-between md:items-center max-md:flex-col-reverse px-2.5 max-md:mb-5 gap-y-5">
						<div className="flex items-center">
							<input
								type="checkbox"
								className="md:size-[1.17rem] size-4 rounded-[0.414rem] border-secondary-light bg-white border appearance-none checked:bg-secondary remember-me-checkbox cursor-pointer"
								{...register("remember_me")}
							/>
							<span className="text-white urbanist-font ml-2.5">
								{t("rememberMe")}
							</span>
						</div>
						<Link
							href={getForgotPasswordHref()}
							className="text-white flex justify-end items-end urbanist-font gap-x-2"
						>
							{t("forgotPassword")}
							<GoArrowUpRight className="md:w-6 md:h-6 w-5 h-5 " />
						</Link>
					</div>

					<Button
						outline={false}
						backgroundColor="bg-secondary"
						className="w-full hover:shadow-[0_8px_30px_rgba(66,133,244,0.4)]
							active:scale-[0.98] transition-all duration-300"
						disabled={isSubmitting}
					>
						{t("submit")}
					</Button>
				</div>
			</form>
			<style>{`
				input.remember-me-checkbox::before {
					content: "";
					color: transparent;
					display: block;
					width: inherit;
					height: inherit;
					border-radius: inherit;
					border: 0;
					background-color: transparent;
					background-size: contain;
					background-repeat: no-repeat, no-repeat;
				}
				input.remember-me-checkbox:checked::before {
					margin-top: 2px;
					box-shadow: none;
					background-image: url('data:image/svg+xml;utf8,<svg viewBox="0 0 24 24" width="8.82" height="6.07" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M4 12.6111L8.92308 17.5L20 6.5" stroke="%23ffffff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path> </g></svg>');
				}
			`}</style>
		</div>
	);
};

export default LoginClient;
