"use client";

import Link from "next/link";
import { useState } from "react";
import { LockKeyhole, ShieldCheck } from "lucide-react";
import { PageHero } from "@/components/page-hero";
import { academy } from "@/lib/data";
import { KheloIndiaLogo } from "@/components/official-brand";

export default function LoginPage() {
  const [submitted, setSubmitted] = useState(false);

  return (
    <main>
      <PageHero
        eyebrow="KRSA Login"
        title="Secure portal access"
        copy="Sign in with your registered KRSA credentials."
      />
      <section className="section-pad bg-cream dark:bg-[#111126]">
        <div className="container-wide flex justify-center">
          <div className="panel w-full max-w-md overflow-hidden">
            <div className="bg-navy p-6 text-white">
              <span className="flex h-16 w-36 items-center rounded-md bg-white px-4 py-2 shadow-sm">
                <KheloIndiaLogo priority />
              </span>
              <p className="mt-6 font-display text-3xl font-bold uppercase">Login Portal</p>
              <p className="mt-1 text-xs font-bold uppercase tracking-[0.16em] text-orange">{academy.accreditation}</p>
            </div>
            <div className="p-6">
              <div className="flex items-center gap-3">
                <span className="flex h-11 w-11 items-center justify-center rounded-md bg-navy text-white">
                  <LockKeyhole size={20} />
                </span>
                <div>
                  <p className="font-display text-2xl font-bold uppercase text-ink dark:text-white">Member Login</p>
                  <p className="text-sm text-muted dark:text-white/60">Use your registered email or phone.</p>
                </div>
              </div>

              <form
                className="mt-6 grid gap-4"
                onSubmit={(event) => {
                  event.preventDefault();
                  setSubmitted(true);
                }}
              >
                <label className="grid gap-2 text-sm font-bold">
                  Registered email or phone
                  <input
                    aria-label="Registered email or phone"
                    type="text"
                    placeholder="Enter registered email or phone"
                    className="rounded-md border border-slate-300 bg-white px-4 py-3 font-normal dark:border-white/10 dark:bg-white/5"
                  />
                </label>
                <label className="grid gap-2 text-sm font-bold">
                  Password
                  <input
                    aria-label="Password"
                    type="password"
                    placeholder="Enter password"
                    className="rounded-md border border-slate-300 bg-white px-4 py-3 font-normal dark:border-white/10 dark:bg-white/5"
                  />
                </label>
                <div className="flex items-center justify-between gap-3 text-sm">
                  <label className="flex items-center gap-2 text-muted dark:text-white/60">
                    <input type="checkbox" className="h-4 w-4 rounded border-slate-300 text-orange focus:ring-orange" />
                    Remember me
                  </label>
                  <Link href="/contact" className="font-bold text-navy hover:text-orange dark:text-white">
                    Need help?
                  </Link>
                </div>
                <button className="btn-primary w-full" type="submit">
                  Login to Portal <ShieldCheck size={18} />
                </button>
              </form>

              {submitted ? (
                <p className="mt-4 rounded-md bg-slate-50 p-4 text-sm leading-6 text-muted dark:bg-white/5 dark:text-white/60">
                  Account verification is being configured by KRSA administration.
                </p>
              ) : null}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
