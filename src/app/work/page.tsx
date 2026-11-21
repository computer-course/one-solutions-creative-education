import { CTASection, PageHero } from "@/components/Basics";
import { Icon } from "@/components/Icon";
import { WorkGrid } from "@/components/WorkGrid";
import { projects } from "@/data/projects";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta({
  title: "Our Work",
  description: "Websites, ERP, branding, admissions and accreditation projects for institutions from One Solutions Creative For Education.",
  path: "/work",
});

export default function WorkPage() {
  const hasConcepts = projects.some((p) => p.concept);
  return (
    <>
      <PageHero crumbs={[{ label: "Our Work" }]} eyebrow="Our work" title="Work that moves campuses forward." text="The kind of work we do across websites, ERP, branding, admissions and accreditation." />
      <section className="section">
        <div className="container">
          {hasConcepts && (
            <div className="notice" style={{ marginBottom: 32 }}>
              <Icon name="shield" />
              <p>Projects labelled <strong>Concept</strong> are illustrative samples created to show our approach. They are not client work. Client case studies are published only with permission.</p>
            </div>
          )}
          <WorkGrid projects={projects} />
        </div>
      </section>
      <CTASection title="Your project could be next." label="Start a Conversation" />
    </>
  );
}
