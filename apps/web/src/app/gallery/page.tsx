"use client";

import { useMemo, useState } from "react";
import { ImageLightbox } from "@/components/image-lightbox";
import { PageHero } from "@/components/page-hero";
import { useCmsContent } from "@/lib/cms-content";

export default function GalleryPage() {
  const { content } = useCmsContent();
  const filters = useMemo(() => ["All", ...Array.from(new Set(content.gallery.map((item) => item.category)))], [content.gallery]);
  const [activeFilter, setActiveFilter] = useState("All");
  const filteredItems = activeFilter === "All" ? content.gallery : content.gallery.filter((item) => item.category === activeFilter);

  return (
    <main>
      <PageHero eyebrow="Gallery" title="Photo and video albums" copy="A public gallery for training sessions, events, award ceremonies and embedded video stories." />
      <section className="section-pad">
        <div className="container-wide">
          <div className="mb-8 flex flex-wrap items-center gap-2">
            {filters.map((filter) => (
              <button
                key={filter}
                type="button"
                aria-pressed={activeFilter === filter}
                onClick={() => setActiveFilter(filter)}
                className={`rounded-full px-4 py-2 text-sm font-bold transition ${
                  activeFilter === filter
                    ? "bg-navy text-white shadow-sm"
                    : "bg-slate-100 text-muted hover:bg-slate-200 dark:bg-white/10 dark:text-white/60 dark:hover:bg-white/15"
                }`}
              >
                {filter}
              </button>
            ))}
            <span className="ml-auto text-sm font-bold text-muted dark:text-white/60">
              {filteredItems.length} album{filteredItems.length === 1 ? "" : "s"}
            </span>
          </div>
          {filteredItems.length > 0 ? (
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {filteredItems.map((item) => (
                <ImageLightbox
                  key={item.id}
                  src={item.image}
                  alt={item.title}
                  frameClassName="aspect-[4/3] rounded-lg bg-navy shadow-premium"
                  imageClassName="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                />
              ))}
            </div>
          ) : (
            <div className="panel p-8 text-center">
              <p className="font-display text-2xl font-bold uppercase text-ink dark:text-white">No albums found</p>
              <p className="mt-2 text-sm text-muted dark:text-white/60">Choose another gallery category.</p>
            </div>
          )}
        </div>
      </section>
    </main>
  );
}
