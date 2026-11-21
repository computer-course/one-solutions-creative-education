import { notFound } from "next/navigation";
import Link from "next/link";
import { CTASection, Faq, PageHero, SectionHeading, Steps } from "@/components/Basics";
import { Icon } from "@/components/Icon";
import { Mockup } from "@/components/Mockup";
import { getService, services, workflow } from "@/data/services";
import { site } from "@/data/site";
import { pageMeta } from "@/lib/seo";

type Props = { params: Promise<{ slug: string }> };

export const dynamicParams = false;
export const generateStaticParams = () => services.map((s) => ({ slug: s.slug }));

export async function generateMetadata({ params }: Props) {
  const s = getService((await params).slug);
  return s ? pageMeta({ title: s.name, description: s.summary, path: `/services/${s.slug}` }) : {};
}

export default async function ServicePage({ params }: Props) {
  const s = getService((await params).slug);
  if (!s) notFound();
  const related = services.filter((x) => x.slug !== s.slug && x.category === s.category).slice(0, 3);
  const ld = [
    { "@context": "https://schema.org", "@type": "Service", name: s.name, description: s.summary, provider: { "@type": "Organization", name: site.name, url: site.url }, url: `${site.url}/services/${s.slug}` },
    { "@context": "https://schema.org", "@type": "FAQPage", mainEntity: s.faqs.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })) },
  ];
  return (
    <>
      <PageHero
        crumbs={[{ label: "Services", href: "/services" }, { label: s.short }]}
        eyebrow={s.category}
        title={s.name}
        text={s.summary}
        visual={<div className="mockup-frame"><Mockup kind={s.visual} label={`${s.name} illustration`} /></div>}
      >
        <Link href="/contact" className="btn btn-primary btn-lg">Discuss This Service <Icon name="arrow" size={18} /></Link>
      </PageHero>

      <section className="section">
        <div className="container detail-grid">
          <div data-reveal>
            <p className="eyebrow">Overview</p>
            <h2>What this service does for you</h2>
            <p className="lead">{s.overview}</p>
            {s.disclaimer && <div className="notice" style={{ marginTop: 24 }}><Icon name="shield" /><p>{s.disclaimer}</p></div>}
          </div>
          <div data-reveal>
            <h4 style={{ marginBottom: 16 }}>Problems we address</h4>
            {s.problems.map((p, i) => <div className="problem" key={p}><span>{i + 1}</span><p>{p}</p></div>)}
          </div>
        </div>
      </section>

      <section className="section alt">
        <div className="container detail-grid">
          <div>
            <p className="eyebrow">Deliverables</p>
            <h2>What you get</h2>
            <p className="lead">The exact scope is confirmed in a written proposal.</p>
          </div>
          <ul className="deliverables" data-reveal>
            {s.deliverables.map((d) => <li key={d}><Icon name="check" size={18} />{d}</li>)}
          </ul>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <SectionHeading eyebrow="Workflow" title="How the work moves forward" />
          <Steps items={workflow} />
        </div>
      </section>

      <section className="section alt">
        <div className="container">
          <SectionHeading eyebrow="By institution" title="Where it applies" text="Typical use cases — illustrative, not client results." />
          <div className="grid grid-3">
            {s.examples.map((e) => (
              <div className="feature example" key={e.industry} data-reveal>
                <p className="eyebrow">{e.industry}</p>
                <h3>{e.text}</h3>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container detail-grid">
          <div>
            <p className="eyebrow">FAQs</p>
            <h2>Common questions</h2>
            {related.length > 0 && (
              <div style={{ marginTop: 32 }}>
                <h4 style={{ marginBottom: 12 }}>Related services</h4>
                <div className="chips">{related.map((r) => <Link key={r.slug} href={`/services/${r.slug}`} className="chip">{r.short}</Link>)}</div>
              </div>
            )}
          </div>
          <Faq items={s.faqs} />
        </div>
      </section>

      <CTASection title={`Ready to talk about ${s.short.toLowerCase()}?`} label="Start a Conversation" />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(ld) }} />
    </>
  );
}
