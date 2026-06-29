"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import type { Project } from "@/types";

interface ProjectCardProps {
  project: Project;
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

export function ProjectCard({ project }: ProjectCardProps) {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <>
      <motion.div
        onClick={() => setModalOpen(true)}
        whileHover={{ y: -6 }}
        className="group cursor-pointer rounded-xl border border-black/5 bg-white/40 p-5 backdrop-blur-sm transition-all duration-300 hover:border-black/20 hover:shadow-[0_0_20px_rgba(17,17,21,0.04)] flex flex-col justify-between h-full"
      >
        <div>
          <div className="flex items-center justify-between gap-2 mb-2">
            <h4 className="font-cyber font-bold text-md text-black group-hover:text-black transition-colors duration-300">
              {project.title}
            </h4>
            <span className="text-[9px] font-mono text-gray-500">// CONFIG.SYS</span>
          </div>
          
          <p className="text-gray-400 text-xs leading-relaxed mb-4">
            {project.problem}
          </p>

          <div className="flex flex-wrap gap-1.5 mb-4">
            {project.techStack.slice(0, 5).map((tech) => (
              <span
                key={tech}
                className="rounded bg-black/5 border border-black/5 px-2 py-0.5 text-[9px] font-mono text-gray-600"
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

        <div>
          {project.architecture && (
            <div className="border-t border-black/5 pt-3 mt-2">
              <span className="text-[8px] font-mono text-[var(--neon-cyan)] tracking-wider block uppercase">
                Architecture Pipe:
              </span>
              <p className="font-mono text-[9px] text-gray-500 mt-1 truncate">
                {project.architecture}
              </p>
            </div>
          )}
          
          <div className="flex items-center justify-between border-t border-black/5 pt-3 mt-3">
            <span className="text-[10px] font-cyber text-black font-bold tracking-widest group-hover:translate-x-1 transition-transform">
              EXPLORE_SPECS →
            </span>
            {project.github && (
              <span className="text-[10px] font-mono text-gray-500 hover:text-black transition">
                GitHub
              </span>
            )}
          </div>
        </div>
      </motion.div>

      {/* Glassmorphic detailed overlay modal */}
      <AnimatePresence>
        {modalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
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
              className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-2xl border border-black/10 bg-white p-6 md:p-8 shadow-[0_0_40px_rgba(17,17,21,0.06)] z-10 hide-scrollbar text-black"
            >
              {/* Header */}
              <div className="flex items-start justify-between border-b border-black/5 pb-4 mb-6">
                <div>
                  <h3 className="font-cyber text-xl md:text-2xl font-bold text-black tracking-wide">
                    {project.title.toUpperCase()}
                  </h3>
                  <span className="font-mono text-[10px] text-gray-500 tracking-widest block mt-1">
                    // PLATFORM_SPECIFICATIONS
                  </span>
                </div>
                <button
                  onClick={() => setModalOpen(false)}
                  className="rounded px-2.5 py-1 border border-black/10 text-xs text-gray-500 hover:text-black hover:bg-black/5 transition"
                  aria-label="Close details modal"
                >
                  ESC_CLOSE
                </button>
              </div>

              {/* Content Grid */}
              <div className="space-y-6">
                {/* Overview */}
                <div>
                  <h5 className="font-cyber text-xs text-gray-500 tracking-widest uppercase mb-2">
                    System Overview
                  </h5>
                  <p className="text-gray-700 text-xs md:text-sm leading-relaxed">
                    {project.problem}
                  </p>
                </div>

                {/* System Architecture flowchart */}
                {ARCHITECTURE_FLOWCHARTS[project.id] && (
                  <div>
                    <h5 className="font-cyber text-xs text-gray-500 tracking-widest uppercase mb-3">
                      Dataflow & Architecture Pipeline
                    </h5>
                    <div className="bg-[#f0f4f1] border border-black/5 rounded-xl p-4 overflow-x-auto font-mono text-[9px] text-black leading-none select-none">
                      <pre className="whitespace-pre">
                        {ARCHITECTURE_FLOWCHARTS[project.id]}
                      </pre>
                    </div>
                  </div>
                )}

                {/* Performance Metrics */}
                {project.metrics && (
                  <div>
                    <h5 className="font-cyber text-xs text-gray-500 tracking-widest uppercase mb-3">
                      Core Metrics & Integration Features
                    </h5>
                    <div className="grid gap-3 sm:grid-cols-2">
                      {project.metrics.map((metric, i) => (
                        <div key={i} className="flex items-center gap-3 border border-black/5 bg-black/5 rounded-lg p-3">
                          <span className="text-black font-mono text-xs">0{i+1}.</span>
                          <span className="text-gray-700 text-xs font-mono">{metric}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Full Tech Stack capsules */}
                <div>
                  <h5 className="font-cyber text-xs text-gray-500 tracking-widest uppercase mb-3">
                    Technologies Mastered & Deployed
                  </h5>
                  <div className="flex flex-wrap gap-2">
                    {project.techStack.map((tech) => (
                      <span
                        key={tech}
                        className="rounded-full bg-black/5 border border-black/5 px-3 py-1 text-xs font-mono text-gray-700"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Action CTA */}
                <div className="flex gap-4 border-t border-black/5 pt-6 mt-4">
                  {project.github && (
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-5 py-2.5 rounded-lg bg-[#111115] hover:bg-[#222228] text-white font-cyber font-bold tracking-widest text-xs transition duration-300 hover:shadow-[0_0_15px_rgba(17,17,21,0.12)]"
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
    </>
  );
}
