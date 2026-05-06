"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, CheckCircle2, ShieldCheck, Sparkles, Star, Trophy } from "lucide-react";
import { academy, dashboardMetrics, programs, testimonials } from "@/lib/data";
import { SectionHeading } from "@/components/section-heading";

export default function HomePage() {
  return (
    <main>
      <section className="relative overflow-hidden bg-navy px-5 py-20 text-white sm:px-8 lg:px-12 xl:px-16">
        <div className="absolute right-[-3rem] top-8 hidden font-display text-[10rem] font-bold uppercase leading-none text-white/[0.035] lg:block">KRSA</div>
        <div className="container-wide grid items-center gap-12 lg:grid-cols-[1.05fr_0.95fr]">
          <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <span className="eyebrow"><Sparkles size={14} /> {academy.status}</span>
            <h1 className="mt-5 font-display text-6xl font-bold uppercase leading-[0.95] md:text-8xl">
              Train Like a <span className="text-orange">Champion</span>
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-white/65">
              A complete digital sports academy platform for KRSA: admissions, coaching schedules, athlete performance, fee tracking, communication, and admin control.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link href="/admissions" className="btn-primary">Start Admission <ArrowRight size={18} /></Link>
              <Link href="/dashboard" className="btn-secondary border-white/25 text-white hover:border-white">View Dashboards</Link>
            </div>
          </motion.div>
          <motion.div initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.55 }} className="panel border-white/10 bg-white/[0.08] p-5 backdrop-blur">
            <div className="grid gap-3 sm:grid-cols-2">
              {dashboardMetrics.map((metric) => (
                <div key={metric.label} className="rounded-lg border border-white/10 bg-white/10 p-5">
                  <metric.icon className="mb-6 text-orange" size={24} />
                  <p className="font-display text-4xl font-bold">{metric.value}</p>
                  <p className="mt-1 text-sm font-semibold text-white/75">{metric.label}</p>
                  <p className="mt-3 text-xs text-white/45">{metric.change}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      <section className="bg-orange px-5 py-4 text-white sm:px-8 lg:px-12 xl:px-16">
        <div className="container-wide grid gap-4 text-sm font-bold uppercase tracking-[0.16em] sm:grid-cols-3">
          <span>SAI aligned operations</span>
          <span>AI performance insights</span>
          <span>Razorpay fee collection</span>
        </div>
      </section>

      <section className="section-pad bg-cream dark:bg-[#101225]">
        <div className="container-wide">
          <SectionHeading eyebrow="Programs" title="Multi-sport pathways with measurable progress" copy="Every program is designed around attendance, coach feedback, performance benchmarks, and parent-ready progress visibility." />
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {programs.slice(0, 6).map((program) => (
              <Link key={program.title} href="/programs" className="panel group p-6 transition hover:-translate-y-1 hover:shadow-premium">
                <program.icon className="mb-8 text-orange" size={30} />
                <div className="mb-3 flex items-center gap-2 text-xs font-bold uppercase tracking-[0.16em] text-green">
                  <CheckCircle2 size={14} /> {program.level}
                </div>
                <h3 className="font-display text-2xl font-bold uppercase text-ink group-hover:text-navy dark:text-white">{program.title}</h3>
                <p className="mt-3 text-sm leading-6 text-muted dark:text-white/60">{program.focus}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="section-pad bg-white dark:bg-[#151833]">
        <div className="container-wide">
          <SectionHeading eyebrow="Trust" title="Built for students, coaches, and administrators" />
          <div className="grid gap-5 lg:grid-cols-3">
            {testimonials.map((testimonial) => (
              <div key={testimonial.name} className="panel p-6">
                <div className="mb-5 flex gap-1 text-orange">{Array.from({ length: 5 }).map((_, index) => <Star key={index} size={16} fill="currentColor" />)}</div>
                <p className="text-base leading-7 text-ink dark:text-white">"{testimonial.quote}"</p>
                <p className="mt-5 text-sm font-bold text-muted dark:text-white/50">{testimonial.name}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-pad bg-navy text-white">
        <div className="container-wide flex flex-col items-start justify-between gap-8 md:flex-row md:items-center">
          <div>
            <span className="eyebrow"><ShieldCheck size={14} /> Admissions Open</span>
            <h2 className="mt-4 font-display text-4xl font-bold uppercase md:text-6xl">Bring every academy workflow online.</h2>
          </div>
          <Link href="/admissions" className="btn-primary shrink-0">Join KRSA <Trophy size={18} /></Link>
        </div>
      </section>
    </main>
  );
}
