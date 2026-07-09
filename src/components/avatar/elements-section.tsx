"use client";

import * as React from "react";
import { Compass, Leaf, Flame, Wind, Droplet } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { ELEMENTS, type ElementId } from "@/lib/avatar-data";
import { ElementSymbol } from "./element-symbol";

const ICONS: Record<string, React.ElementType> = {
  water: Droplet,
  earth: Leaf,
  fire: Flame,
  air: Wind,
};

const elementBg: Record<ElementId, string> = {
  air: "bg-element-air",
  water: "bg-element-water",
  earth: "bg-element-earth",
  fire: "bg-element-fire",
  spirit: "bg-element-spirit",
  none: "bg-element-none",
};

const elementText: Record<ElementId, string> = {
  air: "text-element-air",
  water: "text-element-water",
  earth: "text-element-earth",
  fire: "text-element-fire",
  spirit: "text-element-spirit",
  none: "text-element-none",
};

export function ElementsSection() {
  const [active, setActive] = React.useState<ElementId>("water");
  const activeInfo = ELEMENTS.find((e) => e.id === active)!;

  return (
    <section
      id="elements"
      className="scroll-mt-20 border-y border-border/40 bg-card/30 py-20 sm:py-28"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="mb-10 max-w-2xl">
          <p className="mb-2 text-xs uppercase tracking-[0.3em] text-primary">
            The Four Elements
          </p>
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Water · Earth · Fire · Air
          </h2>
          <p className="mt-3 text-muted-foreground">
            The Avatar alone can master all four. Explore the philosophy, sub-skills,
            and nations of each bending art.
          </p>
        </div>

        {/* Element selector */}
        <div className="mb-8 flex flex-wrap gap-2">
          {ELEMENTS.map((e) => {
            const Icon = ICONS[e.id] ?? Compass;
            const isActive = active === e.id;
            return (
              <button
                key={e.id}
                onClick={() => setActive(e.id)}
                className={cn(
                  "group inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-medium transition-all",
                  isActive
                    ? "border-transparent text-white shadow-lg"
                    : "border-border/60 bg-background/40 text-muted-foreground hover:text-foreground"
                )}
                style={
                  isActive
                    ? { backgroundColor: e.color, boxShadow: `0 8px 30px -8px ${e.glow}` }
                    : undefined
                }
              >
                <Icon className="h-4 w-4" />
                {e.name}
              </button>
            );
          })}
        </div>

        <div className="grid gap-6 lg:grid-cols-[1.1fr_1fr]">
          {/* Big visual */}
          <Card
            className="relative overflow-hidden rounded-3xl border-border/60 p-8"
            style={{
              background: `radial-gradient(circle at 30% 20%, ${activeInfo.glow}, transparent 60%), var(--card)`,
            }}
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs uppercase tracking-[0.25em] text-muted-foreground">
                  {activeInfo.season} · {activeInfo.direction}
                </p>
                <h3 className="mt-1 text-4xl font-bold" style={{ color: activeInfo.color }}>
                  {activeInfo.name}
                </h3>
              </div>
              <span
                className={cn(
                  "flex h-24 w-24 items-center justify-center rounded-full border",
                  elementText[activeInfo.id]
                )}
                style={{ borderColor: activeInfo.color }}
              >
                <span className="h-14 w-14">
                  <ElementSymbol element={activeInfo.id} strokeWidth={1.8} />
                </span>
              </span>
            </div>

            <p className="mt-6 text-pretty text-sm leading-relaxed text-foreground/90">
              {activeInfo.description}
            </p>

            <p className="mt-5 text-sm font-medium" style={{ color: activeInfo.color }}>
              Philosophy — {activeInfo.philosophy}
            </p>
          </Card>

          {/* Sub-skills + nations */}
          <div className="flex flex-col gap-6">
            <Card className="rounded-3xl border-border/60 p-6">
              <h4 className="mb-3 text-xs uppercase tracking-[0.25em] text-muted-foreground">
                Sub-Skills
              </h4>
              <div className="flex flex-wrap gap-2">
                {activeInfo.subSkills.map((s) => (
                  <Badge
                    key={s}
                    variant="outline"
                    className="rounded-full border-border/60 py-1.5"
                    style={{ color: activeInfo.color, borderColor: `${activeInfo.color}55` }}
                  >
                    {s}
                  </Badge>
                ))}
              </div>

              <h4 className="mb-3 mt-6 text-xs uppercase tracking-[0.25em] text-muted-foreground">
                Nations & Locations
              </h4>
              <div className="flex flex-col gap-2">
                {activeInfo.nations.map((n) => (
                  <div
                    key={n}
                    className="flex items-center gap-3 rounded-xl border border-border/50 bg-background/40 px-4 py-2.5 text-sm"
                  >
                    <span className={cn("h-2 w-2 rounded-full", elementBg[activeInfo.id])} />
                    {n}
                  </div>
                ))}
              </div>
            </Card>

            <Card className="rounded-3xl border-border/60 p-6">
              <h4 className="mb-3 text-xs uppercase tracking-[0.25em] text-muted-foreground">
                Notable Benders
              </h4>
              <div className="flex flex-wrap gap-2">
                {activeInfo.notableBenders.map((b) => (
                  <span
                    key={b}
                    className="rounded-lg bg-secondary/70 px-3 py-1.5 text-sm text-secondary-foreground"
                  >
                    {b}
                  </span>
                ))}
              </div>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}
