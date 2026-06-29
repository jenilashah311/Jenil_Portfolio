"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const QUICK_REPLIES = [
  "What do you build?",
  "Tell me about your ML work",
  "How can I contact you?",
  "Projects overview",
];

const BOT_RESPONSES: Record<string, string> = {
  "what do you build?":
    "I build AI/ML systems (RAG, LLMs, NLP), production APIs with FastAPI/Go, and full-stack applications. I focus on reducing latency, automating workflows, and shipping reliable systems.",
  "tell me about your ml work":
    "At Drive Health I built RAG backends with Pinecone/FAISS (10k+ daily queries), reduced ML inference from 2s to 200ms with event-driven batching, and deployed Prometheus/Grafana for 5+ production ML services.",
  "how can i contact you?":
    "Email: jenilashah1201@gmail.com | LinkedIn: linkedin.com/in/jenilshah11 | GitHub: github.com/jenilashah311",
  "projects overview":
    "Key projects: AI Contract Review (SentenceTransformers + pgvector), ML Monitoring Dashboard (Evidently AI), Event Booking (FastAPI + Redis), Payment Service (Go, 1000+ TPS). Check the Projects panel for details.",
};

function getResponse(input: string): string {
  const normalized = input.trim().toLowerCase();
  for (const [key, value] of Object.entries(BOT_RESPONSES)) {
    if (normalized.includes(key) || key.includes(normalized)) return value;
  }
  return "I'm a simple demo bot. Try: \"What do you build?\" or \"Tell me about your ML work\" or \"Projects overview\".";
}

interface Message {
  id: string;
  role: "user" | "bot";
  text: string;
}

interface ChatBotProps {
  isOpen: boolean;
  onClose: () => void;
}

export function ChatBot({ isOpen, onClose }: ChatBotProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "0",
      role: "bot",
      text: "Hi, I'm the portfolio assistant. Ask me about Jenil's work, projects, or how to get in touch.",
    },
  ]);
  const [input, setInput] = useState("");
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const send = (text: string) => {
    const t = text.trim();
    if (!t) return;
    const userMsg: Message = { id: Date.now().toString(), role: "user", text: t };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");

    const reply = getResponse(t);
    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        { id: (Date.now() + 1).toString(), role: "bot", text: reply },
      ]);
    }, 400);
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: 20 }}
        className="fixed bottom-24 right-6 z-50 flex h-[420px] w-full max-w-sm flex-col overflow-hidden rounded-xl border border-[var(--neon-magenta)]/30 bg-black/95 shadow-[0_0_40px_rgba(247,37,133,0.2)] backdrop-blur-xl"
      >
        <div className="flex items-center justify-between border-b border-white/10 px-4 py-2">
          <span className="text-sm font-medium text-[var(--neon-magenta)]">
            Portfolio Assistant
          </span>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-white"
            aria-label="Close chat"
          >
            ×
          </button>
        </div>
        <div className="flex-1 overflow-y-auto p-4 space-y-3 hide-scrollbar">
          {messages.map((m) => (
            <div
              key={m.id}
              className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}
            >
              <div
                className={`max-w-[85%] rounded-lg px-3 py-2 text-sm ${
                  m.role === "user"
                    ? "bg-[var(--neon-cyan)]/20 text-[var(--neon-cyan)]"
                    : "bg-white/10 text-gray-300"
                }`}
              >
                {m.text}
              </div>
            </div>
          ))}
          <div ref={bottomRef} />
        </div>
        <div className="border-t border-white/10 p-2">
          <div className="mb-2 flex flex-wrap gap-1">
            {QUICK_REPLIES.map((q) => (
              <button
                key={q}
                onClick={() => send(q)}
                className="rounded bg-white/10 px-2 py-1 text-xs text-gray-400 hover:bg-[var(--neon-magenta)]/20 hover:text-[var(--neon-magenta)]"
              >
                {q}
              </button>
            ))}
          </div>
          <div className="flex gap-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && send(input)}
              placeholder="Ask anything..."
              className="flex-1 rounded bg-white/10 px-3 py-2 text-sm text-white placeholder-gray-500 outline-none focus:ring-1 focus:ring-[var(--neon-magenta)]"
            />
            <button
              onClick={() => send(input)}
              className="rounded bg-[var(--neon-magenta)]/30 px-4 py-2 text-sm text-[var(--neon-magenta)] hover:bg-[var(--neon-magenta)]/50"
            >
              Send
            </button>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
