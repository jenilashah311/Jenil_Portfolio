"use client";

import { useEffect, useRef, useState } from "react";
import {
  motion,
  useScroll,
  useSpring,
  useMotionValueEvent,
  AnimatePresence,
} from "framer-motion";
import { profile } from "@/data/profile";
import { experience, education, research } from "@/data/experience";
import { projects } from "@/data/projects";
import { StatsHUD } from "@/components/hud/StatsHUD";
import { Terminal } from "@/components/terminal/Terminal";
import { SkillGraph } from "@/components/skills/SkillGraph";
import { ProjectGallery } from "@/components/projects/ProjectGallery";
import { ResumeModal } from "@/components/resume/ResumeModal";
import { ContactModal } from "@/components/contact/ContactModal";
import { ThemeBackdrop } from "@/components/background/ThemeBackdrop";
import { Reveal } from "@/components/ui/Reveal";
import { SplitText } from "@/components/ui/SplitText";
import { MagneticButton } from "@/components/ui/MagneticButton";

const SECTIONS = [
  { id: "hero", label: "SYSTEM", num: "01" },
  { id: "console", label: "CONSOLE", num: "02" },
  { id: "timeline", label: "CHRONOLOGY", num: "03" },
  { id: "projects", label: "FLAGSHIPS", num: "04" },
  { id: "skills", label: "CORE", num: "05" },
  { id: "contact", label: "CONTACT", num: "06" },
];

export default function Home() {
  const [activeSection, setActiveSection] = useState("hero");
  const [terminalOpen, setTerminalOpen] = useState(false);
  const [resumeOpen, setResumeOpen] = useState(false);
  const [contactOpen, setContactOpen] = useState(false);
  const [isDark, setIsDark] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  // Whole-page scroll progress → top progress bar
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });

  // Light → dark transition, anchored to the transition band scrolling in.
  const transitionRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress: bandProgress } = useScroll({
    target: transitionRef,
    offset: ["start end", "center center"],
  });
  const darkness = useSpring(bandProgress, { stiffness: 120, damping: 30 });
  useMotionValueEvent(darkness, "change", (v) => setIsDark(v > 0.5));

  // Scroll-scrubbed timeline spine
  const timelineRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress: timelineProgress } = useScroll({
    target: timelineRef,
    offset: ["start center", "end center"],
  });
  const spineScale = useSpring(timelineProgress, { stiffness: 90, damping: 30 });

  // Scroll-spy via IntersectionObserver — no per-frame layout reads, so it
  // doesn't fight Lenis's smoothing (the previous getBoundingClientRect-on-
  // every-scroll approach caused reflow jank).
  useEffect(() => {
    const els = SECTIONS.map((s) => document.getElementById(s.id)).filter(
      (el): el is HTMLElement => Boolean(el)
    );
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveSection(entry.target.id);
        });
      },
      // Active when a section crosses a thin band ~42% down the viewport.
      { rootMargin: "-42% 0px -55% 0px", threshold: 0 }
    );
    els.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <div className="relative min-h-screen font-sans">
      {/* Scroll-driven light → dark world */}
      <ThemeBackdrop darkness={darkness} />

      {/* Progress line */}
      <motion.div
        className={`fixed top-0 left-0 right-0 h-0.5 z-[60] origin-left transition-colors duration-700 ${
          isDark ? "bg-[#00f5d4]" : "bg-black"
        }`}
        style={{ scaleX }}
      />

      {/* Floating HUD Header */}
      <header
        className={`fixed top-0 left-0 right-0 z-40 border-b px-6 py-4 backdrop-blur-md transition-colors duration-700 ${
          isDark ? "border-white/10 bg-black/30" : "border-black/5 bg-white/40"
        }`}
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3 shrink-0">
            <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse shrink-0" />
            <a
              href="#hero"
              className={`font-cyber font-bold tracking-widest text-sm whitespace-nowrap transition-colors duration-700 ${
                isDark ? "text-white" : "text-black"
              }`}
            >
              {profile.name.toUpperCase()}
            </a>
          </div>
          {/* Full text nav only where it actually fits (≥ xl) */}
          <nav className="hidden xl:flex items-center gap-5 2xl:gap-7">
            {SECTIONS.map((sec) => (
              <a
                key={sec.id}
                href={`#${sec.id}`}
                className={`font-mono text-xs tracking-wider whitespace-nowrap transition-colors duration-300 ${
                  activeSection === sec.id
                    ? isDark
                      ? "text-[#00f5d4] font-bold"
                      : "text-black border-b border-black pb-0.5 font-bold"
                    : isDark
                      ? "text-gray-400 hover:text-white"
                      : "text-gray-500 hover:text-black"
                }`}
              >
                [{sec.num}] {sec.label}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-3 shrink-0">
            {/* Action buttons — hidden on the smallest screens (available in the menu) */}
            <button
              onClick={() => setResumeOpen(true)}
              className={`hidden sm:inline-block px-3 py-1.5 rounded border font-mono text-[10px] transition duration-700 ${
                isDark
                  ? "border-white/15 bg-white/5 text-white hover:bg-white/10"
                  : "border-black/10 bg-black/5 text-black hover:bg-black/10"
              }`}
            >
              SYS.RESUME
            </button>
            <button
              onClick={() => setTerminalOpen(true)}
              className={`hidden sm:inline-block px-3 py-1.5 rounded border font-mono text-[10px] transition duration-700 ${
                isDark
                  ? "border-[#00f5d4]/30 bg-[#00f5d4]/10 text-[#00f5d4] hover:bg-[#00f5d4]/20"
                  : "border-black/10 bg-black/5 text-black hover:bg-black/10"
              }`}
            >
              SYS.TERM
            </button>

            {/* Hamburger — shown below xl (tablet, phone, high zoom) */}
            <button
              onClick={() => setMenuOpen(true)}
              aria-label="Open navigation menu"
              className={`xl:hidden flex flex-col justify-center gap-[5px] p-2 rounded border transition duration-700 ${
                isDark ? "border-white/15 text-white" : "border-black/10 text-black"
              }`}
            >
              <span className="block h-0.5 w-5 bg-current" />
              <span className="block h-0.5 w-5 bg-current" />
              <span className="block h-0.5 w-5 bg-current" />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile / tablet navigation overlay */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[70] xl:hidden bg-[#05050a]/95 backdrop-blur-xl flex flex-col"
          >
            <div className="flex items-center justify-between px-6 py-4 border-b border-white/10">
              <span className="font-cyber font-bold tracking-widest text-sm text-white">
                {profile.name.toUpperCase()}
              </span>
              <button
                onClick={() => setMenuOpen(false)}
                aria-label="Close menu"
                className="p-2 rounded border border-white/15 text-white"
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <nav className="flex-1 flex flex-col justify-center gap-2 px-8">
              {SECTIONS.map((sec, i) => (
                <motion.a
                  key={sec.id}
                  href={`#${sec.id}`}
                  onClick={() => setMenuOpen(false)}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.05 + i * 0.05 }}
                  className="group flex items-baseline gap-4 py-2 border-b border-white/5"
                >
                  <span className="font-mono text-xs text-[#00f5d4]">{sec.num}</span>
                  <span className="font-cyber text-2xl font-bold text-white group-hover:text-[#00f5d4] transition-colors">
                    {sec.label}
                  </span>
                </motion.a>
              ))}
            </nav>
            <div className="flex gap-3 px-8 pb-10">
              <button
                onClick={() => {
                  setMenuOpen(false);
                  setResumeOpen(true);
                }}
                className="flex-1 py-3 rounded border border-white/15 bg-white/5 text-white font-mono text-xs"
              >
                SYS.RESUME
              </button>
              <button
                onClick={() => {
                  setMenuOpen(false);
                  setTerminalOpen(true);
                }}
                className="flex-1 py-3 rounded border border-[#00f5d4]/30 bg-[#00f5d4]/10 text-[#00f5d4] font-mono text-xs"
              >
                SYS.TERM
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Side HUD navigation */}
      <aside className="fixed left-8 top-1/2 -translate-y-1/2 hidden xl:flex flex-col gap-6 z-40">
        <div className={`h-32 w-px mx-auto mb-2 transition-colors duration-700 ${isDark ? "bg-white/15" : "bg-black/10"}`} />
        {SECTIONS.map((sec) => {
          const active = activeSection === sec.id;
          const accent = isDark ? "text-[#00f5d4]" : "text-black";
          const dim = isDark ? "text-gray-500" : "text-gray-500";
          return (
            <a key={sec.id} href={`#${sec.id}`} className="group flex items-center gap-4 text-left">
              <span className={`font-mono text-[10px] tracking-tighter ${active ? `${accent} font-bold` : dim}`}>
                {sec.num}
              </span>
              <div className="flex flex-col">
                <span
                  className={`font-cyber text-[10px] tracking-widest transition-all duration-300 ${
                    active ? `${accent} translate-x-1 font-bold` : `${dim} group-hover:${isDark ? "text-white" : "text-black"}`
                  }`}
                >
                  {sec.label}
                </span>
                <span
                  className={`h-0.5 transition-all duration-300 ${isDark ? "bg-[#00f5d4]" : "bg-black"} ${active ? "w-8" : "w-0 group-hover:w-4"}`}
                />
              </div>
            </a>
          );
        })}
        <div className={`h-32 w-px mx-auto mt-2 transition-colors duration-700 ${isDark ? "bg-white/15" : "bg-black/10"}`} />
      </aside>

      {/* ============ LIGHT WORLD ============ */}
      <main className="px-6 pt-28 pb-0 relative z-30">
        {/* SECTION 1 — HERO (wider so the portrait centers in the right half).
            xl:pl reserves the fixed side-nav gutter so text never overlaps it. */}
        <section id="hero" className="min-h-[88vh] flex flex-col justify-center py-12 scroll-mt-28 xl:pl-40">
          <div className="max-w-7xl mx-auto w-full grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
            <div className="md:col-span-6 space-y-6">
              <Reveal direction="up" distance={20} animateOnMount>
                <div className="inline-block px-3 py-1 rounded-full border border-black/10 bg-black/5">
                  <span className="font-mono text-xs text-black tracking-widest">
                    {"// SYSTEM_BOOT: OK (LATENCY 200ms)"}
                  </span>
                </div>
              </Reveal>

              <h1 className="font-cyber text-[clamp(2.5rem,8vw,4.75rem)] font-extrabold tracking-wide text-black leading-[1.05] break-words">
                <SplitText text={profile.name.toUpperCase()} delay={0.15} />
              </h1>

              <div className="overflow-hidden">
                <SplitText
                  text={profile.title.toUpperCase()}
                  delay={0.5}
                  stagger={0.015}
                  className="font-cyber text-[clamp(0.95rem,2.6vw,1.35rem)] tracking-widest text-black/80 font-medium"
                />
              </div>

              <Reveal direction="up" delay={0.7} distance={24} animateOnMount>
                <p className="text-gray-700 leading-relaxed text-sm md:text-base max-w-2xl">
                  Machine Learning Engineer and Full-Stack Developer specializing in RAG
                  architectures, orchestrating multi-agent LLM systems, streaming ML feature
                  stores, and containerized deployments. Focused on delivering optimized
                  performance, exactly-once processing pipelines, and high-concurrency cloud systems.
                </p>
              </Reveal>

              <Reveal direction="up" delay={0.85} animateOnMount>
                <div className="py-2">
                  <StatsHUD />
                </div>
              </Reveal>

              <Reveal direction="up" delay={1} animateOnMount>
                <div className="flex flex-wrap gap-4 pt-2">
                  <MagneticButton
                    onClick={() => setTerminalOpen(true)}
                    className="px-6 py-3 rounded-lg bg-black text-white font-cyber font-bold tracking-widest text-xs transition-shadow duration-300 hover:shadow-[0_8px_30px_rgba(0,0,0,0.18)] cursor-pointer"
                  >
                    INITIALIZE CONSOLE
                  </MagneticButton>
                  <MagneticButton
                    href={profile.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-6 py-3 rounded-lg border border-black/15 bg-black/5 font-cyber tracking-widest text-xs text-black transition duration-300 hover:bg-black/10 cursor-pointer"
                  >
                    GITHUB_ARCHIVES
                  </MagneticButton>
                </div>
              </Reveal>
            </div>

            <motion.div
              initial={{ opacity: 0, scale: 0.94 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="md:col-span-6 flex justify-center"
            >
              <motion.div
                animate={{ y: [0, -14, 0] }}
                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                className="relative w-full max-w-[220px] sm:max-w-[280px] md:max-w-[330px] lg:max-w-[360px] xl:max-w-[390px] aspect-[1529/1486] flex items-center justify-center select-none pointer-events-none md:-translate-y-6"
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/profile.png"
                  alt={profile.name}
                  className="w-full h-full object-contain filter drop-shadow-[0_12px_40px_rgba(0,0,0,0.10)]"
                />
              </motion.div>
            </motion.div>
          </div>

          {/* Scroll cue */}
          <Reveal direction="up" delay={1.3} className="mt-16 flex justify-center">
            <div className="flex flex-col items-center gap-2 text-gray-500">
              <span className="font-mono text-[10px] tracking-[0.3em]">SCROLL</span>
              <motion.span
                animate={{ y: [0, 8, 0], opacity: [0.4, 1, 0.4] }}
                transition={{ duration: 1.8, repeat: Infinity }}
                className="h-8 w-px bg-black/30"
              />
            </div>
          </Reveal>
        </section>

        {/* SECTION 2 — CONSOLE */}
        <section id="console" className="max-w-5xl mx-auto w-full min-h-[55vh] flex flex-col justify-center py-20 scroll-mt-28">
          <Reveal direction="up">
            <div className="border border-black/5 bg-white/40 rounded-2xl p-6 md:p-8 backdrop-blur-xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-96 h-96 bg-black/5 rounded-full blur-[100px] pointer-events-none" />
              <div className="space-y-4">
                <span className="font-mono text-xs text-gray-500 tracking-widest uppercase">{"// 02. INTERACTIVE_TERMINAL"}</span>
                <h3 className="font-cyber text-[clamp(1.4rem,5vw,1.9rem)] font-bold text-black tracking-wide break-words">
                  EXECUTE QUERIES ON THE FLY
                </h3>
                <p className="text-gray-700 text-sm max-w-xl">
                  Deploy automated scripts or view system diagnostics. Initialize the terminal
                  utility and run live commands like <code className="text-black font-mono">whoami</code>,{" "}
                  <code className="text-black font-mono">projects</code>, or <code className="text-black font-mono">skills</code>.
                </p>
                <div className="pt-6">
                  <MagneticButton
                    onClick={() => setTerminalOpen(true)}
                    className="inline-block px-6 py-3 rounded-lg border border-black/20 bg-black/5 font-cyber font-bold tracking-widest text-xs text-black transition hover:bg-black/10 cursor-pointer"
                  >
                    LOAD_TERMINAL_INTERFACE
                  </MagneticButton>
                </div>
              </div>
            </div>
          </Reveal>
        </section>

        {/* SECTION 3 — TIMELINE */}
        <section id="timeline" className="max-w-5xl mx-auto w-full py-20 scroll-mt-28" ref={timelineRef}>
          <Reveal mask>
            <span className="font-mono text-xs text-gray-500 tracking-widest uppercase">{"// 03. CHRONOLOGY"}</span>
          </Reveal>
          <Reveal mask>
            <h3 className="font-cyber text-[clamp(1.7rem,6vw,2.5rem)] font-bold text-black tracking-wide break-words mt-2 mb-12">
              PROFESSIONAL TIMELINE
            </h3>
          </Reveal>

          <div className="relative pl-6 md:pl-8 space-y-12">
            {/* Static rail */}
            <div className="absolute top-0 bottom-0 left-0 w-px bg-black/10" />
            {/* Scrubbed spine */}
            <motion.div
              className="absolute top-0 left-0 w-px bg-gradient-to-b from-black via-black/50 to-transparent origin-top"
              style={{ scaleY: spineScale, height: "100%" }}
            />

            {experience.map((job, i) => (
              <Reveal key={i} direction="up" distance={30} amount={0.2}>
                <div className="relative">
                  <div className="absolute -left-[31px] md:-left-[39px] top-1.5 h-4 w-4 rounded-full border-2 border-black bg-white" />
                  <div className="glass-panel rounded-xl p-5 md:p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_12px_40px_rgba(0,0,0,0.06)]">
                    <div className="flex flex-wrap items-baseline justify-between gap-2 mb-2">
                      <h4 className="font-cyber text-lg font-bold text-black tracking-wide">{job.role}</h4>
                      <span className="font-mono text-xs text-black bg-black/5 px-2 py-0.5 rounded border border-black/10">
                        {job.period}
                      </span>
                    </div>
                    <h5 className="font-cyber text-xs tracking-widest text-gray-600 font-bold mb-4 uppercase">
                      {job.company} · {job.location}
                    </h5>
                    <p className="text-gray-700 text-xs md:text-sm mb-4 leading-relaxed">{job.description}</p>
                    <ul className="space-y-2">
                      {job.bullets.map((b, idx) => (
                        <li key={idx} className="flex gap-3 text-xs text-gray-600 leading-relaxed">
                          <span className="text-black">▹</span>
                          <span>{b}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </Reveal>
            ))}

            <Reveal direction="up" className="pt-8">
              <h4 className="font-cyber text-md font-bold tracking-widest text-black mb-6 uppercase">{"// ACADEMIC_CREDENTIALS"}</h4>
              <div className="grid gap-6 sm:grid-cols-2">
                {education.map((ed, i) => (
                  <div key={i} className="glass-panel rounded-xl p-5">
                    <h5 className="font-cyber text-sm font-bold text-black">{ed.school}</h5>
                    <p className="text-xs text-gray-600 mt-1">{ed.degree}</p>
                    <div className="flex items-center justify-between mt-4 font-mono text-[10px] text-gray-500">
                      <span>GPA {ed.gpa}</span>
                      <span>{ed.period}</span>
                    </div>
                  </div>
                ))}
              </div>
            </Reveal>

            <Reveal direction="up" className="pt-6">
              <h4 className="font-cyber text-md font-bold tracking-widest text-black mb-4 uppercase">{"// RESEARCH_PAPERS"}</h4>
              <div className="glass-panel rounded-xl p-5">
                <div className="flex justify-between items-center mb-3">
                  <span className="font-mono text-[10px] text-black bg-black/5 px-2 py-0.5 rounded border border-black/10">
                    {research.publisher} · {research.date}
                  </span>
                  <a
                    href="https://link.springer.com/chapter/10.1007/978-3-032-08977-9_29"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-mono text-[11px] text-black hover:underline flex items-center gap-1 font-bold"
                  >
                    READ_PAPER ↗
                  </a>
                </div>
                <h5 className="font-cyber text-sm font-bold text-black mt-3">{research.title}</h5>
                <p className="text-xs text-gray-600 mt-2 leading-relaxed">{research.description}</p>
              </div>
            </Reveal>
          </div>
        </section>
      </main>

      {/* ============ TRANSITION BAND (light → dark handoff) ============ */}
      <section
        ref={transitionRef}
        className="relative min-h-[50vh] flex flex-col items-center justify-center overflow-hidden z-30 px-6 py-20 text-center"
      >
        {/* A single, centered statement. mix-blend keeps it legible as the
            background crossfades from light to dark. */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="mix-blend-difference text-white"
        >
          <h2 className="font-cyber text-[clamp(1.6rem,5.5vw,3.4rem)] font-extrabold tracking-tight leading-[1.1]">
            BUILDING INTELLIGENT SYSTEMS
          </h2>
          <p className="font-cyber text-[clamp(0.85rem,2.6vw,1.4rem)] font-bold tracking-[0.35em] mt-3">
            · AT SCALE ·
          </p>
        </motion.div>
        <div className="mix-blend-difference text-white mt-8 font-mono text-[11px] tracking-[0.4em] uppercase">
          ↓ Entering the deep-dive
        </div>
      </section>

      {/* ============ DARK WORLD ============ */}
      <div className="relative z-30 text-white">
        {/* SECTION 4 — PROJECTS (horizontal cinematic gallery) */}
        <section id="projects" className="scroll-mt-28">
          <div className="max-w-5xl mx-auto px-6 pt-10">
            <Reveal mask>
              <span className="font-mono text-xs text-[#00f5d4]/80 tracking-widest uppercase">{"// 04. FLAGSHIPS"}</span>
            </Reveal>
            <Reveal mask>
              <h3 className="font-cyber text-[clamp(1.7rem,6vw,3rem)] font-bold tracking-wide break-words mt-2 text-white">
                PRODUCTION ARCHITECTURES
              </h3>
            </Reveal>
          </div>
          <ProjectGallery projects={projects} />
        </section>

        {/* SECTION 5 — SKILLS */}
        <section id="skills" className="py-24 scroll-mt-28">
          <div className="max-w-5xl mx-auto px-6">
            <Reveal mask>
              <span className="font-mono text-xs text-[#00f5d4]/80 tracking-widest uppercase">{"// 05. CORE"}</span>
            </Reveal>
            <Reveal mask>
              <h3 className="font-cyber text-[clamp(1.7rem,6vw,3rem)] font-bold tracking-wide break-words mt-2 mb-12 text-white">
                SYSTEM CAPABILITIES
              </h3>
            </Reveal>
            <Reveal direction="up">
              <div className="rounded-2xl p-6 md:p-8 border border-white/10 bg-white/[0.03] backdrop-blur-xl">
                <SkillGraph />
              </div>
            </Reveal>
          </div>
        </section>

        {/* SECTION 6 — CONTACT */}
        <section id="contact" className="py-24 scroll-mt-28">
          <div className="max-w-5xl mx-auto px-6">
            <Reveal mask>
              <span className="font-mono text-xs text-[#00f5d4]/80 tracking-widest uppercase">{"// 06. CONTACT"}</span>
            </Reveal>
            <Reveal mask>
              <h3 className="font-cyber text-[clamp(1.7rem,6vw,3rem)] font-bold tracking-wide break-words mt-2 mb-12 text-white">
                INITIALIZE BRIDGE CONDUIT
              </h3>
            </Reveal>

            <Reveal direction="up">
              <div className="rounded-2xl p-6 md:p-10 relative overflow-hidden border border-white/10 bg-white/[0.03] backdrop-blur-xl">
                <div className="absolute top-0 right-0 w-96 h-96 bg-[#00f5d4]/10 rounded-full blur-[100px] pointer-events-none" />
                <div className="grid gap-8 md:grid-cols-2 items-center relative">
                  <div className="space-y-6">
                    <p className="text-gray-300 text-sm leading-relaxed">
                      Connect directly through encrypted channels. I am responsive for technical
                      opportunities, systems consulting, or architectural discussions.
                    </p>
                    <div className="space-y-3 font-mono text-xs text-gray-400">
                      <p className="flex items-center gap-3">
                        <span className="text-[#00f5d4] font-semibold">EMAIL:</span>
                        <a href={`mailto:${profile.email}`} className="text-white hover:text-[#00f5d4] transition">
                          {profile.email}
                        </a>
                      </p>
                      <p className="flex items-center gap-3">
                        <span className="text-[#00f5d4] font-semibold">COMMS:</span>
                        <a href={`tel:${profile.phone}`} className="text-white hover:text-[#00f5d4] transition">
                          {profile.phone}
                        </a>
                      </p>
                      <p className="flex items-center gap-3">
                        <span className="text-[#00f5d4] font-semibold">LOCUS:</span>
                        <span className="text-white">{profile.location}, CA, USA</span>
                      </p>
                    </div>
                  </div>

                  <div className="flex flex-col gap-4">
                    <MagneticButton
                      onClick={() => setContactOpen(true)}
                      className="w-full py-3 text-center rounded-lg bg-[#00f5d4] text-black font-cyber font-bold tracking-widest text-xs transition duration-300 hover:shadow-[0_0_30px_rgba(0,245,212,0.35)] cursor-pointer"
                    >
                      SEND DIRECT EMAIL
                    </MagneticButton>
                    <div className="flex gap-4">
                      <a
                        href={profile.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 py-3 text-center rounded-lg border border-white/15 bg-white/5 text-white font-mono text-xs hover:bg-white/10 transition"
                      >
                        LINKEDIN
                      </a>
                      <a
                        href={profile.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 py-3 text-center rounded-lg border border-white/15 bg-white/5 text-white font-mono text-xs hover:bg-white/10 transition"
                      >
                        GITHUB
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </Reveal>
          </div>
        </section>

        <footer className="border-t border-white/10 py-8 text-center font-mono text-xs text-gray-500">
          <p>© {new Date().getFullYear()} {profile.name.toUpperCase()} — SYS.INTELLIGENCE_NODE</p>
        </footer>
      </div>

      {/* Modals */}
      <Terminal isOpen={terminalOpen} onClose={() => setTerminalOpen(false)} onOpenResume={() => setResumeOpen(true)} />
      <ResumeModal isOpen={resumeOpen} onClose={() => setResumeOpen(false)} />
      <ContactModal isOpen={contactOpen} onClose={() => setContactOpen(false)} />
    </div>
  );
}
