"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { companyNav, mainNav } from "@/data/site";
import { Icon } from "./Icon";

const companyPaths = companyNav.map((c) => c.href);

export function NavigationMenu() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLLIElement>(null);
  const isActive = (href: string) => (href === "/" ? pathname === "/" : pathname.startsWith(href));
  const companyActive = companyPaths.some((p) => pathname.startsWith(p));

  useEffect(() => setOpen(false), [pathname]);
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        ref.current?.querySelector("button")?.focus();
      }
    };
    const onClick = (e: MouseEvent) => {
      if (!ref.current?.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    document.addEventListener("mousedown", onClick);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("mousedown", onClick);
    };
  }, [open]);

  return (
    <nav aria-label="Main" className="nav-desktop">
      <ul>
        {mainNav.map((item) => (
          <li key={item.href}>
            <Link href={item.href} className="nav-link" aria-current={isActive(item.href) ? "page" : undefined}>
              {item.label}
            </Link>
          </li>
        ))}
        <li
          ref={ref}
          className="nav-dropdown"
          onBlur={(e) => {
            if (!e.currentTarget.contains(e.relatedTarget as Node)) setOpen(false);
          }}
        >
          <button
            type="button"
            className="nav-link"
            data-active={companyActive || undefined}
            aria-expanded={open}
            aria-controls="company-menu"
            onClick={() => setOpen((o) => !o)}
          >
            Company <Icon name="chevron" size={16} className="chev" />
          </button>
          <div id="company-menu" className="mega" data-open={open || undefined}>
            <ul>
              {companyNav.map((c) => (
                <li key={c.href}>
                  <Link href={c.href} className="mega-item" tabIndex={open ? 0 : -1}>
                    <span className="icon-chip">
                      <Icon name={c.icon} size={18} />
                    </span>
                    <span>
                      <strong>{c.label}</strong>
                      <small>{c.desc}</small>
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </li>
        <li>
          <Link href="/contact" className="nav-link" aria-current={isActive("/contact") ? "page" : undefined}>
            Contact
          </Link>
        </li>
      </ul>
    </nav>
  );
}
