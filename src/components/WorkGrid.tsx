"use client";
import { useRef, useState } from "react";
import { workCategories, type Project } from "@/data/projects";
import { Icon } from "./Icon";
import { Mockup } from "./Mockup";
import { TeamFilter } from "./TeamDirectory";

export function ProjectCard({ project, onOpen }: { project: Project; onOpen?: (p: Project) => void }) {
  const inner = (
    <>
      <div className="project-visual">
        <Mockup kind={project.visual} label={`${project.title} preview`} />
        {project.concept && <span className="badge">Concept</span>}
      </div>
      <div className="card-body">
        <p className="eyebrow">{project.industry}</p>
        <h3>{project.title}</h3>
        <p>{project.objective}</p>
      </div>
    </>
  );
  return onOpen ? (
    <button type="button" className="card project-card" onClick={() => onOpen(project)} aria-haspopup="dialog">{inner}</button>
  ) : (
    <article className="card project-card">{inner}</article>
  );
}

export function WorkGrid({ projects }: { projects: Project[] }) {
  const [cat, setCat] = useState("all");
  const [active, setActive] = useState<Project | null>(null);
  const dialog = useRef<HTMLDialogElement>(null);
  const shown = projects.filter((p) => cat === "all" || p.categories.includes(cat as never));
  const open = (p: Project) => {
    setActive(p);
    dialog.current?.showModal();
  };

  return (
    <>
      <TeamFilter
        label="Filter projects by category"
        value={cat}
        onChange={setCat}
        options={[{ value: "all", label: "All work" }, ...workCategories.map((c) => ({ value: c, label: c }))]}
      />
      {shown.length === 0 ? (
        <div className="empty"><Icon name="layers" size={28} /><p>No projects in this category yet.</p></div>
      ) : (
        <div className="grid grid-3 work-grid">{shown.map((p) => <ProjectCard key={p.slug} project={p} onOpen={open} />)}</div>
      )}
      <dialog ref={dialog} className="case-dialog" aria-labelledby="case-title" onClick={(e) => e.target === dialog.current && dialog.current?.close()}>
        {active && (
          <div className="case">
            <button type="button" className="icon-btn case-close" onClick={() => dialog.current?.close()} aria-label="Close case study"><Icon name="x" /></button>
            <div className="project-visual">
              <Mockup kind={active.visual} label={`${active.title} preview`} />
              {active.concept && <span className="badge">Concept project — not client work</span>}
            </div>
            <div className="case-body">
              <p className="eyebrow">{active.client ? `${active.client} · ` : ""}{active.industry}</p>
              <h2 id="case-title">{active.title}</h2>
              <dl>
                <div><dt>Objective</dt><dd>{active.objective}</dd></div>
                <div><dt>Challenge</dt><dd>{active.challenge}</dd></div>
                <div><dt>Approach</dt><dd>{active.approach}</dd></div>
                {active.results && active.results.length > 0 && (
                  <div><dt>Verified results</dt><dd>{active.results.join(" · ")}</dd></div>
                )}
              </dl>
              <div className="chips">{active.deliverables.map((d) => <span key={d} className="chip">{d}</span>)}</div>
            </div>
          </div>
        )}
      </dialog>
    </>
  );
}
