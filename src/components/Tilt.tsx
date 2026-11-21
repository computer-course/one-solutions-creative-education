"use client";
import { useEffect } from "react";

/** Adds a pointer-driven 3D tilt to any element marked data-tilt. One delegated listener for the whole site. */
export function Tilt() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches || window.matchMedia("(hover: none)").matches) return;
    let current: HTMLElement | null = null;
    const clear = (el: HTMLElement) => {
      el.removeAttribute("data-tilting");
      el.style.removeProperty("--tx");
      el.style.removeProperty("--ty");
    };
    const onMove = (e: PointerEvent) => {
      const el = (e.target as Element | null)?.closest?.<HTMLElement>("[data-tilt]") ?? null;
      if (current && current !== el) clear(current);
      current = el;
      if (!el) return;
      const r = el.getBoundingClientRect();
      el.setAttribute("data-tilting", "");
      el.style.setProperty("--tx", (((e.clientX - r.left) / r.width) * 2 - 1).toFixed(3));
      el.style.setProperty("--ty", (((e.clientY - r.top) / r.height) * 2 - 1).toFixed(3));
    };
    const onLeave = () => {
      if (current) clear(current);
      current = null;
    };
    document.addEventListener("pointermove", onMove, { passive: true });
    document.documentElement.addEventListener("pointerleave", onLeave);
    return () => {
      document.removeEventListener("pointermove", onMove);
      document.documentElement.removeEventListener("pointerleave", onLeave);
    };
  }, []);
  return null;
}
