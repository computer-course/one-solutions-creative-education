"use client";
import Link from "next/link";
import { useMemo, useState } from "react";
import { courseLevels, type CourseGroup } from "@/data/courses";
import { Icon } from "./Icon";
import { TeamFilter } from "./TeamDirectory";

export function CourseDirectory({ groups }: { groups: CourseGroup[] }) {
  const [group, setGroup] = useState("all");
  const [level, setLevel] = useState("all");
  const [q, setQ] = useState("");

  const shown = useMemo(() => {
    const term = q.trim().toLowerCase();
    return groups
      .filter((g) => group === "all" || g.slug === group)
      .map((g) => ({
        ...g,
        courses: g.courses.filter(
          (c) => (level === "all" || c.level === level) && (!term || `${c.name} ${c.full} ${c.eligibility}`.toLowerCase().includes(term)),
        ),
      }))
      .filter((g) => g.courses.length > 0);
  }, [groups, group, level, q]);
  const total = shown.reduce((n, g) => n + g.courses.length, 0);

  return (
    <div>
      <div className="course-bar">
        <TeamFilter
          label="Filter courses by group"
          value={group}
          onChange={setGroup}
          options={[{ value: "all", label: "All groups" }, ...groups.map((g) => ({ value: g.slug, label: g.short, count: g.courses.length }))]}
        />
        <div className="row">
          <label className="search-field">
            <span className="sr-only">Search courses</span>
            <Icon name="search" size={18} />
            <input type="search" placeholder="Search a course, e.g. B.Sc Nursing" value={q} onChange={(e) => setQ(e.target.value)} />
          </label>
          <label>
            <span className="sr-only">Level</span>
            <select value={level} onChange={(e) => setLevel(e.target.value)}>
              <option value="all">All levels</option>
              {courseLevels.map((l) => <option key={l}>{l}</option>)}
            </select>
          </label>
        </div>
      </div>
      <p className="sr-only" aria-live="polite">{total} courses shown</p>

      {shown.length === 0 && (
        <div className="empty">
          <Icon name="search" size={28} />
          <h3>No course matches your search</h3>
          <p>Try another name, or ask a counsellor — we may still be able to guide you.</p>
          <Link href="/contact" className="btn btn-secondary">Ask a counsellor</Link>
        </div>
      )}

      {shown.map((g) => (
        <section key={g.slug} id={g.slug} className="course-group" aria-labelledby={`g-${g.slug}`}>
          <header>
            <span className="icon-chip lg"><Icon name={g.icon} size={24} /></span>
            <div>
              <h2 id={`g-${g.slug}`}>{g.name}</h2>
              <p>{g.intro}</p>
            </div>
            <span className="count">{g.courses.length} courses</span>
          </header>
          <div className="course-grid">
            {g.courses.map((c) => (
              <article className="course-card" key={c.name} data-tilt>
                <span className="lvl" data-level={c.level}>{c.level}</span>
                <h3>{c.name}</h3>
                <p className="full">{c.full}</p>
                <dl>
                  <div><dt><Icon name="clock" size={16} /><span className="sr-only">Typical duration</span></dt><dd>{c.duration}</dd></div>
                  <div><dt><Icon name="check" size={16} /><span className="sr-only">Typical eligibility</span></dt><dd>{c.eligibility}</dd></div>
                </dl>
                <Link href={`/contact?course=${encodeURIComponent(c.name)}`} className="link-arrow">Enquire about {c.name} <Icon name="arrow" size={16} /></Link>
              </article>
            ))}
          </div>
        </section>
      ))}
    </div>
  );
}
