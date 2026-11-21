"use client";
import { Moon, Sun } from "lucide-react";

/** Theme is stored on <html data-theme>. The no-flash script in layout.tsx sets it before paint. */
export function ThemeToggle() {
  const toggle = () => {
    const root = document.documentElement;
    const next = root.dataset.theme === "dark" ? "light" : "dark";
    root.dataset.theme = next;
    try {
      localStorage.setItem("osc-theme", next);
    } catch {}
  };
  return (
    <button type="button" className="theme-toggle" onClick={toggle} aria-label="Switch between light and dark theme" title="Toggle theme">
      <Sun size={18} strokeWidth={1.75} className="icon-sun" aria-hidden="true" />
      <Moon size={18} strokeWidth={1.75} className="icon-moon" aria-hidden="true" />
    </button>
  );
}
