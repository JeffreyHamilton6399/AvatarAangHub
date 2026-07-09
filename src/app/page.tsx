"use client";

import * as React from "react";
import { Search, Settings } from "lucide-react";
import { Hero } from "@/components/avatar/hero";
import { NetflixRow } from "@/components/avatar/netflix-row";
import { VideoPlayer } from "@/components/avatar/video-player";
import { PdfReader } from "@/components/avatar/pdf-reader";
import { Footer } from "@/components/avatar/footer";
import { SearchCommand } from "@/components/avatar/search-command";
import { ThemeSwitcher } from "@/components/avatar/theme-switcher";
import {
  SERIES,
  CHARACTERS,
  TRILOGIES,
  TIMELINE,
  ELEMENT_COLOR,
  elementImage,
  type Series,
  type Book,
  type Episode,
  type Character,
  type Novel,
  type TimelineEvent,
  type ElementId,
} from "@/lib/avatar-data";

interface PlayState {
  kind: "video" | "pdf";
  src: string;
  title: string;
  caption?: string;
}

export default function Home() {
  const [searchOpen, setSearchOpen] = React.useState(false);
  const [play, setPlay] = React.useState<PlayState | null>(null);

  React.useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement | null;
      const typing =
        target &&
        (target.tagName === "INPUT" || target.tagName === "TEXTAREA" || target.isContentEditable);
      if (e.key === "/" && !typing && !searchOpen && !play) {
        e.preventDefault();
        setSearchOpen(true);
      }
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setSearchOpen((v) => !v);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [searchOpen, play]);

  const playEpisode = (s: Series, b: Book, ep: Episode) => {
    if (!ep.video) return;
    setPlay({ kind: "video", src: ep.video, title: `${s.short} · ${b.sublabel} · Ep ${ep.n}: ${ep.title}`, caption: ep.caption });
  };

  const playNovel = (n: Novel) => {
    setPlay({ kind: "pdf", src: n.url, title: n.title });
  };

  // Flatten all episodes into one list for the "All Episodes" row
  const allEpisodes = React.useMemo(
    () =>
      SERIES.flatMap((s) =>
        s.books.flatMap((b) =>
          b.episodes.map((ep) => ({ s, b, ep }))
        )
      ),
    []
  );

  return (
    <div className="flex min-h-screen flex-col">
      {/* Floating controls (no navbar) */}
      <div className="pointer-events-none fixed right-4 top-4 z-40 flex gap-2">
        <button
          onClick={() => setSearchOpen(true)}
          className="press-aa pointer-events-auto flex h-10 w-10 items-center justify-center rounded-full border border-border/60 bg-background/70 text-foreground backdrop-blur transition-colors hover:bg-background"
          aria-label="Search"
        >
          <Search className="h-4 w-4" />
        </button>
        <div className="pointer-events-auto">
          <ThemeSwitcher />
        </div>
      </div>

      <main className="flex-1">
        <Hero />

        {/* Series row */}
        <div className="space-y-6 py-8">
          <NetflixRow
            title="Series"
            items={SERIES}
            keyExtractor={(s) => s.id}
            renderItem={(s) => <SeriesCard s={s} />}
          />

          {/* Continue / All Episodes row — Netflix style episode cards */}
          <NetflixRow
            title="Episodes"
            items={allEpisodes}
            keyExtractor={({ s, b, ep }) => `${s.id}-${b.tag}-${ep.n}`}
            renderItem={({ s, b, ep }) => (
              <EpisodeCard
                s={s}
                b={b}
                ep={ep}
                onClick={() => playEpisode(s, b, ep)}
              />
            )}
          />

          {/* Characters row */}
          <NetflixRow
            title="Characters"
            items={CHARACTERS}
            keyExtractor={(c) => c.id}
            renderItem={(c) => <CharacterCard c={c} />}
          />

          {/* Graphic novels row */}
          <NetflixRow
            title="Graphic Novels"
            items={TRILOGIES.flatMap((t) => t.parts)}
            keyExtractor={(n) => n.file}
            renderItem={(n) => <NovelCard n={n} onClick={() => playNovel(n)} />}
          />

          {/* Timeline row */}
          <NetflixRow
            title="Timeline"
            items={TIMELINE}
            keyExtractor={(t, i) => `tl-${i}`}
            renderItem={(t) => <TimelineCard t={t} />}
          />
        </div>

        <ElementsStrip />
      </main>

      <Footer />

      {play?.kind === "video" && (
        <VideoPlayer
          src={play.src}
          title={play.title}
          caption={play.caption}
          onClose={() => setPlay(null)}
        />
      )}
      {play?.kind === "pdf" && (
        <PdfReader src={play.src} title={play.title} onClose={() => setPlay(null)} />
      )}

      <SearchCommand open={searchOpen} onOpenChange={setSearchOpen} />
    </div>
  );
}

// ── Series card ──────────────────────────────────────────────────────────────
function SeriesCard({ s }: { s: Series }) {
  return (
    <div
      className="press-aa card-aa relative block w-[260px] overflow-hidden rounded-md sm:w-[300px]"
      onClick={() => document.getElementById("episodes-row")?.scrollIntoView({ behavior: "smooth" })}
    >
      <div className="relative h-40 overflow-hidden sm:h-44">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-60"
          style={{ backgroundImage: `url(${s.backgroundImage})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-card via-card/40 to-transparent" />
        <div className="h-1 w-full" style={{ backgroundColor: s.accent }} />
        <img
          src={elementImage(s.element)}
          alt={s.element}
          className="absolute right-3 top-3 h-8 w-8 object-contain opacity-80"
          style={{ filter: `drop-shadow(0 0 5px ${s.accent})` }}
        />
        <div className="absolute bottom-3 left-3 right-3">
          <p className="font-body-aa mb-1 text-[0.55rem] uppercase tracking-[0.2em] text-white/70">
            {s.short} · {s.years}
          </p>
          <h3 className="font-serif text-base font-semibold leading-tight text-foreground drop-shadow">
            {s.title}
          </h3>
        </div>
      </div>
      <div className="p-3">
        <p className="font-body-aa line-clamp-2 text-xs leading-relaxed text-muted-foreground">
          {s.synopsis}
        </p>
      </div>
    </div>
  );
}

// ── Episode card ─────────────────────────────────────────────────────────────
function EpisodeCard({
  s,
  b,
  ep,
  onClick,
}: {
  s: Series;
  b: Book;
  ep: Episode;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className="press-aa card-aa group relative block w-[240px] overflow-hidden rounded-md text-left sm:w-[280px]"
    >
      {/* Thumbnail area — uses series bg as stand-in */}
      <div className="relative h-32 overflow-hidden sm:h-36">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-50 transition-transform duration-500 group-hover:scale-105"
          style={{ backgroundImage: `url(${s.backgroundImage})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-card via-card/50 to-transparent" />
        {/* Play icon overlay */}
        <div className="absolute inset-0 flex items-center justify-center opacity-0 transition-opacity group-hover:opacity-100">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white/20 backdrop-blur">
            <svg className="h-5 w-5 translate-x-0.5 text-white" fill="currentColor" viewBox="0 0 24 24">
              <path d="M8 5v14l11-7z" />
            </svg>
          </div>
        </div>
        {/* Episode number badge */}
        <span
          className="absolute left-2 top-2 flex h-6 items-center rounded px-1.5 font-mono text-xs font-bold"
          style={{ backgroundColor: `${s.accent}cc`, color: "#04070d" }}
        >
          {b.sublabel.slice(0, 1)}{ep.n}
        </span>
        <img
          src={elementImage(b.element)}
          alt=""
          className="absolute right-2 top-2 h-6 w-6 object-contain opacity-70"
        />
      </div>
      <div className="p-2.5">
        <p className="font-body-aa mb-0.5 text-[0.6rem] uppercase tracking-wider text-muted-foreground">
          {s.short} · {b.sublabel}
        </p>
        <h3 className="font-serif line-clamp-1 text-sm font-semibold text-foreground">
          {ep.title}
        </h3>
      </div>
    </button>
  );
}

// ── Character card ───────────────────────────────────────────────────────────
function CharacterCard({ c }: { c: Character }) {
  const color = ELEMENT_COLOR[c.element];
  return (
    <div
      className="press-aa card-aa relative w-[180px] overflow-hidden rounded-md p-4 sm:w-[200px]"
      style={{ borderTopColor: `${color}88`, borderTopWidth: 2 }}
    >
      <div className="flex items-center gap-3">
        <div
          className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border font-display text-lg font-bold"
          style={{ borderColor: `${color}55`, backgroundColor: `${color}1a`, color }}
        >
          {c.name.charAt(0)}
        </div>
        <div className="min-w-0">
          <h3 className="font-serif truncate text-sm font-semibold text-foreground">
            {c.name}
          </h3>
          <p className="font-body-aa truncate text-[0.6rem] uppercase tracking-wider text-muted-foreground">
            {c.role}
          </p>
        </div>
      </div>
      <p className="font-body-aa mt-3 line-clamp-3 text-xs leading-relaxed text-muted-foreground">
        {c.description}
      </p>
      {c.quote !== "..." && (
        <p className="font-body-aa mt-2 border-l-2 pl-2 text-[0.7rem] italic leading-snug text-foreground/70" style={{ borderColor: `${color}55` }}>
          {c.quote}
        </p>
      )}
    </div>
  );
}

// ── Novel card ───────────────────────────────────────────────────────────────
function NovelCard({ n, onClick }: { n: Novel; onClick: () => void }) {
  const color = ELEMENT_COLOR[
    TRILOGIES.find((t) => t.name === n.trilogy)?.element ?? "spirit"
  ];
  return (
    <button
      onClick={onClick}
      className="press-aa card-aa group relative block w-[150px] overflow-hidden rounded-md text-left sm:w-[170px]"
      style={{ borderTopColor: `${color}88`, borderTopWidth: 2 }}
    >
      <div className="flex h-44 items-center justify-center bg-gradient-to-b from-secondary/40 to-card p-3">
        <span
          className="font-display text-3xl font-bold opacity-30"
          style={{ color }}
        >
          {n.part}
        </span>
      </div>
      <div className="p-2.5">
        <p className="font-body-aa mb-0.5 text-[0.55rem] uppercase tracking-wider text-muted-foreground">
          {n.trilogy}
        </p>
        <h3 className="font-serif line-clamp-2 text-xs font-semibold leading-tight text-foreground">
          {n.title}
        </h3>
      </div>
    </button>
  );
}

// ── Timeline card ────────────────────────────────────────────────────────────
function TimelineCard({ t }: { t: TimelineEvent }) {
  const color = ELEMENT_COLOR[t.element];
  return (
    <div
      className="press-aa card-aa relative w-[260px] overflow-hidden rounded-md p-4 sm:w-[300px]"
      style={{ borderTopColor: `${color}88`, borderTopWidth: 2 }}
    >
      <div className="mb-2 flex items-center gap-2">
        <img
          src={elementImage(t.element)}
          alt=""
          className="h-5 w-5 object-contain"
          style={{ filter: `drop-shadow(0 0 3px ${color})` }}
        />
        <span className="font-mono text-xs font-bold" style={{ color }}>
          {t.year}
        </span>
      </div>
      <h3 className="font-serif text-sm font-semibold leading-tight text-foreground">
        {t.title}
      </h3>
      <p className="font-body-aa mt-1.5 line-clamp-3 text-xs leading-relaxed text-muted-foreground">
        {t.detail}
      </p>
      <p className="font-body-aa mt-2 text-[0.55rem] uppercase tracking-wider text-muted-foreground">
        {t.era}
      </p>
    </div>
  );
}

// ── Elements strip (bottom) ──────────────────────────────────────────────────
import { ELEMENTS } from "@/lib/avatar-data";

function ElementsStrip() {
  return (
    <section className="border-t border-border/50 bg-card/20 py-10">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-10">
        <div className="flex flex-wrap items-center justify-center gap-6 sm:gap-10">
          {ELEMENTS.map((e) => (
            <div
              key={e.id}
              className="press-aa group flex cursor-default flex-col items-center gap-2"
              title={`${e.name} — ${e.philosophy}`}
            >
              <img
                src={e.image}
                alt={e.name}
                className="h-10 w-10 object-contain opacity-80 transition-all group-hover:opacity-100"
                style={{ filter: `drop-shadow(0 0 6px ${e.color})` }}
              />
              <span
                className="font-serif text-xs font-semibold uppercase tracking-widest"
                style={{ color: e.color }}
              >
                {e.name}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
