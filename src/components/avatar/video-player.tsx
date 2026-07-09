"use client";

import * as React from "react";
import { X, Loader2, Plus, Minus, Gauge, Maximize, Minimize } from "lucide-react";
import { saveProgress, getProgress } from "@/lib/watch-progress";
import { useCaptions, getActiveCue } from "@/lib/captions";
import { cn } from "@/lib/utils";

interface VideoPlayerProps {
  src: string;
  title: string;
  caption?: string;
  captionOffset?: number;
  meta?: {
    seriesShort: string;
    bookSublabel: string;
    episodeTitle: string;
    episodeN: number;
    backgroundImage: string;
    accent: string;
  };
  onClose: () => void;
}

const SPEEDS = [0.5, 0.75, 1, 1.25, 1.5, 2];

export function VideoPlayer({
  src,
  title,
  caption,
  captionOffset = 0,
  meta,
  onClose,
}: VideoPlayerProps) {
  const videoRef = React.useRef<HTMLVideoElement | null>(null);
  const containerRef = React.useRef<HTMLDivElement | null>(null);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState<string | null>(null);
  const [ccOn, setCcOn] = React.useState(true);
  const [currentTime, setCurrentTime] = React.useState(0);
  const [offset, setOffset] = React.useState(captionOffset);
  const [speed, setSpeed] = React.useState(1);
  const [showSpeedMenu, setShowSpeedMenu] = React.useState(false);
  const [isFullscreen, setIsFullscreen] = React.useState(false);
  const saveTimerRef = React.useRef<ReturnType<typeof setInterval> | null>(null);
  const rafRef = React.useRef<number | null>(null);

  const { cues, loaded: captionsLoaded } = useCaptions(caption);
  const lookupTime = currentTime - offset;
  const activeCue = caption && ccOn ? getActiveCue(cues, lookupTime) : null;

  // Restore saved position on load
  React.useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    const saved = getProgress(src);
    const onLoadedMeta = () => {
      if (saved > 5 && saved < v.duration - 15) {
        v.currentTime = saved;
      }
    };
    v.addEventListener("loadedmetadata", onLoadedMeta, { once: true });
    return () => v.removeEventListener("loadedmetadata", onLoadedMeta);
  }, [src]);

  // Periodically save progress
  React.useEffect(() => {
    const v = videoRef.current;
    if (!v || !meta) return;
    const save = () => {
      if (v.duration > 0 && v.currentTime > 0) {
        saveProgress({
          videoUrl: src,
          title,
          seriesShort: meta.seriesShort,
          bookSublabel: meta.bookSublabel,
          episodeTitle: meta.episodeTitle,
          episodeN: meta.episodeN,
          backgroundImage: meta.backgroundImage,
          accent: meta.accent,
          currentTime: v.currentTime,
          duration: v.duration,
          updatedAt: Date.now(),
        });
      }
    };
    saveTimerRef.current = setInterval(save, 5000);
    v.addEventListener("pause", save);
    window.addEventListener("beforeunload", save);
    return () => {
      if (saveTimerRef.current) clearInterval(saveTimerRef.current);
      save();
      v.removeEventListener("pause", save);
      window.removeEventListener("beforeunload", save);
    };
  }, [src, title, meta]);

  // RAF loop for smooth caption sync
  React.useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    const tick = () => {
      setCurrentTime(v.currentTime);
      rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  React.useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  // Track fullscreen state
  React.useEffect(() => {
    const onFsChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };
    document.addEventListener("fullscreenchange", onFsChange);
    return () => document.removeEventListener("fullscreenchange", onFsChange);
  }, []);

  // Close speed menu on outside click
  React.useEffect(() => {
    if (!showSpeedMenu) return;
    const onClick = () => setShowSpeedMenu(false);
    const timer = setTimeout(() => {
      window.addEventListener("click", onClick, { once: true });
    }, 0);
    return () => {
      clearTimeout(timer);
      window.removeEventListener("click", onClick);
    };
  }, [showSpeedMenu]);

  const toggleCc = () => setCcOn((v) => !v);
  const hasCaptions = caption && captionsLoaded && cues.length > 0;
  const onContextMenu = (e: React.MouseEvent) => e.preventDefault();
  const adjustOffset = (delta: number) => setOffset((o) => o + delta);

  const changeSpeed = (s: number) => {
    setSpeed(s);
    if (videoRef.current) videoRef.current.playbackRate = s;
    setShowSpeedMenu(false);
  };

  // Fullscreen the CONTAINER (not just the video) so captions stay visible
  const toggleFullscreen = () => {
    const el = containerRef.current;
    if (!el) return;
    if (!document.fullscreenElement) {
      el.requestFullscreen?.().catch(() => {});
    } else {
      document.exitFullscreen?.().catch(() => {});
    }
  };

  return (
    <div
      className="fixed inset-0 z-[80] flex items-center justify-center bg-black/92 p-2 backdrop-blur sm:p-6"
      onClick={(e) => e.target === e.currentTarget && onClose()}
      role="dialog"
      aria-modal="true"
      aria-label={`Playing ${title}`}
    >
      <div
        ref={containerRef}
        className="aa-slide-up relative flex w-full max-w-5xl flex-col overflow-hidden rounded-lg border border-border bg-black shadow-2xl"
      >
        {/* Top bar — only show when NOT fullscreen (in fullscreen, controls overlay) */}
        {!isFullscreen && (
          <div className="flex items-center justify-between gap-3 border-b border-border/60 bg-card px-4 py-2.5">
            <span className="font-serif truncate text-sm font-semibold text-foreground">
              {title}
            </span>
            <div className="flex items-center gap-1.5">
              {hasCaptions && ccOn && (
                <div className="mr-1 flex items-center gap-0.5 rounded-full border border-border/60 bg-background/40 py-0.5 pl-1 pr-2">
                  <button
                    onClick={() => adjustOffset(-0.5)}
                    className="press-aa flex h-6 w-6 items-center justify-center rounded-full text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
                    aria-label="Captions earlier"
                    title="Captions earlier"
                  >
                    <Minus className="h-3 w-3" />
                  </button>
                  <span className="font-mono text-[0.6rem] tabular-nums text-muted-foreground" style={{ minWidth: "3ch", textAlign: "center" }}>
                    {offset >= 0 ? "+" : ""}{offset.toFixed(1)}s
                  </span>
                  <button
                    onClick={() => adjustOffset(0.5)}
                    className="press-aa flex h-6 w-6 items-center justify-center rounded-full text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
                    aria-label="Captions later"
                    title="Captions later"
                  >
                    <Plus className="h-3 w-3" />
                  </button>
                </div>
              )}

              {/* Speed control */}
              <div className="relative">
                <button
                  onClick={(e) => { e.stopPropagation(); setShowSpeedMenu((v) => !v); }}
                  className="press-aa flex h-8 items-center gap-1.5 rounded-full border border-border px-3 font-serif text-[0.65rem] font-bold uppercase tracking-widest text-muted-foreground transition-colors hover:text-foreground hover:border-[var(--gold)]"
                  aria-label="Playback speed"
                  title="Playback speed"
                >
                  <Gauge className="h-3.5 w-3.5" />
                  {speed}×
                </button>
                {showSpeedMenu && (
                  <div
                    className="absolute right-0 top-9 z-30 flex flex-col gap-0.5 rounded-lg border border-border bg-card p-1 shadow-xl"
                    onClick={(e) => e.stopPropagation()}
                  >
                    {SPEEDS.map((s) => (
                      <button
                        key={s}
                        onClick={() => changeSpeed(s)}
                        className={cn(
                          "press-aa rounded-md px-4 py-1.5 font-serif text-xs font-semibold uppercase tracking-wider transition-colors",
                          s === speed
                            ? "bg-primary text-primary-foreground"
                            : "text-muted-foreground hover:bg-secondary hover:text-foreground"
                        )}
                      >
                        {s}×
                      </button>
                    ))}
                  </div>
                )}
              </div>

              <button
                onClick={toggleCc}
                disabled={!hasCaptions}
                className={cn(
                  "press-aa flex h-8 items-center gap-1.5 rounded-full px-3 font-serif text-[0.65rem] font-bold uppercase tracking-widest transition-all",
                  hasCaptions
                    ? ccOn
                      ? "bg-primary text-primary-foreground shadow-[0_0_12px_rgba(201,168,76,0.5)]"
                      : "border border-border text-muted-foreground hover:text-foreground hover:border-[var(--gold)]"
                    : "cursor-not-allowed border border-border/30 text-muted-foreground/40"
                )}
                aria-label="Toggle captions"
                title={hasCaptions ? "Toggle captions" : "No captions available"}
              >
                CC
              </button>

              {/* Fullscreen button */}
              <button
                onClick={toggleFullscreen}
                className="press-aa flex h-8 w-8 items-center justify-center rounded-full text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
                aria-label="Fullscreen"
                title="Fullscreen"
              >
                <Maximize className="h-3.5 w-3.5" />
              </button>

              <button
                onClick={onClose}
                className="press-aa flex h-8 w-8 items-center justify-center rounded-full text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
                aria-label="Close"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          </div>
        )}

        {/* Video with caption overlay */}
        <div
          className="relative aspect-video bg-black"
          onContextMenu={onContextMenu}
        >
          {loading && !error && (
            <div className="pointer-events-none absolute inset-0 z-10 flex flex-col items-center justify-center gap-3 text-muted-foreground">
              <Loader2 className="h-8 w-8 animate-spin text-gold" />
              <p className="font-body-aa text-xs uppercase tracking-widest">
                Loading stream…
              </p>
            </div>
          )}
          {error && (
            <div className="absolute inset-0 z-10 flex flex-col items-center justify-center gap-2 p-6 text-center">
              <p className="font-body-aa text-sm text-[#f97316]">{error}</p>
            </div>
          )}
          <video
            ref={videoRef}
            src={src}
            controls
            autoPlay
            playsInline
            controlsList="nodownload noremoteplayback noplaybackrate"
            disablePictureInPicture
            onContextMenu={onContextMenu}
            className="h-full w-full"
            onLoadStart={() => setLoading(true)}
            onCanPlay={() => setLoading(false)}
            onWaiting={() => setLoading(true)}
            onPlaying={() => setLoading(false)}
            onError={() => {
              setLoading(false);
              setError("Unable to stream this video. It may still be processing on GitHub, or your connection is slow.");
            }}
          />
          {/* Caption overlay — works in fullscreen because container goes fullscreen */}
          {activeCue && (
            <div className="pointer-events-none absolute bottom-16 left-1/2 z-20 w-[85%] max-w-2xl -translate-x-1/2 text-center">
              <span
                className="font-body-aa inline-block rounded bg-black/80 px-3 py-1.5 text-base leading-relaxed text-white sm:text-lg"
                dangerouslySetInnerHTML={{
                  __html: activeCue.text
                    .replace(/<i>/g, "<em>")
                    .replace(/<\/i>/g, "</em>")
                    .replace(/<font[^>]*>/g, "")
                    .replace(/<\/font>/g, "")
                    .replace(/\n/g, "<br/>"),
                }}
              />
            </div>
          )}

          {/* Fullscreen overlay controls — show in fullscreen */}
          {isFullscreen && (
            <div className="absolute right-4 top-4 z-30 flex items-center gap-2">
              {hasCaptions && ccOn && (
                <div className="flex items-center gap-0.5 rounded-full border border-white/20 bg-black/60 py-0.5 pl-1 pr-2 backdrop-blur">
                  <button
                    onClick={() => adjustOffset(-0.5)}
                    className="flex h-7 w-7 items-center justify-center rounded-full text-white/80 transition-colors hover:bg-white/20 hover:text-white"
                    aria-label="Captions earlier"
                  >
                    <Minus className="h-3 w-3" />
                  </button>
                  <span className="font-mono text-[0.65rem] tabular-nums text-white/80" style={{ minWidth: "3ch", textAlign: "center" }}>
                    {offset >= 0 ? "+" : ""}{offset.toFixed(1)}s
                  </span>
                  <button
                    onClick={() => adjustOffset(0.5)}
                    className="flex h-7 w-7 items-center justify-center rounded-full text-white/80 transition-colors hover:bg-white/20 hover:text-white"
                    aria-label="Captions later"
                  >
                    <Plus className="h-3 w-3" />
                  </button>
                </div>
              )}

              {/* Speed control (fullscreen) */}
              <div className="relative">
                <button
                  onClick={(e) => { e.stopPropagation(); setShowSpeedMenu((v) => !v); }}
                  className="flex h-9 items-center gap-1.5 rounded-full border border-white/20 bg-black/60 px-3 font-serif text-[0.65rem] font-bold uppercase tracking-widest text-white/90 backdrop-blur transition-colors hover:bg-black/80"
                  aria-label="Playback speed"
                >
                  <Gauge className="h-3.5 w-3.5" />
                  {speed}×
                </button>
                {showSpeedMenu && (
                  <div
                    className="absolute right-0 top-11 z-30 flex flex-col gap-0.5 rounded-lg border border-white/20 bg-black/90 p-1 shadow-xl backdrop-blur"
                    onClick={(e) => e.stopPropagation()}
                  >
                    {SPEEDS.map((s) => (
                      <button
                        key={s}
                        onClick={() => changeSpeed(s)}
                        className={cn(
                          "rounded-md px-4 py-1.5 font-serif text-xs font-semibold uppercase tracking-wider transition-colors",
                          s === speed
                            ? "bg-primary text-primary-foreground"
                            : "text-white/80 hover:bg-white/20 hover:text-white"
                        )}
                      >
                        {s}×
                      </button>
                    ))}
                  </div>
                )}
              </div>

              <button
                onClick={toggleCc}
                disabled={!hasCaptions}
                className={cn(
                  "flex h-9 items-center gap-1.5 rounded-full px-3 font-serif text-[0.65rem] font-bold uppercase tracking-widest backdrop-blur transition-all",
                  hasCaptions
                    ? ccOn
                      ? "bg-primary text-primary-foreground"
                      : "border border-white/20 bg-black/60 text-white/90 hover:bg-black/80"
                    : "cursor-not-allowed border border-white/10 bg-black/40 text-white/30"
                )}
                aria-label="Toggle captions"
              >
                CC
              </button>

              <button
                onClick={toggleFullscreen}
                className="flex h-9 w-9 items-center justify-center rounded-full border border-white/20 bg-black/60 text-white/90 backdrop-blur transition-colors hover:bg-black/80"
                aria-label="Exit fullscreen"
              >
                <Minimize className="h-4 w-4" />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
