"use client";

import * as React from "react";
import { Quote, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { SectionHeader, SectionDivider } from "./section-header";
import { cn } from "@/lib/utils";
import {
  CHARACTERS,
  ELEMENT_COLOR,
  type Character,
  type ElementId,
} from "@/lib/avatar-data";

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
    <div
      className="card-aa press-aa group relative overflow-hidden rounded-lg p-4"
      style={{ borderTopColor: `${color}88`, borderTopWidth: 2 }}
    >
      <div className="flex items-start gap-3">
        {/* Avatar circle with element mark */}
        <div className="relative shrink-0">
          <div
            className="flex h-12 w-12 items-center justify-center rounded-full border font-display text-lg font-bold"
            style={{
              borderColor: `${color}55`,
              backgroundColor: `${color}1a`,
              color,
            }}
          >
            {initial}
          </div>
          <img
            src={`/images/${c.element}.png`}
            alt={c.element}
            className="absolute -bottom-1 -right-1 h-5 w-5 object-contain"
            style={{ filter: `drop-shadow(0 0 3px ${color})` }}
          />
        </div>
        <div className="min-w-0 flex-1">
          <h3 className="font-serif text-sm font-semibold leading-tight text-foreground">
            {c.name}
          </h3>
          <p className="font-body-aa text-[0.65rem] uppercase tracking-wider text-muted-foreground">
            {c.role}
          </p>
        </div>
      </div>

      <p className="font-body-aa mt-3 line-clamp-3 text-xs leading-relaxed text-muted-foreground">
        {c.description}
      </p>

      {c.quote !== "..." && (
        <div className="mt-3 flex gap-2 border-l-2 pl-3" style={{ borderColor: `${color}55` }}>
          <Quote className="h-3 w-3 shrink-0 translate-y-0.5 opacity-50" style={{ color }} />
          <p className="font-body-aa text-xs italic leading-relaxed text-foreground/75">
            {c.quote}
          </p>
        </div>
      )}

      <div className="mt-3 flex flex-wrap items-center gap-x-2 gap-y-1 font-body-aa text-[0.6rem] uppercase tracking-wider text-muted-foreground">
        {c.series.map((s) => (
          <span key={s} className="rounded bg-secondary/70 px-1.5 py-0.5">{s}</span>
        ))}
        <span className="opacity-60">· {c.voicedBy}</span>
      </div>
    </div>
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
    <section id="characters" className="scroll-mt-20 py-16 sm:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <SectionHeader
          eyebrow="The Cast"
          title="Character compendium"
          description="The heroes, villains, and mentors of the Avatarverse — color-coded by their bending art."
        />
        <SectionDivider />

        <div className="mt-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div className="flex flex-wrap gap-2">
            {FILTERS.map((f) => (
              <button
                key={f.id}
                onClick={() => setFilter(f.id)}
                className={cn(
                  "press-aa rounded-full border px-3 py-1.5 font-serif text-[0.6rem] uppercase tracking-[0.18em] transition-all",
                  filter === f.id
                    ? "border-transparent bg-primary text-primary-foreground"
                    : "border-border bg-background/40 text-muted-foreground hover:text-foreground"
                )}
              >
                {f.label}
              </button>
            ))}
          </div>

          <div className="relative w-full max-w-xs">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-muted-foreground" />
            <Input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Filter by name, role, nation…"
              className="rounded-full border-border bg-background/40 pl-9 font-body-aa text-sm"
              aria-label="Filter characters"
            />
          </div>
        </div>

        <div className="mt-4 mb-5 font-body-aa text-[0.65rem] uppercase tracking-wider text-muted-foreground">
          {filtered.length} of {CHARACTERS.length} characters
        </div>

        {filtered.length === 0 ? (
          <div className="rounded-lg border border-dashed border-border py-16 text-center font-body-aa text-sm text-muted-foreground">
            No characters match &ldquo;{query}&rdquo;.
          </div>
        ) : (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {filtered.map((c) => (
              <CharacterCard key={c.id} c={c} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
