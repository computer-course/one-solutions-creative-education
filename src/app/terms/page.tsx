import { DevNote, PageHero } from "@/components/Basics";
import { site } from "@/data/site";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta({ title: "Terms of Use", description: `Terms governing the use of the ${site.name} website.`, path: "/terms" });

export default function TermsPage() {
  return (
    <>
      <PageHero crumbs={[{ label: "Terms" }]} title="Terms of Use" text="The terms that apply when you use this website." />
      <section className="section">
        <div className="container prose">
          <DevNote>This is a general template. Have it reviewed by a legal professional before publishing.</DevNote>
          <h2>Use of this website</h2>
          <p>This website provides general information about {site.name} and its services. You may browse it for lawful purposes only.</p>
          <h2>Services and proposals</h2>
          <p>Information on this website is not a binding offer. The scope, fees, timelines and ownership terms of any engagement are set out in a written proposal or agreement.</p>
          <h2>Concept work</h2>
          <p>Projects labelled “Concept” are illustrative samples and do not represent work for actual clients.</p>
          <h2>No guaranteed outcomes</h2>
          <p>We do not guarantee admissions, seats, search rankings, advertising results, accreditation grades or institutional rankings. These depend on third parties and factors outside our control.</p>
          <h2>Intellectual property</h2>
          <p>The content and design of this website belong to {site.name} unless stated otherwise and may not be reused without permission.</p>
          <h2>Liability</h2>
          <p>We take care to keep this website accurate but provide it “as is”, without warranties, to the extent permitted by law.</p>
          <h2>Contact</h2>
          <p>Questions about these terms can be sent through our contact page.</p>
        </div>
      </section>
    </>
  );
}
