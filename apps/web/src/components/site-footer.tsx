import Link from "next/link";
import { ExternalLink, Instagram, Mail, MessageCircle } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { academy, sports } from "@/lib/data";
import { KheloIndiaLogo, KRSALogo } from "@/components/official-brand";

export function SiteFooter() {
  const socialLinks = [
    academy.social.whatsappUrl ? { label: "WhatsApp", href: academy.social.whatsappUrl, icon: MessageCircle } : null,
    academy.social.instagramUrl ? { label: "Instagram", href: academy.social.instagramUrl, icon: Instagram } : null
  ].filter(Boolean) as { label: string; href: string; icon: LucideIcon }[];

  return (
    <footer className="bg-[#111126] px-5 py-12 text-white sm:px-8 lg:px-12 xl:px-16">
      <div className="container-wide grid gap-10 md:grid-cols-[1.4fr_1fr_1fr]">
        <div>
          <div className="mb-4 flex flex-wrap items-center gap-3">
            <span className="flex h-14 w-14 items-center justify-center overflow-hidden rounded-lg border-2 border-orange/80 bg-[#fff4b8] p-1 shadow-[0_0_0_4px_rgba(244,125,59,0.12)]">
              <KRSALogo />
            </span>
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
          <p className="mb-4 font-display text-lg font-semibold">Basketball</p>
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
            <Link href="/coaches" className="hover:text-white">Coaches</Link>
            <Link href="/gallery" className="hover:text-white">Gallery</Link>
            <Link href="/news" className="hover:text-white">News</Link>
            <Link href="/apply" className="hover:text-white">Apply</Link>
            <Link href="/admin" className="hover:text-white">Admin Portal</Link>
            <Link href={academy.nsrsPortalUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 hover:text-white"><ExternalLink size={14} /> Welcome to NSRS Portal</Link>
            <Link href="/contact" className="hover:text-white">Contact</Link>
          </div>
          <div className="mt-6 flex flex-wrap gap-3 text-white/60">
            {socialLinks.map(({ label, href, icon: Icon }) => (
              <Link key={label} href={href} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 rounded-md border border-white/10 px-3 py-2 text-sm font-bold hover:border-white/30 hover:text-white">
                <Icon size={18} /> {label}
              </Link>
            ))}
            <Link href={`mailto:${academy.email}`} className="inline-flex items-center gap-2 rounded-md border border-white/10 px-3 py-2 text-sm font-bold hover:border-white/30 hover:text-white">
              <Mail size={18} /> Email
            </Link>
          </div>
        </div>
      </div>
      <div className="container-wide mt-10 flex flex-col gap-3 border-t border-white/10 pt-5 text-xs text-white/35 md:flex-row md:items-center md:justify-between">
        <span>Copyright KRSA. Privacy Policy | Terms. Official domain: {academy.domain}</span>
        <span>
          Made by{" "}
          <Link href={academy.techPartner.url} target="_blank" rel="noopener noreferrer" className="font-bold text-orange hover:text-white">
            {academy.techPartner.name}
          </Link>{" "}
          · Tech Partner
        </span>
      </div>
    </footer>
  );
}
