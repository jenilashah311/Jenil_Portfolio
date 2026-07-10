"use client";

import { motion, useScroll, useTransform, type MotionValue } from "framer-motion";

/**
 * Fixed backdrop that crossfades from the light "HUD" world (hero) into a
 * dark cinematic world (deep-dive). `darkness` (0 = light, 1 = dark) is driven
 * by the page as the dark region scrolls into view. Parallax comes from the
 * window scroll directly.
 */
export function ThemeBackdrop({ darkness }: { darkness: MotionValue<number> }) {
  const { scrollY } = useScroll();

  // Parallax drifts for the light blobs.
  const blob1Y = useTransform(scrollY, [0, 2000], [0, 300]);
  const blob2Y = useTransform(scrollY, [0, 2000], [0, -200]);
  const blob3Y = useTransform(scrollY, [0, 2000], [0, 120]);

  // Base color interpolates from mint → near-black.
  const background = useTransform(
    darkness,
    [0, 0.5, 1],
    ["#d0e6dd", "#3b4a52", "#050507"]
  );

  const lightOpacity = useTransform(darkness, [0, 0.7], [1, 0]);
  const darkOpacity = useTransform(darkness, [0.25, 1], [0, 1]);

  return (
    <motion.div className="fixed inset-0 -z-10 overflow-hidden" style={{ background }}>
      {/* ---------- LIGHT WORLD ---------- */}
      <motion.div className="absolute inset-0" style={{ opacity: lightOpacity }}>
        <motion.div
          className="absolute top-[-10%] left-[-10%] h-[50vw] w-[50vw] rounded-full bg-[#f4f1ea]/45 blur-[130px]"
          style={{ y: blob1Y, scale: 1.1 }}
        />
        <motion.div
          className="absolute bottom-[-15%] right-[-10%] h-[60vw] w-[60vw] rounded-full bg-[#e3dac9]/40 blur-[150px]"
          style={{ y: blob2Y, scale: 1.2 }}
        />
        <motion.div
          className="absolute top-[40%] right-[15%] h-[35vw] w-[35vw] rounded-full bg-[#b5cfc4]/55 blur-[110px]"
          style={{ y: blob3Y, scale: 0.9 }}
        />
        <div className="absolute top-[10%] left-[10%] h-[55vw] w-[55vw] rounded-full bg-black/[0.10] blur-[150px]" />
      </motion.div>

      {/* ---------- DARK WORLD ---------- */}
      <motion.div className="absolute inset-0" style={{ opacity: darkOpacity }}>
        {/* Fine cyber grid that glows against the dark */}
        <div
          className="absolute inset-0 opacity-[0.5]"
          style={{
            backgroundImage: `linear-gradient(rgba(0,245,212,0.05) 1px, transparent 1px),
              linear-gradient(90deg, rgba(0,245,212,0.05) 1px, transparent 1px)`,
            backgroundSize: "60px 60px",
            maskImage: "radial-gradient(ellipse at center, black 30%, transparent 78%)",
            WebkitMaskImage: "radial-gradient(ellipse at center, black 30%, transparent 78%)",
          }}
        />
        {/* Aurora glows */}
        <motion.div
          className="absolute top-[15%] left-[-5%] h-[45vw] w-[45vw] rounded-full bg-[#00f5d4]/[0.07] blur-[140px]"
          style={{ y: blob1Y }}
        />
        <motion.div
          className="absolute bottom-[-10%] right-[-5%] h-[50vw] w-[50vw] rounded-full bg-[#3c4f76]/25 blur-[150px]"
          style={{ y: blob2Y }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/60" />
      </motion.div>

      {/* Grain sits over both worlds */}
      <div className="noise-overlay absolute inset-0 opacity-100" />
    </motion.div>
  );
}
