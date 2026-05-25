"use client";

import { PageHero } from "@/components/page-hero";
import { useCmsContent } from "@/lib/cms-content";

export default function NewsPage() {
  const { content } = useCmsContent();

  return (
    <main>
      <PageHero eyebrow="News & Updates" title="Announcements, press coverage and SAI circulars" copy="News cards with date, thumbnail area, excerpt and SEO-ready article structure." />
      <section className="section-pad">
        <div className="container-wide grid gap-5 md:grid-cols-3">
          {content.news.map((item) => (
            <article key={item.id} className="panel overflow-hidden">
              <div className="h-56 bg-slate-100 dark:bg-white/10">
                <img src={item.image} alt="" className="h-full w-full object-cover" />
              </div>
              <div className="p-6">
                <p className="text-xs font-bold uppercase tracking-[0.16em] text-green">{item.date}</p>
                <h2 className="mt-2 font-display text-3xl font-bold uppercase text-ink dark:text-white">{item.title}</h2>
                <p className="mt-4 text-sm leading-6 text-muted dark:text-white/60">{item.excerpt}</p>
              </div>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
