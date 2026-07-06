import { NextRequest, NextResponse } from "next/server";
import { decodeSession, SESSION_COOKIE } from "@/lib/session-shared";

const API_BASE = process.env.API_URL ?? process.env.NEXT_PUBLIC_API_URL;

/**
 * Authenticated pass-through to the Django API. Browser code calls
 * /api/proxy/<endpoint> and the Bearer token is injected here from the
 * httpOnly session cookie, so it never reaches client-side JavaScript.
 */
async function handler(
  req: NextRequest,
  { params }: { params: Promise<{ path: string[] }> }
) {
  const { path } = await params;
  // Django endpoints all use trailing slashes.
  const url = new URL(`${API_BASE}/api/v1/${path.join("/")}/`);
  url.search = req.nextUrl.search;

  const headers = new Headers();
  const contentType = req.headers.get("content-type");
  if (contentType) headers.set("content-type", contentType);

  const session = decodeSession(req.cookies.get(SESSION_COOKIE)?.value);
  if (session) headers.set("authorization", `Bearer ${session.token.accessToken}`);

  const init: RequestInit = { method: req.method, headers, cache: "no-store" };
  if (req.method !== "GET" && req.method !== "HEAD") {
    init.body = await req.arrayBuffer();
  }

  const upstream = await fetch(url, init);

  const hasBody = upstream.status !== 204 && upstream.status !== 205 && upstream.status !== 304;
  const body = hasBody ? await upstream.arrayBuffer() : null;

  return new NextResponse(body, {
    status: upstream.status,
    headers: {
      "content-type": upstream.headers.get("content-type") ?? "application/json",
    },
  });
}

export {
  handler as GET,
  handler as POST,
  handler as PUT,
  handler as PATCH,
  handler as DELETE,
};
