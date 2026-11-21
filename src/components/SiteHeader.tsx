"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { companyNav, mainNav } from "@/data/site";
import { Icon } from "./Icon";
import { Logo } from "./Logo";
import { NavigationMenu } from "./NavigationMenu";
import { ScrollProgress } from "./ScrollProgress";
import { ThemeToggle } from "./ThemeToggle";

export function SiteHeader() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  useEffect(() => setMobileOpen(false), [pathname]);
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setMobileOpen(false);
    document.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      document.removeEventListener("keydown", onKey);
    };
  }, [mobileOpen]);

  return (
    <header className="site-header" data-scrolled={scrolled || undefined}>
      <a href="#main" className="skip-link">Skip to content</a>
      <div className="container header-inner">
        <Logo />
        <NavigationMenu />
        <div className="header-actions">
          <ThemeToggle />
          <Link href="/contact" className="btn btn-primary btn-sm header-cta">Enquire Now</Link>
          <button
            type="button"
            className="menu-btn"
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileOpen}
            aria-controls="mobile-nav"
            onClick={() => setMobileOpen((o) => !o)}
          >
            <Icon name={mobileOpen ? "x" : "menu"} size={22} />
          </button>
        </div>
      </div>
      <ScrollProgress />
      <div id="mobile-nav" className="mobile-nav" hidden={!mobileOpen}>
        <nav aria-label="Mobile" className="container">
          <ul>
            {mainNav.map((i) => (
              <li key={i.href}><Link href={i.href}>{i.label}</Link></li>
            ))}
          </ul>
          <p className="eyebrow">Company</p>
          <ul>
            {companyNav.map((i) => (
              <li key={i.href}><Link href={i.href}>{i.label}</Link></li>
            ))}
            <li><Link href="/contact">Contact</Link></li>
          </ul>
          <Link href="/contact" className="btn btn-primary">Enquire Now</Link>
        </nav>
      </div>
    </header>
  );
}
