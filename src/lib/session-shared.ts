import { AuthInfoT } from "@/types";

/**
 * Session cookie codec shared by route handlers, the proxy (middleware) and
 * server components. Pure functions only — no next/headers import — so it is
 * safe to use in any runtime.
 */
export const SESSION_COOKIE = "dj_session";

export const encodeSession = (info: AuthInfoT): string =>
  encodeURIComponent(JSON.stringify(info));

export const isSessionExpired = (info: AuthInfoT): boolean => {
  const expiresAt = new Date(info.token.expiresIn).getTime();
  return isNaN(expiresAt) || expiresAt <= Date.now();
};

export const decodeSession = (value?: string): AuthInfoT | null => {
  if (!value) return null;
  try {
    const parsed = JSON.parse(decodeURIComponent(value)) as AuthInfoT;
    if (!parsed?.user || !parsed?.token?.accessToken) return null;
    return isSessionExpired(parsed) ? null : parsed;
  } catch {
    return null;
  }
};
