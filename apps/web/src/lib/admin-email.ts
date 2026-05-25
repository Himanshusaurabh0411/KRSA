export const sendAdminOtpEmail = async (email: string, otp: string) => {
  const apiKey = process.env.RESEND_API_KEY;
  const from = process.env.ADMIN_OTP_FROM || process.env.MAIL_FROM;

  if (!apiKey || !from) {
    return { configured: false };
  }

  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      from,
      to: email,
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
    })
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`OTP email failed: ${errorText}`);
  }

  return { configured: true };
};
