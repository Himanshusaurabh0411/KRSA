import { NextResponse } from "next/server";
import {
  ADMIN_OTP_COOKIE,
  createOtp,
  createOtpChallengeToken,
  getAllowedAdminEmails,
  getCookieOptions,
  isAllowedAdminEmail,
  normalizeAdminEmail
} from "@/lib/admin-auth";
import { sendAdminOtpEmail } from "@/lib/admin-email";

export const runtime = "nodejs";

export async function POST(request: Request) {
  const { email } = (await request.json().catch(() => ({}))) as { email?: string };
  const normalizedEmail = normalizeAdminEmail(email || "");

  if (!normalizedEmail) {
    return NextResponse.json({ message: "Enter your admin email." }, { status: 400 });
  }

  if (getAllowedAdminEmails().length === 0) {
    return NextResponse.json(
      { message: "Admin email access is not configured yet. Add ADMIN_EMAILS in Vercel first." },
      { status: 503 }
    );
  }

  if (!isAllowedAdminEmail(normalizedEmail)) {
    return NextResponse.json({ message: "This email is not allowed for KRSA admin access." }, { status: 403 });
  }

  const otp = createOtp();
  const emailResult = await sendAdminOtpEmail(normalizedEmail, otp);
  const testMode = process.env.ADMIN_OTP_TEST_MODE === "true" || process.env.NODE_ENV !== "production";

  if (!emailResult.configured && !testMode) {
    return NextResponse.json(
      { message: "OTP email delivery is not configured yet. Add RESEND_API_KEY and ADMIN_OTP_FROM in Vercel." },
      { status: 503 }
    );
  }

  const response = NextResponse.json({
    message: emailResult.configured ? "OTP sent to the admin email." : "OTP generated for local testing.",
    otpPreview: !emailResult.configured && testMode ? otp : undefined
  });

  response.cookies.set(ADMIN_OTP_COOKIE, createOtpChallengeToken(normalizedEmail, otp), getCookieOptions(10 * 60));

  return response;
}
