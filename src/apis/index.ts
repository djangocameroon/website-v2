import axios from "axios";
import axiosClient from "./axios";
import { ILoginForm, IRegisterForm } from "@/models";
import { LoggedInUser } from "@/types";

export type IResponse<T = unknown> = {
	message: string;
	status_code: number;
} & ({
	status: false;
	errors: string[];
} | {
	status: true;
	data: T
})

export const registerUser = async (
	body: IRegisterForm
) => {
	const requestBody = {
		email: body.email,
		username: body.username,
		password: body.password,
		password_confirmation: body.passwordConfirmation,
		first_name: body.name.split(" ")[0],
		last_name: body.name.split(" ")[1],
	};
	const { data } = await axiosClient.post<IResponse>(
		"/auth/register/",
		requestBody
	);
	return data;
};

// Login and logout go through internal Next.js route handlers, which exchange
// credentials with the Django API and manage the httpOnly session cookie.
export const signinUser = async (
	body: ILoginForm
) => {
	const requestBody = {
		email_or_username: body.emailOrUsername,
		password: body.password,
		remember_me: body.remember_me,
	};
	const { data } = await axios.post<IResponse<{ user: LoggedInUser }>>(
		"/api/auth/login",
		requestBody
	);
	return data;
};

export const signOutUser = async () => {
	const { data } = await axios.post<IResponse>("/api/auth/logout");
	return data;
};

export const verifyUserEmail = async (body: {
	email: string;
	otp: string;
}): Promise<IResponse | null> => {
	const { data } = await axiosClient.post<IResponse>("/auth/verify-email/", body);
	return data;
};

export const resendVerificationEmail = async (email: string): Promise<IResponse | null> => {
	const { data } = await axiosClient.post<IResponse>("/auth/resend-verification/", { email });
	return data;
};

export const sendPasswordResetRequest = async (email: string): Promise<IResponse | null> => {
	const { data } = await axiosClient.post<IResponse>("/auth/password/reset/", { email });
	return data;
};

export const resetUserPassword = async (body: {
	otp: string;
	password: string;
	password_confirmation: string;
}): Promise<IResponse | null> => {
	const { data } = await axiosClient.post<IResponse>("/auth/password/reset/confirm/", body);
	return data;
};
