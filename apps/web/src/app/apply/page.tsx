"use client";

import { useState } from "react";
import { CheckCircle2, FileUp } from "lucide-react";
import { PageHero } from "@/components/page-hero";
import { sports } from "@/lib/data";

const steps = ["Personal", "Sport", "Academic", "Guardian", "Documents"];

export default function ApplyPage() {
  const [submitted, setSubmitted] = useState(false);

  return (
    <main>
      <PageHero eyebrow="Apply / Admissions" title="Multi-step athlete application" copy="Submit personal details, sport choice, academic information, guardian details and required documents for KRSA review." />
      <section className="section-pad">
        <div className="container-wide grid gap-8 lg:grid-cols-[1fr_360px]">
          <form
            className="panel p-6 md:p-8"
            onSubmit={(event) => {
              event.preventDefault();
              setSubmitted(true);
            }}
          >
            <div className="mb-8 grid gap-2 sm:grid-cols-5">
              {steps.map((step, index) => (
                <div key={step} className="rounded-md bg-slate-100 px-3 py-2 text-center text-xs font-bold uppercase tracking-[0.12em] text-muted dark:bg-white/10 dark:text-white/60">
                  {index + 1}. {step}
                </div>
              ))}
            </div>

            <div className="grid gap-5 md:grid-cols-2">
              <label className="grid gap-2 text-sm font-bold">Full name<input required aria-label="Full name" className="rounded-md border border-slate-300 bg-white px-4 py-3 font-normal dark:border-white/10 dark:bg-white/5" /></label>
              <label className="grid gap-2 text-sm font-bold">Date of birth<input required aria-label="Date of birth" type="date" className="rounded-md border border-slate-300 bg-white px-4 py-3 font-normal dark:border-white/10 dark:bg-white/5" /></label>
              <label className="grid gap-2 text-sm font-bold">Gender<select aria-label="Gender" className="rounded-md border border-slate-300 bg-white px-4 py-3 font-normal dark:border-white/10 dark:bg-white/5"><option>Female</option><option>Male</option><option>Other</option></select></label>
              <label className="grid gap-2 text-sm font-bold">Sport selection<select aria-label="Sport selection" className="rounded-md border border-slate-300 bg-white px-4 py-3 font-normal dark:border-white/10 dark:bg-white/5">{sports.map((sport) => <option key={sport.name}>{sport.name}</option>)}</select></label>
              <label className="grid gap-2 text-sm font-bold">School / Class<input required aria-label="School and class" className="rounded-md border border-slate-300 bg-white px-4 py-3 font-normal dark:border-white/10 dark:bg-white/5" /></label>
              <label className="grid gap-2 text-sm font-bold">Aadhaar number<input required aria-label="Aadhaar number" inputMode="numeric" className="rounded-md border border-slate-300 bg-white px-4 py-3 font-normal dark:border-white/10 dark:bg-white/5" /></label>
              <label className="grid gap-2 text-sm font-bold">Guardian name<input required aria-label="Guardian name" className="rounded-md border border-slate-300 bg-white px-4 py-3 font-normal dark:border-white/10 dark:bg-white/5" /></label>
              <label className="grid gap-2 text-sm font-bold">Guardian phone<input required aria-label="Guardian phone" className="rounded-md border border-slate-300 bg-white px-4 py-3 font-normal dark:border-white/10 dark:bg-white/5" /></label>
              <label className="grid gap-2 text-sm font-bold md:col-span-2">Address<textarea required aria-label="Address" rows={3} className="rounded-md border border-slate-300 bg-white px-4 py-3 font-normal dark:border-white/10 dark:bg-white/5" /></label>
              <label className="grid gap-2 text-sm font-bold md:col-span-2">Documents<input aria-label="Upload documents" type="file" multiple accept=".pdf,.jpg,.jpeg,.png" className="rounded-md border border-dashed border-slate-300 bg-white px-4 py-3 text-sm font-normal dark:border-white/10 dark:bg-white/5" /></label>
            </div>
            <button className="btn-primary mt-6" type="submit">Submit Application</button>
            {submitted ? <p className="mt-4 rounded-md bg-green/10 px-4 py-3 text-sm font-bold text-green">Application captured. Backend endpoint: POST /api/applications with document upload and status tracking.</p> : null}
          </form>

          <aside className="panel h-fit p-6">
            <FileUp className="text-orange" size={34} />
            <h2 className="mt-6 font-display text-3xl font-bold uppercase text-ink dark:text-white">Required uploads</h2>
            <div className="mt-5 grid gap-3 text-sm text-muted dark:text-white/60">
              {["Passport photo", "Aadhaar", "School certificate", "Medical fitness certificate"].map((item) => (
                <p key={item} className="flex items-center gap-2"><CheckCircle2 size={16} className="text-green" /> {item}</p>
              ))}
            </div>
            <p className="mt-6 text-sm leading-6 text-muted dark:text-white/60">Status workflow: New - Under Review - Shortlisted - Approved / Rejected.</p>
          </aside>
        </div>
      </section>
    </main>
  );
}
