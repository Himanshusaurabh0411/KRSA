"use client";

import Link from "next/link";
import { ExternalLink, Menu, Moon, Sun, X } from "lucide-react";
import { useState } from "react";
import { academy } from "@/lib/data";
import { useTheme } from "@/components/theme-provider";
import { KheloIndiaLogo, KRSALogo } from "@/components/official-brand";

const nav = [
  ["Home", "/"],
  ["About", "/about"],
  ["Basketball", "/sports"],
  ["Khelo India", "/khelo-india"],
  ["Gallery", "/gallery"],
  ["News", "/news"],
  ["Contact", "/contact"],
  ["Admin Portal", "/admin"]
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
          <span className="flex h-16 w-16 shrink-0 items-center justify-center overflow-hidden rounded-lg border-2 border-orange/85 bg-[#fff4b8] p-1 shadow-[0_0_0_4px_rgba(244,125,59,0.16),0_14px_34px_rgba(244,125,59,0.24)] ring-1 ring-white/35 transition duration-200 hover:scale-[1.03]">
            <KRSALogo priority />
          </span>
          <span className="min-w-0">
            <span className="block truncate font-display text-3xl font-bold uppercase leading-none tracking-wide sm:text-4xl lg:text-5xl">{academy.name}</span>
            <span className="block text-[10px] uppercase tracking-[0.18em] text-orange sm:text-xs">{academy.designationHi} | {academy.designationEn}</span>
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
          <Link href={academy.nsrsPortalUrl} target="_blank" rel="noopener noreferrer" className="hidden items-center gap-2 rounded-md border border-white/15 px-4 py-2 text-sm font-bold text-white/80 transition hover:bg-white/10 sm:inline-flex">
            <ExternalLink size={16} /> Welcome to NSRS Portal
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
            <Link href={academy.nsrsPortalUrl} target="_blank" rel="noopener noreferrer" onClick={() => setOpen(false)} className="rounded-md px-3 py-2 text-sm font-semibold text-white/80 hover:bg-white/10">Welcome to NSRS Portal</Link>
          </nav>
        </div>
      ) : null}
    </header>
  );
}
