"use client";

import * as React from "react";
import { Search, CornerDownLeft } from "lucide-react";
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
  TRILOGIES,
  ELEMENT_COLOR,
  type ElementId,
  type Episode,
} from "@/lib/avatar-data";

interface Result {
  id: string;
  label: string;
  hint: string;
  element: ElementId;
  group: string;
  action: () => void;
}

export function SearchCommand({
  open,
  onOpenChange,
}: {
  open: boolean;
  onOpenChange: (v: boolean) => void;
}) {
  // We can't easily wire video playback from search without lifting state,
  // so search results scroll to the relevant row. Episodes scroll to the Episodes row.
  const scrollTo = (id: string) => {
    onOpenChange(false);
    requestAnimationFrame(() => {
      document
        .querySelectorAll("section")
        [id === "episodes" ? 2 : 0]?.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  };

  const ALL: Result[] = (() => {
    const results: Result[] = [];
    SERIES.forEach((s) => {
      results.push({
        id: `series-${s.id}`,
        label: s.title,
        hint: `${s.short} · ${s.years}`,
        element: s.element,
        group: "Series",
        action: () => scrollTo("series"),
      });
      s.books.forEach((b) =>
        b.episodes.forEach((ep: Episode, i) => {
          results.push({
            id: `ep-${b.tag}-${i}`,
            label: ep.title,
            hint: `${s.short} · ${b.sublabel} · Ep ${ep.n}`,
            element: b.element,
            group: "Episodes",
            action: () => scrollTo("episodes"),
          });
        })
      );
    });
    CHARACTERS.forEach((c) =>
      results.push({
        id: `char-${c.id}`,
        label: c.name,
        hint: `${c.role} · ${c.affiliation}`,
        element: c.element,
        group: "Characters",
        action: () => scrollTo("characters"),
      })
    );
    TRILOGIES.forEach((t) =>
      t.parts.forEach((n) =>
        results.push({
          id: `novel-${n.file}`,
          label: n.title,
          hint: `${n.trilogy} · Part ${n.part}`,
          element: t.element,
          group: "Comics",
          action: () => scrollTo("comics"),
        })
      )
    );
    TIMELINE.forEach((t, i) =>
      results.push({
        id: `tl-${i}`,
        label: t.title,
        hint: `${t.year} · ${t.era}`,
        element: t.element,
        group: "Timeline",
        action: () => scrollTo("timeline"),
      })
    );
    return results;
  })();

  return (
    <CommandDialog open={open} onOpenChange={onOpenChange}>
      <CommandInput placeholder="Search episodes, characters, comics…" />
      <CommandList className="aa-scroll">
        <CommandEmpty>No results found.</CommandEmpty>
        {Object.entries(
          ALL.reduce<Record<string, Result[]>>((acc, r) => {
            (acc[r.group] = acc[r.group] ?? []).push(r);
            return acc;
          }, {})
        ).map(([group, items]) => (
          <CommandGroup
            key={group}
            heading={
              <span className="font-serif text-[0.65rem] uppercase tracking-wider text-muted-foreground">
                {group}
              </span>
            }
          >
            {items.slice(0, 25).map((r) => {
              const color = ELEMENT_COLOR[r.element];
              const imgEl = ["air", "water", "earth", "fire"].includes(r.element)
                ? r.element
                : null;
              return (
                <CommandItem
                  key={r.id}
                  value={`${r.label} ${r.hint} ${r.group}`}
                  onSelect={() => r.action()}
                  className="gap-3"
                >
                  <span
                    className="flex h-7 w-7 shrink-0 items-center justify-center rounded-md border"
                    style={{ borderColor: `${color}55` }}
                  >
                    {imgEl ? (
                      <img
                        src={`/images/${imgEl}.png`}
                        alt=""
                        className="h-4 w-4 object-contain"
                        style={{ filter: `drop-shadow(0 0 3px ${color})` }}
                      />
                    ) : (
                      <span className="h-2 w-2 rounded-full" style={{ backgroundColor: color }} />
                    )}
                  </span>
                  <span className="flex flex-1 flex-col">
                    <span className="font-body-aa text-sm">{r.label}</span>
                    <span className="font-body-aa text-xs text-muted-foreground">{r.hint}</span>
                  </span>
                  <CornerDownLeft className="h-3.5 w-3.5 text-muted-foreground/40" />
                </CommandItem>
              );
            })}
          </CommandGroup>
        ))}
      </CommandList>
    </CommandDialog>
  );
}
