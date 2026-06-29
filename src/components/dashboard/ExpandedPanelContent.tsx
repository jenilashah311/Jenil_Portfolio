"use client";

import { motion } from "framer-motion";
import type { PanelId } from "@/types";
import { experience, education, research } from "@/data/experience";
import { projects } from "@/data/projects";
import { profile } from "@/data/profile";
import { SkillGraph } from "@/components/skills/SkillGraph";
import { ProjectCard } from "@/components/projects/ProjectCard";

interface ExpandedPanelContentProps {
  panelId: PanelId;
  onClose: () => void;
}

export function ExpandedPanelContent({ panelId, onClose }: ExpandedPanelContentProps) {
  const content = () => {
    switch (panelId) {
      case "ai-ml":
        return (
          <div className="space-y-4">
            <p className="text-gray-400">
              RAG systems, LLM orchestration (LangChain, OpenAI), NLP pipelines,
              TensorFlow & PyTorch inference, HuggingFace, production ML monitoring.
            </p>
            <ul className="list-inside list-disc space-y-1 text-sm text-gray-500">
              <li>RAG with Pinecone & FAISS</li>
              <li>Event-driven ML inference (2s → 200ms)</li>
              <li>Prometheus & Grafana for ML services</li>
            </ul>
          </div>
        );
      case "software":
        return (
          <div className="space-y-4">
            <p className="text-gray-400">
              APIs (FastAPI, Go), concurrency control, rate limiting, idempotency,
              RBAC, and scalable backend design.
            </p>
          </div>
        );
      case "fullstack":
        return (
          <div className="space-y-4">
            <p className="text-gray-400">
              React, TypeScript, Next.js, RESTful backends, Redis caching,
              PostgreSQL, end-to-end systems.
            </p>
          </div>
        );
      case "data-science":
        return (
          <div className="space-y-4">
            <p className="text-gray-400">
              Pandas, PySpark, speech recognition, NLP workflows, k-fold validation,
              drift detection (Evidently AI).
            </p>
            <SkillGraph />
          </div>
        );
      case "projects":
        return (
          <div className="grid gap-4 sm:grid-cols-2">
            {projects.map((p) => (
              <ProjectCard key={p.id} project={p} />
            ))}
          </div>
        );
      case "resume":
        return (
          <div className="space-y-6 overflow-y-auto max-h-[70vh] hide-scrollbar">
            <section>
              <h4 className="mb-2 text-sm font-semibold uppercase tracking-wider text-[var(--neon-cyan)]">
                Experience
              </h4>
              {experience.map((exp, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 }}
                  className="mb-4 rounded-lg border border-white/10 bg-white/5 p-4"
                >
                  <div className="flex flex-wrap items-baseline justify-between gap-2">
                    <span className="font-semibold text-white">{exp.role}</span>
                    <span className="text-xs text-gray-500">{exp.period}</span>
                  </div>
                  <p className="text-sm text-[var(--neon-cyan)]">{exp.company}</p>
                  {exp.description && (
                    <p className="mt-1 text-xs text-gray-500">{exp.description}</p>
                  )}
                  <ul className="mt-2 list-inside list-disc space-y-0.5 text-xs text-gray-400">
                    {exp.bullets.slice(0, 2).map((b, j) => (
                      <li key={j}>{b}</li>
                    ))}
                  </ul>
                </motion.div>
              ))}
            </section>
            <section>
              <h4 className="mb-2 text-sm font-semibold uppercase tracking-wider text-[var(--neon-cyan)]">
                Research
              </h4>
              <div className="rounded-lg border border-white/10 bg-white/5 p-4">
                <p className="font-semibold text-white">{research.title}</p>
                <p className="text-xs text-gray-500">{research.publisher} · {research.date}</p>
                <p className="mt-1 text-sm text-gray-400">{research.description}</p>
              </div>
            </section>
            <section>
              <h4 className="mb-2 text-sm font-semibold uppercase tracking-wider text-[var(--neon-cyan)]">
                Education
              </h4>
              {education.map((ed, i) => (
                <div
                  key={i}
                  className="mb-3 rounded-lg border border-white/10 bg-white/5 p-3"
                >
                  <p className="font-semibold text-white">{ed.school}</p>
                  <p className="text-sm text-gray-400">{ed.degree}</p>
                  <p className="text-xs text-gray-500">GPA {ed.gpa} · {ed.period}</p>
                </div>
              ))}
            </section>
          </div>
        );
      case "contact":
        return (
          <div className="space-y-4">
            <p className="text-gray-400">{profile.location}</p>
            <div className="flex flex-wrap gap-4">
              <a
                href={`mailto:${profile.email}`}
                className="rounded-lg border border-[var(--neon-cyan)]/30 px-4 py-2 text-sm text-[var(--neon-cyan)] transition hover:bg-[var(--neon-cyan)]/10"
              >
                Email
              </a>
              <a
                href={profile.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-lg border border-[var(--neon-cyan)]/30 px-4 py-2 text-sm text-[var(--neon-cyan)] transition hover:bg-[var(--neon-cyan)]/10"
              >
                LinkedIn
              </a>
              <a
                href={profile.github}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-lg border border-[var(--neon-cyan)]/30 px-4 py-2 text-sm text-[var(--neon-cyan)] transition hover:bg-[var(--neon-cyan)]/10"
              >
                GitHub
              </a>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="rounded-xl border border-white/10 bg-black/40 p-6 backdrop-blur-xl"
    >
      <div className="mb-4 flex items-center justify-between">
        <span className="text-xs uppercase tracking-widest text-gray-500">
          {panelId}
        </span>
        <button
          onClick={onClose}
          className="rounded px-3 py-1 text-sm text-gray-400 transition hover:bg-white/10 hover:text-white"
        >
          Close
        </button>
      </div>
      {content()}
    </motion.div>
  );
}
