"use client";

import { useEffect, useRef } from "react";
import type { ElementId } from "@/lib/avatar-data";

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  rotation: number;
  vr: number;
  element: ElementId;
  alpha: number;
  mode: "orbit" | "wave" | "drift";
  t: number;
}

const ELEMENT_COLORS: Record<ElementId, string> = {
  air: "#f59e0b",
  water: "#2da6f4",
  earth: "#7cb342",
  fire: "#ef4444",
  spirit: "#a855f7",
  none: "#94a3b8",
};

/** Draws a tiny stylized bending mark for a particle. */
function drawMark(ctx: CanvasRenderingContext2D, el: ElementId, r: number) {
  ctx.lineWidth = Math.max(1, r * 0.18);
  switch (el) {
    case "air":
      ctx.beginPath();
      ctx.arc(0, 0, r * 0.6, 0.4, Math.PI * 1.9);
      ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(r * 0.2, r * 0.6);
      ctx.quadraticCurveTo(r, 0, r * 0.2, -r * 0.6);
      ctx.stroke();
      break;
    case "water":
      ctx.beginPath();
      ctx.moveTo(-r, 0);
      ctx.quadraticCurveTo(-r * 0.4, -r, 0, 0);
      ctx.quadraticCurveTo(r * 0.4, r, r, 0);
      ctx.stroke();
      break;
    case "earth":
      ctx.beginPath();
      for (let i = 0; i < 6; i++) {
        const a = (Math.PI / 3) * i - Math.PI / 2;
        const x = Math.cos(a) * r * 0.7;
        const y = Math.sin(a) * r * 0.7;
        if (i === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.closePath();
      ctx.stroke();
      break;
    case "fire":
      ctx.beginPath();
      ctx.moveTo(0, -r);
      ctx.quadraticCurveTo(r * 0.7, -r * 0.2, r * 0.4, r);
      ctx.quadraticCurveTo(0, r * 0.3, -r * 0.4, r);
      ctx.quadraticCurveTo(-r * 0.7, -r * 0.2, 0, -r);
      ctx.stroke();
      break;
    default:
      ctx.beginPath();
      ctx.arc(0, 0, r * 0.5, 0, Math.PI * 2);
      ctx.stroke();
  }
}

/**
 * Ambient drifting bending symbols rendered on a canvas.
 * Pauses when the tab is hidden. Respects reduced-motion.
 */
export function ParticleCanvas({ className }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reduce = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    let width = 0;
    let height = 0;
    let dpr = Math.min(window.devicePixelRatio || 1, 2);
    let particles: Particle[] = [];
    let raf = 0;
    let running = true;

    const elementPool: ElementId[] = ["air", "water", "earth", "fire"];

    function resize() {
      if (!canvas) return;
      const parent = canvas.parentElement;
      width = parent ? parent.clientWidth : window.innerWidth;
      height = parent ? parent.clientHeight : window.innerHeight;
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx!.setTransform(dpr, 0, 0, dpr, 0, 0);
      seed();
    }

    function seed() {
      const count = reduce
        ? 6
        : Math.max(14, Math.min(34, Math.floor((width * height) / 52000)));
      particles = Array.from({ length: count }, () => makeParticle());
    }

    function makeParticle(): Particle {
      const el =
        elementPool[Math.floor(Math.random() * elementPool.length)]!;
      const modes: Particle["mode"][] = ["orbit", "wave", "drift"];
      return {
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.25,
        vy: (Math.random() - 0.5) * 0.18,
        size: 10 + Math.random() * 22,
        rotation: Math.random() * Math.PI * 2,
        vr: (Math.random() - 0.5) * 0.01,
        element: el,
        alpha: 0.12 + Math.random() * 0.22,
        mode: modes[Math.floor(Math.random() * modes.length)]!,
        t: Math.random() * Math.PI * 2,
      };
    }

    function step() {
      if (!running) return;
      ctx!.clearRect(0, 0, width, height);
      for (const p of particles) {
        p.t += 0.01;
        if (p.mode === "orbit") {
          p.x += Math.cos(p.t * 0.6) * 0.4 + p.vx;
          p.y += Math.sin(p.t * 0.6) * 0.4 + p.vy;
        } else if (p.mode === "wave") {
          p.x += p.vx + 0.15;
          p.y += Math.sin(p.t) * 0.6;
        } else {
          p.x += p.vx;
          p.y += p.vy;
        }
        p.rotation += p.vr;

        // wrap around edges
        if (p.x < -40) p.x = width + 40;
        if (p.x > width + 40) p.x = -40;
        if (p.y < -40) p.y = height + 40;
        if (p.y > height + 40) p.y = -40;

        ctx!.save();
        ctx!.translate(p.x, p.y);
        ctx!.rotate(p.rotation);
        ctx!.globalAlpha = p.alpha;
        ctx!.strokeStyle = ELEMENT_COLORS[p.element]!;
        ctx!.shadowColor = ELEMENT_COLORS[p.element]!;
        ctx!.shadowBlur = 12;
        drawMark(ctx!, p.element, p.size * 0.5);
        ctx!.restore();
      }
      raf = requestAnimationFrame(step);
    }

    function onVisibility() {
      running = !document.hidden;
      if (running) {
        raf = requestAnimationFrame(step);
      } else {
        cancelAnimationFrame(raf);
      }
    }

    resize();
    window.addEventListener("resize", resize);
    document.addEventListener("visibilitychange", onVisibility);

    if (reduce) {
      // draw a single static frame
      running = true;
      step();
      running = false;
      cancelAnimationFrame(raf);
    } else {
      raf = requestAnimationFrame(step);
    }

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className={className}
      aria-hidden="true"
    />
  );
}
