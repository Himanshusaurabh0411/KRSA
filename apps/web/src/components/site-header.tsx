"use client";

import Link from "next/link";
import { Menu, Moon, Sun, X } from "lucide-react";
import { useState } from "react";
import { academy } from "@/lib/data";
import { useTheme } from "@/components/theme-provider";

const nav = [
  ["Home", "/"],
  ["About", "/about"],
  ["Programs", "/programs"],
  ["Admissions", "/admissions"],
  ["Dashboard", "/dashboard"],
  ["Schedule", "/schedule"],
  ["Payments", "/payments"],
  ["Contact", "/contact"]
];

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-navy text-white shadow-xl shadow-navy/10">
      <div className="container-wide flex h-16 items-center justify-between px-5 sm:px-8 lg:px-12 xl:px-16">
        <Link href="/" className="flex items-center gap-3" aria-label="KRSA home">
          <span className="flex h-10 w-10 items-center justify-center rounded-md bg-white font-display text-sm font-bold text-navy">KR</span>
          <span>
            <span className="block font-display text-base font-bold uppercase leading-none tracking-wide">{academy.shortName}</span>
            <span className="block text-[10px] uppercase tracking-[0.22em] text-white/55">Khelo India Academy</span>
          </span>
        </Link>
        <nav className="hidden items-center gap-1 lg:flex">
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
          <Link href="/admissions" className="hidden rounded-md bg-orange px-4 py-2 text-sm font-bold shadow-lg shadow-orange/20 transition hover:bg-[#d74606] sm:inline-flex">
            Join Now
          </Link>
          <button className="rounded-md border border-white/15 p-2 lg:hidden" onClick={() => setOpen((value) => !value)} aria-label="Open menu">
            {open ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>
      {open ? (
        <div className="border-t border-white/10 bg-[#252b65] px-5 py-4 lg:hidden">
          <nav className="grid gap-2">
            {nav.map(([label, href]) => (
              <Link key={href} href={href} onClick={() => setOpen(false)} className="rounded-md px-3 py-2 text-sm font-semibold text-white/80 hover:bg-white/10">
                {label}
              </Link>
            ))}
          </nav>
        </div>
      ) : null}
    </header>
  );
}
