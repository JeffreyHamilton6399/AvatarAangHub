"use client";

import * as React from "react";
import { X, Loader2 } from "lucide-react";
import { saveProgress, getProgress } from "@/lib/watch-progress";
import { useCaptions, getActiveCue } from "@/lib/captions";
import { cn } from "@/lib/utils";

interface VideoPlayerProps {
  src: string;
  title: string;
  caption?: string;
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

export function VideoPlayer({
  src,
  title,
  caption,
  meta,
  onClose,
}: VideoPlayerProps) {
  const videoRef = React.useRef<HTMLVideoElement | null>(null);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState<string | null>(null);
  const [ccOn, setCcOn] = React.useState(true);
  const [currentTime, setCurrentTime] = React.useState(0);
  const [isPlaying, setIsPlaying] = React.useState(false);
  const saveTimerRef = React.useRef<ReturnType<typeof setInterval> | null>(null);
  const rafRef = React.useRef<number | null>(null);

  const { cues, loaded: captionsLoaded } = useCaptions(caption);
  const activeCue = caption && ccOn ? getActiveCue(cues, currentTime) : null;

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

  // Use requestAnimationFrame for smooth, accurate caption sync while playing
  React.useEffect(() => {
    const v = videoRef.current;
    if (!v) return;

    const tick = () => {
      // Always update so captions sync even when paused/seeking
      setCurrentTime(v.currentTime);
      rafRef.current = requestAnimationFrame(tick);
    };

    // Start RAF loop
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

  const toggleCc = () => setCcOn((v) => !v);
  const hasCaptions = caption && captionsLoaded && cues.length > 0;

  return (
    <div
      className="fixed inset-0 z-[80] flex items-center justify-center bg-black/92 p-2 backdrop-blur sm:p-6"
      onClick={(e) => e.target === e.currentTarget && onClose()}
      role="dialog"
      aria-modal="true"
      aria-label={`Playing ${title}`}
    >
      <div className="aa-slide-up relative flex w-full max-w-5xl flex-col overflow-hidden rounded-lg border border-border bg-black shadow-2xl">
        {/* Top bar — minimal: just title + CC toggle + close */}
        <div className="flex items-center justify-between gap-3 border-b border-border/60 bg-card px-4 py-2.5">
          <span className="font-serif truncate text-sm font-semibold text-foreground">
            {title}
          </span>
          <div className="flex items-center gap-1.5">
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
            <button
              onClick={onClose}
              className="press-aa flex h-8 w-8 items-center justify-center rounded-full text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
              aria-label="Close"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        </div>

        {/* Video with caption overlay */}
        <div className="relative aspect-video bg-black">
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
            className="h-full w-full"
            onLoadStart={() => setLoading(true)}
            onCanPlay={() => setLoading(false)}
            onWaiting={() => setLoading(true)}
            onPlaying={() => { setLoading(false); setIsPlaying(true); }}
            onPause={() => setIsPlaying(false)}
            onError={() => {
              setLoading(false);
              setError("Unable to stream this video. It may still be processing on GitHub, or your connection is slow.");
            }}
          />
          {/* Caption overlay — sits above the video, below the native controls */}
          {activeCue && (
            <div className="pointer-events-none absolute bottom-16 left-1/2 z-20 w-[85%] max-w-2xl -translate-x-1/2 text-center">
              <span
                className="font-body-aa inline-block rounded bg-black/80 px-3 py-1.5 text-base leading-relaxed text-white sm:text-lg"
                dangerouslySetInnerHTML={{
                  __html: activeCue.text
                    .replace(/<i>/g, "<em>")
                    .replace(/<\/i>/g, "</em>")
                    .replace(/\n/g, "<br/>"),
                }}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
