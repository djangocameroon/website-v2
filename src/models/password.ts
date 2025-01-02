export interface ForgotPasswordForm {
    email: string;
    code: string;
}

export interface ResetPasswordForm {
    password: string;
    confirmPassword: string;
}
