import type { Metadata } from "next";
import ResetPasswordClient from "./reset-password-client";

export const metadata: Metadata = {
  title: "Reset password | Django Cameroon",
  robots: { index: false },
};

export default function ResetPasswordPage() {
  return <ResetPasswordClient />;
}
