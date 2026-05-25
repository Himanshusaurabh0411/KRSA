import { NextResponse } from "next/server";
import {
  ADMIN_OTP_COOKIE,
  ADMIN_SESSION_COOKIE,
  createAdminSessionToken,
  getAdminSessionMaxAge,
  getCookieOptions,
  isAllowedAdminEmail,
  normalizeAdminEmail,
  readOtpChallenge,
  updateOtpChallengeAttempts,
  verifyOtpChallenge
} from "@/lib/admin-auth";

export const runtime = "nodejs";

export async function POST(request: Request) {
  const { email, otp } = (await request.json().catch(() => ({}))) as { email?: string; otp?: string };
  const normalizedEmail = normalizeAdminEmail(email || "");
  const challengeToken = request.headers
    .get("cookie")
    ?.split(";")
    .map((value) => value.trim())
    .find((value) => value.startsWith(`${ADMIN_OTP_COOKIE}=`))
    ?.split("=")[1];
  const challenge = readOtpChallenge(challengeToken);

  if (!normalizedEmail || !otp) {
    return NextResponse.json({ message: "Enter your email and OTP." }, { status: 400 });
  }

  if (!isAllowedAdminEmail(normalizedEmail) || !challenge) {
    return NextResponse.json({ message: "Request a new OTP." }, { status: 401 });
  }

  if (!verifyOtpChallenge(challenge, normalizedEmail, otp)) {
    const response = NextResponse.json({ message: "Invalid or expired OTP." }, { status: 401 });

    if (Date.now() <= challenge.expiresAt && challenge.attempts < 5) {
      response.cookies.set(ADMIN_OTP_COOKIE, updateOtpChallengeAttempts(challenge), getCookieOptions(10 * 60));
    } else {
      response.cookies.delete(ADMIN_OTP_COOKIE);
    }

    return response;
  }

  const response = NextResponse.json({ message: "Admin verified." });
  response.cookies.set(ADMIN_SESSION_COOKIE, createAdminSessionToken(normalizedEmail), getCookieOptions(getAdminSessionMaxAge()));
  response.cookies.delete(ADMIN_OTP_COOKIE);

  return response;
}
