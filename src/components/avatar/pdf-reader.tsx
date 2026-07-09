"use client";

import * as React from "react";
import { X, Download, ExternalLink, Loader2 } from "lucide-react";

interface PdfReaderProps {
  src: string;
  title: string;
  onClose: () => void;
}

/**
 * Minimal PDF reader modal — embeds the PDF directly via <iframe>.
 * Browsers have built-in PDF viewers with page navigation, zoom, etc.
 */
export function PdfReader({ src, title, onClose }: PdfReaderProps) {
  const [loading, setLoading] = React.useState(true);

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
      aria-label={`Reading ${title}`}
    >
      <div className="aa-slide-up relative flex h-[92vh] w-full max-w-5xl flex-col overflow-hidden rounded-lg border border-border bg-card shadow-2xl">
        <div className="flex items-center justify-between gap-3 border-b border-border/60 px-4 py-2.5">
          <span className="font-serif truncate text-sm font-semibold text-foreground">
            {title}
          </span>
          <div className="flex items-center gap-1.5">
            <a
              href={src}
              download
              className="press-aa flex h-8 w-8 items-center justify-center rounded-full text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
              aria-label="Download PDF"
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

        <div className="relative flex-1 bg-[#1a1a1a]">
          {loading && (
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 text-muted-foreground">
              <Loader2 className="h-8 w-8 animate-spin text-gold" />
              <p className="font-body-aa text-xs uppercase tracking-widest">
                Loading comic…
              </p>
            </div>
          )}
          <iframe
            src={src}
            title={title}
            onLoad={() => setLoading(false)}
            className="aa-scroll h-full w-full border-0 bg-white"
          />
        </div>
      </div>
    </div>
  );
}
