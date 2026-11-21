import { notFound } from "next/navigation";
import { CTASection, DevNote, PageHero } from "@/components/Basics";
import { Icon } from "@/components/Icon";
import { articles, insightTopics } from "@/data/insights";
import { site } from "@/data/site";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta({
  title: "Insights",
  description: "Ideas and practical guidance on admissions, campus technology and accreditation from One Solutions Creative For Education.",
  path: "/insights",
});

export default function InsightsPage() {
  if (!site.features.insights) notFound();
  return (
    <>
      <PageHero crumbs={[{ label: "Company" }, { label: "Insights" }]} eyebrow="Insights" title="Practical thinking for campuses and students." text="Short, useful reads from the people doing the work." />
      <section className="section">
        <div className="container">
          {articles.length > 0 ? (
            <div className="grid grid-3">
              {articles.map((a) => (
                <article className="feature" key={a.slug}>
                  <p className="eyebrow">{a.category}</p>
                  <h3>{a.title}</h3>
                  <p>{a.excerpt}</p>
                  <p className="muted" style={{ marginTop: 16, fontSize: "0.8125rem" }}>
                    <time dateTime={a.date}>{new Date(a.date).toLocaleDateString("en-IN", { dateStyle: "medium" })}</time>{a.author ? ` · ${a.author}` : ""}
                  </p>
                </article>
              ))}
            </div>
          ) : (
            <>
              <div className="grid grid-4" style={{ marginBottom: 32 }}>
                {insightTopics.map((t) => (
                  <div className="value" key={t.title}><span className="icon-chip"><Icon name={t.icon} /></span>{t.title}</div>
                ))}
              </div>
              <div className="empty">
                <span className="icon-chip lg"><Icon name="book" size={24} /></span>
                <h3>Articles are on the way</h3>
                <p>We are preparing our first pieces on the topics above.</p>
              </div>
            </>
          )}
          <DevNote>Publish articles by adding them to <code>src/data/insights.ts</code>.</DevNote>
        </div>
      </section>
      <CTASection />
    </>
  );
}
