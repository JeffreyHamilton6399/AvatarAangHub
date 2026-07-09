"use client";

import * as React from "react";
import { CornerDownLeft } from "lucide-react";
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  SERIES,
  TRILOGIES,
  NOVELS,
  ELEMENT_COLOR,
  elementImage,
  type ElementId,
  type Episode,
  type Novel,
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
  onPlayVideo,
  onPlayNovel,
}: {
  open: boolean;
  onOpenChange: (v: boolean) => void;
  onPlayVideo?: (seriesId: string, bookTag: string, episodeN: number) => void;
  onPlayNovel?: (novel: Novel) => void;
}) {
  const scrollToSeries = () => {
    onOpenChange(false);
    requestAnimationFrame(() => {
      document
        .querySelectorAll("section")[1]
        ?.scrollIntoView({ behavior: "smooth", block: "start" });
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
        action: () => scrollToSeries(),
      });
      s.books.forEach((b) =>
        b.episodes.forEach((ep: Episode) => {
          results.push({
            id: `ep-${b.tag}-${ep.n}`,
            label: ep.title,
            hint: `${s.short} · ${b.sublabel} · Ep ${ep.n}`,
            element: b.element,
            group: "Episodes",
            action: () => {
              onOpenChange(false);
              onPlayVideo?.(s.id, b.tag, ep.n);
            },
          });
        })
      );
    });
    NOVELS.forEach((n: Novel) =>
      results.push({
        id: `novel-${n.file}`,
        label: n.title,
        hint: `${n.trilogy} · Part ${n.part}`,
        element: TRILOGIES.find((t) => t.name === n.trilogy)?.element ?? "spirit",
        group: "Graphic Novels",
        action: () => {
          onOpenChange(false);
          onPlayNovel?.(n);
        },
      })
    );
    return results;
  })();

  return (
    <CommandDialog open={open} onOpenChange={onOpenChange}>
      <CommandInput placeholder="Search episodes, series, graphic novels…" />
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
            {items.slice(0, 30).map((r) => {
              const color = ELEMENT_COLOR[r.element];
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
                    <img
                      src={elementImage(r.element)}
                      alt=""
                      className="h-4 w-4 object-contain"
                      style={{ filter: `drop-shadow(0 0 3px ${color})` }}
                    />
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
