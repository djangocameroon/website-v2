

import { ILoginForm } from "@/models";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm, useWatch } from "react-hook-form";
import { Button } from "@/components/layout";
import { Link } from "react-router-dom";
import { useCallback, useState } from "react";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
// import {Carousel} from "@/components";
import { useNavigate } from "react-router-dom";
import { GoArrowUpRight } from "react-icons/go";
import AuthQuote from "@/components/pages/Auth-Page-Components/AuthQuote";
import { useAuth } from "@/components/contexts/auth-context";
import { AxiosError } from "axios";
import toast from "react-hot-toast";
import { resendVerificationEmail } from "@/apis";

const Login = () => {
	const navigate = useNavigate();
	const { login } = useAuth();

	const [showPassword, setShowPassword] = useState(false);

	const loginFormSchema = yup.object().shape({
		emailOrUsername: yup
			.string()
			.required("You must provide a value for this field"),
		password: yup
			.string()
			.required("You must provide a value for this field")
			.min(8, "Password must be atleast 8 characters long")
			.matches(
				/^(?=.*?[A-Z])(?=(.*[a-z]){1,})(?=(.*[\d]){1,})(?=(.*[\W]){1,})(?!.*\s).{8,}$/,
				`${"Enter a correct password"}`
			),
	});

	const {
		handleSubmit,
		register,
		control,
		formState: { errors, isSubmitting },
		reset,
	} = useForm<ILoginForm>({
		resolver: yupResolver(loginFormSchema),
	});

	const emailOrUsernameValue = useWatch({
		control,
		name: "emailOrUsername",
		defaultValue: "",
	});

	const getForgotPasswordState = useCallback(() => {
		const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
		if (emailRegex.test(emailOrUsernameValue)) {
			return { email: emailOrUsernameValue };
		}
		return undefined;
	}, [emailOrUsernameValue]);

	const onSubmit = async (data: ILoginForm) => {
		// console.log(data);
		try {
			await login(data);
		} catch (err) {
			if (err instanceof AxiosError) {
				if (err.response?.status === 403) {
					toast.error("Account is not active.");
					const inputValue = data.emailOrUsername;
					const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
					const email = emailRegex.test(inputValue) ? inputValue : '';
					if (email) {
						resendVerificationEmail(email).then(() => {
							console.log("Verification email sent.");
						}).catch((err) => {
							console.error("Error: ", err);
						});
						navigate(`/auth/verify-email?email=${encodeURIComponent(email)}`);
					} else {
						reset({ emailOrUsername: '' });
						toast.error("Please use your email instead to login and verify your account.");
					}
					return;
				}
				const errors = err.response?.data?.errors;
				toast.error(errors?.[0] || "Login failed");
				return;
			}
			toast.error("Login failed");
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
						Welcome Back Buddy!
					</h2>
					<p className="urbanist-font font-medium text-xl max-md:text-lg">
						It&apos;s been a while here since you were gone.
					</p>
				</div>
				<div className="md:px-2.5">
					<div className="space-y-2">
						<label
							htmlFor="email"
							className="text-white urbanist-font md:text-lg"
						>
							Hey, remind us your email or username.
						</label>
						<input
							id="emailOrUsername"
							placeholder="Your email address or username"
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
							And your Password
						</label>
						<div className="relative">
							<input
								type={showPassword ? "text" : "password"}
								id="password"
								placeholder="Your password"
								className="w-full border-[1.5px] py-3.5 px-5 border-white placeholder:text-lg bg-white/10 rounded-2xl focus:outline-none urbanist-font text-white"
								{...register("password")}
							/>
							<div className="absolute right-5 inset-y-0 top-[50%] transform -translate-y-[50%]">
								{showPassword ? (
									<AiOutlineEye
										className="w-6 h-6"
										color="white"
										// size={23}
										onClick={() =>
											setShowPassword(!showPassword)
										}
									/>
								) : (
									<AiOutlineEyeInvisible
										className="w-6 h-6"
										color="white"
										// size={23}
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
						<div>
							<input
								type="checkbox"
								className="md:w-[1.17rem] md:h-[1.17rem] w-4 h-4 rounded-md border-secondary border-1"
							/>
							<span className="text-white urbanist-font ml-2.5">
								Keep me logged in next time
							</span>
						</div>
						<Link
							to="/auth/forgot-password"
							state={getForgotPasswordState()}
							className="text-white flex justify-end items-end urbanist-font gap-x-2"
						>
							Forgot password?
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
						Login into account
					</Button>
				</div>
			</form>
		</div>
	);
};

export default Login;
