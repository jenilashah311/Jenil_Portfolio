"use client";

import { useEffect, useState } from "react";
import { motion, useScroll, useSpring } from "framer-motion";
import { profile } from "@/data/profile";
import { experience, education, research } from "@/data/experience";
import { projects } from "@/data/projects";
import { Scene } from "@/components/3d/Scene";
import { StatsHUD } from "@/components/hud/StatsHUD";
import { Terminal } from "@/components/terminal/Terminal";
import { SkillGraph } from "@/components/skills/SkillGraph";
import { ProjectCard } from "@/components/projects/ProjectCard";
import { ResumeModal } from "@/components/resume/ResumeModal";
import { ContactModal } from "@/components/contact/ContactModal";

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
  const [emailCopied, setEmailCopied] = useState(false);

  const handleEmailClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    navigator.clipboard.writeText(profile.email);
    setEmailCopied(true);
    setTimeout(() => setEmailCopied(false), 2500);
  };

  // Scroll Progress Bar at the top of the screen
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + window.innerHeight / 3;
      for (let i = SECTIONS.length - 1; i >= 0; i--) {
        const sec = SECTIONS[i];
        const el = document.getElementById(sec.id);
        if (el) {
          const top = el.offsetTop;
          if (scrollPosition >= top) {
            setActiveSection(sec.id);
            break;
          }
        }
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="relative min-h-screen font-sans selection:bg-black/10 selection:text-black noise-overlay">
      {/* 3D Scroll-Driven Backdrop */}
      <Scene />

      {/* Futuristic Scroll Progress Line */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-0.5 bg-black z-50 origin-left"
        style={{ scaleX }}
      />

      {/* Cyber Grid Lines Overlay */}
      <div className="fixed inset-0 pointer-events-none cyber-grid -z-20 opacity-30" />
      <div className="fixed inset-0 pointer-events-none cyber-grid-coarse -z-20 opacity-20" />

      {/* Floating HUD Header */}
      <header className="fixed top-0 left-0 right-0 z-40 border-b border-black/5 bg-white/40 backdrop-blur-md px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="h-2 w-2 rounded-full bg-emerald-600 animate-pulse" />
            <a href="#" className="font-cyber font-bold tracking-widest text-sm text-black">
              {profile.name.toUpperCase()} // SYS.ARCH
            </a>
          </div>
          <nav className="hidden md:flex items-center gap-8">
            {SECTIONS.map((sec) => (
              <a
                key={sec.id}
                href={`#${sec.id}`}
                className={`font-mono text-xs tracking-wider transition-colors duration-300 ${
                  activeSection === sec.id
                    ? "text-black border-b border-black pb-0.5 font-bold"
                    : "text-gray-500 hover:text-black"
                }`}
              >
                [{sec.num}] {sec.label}
              </a>
            ))}
          </nav>
          <div className="flex gap-3">
            <button
              onClick={() => setResumeOpen(true)}
              className="px-3 py-1.5 rounded border border-black/10 bg-black/5 font-mono text-[10px] text-black transition hover:bg-black/10"
            >
              SYS.RESUME
            </button>
            <button
              onClick={() => setTerminalOpen(true)}
              className="px-3 py-1.5 rounded border border-black/10 bg-black/5 font-mono text-[10px] text-black transition hover:bg-black/10"
            >
              SYS.TERM
            </button>
          </div>
        </div>
      </header>

      {/* Side HUD navigation - active marker */}
      <aside className="fixed left-8 top-1/2 -translate-y-1/2 hidden xl:flex flex-col gap-6 z-40">
        <div className="h-32 w-px bg-black/10 mx-auto mb-2" />
        {SECTIONS.map((sec) => {
          const isActive = activeSection === sec.id;
          return (
            <a
              key={sec.id}
              href={`#${sec.id}`}
              className="group flex items-center gap-4 text-left focus:outline-none"
            >
              <span className={`font-mono text-[10px] tracking-tighter ${isActive ? "text-black font-bold" : "text-gray-600"}`}>
                {sec.num}
              </span>
              <div className="flex flex-col">
                <span
                  className={`font-cyber text-[10px] tracking-widest transition-all duration-300 ${
                    isActive ? "text-black translate-x-1 font-bold" : "text-gray-500 group-hover:text-black"
                  }`}
                >
                  {sec.label}
                </span>
                <span className={`h-0.5 bg-black transition-all duration-300 ${isActive ? "w-8" : "w-0 group-hover:w-4"}`} />
              </div>
            </a>
          );
        })}
        <div className="h-32 w-px bg-black/10 mx-auto mt-2" />
      </aside>

      {/* Main content sections container */}
      <main className="max-w-5xl mx-auto px-6 pt-28 pb-20 relative z-30">
        
        {/* SECTION 1: SYSTEM OVERVIEW (HERO) */}
        <section id="hero" className="min-h-[85vh] flex flex-col justify-center py-12 scroll-mt-28">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
            
            {/* Left side: Bio and Stats */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="md:col-span-7 lg:col-span-7 space-y-6"
            >
              <div className="inline-block px-3 py-1 rounded-full border border-black/10 bg-black/5">
                <span className="font-mono text-xs text-black tracking-widest">
                  // SYSTEM_BOOT: OK (LATENCY 200ms)
                </span>
              </div>
              
              <h1 className="font-cyber text-5xl lg:text-7xl font-extrabold tracking-wider text-black leading-none">
                {profile.name.toUpperCase()}
              </h1>
              
              <h2 className="font-cyber text-xl tracking-widest text-black/80 font-medium">
                {profile.title.toUpperCase()}
              </h2>

              <p className="text-gray-700 leading-relaxed text-sm md:text-base max-w-2xl">
                Machine Learning Engineer and Full-Stack Developer specializing in RAG architectures, 
                orchestrating multi-agent LLM systems, streaming ML feature stores, and containerized deployments. 
                Focused on delivering optimized performance, exactly-once processing pipelines, and high-concurrency cloud systems.
              </p>

              {/* Quick stats grid */}
              <div className="py-2">
                <StatsHUD />
              </div>

              <div className="flex flex-wrap gap-4 pt-2">
                <button
                  onClick={() => setTerminalOpen(true)}
                  className="px-6 py-3 rounded-lg bg-[#f4f1ea] hover:bg-[#e3dac9] text-black font-cyber font-bold tracking-widest text-xs transition duration-300 hover:shadow-[0_4px_12px_rgba(0,0,0,0.08)]"
                >
                  INITIALIZE CONSOLE
                </button>
                <a
                  href={profile.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-6 py-3 rounded-lg border border-black/10 bg-black/5 font-cyber tracking-widest text-xs text-black transition duration-300 hover:bg-black/10 hover:border-black/20"
                >
                  GITHUB_ARCHIVES
                </a>
              </div>
            </motion.div>

            {/* Right side: Portrait Photo (Frameless, transparent backdrop, large size, aligned right-middle, shifted up and right) */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="md:col-span-5 lg:col-span-5 flex justify-center md:justify-end"
            >
              <div className="relative group w-80 h-80 md:w-full md:max-w-[400px] lg:max-w-[460px] aspect-[1529/1486] flex items-center justify-center select-none pointer-events-none transform md:-translate-y-12 md:translate-x-20">
                {/* The Profile Image with soft drop shadow */}
                <img 
                  src="/profile.png" 
                  alt={profile.name}
                  className="w-full h-full object-contain filter drop-shadow-[0_8px_24px_rgba(0,0,0,0.06)] transition-transform duration-500 group-hover:scale-[1.03]"
                />
              </div>
            </motion.div>

          </div>
        </section>

        {/* SECTION 2: INTERACTIVE CONSOLE */}
        <section id="console" className="min-h-[60vh] flex flex-col justify-center py-20 scroll-mt-28">
          <div className="border border-black/5 bg-white/40 rounded-2xl p-6 md:p-8 backdrop-blur-xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-96 h-96 bg-black/5 rounded-full blur-[100px] pointer-events-none" />
            
            <div className="space-y-4">
              <span className="font-mono text-xs text-gray-500 tracking-widest uppercase">// 02. INTERACTIVE_TERMINAL</span>
              <h3 className="font-cyber text-2xl font-bold text-black tracking-wide">
                EXECUTE QUERIES ON THE FLY
              </h3>
              <p className="text-gray-700 text-sm max-w-xl">
                Deploy automated scripts or view system diagnostics. Click the button below to initialize the terminal utility and run live commands like <code className="text-black font-mono">whoami</code>, <code className="text-black font-mono">projects</code>, or <code className="text-black font-mono">skills</code>.
              </p>
              
              <div className="pt-6">
                <button
                  onClick={() => setTerminalOpen(true)}
                  className="px-6 py-3 rounded-lg border border-black/20 bg-black/5 font-cyber font-bold tracking-widest text-xs text-black transition hover:bg-black/10"
                >
                  LOAD_TERMINAL_INTERFACE
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 3: EXPERIENCE CHRONOLOGY */}
        <section id="timeline" className="py-20 scroll-mt-28">
          <span className="font-mono text-xs text-gray-500 tracking-widest uppercase">// 03. CHRONOLOGY</span>
          <h3 className="font-cyber text-3xl font-bold text-black tracking-wide mt-2 mb-12">
            PROFESSIONAL TIMELINE
          </h3>

          <div className="relative border-l border-black/10 pl-6 md:pl-8 space-y-12">
            <div className="absolute top-0 bottom-0 left-0 w-px bg-gradient-to-b from-black via-black/20 to-transparent" />
            
            {experience.map((job, i) => (
              <div
                key={i}
                className="relative"
              >
                {/* Glowing Dot on timeline */}
                <div className="absolute -left-[31px] md:-left-[39px] top-1.5 h-4 w-4 rounded-full border-2 border-black bg-black" />

                <div className="glass-panel rounded-xl p-5 md:p-6 transition-all duration-300 hover:border-[var(--neon-cyan)]/25">
                  <div className="flex flex-wrap items-baseline justify-between gap-2 mb-2">
                    <h4 className="font-cyber text-lg font-bold text-black tracking-wide">{job.role}</h4>
                    <span className="font-mono text-xs text-black bg-black/5 px-2 py-0.5 rounded border border-black/10">
                      {job.period}
                    </span>
                  </div>
                  <h5 className="font-cyber text-xs tracking-widest text-gray-600 font-bold mb-4 uppercase">
                    {job.company} · {job.location}
                  </h5>
                  <p className="text-gray-700 text-xs md:text-sm mb-4 leading-relaxed">
                    {job.description}
                  </p>
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
            ))}

            {/* Academic history */}
            <div className="pt-8">
              <h4 className="font-cyber text-md font-bold tracking-widest text-black mb-6 uppercase">// ACADEMIC_CREDENTIALS</h4>
              <div className="grid gap-6 sm:grid-cols-2">
                {education.map((ed, i) => (
                  <div key={i} className="glass-panel rounded-xl p-5 border border-black/5 bg-white/20">
                    <h5 className="font-cyber text-sm font-bold text-black">{ed.school}</h5>
                    <p className="text-xs text-gray-600 mt-1">{ed.degree}</p>
                    <div className="flex items-center justify-between mt-4 font-mono text-[10px] text-gray-500">
                      <span>GPA {ed.gpa}</span>
                      <span>{ed.period}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Research */}
            <div className="pt-6">
              <h4 className="font-cyber text-md font-bold tracking-widest text-black mb-4 uppercase">// RESEARCH_PAPERS</h4>
              <div className="glass-panel rounded-xl p-5 border border-black/5 bg-white/20">
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
            </div>
          </div>
        </section>

        {/* SECTION 4: PROJECTS SHOWCASE */}
        <section id="projects" className="py-20 scroll-mt-28">
          <span className="font-mono text-xs text-gray-500 tracking-widest uppercase">// 04. FLAGSHIPS</span>
          <h3 className="font-cyber text-3xl font-bold text-black tracking-wide mt-2 mb-12">
            PRODUCTION ARCHITECTURES
          </h3>

          <div className="grid gap-6 sm:grid-cols-2">
            {projects.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>
        </section>

        {/* SECTION 5: CORE CAPABILITIES */}
        <section id="skills" className="py-20 scroll-mt-28">
          <span className="font-mono text-xs text-gray-500 tracking-widest uppercase">// 05. CORE</span>
          <h3 className="font-cyber text-3xl font-bold text-black tracking-wide mt-2 mb-12">
            SYSTEM CAPABILITIES
          </h3>

          <div className="glass-panel rounded-2xl p-6 md:p-8">
            <SkillGraph />
          </div>
        </section>

        {/* SECTION 6: CONTACT */}
        <section id="contact" className="py-20 scroll-mt-28">
          <span className="font-mono text-xs text-gray-500 tracking-widest uppercase">// 06. CONTACT</span>
          <h3 className="font-cyber text-3xl font-bold text-black tracking-wide mt-2 mb-12">
            INITIALIZE BRIDGE CONDUIT
          </h3>

          <div className="glass-panel rounded-2xl p-6 md:p-8 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-96 h-96 bg-black/5 rounded-full blur-[100px] pointer-events-none" />
            
            <div className="grid gap-8 md:grid-cols-2 items-center">
              <div className="space-y-6">
                <p className="text-gray-700 text-sm leading-relaxed">
                  Connect directly through encrypted channels. 
                  I am responsive for technical opportunities, systems consulting, or architectural discussions.
                </p>
                
                <div className="space-y-3 font-mono text-xs text-gray-600">
                  <p className="flex items-center gap-3">
                    <span className="text-black font-semibold">EMAIL:</span>
                    <a href={`mailto:${profile.email}`} className="text-black hover:text-black transition">
                      {profile.email}
                    </a>
                  </p>
                  <p className="flex items-center gap-3">
                    <span className="text-black font-semibold">COMMS:</span>
                    <a href={`tel:${profile.phone}`} className="text-black hover:text-black transition">
                      {profile.phone}
                    </a>
                  </p>
                  <p className="flex items-center gap-3">
                    <span className="text-black font-semibold">LOCUS:</span>
                    <span className="text-black">{profile.location}, CA, USA</span>
                  </p>
                </div>
              </div>

              <div className="flex flex-col gap-4">
                <button
                  onClick={() => setContactOpen(true)}
                  className="w-full py-3 text-center rounded-lg bg-[#f4f1ea] hover:bg-[#e3dac9] text-black font-cyber font-bold tracking-widest text-xs transition duration-300 hover:shadow-[0_0_15px_rgba(244,241,234,0.12)] cursor-pointer"
                >
                  SEND DIRECT EMAIL
                </button>
                <div className="flex gap-4">
                  <a
                    href={profile.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 py-3 text-center rounded-lg border border-black/10 bg-black/5 text-black font-mono text-xs hover:bg-black/10 transition"
                  >
                    LINKEDIN
                  </a>
                  <a
                    href={profile.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 py-3 text-center rounded-lg border border-black/10 bg-black/5 text-black font-mono text-xs hover:bg-black/10 transition"
                  >
                    GITHUB
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Floating System Console Terminal modal */}
      <Terminal 
        isOpen={terminalOpen} 
        onClose={() => setTerminalOpen(false)} 
        onOpenResume={() => setResumeOpen(true)} 
      />

      {/* Floating Resume Modal */}
      <ResumeModal isOpen={resumeOpen} onClose={() => setResumeOpen(false)} />

      {/* Floating Contact Modal */}
      <ContactModal isOpen={contactOpen} onClose={() => setContactOpen(false)} />

      <footer className="border-t border-black/5 py-8 text-center font-mono text-xs text-gray-500 relative z-30">
        <p>© {new Date().getFullYear()} {profile.name.toUpperCase()} — SYS.INTELLIGENCE_NODE</p>
      </footer>
    </div>
  );
}
