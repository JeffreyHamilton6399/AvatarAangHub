"use client";

import { ArrowDown, Compass, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ParticleCanvas } from "./particle-canvas";
import { ElementSymbol } from "./element-symbol";
import type { ElementId } from "@/lib/avatar-data";

const RING: { el: ElementId; label: string }[] = [
  { el: "air", label: "Air" },
  { el: "water", label: "Water" },
  { el: "earth", label: "Earth" },
  { el: "fire", label: "Fire" },
];

export function Hero() {
  const explore = () =>
    document.getElementById("series")?.scrollIntoView({ behavior: "smooth" });

  return (
    <section className="relative isolate flex min-h-[92vh] items-center overflow-hidden">
      {/* Particle layer */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <ParticleCanvas className="h-full w-full opacity-80" />
      </div>

      {/* Radial glows */}
      <div className="pointer-events-none absolute inset-0 -z-20">
        <div className="absolute left-1/4 top-1/3 h-[42rem] w-[42rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/15 blur-[120px]" />
        <div className="absolute right-1/4 bottom-1/4 h-[34rem] w-[34rem] translate-x-1/2 rounded-full bg-primary/10 blur-[120px]" />
      </div>

      {/* World map motif */}
      <div className="pointer-events-none absolute inset-0 -z-20 flex items-center justify-center">
        <div className="aa-spin-slow relative h-[120vmin] w-[120vmin] opacity-[0.06]">
          <div className="absolute inset-0 rounded-full border-2 border-foreground" />
          <div className="absolute inset-[12%] rounded-full border border-foreground" />
          <div className="absolute inset-[28%] rounded-full border border-foreground" />
          <div className="absolute left-1/2 top-0 h-full w-px -translate-x-1/2 bg-foreground/60" />
          <div className="absolute top-1/2 left-0 w-full h-px -translate-y-1/2 bg-foreground/60" />
        </div>
      </div>

      <div className="mx-auto w-full max-w-5xl px-4 py-24 text-center sm:px-6">
        <div className="aa-float-up mb-8 flex justify-center">
          {/* Element ring emblem */}
          <div className="relative h-32 w-32 sm:h-40 sm:w-40">
            <div className="aa-spin-slow absolute inset-0">
              {RING.map((r, i) => {
                const angle = (i / RING.length) * Math.PI * 2 - Math.PI / 2;
                const radius = 46;
                const x = 50 + Math.cos(angle) * radius;
                const y = 50 + Math.sin(angle) * radius;
                const colorClass =
                  r.el === "air"
                    ? "text-element-air"
                    : r.el === "water"
                      ? "text-element-water"
                      : r.el === "earth"
                        ? "text-element-earth"
                        : "text-element-fire";
                return (
                  <span
                    key={r.el}
                    className={`absolute flex h-10 w-10 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border bg-card/80 backdrop-blur ${colorClass}`}
                    style={{
                      left: `${x}%`,
                      top: `${y}%`,
                      borderColor: "var(--aa-accent)",
                      boxShadow: "0 0 18px -4px var(--aa-glow)",
                    }}
                  >
                    <span className="h-6 w-6">
                      <ElementSymbol element={r.el} strokeWidth={2.2} />
                    </span>
                    <span className="sr-only">{r.label}</span>
                  </span>
                );
              })}
            </div>
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="aa-pulse-glow flex h-14 w-14 items-center justify-center rounded-full border border-primary/50 bg-card/80 text-primary backdrop-blur sm:h-16 sm:w-16">
                <span className="h-8 w-8 sm:h-9 sm:w-9">
                  <ElementSymbol element="spirit" strokeWidth={2} />
                </span>
              </span>
            </div>
          </div>
        </div>

        <p className="aa-float-up mb-4 inline-flex items-center gap-2 rounded-full border border-border/60 bg-card/50 px-4 py-1.5 text-xs uppercase tracking-[0.25em] text-muted-foreground backdrop-blur">
          <Sparkles className="h-3.5 w-3.5 text-primary" />
          A fan-made archive
        </p>

        <h1
          className="aa-float-up text-glow text-balance text-5xl font-bold leading-[0.95] tracking-tight sm:text-7xl lg:text-8xl"
          style={{ animationDelay: "60ms" }}
        >
          AvatarArchive
        </h1>

        <p
          className="aa-float-up mx-auto mt-6 max-w-2xl text-pretty text-base text-muted-foreground sm:text-lg"
          style={{ animationDelay: "120ms" }}
        >
          The entire Avatar universe — every series, every Avatar, every bending
          art — gathered into one fan-built hub. Wander the Four Nations,
          explore the chronology, and meet the characters who shaped the world.
        </p>

        <div
          className="aa-float-up mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row"
          style={{ animationDelay: "180ms" }}
        >
          <Button
            size="lg"
            onClick={explore}
            className="group gap-2 rounded-full px-6 ring-glow"
          >
            <Compass className="h-4 w-4 transition-transform group-hover:rotate-45" />
            Explore the Archive
          </Button>
          <Button
            size="lg"
            variant="outline"
            onClick={() =>
              document
                .getElementById("timeline")
                ?.scrollIntoView({ behavior: "smooth" })
            }
            className="gap-2 rounded-full border-border/60 bg-background/40 backdrop-blur"
          >
            View the Timeline
            <ArrowDown className="h-4 w-4" />
          </Button>
        </div>

        <div
          className="aa-float-up mt-16 flex flex-wrap items-center justify-center gap-x-8 gap-y-3 text-xs uppercase tracking-[0.2em] text-muted-foreground"
          style={{ animationDelay: "240ms" }}
        >
          <span>113+ Episodes</span>
          <span className="h-1 w-1 rounded-full bg-primary/60" />
          <span>18 Graphic Novels</span>
          <span className="h-1 w-1 rounded-full bg-primary/60" />
          <span>15 Characters</span>
          <span className="h-1 w-1 rounded-full bg-primary/60" />
          <span>10,000+ Years of Lore</span>
        </div>
      </div>
    </section>
  );
}
