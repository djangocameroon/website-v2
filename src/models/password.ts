export interface ForgotPasswordForm {
    code :string
    email: string
}

export interface ResetPasswordForm {
    password: string;
    confirmPassword: string;
}