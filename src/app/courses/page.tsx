import Link from "next/link";
import { CTASection, PageHero, SectionHeading, Steps } from "@/components/Basics";
import { CourseDirectory } from "@/components/CourseDirectory";
import { Icon } from "@/components/Icon";
import { guidanceSteps } from "@/data/company";
import { allCourses, courseGroups } from "@/data/courses";
import { absoluteUrl, site } from "@/data/site";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta({
  title: "Courses",
  description: "Browse courses by group — medical, nursing and paramedical, pharmacy, non-medical science, engineering, computer, management, arts, teaching, law and vocational — with typical duration and eligibility.",
  path: "/courses",
});

export default function CoursesPage() {
  const ld = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Courses",
    url: absoluteUrl("/courses"),
    itemListElement: allCourses().map((c, i) => ({ "@type": "ListItem", position: i + 1, item: { "@type": "Course", name: c.name, description: `${c.full}. Typical duration: ${c.duration}.`, provider: { "@type": "Organization", name: site.name } } })),
  };
  return (
    <>
      <PageHero
        scene={0}
        crumbs={[{ label: "Courses" }]}
        eyebrow="Course guidance"
        title={<>Find the course<br />that fits <span className="grad">your future.</span></>}
        text={`${allCourses().length} courses across ${courseGroups.length} groups. Explore, compare, then talk to a counsellor.`}
      >
        <Link href="/contact" className="btn btn-primary btn-lg">Talk to a Counsellor <Icon name="arrow" size={18} /></Link>
        <a href="#catalogue" className="btn btn-secondary btn-lg">Browse Courses</a>
      </PageHero>

      <section className="section" id="catalogue" style={{ paddingTop: 24 }}>
        <div className="container">
          <CourseDirectory groups={courseGroups} />
          <div className="notice" style={{ marginTop: 48 }}>
            <Icon name="shield" />
            <p>
              Durations and eligibility shown are <strong>typical</strong> and vary by university, state and regulator. Availability, fees and seats depend on each institution.
              Admission to regulated courses is only through the prescribed entrance examinations and counselling. We provide guidance — <strong>we do not guarantee admission</strong>.
            </p>
          </div>
        </div>
      </section>

      <section className="section alt">
        <div className="container">
          <SectionHeading eyebrow="How guidance works" title="From first question to application" />
          <Steps items={guidanceSteps} />
        </div>
      </section>

      <CTASection title="Not sure which course suits you?" text="Share your stream and interests. A counsellor will guide you." label="Get Guidance" />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(ld) }} />
    </>
  );
}
