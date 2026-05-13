import Image from "next/image";
import { PageHero } from "@/components/page-hero";
import { SectionHeading } from "@/components/section-heading";
import { academy, objectives, owner } from "@/lib/data";

export default function AboutPage() {
  return (
    <main>
      <PageHero eyebrow="About KRSA" title="A public charitable trust building grassroots champions" copy={`${academy.name} was established on ${academy.trustDate} and is based at ${academy.address}.`} />
      <section className="section-pad">
        <div className="container-wide grid gap-10 lg:grid-cols-[0.9fr_1.1fr]">
          <div>
            <SectionHeading eyebrow="Vision & Mission" title="Sports training with social purpose" />
            <div className="grid gap-5 text-base leading-7 text-muted dark:text-white/60">
              <p><strong className="text-ink dark:text-white">Vision:</strong> {academy.vision}</p>
              <p><strong className="text-ink dark:text-white">Mission:</strong> {academy.mission}</p>
            </div>
          </div>
          <div className="panel p-6">
            <p className="font-display text-3xl font-bold uppercase text-ink dark:text-white">Trust Details</p>
            <div className="mt-6 grid gap-4 text-sm text-muted dark:text-white/60">
              <p><strong className="text-ink dark:text-white">Trustees:</strong> {academy.trustees}</p>
              <p><strong className="text-ink dark:text-white">Affiliation:</strong> {academy.affiliation}</p>
              <p><strong className="text-ink dark:text-white">Accreditation:</strong> {academy.accreditation}</p>
              <p><strong className="text-ink dark:text-white">MOU Duration:</strong> {academy.mouDuration}</p>
            </div>
          </div>
        </div>
      </section>
      <section className="section-pad bg-cream dark:bg-[#111126]">
        <div className="container-wide grid gap-8 lg:grid-cols-[360px_1fr] lg:items-center">
          <div className="relative overflow-hidden rounded-lg border border-slate-200 bg-slate-100 shadow-sm dark:border-white/10 dark:bg-white/5">
            <Image
              src={owner.photoUrl}
              alt={owner.name}
              width={1080}
              height={1080}
              className="aspect-square w-full object-cover"
            />
          </div>
          <div className="panel p-6 md:p-8">
            <span className="eyebrow">About Owner</span>
            <h2 className="mt-5 font-display text-5xl font-bold uppercase leading-none text-ink dark:text-white">{owner.name}</h2>
            <p className="mt-2 text-sm font-bold uppercase tracking-[0.16em] text-orange">{owner.title}</p>
            <p className="mt-6 text-base leading-8 text-muted dark:text-white/60">{owner.bio}</p>
            <div className="mt-6 grid gap-3 sm:grid-cols-3">
              {owner.focus.map((item) => (
                <div key={item} className="rounded-md bg-slate-50 p-4 text-sm font-bold text-ink dark:bg-white/5 dark:text-white">
                  {item}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
      <section className="section-pad bg-white dark:bg-[#181833]">
        <div className="container-wide">
          <SectionHeading eyebrow="Objectives" title="Trust-deed aligned academy objectives" />
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {objectives.map((objective) => (
              <div key={objective} className="panel p-6">
                <p className="text-sm leading-6 text-muted dark:text-white/60">{objective}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
