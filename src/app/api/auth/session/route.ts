import { NextRequest, NextResponse } from "next/server";
import { decodeSession, SESSION_COOKIE } from "@/lib/session-shared";

export async function GET(req: NextRequest) {
  const session = decodeSession(req.cookies.get(SESSION_COOKIE)?.value);

  if (!session) {
    return NextResponse.json(
      { status: false, message: "Not authenticated", status_code: 401, errors: ["Not authenticated"] },
      { status: 401 }
    );
  }

  return NextResponse.json({
    status: true,
    message: "Authenticated",
    status_code: 200,
    data: { user: session.user },
  });
}
