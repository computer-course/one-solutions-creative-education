import { CTASection, PageHero } from "@/components/Basics";
import { IndustryCard } from "@/components/Cards";
import { Icon } from "@/components/Icon";
import { industries } from "@/data/industries";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta({
  title: "Institutions",
  description: "Digital, creative and admission solutions for universities, colleges, schools, medical and technical institutes, coaching and skill centres.",
  path: "/institutions",
});

export default function IndustriesPage() {
  return (
    <>
      <PageHero crumbs={[{ label: "Institutions" }]} eyebrow="Who we serve" title="Every kind of campus. One standard of work." text="We adapt our services to each institution — its students, its regulators and its academic calendar.">
        <div className="chips">
          {industries.map((i) => <a key={i.slug} href={`#${i.slug}`} className="chip"><Icon name={i.icon} size={14} />&nbsp;{i.name}</a>)}
        </div>
      </PageHero>
      <section className="section">
        <div className="container grid grid-2">
          {industries.map((i) => <div key={i.slug} data-reveal><IndustryCard industry={i} detailed /></div>)}
        </div>
      </section>
      <CTASection title="Is your institution different?" text="Our process starts with understanding your campus, whatever its size." label="Tell Us About It" />
    </>
  );
}
