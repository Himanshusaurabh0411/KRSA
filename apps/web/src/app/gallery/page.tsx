import Image from "next/image";
import { PageHero } from "@/components/page-hero";
import { galleryItems } from "@/lib/data";

export default function GalleryPage() {
  return (
    <main>
      <PageHero eyebrow="Gallery" title="Photo and video albums" copy="A public gallery for training sessions, events, award ceremonies and embedded video stories." />
      <section className="section-pad">
        <div className="container-wide">
          <div className="mb-8 flex flex-wrap gap-2">
            {["All", "Training", "Tournaments", "Ceremonies", "Videos"].map((filter, index) => (
              <button key={filter} className={`rounded-full px-4 py-2 text-sm font-bold ${index === 0 ? "bg-navy text-white" : "bg-slate-100 text-muted dark:bg-white/10 dark:text-white/60"}`}>{filter}</button>
            ))}
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {galleryItems.map((item) => (
              <article key={item.title} className="group relative flex aspect-[4/3] items-end overflow-hidden rounded-lg bg-navy p-5 text-white shadow-premium">
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                  className="object-cover transition duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/25 to-transparent" />
                <div className="relative">
                  <p className="text-xs font-bold uppercase tracking-[0.16em] text-white/60">{item.category} | {item.type}</p>
                  <h2 className="font-display text-3xl font-bold uppercase">{item.title}</h2>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
