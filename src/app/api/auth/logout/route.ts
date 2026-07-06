import { NextRequest, NextResponse } from "next/server";
import { decodeSession, SESSION_COOKIE } from "@/lib/session-shared";

const API_BASE = process.env.API_URL ?? process.env.NEXT_PUBLIC_API_URL;

export async function POST(req: NextRequest) {
  const session = decodeSession(req.cookies.get(SESSION_COOKIE)?.value);

  let payload: unknown = { status: true, message: "Logged out", status_code: 200 };

  if (session) {
    // Best effort — the cookie is cleared regardless of the API outcome.
    try {
      const upstream = await fetch(`${API_BASE}/api/v1/auth/logout/`, {
        method: "POST",
        headers: { Authorization: `Bearer ${session.token.accessToken}` },
        cache: "no-store",
      });
      payload = await upstream.json().catch(() => payload);
    } catch {
      // API unreachable — still clear the local session.
    }
  }

  const response = NextResponse.json(payload);
  response.cookies.delete(SESSION_COOKIE);
  return response;
}
