"use client";
import Link from "next/link";
import { useMemo, useState } from "react";
import type { Person } from "@/data/people";
import type { Department } from "@/data/teams";
import { TeamMemberCard } from "./Cards";
import { Icon } from "./Icon";

export function TeamFilter({ options, value, onChange, label }: { options: { value: string; label: string; count?: number }[]; value: string; onChange: (v: string) => void; label: string }) {
  return (
    <div className="filter" role="group" aria-label={label}>
      {options.map((o) => (
        <button key={o.value} type="button" className="filter-btn" aria-pressed={value === o.value} onClick={() => onChange(o.value)}>
          {o.label}
          {o.count !== undefined && <span className="count">{o.count}</span>}
        </button>
      ))}
    </div>
  );
}

export function TeamDirectory({ people, departments }: { people: Person[]; departments: Department[] }) {
  const [dept, setDept] = useState("all");
  const [q, setQ] = useState("");

  const filtered = useMemo(() => {
    const term = q.trim().toLowerCase();
    return people.filter(
      (p) =>
        (dept === "all" || p.department === dept) &&
        (!term || [p.name, p.title, ...(p.focus ?? [])].join(" ").toLowerCase().includes(term)),
    );
  }, [people, dept, q]);

  const options = [
    { value: "all", label: "All teams", count: people.length },
    ...departments.map((d) => ({ value: d.slug, label: d.short, count: people.filter((p) => p.department === d.slug).length })),
  ];
  const groups = departments.filter((d) => filtered.some((p) => p.department === d.slug));

  return (
    <div>
      <div className="directory-bar">
        <TeamFilter options={options} value={dept} onChange={setDept} label="Filter by department" />
        <label className="search-field">
          <span className="sr-only">Search team members</span>
          <Icon name="search" size={18} />
          <input type="search" placeholder="Search by name or role" value={q} onChange={(e) => setQ(e.target.value)} />
        </label>
      </div>
      <p className="sr-only" aria-live="polite">{filtered.length} team members shown</p>
      {groups.length === 0 && (
        <div className="empty">
          <Icon name="users" size={28} />
          <p>No team members match your search.</p>
        </div>
      )}
      {groups.map((d) => (
        <section key={d.slug} className="team-group" aria-labelledby={`dept-${d.slug}`}>
          <header>
            <span className="icon-chip"><Icon name={d.icon} /></span>
            <div>
              <h2 id={`dept-${d.slug}`}><Link href={`/teams/${d.slug}`}>{d.name}</Link></h2>
              <p>{d.description}</p>
            </div>
          </header>
          <div className="grid member-grid">
            {filtered.filter((p) => p.department === d.slug).map((p) => <TeamMemberCard key={p.id} person={p} />)}
          </div>
        </section>
      ))}
    </div>
  );
}
