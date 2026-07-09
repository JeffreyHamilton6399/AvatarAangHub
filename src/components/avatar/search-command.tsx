"use client";

import * as React from "react";
import { Search, Film, Users, Sparkles, Clock, CornerDownLeft } from "lucide-react";
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
  ...CHARACTERS.map((c) => ({
    id: `char-${c.id}`,
    label: c.name,
    hint: `${c.role} · ${c.affiliation}`,
    element: c.element,
    group: "Characters",
    target: "characters",
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
  Characters: Users,
  Timeline: Clock,
  Elements: Sparkles,
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
      <CommandInput placeholder="Search series, characters, elements, timeline…" />
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
              {items.map((r) => {
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
