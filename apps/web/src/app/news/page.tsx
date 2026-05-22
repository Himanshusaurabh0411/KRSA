import Image from "next/image";
import { PageHero } from "@/components/page-hero";
import { news } from "@/lib/data";

export default function NewsPage() {
  return (
    <main>
      <PageHero eyebrow="News & Updates" title="Announcements, press coverage and SAI circulars" copy="News cards with date, thumbnail area, excerpt and SEO-ready article structure." />
      <section className="section-pad">
        <div className="container-wide grid gap-5 md:grid-cols-3">
          {news.map((item) => (
            <article key={item.title} className="panel overflow-hidden">
              <div className="relative h-56 bg-slate-100 dark:bg-white/10">
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  sizes="(min-width: 768px) 33vw, 100vw"
                  className="object-cover"
                />
                <span className="absolute left-4 top-4 flex h-11 w-11 items-center justify-center rounded-md bg-white text-orange shadow-sm">
                  <item.icon size={22} />
                </span>
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
