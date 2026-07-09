"use client";

import * as React from "react";
import { Download, ExternalLink, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SectionHeader, SectionDivider } from "./section-header";
import { TRILOGIES, type Novel, ELEMENT_COLOR } from "@/lib/avatar-data";

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
      className="fixed inset-0 z-[70] flex items-center justify-center bg-black/85 p-2 backdrop-blur sm:p-6"
      onClick={(e) => e.target === e.currentTarget && onClose()}
      role="dialog"
      aria-modal="true"
      aria-label={novel.title}
    >
      <div className="aa-slide-up flex h-[92vh] w-full max-w-5xl flex-col overflow-hidden rounded-lg border border-border bg-card shadow-2xl">
        <div className="flex items-center justify-between gap-3 border-b border-border px-4 py-3">
          <span className="font-serif truncate text-sm font-semibold text-foreground">
            {novel.title}
          </span>
          <div className="flex items-center gap-2">
            <Button asChild size="sm" variant="ghost" className="gap-1.5 rounded-full font-body-aa text-xs">
              <a href={novel.url} download>
                <Download className="h-3.5 w-3.5" /> Download
              </a>
            </Button>
            <Button asChild size="sm" variant="ghost" className="gap-1.5 rounded-full font-body-aa text-xs">
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
    <section id="books" className="scroll-mt-20 py-16 sm:py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <SectionHeader
          eyebrow="The Library"
          title="Graphic novels & comics"
          description="Six trilogies of Dark Horse graphic novels — 18 parts in total, continuing the story after the series. Click any issue to read the full PDF right here."
        />
        <SectionDivider />

        <div className="mt-8 grid gap-5 md:grid-cols-2">
          {TRILOGIES.map((trilogy) => {
            const color = ELEMENT_COLOR[trilogy.element];
            return (
              <div
                key={trilogy.name}
                className="card-aa press-aa relative overflow-hidden rounded-lg p-5"
                style={{ borderTopColor: `${color}88`, borderTopWidth: 2 }}
              >
                <div className="mb-4 flex items-center gap-3">
                  <img
                    src={`/images/${trilogy.element}.png`}
                    alt={trilogy.element}
                    className="h-9 w-9 object-contain"
                    style={{ filter: `drop-shadow(0 0 5px ${color})` }}
                  />
                  <div>
                    <h3 className="font-serif text-base font-semibold text-foreground">
                      {trilogy.name}
                    </h3>
                    <p className="font-body-aa text-[0.6rem] uppercase tracking-wider text-muted-foreground">
                      3-part trilogy · Dark Horse
                    </p>
                  </div>
                </div>

                <p className="font-body-aa mb-4 text-xs leading-relaxed text-muted-foreground">
                  {trilogy.description}
                </p>

                <div className="flex flex-col gap-1.5">
                  {trilogy.parts.map((part) => (
                    <button
                      key={part.file}
                      onClick={() => setReading(part)}
                      className="press-aa group flex items-center gap-3 rounded-md border border-border/60 bg-background/40 px-3 py-2 text-left transition-colors hover:border-[rgba(201,168,76,0.3)] hover:bg-background/70"
                    >
                      <span
                        className="font-mono text-xs font-bold tabular-nums"
                        style={{ color }}
                      >
                        Pt {part.part}
                      </span>
                      <span className="font-body-aa flex-1 text-sm text-foreground/90">
                        {part.title}
                      </span>
                      <span className="font-body-aa text-[0.6rem] uppercase tracking-wider text-muted-foreground opacity-0 transition-opacity group-hover:opacity-100">
                        Read
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {reading && <ReaderModal novel={reading} onClose={() => setReading(null)} />}
    </section>
  );
}
