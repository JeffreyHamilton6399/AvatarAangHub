"use client";

import * as React from "react";

const ELEMENTS = [
  { src: "/images/air.png", alt: "Air", color: "var(--air)", delay: "0s" },
  { src: "/images/water.png", alt: "Water", color: "var(--water)", delay: "0.5s" },
  { src: "/images/earth.png", alt: "Earth", color: "var(--earth)", delay: "1s" },
  { src: "/images/fire.png", alt: "Fire", color: "var(--fire)", delay: "1.5s" },
];

const MIN_DISPLAY = 1600; // always show for at least this long

/**
 * Loading screen with 4 pulsing element icons.
 * Shows on every page load for a brief moment, then fades out.
 */
export function LoadingScreen() {
  const [show, setShow] = React.useState(true);
  const [leaving, setLeaving] = React.useState(false);

  React.useEffect(() => {
    const start = Date.now();
    const finish = () => {
      const elapsed = Date.now() - start;
      const remaining = Math.max(0, MIN_DISPLAY - elapsed);
      setTimeout(() => {
        setLeaving(true);
        setTimeout(() => setShow(false), 500);
      }, remaining);
    };
    // Always show for the minimum display time
    const timer = setTimeout(finish, MIN_DISPLAY);
    return () => clearTimeout(timer);
  }, []);

  if (!show) return null;

  return (
    <div
      className="fixed inset-0 z-[9998] flex flex-col items-center justify-center"
      style={{
        background: "radial-gradient(ellipse at 50% 40%, #071220 0%, #04070d 65%)",
        fontFamily: "var(--font-cinzel), Georgia, serif",
        ...(leaving
          ? { animation: "aa-load-out 0.5s cubic-bezier(.4,0,1,1) both", pointerEvents: "none" }
          : { animation: "aa-fade-in 0.4s ease both" }),
      }}
    >
      <style>{`
        @keyframes aa-load-out { to { opacity: 0; } }
      `}</style>

      {/* 4 element symbols */}
      <div className="flex items-center gap-[clamp(1.5rem,5vw,3.5rem)]">
        {ELEMENTS.map((el) => (
          <img
            key={el.alt}
            src={el.src}
            alt={el.alt}
            className="h-[clamp(2rem,6vw,3.5rem)] w-[clamp(2rem,6vw,3.5rem)] object-contain opacity-90"
            style={{ animation: `aa-pulse-glow 2.8s ease-in-out infinite ${el.delay}`, color: el.color }}
          />
        ))}
      </div>
    </div>
  );
}
