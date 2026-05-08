import { PageHero } from "@/components/page-hero";
import { athletes, schedules } from "@/lib/data";

export default function CoachPortalPage() {
  return (
    <main>
      <PageHero eyebrow="Coach Portal" title="Assigned athletes, attendance and reports" copy="Coach and Head Coach workspace for batch records, training plans and athlete performance reports." />
      <section className="section-pad">
        <div className="container-wide grid gap-6 lg:grid-cols-[1fr_380px]">
          <div className="panel overflow-hidden">
            <div className="border-b border-slate-200 p-5 font-display text-2xl font-bold uppercase dark:border-white/10">Assigned athletes</div>
            {athletes.map((athlete) => (
              <div key={athlete.name} className="grid gap-2 border-b border-slate-200 p-5 last:border-0 md:grid-cols-4 dark:border-white/10">
                <p className="font-bold">{athlete.name}</p>
                <p className="text-sm text-muted dark:text-white/60">{athlete.sport}</p>
                <p className="text-sm text-muted dark:text-white/60">{athlete.batch}</p>
                <p className="text-sm font-bold text-orange">Score {athlete.score}</p>
              </div>
            ))}
          </div>
          <aside className="panel h-fit p-6">
            <p className="font-display text-2xl font-bold uppercase">Today schedule</p>
            <div className="mt-5 grid gap-4">
              {schedules.slice(0, 3).map((session) => (
                <div key={session.title} className="rounded-md bg-slate-50 p-4 dark:bg-white/5">
                  <p className="font-bold">{session.title}</p>
                  <p className="text-sm text-muted dark:text-white/60">{session.day} {session.time} | {session.venue}</p>
                </div>
              ))}
            </div>
          </aside>
        </div>
      </section>
    </main>
  );
}
