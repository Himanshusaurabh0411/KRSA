import { PageHero } from "@/components/page-hero";
import { SectionHeading } from "@/components/section-heading";
import { academy, coaches } from "@/lib/data";

export default function AboutPage() {
  return (
    <main>
      <PageHero eyebrow="About KRSA" title="Accredited sports training with a structured athlete pathway" copy={`${academy.name} is based in ${academy.location}, combining disciplined coaching with modern academy operations.`} />
      <section className="section-pad">
        <div className="container-wide grid gap-10 lg:grid-cols-[0.9fr_1.1fr]">
          <div>
            <SectionHeading eyebrow="Mission" title="Make quality sports training measurable and accessible" />
            <p className="text-lg leading-8 text-muted dark:text-white/60">
              KRSA supports young athletes with coaching, competition readiness, fitness systems, performance reports, and transparent communication between the academy, students, parents, and coaches.
            </p>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            {["Khelo India aligned training culture", "Role-based digital dashboards", "Performance and injury monitoring", "Transparent admissions and payments"].map((item) => (
              <div key={item} className="panel p-6">
                <p className="font-display text-2xl font-bold uppercase text-navy dark:text-white">{item}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      <section className="section-pad bg-white dark:bg-[#151833]">
        <div className="container-wide">
          <SectionHeading eyebrow="Coaches" title="Specialists across skill, fitness, and tactical development" />
          <div className="grid gap-5 md:grid-cols-3">
            {coaches.map((coach) => (
              <div key={coach.name} className="panel p-6">
                <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-lg bg-navy font-display text-xl font-bold text-white">{coach.name.split(" ").map((part) => part[0]).join("")}</div>
                <p className="font-display text-2xl font-bold uppercase text-ink dark:text-white">{coach.name}</p>
                <p className="mt-1 text-sm font-bold text-orange">{coach.role}</p>
                <p className="mt-4 text-sm leading-6 text-muted dark:text-white/60">{coach.specialty}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
