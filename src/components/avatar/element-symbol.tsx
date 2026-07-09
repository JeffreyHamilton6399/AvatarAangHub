import { cn } from "@/lib/utils";
import type { ElementId } from "@/lib/avatar-data";

interface ElementSymbolProps {
  element: ElementId;
  className?: string;
  strokeWidth?: number;
}

/**
 * Stylized, fan-made geometric marks evoking each of the four bending arts.
 * These are original abstract swirls, not the official trademarked symbols.
 */
export function ElementSymbol({
  element,
  className,
  strokeWidth = 2,
}: ElementSymbolProps) {
  const common = {
    className: cn("h-full w-full", className),
    viewBox: "0 0 100 100",
    fill: "none",
    stroke: "currentColor",
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    strokeWidth,
  };

  switch (element) {
    case "air":
      // Three-tailed counter-clockwise swirl
      return (
        <svg {...common} aria-hidden="true">
          <path d="M50 50 m-26 0 a26 26 0 1 1 52 0" opacity="0.35" />
          <path d="M50 50 m-26 0 a26 26 0 0 1 48 -14" />
          <path d="M74 36 q14 6 4 22" />
          <path d="M50 50 q22 -2 26 -22" />
          <path d="M50 50 q-4 -24 18 -32" />
          <circle cx="50" cy="50" r="3.5" fill="currentColor" stroke="none" />
        </svg>
      );
    case "water":
      // Twin curling waves
      return (
        <svg {...common} aria-hidden="true">
          <path d="M16 58 q12 -22 26 -8 t26 -2 t16 6" opacity="0.4" />
          <path d="M16 62 q14 -20 28 -6 t26 0" />
          <path d="M84 60 q-10 16 -24 6" />
          <path d="M16 62 q-4 16 12 18" />
        </svg>
      );
    case "earth":
      // Hexagonal coil
      return (
        <svg {...common} aria-hidden="true">
          <path d="M50 18 L78 34 L78 66 L50 82 L22 66 L22 34 Z" opacity="0.4" />
          <path d="M50 30 L66 39 L66 61 L50 70 L34 61 L34 39 Z" />
          <path d="M50 30 q-8 20 0 40" />
          <path d="M50 70 q8 -20 0 -40" opacity="0.5" />
        </svg>
      );
    case "fire":
      // Flame swirl
      return (
        <svg {...common} aria-hidden="true">
          <path d="M50 16 q18 22 18 38 a18 18 0 1 1 -36 0 q0 -10 8 -18 q-2 12 8 14 q4 -16 -4 -28 q8 4 12 14 q-2 -12 -6 -20 z" />
          <path d="M50 60 q6 4 6 12 a6 6 0 1 1 -12 0 q0 -6 6 -12 z" opacity="0.5" />
        </svg>
      );
    case "spirit":
      return (
        <svg {...common} aria-hidden="true">
          <circle cx="50" cy="50" r="30" opacity="0.4" />
          <path d="M50 20 q20 30 0 60 q-20 -30 0 -60 z" />
          <circle cx="50" cy="50" r="4" fill="currentColor" stroke="none" />
        </svg>
      );
    case "none":
    default:
      return (
        <svg {...common} aria-hidden="true">
          <circle cx="50" cy="50" r="28" opacity="0.4" />
          <path d="M30 50 L70 50 M50 30 L50 70" />
        </svg>
      );
  }
}
