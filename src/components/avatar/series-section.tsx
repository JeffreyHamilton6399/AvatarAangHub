"use client";

import * as React from "react";
import { Card } from "@/components/ui/card";
import { SectionHeader, SectionDivider } from "./section-header";
import { cn } from "@/lib/utils";
import { SERIES, type Series } from "@/lib/avatar-data";

function SeriesCard({ s, onSelect }: { s: Series; onSelect: (s: Series) => void }) {
  return (
    <button
      onClick={() => onSelect(s)}
      className="card-aa press-aa group relative block overflow-hidden rounded-lg text-left"
    >
      {/* Top accent bar */}
      <div className="h-1 w-full" style={{ backgroundColor: s.accent }} />

      {/* Background image */}
      <div className="relative h-36 overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-40 transition-transform duration-500 group-hover:scale-105 group-hover:opacity-55"
          style={{ backgroundImage: `url(${s.backgroundImage})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[var(--card)] via-[var(--card)]/40 to-transparent" />

        {/* Element symbol */}
        <img
          src={`/images/${s.element}.png`}
          alt={s.element}
          className="absolute right-3 top-3 h-9 w-9 object-contain opacity-80"
          style={{ filter: `drop-shadow(0 0 6px ${s.accent}88)` }}
        />

        {/* Short tag */}
        <span className="absolute left-3 top-3 font-body-aa text-[0.55rem] uppercase tracking-[0.25em] text-white/70">
          {s.short}
        </span>

        {/* Title overlay */}
        <div className="absolute bottom-3 left-3 right-3">
          <h3 className="font-serif text-base font-semibold leading-tight text-foreground drop-shadow">
            {s.title}
          </h3>
        </div>
      </div>

      {/* Body */}
      <div className="p-4">
        <p className="font-body-aa mb-2 text-xs italic text-muted-foreground">
          {s.tagline}
        </p>
        <p className="font-body-aa line-clamp-2 text-xs leading-relaxed text-muted-foreground">
          {s.synopsis}
        </p>

        <div className="mt-3 flex flex-wrap items-center gap-x-3 gap-y-1 font-body-aa text-[0.65rem] uppercase tracking-wider text-muted-foreground">
          <span>{s.years}</span>
          <span className="h-0.5 w-0.5 rounded-full bg-[var(--gold)] opacity-60" />
          <span>{s.books.length} {s.books.length > 1 ? "Books" : "Release"}</span>
          {s.books.reduce((n, b) => n + b.episodes.length, 0) > 1 && (
            <>
              <span className="h-0.5 w-0.5 rounded-full bg-[var(--gold)] opacity-60" />
              <span>{s.books.reduce((n, b) => n + b.episodes.length, 0)} episodes</span>
            </>
          )}
        </div>
      </div>
    </button>
  );
}

function SeriesDetail({ s, onClose }: { s: Series; onClose: () => void }) {
  React.useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 z-[70] flex items-end justify-center bg-black/80 backdrop-blur sm:items-center sm:p-6"
      onClick={(e) => e.target === e.currentTarget && onClose()}
      role="dialog"
      aria-modal="true"
      aria-label={s.title}
    >
      <div className="aa-slide-up relative max-h-[88vh] w-full max-w-2xl overflow-hidden rounded-t-2xl border border-border bg-card shadow-2xl sm:rounded-2xl">
        {/* Banner */}
        <div className="relative h-32 overflow-hidden">
          <div
            className="absolute inset-0 bg-cover bg-center opacity-50"
            style={{ backgroundImage: `url(${s.backgroundImage})` }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-card via-card/60 to-transparent" />
          <div className="h-1 w-full" style={{ backgroundColor: s.accent }} />
          <button
            onClick={onClose}
            className="press-aa absolute right-3 top-3 flex h-8 w-8 items-center justify-center rounded-full bg-background/60 text-muted-foreground backdrop-blur transition-colors hover:text-foreground"
            aria-label="Close"
          >
            ✕
          </button>
        </div>

        <div className="aa-scroll max-h-[calc(88vh-8rem)] overflow-y-auto p-6 sm:p-8">
          <div className="flex items-start gap-4">
            <img
              src={`/images/${s.element}.png`}
              alt={s.element}
              className="h-14 w-14 shrink-0 object-contain"
              style={{ filter: `drop-shadow(0 0 8px ${s.accent}66)` }}
            />
            <div>
              <h3 className="font-display text-2xl font-bold leading-tight">
                {s.title}
              </h3>
              <p className="font-body-aa text-sm italic text-muted-foreground">
                {s.tagline}
              </p>
            </div>
          </div>

          <div className="mt-5 flex flex-wrap gap-x-4 gap-y-1 font-body-aa text-xs uppercase tracking-wider text-muted-foreground">
            <span>{s.years}</span>
            <span className="h-1 w-1 self-center rounded-full bg-[var(--gold)] opacity-60" />
            <span>{s.books.length} books</span>
            {s.books.reduce((n, b) => n + b.episodes.length, 0) > 1 && (
              <>
                <span className="h-1 w-1 self-center rounded-full bg-[var(--gold)] opacity-60" />
                <span>{s.books.reduce((n, b) => n + b.episodes.length, 0)} episodes</span>
              </>
            )}
          </div>

          <p className="font-body-aa mt-5 text-sm leading-relaxed text-foreground/90">
            {s.synopsis}
          </p>

          <div className="mt-6">
            <h4 className="font-serif mb-3 text-[0.65rem] uppercase tracking-[0.25em] text-muted-foreground">
              Books & Seasons
            </h4>
            <div className="flex flex-col gap-2">
              {s.books.map((book, i) => (
                <div
                  key={book.tag}
                  className="flex items-center gap-3 rounded-md border border-border bg-background/40 px-4 py-2.5"
                >
                  <span
                    className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full font-serif text-xs font-bold"
                    style={{ backgroundColor: `${s.accent}22`, color: s.accent }}
                  >
                    {i + 1}
                  </span>
                  <span className="font-body-aa text-sm text-foreground">
                    {book.label}: {book.sublabel}
                  </span>
                  <span className="font-body-aa ml-auto text-[0.65rem] uppercase tracking-wider text-muted-foreground">
                    {book.episodes.length} {book.episodes.length > 1 ? "episodes" : "entry"}
                  </span>
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
    <section id="series" className="scroll-mt-20 py-16 sm:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <SectionHeader
          eyebrow="The Series"
          title="Every chapter of the saga"
          description="From the original animated run to the live-action reimagining and the upcoming theatrical film — trace the Avatar story across every medium."
        />
        <SectionDivider />

        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {SERIES.map((s) => (
            <SeriesCard key={s.id} s={s} onSelect={setSelected} />
          ))}
        </div>
      </div>

      {selected && <SeriesDetail s={selected} onClose={() => setSelected(null)} />}
    </section>
  );
}
