import { PageHero } from "@/components/page-hero";
import { athletes, news } from "@/lib/data";

export default function ParentPortalPage() {
  const ward = athletes[1];
  return (
    <main>
      <PageHero eyebrow="Parent Portal" title="Ward progress, attendance and fee notices" copy="Parents and guardians can view ward updates, announcements, attendance summaries and fee status." />
      <section className="section-pad">
        <div className="container-wide grid gap-6 lg:grid-cols-[360px_1fr]">
          <aside className="panel p-6">
            <p className="font-display text-3xl font-bold uppercase">{ward.name}</p>
            <p className="mt-1 text-sm font-bold text-orange">{ward.sport} | Coach: {ward.coach}</p>
            <p className="mt-5 text-sm text-muted dark:text-white/60">Attendance: 91%</p>
            <p className="mt-2 text-sm text-muted dark:text-white/60">Fee status: Notice ready</p>
          </aside>
          <div className="grid gap-4">
            {news.map((item) => (
              <div key={item.title} className="panel p-5">
                <p className="text-xs font-bold uppercase tracking-[0.16em] text-green">{item.date}</p>
                <p className="mt-2 font-display text-2xl font-bold uppercase">{item.title}</p>
                <p className="mt-2 text-sm text-muted dark:text-white/60">{item.excerpt}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
