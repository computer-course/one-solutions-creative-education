"use client";
import { useEffect } from "react";

/** Adds a gentle fade-up to elements marked with data-reveal. Content stays visible without JS. */
export function RevealObserver() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches || !("IntersectionObserver" in window)) return;
    const els = Array.from(document.querySelectorAll<HTMLElement>("[data-reveal]:not(.reveal-in)"));
    const vh = window.innerHeight;
    const io = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("reveal-in");
            io.unobserve(e.target);
          }
        }),
      { rootMargin: "0px 0px -8% 0px" },
    );
    els.forEach((el) => {
      if (el.getBoundingClientRect().top > vh * 0.9) {
        el.classList.add("reveal-pending");
        io.observe(el);
      }
    });
    return () => io.disconnect();
  });
  return null;
}
