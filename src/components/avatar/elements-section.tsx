"use client";

import * as React from "react";
import { SectionHeader, SectionDivider } from "./section-header";
import { cn } from "@/lib/utils";
import { ELEMENTS, type ElementId } from "@/lib/avatar-data";

const ELEMENTS_BY_ID: Record<string, string> = {
  air: "var(--air)",
  water: "var(--water)",
  earth: "var(--earth)",
  fire: "var(--fire)",
};

export function ElementsSection() {
  const [active, setActive] = React.useState<ElementId>("water");
  const activeInfo = ELEMENTS.find((e) => e.id === active)!;
  const color = ELEMENTS_BY_ID[active];

  return (
    <section
      id="elements"
      className="scroll-mt-20 border-y border-border/50 bg-card/20 py-16 sm:py-20"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <SectionHeader
          eyebrow="The Four Elements"
          title="Water · Earth · Fire · Air"
          description="The Avatar alone can master all four. Explore the philosophy, sub-skills, and nations of each bending art."
        />
        <SectionDivider />

        {/* Element selector */}
        <div className="mt-6 flex flex-wrap gap-2">
          {ELEMENTS.map((e) => {
            const isActive = active === e.id;
            return (
              <button
                key={e.id}
                onClick={() => setActive(e.id)}
                className={cn(
                  "press-aa group inline-flex items-center gap-2 rounded-full border px-4 py-2 font-serif text-xs uppercase tracking-[0.18em] transition-all",
                  isActive
                    ? "border-transparent text-white"
                    : "border-border bg-background/40 text-muted-foreground hover:text-foreground"
                )}
                style={
                  isActive
                    ? { backgroundColor: ELEMENTS_BY_ID[e.id] }
                    : undefined
                }
              >
                <img
                  src={`/images/${e.id}.png`}
                  alt=""
                  className="h-4 w-4 object-contain"
                  style={{ filter: isActive ? "brightness(0) invert(1)" : `drop-shadow(0 0 4px ${ELEMENTS_BY_ID[e.id]})` }}
                />
                {e.name}
              </button>
            );
          })}
        </div>

        <div className="mt-8 grid gap-6 lg:grid-cols-[1.1fr_1fr]">
          {/* Big visual */}
          <div
            className="card-aa relative overflow-hidden rounded-lg p-8"
            style={{
              background: `radial-gradient(circle at 30% 20%, ${activeInfo.glow}, transparent 60%), linear-gradient(160deg, var(--card) 0%, var(--deep) 100%)`,
            }}
          >
            <div className="flex items-start justify-between">
              <div>
                <p className="font-body-aa text-[0.65rem] uppercase tracking-[0.3em] text-muted-foreground">
                  {activeInfo.season} · {activeInfo.direction}
                </p>
                <h3
                  className="font-display mt-1 text-4xl font-bold"
                  style={{ color }}
                >
                  {activeInfo.name}
                </h3>
              </div>
              <img
                src={`/images/${activeInfo.id}.png`}
                alt={activeInfo.name}
                className="h-20 w-20 object-contain"
                style={{ filter: `drop-shadow(0 0 12px ${color})` }}
              />
            </div>

            <p className="font-body-aa mt-6 text-sm leading-relaxed text-foreground/90">
              {activeInfo.description}
            </p>

            <p className="font-body-aa mt-5 text-sm italic" style={{ color }}>
              {activeInfo.philosophy}
            </p>
          </div>

          {/* Sub-skills + nations */}
          <div className="flex flex-col gap-4">
            <div className="card-aa rounded-lg p-5">
              <h4 className="font-serif mb-3 text-[0.65rem] uppercase tracking-[0.25em] text-muted-foreground">
                Sub-Skills
              </h4>
              <div className="flex flex-wrap gap-2">
                {activeInfo.subSkills.map((s) => (
                  <span
                    key={s}
                    className="rounded-full border px-3 py-1 font-body-aa text-xs"
                    style={{ color, borderColor: `${color}44` }}
                  >
                    {s}
                  </span>
                ))}
              </div>
            </div>

            <div className="card-aa rounded-lg p-5">
              <h4 className="font-serif mb-3 text-[0.65rem] uppercase tracking-[0.25em] text-muted-foreground">
                Nations & Locations
              </h4>
              <div className="flex flex-col gap-2">
                {activeInfo.nations.map((n) => (
                  <div
                    key={n}
                    className="flex items-center gap-3 rounded-md border border-border/60 bg-background/40 px-3 py-2 font-body-aa text-sm"
                  >
                    <span className="h-2 w-2 rounded-full" style={{ backgroundColor: color }} />
                    {n}
                  </div>
                ))}
              </div>
            </div>

            <div className="card-aa rounded-lg p-5">
              <h4 className="font-serif mb-3 text-[0.65rem] uppercase tracking-[0.25em] text-muted-foreground">
                Notable Benders
              </h4>
              <div className="flex flex-wrap gap-2">
                {activeInfo.notableBenders.map((b) => (
                  <span
                    key={b}
                    className="rounded-md bg-secondary/60 px-2.5 py-1 font-body-aa text-sm text-secondary-foreground"
                  >
                    {b}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
