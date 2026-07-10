"use client";

import { motion, type Variants } from "framer-motion";
import type { ReactNode } from "react";

type Direction = "up" | "down" | "left" | "right" | "none";

interface RevealProps {
  children: ReactNode;
  className?: string;
  direction?: Direction;
  delay?: number;
  duration?: number;
  distance?: number;
  /** Masked "wipe" reveal — content slides up from behind an overflow-clip (Zipline-style). */
  mask?: boolean;
  once?: boolean;
  amount?: number;
  /** Play immediately on mount instead of waiting to scroll into view. */
  animateOnMount?: boolean;
  as?: "div" | "span" | "li" | "h1" | "h2" | "h3" | "p";
}

const EASE = [0.16, 1, 0.3, 1] as const; // expo-out, the premium easing

function offset(direction: Direction, distance: number) {
  switch (direction) {
    case "up":
      return { y: distance };
    case "down":
      return { y: -distance };
    case "left":
      return { x: distance };
    case "right":
      return { x: -distance };
    default:
      return {};
  }
}

export function Reveal({
  children,
  className,
  direction = "up",
  delay = 0,
  duration = 0.9,
  distance = 40,
  mask = false,
  once = true,
  amount = 0.3,
  animateOnMount = false,
  as = "div",
}: RevealProps) {
  const variants: Variants = {
    hidden: { opacity: 0, ...offset(direction, distance) },
    visible: {
      opacity: 1,
      x: 0,
      y: 0,
      transition: { duration, ease: EASE, delay },
    },
  };

  const MotionTag = motion[as] as typeof motion.div;

  const playProps = animateOnMount
    ? { animate: "visible" as const }
    : { whileInView: "visible" as const, viewport: { once, amount } };

  const inner = (
    <MotionTag className={className} variants={variants} initial="hidden" {...playProps}>
      {children}
    </MotionTag>
  );

  if (mask) {
    return <span className="block overflow-hidden">{inner}</span>;
  }
  return inner;
}
