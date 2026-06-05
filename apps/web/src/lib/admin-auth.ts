import { createHmac, randomInt, scryptSync, timingSafeEqual } from "node:crypto";

export const ADMIN_SESSION_COOKIE = "krsa_admin_session";
export const ADMIN_OTP_COOKIE = "krsa_admin_otp_challenge";

const OTP_TTL_MINUTES = 10;
const DEFAULT_SESSION_HOURS = 8;
const PASSWORD_HASH_BYTES = 64;
const DEFAULT_ADMIN_EMAILS = ["info@krsadelhi.in"];

export type AdminSession = {
  email: string;
  expiresAt: number;
};

type AdminOtpChallenge = {
  email: string;
  expiresAt: number;
  attempts: number;
  otpHash: string;
};

const getSecret = () =>
  process.env.ADMIN_OTP_SECRET ||
  process.env.JWT_SECRET ||
  process.env.NEXTAUTH_SECRET ||
  "krsa-local-admin-otp-secret-change-before-production";

const seal = (payload: unknown) => {
  const body = Buffer.from(JSON.stringify(payload)).toString("base64url");
  const signature = createHmac("sha256", getSecret()).update(body).digest("base64url");
  return `${body}.${signature}`;
};

const unseal = <T>(token?: string): T | null => {
  if (!token) return null;

  const [body, signature] = token.split(".");
  if (!body || !signature) return null;

  const expected = createHmac("sha256", getSecret()).update(body).digest("base64url");
  const actualBuffer = Buffer.from(signature);
  const expectedBuffer = Buffer.from(expected);

  if (actualBuffer.length !== expectedBuffer.length || !timingSafeEqual(actualBuffer, expectedBuffer)) {
    return null;
  }

  try {
    return JSON.parse(Buffer.from(body, "base64url").toString("utf8")) as T;
  } catch {
    return null;
  }
};

export const normalizeAdminEmail = (email: string) => email.trim().toLowerCase();

export const getAllowedAdminEmails = () => {
  const configuredEmails = (process.env.ADMIN_EMAILS || "")
    .split(",")
    .map((email) => normalizeAdminEmail(email))
    .filter(Boolean);

  return configuredEmails.length > 0 ? configuredEmails : DEFAULT_ADMIN_EMAILS;
};

export const isAllowedAdminEmail = (email: string) => {
  const allowedEmails = getAllowedAdminEmails();
  return allowedEmails.length > 0 && allowedEmails.includes(normalizeAdminEmail(email));
};

export const isAdminPasswordConfigured = () => Boolean(process.env.ADMIN_PASSWORD_HASH || process.env.ADMIN_PASSWORD);

const verifyPlainSecret = (password: string, expectedPassword: string) => {
  if (!password || !expectedPassword) return false;

  const actual = createHmac("sha256", getSecret()).update(password).digest();
  const expected = createHmac("sha256", getSecret()).update(expectedPassword).digest();
  return timingSafeEqual(actual, expected);
};

export const verifyAdminPassword = (password: string) => {
  const passwordHash = process.env.ADMIN_PASSWORD_HASH || "";
  const [salt, expectedHash] = passwordHash.split(":");

  if (salt && expectedHash && password) {
    try {
      const actualHash = scryptSync(password, salt, PASSWORD_HASH_BYTES).toString("base64url");
      const actualBuffer = Buffer.from(actualHash);
      const expectedBuffer = Buffer.from(expectedHash);

      if (actualBuffer.length === expectedBuffer.length && timingSafeEqual(actualBuffer, expectedBuffer)) {
        return true;
      }
    } catch {
      return false;
    }
  }

  return verifyPlainSecret(password, process.env.ADMIN_PASSWORD || "");
};

export const createOtp = () => randomInt(100000, 1000000).toString();

export const hashOtp = (email: string, otp: string) =>
  createHmac("sha256", getSecret()).update(`${normalizeAdminEmail(email)}:${otp.trim()}`).digest("base64url");

export const createOtpChallengeToken = (email: string, otp: string) =>
  seal({
    email: normalizeAdminEmail(email),
    expiresAt: Date.now() + OTP_TTL_MINUTES * 60 * 1000,
    attempts: 0,
    otpHash: hashOtp(email, otp)
  } satisfies AdminOtpChallenge);

export const readOtpChallenge = (token?: string) => unseal<AdminOtpChallenge>(token);

export const updateOtpChallengeAttempts = (challenge: AdminOtpChallenge) =>
  seal({ ...challenge, attempts: challenge.attempts + 1 } satisfies AdminOtpChallenge);

export const verifyOtpChallenge = (challenge: AdminOtpChallenge, email: string, otp: string) => {
  if (Date.now() > challenge.expiresAt) return false;
  if (challenge.attempts >= 5) return false;
  if (challenge.email !== normalizeAdminEmail(email)) return false;

  const expected = Buffer.from(challenge.otpHash);
  const actual = Buffer.from(hashOtp(email, otp));

  return expected.length === actual.length && timingSafeEqual(expected, actual);
};

export const createAdminSessionToken = (email: string) => {
  const sessionHours = getAdminSessionHours();
  return seal({
    email: normalizeAdminEmail(email),
    expiresAt: Date.now() + sessionHours * 60 * 60 * 1000
  } satisfies AdminSession);
};

export const readAdminSession = (token?: string) => {
  const session = unseal<AdminSession>(token);
  if (!session || Date.now() > session.expiresAt) return null;
  if (!isAllowedAdminEmail(session.email)) return null;
  return session;
};

export const getCookieOptions = (maxAge: number) => ({
  httpOnly: true,
  sameSite: "lax" as const,
  secure: process.env.NODE_ENV === "production",
  path: "/",
  maxAge
});

export const getAdminSessionHours = () => Number(process.env.ADMIN_SESSION_HOURS || DEFAULT_SESSION_HOURS);

export const getAdminSessionMaxAge = () => getAdminSessionHours() * 60 * 60;
