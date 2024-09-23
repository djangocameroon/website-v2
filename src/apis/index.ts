// This function contains the different API functions

import { AxiosError } from "axios";
import axiosClient from "./axios";
import { ILoginForm, IRegisterForm } from "../models";
import { toast } from "react-hot-toast";

type IResponse<T = unknown> = {
	message: string;
	status_code: number;
} & ({
	status: false;
    errors: string[];
} | {
	status: true;
    data: T
})

type IUserResponse = {
	access_token: string;
	refresh_token: string;
	expires_in: string;
	user: {
		id: string;
		email: string;
		username: string;
		profile_image: string;
		first_name: string;
		last_name: string;
		last_login?: Date;
	};
};

export const registerUser = async (
	body: IRegisterForm
): Promise<IResponse | null> => {
	try {
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
		toast.success(data.message);
		return data;
	} catch (err) {
		if (err instanceof AxiosError){
            const { data: { errors } } = err.response!
            toast.error(errors[0]);
        }
		return null;
	}
};

export const signinUser = async (
	body: ILoginForm
): Promise<IUserResponse | null> => {
	try {
        const requestBody = {
			email_or_username: body.emailOrUsername,
			password: body.password,
		};
		const { data } = await axiosClient.post<IResponse<IUserResponse>>("/auth/login/", requestBody);
		toast.success(data.message);
        if (data.status) return data.data;
	} catch (err: unknown) {
		if (err instanceof AxiosError){
            const { data: { errors } } = err.response!
            toast.error(errors[0]);
        }
	}
    return null;
};
