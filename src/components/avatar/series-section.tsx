"use client";

import * as React from "react";
import { Film, Play, Calendar, Layers } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { SERIES, type Series, type ElementId } from "@/lib/avatar-data";
import { ElementSymbol } from "./element-symbol";

function elementText(el: ElementId) {
  return `text-element-${el === "spirit" || el === "none" ? "spirit" : el}`;
}

function SeriesCard({ s, onSelect }: { s: Series; onSelect: (s: Series) => void }) {
  return (
    <Card
      className={cn(
        "group relative overflow-hidden rounded-2xl border-border/60 bg-card/60 p-0 backdrop-blur transition-all duration-300 hover:-translate-y-1 hover:card-glow"
      )}
    >
      <div
        className="absolute inset-x-0 top-0 h-1.5"
        style={{ backgroundColor: s.accent }}
      />
      <div
        className="pointer-events-none absolute -right-10 -top-10 h-40 w-40 rounded-full opacity-20 blur-3xl transition-opacity group-hover:opacity-40"
        style={{ backgroundColor: s.accent }}
      />

      <button
        onClick={() => onSelect(s)}
        className="flex w-full flex-col items-start gap-4 p-6 text-left"
      >
        <div className="flex w-full items-start justify-between gap-3">
          <span
            className={cn(
              "flex h-12 w-12 items-center justify-center rounded-xl border bg-background/60",
              elementText(s.element)
            )}
            style={{ borderColor: s.accent }}
          >
            <span className="h-7 w-7">
              <ElementSymbol element={s.element} strokeWidth={2} />
            </span>
          </span>
          <Badge
            variant="outline"
            className="rounded-full border-border/60 font-mono text-[10px] uppercase tracking-wider"
          >
            {s.short}
          </Badge>
        </div>

        <div className="space-y-1.5">
          <h3 className="text-lg font-semibold leading-tight text-foreground">
            {s.title}
          </h3>
          <p className="text-xs italic text-muted-foreground">{s.tagline}</p>
        </div>

        <p className="line-clamp-3 text-sm text-muted-foreground">{s.synopsis}</p>

        <div className="flex flex-wrap items-center gap-3 text-xs text-muted-foreground">
          <span className="inline-flex items-center gap-1.5">
            <Calendar className="h-3.5 w-3.5" /> {s.years}
          </span>
          <span className="inline-flex items-center gap-1.5">
            <Layers className="h-3.5 w-3.5" /> {s.books.length}{" "}
            {s.books.length > 1 ? "Books" : "Release"}
          </span>
          {s.episodes > 1 && (
            <span className="inline-flex items-center gap-1.5">
              <Film className="h-3.5 w-3.5" /> {s.books.reduce((n, b) => n + b.episodes.length, 0)} episodes
            </span>
          )}
        </div>

        <div className="flex w-full flex-wrap gap-1.5 pt-1">
          {s.books.slice(0, 3).map((book) => (
            <span
              key={book.tag}
              className="rounded-md bg-secondary/70 px-2 py-1 text-[11px] text-secondary-foreground"
            >
              {book.label}: {book.sublabel}
            </span>
          ))}
          {s.books.length > 3 && (
            <span className="rounded-md bg-secondary/70 px-2 py-1 text-[11px] text-secondary-foreground">
              +{s.books.length - 3}
            </span>
          )}
        </div>

        <span className="mt-1 inline-flex items-center gap-1.5 text-sm font-medium text-primary">
          <Play className="h-3.5 w-3.5" /> Open entry
        </span>
      </button>
    </Card>
  );
}

function SeriesDetail({
  s,
  onClose,
}: {
  s: Series;
  onClose: () => void;
}) {
  React.useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 z-[60] flex items-end justify-center bg-background/80 p-0 backdrop-blur sm:items-center sm:p-6"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div
        className="aa-float-up relative max-h-[88vh] w-full max-w-2xl overflow-hidden rounded-t-3xl border border-border/60 bg-card shadow-2xl sm:rounded-3xl"
        role="dialog"
        aria-modal="true"
        aria-label={`${s.title} details`}
      >
        <div className="h-1.5 w-full" style={{ backgroundColor: s.accent }} />
        <div
          className="pointer-events-none absolute -right-16 -top-16 h-56 w-56 rounded-full opacity-25 blur-3xl"
          style={{ backgroundColor: s.accent }}
        />
        <div className="aa-scroll max-h-[82vh] overflow-y-auto p-6 sm:p-8">
          <div className="flex items-start justify-between gap-4">
            <div className="flex items-start gap-4">
              <span
                className={cn(
                  "flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl border bg-background/60",
                  elementText(s.element)
                )}
                style={{ borderColor: s.accent }}
              >
                <span className="h-8 w-8">
                  <ElementSymbol element={s.element} strokeWidth={2} />
                </span>
              </span>
              <div>
                <h3 className="text-2xl font-bold leading-tight text-foreground">
                  {s.title}
                </h3>
                <p className="text-sm italic text-muted-foreground">{s.tagline}</p>
              </div>
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={onClose}
              className="rounded-full"
              aria-label="Close"
            >
              ✕
            </Button>
          </div>

          <div className="mt-6 flex flex-wrap gap-3 text-sm text-muted-foreground">
            <span className="inline-flex items-center gap-1.5">
              <Calendar className="h-4 w-4" /> {s.years}
            </span>
            <span className="inline-flex items-center gap-1.5">
              <Layers className="h-4 w-4" /> {s.books.length} books
            </span>
            {s.episodes > 1 && (
              <span className="inline-flex items-center gap-1.5">
                <Film className="h-4 w-4" /> {s.books.reduce((n, b) => n + b.episodes.length, 0)} episodes
              </span>
            )}
          </div>

          <p className="mt-5 text-pretty text-sm leading-relaxed text-foreground/90">
            {s.synopsis}
          </p>

          <div className="mt-6">
            <h4 className="mb-2 text-xs uppercase tracking-[0.2em] text-muted-foreground">
              Books & Seasons
            </h4>
            <div className="flex flex-col gap-2">
              {s.books.map((book, i) => (
                <div
                  key={book.tag}
                  className="flex items-center gap-3 rounded-xl border border-border/50 bg-background/40 px-4 py-3"
                >
                  <span
                    className="flex h-7 w-7 items-center justify-center rounded-full text-xs font-bold"
                    style={{
                      backgroundColor: `${s.accent}22`,
                      color: s.accent,
                    }}
                  >
                    {i + 1}
                  </span>
                  <span className="text-sm text-foreground">{book.label}: {book.sublabel} · {book.episodes.length} episodes</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export function SeriesSection() {
  const [selected, setSelected] = React.useState<Series | null>(null);

  return (
    <section id="series" className="scroll-mt-20 py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="mb-10 max-w-2xl">
          <p className="mb-2 text-xs uppercase tracking-[0.3em] text-primary">
            The Series
          </p>
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Every chapter of the saga
          </h2>
          <p className="mt-3 text-muted-foreground">
            From the original animated run to the live-action reimagining and the
            upcoming theatrical film — trace the Avatar story across every
            medium.
          </p>
        </div>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {SERIES.map((s) => (
            <SeriesCard key={s.id} s={s} onSelect={setSelected} />
          ))}
        </div>
      </div>

      {selected && (
        <SeriesDetail s={selected} onClose={() => setSelected(null)} />
      )}
    </section>
  );
}
