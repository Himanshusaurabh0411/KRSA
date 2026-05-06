"use client";

import { useState } from "react";
import { UploadCloud } from "lucide-react";
import { PageHero } from "@/components/page-hero";
import { programs } from "@/lib/data";

const initialState = {
  name: "",
  email: "",
  phone: "",
  dob: "",
  program: programs[0].title,
  guardianName: "",
  guardianPhone: "",
  previousExperience: "",
  medicalNotes: ""
};

export default function AdmissionsPage() {
  const [form, setForm] = useState(initialState);
  const [submitted, setSubmitted] = useState(false);

  function update(name: string, value: string) {
    setForm((current) => ({ ...current, [name]: value }));
  }

  function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitted(true);
  }

  return (
    <main>
      <PageHero eyebrow="Admissions" title="Online registration with document upload" copy="Submit student details, guardian contact, preferred program, experience, and documents for admin approval." />
      <section className="section-pad">
        <div className="container-wide grid gap-8 lg:grid-cols-[1fr_360px]">
          <form onSubmit={submit} className="panel p-6 md:p-8">
            <div className="grid gap-5 md:grid-cols-2">
              <label className="grid gap-2 text-sm font-bold">Student name<input required className="rounded-md border border-slate-300 bg-white px-4 py-3 font-normal dark:border-white/10 dark:bg-white/5" value={form.name} onChange={(event) => update("name", event.target.value)} /></label>
              <label className="grid gap-2 text-sm font-bold">Email<input required type="email" className="rounded-md border border-slate-300 bg-white px-4 py-3 font-normal dark:border-white/10 dark:bg-white/5" value={form.email} onChange={(event) => update("email", event.target.value)} /></label>
              <label className="grid gap-2 text-sm font-bold">Phone<input required pattern="[0-9+\-\s]{8,16}" className="rounded-md border border-slate-300 bg-white px-4 py-3 font-normal dark:border-white/10 dark:bg-white/5" value={form.phone} onChange={(event) => update("phone", event.target.value)} /></label>
              <label className="grid gap-2 text-sm font-bold">Date of birth<input required type="date" className="rounded-md border border-slate-300 bg-white px-4 py-3 font-normal dark:border-white/10 dark:bg-white/5" value={form.dob} onChange={(event) => update("dob", event.target.value)} /></label>
              <label className="grid gap-2 text-sm font-bold">Program<select className="rounded-md border border-slate-300 bg-white px-4 py-3 font-normal dark:border-white/10 dark:bg-white/5" value={form.program} onChange={(event) => update("program", event.target.value)}>{programs.map((program) => <option key={program.title}>{program.title}</option>)}</select></label>
              <label className="grid gap-2 text-sm font-bold">Guardian name<input required className="rounded-md border border-slate-300 bg-white px-4 py-3 font-normal dark:border-white/10 dark:bg-white/5" value={form.guardianName} onChange={(event) => update("guardianName", event.target.value)} /></label>
              <label className="grid gap-2 text-sm font-bold">Guardian phone<input required className="rounded-md border border-slate-300 bg-white px-4 py-3 font-normal dark:border-white/10 dark:bg-white/5" value={form.guardianPhone} onChange={(event) => update("guardianPhone", event.target.value)} /></label>
              <label className="grid gap-2 text-sm font-bold">Documents<input type="file" multiple accept=".pdf,.jpg,.jpeg,.png" className="rounded-md border border-dashed border-slate-300 bg-white px-4 py-3 text-sm font-normal dark:border-white/10 dark:bg-white/5" /></label>
              <label className="grid gap-2 text-sm font-bold md:col-span-2">Previous experience<textarea rows={4} className="rounded-md border border-slate-300 bg-white px-4 py-3 font-normal dark:border-white/10 dark:bg-white/5" value={form.previousExperience} onChange={(event) => update("previousExperience", event.target.value)} /></label>
              <label className="grid gap-2 text-sm font-bold md:col-span-2">Medical notes / injuries<textarea rows={4} className="rounded-md border border-slate-300 bg-white px-4 py-3 font-normal dark:border-white/10 dark:bg-white/5" value={form.medicalNotes} onChange={(event) => update("medicalNotes", event.target.value)} /></label>
            </div>
            <button className="btn-primary mt-6" type="submit">Submit Admission</button>
            {submitted ? <p className="mt-4 rounded-md bg-green/10 px-4 py-3 text-sm font-bold text-green">Application captured. Connect this form to `POST /api/admissions` for live submissions.</p> : null}
          </form>
          <aside className="panel h-fit p-6">
            <UploadCloud className="text-orange" size={34} />
            <h2 className="mt-6 font-display text-3xl font-bold uppercase text-ink dark:text-white">Required documents</h2>
            <div className="mt-5 grid gap-3 text-sm text-muted dark:text-white/60">
              <p>Birth certificate or age proof</p>
              <p>Recent photograph</p>
              <p>Parent/guardian ID proof</p>
              <p>Medical clearance for advanced programs</p>
            </div>
          </aside>
        </div>
      </section>
    </main>
  );
}
