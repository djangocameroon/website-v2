export interface ForgotPasswordForm {
    email: string
}

export interface ResetPasswordForm {
    // code :string
    password: string;
    confirmPassword: string;
}