"use client";

import Link from "next/link";
import { LogIn, Menu, Moon, Sun, X } from "lucide-react";
import { useState } from "react";
import { academy } from "@/lib/data";
import { useTheme } from "@/components/theme-provider";
import { KheloIndiaLogo } from "@/components/official-brand";

const nav = [
  ["Home", "/"],
  ["About", "/about"],
  ["Basketball", "/sports"],
  ["Khelo India", "/khelo-india"],
  ["Athletes", "/athletes"],
  ["Tournaments", "/tournaments"],
  ["Gallery", "/gallery"],
  ["News", "/news"],
  ["Contact", "/contact"]
];

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-navy text-white shadow-xl shadow-navy/10">
      <div className="container-wide flex min-h-20 items-center justify-between gap-3 px-5 sm:px-8 lg:px-12 xl:px-16">
        <Link href="/khelo-india" className="hidden h-14 w-28 items-center rounded-md bg-white px-3 py-2 shadow-sm sm:flex" aria-label="Khelo India accreditation">
          <KheloIndiaLogo priority />
        </Link>
        <Link href="/" className="flex min-w-0 flex-1 items-center justify-center gap-3 text-center" aria-label="KRSA home">
          <span className="flex h-11 w-12 shrink-0 items-center justify-center rounded-md bg-white font-display text-xs font-bold text-navy">KRSA</span>
          <span className="min-w-0">
            <span className="block truncate font-display text-base font-bold uppercase leading-none tracking-wide sm:text-lg">{academy.name}</span>
            <span className="block text-[10px] uppercase tracking-[0.18em] text-orange">{academy.designationHi} | {academy.designationEn}</span>
          </span>
        </Link>
        <Link href="/khelo-india" className="hidden min-h-14 min-w-28 items-center justify-center rounded-md border border-white/15 px-3 text-center font-display text-[10px] font-bold uppercase leading-tight text-white/85 sm:flex" aria-label="Sports Authority of India">
          <span>
            <span className="block text-orange">SAI / MYAS</span>
            <span className="block text-[8px] text-white/60">Accreditation</span>
          </span>
        </Link>
      </div>
      <div className="container-wide flex h-14 items-center justify-between border-t border-white/10 px-5 sm:px-8 lg:px-12 xl:px-16">
        <nav className="hidden items-center gap-1 xl:flex">
          {nav.map(([label, href]) => (
            <Link key={href} href={href} className="rounded-md px-3 py-2 text-sm font-semibold text-white/75 transition hover:bg-white/10 hover:text-white">
              {label}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-2">
          <button
            aria-label="Toggle theme"
            onClick={toggleTheme}
            className="rounded-md border border-white/15 p-2 text-white/80 transition hover:bg-white/10 hover:text-white"
          >
            {theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
          </button>
          <Link href="/login" className="hidden items-center gap-2 rounded-md border border-white/15 px-4 py-2 text-sm font-bold text-white/80 transition hover:bg-white/10 sm:inline-flex">
            <LogIn size={16} /> Login
          </Link>
          <Link href="/apply" className="rounded-md bg-orange px-4 py-2 text-sm font-bold shadow-lg shadow-orange/20 transition hover:bg-[#d85a24] sm:inline-flex">
            Apply Now
          </Link>
          <button className="rounded-md border border-white/15 p-2 xl:hidden" onClick={() => setOpen((value) => !value)} aria-label="Open menu">
            {open ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>
      {open ? (
        <div className="border-t border-white/10 bg-[#27274b] px-5 py-4 lg:hidden">
          <nav className="grid gap-2">
            {nav.map(([label, href]) => (
              <Link key={href} href={href} onClick={() => setOpen(false)} className="rounded-md px-3 py-2 text-sm font-semibold text-white/80 hover:bg-white/10">
                {label}
              </Link>
            ))}
            <Link href="/apply" onClick={() => setOpen(false)} className="rounded-md bg-orange px-3 py-2 text-sm font-bold text-white">Apply Now</Link>
            <Link href="/login" onClick={() => setOpen(false)} className="rounded-md px-3 py-2 text-sm font-semibold text-white/80 hover:bg-white/10">Login</Link>
          </nav>
        </div>
      ) : null}
    </header>
  );
}
