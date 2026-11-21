"use client";
import { useEffect, useRef, useState } from "react";

/** Full-page WebGL backdrop for the homepage. Without WebGL the page keeps a soft gradient backdrop. */
export function HomeScene({ fade }: { fade?: boolean }) {
  const canvas = useRef<HTMLCanvasElement>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    let dispose: (() => void) | undefined;
    let cancelled = false;
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const run = async () => {
      try {
        const { mountHomeScene } = await import("@/lib/homeScene");
        if (cancelled || !canvas.current) return;
        dispose = mountHomeScene(canvas.current, { reducedMotion, fadeOnScroll: fade });
        setReady(true);
      } catch {
        setReady(false);
      }
    };
    const t = window.setTimeout(run, 60);
    return () => {
      cancelled = true;
      clearTimeout(t);
      dispose?.();
    };
  }, [fade]);

  return (
    <div className="home-scene" data-ready={ready || undefined} aria-hidden="true">
      <canvas ref={canvas} />
    </div>
  );
}
