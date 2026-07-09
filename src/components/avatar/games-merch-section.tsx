"use client";

import { SectionHeader, SectionDivider } from "./section-header";
import { GAMES, STORES, ELEMENT_COLOR } from "@/lib/avatar-data";

export function GamesMerchSection() {
  return (
    <section id="games" className="scroll-mt-20 py-16 sm:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        {/* GAMES */}
        <SectionHeader
          eyebrow="Play"
          title="Games & tabletop"
          description="From console adventures to the tabletop RPG — the ways to step into the Avatarverse yourself."
        />
        <SectionDivider />

        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {GAMES.map((g) => {
            const color = ELEMENT_COLOR[g.element];
            return (
              <div
                key={g.title}
                className="card-aa press-aa relative overflow-hidden rounded-lg p-5"
                style={{ borderTopColor: `${color}88`, borderTopWidth: 2 }}
              >
                <div className="mb-3 flex items-center gap-3">
                  <img
                    src={`/images/${g.element}.png`}
                    alt={g.element}
                    className="h-9 w-9 object-contain"
                    style={{ filter: `drop-shadow(0 0 5px ${color})` }}
                  />
                  <div>
                    <h3 className="font-serif text-sm font-semibold leading-tight text-foreground">
                      {g.title}
                    </h3>
                    <p className="font-body-aa text-[0.6rem] uppercase tracking-wider" style={{ color }}>
                      {g.platform}
                    </p>
                  </div>
                </div>
                <p className="font-body-aa text-xs leading-relaxed text-muted-foreground">
                  {g.description}
                </p>
              </div>
            );
          })}
        </div>

        {/* MERCH */}
        <div className="mt-16">
          <SectionHeader
            eyebrow="Shop"
            title="Official stores & merchandise"
            description={`${STORES.length} curated storefronts — from Paramount and Netflix official shops to Funko, Dark Horse, and independent sellers.`}
          />
          <SectionDivider />

          <div className="mt-8 grid gap-2.5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {STORES.map((store, i) => {
              const color = store.color;
              return (
                <div
                  key={`${store.name}-${i}`}
                  className="press-aa group relative flex flex-col overflow-hidden rounded-md border border-border/60 bg-background/40 p-4 transition-colors hover:border-[rgba(201,168,76,0.3)] hover:bg-background/70"
                  style={{ borderLeftColor: color, borderLeftWidth: 3 }}
                >
                  <div className="mb-1.5 flex items-center justify-between gap-2">
                    <span
                      className="font-body-aa rounded-full border px-2 py-0.5 text-[0.55rem] uppercase tracking-wider"
                      style={{ color, borderColor: `${color}44` }}
                    >
                      {store.tag}
                    </span>
                  </div>
                  <p className="font-body-aa text-[0.6rem] uppercase tracking-wider text-muted-foreground">
                    {store.label}
                  </p>
                  <h3 className="font-serif text-sm font-semibold leading-tight text-foreground">
                    {store.name}
                  </h3>
                  <p className="font-body-aa mt-1.5 line-clamp-2 text-[0.7rem] leading-relaxed text-muted-foreground">
                    {store.description}
                  </p>
                </div>
              );
            })}
          </div>

          <p className="font-body-aa mt-6 text-center text-[0.65rem] uppercase tracking-wider text-muted-foreground">
            Store links are for reference · Non-commercial fan project
          </p>
        </div>
      </div>
    </section>
  );
}
