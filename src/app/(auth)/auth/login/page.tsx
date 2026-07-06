import type { Metadata } from "next";
import LoginClient from "./login-client";

export const metadata: Metadata = {
  title: "Login | Django Cameroon",
  robots: { index: false },
};

export default function LoginPage() {
  return <LoginClient />;
}
