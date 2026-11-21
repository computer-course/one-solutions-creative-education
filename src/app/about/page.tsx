import Link from "next/link";
import { CTASection, DevNote, PageHero, SectionHeading, Steps } from "@/components/Basics";
import { Icon } from "@/components/Icon";
import { approach, values } from "@/data/company";
import { showPlaceholders, site } from "@/data/site";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta({
  title: "About Us",
  description: "One Solutions Creative For Education is the education division of One Solution Creative, serving universities, colleges, schools and students.",
  path: "/about",
});

const different = [
  { icon: "code", title: "Technology", text: "Websites, ERP and LMS for campuses." },
  { icon: "palette", title: "Creative", text: "Graphics, video and social media." },
  { icon: "graduation", title: "Admissions", text: "Campaigns, CRM and counselling." },
  { icon: "shield", title: "Accreditation", text: "NAAC and NIRF data support." },
];

function Venn() {
  return (
    <svg className="venn" viewBox="0 0 420 380" role="img" aria-label="Technology, admissions and reputation overlap">
      <g fill="var(--brand)" fillOpacity=".1" stroke="var(--brand)" strokeOpacity=".55">
        <circle cx="210" cy="130" r="108" />
        <circle cx="140" cy="244" r="108" />
        <circle cx="280" cy="244" r="108" />
      </g>
      <circle cx="210" cy="208" r="40" fill="var(--brand)" />
      <text x="210" y="80" textAnchor="middle">Technology</text>
      <text x="96" y="286" textAnchor="middle">Admissions</text>
      <text x="324" y="286" textAnchor="middle">Reputation</text>
      <text x="210" y="205" textAnchor="middle" className="v-center">One</text>
      <text x="210" y="220" textAnchor="middle" className="v-center">Campus</text>
    </svg>
  );
}

export default function AboutPage() {
  const overview = [
    ["Company name", site.legalName || site.name],
    ["Established", site.yearEstablished],
    ["Head office", site.address],
    ["Email", site.email],
    ["Phone", site.phone],
    ["Registration", site.registration],
  ].filter(([, v]) => v) as [string, string][];
  const missing = !site.yearEstablished || !site.address || !site.email || !site.phone;

  return (
    <>
      <PageHero
        crumbs={[{ label: "About Us" }]}
        eyebrow="About us"
        title={<>Built for Campuses.<br /><span className="grad">Focused on Students.</span></>}
        text="The education division of One Solution Creative — bringing technology, creative work, admissions and accreditation support together for institutions."
        scene={5}
      />

      <section className="section">
        <div className="container split">
          <div data-reveal>
            <p className="eyebrow">Our story</p>
            <h2>Why we brought it all together</h2>
            <div className="stack" style={{ marginTop: 20, color: "var(--text-2)" }}>
              <p>An institution often manages one vendor for its website, another for ERP, a third for admission advertising and someone else for accreditation paperwork — and its own staff spend the year making them fit.</p>
              <p>One Solutions Creative For Education was created to bring that work under one roof, with a team that understands academic calendars, regulators and the students at the centre of it all.</p>
            </div>
          </div>
          <div data-reveal><Venn /></div>
        </div>
      </section>

      <section className="section alt">
        <div className="container grid grid-2">
          <div className="mv" data-reveal>
            <span className="icon-chip lg"><Icon name="target" size={24} /></span>
            <p className="eyebrow">Mission</p>
            <blockquote>To help educational institutions run better, communicate clearly and reach the right students — and to guide students towards the right course.</blockquote>
          </div>
          <div className="mv dark" data-reveal>
            <span className="icon-chip lg"><Icon name="compass" size={24} /></span>
            <p className="eyebrow">Vision</p>
            <blockquote>To be the most trusted education partner for campuses that want stronger systems, stronger reputations and stronger admissions.</blockquote>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <SectionHeading eyebrow="Our values" title="What we hold ourselves to" />
          <div className="grid grid-4">
            {values.map((v) => (
              <div className="value" key={v.title} data-reveal>
                <span className="icon-chip"><Icon name={v.icon} /></span>{v.title}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section alt">
        <div className="container">
          <SectionHeading eyebrow="What makes us different" title="Four disciplines. One coordinated model." text="One brief, one plan and one point of contact — so nothing is lost between teams." />
          <div className="grid grid-4">
            {different.map((d) => (
              <div className="feature" key={d.title} data-reveal>
                <span className="icon-chip"><Icon name={d.icon} /></span>
                <h3>{d.title}</h3>
                <p>{d.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <SectionHeading eyebrow="Our approach" title="From understanding to improvement" />
          <Steps items={approach} />
        </div>
      </section>

      {(overview.length >= 3 || showPlaceholders) && (
      <section className="section alt">
        <div className="container">
          <SectionHeading eyebrow="Company overview" title="At a glance" action={<Link href="/leadership" className="link-arrow">Meet our leadership <Icon name="arrow" size={16} /></Link>} />
          <dl className="overview">
            {overview.map(([k, v]) => <div key={k}><dt>{k}</dt><dd>{v}</dd></div>)}
          </dl>
          {missing && <DevNote>Add verified company details (year established, address, email, phone, registration, social links) in <code>src/data/site.ts</code>. Empty fields stay hidden.</DevNote>}
        </div>
      </section>
      )}

      <CTASection title="Have a challenge worth solving?" text="Tell us what you are working on. We will listen first." label="Let's Talk" />
    </>
  );
}
