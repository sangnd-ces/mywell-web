import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { REQUIRED_ROLES } from "@/config/roles";

export async function POST(req: Request) {
  const body = (await req.json().catch(() => ({}))) as { email?: string };
  const session = {
    userId: "u_mock",
    displayName: body.email ?? "Test User",
    roles: REQUIRED_ROLES,
    tenantId: "t_demo",
    expiresAt: new Date(Date.now() + 24 * 3600 * 1000).toISOString(),
  };
  const cookieStore = await cookies();
  cookieStore.set("__mywell_session", JSON.stringify(session), {
    httpOnly: true,
    sameSite: "lax",
    path: "/",
    maxAge: 24 * 3600,
  });
  return NextResponse.json(session);
}

export async function DELETE() {
  const cookieStore = await cookies();
  cookieStore.delete("__mywell_session");
  return NextResponse.json({ ok: true });
}

export async function GET() {
  const cookieStore = await cookies();
  const raw = cookieStore.get("__mywell_session")?.value;
  if (!raw) return NextResponse.json(null);
  try {
    return NextResponse.json(JSON.parse(raw));
  } catch {
    return NextResponse.json(null);
  }
}
