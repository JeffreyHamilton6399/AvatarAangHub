"use client";

import * as React from "react";
import { BookOpen, Download, ExternalLink, FileText, X } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { TRILOGIES, type Novel, ELEMENT_COLOR } from "@/lib/avatar-data";
import { ElementSymbol } from "./element-symbol";

function ReaderModal({ novel, onClose }: { novel: Novel; onClose: () => void }) {
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
      className="fixed inset-0 z-[70] flex items-center justify-center bg-background/85 p-2 backdrop-blur sm:p-6"
      onClick={(e) => e.target === e.currentTarget && onClose()}
      role="dialog"
      aria-modal="true"
      aria-label={`Reading ${novel.title}`}
    >
      <div className="aa-float-up flex h-[92vh] w-full max-w-5xl flex-col overflow-hidden rounded-2xl border border-border/60 bg-card shadow-2xl">
        <div className="flex items-center justify-between gap-3 border-b border-border/60 px-4 py-3">
          <div className="flex items-center gap-2 min-w-0">
            <FileText className="h-5 w-5 shrink-0 text-primary" />
            <span className="truncate text-sm font-semibold text-foreground">
              {novel.title}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <Button asChild size="sm" variant="outline" className="gap-1.5 rounded-full">
              <a href={novel.url} download>
                <Download className="h-3.5 w-3.5" /> Download
              </a>
            </Button>
            <Button asChild size="sm" variant="ghost" className="gap-1.5 rounded-full">
              <a href={novel.url} target="_blank" rel="noopener noreferrer">
                <ExternalLink className="h-3.5 w-3.5" /> New tab
              </a>
            </Button>
            <Button size="icon" variant="ghost" onClick={onClose} className="rounded-full" aria-label="Close">
              <X className="h-4 w-4" />
            </Button>
          </div>
        </div>
        <iframe
          src={novel.url}
          title={novel.title}
          className="aa-scroll flex-1 border-0 bg-white"
        />
      </div>
    </div>
  );
}

export function BooksSection() {
  const [reading, setReading] = React.useState<Novel | null>(null);

  return (
    <section id="books" className="scroll-mt-20 py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="mb-10 max-w-2xl">
          <p className="mb-2 text-xs uppercase tracking-[0.3em] text-primary">
            The Library
          </p>
          <h2 className="flex items-center gap-2 text-3xl font-bold tracking-tight sm:text-4xl">
            <BookOpen className="h-7 w-7 text-primary" />
            Graphic novels & comics
          </h2>
          <p className="mt-3 text-muted-foreground">
            Six trilogies of Dark Horse graphic novels — 18 parts in total,
            continuing the story after the series. Click any issue to read the
            full PDF right here in the archive.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          {TRILOGIES.map((trilogy) => {
            const color = ELEMENT_COLOR[trilogy.element];
            return (
              <Card
                key={trilogy.name}
                className="group relative overflow-hidden rounded-2xl border-border/60 bg-card/50 p-6 backdrop-blur transition-all duration-300 hover:-translate-y-1 hover:card-glow"
                style={{ borderTopColor: color, borderTopWidth: 2 }}
              >
                <div
                  className="pointer-events-none absolute -right-12 -top-12 h-32 w-32 rounded-full opacity-15 blur-2xl transition-opacity group-hover:opacity-30"
                  style={{ backgroundColor: color }}
                />
                <div className="mb-4 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span
                      className="flex h-10 w-10 items-center justify-center rounded-xl border bg-background/60"
                      style={{ borderColor: `${color}66`, color }}
                    >
                      <span className="h-6 w-6">
                        <ElementSymbol element={trilogy.element} strokeWidth={2} />
                      </span>
                    </span>
                    <div>
                      <h3 className="text-base font-semibold text-foreground">
                        {trilogy.name}
                      </h3>
                      <p className="text-[11px] uppercase tracking-wider text-muted-foreground">
                        3-part trilogy
                      </p>
                    </div>
                  </div>
                  <Badge variant="outline" className="rounded-full border-border/60">
                    Dark Horse
                  </Badge>
                </div>

                <p className="mb-4 text-sm leading-relaxed text-muted-foreground">
                  {trilogy.description}
                </p>

                <div className="flex flex-col gap-2">
                  {trilogy.parts.map((part) => (
                    <button
                      key={part.file}
                      onClick={() => setReading(part)}
                      className="group/item flex items-center gap-3 rounded-lg border border-border/40 bg-background/40 px-3 py-2.5 text-left transition-all hover:border-border hover:bg-background/80"
                    >
                      <span
                        className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md font-mono text-xs font-bold"
                        style={{ backgroundColor: `${color}1f`, color }}
                      >
                        {part.part}
                      </span>
                      <span className="flex-1 text-sm text-foreground/90">
                        {part.title}
                      </span>
                      <BookOpen className="h-4 w-4 shrink-0 text-muted-foreground opacity-0 transition-opacity group-hover/item:opacity-100" />
                    </button>
                  ))}
                </div>
              </Card>
            );
          })}
        </div>

        <p className="mt-6 text-center text-xs text-muted-foreground">
          PDFs are served directly from this site's <code className="rounded bg-muted px-1.5 py-0.5">/books/</code> folder.
          Reader opens in-page — no download required.
        </p>
      </div>

      {reading && <ReaderModal novel={reading} onClose={() => setReading(null)} />}
    </section>
  );
}
