"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { ArrowRight, LockKeyhole, ShieldCheck } from "lucide-react";
import { PageHero } from "@/components/page-hero";
import { academy, loginRoles } from "@/lib/data";

export default function LoginPage() {
  const [activeRole, setActiveRole] = useState(loginRoles[0]);
  const [submitted, setSubmitted] = useState(false);

  const helper = useMemo(() => {
    if (submitted) return `Preview mode ready. Continue to ${activeRole.title.replace(" Login", "")} portal.`;
    return "Use the role cards to preview each portal. Real passwords will connect to /api/auth/login when final data is provided.";
  }, [activeRole.title, submitted]);

  return (
    <main>
      <PageHero
        eyebrow="Secure Login"
        title="Admin, coach, student, athlete and parent access"
        copy="Role-based portal gateway aligned with the KRSA permissions matrix from the website design brief."
      />
      <section className="section-pad">
        <div className="container-wide grid gap-8 xl:grid-cols-[1fr_420px]">
          <div>
            <div className="mb-8 rounded-lg border border-orange/30 bg-orange/10 p-5 text-sm leading-6 text-ink dark:text-white">
              <strong>{academy.designationHi}</strong> | {academy.designationEn}. Login areas are separated by role for RBAC: Super Admin, Academy Admin, Head Coach, Coach, Athlete/Student, Parent and SAI Liaison.
            </div>
            <div className="grid gap-4 md:grid-cols-2">
              {loginRoles.map((role) => (
                <button
                  key={role.role}
                  type="button"
                  onClick={() => {
                    setActiveRole(role);
                    setSubmitted(false);
                  }}
                  className={`panel p-5 text-left transition hover:-translate-y-1 hover:shadow-premium ${
                    activeRole.role === role.role ? "border-orange bg-orange/10" : ""
                  }`}
                >
                  <role.icon className="text-orange" size={28} />
                  <p className="mt-6 font-display text-2xl font-bold uppercase text-ink dark:text-white">{role.title}</p>
                  <p className="mt-3 text-sm leading-6 text-muted dark:text-white/60">{role.description}</p>
                </button>
              ))}
            </div>
          </div>

          <aside className="panel h-fit p-6">
            <div className="flex items-center gap-3">
              <span className="flex h-11 w-11 items-center justify-center rounded-md bg-navy text-white">
                <LockKeyhole size={20} />
              </span>
              <div>
                <p className="font-display text-2xl font-bold uppercase text-ink dark:text-white">{activeRole.title}</p>
                <p className="text-xs font-bold uppercase tracking-[0.16em] text-orange">RBAC Preview</p>
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
                Email
                <input
                  aria-label={`${activeRole.title} email`}
                  type="email"
                  defaultValue={activeRole.email}
                  className="rounded-md border border-slate-300 bg-white px-4 py-3 font-normal dark:border-white/10 dark:bg-white/5"
                />
              </label>
              <label className="grid gap-2 text-sm font-bold">
                Password
                <input
                  aria-label={`${activeRole.title} password`}
                  type="password"
                  placeholder="Enter password"
                  className="rounded-md border border-slate-300 bg-white px-4 py-3 font-normal dark:border-white/10 dark:bg-white/5"
                />
              </label>
              <button className="btn-primary w-full" type="submit">
                Preview Login <ShieldCheck size={18} />
              </button>
            </form>

            <p className="mt-4 rounded-md bg-slate-50 p-4 text-sm leading-6 text-muted dark:bg-white/5 dark:text-white/60">{helper}</p>
            <Link href={activeRole.path} className="btn-secondary mt-4 w-full">
              Continue to portal <ArrowRight size={18} />
            </Link>
          </aside>
        </div>
      </section>
    </main>
  );
}
