"use client";

import { motion, AnimatePresence } from "framer-motion";
import { GlassPanel } from "@/components/ui/GlassPanel";
import type { PanelId } from "@/types";
import { profile } from "@/data/profile";

const PANELS: { id: PanelId; title: string; icon: string; accent: string; desc: string }[] = [
  { id: "ai-ml", title: "AI / Machine Learning", icon: "◇", accent: "#00f5d4", desc: "RAG, LLMs, NLP, TensorFlow, PyTorch" },
  { id: "software", title: "Software Engineering", icon: "▣", accent: "#f72585", desc: "Systems design, APIs, reliability" },
  { id: "fullstack", title: "Full Stack Systems", icon: "◈", accent: "#4361ee", desc: "React, FastAPI, end-to-end" },
  { id: "data-science", title: "Data Science", icon: "⬡", accent: "#ffd60a", desc: "Pipelines, analytics, ML ops" },
  { id: "projects", title: "Projects", icon: "⬢", accent: "#06ffa5", desc: "Mission-critical systems" },
  { id: "resume", title: "Resume", icon: "▤", accent: "#00f5d4", desc: "Experience & education" },
  { id: "contact", title: "Contact", icon: "✉", accent: "#f72585", desc: profile.email },
];

interface DashboardPanelsProps {
  expandedPanel: PanelId | null;
  onPanelClick: (id: PanelId) => void;
  mousePosition: { x: number; y: number };
}

const positions = [
  { row: 0, col: 0 },
  { row: 0, col: 1 },
  { row: 0, col: 2 },
  { row: 1, col: 0 },
  { row: 1, col: 1 },
  { row: 1, col: 2 },
  { row: 2, col: 1 },
];

export function DashboardPanels({
  expandedPanel,
  onPanelClick,
  mousePosition,
}: DashboardPanelsProps) {
  return (
    <div
      className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3"
      style={{
        transform: `perspective(1200px) rotateX(${mousePosition.y * 2}deg) rotateY(${mousePosition.x * 2}deg)`,
      }}
    >
      {PANELS.map((panel, i) => {
        const isExpanded = expandedPanel === panel.id;
        const pos = positions[i] ?? { row: 0, col: i % 3 };
        return (
          <motion.div
            key={panel.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.06 }}
            className={isExpanded ? "col-span-full" : ""}
          >
            <GlassPanel
              id={panel.id}
              title={panel.title}
              icon={panel.icon}
              accentColor={panel.accent}
              isExpanded={isExpanded}
              onClick={() => onPanelClick(panel.id)}
            >
              {panel.desc}
            </GlassPanel>
          </motion.div>
        );
      })}
    </div>
  );
}
