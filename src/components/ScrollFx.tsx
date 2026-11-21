"use client";
import { useEffect } from "react";

const clamp = (n: number) => Math.min(1, Math.max(0, n));

/**
 * Scroll-driven 3D effects for the homepage. One passive scroll listener writes
 * CSS variables; all visuals are defined in CSS (.fx-on rules).
 *   [data-fx]        → --v  (0 entering … 1 settled)
 *   .stack-card      → --c  (0 … 1 as the next card slides over it)
 *   .hscroll         → --x  (horizontal travel in px)
 *   [data-progress]  → --v  (0 … 1 across the section)
 * Disabled for reduced-motion users: everything stays in its final state.
 */
export function ScrollFx() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const root = document.documentElement;
    root.classList.add("fx-on");
    const fx = Array.from(document.querySelectorAll<HTMLElement>("[data-fx]"));
    const cards = Array.from(document.querySelectorAll<HTMLElement>(".stack-card"));
    const hs = Array.from(document.querySelectorAll<HTMLElement>(".hscroll"));
    const prog = Array.from(document.querySelectorAll<HTMLElement>("[data-progress]"));
    let overflow: number[] = [];

    const measure = () => {
      const wide = window.innerWidth > 860;
      overflow = hs.map((h) => {
        const track = h.querySelector<HTMLElement>(".hscroll-track");
        const o = wide && track ? Math.max(0, track.scrollWidth - track.clientWidth) : 0;
        h.style.height = o ? `calc(100vh + ${o}px)` : "";
        h.toggleAttribute("data-pinned", o > 0);
        return o;
      });
      update();
    };

    const update = () => {
      const vh = window.innerHeight;
      for (const el of fx) {
        const r = el.getBoundingClientRect();
        if (r.top > vh * 1.2 || r.bottom < -vh * 0.2) continue;
        const d = Number(el.dataset.fxDelay || 0);
        el.style.setProperty("--v", clamp((vh * 0.96 - r.top - d * 50) / (vh * 0.42)).toFixed(3));
      }
      cards.forEach((el, i) => {
        const next = cards[i + 1];
        if (!next || next.parentElement !== el.parentElement) return el.style.setProperty("--c", "0");
        const a = el.getBoundingClientRect(), b = next.getBoundingClientRect();
        el.style.setProperty("--c", clamp(1 - (b.top - a.top) / a.height).toFixed(3));
      });
      hs.forEach((h, i) => {
        const o = overflow[i] ?? 0;
        h.style.setProperty("--x", o ? `${(-clamp(-h.getBoundingClientRect().top / o) * o).toFixed(1)}px` : "0px");
      });
      for (const el of prog) {
        const r = el.getBoundingClientRect();
        el.style.setProperty("--v", clamp((vh * 0.75 - r.top) / (r.height + vh * 0.1)).toFixed(3));
      }
    };

    let ticking = false;
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        ticking = false;
        update();
      });
    };
    measure();
    const t = window.setTimeout(measure, 400); // after fonts settle
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", measure);
    // re-measure when content height changes (images, fonts)
    const ro = new ResizeObserver(() => onScroll());
    ro.observe(document.body);
    return () => {
      ro.disconnect();
      clearTimeout(t);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", measure);
      root.classList.remove("fx-on");
      hs.forEach((h) => (h.style.height = ""));
    };
  }, []);
  return null;
}
