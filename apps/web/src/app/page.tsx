"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowDown, ArrowRight, Play, ShieldCheck } from "lucide-react";
import { academy, athletes, galleryItems, news, sports, stats, tournaments } from "@/lib/data";
import { SectionHeading } from "@/components/section-heading";
import { KheloIndiaLogo } from "@/components/official-brand";

export default function HomePage() {
  return (
    <main>
      <section className="relative overflow-hidden bg-navy px-5 py-20 text-white sm:px-8 lg:px-12 xl:px-16">
        <div className="absolute inset-0 bg-[linear-gradient(135deg,#303056_0%,#242447_62%,#111126_100%)]" />
        <div className="container-wide relative grid min-h-[620px] items-center gap-12 lg:grid-cols-[1.05fr_0.95fr]">
          <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <span className="eyebrow"><ShieldCheck size={14} /> {academy.accreditation}</span>
            <h1 className="mt-5 font-display text-6xl font-bold uppercase leading-[0.92] md:text-8xl">
              Shaping India's <span className="text-orange">Champions</span>
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-white/70">
              {academy.designationHi} | {academy.designationEn}. A Delhi grassroots sports academy aligned with SAI/Khelo India reporting, athlete development and public trust.
            </p>
            <div className="mt-6 flex items-center">
              <span className="flex h-16 w-36 items-center rounded-md bg-white px-4 py-2 shadow-sm">
                <KheloIndiaLogo priority />
              </span>
            </div>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link href="/apply" className="btn-primary">Join KRSA <ArrowRight size={18} /></Link>
              <Link href="/gallery" className="btn-secondary border-white/25 text-white hover:border-white"><Play size={18} /> Watch Our Story</Link>
            </div>
            <a href="#sports" aria-label="Scroll to sports" className="mt-12 inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/20 text-white/70">
              <ArrowDown size={18} />
            </a>
          </motion.div>

          <motion.div initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.55 }} className="grid gap-4">
            {sports.map((sport) => (
              <div key={sport.name} className="rounded-lg border border-white/10 bg-white/[0.08] p-8 backdrop-blur">
                <sport.icon className="mb-10 text-orange" size={30} />
                <p className="font-display text-5xl font-bold uppercase">{sport.name}</p>
                <p className="mt-4 max-w-xl text-base leading-7 text-white/65">{sport.description}</p>
                <p className="mt-6 text-sm font-bold uppercase tracking-[0.16em] text-orange">{sport.batch}</p>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      <section className="bg-[#111126] px-5 py-5 text-white sm:px-8 lg:px-12 xl:px-16">
        <div className="container-wide grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((item) => (
            <div key={item.label} className="text-center">
              <p className="font-display text-4xl font-bold text-white">{item.value}</p>
              <p className="text-xs font-bold uppercase tracking-[0.18em] text-orange">{item.label}</p>
            </div>
          ))}
        </div>
      </section>

      <section id="sports" className="section-pad bg-cream dark:bg-[#111126]">
        <div className="container-wide">
          <SectionHeading eyebrow="Approved Sport" title="Basketball pathway for Delhi NCR athletes" copy="KRSA is currently presented as a Khelo India Accredited Academy for basketball, with batch timing and coach ownership ready for final data." />
          <div className="mx-auto grid max-w-3xl gap-4">
            {sports.map((sport) => (
              <Link key={sport.name} href="/sports" className="panel group min-h-72 p-5 transition hover:-translate-y-1 hover:bg-navy hover:text-white hover:shadow-premium">
                <sport.icon className="mb-8 text-orange" size={30} />
                <h2 className="font-display text-3xl font-bold uppercase text-ink group-hover:text-white dark:text-white">{sport.name}</h2>
                <p className="mt-1 text-sm font-bold text-green">{sport.nameHi}</p>
                <div className="mt-6 text-sm leading-6 text-muted group-hover:text-white/70 dark:text-white/60">
                  <p>{sport.batch}</p>
                  <p>Coach: {sport.coach}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="section-pad bg-white dark:bg-[#181833]">
        <div className="container-wide">
          <SectionHeading eyebrow="Featured Athletes" title="Public athlete spotlights and achievement visibility" />
          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
            {athletes.map((athlete) => (
              <Link href="/athletes" key={athlete.name} className="panel p-5 transition hover:-translate-y-1 hover:shadow-premium">
                <div className="mb-5 flex h-24 items-center justify-center rounded-md bg-gradient-to-br from-navy to-orange font-display text-4xl font-bold text-white">
                  {athlete.name.split(" ").map((part) => part[0]).join("")}
                </div>
                <p className="font-display text-2xl font-bold uppercase text-ink dark:text-white">{athlete.name}</p>
                <p className="mt-1 text-sm font-bold text-orange">{athlete.sport} | {athlete.batch}</p>
                <p className="mt-4 text-sm leading-6 text-muted dark:text-white/60">{athlete.achievement}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="section-pad bg-cream dark:bg-[#111126]">
        <div className="container-wide grid gap-10 lg:grid-cols-[1fr_360px]">
          <div>
            <SectionHeading eyebrow="News & Updates" title="Announcements, reports and academy notices" />
            <div className="grid gap-4 md:grid-cols-3">
              {news.map((item) => (
                <Link href="/news" key={item.title} className="panel p-5">
                  <item.icon className="text-orange" size={24} />
                  <p className="mt-6 text-xs font-bold uppercase tracking-[0.14em] text-green">{item.date}</p>
                  <h2 className="mt-2 font-display text-2xl font-bold uppercase text-ink dark:text-white">{item.title}</h2>
                  <p className="mt-3 text-sm leading-6 text-muted dark:text-white/60">{item.excerpt}</p>
                </Link>
              ))}
            </div>
          </div>
          <aside className="panel h-fit p-6">
            <p className="font-display text-2xl font-bold uppercase text-ink dark:text-white">Tournament Results</p>
            <div className="mt-5 grid gap-4">
              {tournaments.map((tournament) => (
                <div key={tournament.name} className="border-b border-slate-200 pb-4 last:border-0 dark:border-white/10">
                  <p className="font-bold">{tournament.name}</p>
                  <p className="mt-1 text-sm text-muted dark:text-white/60">{tournament.sport} | {tournament.status}</p>
                </div>
              ))}
            </div>
          </aside>
        </div>
      </section>

      <section className="bg-navy px-5 py-8 text-white sm:px-8 lg:px-12 xl:px-16">
        <div className="container-wide flex flex-col justify-between gap-5 md:flex-row md:items-center">
          <p className="font-display text-3xl font-bold uppercase">Proudly accredited by Khelo India / SAI</p>
          <div className="flex flex-wrap gap-2 text-xs font-bold uppercase tracking-[0.18em] text-white/70">
            <span className="rounded bg-white/10 px-4 py-3">Khelo India</span>
            <span className="rounded bg-white/10 px-4 py-3">SAI</span>
            <span className="rounded bg-white/10 px-4 py-3">MYAS</span>
          </div>
        </div>
      </section>

      <section className="section-pad bg-white dark:bg-[#181833]">
        <div className="container-wide">
          <SectionHeading eyebrow="Gallery" title="Training, tournaments and ceremonies" />
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {galleryItems.map((item) => (
              <Link href="/gallery" key={item.title} className={`flex aspect-[4/3] items-end rounded-lg bg-gradient-to-br ${item.tone} p-5 text-white`}>
                <span>
                  <span className="block text-xs font-bold uppercase tracking-[0.16em] text-white/60">{item.type}</span>
                  <span className="font-display text-2xl font-bold uppercase">{item.title}</span>
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
