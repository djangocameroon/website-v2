import type { Metadata } from "next";
import { Suspense } from "react";
import NewsletterSubscriptionClient from "./newsletter-subscription-client";

export const metadata: Metadata = {
  title: "Newsletter subscription | Django Cameroon",
  robots: {
    index: false,
  },
};

export default function NewsletterSubscriptionPage() {
  return (
    <Suspense>
      <NewsletterSubscriptionClient />
    </Suspense>
  );
}
