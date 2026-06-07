"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowDown, ArrowRight, Play, ShieldCheck } from "lucide-react";
import { academy, sports, trustees } from "@/lib/data";
import { SectionHeading } from "@/components/section-heading";
import { KheloIndiaLogo } from "@/components/official-brand";
import { useCmsContent } from "@/lib/cms-content";
import { CoachGrid } from "@/components/coach-grid";

export default function HomePage() {
  const { content } = useCmsContent();

  return (
    <main>
      <section className="overflow-hidden border-b border-slate-200 bg-white py-4 dark:border-white/10 dark:bg-[#181833]">
        <motion.div
          className="flex w-max gap-5 px-5 sm:px-8 lg:px-12 xl:px-16"
          animate={{ x: ["0%", "-50%"] }}
          transition={{ duration: 24, ease: "linear", repeat: Infinity }}
        >
          {[0, 1, 2, 3].map((item) => (
            <div key={item} className="relative aspect-[1175/224] w-[min(86vw,1175px)] shrink-0 overflow-hidden rounded-md border border-slate-200 bg-white shadow-sm dark:border-white/10">
              <Image
                src="/brand/krsa-academy-banner.jpeg"
                alt="Krishna Rattan Sports Academy Khelo India Accredited Academy banner"
                fill
                sizes="(min-width: 1280px) 1175px, 86vw"
                className="object-contain"
                priority={item === 0}
              />
            </div>
          ))}
        </motion.div>
      </section>

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
            <div className="rounded-lg border border-white/10 bg-white/[0.08] p-5 backdrop-blur">
              <span className="text-xs font-bold uppercase tracking-[0.18em] text-orange">KRSA Trustees</span>
              <div className="mt-5 grid gap-4 sm:grid-cols-2">
                {trustees.map((trustee, index) => (
                  <div key={trustee.name} className="rounded-md border border-white/10 bg-white/[0.06] p-4">
                    <div className="grid gap-4 sm:grid-cols-[96px_1fr] sm:items-center">
                      <div className="relative h-24 w-24 overflow-hidden rounded-lg border border-white/15 bg-white/10">
                        <Image
                          src={trustee.photoUrl}
                          alt={trustee.name}
                          fill
                          sizes="96px"
                          className="object-cover"
                          priority={index === 0}
                        />
                      </div>
                      <div>
                        <h2 className="font-display text-3xl font-bold uppercase leading-none text-white">{trustee.name}</h2>
                        <p className="mt-2 text-xs font-bold uppercase tracking-[0.14em] text-white/55">{trustee.title}</p>
                      </div>
                    </div>
                    <p className="mt-4 text-sm leading-6 text-white/65">{trustee.role}</p>
                  </div>
                ))}
              </div>
              <div className="mt-5 flex flex-wrap gap-2">
                {trustees.flatMap((trustee) => trustee.focus).slice(0, 6).map((item) => (
                  <span key={item} className="rounded-md border border-white/10 px-3 py-2 text-[11px] font-bold uppercase tracking-[0.12em] text-white/65">
                    {item}
                  </span>
                ))}
              </div>
            </div>

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

      <section id="sports" className="section-pad bg-cream dark:bg-[#111126]">
        <div className="container-wide">
          <SectionHeading eyebrow="Approved Sport" title="Basketball pathway for Delhi NCR athletes" copy="KRSA is currently presented as a Khelo India Accredited Academy for basketball, with batch timing and coach details ready for final data." />
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
          <div className="mb-8 flex flex-col justify-between gap-4 md:flex-row md:items-end">
            <SectionHeading eyebrow="Coaches" title="Experienced basketball mentors" />
            <Link href="/coaches" className="btn-secondary w-fit">
              View All Coaches <ArrowRight size={16} />
            </Link>
          </div>
          <CoachGrid compact />
        </div>
      </section>

      <section className="section-pad bg-cream dark:bg-[#111126]">
        <div className="container-wide">
          <SectionHeading eyebrow="Achievements" title="Academy highlights and recognition" />
          <div className="grid gap-5 md:grid-cols-2">
            {content.achievements.map((item) => (
              <article key={item.id} className="panel overflow-hidden p-0">
                <div className="aspect-[16/9] overflow-hidden bg-slate-100 p-2 dark:bg-white/10">
                  <img
                    src={item.image}
                    alt=""
                    className="h-full w-full object-contain transition duration-500 hover:scale-[1.02]"
                  />
                </div>
                <div className="p-5">
                  <p className="text-xs font-bold uppercase tracking-[0.16em] text-green">{item.date}</p>
                  <h2 className="mt-2 font-display text-3xl font-bold uppercase text-ink dark:text-white">{item.title}</h2>
                  <p className="mt-4 text-sm leading-6 text-muted dark:text-white/60">{item.description}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section-pad bg-white dark:bg-[#181833]">
        <div className="container-wide">
          <SectionHeading eyebrow="News & Updates" title="Announcements, reports and academy notices" />
          <div className="grid gap-4 md:grid-cols-3">
            {content.news.map((item) => (
              <Link href="/news" key={item.id} className="panel overflow-hidden p-0">
                <div className="aspect-[16/9] overflow-hidden bg-slate-100 p-2 dark:bg-white/10">
                  <img src={item.image} alt="" className="h-full w-full object-contain transition duration-500 hover:scale-[1.02]" />
                </div>
                <div className="p-5">
                  <p className="text-xs font-bold uppercase tracking-[0.14em] text-green">{item.date}</p>
                  <h2 className="mt-2 font-display text-2xl font-bold uppercase text-ink dark:text-white">{item.title}</h2>
                  <p className="mt-3 text-sm leading-6 text-muted dark:text-white/60">{item.excerpt}</p>
                </div>
              </Link>
            ))}
          </div>
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
            {content.gallery.map((item) => (
              <Link href="/gallery" key={item.id} aria-label="Open gallery album" className="group relative block aspect-[4/3] overflow-hidden rounded-lg bg-navy text-white">
                <img src={item.image} alt="" className="h-full w-full object-cover transition duration-500 group-hover:scale-105" />
              </Link>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
