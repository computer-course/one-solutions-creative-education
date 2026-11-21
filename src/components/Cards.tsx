import Link from "next/link";
import type { Industry } from "@/data/industries";
import type { Person } from "@/data/people";
import type { Service } from "@/data/services";
import { getService } from "@/data/services";
import { getDepartment } from "@/data/teams";
import { leadershipLevels } from "@/data/people";
import { Icon, LinkedInIcon } from "./Icon";
import { Mockup } from "./Mockup";
import { Portrait } from "./Portrait";

export function ServiceCard({ service, title }: { service: Service; title?: string }) {
  return (
    <Link href={`/services/${service.slug}`} className="card service-card">
      <Mockup kind={service.visual} label={`${service.name} illustration`} />
      <div className="card-body">
        <span className="icon-chip"><Icon name={service.icon} /></span>
        <h3>{title ?? service.name}</h3>
        <p>{service.summary}</p>
        <span className="link-arrow">Learn more <Icon name="arrow" size={16} /></span>
      </div>
    </Link>
  );
}

export function IndustryCard({ industry, detailed }: { industry: Industry; detailed?: boolean }) {
  if (!detailed) {
    return (
      <Link href={`/institutions#${industry.slug}`} className="card industry-card" data-tilt>
        <span className="icon-chip lg"><Icon name={industry.icon} size={24} /></span>
        <h3>{industry.name}</h3>
        <p>{industry.intro}</p>
      </Link>
    );
  }
  return (
    <article id={industry.slug} className="card industry-detail">
      <header>
        <span className="icon-chip lg"><Icon name={industry.icon} size={24} /></span>
        <div>
          <h3>{industry.name}</h3>
          <p>{industry.intro}</p>
        </div>
      </header>
      <div className="industry-cols">
        <div>
          <h4>Typical challenges</h4>
          <ul className="dot-list">{industry.challenges.map((c) => <li key={c}>{c}</li>)}</ul>
        </div>
        <div>
          <h4>How we help</h4>
          <ul className="check-list">{industry.solutions.map((c) => <li key={c}><Icon name="check" size={16} />{c}</li>)}</ul>
        </div>
      </div>
      <footer>
        <div className="chips">
          {industry.services.map((slug) => {
            const s = getService(slug);
            return s ? <Link key={slug} href={`/services/${slug}`} className="chip">{s.short}</Link> : null;
          })}
        </div>
        <Link href="/contact" className="link-arrow">Discuss your campus <Icon name="arrow" size={16} /></Link>
      </footer>
    </article>
  );
}

function PersonLinks({ person }: { person: Person }) {
  if (!person.linkedin) return null;
  return (
    <a className="icon-btn" href={person.linkedin} target="_blank" rel="noopener noreferrer" aria-label={`${person.name} on LinkedIn`}>
      <LinkedInIcon />
    </a>
  );
}

export function LeadershipProfile({ person, featured, wide }: { person: Person; featured?: boolean; wide?: boolean }) {
  const level = leadershipLevels.find((l) => l.level === person.leadership);
  const dept = person.department ? getDepartment(person.department) : undefined;
  const Name = featured ? "h2" : "h3";
  return (
    <article className={`leader${featured ? " leader-featured" : " card"}${wide ? " leader-wide" : ""}`}>
      <Portrait person={person} sizes={featured ? "(max-width: 800px) 100vw, 420px" : undefined} priority={featured} />
      <div className="leader-body">
        <p className="eyebrow">{person.title}{dept ? ` · ${dept.short}` : ""}</p>
        <Name className="leader-name">{person.name}</Name>
        {person.showAffiliation && person.affiliation && <p className="muted">{person.affiliation}</p>}
        <p className="leader-summary">{person.bio || level?.summary}</p>
        {person.focus && person.focus.length > 0 && (
          <div className="chips">{person.focus.map((f) => <span key={f} className="chip">{f}</span>)}</div>
        )}
        {person.background && (
          <details className="bio-more">
            <summary>Professional background <Icon name="plus" size={16} /></summary>
            <p>{person.background}</p>
          </details>
        )}
        <PersonLinks person={person} />
      </div>
    </article>
  );
}

export function TeamMemberCard({ person }: { person: Person }) {
  const dept = person.department ? getDepartment(person.department) : undefined;
  return (
    <article className="card member-card">
      <Portrait person={person} sizes="(max-width: 600px) 50vw, 280px" />
      <div className="card-body">
        <h3>{person.name}</h3>
        <p className="member-title">{person.title}</p>
        {dept && <p className="member-dept"><Icon name={dept.icon} size={14} />{dept.short}</p>}
        {person.bio && <p>{person.bio}</p>}
        {person.focus && person.focus.length > 0 && (
          <div className="chips">{person.focus.map((f) => <span key={f} className="chip">{f}</span>)}</div>
        )}
        <PersonLinks person={person} />
      </div>
    </article>
  );
}
