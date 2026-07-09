"use client";

import * as React from "react";
import { Film, Play, ChevronDown } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { SERIES, ELEMENT_COLOR, type Series, type Book } from "@/lib/avatar-data";
import { ElementSymbol } from "./element-symbol";

function EpisodeList({ book, accent }: { book: Book; accent: string }) {
  const [expanded, setExpanded] = React.useState(false);
  const visible = expanded ? book.episodes : book.episodes.slice(0, 8);
  return (
    <div>
      <div className="grid grid-cols-1 gap-1.5 sm:grid-cols-2">
        {visible.map((ep, i) => (
          <div
            key={ep}
            className="group flex items-center gap-3 rounded-lg border border-border/40 bg-background/40 px-3 py-2 transition-colors hover:border-border hover:bg-background/70"
          >
            <span
              className="flex h-7 w-7 shrink-0 items-center justify-center rounded-md font-mono text-xs font-bold"
              style={{
                backgroundColor: `${accent}1f`,
                color: accent,
              }}
            >
              {String(i + 1).padStart(2, "0")}
            </span>
            <span className="flex-1 truncate text-sm text-foreground/90">
              {ep}
            </span>
            <Play className="h-3.5 w-3.5 shrink-0 text-muted-foreground opacity-0 transition-opacity group-hover:opacity-100" />
          </div>
        ))}
      </div>
      {book.episodes.length > 8 && (
        <button
          onClick={() => setExpanded((v) => !v)}
          className="mt-3 inline-flex items-center gap-1.5 text-xs font-medium text-primary hover:underline"
        >
          {expanded ? "Show less" : `Show all ${book.episodes.length} episodes`}
          <ChevronDown
            className={cn("h-3.5 w-3.5 transition-transform", expanded && "rotate-180")}
          />
        </button>
      )}
    </div>
  );
}

function SeriesEpisodes({ s }: { s: Series }) {
  const [activeBook, setActiveBook] = React.useState(0);
  const book = s.books[activeBook] ?? s.books[0];
  const accent = s.accent;
  const bookColor = ELEMENT_COLOR[book.element];

  return (
    <Card className="overflow-hidden rounded-2xl border-border/60 bg-card/50 backdrop-blur">
      {/* Series header banner */}
      <div
        className="relative h-24 overflow-hidden border-b border-border/60 sm:h-28"
        style={{
          background: `linear-gradient(120deg, ${accent}33, transparent 60%), var(--card)`,
        }}
      >
        <div
          className="pointer-events-none absolute inset-0 opacity-30"
          style={{
            backgroundImage: `url(${s.backgroundImage})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
        <div className="relative flex h-full items-center justify-between gap-3 px-5">
          <div className="flex items-center gap-3">
            <span
              className="flex h-11 w-11 items-center justify-center rounded-xl border bg-background/60"
              style={{ borderColor: accent, color: accent }}
            >
              <span className="h-6 w-6">
                <ElementSymbol element={s.element} strokeWidth={2} />
              </span>
            </span>
            <div>
              <h3 className="text-base font-semibold leading-tight text-foreground">
                {s.title}
              </h3>
              <p className="text-xs text-muted-foreground">
                {s.years} · {s.books.reduce((n, b) => n + b.episodes.length, 0)} episodes
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="p-5">
        {/* Book selector pills */}
        <div className="mb-4 flex flex-wrap gap-2">
          {s.books.map((b, i) => (
            <button
              key={b.tag}
              onClick={() => setActiveBook(i)}
              className={cn(
                "inline-flex items-center gap-2 rounded-full border px-3 py-1.5 text-xs font-medium transition-all",
                activeBook === i
                  ? "border-transparent text-white"
                  : "border-border/60 bg-background/40 text-muted-foreground hover:text-foreground"
              )}
              style={
                activeBook === i
                  ? { backgroundColor: ELEMENT_COLOR[b.element] }
                  : undefined
              }
            >
              <span className="h-3 w-3" style={{ color: activeBook === i ? "white" : ELEMENT_COLOR[b.element] }}>
                <ElementSymbol element={b.element} strokeWidth={2.4} />
              </span>
              {b.label} · {b.sublabel}
            </button>
          ))}
        </div>

        {/* Active book header */}
        <div className="mb-3 flex items-center justify-between">
          <h4 className="flex items-center gap-2 text-sm font-semibold" style={{ color: bookColor }}>
            <Film className="h-4 w-4" />
            {book.label}: {book.sublabel}
          </h4>
          <Badge variant="outline" className="rounded-full border-border/60 text-[10px] uppercase tracking-wider">
            {book.episodes.length} episodes
          </Badge>
        </div>

        <EpisodeList book={book} accent={accent} />
      </div>
    </Card>
  );
}

export function EpisodesSection() {
  const [activeSeries, setActiveSeries] = React.useState("atla");
  const current = SERIES.find((s) => s.id === activeSeries)!;
  const totalEps = SERIES.reduce(
    (sum, s) => sum + s.books.reduce((n, b) => n + b.episodes.length, 0),
    0
  );

  return (
    <section
      id="episodes"
      className="scroll-mt-20 border-y border-border/40 bg-card/30 py-20 sm:py-28"
    >
      <div className="mx-auto max-w-5xl px-4 sm:px-6">
        <div className="mb-8 max-w-2xl">
          <p className="mb-2 text-xs uppercase tracking-[0.3em] text-primary">
            The Episodes
          </p>
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            {totalEps} episodes across every Book
          </h2>
          <p className="mt-3 text-muted-foreground">
            Browse the complete episode catalog — real titles from every Book of
            ATLA, Korra, and the films. Pick a series, then a Book, to explore.
          </p>
        </div>

        {/* Series selector */}
        <div className="mb-6 flex flex-wrap gap-2">
          {SERIES.map((s) => (
            <button
              key={s.id}
              onClick={() => setActiveSeries(s.id)}
              className={cn(
                "inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-medium transition-all",
                activeSeries === s.id
                  ? "border-transparent text-white shadow-lg"
                  : "border-border/60 bg-background/40 text-muted-foreground hover:text-foreground"
              )}
              style={
                activeSeries === s.id
                  ? { backgroundColor: s.accent, boxShadow: `0 8px 30px -8px ${s.accent}55` }
                  : undefined
              }
            >
              <span className="h-4 w-4" style={{ color: activeSeries === s.id ? "white" : s.accent }}>
                <ElementSymbol element={s.element} strokeWidth={2.2} />
              </span>
              {s.short}
            </button>
          ))}
        </div>

        <SeriesEpisodes s={current} />
      </div>
    </section>
  );
}
