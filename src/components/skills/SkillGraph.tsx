"use client";

import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { skills, skillCategories } from "@/data/skills";
import type { SkillNode } from "@/types";

const CATEGORY_COLORS: Record<string, string> = {
  "ai-ml": "#165c3b",
  backend: "#1f4f6c",
  frontend: "#4b5563",
  data: "#6b5a3e",
  cloud: "#3c4f76",
};

export function SkillGraph() {
  const [hovered, setHovered] = useState<SkillNode | null>(null);

  const byCategory = useMemo(() => {
    const map: Record<string, SkillNode[]> = {};
    skillCategories.forEach((c) => (map[c.id] = []));
    skills.forEach((s) => {
      if (map[s.category]) map[s.category].push(s);
    });
    return map;
  }, []);

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-2">
        {skillCategories.map((cat) => (
          <span
            key={cat.id}
            className="rounded-full px-3 py-1 text-xs font-semibold"
            style={{
              backgroundColor: `${cat.color}15`,
              color: cat.color,
            }}
          >
            {cat.label}
          </span>
        ))}
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        {skillCategories.map((cat) => (
          <div key={cat.id} className="rounded-lg border border-black/5 bg-white/40 p-3">
            <h5
              className="mb-2 text-xs font-bold uppercase"
              style={{ color: CATEGORY_COLORS[cat.id] || "#000" }}
            >
              {cat.label}
            </h5>
            <div className="flex flex-wrap gap-2">
              {(byCategory[cat.id] ?? []).map((skill) => {
                const isHovered = hovered?.id === skill.id;
                return (
                  <motion.span
                    key={skill.id}
                    onMouseEnter={() => setHovered(skill)}
                    onMouseLeave={() => setHovered(null)}
                    whileHover={{ scale: 1.05 }}
                    className={`cursor-pointer rounded-md border px-2 py-1 text-xs transition ${
                      isHovered ? "" : "border-black/5 bg-black/5 text-gray-700 hover:text-black"
                    }`}
                    style={isHovered ? {
                      borderColor: CATEGORY_COLORS[skill.category],
                      color: CATEGORY_COLORS[skill.category],
                      backgroundColor: `${CATEGORY_COLORS[skill.category]}15`,
                    } : undefined}
                  >
                    {skill.label}
                  </motion.span>
                );
              })}
            </div>
          </div>
        ))}
      </div>
      {hovered && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="rounded-lg border border-black/10 bg-white/60 p-3 text-sm text-gray-700"
        >
          <span className="font-semibold" style={{ color: CATEGORY_COLORS[hovered.category] }}>
            {hovered.label}
          </span>
          {hovered.description && (
            <p className="mt-1 text-xs text-gray-600">{hovered.description}</p>
          )}
        </motion.div>
      )}
    </div>
  );
}
