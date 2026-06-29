"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { profile } from "@/data/profile";

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function ContactModal({ isOpen, onClose }: ContactModalProps) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [isSending, setIsSending] = useState(false);
  const [isSent, setIsSent] = useState(false);
  const [error, setError] = useState("");

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !subject || !message) return;

    setIsSending(true);
    setError("");

    try {
      const response = await fetch(`https://formsubmit.co/ajax/${profile.email}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        body: JSON.stringify({
          name,
          email,
          _subject: `[Portfolio Contact] ${subject}`,
          message
        })
      });

      if (response.ok) {
        setIsSent(true);
      } else {
        throw new Error("Failed to dispatch transmission.");
      }
    } catch (err) {
      console.error(err);
      setError("Failed to establish secure conduit connection. Please try again.");
    } finally {
      setIsSending(false);
    }
  };

  const handleReset = () => {
    setName("");
    setEmail("");
    setSubject("");
    setMessage("");
    setIsSending(false);
    setIsSent(false);
    setError("");
    onClose();
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-10 overflow-y-auto bg-black/60 backdrop-blur-md">
        
        {/* Modal container */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ duration: 0.3 }}
          className="relative w-full max-w-lg bg-[#FAF9F6] text-black rounded-xl shadow-2xl overflow-hidden flex flex-col border border-black/10"
        >
          {/* Top action bar */}
          <div className="flex items-center justify-between border-b border-black/10 px-6 py-4 bg-gray-50/50">
            <div className="flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-emerald-600 animate-pulse" />
              <span className="font-mono text-xs text-gray-500 uppercase tracking-widest">
                System Interface — Communication Link
              </span>
            </div>
            <button
              onClick={handleReset}
              className="p-1.5 text-gray-400 hover:text-black transition"
              aria-label="Close modal"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Body content */}
          <div className="p-6 sm:p-8 overflow-y-auto max-h-[80vh]">
            {!isSent ? (
              <form onSubmit={handleSubmit} className="space-y-4">
                <p className="text-gray-700 text-xs leading-relaxed font-mono">
                  // ENTER METADATA CHANNELS TO ROUTE DISPATCH DIRECTLY TO JENIL SHAH.
                </p>

                <div className="space-y-1">
                  <label className="block font-mono text-[10px] uppercase text-gray-500 font-bold tracking-wider">
                    Sender Name
                  </label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. John Doe"
                    className="w-full px-3 py-2 rounded border border-black/10 bg-white/60 font-mono text-xs text-black focus:outline-none focus:border-black/35 focus:ring-1 focus:ring-black/10 transition"
                  />
                </div>

                <div className="space-y-1">
                  <label className="block font-mono text-[10px] uppercase text-gray-500 font-bold tracking-wider">
                    Sender Email
                  </label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="e.g. john@example.com"
                    className="w-full px-3 py-2 rounded border border-black/10 bg-white/60 font-mono text-xs text-black focus:outline-none focus:border-black/35 focus:ring-1 focus:ring-black/10 transition"
                  />
                </div>

                <div className="space-y-1">
                  <label className="block font-mono text-[10px] uppercase text-gray-500 font-bold tracking-wider">
                    Subject Header
                  </label>
                  <input
                    type="text"
                    required
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    placeholder="e.g. Systems Architecture Query"
                    className="w-full px-3 py-2 rounded border border-black/10 bg-white/60 font-mono text-xs text-black focus:outline-none focus:border-black/35 focus:ring-1 focus:ring-black/10 transition"
                  />
                </div>

                <div className="space-y-1">
                  <label className="block font-mono text-[10px] uppercase text-gray-500 font-bold tracking-wider">
                    Message Body
                  </label>
                  <textarea
                    required
                    rows={4}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Write your transmission details here..."
                    className="w-full px-3 py-2 rounded border border-black/10 bg-white/60 font-mono text-xs text-black focus:outline-none focus:border-black/35 focus:ring-1 focus:ring-black/10 transition resize-none"
                  />
                </div>

                {error && (
                  <p className="text-red-600 font-mono text-[10px] uppercase tracking-wider">
                    [ERROR] {error}
                  </p>
                )}

                <button
                  type="submit"
                  disabled={isSending}
                  className="w-full py-3 rounded bg-[#f4f1ea] hover:bg-[#e3dac9] disabled:bg-[#f4f1ea]/50 text-black font-cyber font-bold tracking-widest text-xs transition duration-300 hover:shadow-[0_4px_12px_rgba(0,0,0,0.06)] mt-2 disabled:cursor-not-allowed"
                >
                  {isSending ? "DISPATCHING TRANSMISSION..." : "DISPATCH TRANSMISSION"}
                </button>
              </form>
            ) : (
              <div className="space-y-6 py-4 text-left font-mono">
                <div className="space-y-2 border-l-2 border-emerald-600 pl-4 py-1">
                  <p className="text-emerald-700 text-xs font-bold uppercase tracking-wider">
                    [SYSTEM] TRANSMISSION STATUS: DISPATCHED
                  </p>
                  <p className="text-gray-600 text-[11px] leading-relaxed">
                    Your message has been processed and sent successfully.
                  </p>
                </div>

                <div className="space-y-2 bg-black/5 p-4 rounded text-[11px] text-gray-600 leading-relaxed font-mono">
                  <p className="font-bold text-black border-b border-black/10 pb-1 uppercase">
                    Transmission Log:
                  </p>
                  <p><span className="text-black font-bold">ROUTE:</span> {profile.email}</p>
                  <p><span className="text-black font-bold">SUBJECT:</span> {subject}</p>
                  <p><span className="text-black font-bold">STATUS:</span> SENT_SUCCESSFULLY</p>
                </div>

                <button
                  onClick={handleReset}
                  className="w-full py-3 rounded bg-[#f4f1ea] hover:bg-[#e3dac9] text-black font-cyber font-bold tracking-widest text-xs transition duration-300 hover:shadow-[0_4px_12px_rgba(0,0,0,0.06)]"
                >
                  CLOSE INTERFACE
                </button>
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
