import Link from "next/link";
import { companyNav, site } from "@/data/site";
import { services } from "@/data/services";
import { Icon, LinkedInIcon } from "./Icon";
import { LogoMark, LogoText } from "./Logo";

export function SiteFooter() {
  const socials = Object.entries(site.social).filter(([, url]) => url);
  return (
    <footer className="site-footer">
      <div className="container footer-grid">
        <div className="footer-brand">
          <div className="logo">
            <LogoMark />
            <LogoText />
          </div>
          <p>{site.tagline}</p>
          <p className="muted">{site.secondaryTagline}</p>
          <p className="muted">An education division of {site.parent.url ? <a href={site.parent.url}>{site.parent.name}</a> : site.parent.name}.</p>
          {socials.length > 0 && (
            <div className="socials">
              {socials.map(([key, url]) => (
                <a key={key} href={url} target="_blank" rel="noopener noreferrer" aria-label={key}>
                  {key === "linkedin" ? <LinkedInIcon /> : <Icon name="arrow-up" size={18} />}
                </a>
              ))}
            </div>
          )}
        </div>
        <nav aria-label="Services">
          <h2>Services</h2>
          <ul>
            {services.slice(0, 7).map((s) => (
              <li key={s.slug}><Link href={`/services/${s.slug}`}>{s.short}</Link></li>
            ))}
            <li><Link href="/services">All services</Link></li>
          </ul>
        </nav>
        <nav aria-label="Company">
          <h2>Company</h2>
          <ul>
            {companyNav.map((c) => (
              <li key={c.href}><Link href={c.href}>{c.label}</Link></li>
            ))}
            <li><Link href="/courses">Courses</Link></li>
            <li><Link href="/institutions">Institutions</Link></li>
            <li><Link href="/work">Our Work</Link></li>
          </ul>
        </nav>
        <div>
          <h2>Get in touch</h2>
          <ul>
            {site.email && <li><a href={`mailto:${site.email}`}>{site.email}</a></li>}
            {site.phone && <li><a href={`tel:${site.phone.replace(/\s/g, "")}`}>{site.phone}</a></li>}
            {site.address && <li className="muted">{site.address}</li>}
            <li><Link href="/contact" className="link-arrow">Start a project <Icon name="arrow" size={16} /></Link></li>
          </ul>
        </div>
      </div>
      <div className="container footer-bottom">
        <p>© {new Date().getFullYear()} {site.legalName || site.name}. All rights reserved.</p>
        <ul>
          <li><Link href="/privacy-policy">Privacy Policy</Link></li>
          <li><Link href="/terms">Terms</Link></li>
        </ul>
      </div>
    </footer>
  );
}
