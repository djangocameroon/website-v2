import type { Metadata } from "next";
import { Suspense } from "react";
import VerifyEmailClient from "./verify-email-client";

export const metadata: Metadata = {
  title: "Verify email | Django Cameroon",
  robots: { index: false },
};

export default function VerifyEmailPage() {
  return (
    <Suspense>
      <VerifyEmailClient />
    </Suspense>
  );
}
