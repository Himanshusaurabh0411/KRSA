import { CalendarDays, Clock, MapPin } from "lucide-react";
import { PageHero } from "@/components/page-hero";
import { schedules } from "@/lib/data";

export default function SchedulePage() {
  return (
    <main>
      <PageHero eyebrow="Training Calendar" title="Weekly schedule with batch visibility" copy="Students see their sessions, coaches manage attendance, and admins maintain batch capacity from the same calendar system." />
      <section className="section-pad">
        <div className="container-wide grid gap-4 lg:grid-cols-3">
          {schedules.map((session) => (
            <article key={`${session.day}-${session.title}`} className="panel p-6">
              <div className="mb-6 flex items-center justify-between">
                <span className="rounded-md bg-navy px-4 py-2 font-display text-2xl font-bold text-white">{session.day}</span>
                <CalendarDays className="text-orange" size={24} />
              </div>
              <h2 className="font-display text-3xl font-bold uppercase text-ink dark:text-white">{session.title}</h2>
              <div className="mt-5 grid gap-3 text-sm text-muted dark:text-white/60">
                <p className="flex items-center gap-2"><Clock size={16} /> {session.time}</p>
                <p className="flex items-center gap-2"><MapPin size={16} /> {session.venue}</p>
                <p className="font-bold text-orange">Coach: {session.coach}</p>
              </div>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
