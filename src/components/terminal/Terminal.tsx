"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { profile } from "@/data/profile";
import { projects } from "@/data/projects";

const COMMANDS: Record<
  string,
  string | (() => string)
> = {
  help: `Available commands:
  help     - Show this help
  projects - List projects
  skills   - List skill categories
  resume   - Open resume panel
  contact  - Show contact info
  clear    - Clear terminal
  whoami   - About me`,

  whoami: `Jenil Shah
  ${profile.title}
  ${profile.location}
  ${profile.email}`,

  contact: `Contact:
  Email:   ${profile.email}
  Phone:   ${profile.phone}
  LinkedIn: ${profile.linkedin}
  GitHub:  ${profile.github}`,

  resume: "Opening Resume panel... (use the dashboard panels)",

  skills: `Skill categories:
  ai-ml    Backend   Frontend   Data   Cloud
  Type 'open <panel>' from dashboard for details.`,

  projects: projects
    .map(
      (p, i) =>
        `  [${i + 1}] ${p.title} (${p.techStack.slice(0, 3).join(", ")})`
    )
    .join("\n"),

  clear: "",
};

type LogEntry = { type: "input" | "output"; text: string };

interface TerminalProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenResume?: () => void;
}

export function Terminal({ isOpen, onClose, onOpenResume }: TerminalProps) {
  const [input, setInput] = useState("");
  const [log, setLog] = useState<LogEntry[]>([
    { type: "output", text: "Developer Intelligence System — Type 'help' for commands." },
  ]);
  const inputRef = useRef<HTMLInputElement>(null);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [log]);

  useEffect(() => {
    if (isOpen) setTimeout(() => inputRef.current?.focus(), 100);
  }, [isOpen]);

  const runCommand = (cmd: string) => {
    const trimmed = cmd.trim().toLowerCase();
    if (!trimmed) return;

    setLog((prev) => [...prev, { type: "input", text: `> ${cmd}` }]);

    let output: string;
    if (trimmed === "resume") {
      output = "Opening Resume panel...";
      if (onOpenResume) {
        setTimeout(() => {
          onOpenResume();
          onClose();
        }, 600);
      }
    } else {
      const handler = COMMANDS[trimmed];
      if (typeof handler === "function") output = handler();
      else if (handler !== undefined) output = handler;
      else output = `Unknown command: ${trimmed}. Type 'help' for available commands.`;
    }

    if (output) {
      setLog((prev) => [...prev, { type: "output", text: output }]);
    }
    setInput("");
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      runCommand(input);
    }
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 20 }}
        className="fixed bottom-6 left-6 right-6 z-50 max-h-[400px] overflow-hidden rounded-xl border border-[var(--neon-cyan)]/30 bg-black/90 shadow-[0_0_40px_rgba(244,241,234,0.08)] backdrop-blur-xl md:left-auto md:right-6 md:max-w-md"
      >
        <div className="flex items-center justify-between border-b border-white/10 px-4 py-2">
          <span className="font-mono text-xs text-[var(--neon-cyan)]">
            terminal — jenil@portfolio
          </span>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-white"
            aria-label="Close terminal"
          >
            ×
          </button>
        </div>
        <div className="max-h-72 overflow-y-auto p-4 font-mono text-sm hide-scrollbar">
          {log.map((entry, i) => (
            <div
              key={i}
              className={
                entry.type === "input"
                  ? "text-[var(--neon-cyan)]"
                  : "whitespace-pre-wrap text-gray-400"
              }
            >
              {entry.text}
            </div>
          ))}
          <div ref={bottomRef} />
        </div>
        <div className="flex items-center gap-2 border-t border-white/10 px-4 py-2">
          <span className="text-[var(--neon-cyan)]">$</span>
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            className="flex-1 bg-transparent font-mono text-white outline-none"
            placeholder="Type a command..."
            spellCheck={false}
          />
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
