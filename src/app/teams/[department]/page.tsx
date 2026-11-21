import Link from "next/link";
import { notFound } from "next/navigation";
import { CTASection, DevNote, PageHero } from "@/components/Basics";
import { TeamMemberCard } from "@/components/Cards";
import { Icon } from "@/components/Icon";
import { enabledDepartments, getDepartment, membersOf } from "@/data/teams";
import { pageMeta } from "@/lib/seo";

type Props = { params: Promise<{ department: string }> };

export const dynamicParams = false;
export const generateStaticParams = () => enabledDepartments().map((d) => ({ department: d.slug }));

export async function generateMetadata({ params }: Props) {
  const d = getDepartment((await params).department);
  if (!d) return {};
  return pageMeta({ title: d.name, description: d.description, path: `/teams/${d.slug}`, noindex: membersOf(d.slug).length === 0 });
}

export default async function DepartmentPage({ params }: Props) {
  const d = getDepartment((await params).department);
  if (!d) notFound();
  const members = membersOf(d.slug);
  return (
    <>
      <PageHero crumbs={[{ label: "Our Teams", href: "/teams" }, { label: d.short }]} eyebrow="Our teams" title={d.name} text={d.description}>
        <div className="chips">{d.focus.map((f) => <span className="chip" key={f}>{f}</span>)}</div>
      </PageHero>
      <section className="section">
        <div className="container">
          {members.length > 0 ? (
            <div className="grid member-grid">{members.map((p) => <TeamMemberCard key={p.id} person={p} />)}</div>
          ) : (
            <div className="empty">
              <span className="icon-chip lg"><Icon name={d.icon} size={24} /></span>
              <h3>Team profiles coming soon</h3>
              <p>Profiles for this team have not been published yet.</p>
              <Link href="/teams" className="link-arrow">View all teams <Icon name="arrow" size={16} /></Link>
            </div>
          )}
          <DevNote>Members with <code>department: &quot;{d.slug}&quot;</code> in <code>src/data/people.ts</code> appear here. Empty department pages are excluded from the sitemap and search engines.</DevNote>
        </div>
      </section>
      <CTASection title="Have a project for this team?" label="Start a Conversation" />
    </>
  );
}
