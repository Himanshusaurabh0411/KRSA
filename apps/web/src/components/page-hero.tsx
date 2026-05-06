"use client";

import { motion } from "framer-motion";

export function PageHero({ eyebrow, title, copy }: { eyebrow: string; title: string; copy: string }) {
  return (
    <section className="bg-navy px-5 py-16 text-white sm:px-8 lg:px-12 xl:px-16">
      <motion.div
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45 }}
        className="container-wide"
      >
        <span className="eyebrow">{eyebrow}</span>
        <h1 className="mt-4 max-w-4xl font-display text-5xl font-bold uppercase leading-none md:text-7xl">{title}</h1>
        <p className="mt-5 max-w-2xl text-lg leading-8 text-white/65">{copy}</p>
      </motion.div>
    </section>
  );
}
