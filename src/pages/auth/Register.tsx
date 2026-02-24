 

import { IRegisterForm } from "@/models";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { Button } from "@/components/layout";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthQuote from "@/components/pages/Auth-Page-Components/AuthQuote";
import { registerUser } from "@/apis";

const Register = () => {
	const navigate = useNavigate();

	const [showPassword, setShowPassword] = useState({
		password1: false,
		password2: false,
	});

	const RegisterFormSchema = yup.object().shape({
		name: yup.string().required("This is required"),
		username: yup.string().required("This is required"),
		email: yup
			.string()
			.required("This is required")
			.matches(
				/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
				"Enter a valid email"
			),
		password: yup
			.string()
			.required("This is required")
			.min(8, "Your password is weak")
			.matches(
				/^(?=.*?[A-Z])(?=(.*[a-z]){1,})(?=(.*[\d]){1,})(?=(.*[\W]){1,})(?!.*\s).{8,}$/,
				"Enter a password with numbers, letters and special characters"
			),
		passwordConfirmation: yup
			.string()
			.required("This is required")
			.test("Passwords match", "Passwords do not match", function (value) {
				return this.parent.password === value;
			}),
	});

	const {
		handleSubmit,
		register,
		formState: { errors, isSubmitting },
	} = useForm<IRegisterForm>({
		resolver: yupResolver(RegisterFormSchema),
	});

	const onSubmit = async (data: IRegisterForm) => {
		console.log(data);
		const res = await registerUser(data);
		if (res && res.status) navigate("/auth/login");
	};

	// Shared input styles with animations
	const inputBaseStyles = `
		w-full border-[1.5px] p-4 border-white/60 text-white bg-white/10 
		rounded-2xl focus:outline-none urbanist-font
		transition-all duration-300 ease-out
		focus:border-secondary focus:bg-white/10 focus:shadow-[0_0_20px_rgba(66,133,244,0.15)]
		hover:border-white/80 hover:bg-white/8
		placeholder:text-white/40
	`;

	const labelStyles = "block text-white/90 urbanist-font text-base md:text-lg mb-2.5 transition-colors duration-200";

	// Animation delay classes for staggered entrance
	const getAnimationDelay = (index: number) => ({
		animationDelay: `${index * 100}ms`,
	});

	return (
		<div className="flex justify-center items-stretch md:gap-10 lg:gap-14 w-full px-4 md:px-0">
			{/* Left side quote panel */}
			<div className="h-[44.4rem] hidden md:block animate-[fadeInLeft_0.6s_ease-out_forwards]">
				<AuthQuote />
			</div>

			{/* Registration form */}
			<form
				onSubmit={handleSubmit(onSubmit)}
				className="
					md:border-secondary/80 md:border-[2px] md:bg-white/10 
					rounded-[2.5rem] md:rounded-[3.125rem] p-6 md:p-10 lg:p-12
					w-full max-w-2xl flex flex-col justify-between
					animate-[fadeInUp_0.5s_ease-out_forwards]
				"
			>
				{/* Header section */}
				<div className="space-y-10 md:space-y-12 mb-8">
					<div 
						className="text-white text-center space-y-3 py-4 animate-[fadeIn_0.6s_ease-out_0.2s_both]"
					>
						<h3 className="text-2xl md:text-3xl font-semibold nohemi-font tracking-tight">
							Good to have you here!
						</h3>
						<p className="urbanist-font text-lg md:text-xl font-medium text-white/80 max-w-md mx-auto leading-relaxed">
							We are always warmed up on welcoming a new member.
							Feel home and safe.
						</p>
					</div>

					{/* Form fields grid */}
					<div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-6">
						{/* Name field */}
						<div 
							className="animate-[fadeInUp_0.5s_ease-out_both] opacity-0"
							style={getAnimationDelay(1)}
						>
							<label htmlFor="name" className={labelStyles}>
								We&apos;ll need your first & last names
							</label>
							<input
								type="text"
								id="name"
								placeholder="Your names"
								className={inputBaseStyles}
								{...register("name")}
							/>
							{errors.name && (
								<p className="mt-2 text-sm text-red-400 urbanist-font animate-[shake_0.4s_ease-in-out]">
									{errors.name?.message}
								</p>
							)}
						</div>

						{/* Email field */}
						<div 
							className="animate-[fadeInUp_0.5s_ease-out_both] opacity-0"
							style={getAnimationDelay(2)}
						>
							<label htmlFor="email" className={labelStyles}>
								What&apos;s your email address?
							</label>
							<input
								type="email"
								id="email"
								placeholder="Your email"
								className={inputBaseStyles}
								{...register("email")}
							/>
							{errors.email && (
								<p className="mt-2 text-sm text-red-400 urbanist-font animate-[shake_0.4s_ease-in-out]">
									{errors.email?.message}
								</p>
							)}
						</div>

						{/* Username field */}
						<div 
							className="animate-[fadeInUp_0.5s_ease-out_both] opacity-0"
							style={getAnimationDelay(3)}
						>
							<label htmlFor="username" className={labelStyles}>
								Set up a username
							</label>
							<input
								type="text"
								id="username"
								placeholder="@your_username"
								className={inputBaseStyles}
								{...register("username")}
							/>
							{errors.username && (
								<p className="mt-2 text-sm text-red-400 urbanist-font animate-[shake_0.4s_ease-in-out]">
									{errors.username?.message}
								</p>
							)}
						</div>

						{/* Password field */}
						<div 
							className="animate-[fadeInUp_0.5s_ease-out_both] opacity-0"
							style={getAnimationDelay(4)}
						>
							<label htmlFor="password" className={labelStyles}>
								Set up a password
							</label>
							<div className="relative group">
								<input
									type={showPassword.password1 ? "text" : "password"}
									id="password"
									placeholder="Your password"
									className={`${inputBaseStyles} pr-12`}
									{...register("password")}
								/>
								<button
									type="button"
									className="absolute right-4 top-1/2 -translate-y-1/2 text-white/60 hover:text-white transition-colors duration-200"
									onClick={() =>
										setShowPassword((prev) => ({
											...prev,
											password1: !prev.password1,
										}))
									}
								>
									{showPassword.password1 ? (
										<AiOutlineEye className="w-5 h-5" />
									) : (
										<AiOutlineEyeInvisible className="w-5 h-5" />
									)}
								</button>
							</div>
							{errors.password && (
								<p
									className={`mt-2 text-sm urbanist-font animate-[shake_0.4s_ease-in-out] ${
										errors.password.message === "Your password is weak"
											? "text-amber-400"
											: "text-red-400"
									}`}
								>
									{errors.password?.message}
								</p>
							)}
						</div>

						{/* Confirm Password field */}
						<div 
							className="md:col-span-2 animate-[fadeInUp_0.5s_ease-out_both] opacity-0"
							style={getAnimationDelay(5)}
						>
							<label htmlFor="password2" className={labelStyles}>
								Confirm your password
							</label>
							<div className="relative group md:max-w-[calc(50%-0.75rem)]">
								<input
									type={showPassword.password2 ? "text" : "password"}
									id="password2"
									placeholder="Re-enter password"
									className={`${inputBaseStyles} pr-12`}
									{...register("passwordConfirmation")}
								/>
								<button
									type="button"
									className="absolute right-4 top-1/2 -translate-y-1/2 text-white/60 hover:text-white transition-colors duration-200"
									onClick={() =>
										setShowPassword((prev) => ({
											...prev,
											password2: !prev.password2,
										}))
									}
								>
									{showPassword.password2 ? (
										<AiOutlineEye className="w-5 h-5" />
									) : (
										<AiOutlineEyeInvisible className="w-5 h-5" />
									)}
								</button>
							</div>
							{errors.passwordConfirmation && (
								<p className="mt-2 text-sm text-red-400 urbanist-font animate-[shake_0.4s_ease-in-out]">
									{errors.passwordConfirmation?.message}
								</p>
							)}
						</div>
					</div>
				</div>

				{/* Submit button */}
				<div 
					className="animate-[fadeInUp_0.5s_ease-out_both] opacity-0"
					style={getAnimationDelay(6)}
				>
					<Button
						backgroundColor="bg-secondary"
						className="
							w-full relative overflow-hidden
							hover:shadow-[0_8px_30px_rgba(66,133,244,0.4)]
							active:scale-[0.98] transition-all duration-300
						"
						spacing={false}
						disabled={isSubmitting}
					>
						<span className={`${isSubmitting ? 'opacity-0' : 'opacity-100'} transition-opacity`}>
							Finish account registration
						</span>
						{isSubmitting && (
							<span className="absolute inset-0 flex items-center justify-center">
								<svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
									<circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
									<path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
								</svg>
							</span>
						)}
					</Button>
				</div>
			</form>

			{/* CSS Keyframe animations */}
			<style>{`
				@keyframes fadeInUp {
					from {
						opacity: 0;
						transform: translateY(20px);
					}
					to {
						opacity: 1;
						transform: translateY(0);
					}
				}
				
				@keyframes fadeInLeft {
					from {
						opacity: 0;
						transform: translateX(-20px);
					}
					to {
						opacity: 1;
						transform: translateX(0);
					}
				}
				
				@keyframes fadeIn {
					from {
						opacity: 0;
					}
					to {
						opacity: 1;
					}
				}
				
				@keyframes shake {
					0%, 100% { transform: translateX(0); }
					20% { transform: translateX(-4px); }
					40% { transform: translateX(4px); }
					60% { transform: translateX(-4px); }
					80% { transform: translateX(4px); }
				}
			`}</style>
		</div>
	);
};

export default Register;
