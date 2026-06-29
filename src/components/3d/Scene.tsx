"use client";

import { useEffect, useState } from "react";

export function Scene() {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Compute translation based on scroll for scroll-driven movement
  const blob1Y = scrollY * 0.15;
  const blob2Y = -scrollY * 0.1;
  const blob3Y = scrollY * 0.05;
  const blackBlob1Y = -scrollY * 0.22;
  const blackBlob2Y = scrollY * 0.16;

  return (
    <div className="fixed inset-0 -z-10 h-screen w-screen overflow-hidden bg-[#d0e6dd]">
      {/* Organic premium blurred blobs - steady when not scrolling, moving only on scroll */}
      <div
        className="absolute top-[-10%] left-[-10%] w-[50vw] h-[50vw] rounded-full bg-[#f4f1ea]/45 blur-[130px] transition-transform duration-500 ease-out"
        style={{
          transform: `translate3d(0px, ${blob1Y}px, 0px) scale(1.1)`
        }}
      />
      <div
        className="absolute bottom-[-15%] right-[-10%] w-[60vw] h-[60vw] rounded-full bg-[#e3dac9]/35 blur-[150px] transition-transform duration-500 ease-out"
        style={{
          transform: `translate3d(0px, ${blob2Y}px, 0px) scale(1.2)`
        }}
      />
      <div
        className="absolute top-[40%] right-[15%] w-[35vw] h-[35vw] rounded-full bg-[#b5cfc4]/55 blur-[110px] transition-transform duration-500 ease-out"
        style={{
          transform: `translate3d(0px, ${blob3Y}px, 0px) scale(0.9)`
        }}
      />

      {/* Upper-left black ambient blob - moves up on scroll, steady when not scrolling */}
      <div
        className="absolute top-[10%] left-[10%] w-[55vw] h-[55vw] rounded-full bg-black/[0.12] blur-[150px] transition-transform duration-500 ease-out pointer-events-none"
        style={{
          transform: `translate3d(0px, ${blackBlob1Y}px, 0px) scale(1)`
        }}
      />

      {/* Lower-right black ambient blob - moves down on scroll, steady when not scrolling */}
      <div
        className="absolute bottom-[10%] right-[10%] w-[45vw] h-[45vw] rounded-full bg-black/[0.10] blur-[130px] transition-transform duration-500 ease-out pointer-events-none"
        style={{
          transform: `translate3d(0px, ${blackBlob2Y}px, 0px) scale(1)`
        }}
      />

      {/* HUD-style scroll-driven decorative micro-objects */}
      <div
        className="absolute top-[15%] left-[8%] text-black/15 font-mono text-[10px] tracking-widest select-none pointer-events-none transition-transform duration-500 ease-out"
        style={{ transform: `translate3d(0px, ${scrollY * 0.35}px, 0px)` }}
      >
        + SYS.LOC_01
      </div>
      <div
        className="absolute top-[35%] right-[12%] text-black/15 font-mono text-[9px] tracking-wider select-none pointer-events-none transition-transform duration-500 ease-out"
        style={{ transform: `translate3d(0px, ${-scrollY * 0.25}px, 0px)` }}
      >
        [NODE.SYS_ACC] ◽
      </div>
      <div
        className="absolute top-[60%] left-[15%] text-black/15 font-mono text-[10px] select-none pointer-events-none transition-transform duration-500 ease-out"
        style={{ transform: `translate3d(0px, ${scrollY * 0.42}px, 0px)` }}
      >
        ⌖ 45.398 // -122.902
      </div>
      <div
        className="absolute top-[80%] right-[10%] text-black/15 font-mono text-[9px] tracking-widest select-none pointer-events-none transition-transform duration-500 ease-out"
        style={{ transform: `translate3d(0px, ${-scrollY * 0.3}px, 0px)` }}
      >
        + SYS.BOOT_OK
      </div>
      <div
        className="absolute top-[5%] right-[25%] text-black/15 font-mono text-[11px] select-none pointer-events-none transition-transform duration-500 ease-out"
        style={{ transform: `translate3d(0px, ${scrollY * 0.2}px, 0px)` }}
      >
        +
      </div>
      <div
        className="absolute bottom-[25%] left-[20%] text-black/15 font-mono text-[11px] select-none pointer-events-none transition-transform duration-500 ease-out"
        style={{ transform: `translate3d(0px, ${-scrollY * 0.38}px, 0px)` }}
      >
        +
      </div>
    </div>
  );
}
