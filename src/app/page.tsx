import Link from "next/link";
import { IndustryCard, LeadershipProfile } from "@/components/Cards";
import { HomeScene } from "@/components/HomeScene";
import { Icon } from "@/components/Icon";
import { Mockup } from "@/components/Mockup";
import { ScrollFx } from "@/components/ScrollFx";
import { reasons } from "@/data/company";
import { allCourses, courseGroups } from "@/data/courses";
import { industries } from "@/data/industries";
import { featuredProjects } from "@/data/projects";
import { homeServices, services, workflow } from "@/data/services";
import { leadersAt } from "@/data/teams";

const ticker = ["Websites", "Campus ERP", "LMS", "SEO", "Graphics", "Social Media", "Admissions", "NAAC", "NIRF", "Course Guidance"];

function Heading({ eyebrow, title, text, href, label }: { eyebrow: string; title: React.ReactNode; text?: string; href?: string; label?: string }) {
  return (
    <div className="h-heading" data-fx="title">
      <div>
        <p className="eyebrow">{eyebrow}</p>
        <h2>{title}</h2>
        {text && <p className="lead">{text}</p>}
      </div>
      {href && <Link href={href} className="link-arrow">{label} <Icon name="arrow" size={16} /></Link>}
    </div>
  );
}

export default function HomePage() {
  const leaders = [...leadersAt("founder"), ...leadersAt("patron"), ...leadersAt("co-founder")].slice(0, 4);
  const work = featuredProjects();
  return (
    <div className="home">
      <HomeScene />
      <ScrollFx />

      {/* Hero — graduation cap */}
      <section className="h-hero" data-scene="0">
        <div className="container">
          <div className="h-hero-copy">
            <p className="eyebrow">One Partner for Every Campus Goal</p>
            <h1>Stronger Campuses.<br /><em>Brighter Admissions.</em><br />One Partner.</h1>
            <p className="lead">
              Websites, ERP, SEO, graphics, social media, NAAC &amp; NIRF data support and admissions for universities,
              colleges and schools — plus course guidance for students.
            </p>
            <div className="btn-row">
              <Link href="/contact" className="btn btn-primary btn-lg">Talk to Our Team <Icon name="arrow" size={18} /></Link>
              <Link href="/courses" className="btn btn-secondary btn-lg">Explore Courses</Link>
            </div>
            <ul className="hero-tags" aria-label="Who we serve">
              {["Universities", "Colleges", "Schools", "Students"].map((t) => <li key={t}><Icon name="check" size={16} />{t}</li>)}
            </ul>
          </div>
        </div>
        <a href="#services" className="scroll-cue" aria-label="Scroll to services"><span /></a>
      </section>

      <div className="ticker" role="img" aria-label="Websites, campus ERP, LMS, SEO, graphics, social media, admissions, NAAC, NIRF and course guidance">
        <div className="ticker-track" aria-hidden="true">
          {[...ticker, ...ticker].map((t, i) => <span key={i}>{t}</span>)}
        </div>
      </div>

      {/* Services — open book, stacked cards */}
      <section className="section h-section" id="services" data-scene="1">
        <div className="container">
          <Heading eyebrow="For institutions" title={<>Everything your campus<br />needs to grow.</>} href="/services" label={`All ${services.length} services`} />
          <div className="stack-cards">
            {homeServices.map((s, i) => (
              <article className="stack-card" key={s.slug} style={{ ["--i" as string]: i }}>
                <div className="stack-copy">
                  <span className="stack-num">{String(i + 1).padStart(2, "0")}<i>/ {String(homeServices.length).padStart(2, "0")}</i></span>
                  <h3>{s.homeTitle}</h3>
                  <p>{s.summary}</p>
                  <div className="chips">{s.deliverables.slice(0, 4).map((d) => <span className="chip" key={d}>{d}</span>)}</div>
                  <Link href={`/services/${s.slug}`} className="btn btn-secondary">Explore <Icon name="arrow" size={18} /></Link>
                </div>
                <Mockup kind={s.visual} label={`${s.name} illustration`} />
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Courses — helix, tilt tiles */}
      <section className="section h-section" data-scene="2">
        <div className="container">
          <Heading eyebrow="For students" title={<>{allCourses().length} courses.<br />{courseGroups.length} groups. <span className="grad">One guide.</span></>} href="/courses" label="Browse all courses" />
          <div className="grid grid-3">
            {courseGroups.slice(0, 9).map((g, i) => (
              <div key={g.slug} data-fx="tilt" data-fx-delay={i % 3}>
                <Link href={`/courses#${g.slug}`} className="group-tile" data-tilt>
                  <div className="top"><span className="icon-chip lg"><Icon name={g.icon} size={24} /></span><span className="num">{String(g.courses.length).padStart(2, "0")}</span></div>
                  <h3>{g.name}</h3>
                  <p>{g.intro}</p>
                  <div className="chips">{g.courses.slice(0, 4).map((c) => <span className="chip" key={c.name}>{c.name}</span>)}</div>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Institutions — campus building */}
      <section className="section h-section" data-scene="3">
        <div className="container">
          <Heading eyebrow="Who we serve" title={<>Every kind of campus.</>} href="/institutions" label="All institutions" />
          <div className="grid grid-3">
            {industries.map((ind, i) => (
              <div key={ind.slug} data-fx="tilt" data-fx-delay={i % 3}><IndustryCard industry={ind} /></div>
            ))}
          </div>
        </div>
      </section>

      {/* Work — horizontal gallery */}
      <section className="hscroll" data-scene="3" aria-label="Featured work">
        <div className="hscroll-pin">
          <div className="container">
            <Heading eyebrow="Our work" title="Selected concepts." text="Illustrative concept projects. Institution case studies appear here with permission." href="/work" label="View all work" />
          </div>
          <div className="hscroll-track">
            {work.map((p, i) => (
              <Link href="/work" className="work-slide" key={p.slug}>
                <div className="project-visual">
                  <Mockup kind={p.visual} label={`${p.title} preview`} />
                  {p.concept && <span className="badge">Concept</span>}
                </div>
                <div className="work-meta">
                  <span className="stack-num">{String(i + 1).padStart(2, "0")}</span>
                  <div><p className="eyebrow">{p.industry}</p><h3>{p.title}</h3></div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Why — rising bars */}
      <section className="section h-section" data-scene="4">
        <div className="container">
          <Heading eyebrow="Why institutions choose us" title={<>One team accountable<br />for the whole picture.</>} />
          <div className="grid grid-3 why-grid">
            {reasons.map((r, i) => (
              <div className="feature" key={r.title} data-fx="tilt" data-fx-delay={i % 3} data-tilt>
                <span className="icon-chip"><Icon name={r.icon} /></span>
                <h3>{r.title}</h3>
                <p>{r.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section h-section" data-scene="4">
        <div className="container">
          <Heading eyebrow="How we work" title="Discover. Plan. Build. Improve." />
          <ol className="flow" data-progress>
            {workflow.map((s, i) => (
              <li key={s.step} style={{ ["--n" as string]: i }}>
                <span className="step-dot"><Icon name={s.icon} size={22} /></span>
                <span className="step-num">{String(i + 1).padStart(2, "0")}</span>
                <h3>{s.step}</h3>
                <p>{s.text}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {leaders.length > 0 && (
        <section className="section h-section">
          <div className="container leader-preview" data-count={leaders.length}>
            <div data-fx="title">
              <div>
                <p className="eyebrow">Leadership</p>
                <h2 className="h-title">Guided by people who care about education.</h2>
              </div>
              <div className="btn-row">
                <Link href="/leadership" className="btn btn-secondary">Meet Our Leadership <Icon name="arrow" size={18} /></Link>
              </div>
            </div>
            <div className="leader-pair" data-count={leaders.length}>
              {leaders.map((p, i) => <div key={p.id} data-fx="tilt" data-fx-delay={i}><LeadershipProfile person={p} /></div>)}
            </div>
          </div>
        </section>
      )}

      {/* Final call — globe */}
      <section className="h-hero h-final" data-scene="5">
        <div className="container">
          <div className="h-hero-copy" data-fx="title">
            <p className="eyebrow">Start a conversation</p>
            <h2 className="h-display">Let&apos;s Build<br />a Stronger<br /><em>Campus Together.</em></h2>
            <p className="lead">Tell us about your institution, or the course you are looking for.</p>
            <div className="btn-row">
              <Link href="/contact" className="btn btn-primary btn-lg">Start a Conversation <Icon name="arrow" size={18} /></Link>
              <Link href="/courses" className="btn btn-secondary btn-lg">Find a Course</Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
