import type { Metadata } from "next";
import { Suspense } from "react";
import ForgotPasswordClient from "./forgot-password-client";

export const metadata: Metadata = {
  title: "Forgot password | Django Cameroon",
  robots: { index: false },
};

export default function ForgotPasswordPage() {
  return (
    <Suspense>
      <ForgotPasswordClient />
    </Suspense>
  );
}
