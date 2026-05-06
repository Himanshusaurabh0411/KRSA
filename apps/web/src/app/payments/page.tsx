import { BadgeIndianRupee, CheckCircle2, Receipt } from "lucide-react";
import { PageHero } from "@/components/page-hero";
import { programs } from "@/lib/data";

const history = [
  { id: "KRSA-1028", month: "May 2026", amount: 6500, status: "Paid" },
  { id: "KRSA-0994", month: "Apr 2026", amount: 6500, status: "Paid" },
  { id: "KRSA-0951", month: "Mar 2026", amount: 3500, status: "Pending" }
];

export default function PaymentsPage() {
  return (
    <main>
      <PageHero eyebrow="Payments" title="Fees, invoices, and Razorpay-ready checkout" copy="Students and guardians can view dues and history; admins can reconcile fee collection and payment failures." />
      <section className="section-pad">
        <div className="container-wide grid gap-8 xl:grid-cols-[1fr_420px]">
          <div className="grid gap-4 md:grid-cols-2">
            {programs.slice(0, 4).map((program) => (
              <div key={program.title} className="panel p-6">
                <BadgeIndianRupee className="text-orange" size={28} />
                <h2 className="mt-6 font-display text-2xl font-bold uppercase text-ink dark:text-white">{program.title}</h2>
                <p className="mt-2 text-sm text-muted dark:text-white/60">{program.level} | {program.age}</p>
                <p className="mt-6 font-display text-4xl font-bold text-navy dark:text-white">Rs. {program.price}</p>
              </div>
            ))}
          </div>
          <aside className="panel h-fit p-6">
            <div className="mb-5 flex items-center gap-2"><Receipt className="text-orange" size={22} /><h2 className="font-display text-2xl font-bold uppercase">Payment history</h2></div>
            <div className="grid gap-3">
              {history.map((payment) => (
                <div key={payment.id} className="rounded-md border border-slate-200 p-4 dark:border-white/10">
                  <div className="flex items-center justify-between gap-4">
                    <span className="font-bold">{payment.month}</span>
                    <span className={`flex items-center gap-1 text-sm font-bold ${payment.status === "Paid" ? "text-green" : "text-orange"}`}><CheckCircle2 size={15} /> {payment.status}</span>
                  </div>
                  <p className="mt-1 text-sm text-muted dark:text-white/60">{payment.id} | Rs. {payment.amount}</p>
                </div>
              ))}
            </div>
          </aside>
        </div>
      </section>
    </main>
  );
}
