"use client";

import * as React from "react";
import { Search, Github, Youtube } from "lucide-react";
import { Hero } from "@/components/avatar/hero";
import { NetflixRow } from "@/components/avatar/netflix-row";
import { VideoPlayer } from "@/components/avatar/video-player";
import { BookReader } from "@/components/avatar/book-reader";
import { SeriesDetail } from "@/components/avatar/series-detail";
import { Footer } from "@/components/avatar/footer";
import { LoadingScreen } from "@/components/avatar/loading-screen";
import { SearchCommand } from "@/components/avatar/search-command";
import { ThemeSwitcher } from "@/components/avatar/theme-switcher";
import { useContinueWatching } from "@/lib/watch-progress";
import {
  SERIES,
  TRILOGIES,
  ELEMENT_COLOR,
  elementImage,
  type Series,
  type Book,
  type Episode,
  type Novel,
  type Trilogy,
} from "@/lib/avatar-data";

type PlayState =
  | { kind: "video"; src: string; title: string; caption?: string; meta: VideoMeta }
  | { kind: "book"; trilogy: Trilogy; part: number };

interface VideoMeta {
  seriesShort: string;
  bookSublabel: string;
  episodeTitle: string;
  episodeN: number;
  backgroundImage: string;
  accent: string;
}

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
    if (isMovie(s)) {
      const b = s.books[0];
      const ep = b.episodes[0];
      if (ep) playEpisode(s, b, ep);
    } else {
      setDetailSeries(s);
    }
  };

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
      <LoadingScreen />
      {/* Floating controls top-right */}
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

      {/* Floating social icons bottom-right */}
      <div className="pointer-events-none fixed bottom-4 right-4 z-40 flex gap-2">
        <a
          href="https://github.com/JeffreyHamilton6399/AvatarArchive"
          target="_blank"
          rel="noopener noreferrer"
          className="press-aa pointer-events-auto flex h-9 w-9 items-center justify-center rounded-full border border-border/60 bg-background/70 text-muted-foreground backdrop-blur transition-colors hover:text-foreground"
          aria-label="GitHub"
        >
          <Github className="h-3.5 w-3.5" />
        </a>
        <a
          href="https://www.youtube.com/@Jeffrey_Creates"
          target="_blank"
          rel="noopener noreferrer"
          className="press-aa pointer-events-auto flex h-9 w-9 items-center justify-center rounded-full border border-border/60 bg-background/70 text-muted-foreground backdrop-blur transition-colors hover:text-foreground"
          aria-label="YouTube"
        >
          <Youtube className="h-3.5 w-3.5" />
        </a>
      </div>

      <main className="flex-1">
        <Hero />

        <div className="space-y-8 py-8">
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

          <NetflixRow
            title="Series"
            items={SERIES}
            keyExtractor={(s) => s.id}
            renderItem={(s) => <SeriesCard s={s} onClick={() => openSeries(s)} />}
          />

          <NetflixRow
            title="Graphic Novels"
            items={TRILOGIES}
            keyExtractor={(t) => t.name}
            renderItem={(t) => (
              <TrilogyCard
                t={t}
                onClick={() => setPlay({ kind: "book", trilogy: t, part: 1 })}
              />
            )}
          />
        </div>

        <Footer />
      </main>

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

      {play?.kind === "video" && (
        <VideoPlayer
          src={play.src}
          title={play.title}
          caption={play.caption}
          meta={play.meta}
          onClose={() => setPlay(null)}
        />
      )}

      {play?.kind === "book" && (
        <BookReader
          pdfUrl={play.trilogy.parts.find((p) => p.part === play.part)?.url ?? play.trilogy.parts[0].url}
          title={play.trilogy.parts.find((p) => p.part === play.part)?.title ?? play.trilogy.parts[0].title}
          trilogyName={play.trilogy.name}
          parts={play.trilogy.parts.map((p) => ({ title: p.title, url: p.url, part: p.part }))}
          currentPart={play.part}
          onSelectPart={(part) => setPlay({ kind: "book", trilogy: play.trilogy, part })}
          onClose={() => setPlay(null)}
        />
      )}

      <SearchCommand
        open={searchOpen}
        onOpenChange={setSearchOpen}
        onPlayVideo={(seriesId, bookTag, ep) => playByCoords(seriesId, bookTag, ep)}
        onPlayNovel={(n: Novel) => {
          const t = TRILOGIES.find((x) => x.name === n.trilogy);
          if (t) setPlay({ kind: "book", trilogy: t, part: n.part });
        }}
      />
    </div>
  );
}

// ── Series card (no element icon in top-right) ───────────────────────────────
function SeriesCard({ s, onClick }: { s: Series; onClick: () => void }) {
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

// ── Trilogy card — minimal (just name + description, smaller) ────────────────
function TrilogyCard({ t, onClick }: { t: Trilogy; onClick: () => void }) {
  const color = ELEMENT_COLOR[t.element];
  return (
    <button
      onClick={onClick}
      className="press-aa card-aa group relative block w-[160px] overflow-hidden rounded-md text-left sm:w-[180px]"
      style={{ borderTopColor: `${color}88`, borderTopWidth: 2 }}
    >
      <div className="relative flex h-36 items-center justify-center bg-gradient-to-b from-secondary/40 to-card p-3">
        <div className="text-center">
          <h3 className="font-display text-base font-bold leading-tight text-foreground">
            {t.name}
          </h3>
          <div
            className="mx-auto mt-2 h-px w-10"
            style={{ background: `linear-gradient(to right, transparent, ${color}, transparent)` }}
          />
        </div>
        {/* Play overlay */}
        <div className="absolute inset-0 flex items-center justify-center opacity-0 transition-opacity group-hover:opacity-100">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white/20 backdrop-blur">
            <svg className="h-4 w-4 translate-x-0.5 text-white" fill="currentColor" viewBox="0 0 24 24">
              <path d="M8 5v14l11-7z" />
            </svg>
          </div>
        </div>
      </div>
      <div className="p-2">
        <p className="font-body-aa line-clamp-2 text-[0.7rem] leading-relaxed text-muted-foreground">
          {t.description}
        </p>
      </div>
    </button>
  );
}
