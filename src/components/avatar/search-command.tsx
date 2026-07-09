"use client";

import * as React from "react";
import { Search, Film, Users, Sparkles, Clock, CornerDownLeft, BookOpen, Gamepad2, ShoppingBag } from "lucide-react";
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  CHARACTERS,
  SERIES,
  TIMELINE,
  NOVELS,
  GAMES,
  STORES,
  ELEMENT_COLOR,
  type ElementId,
} from "@/lib/avatar-data";
import { ElementSymbol } from "./element-symbol";

interface Result {
  id: string;
  label: string;
  hint: string;
  element: ElementId;
  group: string;
  target: string;
}

const ALL: Result[] = [
  ...SERIES.map((s) => ({
    id: `series-${s.id}`,
    label: s.title,
    hint: `${s.short} · ${s.years}`,
    element: s.element as ElementId,
    group: "Series",
    target: "series",
  })),
  ...SERIES.flatMap((s) =>
    s.books.flatMap((b) =>
      b.episodes.map((ep, i) => ({
        id: `ep-${b.tag}-${i}`,
        label: ep,
        hint: `${s.short} · ${b.label}: ${b.sublabel} · Ep ${i + 1}`,
        element: b.element,
        group: "Episodes",
        target: "episodes",
      }))
    )
  ),
  ...CHARACTERS.map((c) => ({
    id: `char-${c.id}`,
    label: c.name,
    hint: `${c.role} · ${c.affiliation}`,
    element: c.element,
    group: "Characters",
    target: "characters",
  })),
  ...NOVELS.map((n) => ({
    id: `novel-${n.file}`,
    label: n.title,
    hint: `${n.trilogy} · Part ${n.part}`,
    element: "spirit" as ElementId,
    group: "Comics",
    target: "books",
  })),
  ...GAMES.map((g) => ({
    id: `game-${g.title}`,
    label: g.title,
    hint: g.platform,
    element: g.element,
    group: "Games",
    target: "games",
  })),
  ...STORES.map((st, i) => ({
    id: `store-${i}`,
    label: st.name,
    hint: `${st.label} · ${st.tag}`,
    element: st.element,
    group: "Stores",
    target: "games",
  })),
  ...TIMELINE.map((t, i) => ({
    id: `tl-${i}`,
    label: t.title,
    hint: `${t.year} · ${t.era}`,
    element: t.element,
    group: "Timeline",
    target: "timeline",
  })),
  {
    id: "elements-water",
    label: "Water",
    hint: "Winter · North",
    element: "water" as ElementId,
    group: "Elements",
    target: "elements",
  },
  {
    id: "elements-earth",
    label: "Earth",
    hint: "Spring · East",
    element: "earth" as ElementId,
    group: "Elements",
    target: "elements",
  },
  {
    id: "elements-fire",
    label: "Fire",
    hint: "Summer · South",
    element: "fire" as ElementId,
    group: "Elements",
    target: "elements",
  },
  {
    id: "elements-air",
    label: "Air",
    hint: "Autumn · West",
    element: "air" as ElementId,
    group: "Elements",
    target: "elements",
  },
];

const GROUP_ICON: Record<string, React.ElementType> = {
  Series: Film,
  Episodes: Film,
  Characters: Users,
  Timeline: Clock,
  Elements: Sparkles,
  Comics: BookOpen,
  Games: Gamepad2,
  Stores: ShoppingBag,
};

export function SearchCommand({
  open,
  onOpenChange,
}: {
  open: boolean;
  onOpenChange: (v: boolean) => void;
}) {
  const run = (target: string) => {
    onOpenChange(false);
    requestAnimationFrame(() => {
      document
        .getElementById(target)
        ?.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  };

  return (
    <CommandDialog open={open} onOpenChange={onOpenChange}>
      <CommandInput placeholder="Search episodes, characters, comics, games…" />
      <CommandList className="aa-scroll">
        <CommandEmpty>No results found.</CommandEmpty>
        {Object.entries(
          ALL.reduce<Record<string, Result[]>>((acc, r) => {
            (acc[r.group] = acc[r.group] ?? []).push(r);
            return acc;
          }, {})
        ).map(([group, items]) => {
          const Icon = GROUP_ICON[group] ?? Search;
          return (
            <CommandGroup
              key={group}
              heading={
                <span className="flex items-center gap-1.5">
                  <Icon className="h-3.5 w-3.5" /> {group}
                </span>
              }
            >
              {items.slice(0, 40).map((r) => {
                const color = ELEMENT_COLOR[r.element];
                return (
                  <CommandItem
                    key={r.id}
                    value={`${r.label} ${r.hint} ${r.group}`}
                    onSelect={() => run(r.target)}
                    className="gap-3"
                  >
                    <span
                      className="flex h-7 w-7 shrink-0 items-center justify-center rounded-md border"
                      style={{ borderColor: `${color}55`, color }}
                    >
                      <span className="h-4 w-4">
                        <ElementSymbol element={r.element} strokeWidth={2.2} />
                      </span>
                    </span>
                    <span className="flex flex-1 flex-col">
                      <span className="text-sm">{r.label}</span>
                      <span className="text-xs text-muted-foreground">
                        {r.hint}
                      </span>
                    </span>
                    <CornerDownLeft className="h-3.5 w-3.5 text-muted-foreground/50" />
                  </CommandItem>
                );
              })}
            </CommandGroup>
          );
        })}
      </CommandList>
    </CommandDialog>
  );
}
