"use client";

import Link from "next/link";
import { useState } from "react";
import { ArrowRight, LockKeyhole, Mail, ShieldCheck } from "lucide-react";
import { PageHero } from "@/components/page-hero";
import { academy, loginHighlights } from "@/lib/data";
import { KheloIndiaLogo } from "@/components/official-brand";

export default function LoginPage() {
  const [submitted, setSubmitted] = useState(false);

  return (
    <main>
      <PageHero
        eyebrow="Unified Login"
        title="One KRSA portal for every authorised user"
        copy="Admins, coaches, students, athletes, parents and SAI users will all sign in here with their registered credentials. The system will route each user after authentication."
      />
      <section className="section-pad">
        <div className="container-wide grid gap-8 xl:grid-cols-[1fr_430px]">
          <div className="panel overflow-hidden">
            <div className="bg-navy p-6 text-white md:p-8">
              <div className="flex flex-wrap items-center gap-4">
                <span className="flex h-20 w-40 items-center rounded-md bg-white px-4 py-3 shadow-sm">
                  <KheloIndiaLogo priority />
                </span>
                <div>
                  <p className="font-display text-3xl font-bold uppercase">KRSA Secure Access</p>
                  <p className="mt-1 text-sm uppercase tracking-[0.16em] text-orange">{academy.accreditation}</p>
                </div>
              </div>
              <p className="mt-6 max-w-2xl text-sm leading-6 text-white/70">
                {academy.designationHi} | {academy.designationEn}. This page now follows the single-login flow: one credential form, automatic role detection after backend authentication.
              </p>
            </div>
            <div className="grid gap-4 p-6 md:grid-cols-2 md:p-8">
              {loginHighlights.map((item) => (
                <div key={item.title} className="rounded-lg border border-slate-200 p-5 dark:border-white/10">
                  <item.icon className="text-orange" size={26} />
                  <p className="mt-5 font-display text-2xl font-bold uppercase text-ink dark:text-white">{item.title}</p>
                  <p className="mt-3 text-sm leading-6 text-muted dark:text-white/60">{item.description}</p>
                </div>
              ))}
            </div>
          </div>

          <aside className="panel h-fit p-6">
            <div className="flex items-center gap-3">
              <span className="flex h-11 w-11 items-center justify-center rounded-md bg-navy text-white">
                <LockKeyhole size={20} />
              </span>
              <div>
                <p className="font-display text-2xl font-bold uppercase text-ink dark:text-white">Login Portal</p>
                <p className="text-xs font-bold uppercase tracking-[0.16em] text-orange">Single credential access</p>
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

            <p className="mt-4 rounded-md bg-slate-50 p-4 text-sm leading-6 text-muted dark:bg-white/5 dark:text-white/60">
              {submitted
                ? "Preview mode active. Real credential verification and automatic role routing will connect when you share the final user database and backend secrets."
                : "This form is ready for the final authentication flow. Users will not choose a role on the login screen."}
            </p>
            {submitted ? (
              <Link href="/dashboard" className="btn-secondary mt-4 w-full">
                Open preview dashboard <ArrowRight size={18} />
              </Link>
            ) : null}
            <div className="mt-5 flex items-start gap-2 rounded-md border border-orange/20 bg-orange/10 p-4 text-sm leading-6 text-ink dark:text-white">
              <Mail className="mt-1 shrink-0 text-orange" size={16} />
              <span>Share the final admin, coach, student, athlete and parent credentials tomorrow, and I will connect this page to real role-based sessions.</span>
            </div>
          </aside>
        </div>
      </section>
    </main>
  );
}
