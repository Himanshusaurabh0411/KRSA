import { cookies } from "next/headers";
import { PageHero } from "@/components/page-hero";
import { AdminContentManager } from "@/components/admin-content-manager";
import { AdminLogoutButton } from "@/components/admin-logout-button";
import { AdminOtpLogin } from "@/components/admin-otp-login";
import { ADMIN_SESSION_COOKIE, readAdminSession } from "@/lib/admin-auth";

export const dynamic = "force-dynamic";

export default async function AdminPage() {
  const cookieStore = await cookies();
  const session = readAdminSession(cookieStore.get(ADMIN_SESSION_COOKIE)?.value);

  if (!session) {
    return (
      <main>
        <PageHero eyebrow="Admin Portal" title="Secure KRSA admin access" copy="Use OTP verification before opening website content controls." />
        <section className="section-pad">
          <div className="container-wide">
            <AdminOtpLogin />
          </div>
        </section>
      </main>
    );
  }

  return (
    <main>
      <PageHero eyebrow="Admin Portal" title="KRSA content control centre" copy="Manage public website coaches, news, achievements and gallery images from one internal workspace." />
      <section className="section-pad">
        <div className="container-wide">
          <div className="mb-6 flex flex-col justify-between gap-3 rounded-lg border border-slate-200 bg-white p-4 shadow-sm md:flex-row md:items-center dark:border-white/10 dark:bg-white/5">
            <p className="text-sm font-bold text-muted dark:text-white/60">
              Signed in as <span className="text-ink dark:text-white">{session.email}</span>
            </p>
            <AdminLogoutButton />
          </div>
          <AdminContentManager />
        </div>
      </section>
    </main>
  );
}
