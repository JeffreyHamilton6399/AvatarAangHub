"use client";

import { Gamepad2, ShoppingBag, ExternalLink } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { GAMES, STORES, ELEMENT_COLOR } from "@/lib/avatar-data";
import { ElementSymbol } from "./element-symbol";

export function GamesMerchSection() {
  return (
    <section
      id="games"
      className="scroll-mt-20 border-y border-border/40 bg-card/30 py-20 sm:py-28"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        {/* GAMES */}
        <div className="mb-16">
          <div className="mb-8 max-w-2xl">
            <p className="mb-2 text-xs uppercase tracking-[0.3em] text-primary">
              Play
            </p>
            <h2 className="flex items-center gap-2 text-3xl font-bold tracking-tight sm:text-4xl">
              <Gamepad2 className="h-7 w-7 text-primary" />
              Games & tabletop
            </h2>
            <p className="mt-3 text-muted-foreground">
              From console adventures to the tabletop RPG — the ways to step
              into the Avatarverse yourself.
            </p>
          </div>

          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {GAMES.map((g) => {
              const color = ELEMENT_COLOR[g.element];
              return (
                <Card
                  key={g.title}
                  className="group relative overflow-hidden rounded-2xl border-border/60 bg-card/50 p-6 backdrop-blur transition-all duration-300 hover:-translate-y-1 hover:card-glow"
                  style={{ borderTopColor: color, borderTopWidth: 2 }}
                >
                  <div
                    className="pointer-events-none absolute -right-12 -top-12 h-32 w-32 rounded-full opacity-15 blur-2xl transition-opacity group-hover:opacity-30"
                    style={{ backgroundColor: color }}
                  />
                  <span
                    className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl border bg-background/60"
                    style={{ borderColor: `${color}66`, color }}
                  >
                    <Gamepad2 className="h-6 w-6" />
                  </span>
                  <h3 className="text-base font-semibold text-foreground">
                    {g.title}
                  </h3>
                  <p className="mt-1 text-xs font-medium" style={{ color }}>
                    {g.platform}
                  </p>
                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                    {g.description}
                  </p>
                </Card>
              );
            })}
          </div>
        </div>

        {/* MERCH / STORES */}
        <div>
          <div className="mb-8 max-w-2xl">
            <p className="mb-2 text-xs uppercase tracking-[0.3em] text-primary">
              Shop
            </p>
            <h2 className="flex items-center gap-2 text-3xl font-bold tracking-tight sm:text-4xl">
              <ShoppingBag className="h-7 w-7 text-primary" />
              Official stores & merchandise
            </h2>
            <p className="mt-3 text-muted-foreground">
              {STORES.length} curated storefronts — from Paramount and Netflix
              official shops to Funko, Dark Horse, and independent sellers.
            </p>
          </div>

          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {STORES.map((store, i) => {
              const color = store.color;
              return (
                <a
                  key={`${store.name}-${i}`}
                  href="#"
                  onClick={(e) => e.preventDefault()}
                  className="group relative flex flex-col overflow-hidden rounded-xl border border-border/60 bg-card/50 p-4 backdrop-blur transition-all duration-300 hover:-translate-y-1 hover:card-glow"
                  style={{ borderLeftColor: color, borderLeftWidth: 3 }}
                >
                  <div className="mb-2 flex items-center justify-between gap-2">
                    <Badge
                      variant="outline"
                      className="rounded-full border-border/60 text-[9px] uppercase tracking-wider"
                      style={{ color, borderColor: `${color}55` }}
                    >
                      {store.tag}
                    </Badge>
                    <ExternalLink className="h-3.5 w-3.5 text-muted-foreground opacity-0 transition-opacity group-hover:opacity-100" />
                  </div>
                  <p className="text-[11px] uppercase tracking-wider text-muted-foreground">
                    {store.label}
                  </p>
                  <h3 className="text-sm font-semibold leading-tight text-foreground">
                    {store.name}
                  </h3>
                  <p className="mt-2 line-clamp-2 text-xs leading-relaxed text-muted-foreground">
                    {store.description}
                  </p>
                </a>
              );
            })}
          </div>

          <p className="mt-6 text-center text-xs text-muted-foreground">
            Store links are for reference. AvatarArchive is a non-commercial fan
            project and does not sell merchandise.
          </p>
        </div>
      </div>
    </section>
  );
}
