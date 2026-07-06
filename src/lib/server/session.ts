import { cookies } from "next/headers";
import { AuthInfoT } from "@/types";
import { decodeSession, SESSION_COOKIE } from "@/lib/session-shared";

/** Reads the current session from the httpOnly cookie (server-side only). */
export const readSession = async (): Promise<AuthInfoT | null> => {
  try {
    const store = await cookies();
    return decodeSession(store.get(SESSION_COOKIE)?.value);
  } catch {
    // Outside a request scope (e.g. build-time sitemap generation) there is no
    // cookie store — treat as anonymous.
    return null;
  }
};
