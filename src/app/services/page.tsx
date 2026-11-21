import Link from "next/link";
import { CTASection, PageHero, SectionHeading, Steps } from "@/components/Basics";
import { Icon } from "@/components/Icon";
import { Mockup } from "@/components/Mockup";
import { services, workflow } from "@/data/services";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta({
  title: "Services",
  description: "Websites, ERP and LMS, SEO, graphics, social media, admission services and NAAC & NIRF data support for universities, colleges and schools.",
  path: "/services",
});

export default function ServicesPage() {
  return (
    <>
      <PageHero crumbs={[{ label: "Services" }]} eyebrow="Services" title="Everything a campus needs to grow, in one place." text="Choose a single service or combine several. One team plans and delivers it.">
        <div className="chips">{services.map((s) => <a key={s.slug} href={`#${s.slug}`} className="chip">{s.short}</a>)}</div>
      </PageHero>
      <section className="section" style={{ paddingTop: 24 }}>
        <div className="container">
          {services.map((s) => (
            <article className="service-list-row" key={s.slug} id={s.slug} data-reveal>
              <Mockup kind={s.visual} label={`${s.name} illustration`} />
              <div>
                <span className="icon-chip"><Icon name={s.icon} /></span>
                <h3>{s.name}</h3>
                <p>{s.summary}</p>
                <div className="chips">{s.deliverables.slice(0, 5).map((d) => <span className="chip" key={d}>{d}</span>)}</div>
                <Link href={`/services/${s.slug}`} className="btn btn-secondary">Explore service <Icon name="arrow" size={18} /></Link>
              </div>
            </article>
          ))}
        </div>
      </section>
      <section className="section alt">
        <div className="container">
          <SectionHeading eyebrow="How we work" title="The same clear process for every service" />
          <Steps items={workflow} />
        </div>
      </section>
      <CTASection title="Not sure which service you need?" text="Describe the problem. We will suggest the right combination." label="Talk to Us" />
    </>
  );
}
