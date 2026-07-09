"use client";

import * as React from "react";
import { X, Play, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { type Series, type Book, type Episode, ELEMENT_COLOR, elementImage } from "@/lib/avatar-data";
import { getProgress } from "@/lib/watch-progress";

interface SeriesDetailProps {
  series: Series;
  onClose: () => void;
  onPlayEpisode: (series: Series, book: Book, episode: Episode) => void;
}

function fmtTime(s: number): string {
  if (!s || s < 1) return "";
  const m = Math.floor(s / 60);
  const sec = Math.floor(s % 60);
  return `${m}:${String(sec).padStart(2, "0")}`;
}

function EpisodeRow({
  s,
  b,
  ep,
  onPlay,
}: {
  s: Series;
  b: Book;
  ep: Episode;
  onPlay: () => void;
}) {
  const accent = s.accent;
  const saved = getProgress(ep.video ?? "");
  const [duration, setDuration] = React.useState<number>(0);
  // We can't know duration without metadata, so we estimate from saved progress
  const progressPct =
    duration > 0 && saved > 0 ? Math.min(100, (saved / duration) * 100) : 0;

  return (
    <button
      onClick={onPlay}
      className="press-aa group flex w-full items-center gap-3 rounded-md border border-border/50 bg-background/40 px-3 py-2.5 text-left transition-colors hover:border-[rgba(201,168,76,0.35)] hover:bg-background/70"
    >
      {/* Thumbnail */}
      <div className="relative h-14 w-24 shrink-0 overflow-hidden rounded">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-55"
          style={{ backgroundImage: `url(${s.backgroundImage})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        <div className="absolute inset-0 flex items-center justify-center opacity-0 transition-opacity group-hover:opacity-100">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-white/25 backdrop-blur">
            <svg className="h-3.5 w-3.5 translate-x-0.5 text-white" fill="currentColor" viewBox="0 0 24 24">
              <path d="M8 5v14l11-7z" />
            </svg>
          </div>
        </div>
        <span
          className="absolute left-1 top-1 flex h-5 items-center rounded px-1 font-mono text-[0.6rem] font-bold"
          style={{ backgroundColor: `${accent}cc`, color: "#04070d" }}
        >
          {ep.n}
        </span>
        {/* Progress bar */}
        {progressPct > 0 && (
          <div className="absolute bottom-0 left-0 h-1 bg-[var(--gold)]" style={{ width: `${progressPct}%` }} />
        )}
      </div>

      {/* Info */}
      <div className="min-w-0 flex-1">
        <h4 className="font-serif truncate text-sm font-semibold text-foreground">
          {ep.n}. {ep.title}
        </h4>
        <p className="font-body-aa text-[0.65rem] uppercase tracking-wider text-muted-foreground">
          {b.label}: {b.sublabel}
          {saved > 5 && <span className="ml-2 text-gold">· resume from {fmtTime(saved)}</span>}
        </p>
      </div>

      <Play className="h-3.5 w-3.5 shrink-0 text-muted-foreground opacity-0 transition-opacity group-hover:opacity-100" />
    </button>
  );
}

function BookSection({
  s,
  b,
  onPlay,
}: {
  s: Series;
  b: Book;
  onPlay: (ep: Episode) => void;
}) {
  const [open, setOpen] = React.useState(b.book === 1);
  const accent = ELEMENT_COLOR[b.element];
  return (
    <div className="overflow-hidden rounded-md border border-border/50 bg-card/30">
      <button
        onClick={() => setOpen((v) => !v)}
        className="press-aa flex w-full items-center gap-3 px-4 py-3 text-left"
      >
        <img
          src={elementImage(b.element)}
          alt=""
          className="h-6 w-6 object-contain"
          style={{ filter: `drop-shadow(0 0 4px ${accent})` }}
        />
        <div className="flex-1">
          <h3 className="font-serif text-sm font-semibold" style={{ color: accent }}>
            {b.label}: {b.sublabel}
          </h3>
          <p className="font-body-aa text-[0.6rem] uppercase tracking-wider text-muted-foreground">
            {b.episodes.length} episodes
          </p>
        </div>
        <ChevronDown
          className={cn("h-4 w-4 text-muted-foreground transition-transform", open && "rotate-180")}
        />
      </button>
      {open && (
        <div className="space-y-1.5 border-t border-border/40 p-2.5">
          {b.episodes.map((ep) => (
            <EpisodeRow key={ep.n} s={s} b={b} ep={ep} onPlay={() => onPlay(ep)} />
          ))}
        </div>
      )}
    </div>
  );
}

export function SeriesDetail({ series, onClose, onPlayEpisode }: SeriesDetailProps) {
  React.useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  const totalEps = series.books.reduce((n, b) => n + b.episodes.length, 0);
  const firstEp = series.books[0]?.episodes[0];

  return (
    <div
      className="fixed inset-0 z-[75] overflow-y-auto bg-background/95 backdrop-blur"
      role="dialog"
      aria-modal="true"
      aria-label={series.title}
    >
      <style>{`
        .aa-scroll::-webkit-scrollbar { width: 8px; }
        .aa-scroll::-webkit-scrollbar-thumb { background: rgba(201,168,76,0.3); border-radius: 4px; }
      `}</style>

      {/* Hero backdrop */}
      <div className="relative h-[40vh] min-h-[280px] w-full overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-50"
          style={{ backgroundImage: `url(${series.backgroundImage})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-background/80 to-transparent" />

        <button
          onClick={onClose}
          className="press-aa absolute left-4 top-4 z-10 flex items-center gap-2 rounded-full border border-border/60 bg-background/70 px-4 py-2 font-body-aa text-xs uppercase tracking-widest text-foreground backdrop-blur transition-colors hover:bg-background"
          aria-label="Back"
        >
          <X className="h-3.5 w-3.5" /> Close
        </button>

        <div className="absolute bottom-0 left-0 right-0 mx-auto max-w-5xl px-4 pb-8 sm:px-6 lg:px-10">
          <div className="flex items-center gap-3">
            <img
              src={elementImage(series.element)}
              alt={series.element}
              className="h-12 w-12 object-contain"
              style={{ filter: `drop-shadow(0 0 8px ${series.accent})` }}
            />
            <div>
              <p className="font-body-aa mb-1 text-[0.6rem] uppercase tracking-[0.3em] text-gold">
                {series.short} · {series.years}
              </p>
              <h1 className="font-display text-3xl font-bold leading-none tracking-wide text-foreground sm:text-4xl">
                {series.title}
              </h1>
            </div>
          </div>
        </div>
      </div>

      {/* Body */}
      <div className="mx-auto max-w-5xl px-4 py-8 sm:px-6 lg:px-10">
        {/* Synopsis + play button */}
        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-start">
          <div className="flex-1">
            <p className="font-body-aa text-sm italic text-muted-foreground">
              {series.tagline}
            </p>
            <p className="font-body-aa mt-3 max-w-2xl text-sm leading-relaxed text-foreground/90">
              {series.synopsis}
            </p>
            <div className="font-body-aa mt-4 flex flex-wrap items-center gap-x-4 gap-y-1 text-[0.65rem] uppercase tracking-wider text-muted-foreground">
              <span>{series.books.length} books</span>
              <span className="h-1 w-1 rounded-full bg-[var(--gold)] opacity-60" />
              <span>{totalEps} episodes</span>
            </div>
          </div>
          {firstEp?.video && (
            <button
              onClick={() => onPlayEpisode(series, series.books[0], firstEp)}
              className="press-aa inline-flex shrink-0 items-center gap-2 rounded-full bg-white px-6 py-3 font-serif text-[0.6rem] uppercase tracking-[0.3em] text-black transition-all hover:bg-white/90"
            >
              <svg className="h-3.5 w-3.5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M8 5v14l11-7z" />
              </svg>
              Play
            </button>
          )}
        </div>

        {/* Books with episodes */}
        <div className="space-y-3">
          {series.books.map((b) => (
            <BookSection
              key={b.tag}
              s={series}
              b={b}
              onPlay={(ep) => onPlayEpisode(series, b, ep)}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
