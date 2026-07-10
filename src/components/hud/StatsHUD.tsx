"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { developerStats } from "@/data/stats";

const STAT_ITEMS = [
  { key: "modelsTrained" as const, label: "Models Trained", suffix: "+" },
  { key: "apisBuilt" as const, label: "APIs Built", suffix: "" },
  { key: "systemsDeployed" as const, label: "Systems Deployed", suffix: "" },
  { key: "repositories" as const, label: "Repositories", suffix: "" },
  { key: "technologiesMastered" as const, label: "Technologies", suffix: "+" },
];

function AnimatedCounter({
  value,
  suffix = "",
  play,
}: {
  value: number;
  suffix?: string;
  play: boolean;
}) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!play) return;
    let raf = 0;
    const duration = 1500;
    let startTs: number | null = null;
    const ease = (t: number) => 1 - Math.pow(1 - t, 3); // easeOutCubic

    const tick = (ts: number) => {
      if (startTs === null) startTs = ts;
      const p = Math.min(1, (ts - startTs) / duration);
      setCount(Math.round(ease(p) * value));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [value, play]);

  return (
    <span>
      {count}
      {suffix}
    </span>
  );
}

export function StatsHUD() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.4 });

  return (
    <div ref={ref} className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-5">
      {STAT_ITEMS.map((item, i) => (
        <motion.div
          key={item.key}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9 + i * 0.08, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="rounded-lg border border-black/5 bg-white/50 px-4 py-3 backdrop-blur-sm"
        >
          <div className="text-2xl font-bold text-black">
            <AnimatedCounter value={developerStats[item.key]} suffix={item.suffix} play={inView} />
          </div>
          <div className="text-xs text-gray-500">{item.label}</div>
        </motion.div>
      ))}
    </div>
  );
}
