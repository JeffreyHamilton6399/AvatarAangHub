"use client";

import * as React from "react";
import { ChevronDown } from "lucide-react";
import { SectionHeader, SectionDivider } from "./section-header";
import { cn } from "@/lib/utils";
import { SERIES, ELEMENT_COLOR, type Series, type Book } from "@/lib/avatar-data";

function EpisodeList({ book, accent }: { book: Book; accent: string }) {
  const [expanded, setExpanded] = React.useState(false);
  const visible = expanded ? book.episodes : book.episodes.slice(0, 10);
  return (
    <div>
      <ol className="grid grid-cols-1 gap-1.5 sm:grid-cols-2">
        {visible.map((ep, i) => (
          <li
            key={ep}
            className="press-aa group flex items-center gap-3 rounded-md border border-border/60 bg-background/40 px-3 py-2 transition-colors hover:border-[rgba(201,168,76,0.3)] hover:bg-background/70"
          >
            <span
              className="font-mono text-xs font-bold tabular-nums"
              style={{ color: accent }}
            >
              {String(i + 1).padStart(2, "0")}
            </span>
            <span className="font-body-aa flex-1 truncate text-sm text-foreground/90">
              {ep}
            </span>
          </li>
        ))}
      </ol>
      {book.episodes.length > 10 && (
        <button
          onClick={() => setExpanded((v) => !v)}
          className="font-body-aa mt-3 inline-flex items-center gap-1.5 text-xs uppercase tracking-wider text-gold transition-opacity hover:opacity-80"
        >
          {expanded ? "Show less" : `Show all ${book.episodes.length}`}
          <ChevronDown className={cn("h-3.5 w-3.5 transition-transform", expanded && "rotate-180")} />
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
    <div className="card-aa overflow-hidden rounded-lg">
      {/* Series header */}
      <div className="relative h-20 overflow-hidden border-b border-border sm:h-24">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-35"
          style={{ backgroundImage: `url(${s.backgroundImage})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-card via-card/80 to-transparent" />
        <div className="relative flex h-full items-center gap-3 px-5">
          <img
            src={`/images/${s.element}.png`}
            alt={s.element}
            className="h-10 w-10 object-contain opacity-90"
            style={{ filter: `drop-shadow(0 0 6px ${accent}88)` }}
          />
          <div>
            <h3 className="font-serif text-base font-semibold leading-tight">
              {s.title}
            </h3>
            <p className="font-body-aa text-[0.65rem] uppercase tracking-wider text-muted-foreground">
              {s.years} · {s.books.reduce((n, b) => n + b.episodes.length, 0)} episodes
            </p>
          </div>
        </div>
      </div>

      <div className="p-5">
        {/* Book selector */}
        <div className="mb-4 flex flex-wrap gap-2">
          {s.books.map((b, i) => (
            <button
              key={b.tag}
              onClick={() => setActiveBook(i)}
              className={cn(
                "press-aa inline-flex items-center gap-2 rounded-full border px-3 py-1.5 font-serif text-[0.6rem] uppercase tracking-[0.18em] transition-all",
                activeBook === i
                  ? "border-transparent text-white"
                  : "border-border bg-background/40 text-muted-foreground hover:text-foreground"
              )}
              style={activeBook === i ? { backgroundColor: ELEMENT_COLOR[b.element] } : undefined}
            >
              <img src={`/images/${b.element}.png`} alt="" className="h-3.5 w-3.5 object-contain" />
              {b.sublabel}
            </button>
          ))}
        </div>

        <div className="mb-3 flex items-baseline justify-between">
          <h4 className="font-serif text-sm font-semibold" style={{ color: bookColor }}>
            {book.label}: {book.sublabel}
          </h4>
          <span className="font-body-aa text-[0.6rem] uppercase tracking-wider text-muted-foreground">
            {book.episodes.length} episodes
          </span>
        </div>

        <EpisodeList book={book} accent={accent} />
      </div>
    </div>
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
      className="scroll-mt-20 border-y border-border/50 bg-card/20 py-16 sm:py-20"
    >
      <div className="mx-auto max-w-4xl px-4 sm:px-6">
        <SectionHeader
          eyebrow="The Episodes"
          title={`${totalEps} episodes across every Book`}
          description="Browse the complete episode catalog — real titles from every Book of ATLA, Korra, and the films."
        />
        <SectionDivider />

        <div className="mt-6 flex flex-wrap gap-2">
          {SERIES.map((s) => (
            <button
              key={s.id}
              onClick={() => setActiveSeries(s.id)}
              className={cn(
                "press-aa inline-flex items-center gap-2 rounded-full border px-4 py-2 font-serif text-xs uppercase tracking-[0.18em] transition-all",
                activeSeries === s.id
                  ? "border-transparent text-white"
                  : "border-border bg-background/40 text-muted-foreground hover:text-foreground"
              )}
              style={
                activeSeries === s.id
                  ? { backgroundColor: s.accent }
                  : undefined
              }
            >
              <img src={`/images/${s.element}.png`} alt="" className="h-4 w-4 object-contain" />
              {s.short}
            </button>
          ))}
        </div>

        <div className="mt-6">
          <SeriesEpisodes s={current} />
        </div>
      </div>
    </section>
  );
}
