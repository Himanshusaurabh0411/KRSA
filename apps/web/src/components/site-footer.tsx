import Link from "next/link";
import { Facebook, Instagram, Twitter, Youtube } from "lucide-react";
import { academy, sports } from "@/lib/data";
import { KheloIndiaLogo } from "@/components/official-brand";

export function SiteFooter() {
  return (
    <footer className="bg-[#111126] px-5 py-12 text-white sm:px-8 lg:px-12 xl:px-16">
      <div className="container-wide grid gap-10 md:grid-cols-[1.4fr_1fr_1fr]">
        <div>
          <div className="mb-4 flex flex-wrap items-center gap-3">
            <span className="flex h-10 w-12 items-center justify-center rounded-md bg-white font-display text-xs font-bold text-navy">KRSA</span>
            <span className="flex h-12 w-24 items-center rounded-md bg-white px-3 py-2">
              <KheloIndiaLogo />
            </span>
            <div>
              <p className="font-display text-lg font-bold uppercase">{academy.name}</p>
              <p className="text-xs uppercase tracking-[0.2em] text-orange">{academy.accreditation}</p>
            </div>
          </div>
          <p className="max-w-xl text-sm leading-6 text-white/55">{academy.address}. {academy.designationHi} | {academy.designationEn}.</p>
          <div className="mt-5 flex flex-wrap gap-2 text-xs font-bold uppercase tracking-[0.16em] text-white/60">
            <span className="rounded bg-white/10 px-3 py-2">KRSA</span>
            <span className="rounded bg-white/10 px-3 py-2">Khelo India</span>
            <span className="rounded bg-white/10 px-3 py-2">SAI</span>
            <span className="rounded bg-white/10 px-3 py-2">MYAS</span>
          </div>
        </div>
        <div>
          <p className="mb-4 font-display text-lg font-semibold">Sports</p>
          <div className="grid gap-2 text-sm text-white/55">
            {sports.map((sport) => (
              <Link key={sport.name} href="/sports" className="hover:text-white">{sport.name}</Link>
            ))}
          </div>
        </div>
        <div>
          <p className="mb-4 font-display text-lg font-semibold">Quick Links</p>
          <div className="grid gap-2 text-sm text-white/55">
            <Link href="/khelo-india" className="hover:text-white">Khelo India</Link>
            <Link href="/athletes" className="hover:text-white">Athletes</Link>
            <Link href="/tournaments" className="hover:text-white">Tournaments</Link>
            <Link href="/apply" className="hover:text-white">Apply</Link>
            <Link href="/contact" className="hover:text-white">Contact</Link>
          </div>
          <div className="mt-6 flex gap-3 text-white/60">
            <Youtube size={18} aria-label="YouTube" />
            <Instagram size={18} aria-label="Instagram" />
            <Facebook size={18} aria-label="Facebook" />
            <Twitter size={18} aria-label="Twitter/X" />
          </div>
        </div>
      </div>
      <div className="container-wide mt-10 border-t border-white/10 pt-5 text-xs text-white/35">
        Copyright KRSA. Privacy Policy | Terms. Recommended domain: {academy.domain}
      </div>
    </footer>
  );
}
