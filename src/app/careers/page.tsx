import Link from "next/link";
import { notFound } from "next/navigation";
import { CTASection, DevNote, PageHero, SectionHeading } from "@/components/Basics";
import { Icon } from "@/components/Icon";
import { cultureValues, vacancies } from "@/data/careers";
import { site } from "@/data/site";
import { enabledDepartments } from "@/data/teams";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta({
  title: "Careers",
  description: "Build your career at One Solutions Creative For Education across technology, design, marketing and admissions.",
  path: "/careers",
});

export default function CareersPage() {
  if (!site.features.careers) notFound();
  const applyHref = site.recruitmentEmail ? `mailto:${site.recruitmentEmail}?subject=Application` : "/contact";
  return (
    <>
      <PageHero crumbs={[{ label: "Company" }, { label: "Careers" }]} eyebrow="Careers" title="Do work you are proud of, with people who care." text="We bring developers, designers, marketers and coordinators together around one standard of quality." />
      <section className="section">
        <div className="container">
          <SectionHeading eyebrow="Culture" title="How it feels to work here" />
          <div className="grid grid-4">
            {cultureValues.map((c) => (
              <div className="feature" key={c.title} data-reveal>
                <span className="icon-chip"><Icon name={c.icon} /></span>
                <h3>{c.title}</h3>
                <p>{c.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      <section className="section alt">
        <div className="container">
          <SectionHeading eyebrow="Areas of work" title="Where you could contribute" />
          <div className="grid grid-3">
            {enabledDepartments().map((d) => (
              <div className="cap" key={d.slug}>
                <span className="icon-chip"><Icon name={d.icon} /></span>
                <div><strong>{d.short}</strong><small>{d.focus.slice(0, 3).join(" · ")}</small></div>
              </div>
            ))}
          </div>
        </div>
      </section>
      <section className="section" id="openings">
        <div className="container">
          <SectionHeading eyebrow="Openings" title="Current vacancies" />
          {vacancies.length > 0 ? (
            <div className="grid grid-2">
              {vacancies.map((v) => (
                <article className="feature" key={v.title}>
                  <p className="eyebrow">{v.department}</p>
                  <h3>{v.title}</h3>
                  <p>{v.summary}</p>
                  <div className="chips" style={{ margin: "16px 0" }}><span className="chip">{v.type}</span><span className="chip">{v.location}</span></div>
                  <Link href={applyHref} className="link-arrow">Apply <Icon name="arrow" size={16} /></Link>
                </article>
              ))}
            </div>
          ) : (
            <div className="empty">
              <span className="icon-chip lg"><Icon name="briefcase" size={24} /></span>
              <h3>No open positions right now</h3>
              {site.features.acceptOpenApplications ? (
                <>
                  <p>We are always glad to hear from capable people. Share your profile and the kind of role you are looking for.</p>
                  <Link href={applyHref} className="btn btn-secondary">Express your interest <Icon name="arrow" size={18} /></Link>
                </>
              ) : (
                <p>Please check back later.</p>
              )}
            </div>
          )}
          <DevNote>Add real vacancies in <code>src/data/careers.ts</code> and a recruitment email in <code>src/data/site.ts</code>. Without a recruitment email, applicants are sent to the contact form.</DevNote>
        </div>
      </section>
      <CTASection title="Prefer to work with us as a client?" label="Start a Conversation" />
    </>
  );
}
