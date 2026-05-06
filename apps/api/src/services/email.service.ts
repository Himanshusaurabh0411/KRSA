import nodemailer from "nodemailer";
import { env } from "../config/env.js";

export async function sendEmail(to: string, subject: string, html: string) {
  if (!env.SMTP_HOST || !env.SMTP_USER || !env.SMTP_PASS) {
    console.log("Email skipped, SMTP not configured", { to, subject });
    return;
  }

  const transporter = nodemailer.createTransport({
    host: env.SMTP_HOST,
    port: env.SMTP_PORT ?? 587,
    secure: false,
    auth: { user: env.SMTP_USER, pass: env.SMTP_PASS }
  });

  await transporter.sendMail({
    from: env.MAIL_FROM ?? env.SMTP_USER,
    to,
    subject,
    html
  });
}
