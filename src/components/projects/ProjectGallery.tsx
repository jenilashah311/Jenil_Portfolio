"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import type { Project } from "@/types";
import { ProjectCard } from "./ProjectCard";

// useLayoutEffect warns during SSR; fall back to useEffect on the server.
const useIsoLayoutEffect = typeof window !== "undefined" ? useLayoutEffect : useEffect;

/**
 * Cinematic project showcase.
 * - Desktop: a tall section that pins a viewport and scrubs a horizontal
 *   track sideways as you scroll (the Zipline / Zoox "sideways reveal").
 * - Mobile: a plain vertical stack (pinned horizontal scroll feels bad on touch).
 */
export function ProjectGallery({ projects }: { projects: Project[] }) {
  const trackRef = useRef<HTMLDivElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: trackRef });

  // Measure how far the horizontal track actually overflows the viewport so the
  // scroll ends exactly when the last card is revealed — no hardcoded overshoot.
  const [distance, setDistance] = useState(0);

  useIsoLayoutEffect(() => {
    const measure = () => {
      const el = innerRef.current;
      if (!el) return;
      // scrollWidth is the full content width; subtract the visible viewport.
      setDistance(Math.max(0, el.scrollWidth - window.innerWidth));
    };
    measure();
    const ro = new ResizeObserver(measure);
    if (innerRef.current) ro.observe(innerRef.current);
    window.addEventListener("resize", measure);
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", measure);
    };
  }, [projects.length]);

  // Translate from 0 to the exact overflow distance (in px).
  const x = useTransform(scrollYProgress, [0.05, 0.95], [0, -distance]);
  const progressWidth = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <>
      {/* ---------- Desktop: horizontal pinned scroll ---------- */}
      <div ref={trackRef} className="relative hidden md:block h-[360vh]">
        <div className="sticky top-0 flex h-screen items-center overflow-hidden">
          <motion.div ref={innerRef} style={{ x }} className="flex gap-8 pl-[8vw] pr-[8vw]">
            {projects.map((project, i) => (
              <div key={project.id} className="w-[400px] shrink-0">
                <ProjectCard project={project} index={i} />
              </div>
            ))}
            {/* Tail card */}
            <div className="w-[360px] shrink-0 flex flex-col justify-center pl-6">
              <span className="font-cyber text-2xl font-bold text-white/80">
                {projects.length} FLAGSHIP
                <br />
                SYSTEMS
              </span>
              <p className="mt-3 font-mono text-xs text-gray-500 max-w-[240px]">
                Each shipped as a containerized, observable, production-grade service.
              </p>
            </div>
          </motion.div>

          {/* Horizontal scroll progress */}
          <div className="pointer-events-none absolute bottom-16 left-[8vw] right-[8vw] h-px bg-white/10">
            <motion.div className="h-full bg-[#00f5d4]" style={{ width: progressWidth }} />
          </div>
          <div className="pointer-events-none absolute bottom-20 left-[8vw] font-mono text-[10px] tracking-[0.3em] text-gray-500">
            DRAG // SCROLL →
          </div>
        </div>
      </div>

      {/* ---------- Mobile: vertical stack ---------- */}
      <div className="md:hidden max-w-5xl mx-auto px-6 mt-10 grid gap-6">
        {projects.map((project, i) => (
          <ProjectCard key={project.id} project={project} index={i} />
        ))}
      </div>
    </>
  );
}
