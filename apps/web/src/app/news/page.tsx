import { PageHero } from "@/components/page-hero";
import { news } from "@/lib/data";

export default function NewsPage() {
  return (
    <main>
      <PageHero eyebrow="News & Updates" title="Announcements, press coverage and SAI circulars" copy="News cards with date, thumbnail area, excerpt and SEO-ready article structure." />
      <section className="section-pad">
        <div className="container-wide grid gap-5 md:grid-cols-3">
          {news.map((item) => (
            <article key={item.title} className="panel p-6">
              <div className="mb-6 flex h-36 items-center justify-center rounded-md bg-gradient-to-br from-navy to-orange text-white">
                <item.icon size={38} />
              </div>
              <p className="text-xs font-bold uppercase tracking-[0.16em] text-green">{item.date}</p>
              <h2 className="mt-2 font-display text-3xl font-bold uppercase text-ink dark:text-white">{item.title}</h2>
              <p className="mt-4 text-sm leading-6 text-muted dark:text-white/60">{item.excerpt}</p>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
