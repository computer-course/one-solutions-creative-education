import Link from "next/link";
import { CTASection, DevNote, PageHero, SectionHeading } from "@/components/Basics";
import { LeadershipProfile } from "@/components/Cards";
import { Icon } from "@/components/Icon";
import { leadershipLevels } from "@/data/people";
import { getDepartment, initialsOf, leadersAt, populatedDepartments } from "@/data/teams";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta({
  title: "Leadership",
  description: "Meet the people responsible for guiding our vision, shaping our strategy and supporting the teams that bring every project to life.",
  path: "/leadership",
});

export default function LeadershipPage() {
  const level = (l: (typeof leadershipLevels)[number]["level"]) => leadershipLevels.find((x) => x.level === l)!;
  const directors = [
    ...(level("founder").visible ? leadersAt("founder") : []),
    ...(level("patron").visible ? leadersAt("patron") : []),
    ...(level("director").visible ? leadersAt("director") : []),
  ];
  const coDirectors = [
    ...(level("co-founder").visible ? leadersAt("co-founder") : []),
  ];
  const heads = level("department-head").visible ? leadersAt("department-head") : [];
  const leads = level("team-lead").visible ? leadersAt("team-lead") : [];
  const all = [...directors, ...coDirectors, ...heads, ...leads];
  const depts = populatedDepartments();
  const leadDepts = [...new Set(leads.map((l) => l.department))];

  return (
    <>
      <PageHero
        crumbs={[{ label: "Company" }, { label: "Leadership" }]}
        eyebrow="Leadership"
        title="Leadership & Direction"
        text="Meet the people responsible for guiding our vision, shaping our strategy, and supporting the teams that bring every project to life."
      />

      {directors.length > 0 && (
        <section className="section">
          <div className="container directors">
            {directors.map((d) => <LeadershipProfile key={d.id} person={d} featured />)}
          </div>
        </section>
      )}

      {coDirectors.length > 0 && (
        <section className="section alt">
          <div className="container">
            <SectionHeading eyebrow="Board" title="Founders & Co-Directors" text="Working alongside the Founder on strategy, governance and growth." />
            <div className="grid leader-wide-grid">{coDirectors.map((p) => <LeadershipProfile key={p.id} person={p} wide />)}</div>
          </div>
        </section>
      )}

      {heads.length > 0 && (
        <section className="section">
          <div className="container">
            <SectionHeading eyebrow="Departments" title="Department Heads" text={level("department-head").summary} />
            <div className="grid leader-grid">{heads.map((p) => <LeadershipProfile key={p.id} person={p} />)}</div>
          </div>
        </section>
      )}

      {leads.length > 0 && (
        <section className="section alt">
          <div className="container">
            <SectionHeading eyebrow="Teams" title="Team Leads" text={level("team-lead").summary} />
            {leadDepts.map((slug) => (
              <div className="team-group" key={slug ?? "general"}>
                <header><h2>{(slug && getDepartment(slug)?.name) || "Company"}</h2></header>
                <div className="grid leader-grid">{leads.filter((l) => l.department === slug).map((p) => <LeadershipProfile key={p.id} person={p} />)}</div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Structure graphic */}
      <section className="section">
        <div className="container">
          <SectionHeading center eyebrow="Structure" title="How we are organised" />
          <div className="org" data-reveal>
            <div className="org-tier">
              {directors.map((d) => (
                <div className="org-node top" key={d.id}>
                  <span className="avatar">{initialsOf(d.name)}</span>
                  <span><strong>{d.name}</strong><small>{d.title}</small></span>
                </div>
              ))}
            </div>
            {coDirectors.length > 0 && <span className="org-line" />}
            <div className="org-tier">
              {coDirectors.map((d) => (
                <div className="org-node" key={d.id}>
                  <span className="avatar">{initialsOf(d.name)}</span>
                  <span><strong>{d.name}</strong><small>{d.title}</small></span>
                </div>
              ))}
            </div>
            {depts.length > 0 && (
              <div className="org-row">
                {depts.map((d) => (
                  <Link key={d.slug} href={`/teams/${d.slug}`} className="org-dept"><Icon name={d.icon} size={16} />{d.short}</Link>
                ))}
              </div>
            )}
          </div>
          <DevNote>
            {all.some((p) => !p.photo) && "Add approved portraits (photo), "}
            {all.some((p) => !p.bio) && "biographies (bio, background), responsibilities (focus) and LinkedIn links "}
            in <code>src/data/people.ts</code>. Department Heads and Team Leads appear automatically once a person is given <code>leadership: &quot;department-head&quot;</code> or <code>&quot;team-lead&quot;</code>.
          </DevNote>
        </div>
      </section>

      <CTASection title="Work with a team that is led with care." label="Start a Conversation" />
    </>
  );
}
