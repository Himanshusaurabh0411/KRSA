import { Mail, MapPin, Phone } from "lucide-react";
import { PageHero } from "@/components/page-hero";
import { academy } from "@/lib/data";

export default function ContactPage() {
  return (
    <main>
      <PageHero eyebrow="Contact" title="Visit KRSA or send an admission query" copy="Reach the academy team for program details, trial sessions, fee support, and partnership enquiries." />
      <section className="section-pad">
        <div className="container-wide grid gap-8 lg:grid-cols-[420px_1fr]">
          <div className="grid gap-4">
            <div className="panel p-6"><MapPin className="text-orange" /><p className="mt-4 font-bold">{academy.address}</p></div>
            <div className="panel p-6"><Phone className="text-orange" /><p className="mt-4 font-bold">{academy.contact}</p></div>
            <div className="panel p-6"><Mail className="text-orange" /><p className="mt-4 font-bold">admissions@{academy.domain}</p></div>
          </div>
          <form className="panel p-6 md:p-8">
            <div className="grid gap-5 md:grid-cols-2">
              <input required placeholder="Name" className="rounded-md border border-slate-300 bg-white px-4 py-3 dark:border-white/10 dark:bg-white/5" />
              <input required type="email" placeholder="Email" className="rounded-md border border-slate-300 bg-white px-4 py-3 dark:border-white/10 dark:bg-white/5" />
              <input required placeholder="Phone" className="rounded-md border border-slate-300 bg-white px-4 py-3 dark:border-white/10 dark:bg-white/5" />
              <select className="rounded-md border border-slate-300 bg-white px-4 py-3 dark:border-white/10 dark:bg-white/5"><option>Admission query</option><option>Coach partnership</option><option>Payment support</option></select>
              <textarea rows={6} placeholder="Message" className="rounded-md border border-slate-300 bg-white px-4 py-3 md:col-span-2 dark:border-white/10 dark:bg-white/5" />
            </div>
            <button className="btn-primary mt-6" type="submit">Send Message</button>
          </form>
        </div>
      </section>
    </main>
  );
}
