"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import type { Project } from "@/types";

interface ProjectCardProps {
  project: Project;
  index?: number;
}

const ARCHITECTURE_FLOWCHARTS: Record<string, string> = {
  "visual-ai-automation": `
 ┌─────────────────┐      ┌─────────────────────┐      ┌──────────────────┐
 │  React Canvas   ├─────►│  WebSocket Gateway  ├─────►│ FastAPI Pipeline │
 └─────────────────┘      └──────────┬──────────┘      └────────┬─────────┘
                                     │                          │
                                     ▼                          ▼
                          ┌─────────────────────┐      ┌──────────────────┐
                          │  Redis Task Queue   │◄─────┤ PostgreSQL State │
                          └─────────────────────┘      └──────────────────┘
  `,
  "distributed-job-queue": `
 ┌─────────────────┐      ┌─────────────────────┐      ┌──────────────────┐
 │ FastAPI Gateway ├─────►│ Redis Queue (Atomic)├─────►│ Go Worker Fleet  │
 └─────────────────┘      └──────────┬──────────┘      └────────┬─────────┘
                                     │                          │
                                     ▼                          ▼
                          ┌─────────────────────┐      ┌──────────────────┐
                          │ Locust Load Tests   │      │ PostgreSQL State │
                          └─────────────────────┘      └──────────────────┘
  `,
  "autonomous-prediction-platform": `
 ┌─────────────────┐      ┌─────────────────────┐      ┌──────────────────┐
 │  Kafka Events   ├─────►│  Stream Processor   ├─────►│ Redis online store│
 └─────────────────┘      └──────────┬──────────┘      └────────┬─────────┘
                                     │                          │
                                     ▼                          ▼
                          ┌─────────────────────┐      ┌──────────────────┐
                          │ PostgreSQL (offline)├─────►│ FastAPI Inference│
                          └──────────┬──────────┘      └────────┬─────────┘
                                     ▼                          ▼
                          ┌─────────────────────┐      ┌──────────────────┐
                          │ Evidently AI Drift  │      │ Prometheus/Graf  │
                          └─────────────────────┘      └──────────────────┘
  `,
  "querypilot-ai-platform": `
 ┌─────────────────┐      ┌─────────────────────┐      ┌──────────────────┐
 │    React SPA    ├─────►│ FastAPI Tenant Gate ├─────►│ pgvector Cache   │
 └─────────────────┘      └──────────┬──────────┘      └────────┬─────────┘
                                     │                          │
                                     ▼                          ▼
                          ┌─────────────────────┐      ┌──────────────────┐
                          │ OpenAI text-to-SQL  │      │ Stripe Payments  │
                          └─────────────────────┘      └──────────────────┘
  `,
  "multi-agent-platform": `
 ┌─────────────────┐      ┌─────────────────────┐      ┌──────────────────┐
 │   User Prompt   ├─────►│  Master Coordinator ├─────►│   Agent Swarm    │
 └─────────────────┘      └──────────┬──────────┘      └────────┬─────────┘
                                     │                          │
                                     ▼                          ▼
                          ┌─────────────────────┐      ┌──────────────────┐
                          │  Redis PubSub Bus   │◄─────┤  WebSockets UI   │
                          └─────────────────────┘      └──────────────────┘
  `,
  "ai-contract-review": `
 ┌─────────────────┐      ┌─────────────────────┐      ┌──────────────────┐
 │ FastAPI Gateway ├─────►│ SentenceTransformer ├─────►│ pgvector Search  │
 └─────────────────┘      └─────────────────────┘      └────────┬─────────┘
                                                                │
                                                                ▼
                                                       ┌──────────────────┐
                                                       │  Semantic Cache  │
                                                       └──────────────────┘
  `,
  "ml-model-monitoring": `
 ┌─────────────────┐      ┌─────────────────────┐      ┌──────────────────┐
 │  ML Inference   ├─────►│Evidently AI metrics ├─────►│Prometheus Server │
 └─────────────────┘      └─────────────────────┘      └────────┬─────────┘
                                                                │
                                                                ▼
                                                       ┌──────────────────┐
                                                       │ Grafana Dashboard│
                                                       └──────────────────┘
  `,
  "event-booking-platform": `
 ┌─────────────────┐      ┌─────────────────────┐      ┌──────────────────┐
 │   API Gateway   ├─────►│ Redis Concurrency   ├─────►│ PostgreSQL ACID  │
 └─────────────────┘      └─────────────────────┘      └──────────────────┘
  `
};

export function ProjectCard({ project, index }: ProjectCardProps) {
  const [modalOpen, setModalOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  // Portals need a DOM target; only available after mount (avoids SSR mismatch).
  useEffect(() => setMounted(true), []);

  // Close on Escape and lock body scroll while the modal is open.
  useEffect(() => {
    if (!modalOpen) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setModalOpen(false);
    window.addEventListener("keydown", onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [modalOpen]);

  const modal = (
    <AnimatePresence>
      {modalOpen && (
        <div data-lenis-prevent className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop blur overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setModalOpen(false)}
            className="absolute inset-0 bg-black/85 backdrop-blur-sm"
          />

          {/* Modal Box */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 10 }}
            className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-2xl border border-white/10 bg-[#0a0b10] p-6 md:p-8 shadow-[0_0_60px_rgba(0,245,212,0.08)] z-10 hide-scrollbar text-white"
          >
            {/* Header */}
            <div className="flex items-start justify-between border-b border-white/10 pb-4 mb-6">
              <div>
                <h3 className="font-cyber text-xl md:text-2xl font-bold text-white tracking-wide">
                  {project.title.toUpperCase()}
                </h3>
                <span className="font-mono text-[10px] text-[#00f5d4]/70 tracking-widest block mt-1">
                  {"// PLATFORM_SPECIFICATIONS"}
                </span>
              </div>
              <button
                onClick={() => setModalOpen(false)}
                data-cursor="hover"
                className="rounded px-2.5 py-1 border border-white/15 text-xs text-gray-400 hover:text-white hover:bg-white/10 transition"
                aria-label="Close details modal"
              >
                ESC_CLOSE
              </button>
            </div>

            {/* Content Grid */}
            <div className="space-y-6">
              {/* Overview */}
              <div>
                <h5 className="font-cyber text-xs text-[#00f5d4]/70 tracking-widest uppercase mb-2">
                  System Overview
                </h5>
                <p className="text-gray-300 text-xs md:text-sm leading-relaxed">
                  {project.problem}
                </p>
              </div>

              {/* System Architecture flowchart */}
              {ARCHITECTURE_FLOWCHARTS[project.id] && (
                <div>
                  <h5 className="font-cyber text-xs text-[#00f5d4]/70 tracking-widest uppercase mb-3">
                    Dataflow & Architecture Pipeline
                  </h5>
                  <div className="bg-black/40 border border-white/10 rounded-xl p-4 overflow-x-auto font-mono text-[9px] text-[#00f5d4] leading-none select-none">
                    <pre className="whitespace-pre">
                      {ARCHITECTURE_FLOWCHARTS[project.id]}
                    </pre>
                  </div>
                </div>
              )}

              {/* Performance Metrics */}
              {project.metrics && (
                <div>
                  <h5 className="font-cyber text-xs text-[#00f5d4]/70 tracking-widest uppercase mb-3">
                    Core Metrics & Integration Features
                  </h5>
                  <div className="grid gap-3 sm:grid-cols-2">
                    {project.metrics.map((metric, i) => (
                      <div key={i} className="flex items-center gap-3 border border-white/10 bg-white/5 rounded-lg p-3">
                        <span className="text-[#00f5d4] font-mono text-xs">0{i+1}.</span>
                        <span className="text-gray-300 text-xs font-mono">{metric}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Full Tech Stack capsules */}
              <div>
                <h5 className="font-cyber text-xs text-[#00f5d4]/70 tracking-widest uppercase mb-3">
                  Technologies Mastered & Deployed
                </h5>
                <div className="flex flex-wrap gap-2">
                  {project.techStack.map((tech) => (
                    <span
                      key={tech}
                      className="rounded-full bg-white/5 border border-white/10 px-3 py-1 text-xs font-mono text-gray-300"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* Action CTA */}
              <div className="flex gap-4 border-t border-white/10 pt-6 mt-4">
                {project.github && (
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    data-cursor="hover"
                    className="px-5 py-2.5 rounded-lg bg-[#00f5d4] hover:bg-[#00d9bd] text-black font-cyber font-bold tracking-widest text-xs transition duration-300 hover:shadow-[0_0_25px_rgba(0,245,212,0.35)]"
                  >
                    BROWSE_SOURCE
                  </a>
                )}
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );

  return (
    <>
      <motion.div
        onClick={() => setModalOpen(true)}
        data-cursor="hover"
        whileHover={{ y: -6 }}
        className="group relative cursor-pointer overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03] p-6 backdrop-blur-md transition-all duration-300 hover:border-[#00f5d4]/40 hover:shadow-[0_0_40px_rgba(0,245,212,0.10)] flex flex-col justify-between h-full"
      >
        {/* corner glow */}
        <div className="absolute -top-16 -right-16 h-40 w-40 rounded-full bg-[#00f5d4]/10 blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

        <div className="relative">
          <div className="flex items-start justify-between gap-2 mb-4">
            {typeof index === "number" && (
              <span className="font-mono text-4xl font-bold text-white/10 leading-none group-hover:text-[#00f5d4]/30 transition-colors duration-300">
                {String(index + 1).padStart(2, "0")}
              </span>
            )}
            <span className="text-[9px] font-mono text-gray-500 mt-1">{"// CONFIG.SYS"}</span>
          </div>

          <h4 className="font-cyber font-bold text-lg text-white mb-3 leading-tight">
            {project.title}
          </h4>

          <p className="text-gray-400 text-xs leading-relaxed mb-4">{project.problem}</p>

          <div className="flex flex-wrap gap-1.5 mb-4">
            {project.techStack.slice(0, 5).map((tech) => (
              <span
                key={tech}
                className="rounded border border-white/10 bg-white/5 px-2 py-0.5 text-[9px] font-mono text-gray-300"
              >
                {tech}
              </span>
            ))}
            {project.techStack.length > 5 && (
              <span className="text-[9px] font-mono text-gray-500 self-center">
                +{project.techStack.length - 5} more
              </span>
            )}
          </div>
        </div>

        <div className="relative">
          {project.architecture && (
            <div className="border-t border-white/10 pt-3 mt-2">
              <span className="text-[8px] font-mono text-[#00f5d4] tracking-wider block uppercase">
                Architecture Pipe:
              </span>
              <p className="font-mono text-[9px] text-gray-500 mt-1 truncate">{project.architecture}</p>
            </div>
          )}

          <div className="flex items-center justify-between border-t border-white/10 pt-3 mt-3">
            <span className="text-[10px] font-cyber text-[#00f5d4] font-bold tracking-widest group-hover:translate-x-1 transition-transform">
              EXPLORE_SPECS →
            </span>
            {project.github && (
              <span className="text-[10px] font-mono text-gray-500 group-hover:text-white transition">
                GitHub
              </span>
            )}
          </div>
        </div>
      </motion.div>

      {/* Detailed overlay modal — portaled to <body> so `fixed` pins to the
          viewport instead of the transformed horizontal-scroll track. */}
      {mounted && createPortal(modal, document.body)}
    </>
  );
}
