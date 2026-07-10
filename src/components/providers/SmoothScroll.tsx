"use client";

import { useEffect } from "react";
import Lenis from "lenis";

/**
 * Buttery momentum scrolling (the "feel" behind Zoox / Zipline).
 * Lenis drives the native scroll position, so framer-motion's useScroll,
 * hash-anchor jumps, and IntersectionObserver reveals all keep working.
 */
export function SmoothScroll({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    const lenis = new Lenis({
      // lerp mode feels more natural/continuous than a fixed duration and is
      // lighter per frame. ~0.1 is a good balance of smooth + responsive.
      lerp: 0.1,
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 1.6,
      syncTouch: false,
    });

    // Route in-page anchor clicks through Lenis for a smooth glide.
    const onAnchorClick = (e: MouseEvent) => {
      const target = (e.target as HTMLElement).closest("a[href^='#']");
      if (!target) return;
      const id = target.getAttribute("href");
      if (!id || id === "#") return;
      const el = document.querySelector(id);
      if (el) {
        e.preventDefault();
        lenis.scrollTo(el as HTMLElement, { offset: -80, duration: 1.4 });
      }
    };
    document.addEventListener("click", onAnchorClick);

    let rafId = 0;
    const raf = (time: number) => {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    };
    rafId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(rafId);
      document.removeEventListener("click", onAnchorClick);
      lenis.destroy();
    };
  }, []);

  return <>{children}</>;
}
