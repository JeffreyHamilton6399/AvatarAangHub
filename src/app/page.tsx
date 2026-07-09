"use client";

import * as React from "react";
import { Search } from "lucide-react";
import { Hero } from "@/components/avatar/hero";
import { NetflixRow } from "@/components/avatar/netflix-row";
import { VideoPlayer } from "@/components/avatar/video-player";
import { NovelReader } from "@/components/avatar/novel-reader";
import { SeriesDetail } from "@/components/avatar/series-detail";
import { Footer } from "@/components/avatar/footer";
import { SearchCommand } from "@/components/avatar/search-command";
import { ThemeSwitcher } from "@/components/avatar/theme-switcher";
import { useContinueWatching } from "@/lib/watch-progress";
import {
  SERIES,
  TRILOGIES,
  NOVELS,
  ELEMENT_COLOR,
  elementImage,
  type Series,
  type Book,
  type Episode,
  type Novel,
} from "@/lib/avatar-data";

type PlayState =
  | { kind: "video"; src: string; title: string; caption?: string; meta: VideoMeta }
  | { kind: "pdf"; novel: Novel };

interface VideoMeta {
  seriesShort: string;
  bookSublabel: string;
  episodeTitle: string;
  episodeN: number;
  backgroundImage: string;
  accent: string;
}

/** A series is a "movie" if it has exactly one episode total — play directly. */
function isMovie(s: Series): boolean {
  return s.books.reduce((n, b) => n + b.episodes.length, 0) === 1;
}

export default function Home() {
  const [searchOpen, setSearchOpen] = React.useState(false);
  const [play, setPlay] = React.useState<PlayState | null>(null);
  const [detailSeries, setDetailSeries] = React.useState<Series | null>(null);
  const { continueList } = useContinueWatching();

  React.useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement | null;
      const typing =
        target && (target.tagName === "INPUT" || target.tagName === "TEXTAREA" || target.isContentEditable);
      if (e.key === "/" && !typing && !searchOpen && !play && !detailSeries) {
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
  }, [searchOpen, play, detailSeries]);

  const playEpisode = (s: Series, b: Book, ep: Episode) => {
    if (!ep.video) return;
    setPlay({
      kind: "video",
      src: ep.video,
      title: `${s.short} · ${b.sublabel} · Ep ${ep.n}: ${ep.title}`,
      caption: ep.caption,
      meta: {
        seriesShort: s.short,
        bookSublabel: b.sublabel,
        episodeTitle: ep.title,
        episodeN: ep.n,
        backgroundImage: s.backgroundImage,
        accent: s.accent,
      },
    });
  };

  const openSeries = (s: Series) => {
    // Movies play directly instead of opening a detail page
    if (isMovie(s)) {
      const b = s.books[0];
      const ep = b.episodes[0];
      if (ep) playEpisode(s, b, ep);
    } else {
      setDetailSeries(s);
    }
  };

  // Find and play an episode by series id + book tag + episode number (for search)
  const playByCoords = (seriesId: string, bookTag: string, episodeN: number) => {
    const s = SERIES.find((x) => x.id === seriesId);
    if (!s) return;
    const b = s.books.find((x) => x.tag === bookTag);
    if (!b) return;
    const ep = b.episodes.find((x) => x.n === episodeN);
    if (ep) playEpisode(s, b, ep);
  };

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

        <div className="space-y-8 py-8">
          {/* Continue Watching — only shows when there's saved progress */}
          {continueList.length > 0 && (
            <NetflixRow
              title="Continue Watching"
              items={continueList}
              keyExtractor={(e) => e.videoUrl}
              renderItem={(e) => (
                <ContinueCard
                  entry={e}
                  onClick={() => {
                    for (const s of SERIES) {
                      for (const b of s.books) {
                        const ep = b.episodes.find((x) => x.video === e.videoUrl);
                        if (ep) {
                          playEpisode(s, b, ep);
                          return;
                        }
                      }
                    }
                    setPlay({
                      kind: "video",
                      src: e.videoUrl,
                      title: e.title,
                      meta: {
                        seriesShort: e.seriesShort,
                        bookSublabel: e.bookSublabel,
                        episodeTitle: e.episodeTitle,
                        episodeN: e.episodeN,
                        backgroundImage: e.backgroundImage,
                        accent: e.accent,
                      },
                    });
                  }}
                />
              )}
            />
          )}

          {/* Series row — click opens detail (or plays directly for movies) */}
          <NetflixRow
            title="Series"
            items={SERIES}
            keyExtractor={(s) => s.id}
            renderItem={(s) => <SeriesCard s={s} onClick={() => openSeries(s)} />}
          />

          {/* Graphic Novels — single consolidated row with all 18 */}
          <NetflixRow
            title="Graphic Novels"
            items={NOVELS}
            keyExtractor={(n) => n.file}
            renderItem={(n) => (
              <NovelCard n={n} onClick={() => setPlay({ kind: "pdf", novel: n })} />
            )}
          />
        </div>

        <ElementsStrip />
      </main>

      <Footer />

      {/* Series detail (Netflix-style) */}
      {detailSeries && (
        <SeriesDetail
          series={detailSeries}
          onClose={() => setDetailSeries(null)}
          onPlayEpisode={(s, b, ep) => {
            setDetailSeries(null);
            playEpisode(s, b, ep);
          }}
        />
      )}

      {/* Video player */}
      {play?.kind === "video" && (
        <VideoPlayer
          src={play.src}
          title={play.title}
          caption={play.caption}
          meta={play.meta}
          onClose={() => setPlay(null)}
        />
      )}

      {/* Novel reader */}
      {play?.kind === "pdf" && (
        <NovelReader
          novel={play.novel}
          onClose={() => setPlay(null)}
          onSelect={(n) => setPlay({ kind: "pdf", novel: n })}
        />
      )}

      <SearchCommand
        open={searchOpen}
        onOpenChange={setSearchOpen}
        onPlayVideo={(seriesId, bookTag, ep) => playByCoords(seriesId, bookTag, ep)}
        onPlayNovel={(n) => setPlay({ kind: "pdf", novel: n })}
      />
    </div>
  );
}

// ── Series card ──────────────────────────────────────────────────────────────
function SeriesCard({ s, onClick }: { s: Series; onClick: () => void }) {
  const movie = isMovie(s);
  return (
    <button
      onClick={onClick}
      className="press-aa card-aa group relative block w-[260px] overflow-hidden rounded-md text-left sm:w-[300px]"
    >
      <div className="relative h-40 overflow-hidden sm:h-44">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-60 transition-transform duration-500 group-hover:scale-105"
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
        {/* Play overlay on hover — for movies, it's a direct play; for series, it opens detail */}
        <div className="absolute inset-0 flex items-center justify-center opacity-0 transition-opacity group-hover:opacity-100">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white/20 backdrop-blur">
            <svg className="h-5 w-5 translate-x-0.5 text-white" fill="currentColor" viewBox="0 0 24 24">
              <path d="M8 5v14l11-7z" />
            </svg>
          </div>
        </div>
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
    </button>
  );
}

// ── Continue Watching card ───────────────────────────────────────────────────
function ContinueCard({
  entry,
  onClick,
}: {
  entry: {
    videoUrl: string;
    title: string;
    seriesShort: string;
    bookSublabel: string;
    episodeTitle: string;
    episodeN: number;
    backgroundImage: string;
    accent: string;
    currentTime: number;
    duration: number;
  };
  onClick: () => void;
}) {
  const pct = entry.duration > 0 ? Math.min(100, (entry.currentTime / entry.duration) * 100) : 0;
  const minsLeft = Math.max(0, Math.round((entry.duration - entry.currentTime) / 60));
  return (
    <button
      onClick={onClick}
      className="press-aa card-aa group relative block w-[260px] overflow-hidden rounded-md text-left sm:w-[300px]"
    >
      <div className="relative h-32 overflow-hidden sm:h-36">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-55 transition-transform duration-500 group-hover:scale-105"
          style={{ backgroundImage: `url(${entry.backgroundImage})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-card via-card/50 to-transparent" />
        <div className="absolute inset-0 flex items-center justify-center opacity-0 transition-opacity group-hover:opacity-100">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white/20 backdrop-blur">
            <svg className="h-5 w-5 translate-x-0.5 text-white" fill="currentColor" viewBox="0 0 24 24">
              <path d="M8 5v14l11-7z" />
            </svg>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-black/50">
          <div className="h-full" style={{ width: `${pct}%`, backgroundColor: entry.accent }} />
        </div>
        <span className="absolute right-2 top-2 rounded bg-black/70 px-1.5 py-0.5 font-body-aa text-[0.55rem] uppercase tracking-wider text-white/90">
          {minsLeft}m left
        </span>
      </div>
      <div className="p-2.5">
        <p className="font-body-aa mb-0.5 text-[0.6rem] uppercase tracking-wider text-muted-foreground">
          {entry.seriesShort} · {entry.bookSublabel} · Ep {entry.episodeN}
        </p>
        <h3 className="font-serif line-clamp-1 text-sm font-semibold text-foreground">
          {entry.episodeTitle}
        </h3>
      </div>
    </button>
  );
}

// ── Novel card ───────────────────────────────────────────────────────────────
function NovelCard({ n, onClick }: { n: Novel; onClick: () => void }) {
  const color = ELEMENT_COLOR[TRILOGIES.find((t) => t.name === n.trilogy)?.element ?? "spirit"];
  return (
    <button
      onClick={onClick}
      className="press-aa card-aa group relative block w-[140px] overflow-hidden rounded-md text-left sm:w-[160px]"
      style={{ borderTopColor: `${color}88`, borderTopWidth: 2 }}
    >
      <div className="relative flex h-40 items-center justify-center bg-gradient-to-b from-secondary/40 to-card p-3">
        <span className="font-display text-5xl font-bold opacity-25" style={{ color }}>
          {n.part}
        </span>
        <div className="absolute inset-0 flex items-center justify-center opacity-0 transition-opacity group-hover:opacity-100">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white/20 backdrop-blur">
            <svg className="h-4 w-4 translate-x-0.5 text-white" fill="currentColor" viewBox="0 0 24 24">
              <path d="M8 5v14l11-7z" />
            </svg>
          </div>
        </div>
      </div>
      <div className="p-2.5">
        <p className="font-body-aa mb-0.5 text-[0.5rem] uppercase tracking-wider" style={{ color }}>
          {n.trilogy}
        </p>
        <h3 className="font-serif line-clamp-2 text-xs font-semibold leading-tight text-foreground">
          {n.title}
        </h3>
      </div>
    </button>
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
