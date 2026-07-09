"use client";

import * as React from "react";
import { Quote, Search, Users } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import {
  CHARACTERS,
  ELEMENTS,
  ELEMENT_COLOR,
  type Character,
  type ElementId,
} from "@/lib/avatar-data";
import { ElementSymbol } from "./element-symbol";

const FILTERS: { id: ElementId | "all"; label: string }[] = [
  { id: "all", label: "All" },
  { id: "air", label: "Air" },
  { id: "water", label: "Water" },
  { id: "earth", label: "Earth" },
  { id: "fire", label: "Fire" },
  { id: "none", label: "Non-benders" },
];

function CharacterCard({ c }: { c: Character }) {
  const color = ELEMENT_COLOR[c.element];
  const initial = c.name.charAt(0);

  return (
    <Card
      className="group relative overflow-hidden rounded-2xl border-border/60 bg-card/60 backdrop-blur transition-all duration-300 hover:-translate-y-1 hover:card-glow"
      style={{ borderTopColor: color, borderTopWidth: 2 }}
    >
      <div
        className="pointer-events-none absolute -right-12 -top-12 h-32 w-32 rounded-full opacity-15 blur-2xl transition-opacity group-hover:opacity-30"
        style={{ backgroundColor: color }}
      />
      <div className="p-5">
        <div className="flex items-center gap-4">
          <span
            className="relative flex h-14 w-14 shrink-0 items-center justify-center rounded-full border text-lg font-bold"
            style={{
              borderColor: `${color}66`,
              backgroundColor: `${color}1a`,
              color,
            }}
          >
            {initial}
            <span
              className="absolute -bottom-1 -right-1 flex h-6 w-6 items-center justify-center rounded-full border border-border bg-card"
              style={{ color }}
            >
              <span className="h-3.5 w-3.5">
                <ElementSymbol element={c.element} strokeWidth={2.4} />
              </span>
            </span>
          </span>
          <div className="min-w-0">
            <h3 className="truncate text-base font-semibold text-foreground">
              {c.name}
            </h3>
            <p className="truncate text-xs text-muted-foreground">{c.role}</p>
          </div>
        </div>

        <p className="mt-4 line-clamp-3 text-sm text-muted-foreground">
          {c.description}
        </p>

        <div className="mt-4 flex flex-wrap items-center gap-1.5">
          {c.series.map((s) => (
            <Badge
              key={s}
              variant="outline"
              className="rounded-full border-border/60 text-[10px] uppercase tracking-wider"
            >
              {s}
            </Badge>
          ))}
          <span className="text-[11px] text-muted-foreground">
            · {c.affiliation}
          </span>
        </div>

        {c.quote !== "..." && (
          <div className="mt-4 flex gap-2 rounded-lg bg-background/50 p-3">
            <Quote className="h-3.5 w-3.5 shrink-0 text-primary/70" />
            <p className="text-xs italic leading-relaxed text-foreground/80">
              {c.quote}
            </p>
          </div>
        )}

        <p className="mt-3 text-[11px] text-muted-foreground">
          Voiced by {c.voicedBy} · First seen {c.firstAppearance}
        </p>
      </div>
    </Card>
  );
}

export function CharactersSection() {
  const [filter, setFilter] = React.useState<ElementId | "all">("all");
  const [query, setQuery] = React.useState("");

  const filtered = React.useMemo(() => {
    const q = query.trim().toLowerCase();
    return CHARACTERS.filter((c) => {
      const matchesFilter = filter === "all" || c.element === filter;
      const matchesQuery =
        !q ||
        c.name.toLowerCase().includes(q) ||
        c.role.toLowerCase().includes(q) ||
        c.affiliation.toLowerCase().includes(q);
      return matchesFilter && matchesQuery;
    });
  }, [filter, query]);

  return (
    <section id="characters" className="scroll-mt-20 py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="mb-8 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div className="max-w-2xl">
            <p className="mb-2 text-xs uppercase tracking-[0.3em] text-primary">
              The Cast
            </p>
            <h2 className="flex items-center gap-2 text-3xl font-bold tracking-tight sm:text-4xl">
              <Users className="h-7 w-7 text-primary" />
              Character compendium
            </h2>
            <p className="mt-3 text-muted-foreground">
              The heroes, villains, and mentors of the Avatarverse — color-coded
              by their bending art.
            </p>
          </div>

          <div className="relative w-full max-w-xs">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Filter by name, role, nation…"
              className="rounded-full border-border/60 bg-background/40 pl-9"
              aria-label="Filter characters"
            />
          </div>
        </div>

        <div className="mb-6 flex flex-wrap gap-2">
          {FILTERS.map((f) => (
            <button
              key={f.id}
              onClick={() => setFilter(f.id)}
              className={cn(
                "rounded-full border px-3.5 py-1.5 text-xs font-medium transition-all",
                filter === f.id
                  ? "border-transparent bg-primary text-primary-foreground"
                  : "border-border/60 bg-background/40 text-muted-foreground hover:text-foreground"
              )}
            >
              {f.label}
            </button>
          ))}
          <span className="ml-auto self-center text-xs text-muted-foreground">
            {filtered.length} of {CHARACTERS.length}
          </span>
        </div>

        {filtered.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-border/60 py-16 text-center text-muted-foreground">
            No characters match “{query}”.
          </div>
        ) : (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {filtered.map((c) => (
              <CharacterCard key={c.id} c={c} />
            ))}
          </div>
        )}

        <div className="mt-6 flex flex-wrap items-center gap-x-5 gap-y-2 text-xs text-muted-foreground">
          {ELEMENTS.map((e) => (
            <span key={e.id} className="inline-flex items-center gap-1.5">
              <span
                className="h-2.5 w-2.5 rounded-full"
                style={{ backgroundColor: e.color }}
              />
              {e.name}
            </span>
          ))}
          <span className="inline-flex items-center gap-1.5">
            <span className="h-2.5 w-2.5 rounded-full bg-element-none" />
            Non-bender
          </span>
        </div>
      </div>
    </section>
  );
}
