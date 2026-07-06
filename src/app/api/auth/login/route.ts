import { NextRequest, NextResponse } from "next/server";
import { AuthInfoT } from "@/types";
import { encodeSession, SESSION_COOKIE } from "@/lib/session-shared";

const API_BASE = process.env.API_URL ?? process.env.NEXT_PUBLIC_API_URL;

type DjangoLoginData = {
  access_token: string;
  refresh_token: string;
  expires_in: string;
  user: {
    id: string;
    email: string;
    username: string;
    profile_image: string;
    first_name: string;
    last_name: string;
    last_login?: string;
  };
};

export async function POST(req: NextRequest) {
  const body = await req.json();

  const upstream = await fetch(`${API_BASE}/api/v1/auth/login/`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
    cache: "no-store",
  });

  const data = await upstream.json().catch(() => null);

  if (!upstream.ok || !data?.status) {
    return NextResponse.json(
      data ?? { status: false, message: "Login failed", status_code: upstream.status, errors: ["Login failed"] },
      { status: upstream.status || 400 }
    );
  }

  const { user, access_token, refresh_token, expires_in } = data.data as DjangoLoginData;

  const authInfo: AuthInfoT = {
    user: {
      id: user.id,
      email: user.email,
      username: user.username,
      profileImage: user.profile_image,
      firstName: user.first_name,
      lastName: user.last_name,
    },
    token: {
      accessToken: access_token,
      refreshToken: refresh_token,
      expiresIn: expires_in,
    },
  };

  // Return the user only — tokens stay in the httpOnly cookie.
  const response = NextResponse.json({
    status: true,
    message: data.message,
    status_code: data.status_code,
    data: { user: authInfo.user },
  });

  const expiresAt = new Date(expires_in);
  response.cookies.set(SESSION_COOKIE, encodeSession(authInfo), {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    ...(isNaN(expiresAt.getTime()) ? {} : { expires: expiresAt }),
  });

  return response;
}
