"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { KeyRound, Loader2, ShieldCheck } from "lucide-react";

const inputClass = "w-full rounded-md border border-slate-300 bg-white px-3 py-3 text-sm outline-none focus:border-orange dark:border-white/10 dark:bg-[#181833]";

export function AdminOtpLogin() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [step, setStep] = useState<"email" | "otp">("email");
  const [message, setMessage] = useState("");
  const [otpPreview, setOtpPreview] = useState("");
  const [loading, setLoading] = useState(false);

  const requestOtp = async (event: FormEvent) => {
    event.preventDefault();
    setLoading(true);
    setMessage("");
    setOtpPreview("");

    const response = await fetch("/api/admin/otp/request", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email })
    });
    const data = (await response.json().catch(() => ({}))) as { message?: string; otpPreview?: string };

    setLoading(false);
    setMessage(data.message || "OTP request completed.");

    if (response.ok) {
      setStep("otp");
      setOtpPreview(data.otpPreview || "");
    }
  };

  const verifyOtp = async (event: FormEvent) => {
    event.preventDefault();
    setLoading(true);
    setMessage("");

    const response = await fetch("/api/admin/otp/verify", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, otp })
    });
    const data = (await response.json().catch(() => ({}))) as { message?: string };

    setLoading(false);

    if (!response.ok) {
      setMessage(data.message || "OTP verification failed.");
      return;
    }

    router.refresh();
  };

  return (
    <div className="mx-auto max-w-xl">
      <div className="panel p-6 md:p-8">
        <div className="mb-6 flex items-center gap-3">
          <span className="flex h-11 w-11 items-center justify-center rounded-md bg-orange text-white">
            <ShieldCheck size={22} />
          </span>
          <div>
            <p className="font-display text-2xl font-bold uppercase text-ink dark:text-white">Admin OTP Login</p>
            <p className="text-sm text-muted dark:text-white/60">Enter the approved admin email to receive a one-time password.</p>
          </div>
        </div>

        <form onSubmit={step === "email" ? requestOtp : verifyOtp} className="grid gap-4">
          <label className="grid gap-2">
            <span className="text-xs font-bold uppercase tracking-[0.14em] text-muted dark:text-white/55">Admin email</span>
            <input
              type="email"
              required
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              disabled={step === "otp"}
              className={inputClass}
              placeholder="admin@example.com"
            />
          </label>

          {step === "otp" ? (
            <label className="grid gap-2">
              <span className="text-xs font-bold uppercase tracking-[0.14em] text-muted dark:text-white/55">6-digit OTP</span>
              <input
                required
                value={otp}
                onChange={(event) => setOtp(event.target.value.replace(/\D/g, "").slice(0, 6))}
                className={`${inputClass} text-center text-2xl font-bold tracking-[0.4em]`}
                placeholder="000000"
                inputMode="numeric"
              />
            </label>
          ) : null}

          {message ? <p className="rounded-md bg-orange/10 px-4 py-3 text-sm font-bold text-orange">{message}</p> : null}
          {otpPreview ? <p className="rounded-md bg-green/10 px-4 py-3 text-sm font-bold text-green">Local testing OTP: {otpPreview}</p> : null}

          <div className="flex flex-wrap gap-2">
            <button type="submit" disabled={loading} className="btn-primary disabled:cursor-not-allowed disabled:opacity-60">
              {loading ? <Loader2 className="animate-spin" size={18} /> : <KeyRound size={18} />}
              {step === "email" ? "Send OTP" : "Verify OTP"}
            </button>
            {step === "otp" ? (
              <button
                type="button"
                onClick={() => {
                  setStep("email");
                  setOtp("");
                  setMessage("");
                  setOtpPreview("");
                }}
                className="btn-secondary"
              >
                Change Email
              </button>
            ) : null}
          </div>
        </form>
      </div>
    </div>
  );
}
