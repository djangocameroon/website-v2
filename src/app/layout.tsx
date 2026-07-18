import type { Metadata, Viewport } from "next";
import { Toaster } from "react-hot-toast";
import { Footer } from "@/components/layout";
import Providers from "@/providers";
import { readSession } from "@/lib/server/session";
import { fontVariables } from "./fonts";
import "./globals.css";
import { getLocale, getMessages } from "next-intl/server";
import { NextIntlClientProvider } from "next-intl";

const SITE_URL = process.env.SITE_URL ?? "https://djangocameroon.org";
const DESCRIPTION =
  "Join the Django Cameroon community. Learn, collaborate, and build amazing web applications with Django.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: "Django Cameroon",
  description: DESCRIPTION,
  keywords: ["Django", "Cameroon", "Web Development", "Python", "Community"],
  authors: [{ name: "Django Cameroon" }],
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: SITE_URL,
  },
  icons: {
    icon: "/favicon.svg",
  },
  openGraph: {
    locale: "en_US",
    type: "website",
    title: "Django Cameroon",
    description: DESCRIPTION,
    url: SITE_URL,
    siteName: "Django Cameroon",
    images: [
      {
        url: `${SITE_URL}/ogimage.png`,
        width: 2500,
        height: 1389,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Django Cameroon",
    description: DESCRIPTION,
    images: [`${SITE_URL}/ogimage.png`],
    creator: "@djangocameroon",
  },
  other: {
    "msapplication-TileColor": "#4285F4",
    language: "English",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#4285F4",
};

const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Django Cameroon",
  description:
    "A community dedicated to promoting Django and Python web development in Cameroon",
  url: SITE_URL,
  logo: `${SITE_URL}/favicon.svg`,
  sameAs: [
    "https://twitter.com/djangocameroon",
    "https://facebook.com/djangocameroon",
    "https://github.com/djangocameroon",
  ],
  contactPoint: {
    "@type": "ContactPoint",
    contactType: "Community",
    url: `${SITE_URL}/contact`,
  },
};

export default async function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const session = await readSession();

  const messages = await getMessages();
  const locale = await getLocale();

  return (
    <html lang={locale} className="scroll-smooth">
      <body className={fontVariables}>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(organizationJsonLd),
          }}
        />
        <NextIntlClientProvider messages={messages}>
          <Providers initialUser={session?.user ?? null}>
            <div className="relative flex flex-col min-h-screen max-w-[4000px]">
              <div className="flex-grow">{children}</div>
              <div className="bg-transparent mt-auto">
                <Footer />
              </div>
            </div>
            <Toaster
              position="bottom-right"
              toastOptions={{
                // Default styles for all toasts
                style: {
                  background: "rgba(10, 14, 39, 0.95)",
                  color: "#fff",
                  border: "1px solid rgba(66, 133, 244, 0.3)",
                  borderRadius: "1rem",
                  fontFamily: "var(--font-urbanist), sans-serif",
                  backdropFilter: "blur(10px)",
                },
                duration: 4000,
                success: {
                  duration: 2500,
                  style: {
                    background: "rgba(16, 62, 46, 0.95)",
                    border: "1px solid rgba(34, 197, 94, 0.5)",
                  },
                  iconTheme: {
                    primary: "rgb(15, 157, 88)",
                    secondary: "#fff",
                  },
                },
                error: {
                  duration: 5000,
                  style: {
                    background: "rgba(39, 10, 10, 0.95)",
                    border: "1px solid rgba(239, 68, 68, 0.5)",
                  },
                  iconTheme: {
                    primary: "rgb(219, 68, 55)",
                    secondary: "#fff",
                  },
                },
                loading: {
                  style: {
                    background: "rgba(10, 14, 39, 0.95)",
                    border: "1px solid rgba(66, 133, 244, 0.5)",
                  },
                },
              }}
            />
          </Providers>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
