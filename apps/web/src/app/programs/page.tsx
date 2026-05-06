import Link from "next/link";
import { PageHero } from "@/components/page-hero";
import { programs } from "@/lib/data";

export default function ProgramsPage() {
  return (
    <main>
      <PageHero eyebrow="Training Programs" title="Beginner to elite academy tracks" copy="Choose structured cricket, football, multi-sport, fitness, and recovery programs with coach-led performance benchmarks." />
      <section className="section-pad">
        <div className="container-wide grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {programs.map((program) => (
            <article key={program.title} className="panel p-6">
              <program.icon className="text-orange" size={32} />
              <div className="mt-8 flex items-center justify-between gap-4">
                <h2 className="font-display text-3xl font-bold uppercase text-ink dark:text-white">{program.title}</h2>
                <span className="rounded-full bg-green/10 px-3 py-1 text-xs font-bold text-green">{program.age}</span>
              </div>
              <p className="mt-4 text-sm leading-6 text-muted dark:text-white/60">{program.focus}</p>
              <div className="mt-6 flex items-center justify-between border-t border-slate-200 pt-5 dark:border-white/10">
                <span className="font-display text-2xl font-bold text-navy dark:text-white">Rs. {program.price}/mo</span>
                <Link href="/admissions" className="btn-primary py-2">Apply</Link>
              </div>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
