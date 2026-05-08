import { Download, Upload } from "lucide-react";
import { PageHero } from "@/components/page-hero";
import { athletes, dashboardMetrics } from "@/lib/data";

export default function SaiPortalPage() {
  return (
    <main>
      <PageHero eyebrow="SAI Reporting" title="KIT dashboard, NSRS export and UC uploads" copy="Reporting workspace for SAI/Khelo India liaison users with KIT athlete records and utilization certificate document management." />
      <section className="section-pad">
        <div className="container-wide">
          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
            {dashboardMetrics.map((metric) => (
              <div key={metric.label} className="panel p-5">
                <metric.icon className="text-orange" />
                <p className="mt-6 font-display text-4xl font-bold">{metric.value}</p>
                <p className="mt-1 text-sm font-bold text-muted dark:text-white/60">{metric.label}</p>
              </div>
            ))}
          </div>
          <div className="mt-8 panel overflow-hidden">
            <div className="flex flex-col justify-between gap-4 border-b border-slate-200 p-5 md:flex-row md:items-center dark:border-white/10">
              <p className="font-display text-2xl font-bold uppercase">KIT athlete export</p>
              <div className="flex gap-2"><button className="btn-secondary"><Upload size={16} /> Upload UC</button><button className="btn-primary"><Download size={16} /> NSRS CSV</button></div>
            </div>
            {athletes.filter((athlete) => athlete.kit).map((athlete) => (
              <div key={athlete.name} className="grid gap-2 border-b border-slate-200 p-5 last:border-0 md:grid-cols-4 dark:border-white/10">
                <p className="font-bold">{athlete.name}</p>
                <p className="text-sm text-muted dark:text-white/60">{athlete.sport}</p>
                <p className="text-sm text-muted dark:text-white/60">{athlete.achievement}</p>
                <p className="text-sm font-bold text-green">KIT Active</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
