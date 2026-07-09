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
  img: HTMLImageElement;
  loaded: boolean;
}

const ELEMENT_IMAGES: { id: ElementId; src: string }[] = [
  { id: "air", src: "/images/air.png" },
  { id: "water", src: "/images/water.png" },
  { id: "earth", src: "/images/earth.png" },
  { id: "fire", src: "/images/fire.png" },
];

/**
 * Ambient drifting element icons (the real air/water/earth/fire PNGs).
 * Pauses when the tab is hidden. Respects reduced-motion.
 */
export function ParticleCanvas({ className }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    let width = 0;
    let height = 0;
    let dpr = Math.min(window.devicePixelRatio || 1, 2);
    let particles: Particle[] = [];
    let raf = 0;
    let running = true;

    // Preload the 4 element images
    const images: Record<string, HTMLImageElement> = {};
    let imagesLoaded = 0;
    ELEMENT_IMAGES.forEach(({ id, src }) => {
      const img = new Image();
      img.onload = () => {
        imagesLoaded++;
        if (imagesLoaded === ELEMENT_IMAGES.length) seed();
      };
      img.src = src;
      images[id] = img;
    });

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
      if (imagesLoaded < ELEMENT_IMAGES.length) return;
      const count = reduce
        ? 5
        : Math.max(10, Math.min(22, Math.floor((width * height) / 75000)));
      particles = Array.from({ length: count }, () => makeParticle());
    }

    function makeParticle(): Particle {
      const el = ELEMENT_IMAGES[Math.floor(Math.random() * ELEMENT_IMAGES.length)]!;
      return {
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.2,
        vy: (Math.random() - 0.5) * 0.15,
        size: 22 + Math.random() * 28,
        rotation: Math.random() * Math.PI * 2,
        vr: (Math.random() - 0.5) * 0.008,
        element: el.id,
        alpha: 0.08 + Math.random() * 0.12,
        img: images[el.id]!,
        loaded: images[el.id]!.complete && images[el.id]!.naturalWidth > 0,
      };
    }

    function step() {
      if (!running) return;
      ctx!.clearRect(0, 0, width, height);
      for (const p of particles) {
        p.x += p.vx;
        p.y += p.vy;
        p.rotation += p.vr;

        // wrap
        if (p.x < -60) p.x = width + 60;
        if (p.x > width + 60) p.x = -60;
        if (p.y < -60) p.y = height + 60;
        if (p.y > height + 60) p.y = -60;

        if (p.loaded) {
          ctx!.save();
          ctx!.globalAlpha = p.alpha;
          ctx!.translate(p.x, p.y);
          ctx!.rotate(p.rotation);
          ctx!.drawImage(p.img, -p.size / 2, -p.size / 2, p.size, p.size);
          ctx!.restore();
        }
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

  return <canvas ref={canvasRef} className={className} aria-hidden="true" />;
}
