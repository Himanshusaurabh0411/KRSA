import { Download, Share2 } from "lucide-react";
import { PageHero } from "@/components/page-hero";
import { tournaments } from "@/lib/data";

export default function TournamentsPage() {
  return (
    <main>
      <PageHero eyebrow="Tournaments" title="Upcoming, live and past results" copy="Tournament calendar with venue, level, registration status, results downloads, medal tallies and public sharing." />
      <section className="section-pad">
        <div className="container-wide">
          <div className="mb-8 flex flex-wrap gap-2 rounded-lg bg-slate-100 p-1 dark:bg-white/10">
            {["Upcoming", "Live/Ongoing", "Past Results"].map((tab, index) => (
              <button key={tab} className={`rounded-md px-5 py-2 text-sm font-bold ${index === 0 ? "bg-navy text-white" : "text-muted dark:text-white/60"}`}>{tab}</button>
            ))}
          </div>
          <div className="grid gap-5">
            {tournaments.map((tournament) => (
              <article key={tournament.name} className="panel grid gap-5 p-6 md:grid-cols-[1fr_auto] md:items-center">
                <div>
                  <p className="text-xs font-bold uppercase tracking-[0.16em] text-orange">{tournament.level} | {tournament.sport}</p>
                  <h2 className="mt-2 font-display text-3xl font-bold uppercase text-ink dark:text-white">{tournament.name}</h2>
                  <p className="mt-3 text-sm text-muted dark:text-white/60">{tournament.date} | {tournament.venue}</p>
                  <p className="mt-3 inline-flex rounded-full bg-green/10 px-3 py-1 text-xs font-bold text-green">{tournament.status}</p>
                </div>
                <div className="flex gap-2">
                  <button className="btn-secondary"><Download size={16} /> Results</button>
                  <button className="btn-primary"><Share2 size={16} /> Share</button>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
