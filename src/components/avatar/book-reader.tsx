"use client";

import * as React from "react";
import { X, ChevronLeft, ChevronRight, Loader2, BookOpen } from "lucide-react";
import { cn } from "@/lib/utils";
import type { PDFDocumentProxy } from "pdfjs-dist";

// Lazy-load PDF.js only on the client
let pdfjsPromise: Promise<typeof import("pdfjs-dist")> | null = null;
function loadPdfjs() {
  if (!pdfjsPromise) {
    pdfjsPromise = import("pdfjs-dist").then((pdfjs) => {
      // Use the worker from the same package version
      pdfjs.GlobalWorkerOptions.workerSrc = new URL(
        "pdfjs-dist/build/pdf.worker.min.mjs",
        import.meta.url
      ).toString();
      return pdfjs;
    });
  }
  return pdfjsPromise;
}

interface BookReaderProps {
  pdfUrl: string;
  title: string;
  trilogyName: string;
  parts: { title: string; url: string; part: number }[];
  currentPart: number;
  onSelectPart: (part: number) => void;
  onClose: () => void;
}

export function BookReader({
  pdfUrl,
  title,
  trilogyName,
  parts,
  currentPart,
  onSelectPart,
  onClose,
}: BookReaderProps) {
  const [pdf, setPdf] = React.useState<PDFDocumentProxy | null>(null);
  const [numPages, setNumPages] = React.useState(0);
  const [currentPage, setCurrentPage] = React.useState(1); // left page of the spread
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState<string | null>(null);
  const leftCanvasRef = React.useRef<HTMLCanvasElement | null>(null);
  const rightCanvasRef = React.useRef<HTMLCanvasElement | null>(null);
  const containerRef = React.useRef<HTMLDivElement | null>(null);

  // Load the PDF document
  React.useEffect(() => {
    let cancelled = false;
    setLoading(true);
    setError(null);
    setPdf(null);
    setNumPages(0);
    setCurrentPage(1);

    loadPdfjs()
      .then(async (pdfjs) => {
        if (cancelled) return;
        try {
          const loadingTask = pdfjs.getDocument({ url: pdfUrl });
          const doc = await loadingTask.promise;
          if (cancelled) return;
          setPdf(doc);
          setNumPages(doc.numPages);
          setLoading(false);
        } catch (e) {
          if (cancelled) return;
          console.error("PDF load error:", e);
          setError("Unable to load this comic. Try opening it directly.");
          setLoading(false);
        }
      })
      .catch((e) => {
        if (cancelled) return;
        console.error("PDF.js load error:", e);
        setError("Unable to load the PDF reader.");
        setLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, [pdfUrl]);

  // Render the current spread (2 pages side by side)
  React.useEffect(() => {
    if (!pdf || loading) return;
    let cancelled = false;

    const renderPage = async (
      pageNum: number,
      canvas: HTMLCanvasElement | null
    ) => {
      if (!canvas || pageNum < 1 || pageNum > numPages) {
        // Clear canvas if out of range
        if (canvas) {
          const ctx = canvas.getContext("2d");
          ctx?.clearRect(0, 0, canvas.width, canvas.height);
          canvas.width = 0;
          canvas.height = 0;
        }
        return;
      }
      try {
        const page = await pdf.getPage(pageNum);
        if (cancelled) return;
        const container = containerRef.current;
        if (!container) return;
        // Fit to half the container width (minus gap), preserve aspect ratio
        const containerWidth = container.clientWidth;
        const targetWidth = Math.floor((containerWidth - 16) / 2);
        const viewport = page.getViewport({ scale: 1 });
        const scale = targetWidth / viewport.width;
        const scaledViewport = page.getViewport({ scale });

        const ctx = canvas.getContext("2d");
        if (!ctx) return;
        canvas.width = scaledViewport.width;
        canvas.height = scaledViewport.height;
        await page.render({ canvasContext: ctx, viewport: scaledViewport }).promise;
      } catch (e) {
        // page render failed — skip
      }
    };

    renderPage(currentPage, leftCanvasRef.current);
    renderPage(currentPage + 1, rightCanvasRef.current);

    return () => {
      cancelled = true;
    };
  }, [pdf, currentPage, numPages, loading]);

  // Re-render on resize
  React.useEffect(() => {
    if (!pdf || loading) return;
    const onResize = () => {
      // Force re-render by toggling a state
      setCurrentPage((p) => p);
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, [pdf, loading]);

  const goPrev = () => setCurrentPage((p) => Math.max(1, p - 2));
  const goNext = () => setCurrentPage((p) => Math.min(numPages, p + 2));

  React.useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") goPrev();
      if (e.key === "ArrowRight") goNext();
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [currentPage, numPages, onClose]);

  const isFirstSpread = currentPage <= 1;
  const isLastSpread = currentPage + 1 >= numPages;

  return (
    <div
      className="fixed inset-0 z-[80] flex flex-col bg-[#1a1a1a] backdrop-blur"
      role="dialog"
      aria-modal="true"
      aria-label={`Reading ${title}`}
    >
      {/* Top bar */}
      <div className="flex items-center justify-between gap-3 border-b border-border/60 bg-card px-4 py-2.5">
        <div className="flex min-w-0 items-center gap-2">
          <BookOpen className="h-4 w-4 shrink-0 text-gold" />
          <div className="min-w-0">
            <p className="font-serif truncate text-sm font-semibold text-foreground">
              {title}
            </p>
            <p className="font-body-aa text-[0.55rem] uppercase tracking-wider text-muted-foreground">
              {trilogyName}
            </p>
          </div>
        </div>
        <button
          onClick={onClose}
          className="press-aa flex h-8 w-8 items-center justify-center rounded-full text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
          aria-label="Close"
        >
          <X className="h-4 w-4" />
        </button>
      </div>

      {/* Book spread */}
      <div
        ref={containerRef}
        className="aa-scroll relative flex flex-1 items-center justify-center overflow-auto p-4"
      >
        {loading && (
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 text-muted-foreground">
            <Loader2 className="h-8 w-8 animate-spin text-gold" />
            <p className="font-body-aa text-xs uppercase tracking-widest">
              Loading comic…
            </p>
          </div>
        )}
        {error && (
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 p-6 text-center">
            <p className="font-body-aa text-sm text-[#f97316]">{error}</p>
            <a
              href={pdfUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="font-body-aa mt-2 text-xs text-gold underline"
            >
              Open directly in new tab
            </a>
          </div>
        )}
        {!loading && !error && (
          <div className="flex items-center justify-center gap-4">
            <canvas ref={leftCanvasRef} className="max-h-full rounded shadow-2xl" />
            <canvas ref={rightCanvasRef} className="max-h-full rounded shadow-2xl" />
          </div>
        )}
      </div>

      {/* Page navigation */}
      {!loading && !error && numPages > 0 && (
        <div className="flex items-center justify-between gap-3 border-t border-border/60 bg-card px-4 py-2.5">
          <button
            onClick={goPrev}
            disabled={isFirstSpread}
            className={cn(
              "press-aa flex h-8 w-8 items-center justify-center rounded-full transition-colors",
              isFirstSpread
                ? "cursor-not-allowed text-muted-foreground/30"
                : "text-muted-foreground hover:bg-secondary hover:text-foreground"
            )}
            aria-label="Previous pages"
          >
            <ChevronLeft className="h-4 w-4" />
          </button>

          <div className="flex items-center gap-3">
            <span className="font-body-aa text-xs text-muted-foreground">
              Pages {currentPage}
              {currentPage + 1 <= numPages ? `–${currentPage + 1}` : ""} of {numPages}
            </span>
            <div className="h-4 w-px bg-border" />
            {/* Part selector */}
            <div className="flex items-center gap-1.5">
              <span className="font-body-aa text-[0.55rem] uppercase tracking-wider text-muted-foreground">
                Part
              </span>
              {parts.map((p) => (
                <button
                  key={p.part}
                  onClick={() => onSelectPart(p.part)}
                  className={cn(
                    "press-aa flex h-6 w-6 items-center justify-center rounded-md font-mono text-xs font-bold transition-all",
                    p.part === currentPart
                      ? "bg-gold text-black"
                      : "border border-border/60 bg-background/40 text-muted-foreground hover:text-foreground"
                  )}
                  title={p.title}
                >
                  {p.part}
                </button>
              ))}
            </div>
          </div>

          <button
            onClick={goNext}
            disabled={isLastSpread}
            className={cn(
              "press-aa flex h-8 w-8 items-center justify-center rounded-full transition-colors",
              isLastSpread
                ? "cursor-not-allowed text-muted-foreground/30"
                : "text-muted-foreground hover:bg-secondary hover:text-foreground"
            )}
            aria-label="Next pages"
          >
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>
      )}
    </div>
  );
}
