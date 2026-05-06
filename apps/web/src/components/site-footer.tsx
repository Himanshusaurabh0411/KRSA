import Link from "next/link";
import { academy, programs } from "@/lib/data";

export function SiteFooter() {
  return (
    <footer className="bg-[#0f1228] px-5 py-12 text-white sm:px-8 lg:px-12 xl:px-16">
      <div className="container-wide grid gap-10 md:grid-cols-[1.4fr_1fr_1fr]">
        <div>
          <div className="mb-4 flex items-center gap-3">
            <span className="flex h-10 w-10 items-center justify-center rounded-md bg-white font-display text-sm font-bold text-navy">KR</span>
            <div>
              <p className="font-display text-lg font-bold uppercase">{academy.name}</p>
              <p className="text-xs uppercase tracking-[0.2em] text-orange">{academy.status}</p>
            </div>
          </div>
          <p className="max-w-xl text-sm leading-6 text-white/55">{academy.address}. Built for admissions, athlete development, academy operations, and trusted communication.</p>
        </div>
        <div>
          <p className="mb-4 font-display text-lg font-semibold">Programs</p>
          <div className="grid gap-2 text-sm text-white/55">
            {programs.slice(0, 4).map((program) => (
              <Link key={program.title} href="/programs" className="hover:text-white">{program.title}</Link>
            ))}
          </div>
        </div>
        <div>
          <p className="mb-4 font-display text-lg font-semibold">Platform</p>
          <div className="grid gap-2 text-sm text-white/55">
            <Link href="/dashboard" className="hover:text-white">Dashboards</Link>
            <Link href="/schedule" className="hover:text-white">Training Schedule</Link>
            <Link href="/payments" className="hover:text-white">Payments</Link>
            <Link href="/contact" className="hover:text-white">Contact</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
