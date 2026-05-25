import { PageHero } from "@/components/page-hero";
import { AdminContentManager } from "@/components/admin-content-manager";

export default function AdminPage() {
  return (
    <main>
      <PageHero eyebrow="Admin Portal" title="KRSA content control centre" copy="Manage public website news, achievements and gallery images from one internal workspace." />
      <section className="section-pad">
        <div className="container-wide">
          <AdminContentManager />
        </div>
      </section>
    </main>
  );
}
