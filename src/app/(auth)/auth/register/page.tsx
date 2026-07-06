import type { Metadata } from "next";
import RegisterClient from "./register-client";

export const metadata: Metadata = {
  title: "Register | Django Cameroon",
  robots: { index: false },
};

export default function RegisterPage() {
  return <RegisterClient />;
}
