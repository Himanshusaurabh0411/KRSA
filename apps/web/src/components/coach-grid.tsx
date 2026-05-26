"use client";

import { Award, GraduationCap, Star } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { useCmsContent } from "@/lib/cms-content";

export function CoachGrid({ compact = false }: { compact?: boolean }) {
  const { content } = useCmsContent();
  const coaches = compact ? content.coaches.slice(0, 4) : content.coaches;

  return (
    <div className="grid gap-5 md:grid-cols-2">
      {coaches.map((coach) => (
        <article key={coach.id} className="panel overflow-hidden p-0">
          <div className="grid gap-0 lg:grid-cols-[240px_1fr]">
            <div className="bg-slate-100 dark:bg-white/5">
              <img src={coach.image} alt={coach.name} className="h-full min-h-72 w-full object-cover" />
            </div>
            <div className="p-6">
              <p className="text-xs font-bold uppercase tracking-[0.16em] text-orange">{coach.experience}</p>
              <h2 className="mt-3 font-display text-3xl font-bold uppercase leading-none text-ink sm:text-4xl dark:text-white">{coach.name}</h2>
              <p className="mt-2 text-sm font-bold uppercase tracking-[0.12em] text-green">{coach.role}</p>
              <p className="mt-5 text-sm leading-6 text-muted dark:text-white/60">{coach.summary}</p>

              <CoachList icon={GraduationCap} title="Education" items={coach.education} />
              <CoachList icon={Star} title="Highlights" items={coach.highlights} />
              {compact ? null : <CoachList icon={Award} title="Certifications / Awards" items={coach.certifications} />}
            </div>
          </div>
        </article>
      ))}
    </div>
  );
}

function CoachList({ icon: Icon, title, items }: { icon: LucideIcon; title: string; items: string[] }) {
  if (!items.length) return null;

  return (
    <div className="mt-6">
      <div className="mb-3 flex items-center gap-2 text-xs font-bold uppercase tracking-[0.14em] text-ink dark:text-white">
        <Icon size={16} className="text-orange" /> {title}
      </div>
      <div className="grid gap-2">
        {items.map((item) => (
          <p key={item} className="rounded-md bg-slate-50 px-3 py-2 text-sm text-muted dark:bg-white/5 dark:text-white/60">
            {item}
          </p>
        ))}
      </div>
    </div>
  );
}
