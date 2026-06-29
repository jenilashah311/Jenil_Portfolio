"use client";

import { motion } from "framer-motion";
import { profile } from "@/data/profile";

// Placeholder: in production you'd fetch from GitHub API or serverless function
const MOCK_ACTIVITY = [
  { repo: "Portfolio", action: "push", time: "2h ago", branch: "main" },
  { repo: "ml-monitoring", action: "push", time: "1d ago", branch: "feat/evidently" },
  { repo: "contract-review", action: "push", time: "3d ago", branch: "main" },
  { repo: "event-booking", action: "push", time: "5d ago", branch: "fix/redis" },
];

interface GitHubActivityProps {
  isOpen: boolean;
  onClose: () => void;
}

export function GitHubActivity({ isOpen, onClose }: GitHubActivityProps) {
  if (!isOpen) return null;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      className="fixed right-6 top-24 z-50 w-full max-w-xs overflow-hidden rounded-xl border border-[var(--neon-green)]/30 bg-black/95 shadow-[0_0_40px_rgba(6,255,165,0.15)] backdrop-blur-xl"
    >
      <div className="flex items-center justify-between border-b border-white/10 px-4 py-2">
        <span className="text-sm font-medium text-[var(--neon-green)]">
          Recent activity
        </span>
        <button
          onClick={onClose}
          className="text-gray-500 hover:text-white"
          aria-label="Close"
        >
          ×
        </button>
      </div>
      <div className="max-h-64 overflow-y-auto p-3 space-y-2">
        {MOCK_ACTIVITY.map((item, i) => (
          <motion.a
            key={i}
            href={profile.github}
            target="_blank"
            rel="noopener noreferrer"
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.05 }}
            className="block rounded-lg border border-white/5 bg-white/5 p-2 text-xs transition hover:bg-white/10"
          >
            <span className="text-[var(--neon-green)]">{item.repo}</span>
            <span className="text-gray-500"> · {item.action}</span>
            <span className="text-gray-600"> {item.time}</span>
          </motion.a>
        ))}
      </div>
      <div className="border-t border-white/10 px-4 py-2 text-center">
        <a
          href={profile.github}
          target="_blank"
          rel="noopener noreferrer"
          className="text-xs text-[var(--neon-green)] hover:underline"
        >
          View GitHub →
        </a>
      </div>
    </motion.div>
  );
}
