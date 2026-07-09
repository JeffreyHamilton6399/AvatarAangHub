"use client";

import * as React from "react";
import { X, Download, ExternalLink, Loader2, ChevronLeft, ChevronRight } from "lucide-react";
import { TRILOGIES, type Novel, ELEMENT_COLOR, elementImage } from "@/lib/avatar-data";
import { cn } from "@/lib/utils";

interface NovelReaderProps {
  novel: Novel;
  onClose: () => void;
  onSelect: (n: Novel) => void;
}

export function NovelReader({ novel, onClose, onSelect }: NovelReaderProps) {
  const [loading, setLoading] = React.useState(true);
  const trilogy = TRILOGIES.find((t) => t.name === novel.trilogy);
  const color = trilogy ? ELEMENT_COLOR[trilogy.element] : "#a855f7";

  React.useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  // Reset loading when novel changes
  React.useEffect(() => {
    setLoading(true);
  }, [novel.file]);

  return (
    <div
      className="fixed inset-0 z-[80] flex items-center justify-center bg-black/90 p-2 backdrop-blur sm:p-6"
      onClick={(e) => e.target === e.currentTarget && onClose()}
      role="dialog"
      aria-modal="true"
      aria-label={`Reading ${novel.title}`}
    >
      <div className="aa-slide-up relative flex h-[92vh] w-full max-w-5xl flex-col overflow-hidden rounded-lg border border-border bg-card shadow-2xl">
        {/* Top bar */}
        <div className="flex items-center justify-between gap-3 border-b border-border/60 px-4 py-2.5">
          <div className="flex min-w-0 items-center gap-2">
            <img src={elementImage(trilogy?.element ?? "spirit")} alt="" className="h-5 w-5 shrink-0 object-contain" style={{ filter: `drop-shadow(0 0 3px ${color})` }} />
            <span className="font-serif truncate text-sm font-semibold text-foreground">
              {novel.title}
            </span>
          </div>
          <div className="flex items-center gap-1.5">
            <a
              href={novel.url}
              download
              className="press-aa flex h-8 w-8 items-center justify-center rounded-full text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
              aria-label="Download PDF"
              title="Download"
            >
              <Download className="h-3.5 w-3.5" />
            </a>
            <a
              href={novel.url}
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

        {/* PDF */}
        <div className="relative flex-1 bg-[#1a1a1a]">
          {loading && (
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 text-muted-foreground">
              <Loader2 className="h-8 w-8 animate-spin text-gold" />
              <p className="font-body-aa text-xs uppercase tracking-widest">Loading comic…</p>
            </div>
          )}
          <iframe
            key={novel.file}
            src={novel.url}
            title={novel.title}
            onLoad={() => setLoading(false)}
            className="aa-scroll h-full w-full border-0 bg-white"
          />
        </div>

        {/* Trilogy navigator at bottom */}
        {trilogy && (
          <div className="border-t border-border/60 bg-card px-4 py-2">
            <div className="flex items-center justify-between gap-3">
              <div className="min-w-0">
                <p className="font-body-aa text-[0.6rem] uppercase tracking-wider text-muted-foreground">
                  {trilogy.name} · Part {novel.part} of {trilogy.parts.length}
                </p>
              </div>
              <div className="flex items-center gap-1.5">
                {trilogy.parts.map((p) => (
                  <button
                    key={p.file}
                    onClick={() => onSelect(p)}
                    className={cn(
                      "press-aa flex h-7 w-7 items-center justify-center rounded-md font-mono text-xs font-bold transition-all",
                      p.file === novel.file
                        ? "text-black"
                        : "border border-border/60 bg-background/40 text-muted-foreground hover:text-foreground"
                    )}
                    style={p.file === novel.file ? { backgroundColor: color } : undefined}
                    title={p.title}
                  >
                    {p.part}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
