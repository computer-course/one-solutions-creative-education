import Link from "next/link";
import type { ReactNode } from "react";
import { absoluteUrl, showEditorNotes, site } from "@/data/site";
import { HomeScene } from "./HomeScene";
import { Icon } from "./Icon";

export function SectionHeading({ eyebrow, title, text, center, action }: { eyebrow?: string; title: string; text?: string; center?: boolean; action?: ReactNode }) {
  return (
    <div className={`section-heading${center ? " center" : ""}`}>
      <div>
        {eyebrow && <p className="eyebrow">{eyebrow}</p>}
        <h2>{title}</h2>
        {text && <p className="lead">{text}</p>}
      </div>
      {action}
    </div>
  );
}

export interface Crumb { label: string; href?: string }

export function Breadcrumbs({ items }: { items: Crumb[] }) {
  const all = [{ label: "Home", href: "/" }, ...items];
  const ld = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: all.map((c, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: c.label,
      ...(c.href ? { item: absoluteUrl(c.href) } : {}),
    })),
  };
  return (
    <nav aria-label="Breadcrumb" className="breadcrumbs">
      <ol>
        {all.map((c, i) => (
          <li key={c.label}>
            {c.href && i < all.length - 1 ? <Link href={c.href}>{c.label}</Link> : <span aria-current="page">{c.label}</span>}
          </li>
        ))}
      </ol>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(ld) }} />
    </nav>
  );
}

export function PageHero({ eyebrow, title, text, crumbs, children, visual, scene }: { eyebrow?: string; title: ReactNode; text?: string; crumbs: Crumb[]; children?: ReactNode; visual?: ReactNode; /** 3D formation index shown behind the hero (see lib/homeScene.ts) */ scene?: number }) {
  return (
    <section className={`page-hero${visual ? " has-visual" : ""}${scene !== undefined ? " page-hero--3d" : ""}`} data-scene={scene}>
      {scene !== undefined && <HomeScene fade />}
      <div className="container page-hero-inner">
        <div>
          <Breadcrumbs items={crumbs} />
          {eyebrow && <p className="eyebrow">{eyebrow}</p>}
          <h1>{title}</h1>
          {text && <p className="lead">{text}</p>}
          {children && <div className="btn-row">{children}</div>}
        </div>
        {visual && <div className="page-hero-visual">{visual}</div>}
      </div>
    </section>
  );
}

export function CTASection({ title = "Let's Build Something That Matters.", text = "Tell us about your institution or the course you are looking for.", label = "Start a Conversation", href = "/contact" }: { title?: string; text?: string; label?: string; href?: string }) {
  return (
    <section className="section">
      <div className="container">
        <div className="cta">
          <svg className="cta-art" viewBox="0 0 400 300" aria-hidden="true" preserveAspectRatio="xMaxYMid slice">
            <g fill="none" stroke="currentColor">
              <circle cx="300" cy="150" r="60" /><circle cx="300" cy="150" r="110" /><circle cx="300" cy="150" r="160" /><circle cx="300" cy="150" r="210" />
            </g>
          </svg>
          <div>
            <h2>{title}</h2>
            <p>{text}</p>
          </div>
          <Link href={href} className="btn btn-primary btn-lg">{label} <Icon name="arrow" size={18} /></Link>
        </div>
      </div>
    </section>
  );
}

/** Editor note — hidden unless NEXT_PUBLIC_SHOW_EDITOR_NOTES=true. */
export function DevNote({ children }: { children: ReactNode }) {
  if (!showEditorNotes) return null;
  return (
    <aside className="dev-note" role="note">
      <strong>Editor note (not shown on the live site)</strong>
      <span>{children}</span>
    </aside>
  );
}

export function Faq({ items }: { items: { q: string; a: string }[] }) {
  return (
    <div className="faq">
      {items.map((f) => (
        <details key={f.q}>
          <summary>{f.q}<Icon name="plus" size={18} /></summary>
          <p>{f.a}</p>
        </details>
      ))}
    </div>
  );
}

export function Steps({ items }: { items: { step: string; icon: string; text: string }[] }) {
  return (
    <ol className="steps" style={{ ["--n" as string]: items.length }}>
      {items.map((s, i) => (
        <li key={s.step}>
          <span className="step-dot"><Icon name={s.icon} size={20} /></span>
          <span className="step-num">{String(i + 1).padStart(2, "0")}</span>
          <h3>{s.step}</h3>
          <p>{s.text}</p>
        </li>
      ))}
    </ol>
  );
}
