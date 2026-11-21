import { CTASection, DevNote, PageHero } from "@/components/Basics";
import { TeamDirectory } from "@/components/TeamDirectory";
import { enabledDepartments, populatedDepartments, visiblePeople } from "@/data/teams";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta({
  title: "Our Teams",
  description: "Different skills, shared standards and one collaborative approach to getting great work done. Meet the teams at One Solutions Creative For Education.",
  path: "/teams",
});

export default function TeamsPage() {
  const people = visiblePeople().filter((p) => p.department);
  const empty = enabledDepartments().filter((d) => !populatedDepartments().includes(d));
  return (
    <>
      <PageHero
        crumbs={[{ label: "Company" }, { label: "Our Teams" }]}
        eyebrow="Our teams"
        title="The People Behind the Possibilities."
        text="Different skills, shared standards, and one collaborative approach to getting great work done."
      />
      <section className="section">
        <div className="container">
          <TeamDirectory people={people} departments={populatedDepartments()} />
          <DevNote>
            Add or edit team members in <code>src/data/people.ts</code>; add departments in <code>src/data/teams.ts</code>.
            {empty.length > 0 && <> Departments without members are hidden for visitors: {empty.map((d) => d.short).join(", ")}.</>}
            {people.some((p) => p.placeholder) && " Profiles marked “Placeholder” are visible in development only."}
          </DevNote>
        </div>
      </section>
      <CTASection title="Want to work with this team?" label="Start a Conversation" />
    </>
  );
}
