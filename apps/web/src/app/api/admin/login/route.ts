import { NextResponse } from "next/server";
import {
  ADMIN_OTP_COOKIE,
  ADMIN_SESSION_COOKIE,
  createAdminSessionToken,
  getAdminSessionMaxAge,
  getAllowedAdminEmails,
  getCookieOptions,
  isAdminPasswordConfigured,
  isAllowedAdminEmail,
  normalizeAdminEmail,
  verifyAdminPassword
} from "@/lib/admin-auth";

export const runtime = "nodejs";

export async function POST(request: Request) {
  const { email, password } = (await request.json().catch(() => ({}))) as { email?: string; password?: string };
  const normalizedEmail = normalizeAdminEmail(email || "");

  if (!normalizedEmail || !password) {
    return NextResponse.json({ message: "Enter your admin email and password." }, { status: 400 });
  }

  if (getAllowedAdminEmails().length === 0) {
    return NextResponse.json({ message: "Admin email access is not configured yet." }, { status: 503 });
  }

  if (!isAdminPasswordConfigured()) {
    return NextResponse.json({ message: "Admin password is not configured yet." }, { status: 503 });
  }

  if (!isAllowedAdminEmail(normalizedEmail) || !verifyAdminPassword(password)) {
    return NextResponse.json({ message: "Invalid admin credentials." }, { status: 401 });
  }

  const response = NextResponse.json({ message: "Admin logged in." });
  response.cookies.set(ADMIN_SESSION_COOKIE, createAdminSessionToken(normalizedEmail), getCookieOptions(getAdminSessionMaxAge()));
  response.cookies.delete(ADMIN_OTP_COOKIE);

  return response;
}
