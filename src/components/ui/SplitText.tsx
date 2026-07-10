"use client";

import { motion, type Variants } from "framer-motion";

interface SplitTextProps {
  text: string;
  className?: string;
  /** Delay before the whole line starts animating. */
  delay?: number;
  /** Per-character stagger. */
  stagger?: number;
  /** Play immediately (hero) vs on scroll into view. */
  animateOnMount?: boolean;
}

const EASE = [0.16, 1, 0.3, 1] as const;

/**
 * Kinetic headline: each character rises from behind a mask with a stagger.
 * The signature hero reveal.
 */
export function SplitText({
  text,
  className,
  delay = 0,
  stagger = 0.035,
  animateOnMount = true,
}: SplitTextProps) {
  const words = text.split(" ");

  const container: Variants = {
    hidden: {},
    visible: {
      transition: { staggerChildren: stagger, delayChildren: delay },
    },
  };

  const char: Variants = {
    hidden: { y: "110%" },
    visible: { y: 0, transition: { duration: 0.9, ease: EASE } },
  };

  const animateProps = animateOnMount
    ? { animate: "visible" as const }
    : { whileInView: "visible" as const, viewport: { once: true, amount: 0.5 } };

  return (
    <motion.span
      className={className}
      // inline (not inline-block) so long lines wrap across the container
      variants={container}
      initial="hidden"
      {...animateProps}
      aria-label={text}
    >
      {words.map((word, wi) => (
        <span key={wi}>
          <span
            style={{ display: "inline-block", overflow: "hidden", verticalAlign: "top" }}
            aria-hidden
          >
            {word.split("").map((c, ci) => (
              <motion.span key={ci} variants={char} style={{ display: "inline-block" }}>
                {c}
              </motion.span>
            ))}
          </span>
          {/* breakable space between words so the line can wrap */}
          {wi < words.length - 1 && " "}
        </span>
      ))}
    </motion.span>
  );
}
