"use client";

import { QueryClientProvider } from "@tanstack/react-query";
import { getQueryClient } from "@/lib/query-client";
import { LoggedInUser } from "@/types";
import AuthProvider from "@/components/contexts/auth-context";
import LanguageProvider from "@/components/contexts/language-context";

export default function Providers({
  children,
  initialUser,
}: {
  children: React.ReactNode;
  initialUser: LoggedInUser | null;
  localeMessages?: Record<string, string>;
}) {
  const queryClient = getQueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <LanguageProvider>
        <AuthProvider initialUser={initialUser}>{children}</AuthProvider>
      </LanguageProvider>
    </QueryClientProvider>
  );
}
