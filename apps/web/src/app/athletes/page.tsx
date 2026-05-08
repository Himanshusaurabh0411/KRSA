import { Download, Search } from "lucide-react";
import { PageHero } from "@/components/page-hero";
import { athletes, sports } from "@/lib/data";

export default function AthletesPage() {
  return (
    <main>
      <PageHero eyebrow="Athletes" title="Athlete database and achievements" copy="Searchable public athlete profiles with sport, batch, coach, achievements and Khelo India Talent status." />
      <section className="section-pad">
        <div className="container-wide">
          <div className="panel mb-8 grid gap-3 p-4 lg:grid-cols-[1fr_repeat(4,180px)_auto]">
            <label className="flex items-center gap-2 rounded-md border border-slate-300 px-3 dark:border-white/10"><Search size={16} /><input aria-label="Search athletes" placeholder="Search athlete" className="w-full bg-transparent py-3 outline-none" /></label>
            <select aria-label="Sport filter" className="rounded-md border border-slate-300 bg-white px-3 dark:border-white/10 dark:bg-[#181833]"><option>All Sports</option>{sports.map((sport) => <option key={sport.name}>{sport.name}</option>)}</select>
            <select aria-label="Age group filter" className="rounded-md border border-slate-300 bg-white px-3 dark:border-white/10 dark:bg-[#181833]"><option>Age Group</option><option>U-14</option><option>U-16</option><option>U-18</option></select>
            <select aria-label="Gender filter" className="rounded-md border border-slate-300 bg-white px-3 dark:border-white/10 dark:bg-[#181833]"><option>Gender</option><option>Female</option><option>Male</option></select>
            <select aria-label="Achievement level filter" className="rounded-md border border-slate-300 bg-white px-3 dark:border-white/10 dark:bg-[#181833]"><option>Achievement Level</option><option>District</option><option>State</option><option>National</option></select>
            <button className="btn-secondary"><Download size={16} /> Export</button>
          </div>
          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
            {athletes.map((athlete) => (
              <article key={athlete.name} className="panel p-5">
                <div className="mb-5 flex h-24 items-center justify-center rounded-md bg-gradient-to-br from-navy to-orange font-display text-4xl font-bold text-white">
                  {athlete.name.split(" ").map((part) => part[0]).join("")}
                </div>
                <div className="flex items-start justify-between gap-3">
                  <h2 className="font-display text-2xl font-bold uppercase">{athlete.name}</h2>
                  {athlete.kit ? <span className="rounded-full bg-green/10 px-2 py-1 text-xs font-bold text-green">KIT</span> : null}
                </div>
                <p className="mt-1 text-sm font-bold text-orange">{athlete.sport}</p>
                <p className="mt-4 text-sm text-muted dark:text-white/60">Batch: {athlete.batch}</p>
                <p className="text-sm text-muted dark:text-white/60">Coach: {athlete.coach}</p>
                <p className="mt-4 text-sm leading-6 text-muted dark:text-white/60">{athlete.achievement}</p>
              </article>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
