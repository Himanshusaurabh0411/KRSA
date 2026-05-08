import Link from "next/link";
import { PageHero } from "@/components/page-hero";
import { programs, schedules, sports } from "@/lib/data";

export default function SportsPage() {
  return (
    <main>
      <PageHero eyebrow="Sports & Programs" title="Sports offered, coaching programs and batch schedules" copy="A public overview of KRSA sports, coaches, batch timings and competition pathways." />
      <section className="section-pad">
        <div className="container-wide grid gap-5 md:grid-cols-2 xl:grid-cols-5">
          {sports.map((sport) => (
            <article key={sport.name} className="panel p-6">
              <sport.icon className="text-orange" size={32} />
              <h2 className="mt-8 font-display text-3xl font-bold uppercase text-ink dark:text-white">{sport.name}</h2>
              <p className="mt-1 text-sm font-bold text-green">{sport.nameHi}</p>
              <p className="mt-4 text-sm leading-6 text-muted dark:text-white/60">{sport.description}</p>
              <div className="mt-6 rounded-md bg-slate-50 p-4 text-sm dark:bg-white/5">
                <p className="font-bold">Coach: {sport.coach}</p>
                <p className="mt-1 text-muted dark:text-white/60">{sport.batch}</p>
              </div>
            </article>
          ))}
        </div>
      </section>
      <section className="section-pad bg-white dark:bg-[#181833]">
        <div className="container-wide">
          <div className="mb-10 flex flex-col justify-between gap-4 md:flex-row md:items-end">
            <div>
              <span className="eyebrow">Programs</span>
              <h2 className="mt-4 font-display text-4xl font-bold uppercase text-ink dark:text-white">Training pathways</h2>
            </div>
            <Link href="/apply" className="btn-primary">Apply Now</Link>
          </div>
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            {programs.map((program) => (
              <div key={program.title} className="panel p-6">
                <program.icon className="text-orange" />
                <h3 className="mt-8 font-display text-2xl font-bold uppercase">{program.title}</h3>
                <p className="mt-3 text-sm text-muted dark:text-white/60">{program.focus}</p>
                <p className="mt-5 font-bold text-navy dark:text-white">{program.age} | {program.level}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      <section className="section-pad">
        <div className="container-wide">
          <span className="eyebrow">Schedule</span>
          <h2 className="mt-4 font-display text-4xl font-bold uppercase text-ink dark:text-white">Weekly batch schedule</h2>
          <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {schedules.map((session) => (
              <div key={`${session.day}-${session.title}`} className="panel p-5">
                <p className="font-display text-2xl font-bold text-orange">{session.day} {session.time}</p>
                <p className="mt-2 font-bold">{session.title}</p>
                <p className="mt-1 text-sm text-muted dark:text-white/60">{session.venue} | Coach: {session.coach}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
