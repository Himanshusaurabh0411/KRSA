import Link from "next/link";
import { PageHero } from "@/components/page-hero";
import { adminModules, dashboardMetrics, portalRoles } from "@/lib/data";

export default function AdminPage() {
  return (
    <main>
      <PageHero eyebrow="Admin Dashboard" title="KRSA management control centre" copy="Super Admin and Academy Admin view for content, athlete data, tournaments, applications, SAI reporting and audit-ready operations." />
      <section className="section-pad">
        <div className="container-wide">
          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
            {dashboardMetrics.map((metric) => (
              <div key={metric.label} className="panel p-5">
                <metric.icon className="text-orange" />
                <p className="mt-6 font-display text-4xl font-bold text-ink dark:text-white">{metric.value}</p>
                <p className="mt-1 text-sm font-bold text-muted dark:text-white/60">{metric.label}</p>
                <p className="mt-3 text-xs text-green">{metric.change}</p>
              </div>
            ))}
          </div>
          <div className="mt-8 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {adminModules.map((module) => (
              <div key={module.title} className="panel p-6">
                <module.icon className="text-orange" />
                <h2 className="mt-6 font-display text-2xl font-bold uppercase">{module.title}</h2>
                <p className="mt-3 text-sm leading-6 text-muted dark:text-white/60">{module.description}</p>
              </div>
            ))}
          </div>
          <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-5">
            {portalRoles.map((role) => (
              <Link key={role.path} href={role.path} className="panel p-5">
                <role.icon className="text-orange" />
                <p className="mt-5 font-display text-xl font-bold uppercase">{role.title}</p>
                <p className="mt-2 text-sm text-muted dark:text-white/60">{role.access}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
