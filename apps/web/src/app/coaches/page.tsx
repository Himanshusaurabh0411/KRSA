import { CoachGrid } from "@/components/coach-grid";
import { PageHero } from "@/components/page-hero";

export default function CoachesPage() {
  return (
    <main>
      <PageHero eyebrow="Coaches" title="KRSA basketball coaching team" copy="Experienced basketball coaches guiding KRSA athletes with discipline, fundamentals, match preparation and long-term player development." />
      <section className="section-pad">
        <div className="container-wide">
          <CoachGrid />
        </div>
      </section>
    </main>
  );
}
