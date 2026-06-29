"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const BOOT_LINES = [
  "> Initializing Developer Intelligence System…",
  "> Loading neural modules…",
  "> Connecting knowledge graph…",
  "> RAG pipeline online.",
  "> ML inference ready.",
  "> Systems nominal.",
  "> Welcome.",
];

interface CinematicLoaderProps {
  onComplete: () => void;
}

export function CinematicLoader({ onComplete }: CinematicLoaderProps) {
  const [lineIndex, setLineIndex] = useState(0);
  const [currentLine, setCurrentLine] = useState("");
  const [showCursor, setShowCursor] = useState(true);

  useEffect(() => {
    if (lineIndex >= BOOT_LINES.length) {
      setShowCursor(false);
      const t = setTimeout(onComplete, 600);
      return () => clearTimeout(t);
    }

    const line = BOOT_LINES[lineIndex];
    let i = 0;
    setCurrentLine("");

    const interval = setInterval(() => {
      if (i <= line.length) {
        setCurrentLine(line.slice(0, i));
        i++;
      } else {
        clearInterval(interval);
        setLineIndex((prev) => prev + 1);
      }
    }, 45);

    return () => clearInterval(interval);
  }, [lineIndex, onComplete]);

  return (
    <AnimatePresence mode="wait">
      <motion.div
        className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-[#05050a] noise-overlay"
        initial={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.6 }}
      >
        {/* Neural network grid background */}
        <div className="absolute inset-0 overflow-hidden opacity-20">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `
                linear-gradient(rgba(0,245,212,0.03) 1px, transparent 1px),
                linear-gradient(90deg, rgba(0,245,212,0.03) 1px, transparent 1px)
              `,
              backgroundSize: "40px 40px",
            }}
          />
          <motion.div
            className="absolute left-1/2 top-1/2 h-[400px] w-[400px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-[rgba(0,245,212,0.2)]"
            animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.6, 0.3] }}
            transition={{ duration: 3, repeat: Infinity }}
          />
          <motion.div
            className="absolute left-1/2 top-1/2 h-[250px] w-[250px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-[rgba(247,37,133,0.2)]"
            animate={{ scale: [1.2, 1, 1.2], opacity: [0.2, 0.5, 0.2] }}
            transition={{ duration: 2.5, repeat: Infinity, delay: 0.5 }}
          />
        </div>

        <div className="relative z-10 font-mono text-sm tracking-widest text-[var(--neon-cyan)]">
          <div className="min-h-[200px] space-y-2 px-6">
            {BOOT_LINES.slice(0, lineIndex).map((line, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                className="text-[var(--neon-cyan)]"
              >
                {line}
              </motion.div>
            ))}
            <div className="flex items-baseline gap-0.5">
              <span>{currentLine}</span>
              {showCursor && (
                <motion.span
                  animate={{ opacity: [1, 0] }}
                  transition={{ duration: 0.5, repeat: Infinity }}
                  className="inline-block h-4 w-2 bg-[var(--neon-cyan)]"
                />
              )}
            </div>
          </div>
        </div>

        <motion.div
          className="absolute bottom-12 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[var(--neon-cyan)] to-transparent"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 2, delay: 0.5 }}
          style={{ transformOrigin: "center" }}
        />
      </motion.div>
    </AnimatePresence>
  );
}
