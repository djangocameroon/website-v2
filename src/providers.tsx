"use client";

import { QueryClientProvider } from "@tanstack/react-query";
import { getQueryClient } from "@/lib/query-client";
import AuthProvider from "@/components/contexts/auth-context";
import { LoggedInUser } from "@/types";

export default function Providers({
  children,
  initialUser,
}: {
  children: React.ReactNode;
  initialUser: LoggedInUser | null;
}) {
  const queryClient = getQueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider initialUser={initialUser}>{children}</AuthProvider>
    </QueryClientProvider>
  );
}
