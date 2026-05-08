import { PageHero } from "@/components/page-hero";
import { athletes, schedules } from "@/lib/data";

export default function AthletePortalPage() {
  const athlete = athletes[0];
  return (
    <main>
      <PageHero eyebrow="Athlete Portal" title="Training plan, attendance and achievements" copy="Registered athletes can view their own profile, training plan, notices, attendance and competition record." />
      <section className="section-pad">
        <div className="container-wide grid gap-6 lg:grid-cols-[360px_1fr]">
          <aside className="panel p-6">
            <div className="mb-5 flex h-24 items-center justify-center rounded-md bg-gradient-to-br from-navy to-orange font-display text-4xl font-bold text-white">AK</div>
            <p className="font-display text-3xl font-bold uppercase">{athlete.name}</p>
            <p className="mt-1 text-sm font-bold text-orange">{athlete.sport} | {athlete.batch}</p>
            <p className="mt-4 text-sm text-muted dark:text-white/60">{athlete.achievement}</p>
          </aside>
          <div className="grid gap-4 md:grid-cols-2">
            {schedules.slice(0, 4).map((session) => (
              <div key={session.title} className="panel p-5">
                <p className="font-display text-2xl font-bold text-orange">{session.day} {session.time}</p>
                <p className="mt-2 font-bold">{session.title}</p>
                <p className="text-sm text-muted dark:text-white/60">{session.venue}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
