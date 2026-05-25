import { NextResponse } from "next/server";
import { ADMIN_OTP_COOKIE, ADMIN_SESSION_COOKIE } from "@/lib/admin-auth";

export const runtime = "nodejs";

export async function POST() {
  const response = NextResponse.json({ message: "Signed out." });
  response.cookies.delete(ADMIN_SESSION_COOKIE);
  response.cookies.delete(ADMIN_OTP_COOKIE);
  return response;
}
