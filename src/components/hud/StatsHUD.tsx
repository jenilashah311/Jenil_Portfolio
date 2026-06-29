"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { developerStats } from "@/data/stats";

const STAT_ITEMS = [
  { key: "modelsTrained" as const, label: "Models Trained", suffix: "+" },
  { key: "apisBuilt" as const, label: "APIs Built", suffix: "" },
  { key: "systemsDeployed" as const, label: "Systems Deployed", suffix: "" },
  { key: "repositories" as const, label: "Repositories", suffix: "" },
  { key: "technologiesMastered" as const, label: "Technologies", suffix: "+" },
];

function AnimatedCounter({ value, suffix = "" }: { value: number; suffix?: string }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let start = 0;
    const end = value;
    const duration = 1500;
    const stepTime = Math.max(16, duration / end);
    const timer = setInterval(() => {
      start += Math.ceil(end / (duration / stepTime)) || 1;
      if (start >= end) {
        setCount(end);
        clearInterval(timer);
      } else {
        setCount(start);
      }
    }, stepTime);
    return () => clearInterval(timer);
  }, [value]);

  return (
    <span>
      {count}
      {suffix}
    </span>
  );
}

export function StatsHUD() {
  return (
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-5">
      {STAT_ITEMS.map((item, i) => (
        <motion.div
          key={item.key}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: i * 0.08 }}
          className="rounded-lg border border-black/5 bg-white/40 px-4 py-3"
        >
          <div className="text-2xl font-bold text-black">
            <AnimatedCounter
              value={developerStats[item.key]}
              suffix={item.suffix}
            />
          </div>
          <div className="text-xs text-gray-500">{item.label}</div>
        </motion.div>
      ))}
    </div>
  );
}
