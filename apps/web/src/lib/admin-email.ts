import nodemailer from "nodemailer";

const getOtpEmailContent = (otp: string) => ({
  subject: "KRSA admin login OTP",
  text: `Your KRSA admin OTP is ${otp}. It expires in 10 minutes.`,
  html: `
    <div style="font-family:Arial,sans-serif;line-height:1.5;color:#111126">
      <h2>KRSA Admin Login</h2>
      <p>Your one-time password is:</p>
      <p style="font-size:28px;font-weight:700;letter-spacing:6px">${otp}</p>
      <p>This OTP expires in 10 minutes. If you did not request it, please ignore this email.</p>
    </div>
  `
});

const sendWithResend = async (email: string, otp: string) => {
  const apiKey = process.env.RESEND_API_KEY;
  const from = process.env.ADMIN_OTP_FROM || process.env.MAIL_FROM;

  if (!apiKey || !from) return false;

  const content = getOtpEmailContent(otp);
  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      from,
      to: email,
      subject: content.subject,
      text: content.text,
      html: content.html
    })
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Resend OTP email failed: ${errorText}`);
  }

  return true;
};

const sendWithSmtp = async (email: string, otp: string) => {
  const host = process.env.ADMIN_SMTP_HOST || process.env.SMTP_HOST;
  const port = Number(process.env.ADMIN_SMTP_PORT || process.env.SMTP_PORT || 587);
  const user = process.env.ADMIN_SMTP_USER || process.env.SMTP_USER;
  const pass = process.env.ADMIN_SMTP_PASS || process.env.SMTP_PASS;
  const from = process.env.ADMIN_OTP_FROM || process.env.MAIL_FROM || user;

  if (!host || !user || !pass || !from) return false;

  const content = getOtpEmailContent(otp);
  const transporter = nodemailer.createTransport({
    host,
    port,
    secure: port === 465,
    auth: { user, pass }
  });

  await transporter.sendMail({
    from,
    to: email,
    subject: content.subject,
    text: content.text,
    html: content.html
  });

  return true;
};

export const sendAdminOtpEmail = async (email: string, otp: string) => {
  const sentWithResend = await sendWithResend(email, otp);
  if (sentWithResend) return { configured: true, provider: "resend" };

  const sentWithSmtp = await sendWithSmtp(email, otp);
  if (sentWithSmtp) return { configured: true, provider: "smtp" };

  return { configured: false };
};
