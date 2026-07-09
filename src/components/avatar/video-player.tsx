"use client";

import * as React from "react";
import { X, Download, ExternalLink, Loader2 } from "lucide-react";

interface VideoPlayerProps {
  src: string;
  title: string;
  caption?: string;
  onClose: () => void;
}

/**
 * Minimal video player modal.
 * Streams MP4s directly from GitHub Releases (HTTP range-supported).
 * Optional SRT caption track.
 */
export function VideoPlayer({ src, title, caption, onClose }: VideoPlayerProps) {
  const videoRef = React.useRef<HTMLVideoElement | null>(null);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState<string | null>(null);

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
      className="fixed inset-0 z-[80] flex items-center justify-center bg-black/90 p-2 backdrop-blur sm:p-6"
      onClick={(e) => e.target === e.currentTarget && onClose()}
      role="dialog"
      aria-modal="true"
      aria-label={`Playing ${title}`}
    >
      <div className="aa-slide-up relative flex w-full max-w-5xl flex-col overflow-hidden rounded-lg border border-border bg-black shadow-2xl">
        {/* Top bar */}
        <div className="flex items-center justify-between gap-3 border-b border-border/60 bg-card px-4 py-2.5">
          <span className="font-serif truncate text-sm font-semibold text-foreground">
            {title}
          </span>
          <div className="flex items-center gap-1.5">
            <a
              href={src}
              download
              className="press-aa flex h-8 w-8 items-center justify-center rounded-full text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
              aria-label="Download video"
              title="Download"
            >
              <Download className="h-3.5 w-3.5" />
            </a>
            <a
              href={src}
              target="_blank"
              rel="noopener noreferrer"
              className="press-aa flex h-8 w-8 items-center justify-center rounded-full text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
              aria-label="Open in new tab"
              title="Open in new tab"
            >
              <ExternalLink className="h-3.5 w-3.5" />
            </a>
            <button
              onClick={onClose}
              className="press-aa flex h-8 w-8 items-center justify-center rounded-full text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
              aria-label="Close"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        </div>

        {/* Video */}
        <div className="relative aspect-video bg-black">
          {loading && !error && (
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 text-muted-foreground">
              <Loader2 className="h-8 w-8 animate-spin text-gold" />
              <p className="font-body-aa text-xs uppercase tracking-widest">
                Loading stream…
              </p>
            </div>
          )}
          {error && (
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 p-6 text-center">
              <p className="font-body-aa text-sm text-[#f97316]">{error}</p>
              <a
                href={src}
                target="_blank"
                rel="noopener noreferrer"
                className="font-body-aa mt-2 text-xs text-gold underline"
              >
                Open directly in new tab
              </a>
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
            onPlaying={() => setLoading(false)}
            onError={() => {
              setLoading(false);
              setError("Unable to stream this video. It may still be processing on GitHub, or your connection is slow. Try opening it directly.");
            }}
          >
            {caption && (
              <track
                kind="subtitles"
                src={caption}
                srcLang="en"
                label="English"
                default
              />
            )}
          </video>
        </div>
      </div>
    </div>
  );
}
