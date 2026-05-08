import Link from "next/link";
import { ExternalLink, FileText, ShieldCheck } from "lucide-react";
import { PageHero } from "@/components/page-hero";
import { academy, athletes } from "@/lib/data";
import { AccreditedAcademyPlate, KheloIndiaLogo } from "@/components/official-brand";

export default function KheloIndiaPage() {
  const kitAthletes = athletes.filter((athlete) => athlete.kit);

  return (
    <main>
      <PageHero eyebrow="Khelo India" title="SAI partnership and Khelo India accreditation" copy="A dedicated page for KRSA's accreditation, Silver Category status, KIT athlete reporting obligation and public SAI/Khelo India information." />
      <section className="section-pad">
        <div className="container-wide grid gap-8 lg:grid-cols-[1fr_380px]">
          <div className="panel p-6 md:p-8">
            <div className="mb-6 flex flex-wrap items-center gap-4">
              <span className="flex h-20 w-40 items-center rounded-md bg-white px-4 py-3 shadow-sm">
                <KheloIndiaLogo />
              </span>
              <span className="rounded-md border border-orange/25 bg-orange/10 px-4 py-3 text-xs font-bold uppercase tracking-[0.16em] text-orange">
                Original colours preserved
              </span>
            </div>
            <ShieldCheck className="text-orange" size={34} />
            <h2 className="mt-6 font-display text-4xl font-bold uppercase text-ink dark:text-white">{academy.accreditation}</h2>
            <div className="mt-6 grid gap-4 text-base leading-7 text-muted dark:text-white/60">
              <p><strong className="text-ink dark:text-white">Accrediting authority:</strong> {academy.affiliation}</p>
              <p><strong className="text-ink dark:text-white">MOU duration:</strong> {academy.mouDuration}</p>
              <p><strong className="text-ink dark:text-white">Primary obligation:</strong> {academy.primaryObligation}</p>
              <p><strong className="text-ink dark:text-white">Branding:</strong> Khelo India and SAI identity must be prominently displayed on website header and footer.</p>
            </div>
          </div>
          <aside className="grid gap-4">
            <div className="panel p-6">
              <AccreditedAcademyPlate className="mb-5 rounded-md" />
              <p className="font-display text-2xl font-bold uppercase">Official designations</p>
              <p className="mt-4 text-orange">{academy.designationHi}</p>
              <p className="mt-1 text-sm font-bold uppercase tracking-[0.16em] text-muted dark:text-white/60">{academy.designationEn}</p>
            </div>
            <div className="panel p-6">
              <p className="font-display text-2xl font-bold uppercase">Downloads</p>
              <div className="mt-4 grid gap-3 text-sm">
                <Link href="#" className="flex items-center gap-2 text-navy dark:text-white"><FileText size={16} /> MOU overview (public version)</Link>
                <Link href="#" className="flex items-center gap-2 text-navy dark:text-white"><FileText size={16} /> Branding guidelines</Link>
                <Link href="https://nsrs.kheloindia.gov.in" className="flex items-center gap-2 text-navy dark:text-white"><ExternalLink size={16} /> NSRS portal</Link>
              </div>
            </div>
          </aside>
        </div>
      </section>
      <section className="section-pad bg-white dark:bg-[#181833]">
        <div className="container-wide">
          <span className="eyebrow">KIT Athletes</span>
          <h2 className="mt-4 font-display text-4xl font-bold uppercase text-ink dark:text-white">Khelo India Talent profiles</h2>
          <div className="mt-8 grid gap-4 md:grid-cols-2">
            {kitAthletes.map((athlete) => (
              <div key={athlete.name} className="panel p-6">
                <p className="font-display text-2xl font-bold uppercase">{athlete.name}</p>
                <p className="mt-1 text-sm font-bold text-orange">{athlete.sport} | {athlete.coach}</p>
                <p className="mt-4 text-sm text-muted dark:text-white/60">{athlete.achievement}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
