"use client";

import { useMemo } from "react";
import { motion } from "framer-motion";
import { skills, skillCategories } from "@/data/skills";
import type { SkillNode } from "@/types";

// Brightened accents that read on the dark deep-dive background.
const CATEGORY_COLORS: Record<string, string> = {
  "ai-ml": "#00f5d4",
  backend: "#5eb3ff",
  frontend: "#c4b5fd",
  data: "#fbbf77",
  cloud: "#7dd3fc",
};

const EASE = [0.16, 1, 0.3, 1] as const;

export function SkillGraph() {
  const byCategory = useMemo(() => {
    const map: Record<string, SkillNode[]> = {};
    skillCategories.forEach((c) => (map[c.id] = []));
    skills.forEach((s) => {
      if (map[s.category]) map[s.category].push(s);
    });
    return map;
  }, []);

  return (
    <div className="space-y-6">
      {/* Legend + quick counts */}
      <div className="flex flex-wrap items-center gap-2">
        {skillCategories.map((cat) => {
          const color = CATEGORY_COLORS[cat.id];
          return (
            <span
              key={cat.id}
              className="inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-semibold border"
              style={{ backgroundColor: `${color}12`, borderColor: `${color}40`, color }}
            >
              <span className="h-1.5 w-1.5 rounded-full" style={{ backgroundColor: color }} />
              {cat.label}
              <span className="opacity-60">{(byCategory[cat.id] ?? []).length}</span>
            </span>
          );
        })}
        <span className="ml-auto font-mono text-[11px] text-gray-500">
          {skills.length} capabilities · 5 domains
        </span>
      </div>

      {/* Masonry of category cards — packs tightly so no lone card / gaps */}
      <div className="columns-1 sm:columns-2 lg:columns-3 gap-4 [column-fill:_balance]">
        {skillCategories.map((cat, ci) => {
          const color = CATEGORY_COLORS[cat.id];
          const items = byCategory[cat.id] ?? [];
          return (
            <motion.div
              key={cat.id}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.55, ease: EASE, delay: ci * 0.05 }}
              className="mb-4 break-inside-avoid rounded-xl border border-white/10 bg-white/[0.02] p-4"
            >
              <div className="mb-3 flex items-center justify-between">
                <h5 className="text-xs font-bold uppercase tracking-wider" style={{ color }}>
                  {cat.label}
                </h5>
                <span className="font-mono text-[10px] text-gray-500">{items.length}</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {items.map((skill) => (
                  <motion.span
                    key={skill.id}
                    whileHover={{ scale: 1.06 }}
                    className="cursor-default rounded-md border px-2.5 py-1 text-xs text-gray-200 transition-colors"
                    style={{
                      borderColor: `${color}30`,
                      backgroundColor: `${color}0d`,
                    }}
                  >
                    {skill.label}
                  </motion.span>
                ))}
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
