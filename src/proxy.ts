import { NextRequest, NextResponse } from "next/server";
import { decodeSession, SESSION_COOKIE } from "@/lib/session-shared";

export function proxy(req: NextRequest) {
  const session = decodeSession(req.cookies.get(SESSION_COOKIE)?.value);
  const isAuthenticated = !!session;
  const { pathname, searchParams } = req.nextUrl;

  // Authenticated users have no business on the auth screens — send them
  // where they were headed (or home).
  if (pathname.startsWith("/auth")) {
    if (isAuthenticated) {
      return NextResponse.redirect(new URL(searchParams.get("redirect") || "/", req.url));
    }
    return NextResponse.next();
  }

  // Blog editor routes require a session.
  if (!isAuthenticated) {
    const login = new URL("/auth/login", req.url);
    login.searchParams.set("redirect", pathname);
    return NextResponse.redirect(login);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/auth/:path*", "/blog/new", "/blog/:slug/edit"],
};
