"use client";

import { useRef, useState } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";

interface GlassPanelProps {
  id: string;
  title: string;
  icon?: string;
  children: React.ReactNode;
  onClick?: () => void;
  isExpanded?: boolean;
  className?: string;
  accentColor?: string;
}

export function GlassPanel({
  id,
  title,
  icon,
  children,
  onClick,
  isExpanded = false,
  className = "",
  accentColor = "var(--neon-cyan)",
}: GlassPanelProps) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springConfig = { damping: 25, stiffness: 200 };
  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [8, -8]), springConfig);
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-8, 8]), springConfig);
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!ref.current || isExpanded) return;
    const rect = ref.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const relX = (e.clientX - centerX) / rect.width;
    const relY = (e.clientY - centerY) / rect.height;
    x.set(relX);
    y.set(relY);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
    setIsHovered(false);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
      className={`cursor-pointer rounded-2xl border transition-all duration-300 ${className}`}
      style={{
        background: "rgba(10, 12, 24, 0.6)",
        backdropFilter: "blur(20px)",
        borderColor: isHovered || isExpanded ? `${accentColor}40` : "rgba(0,245,212,0.12)",
        boxShadow: isHovered || isExpanded ? `0 0 30px ${accentColor}20` : "none",
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
        perspective: 800,
      }}
      whileHover={!isExpanded ? { scale: 1.02 } : {}}
      whileTap={{ scale: 0.98 }}
    >
      <div
        className="relative overflow-hidden rounded-2xl p-5"
        style={{ transform: "translateZ(20px)" }}
      >
        <div
          className="absolute inset-0 rounded-2xl opacity-50"
          style={{
            background: `linear-gradient(135deg, ${accentColor}08 0%, transparent 50%)`,
          }}
        />
        <div className="relative flex items-center gap-3">
          {icon && (
            <span className="text-2xl opacity-80" style={{ color: accentColor }}>
              {icon}
            </span>
          )}
          <h3
            className="text-lg font-semibold tracking-wide"
            style={{ color: accentColor }}
          >
            {title}
          </h3>
        </div>
        <div className="mt-3 text-sm text-gray-400">{children}</div>
      </div>
    </motion.div>
  );
}
