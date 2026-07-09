"use client";

import { Clock, History } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { TIMELINE, ELEMENT_COLOR, type ElementId } from "@/lib/avatar-data";
import { ElementSymbol } from "./element-symbol";
import { cn } from "@/lib/utils";

const elementText: Record<ElementId, string> = {
  air: "text-element-air",
  water: "text-element-water",
  earth: "text-element-earth",
  fire: "text-element-fire",
  spirit: "text-element-spirit",
  none: "text-element-none",
};

// Group events by era, preserving order.
const ERAS = (() => {
  const map = new Map<string, typeof TIMELINE>();
  for (const ev of TIMELINE) {
    const arr = map.get(ev.era) ?? [];
    arr.push(ev);
    map.set(ev.era, arr);
  }
  return Array.from(map.entries());
})();

export function TimelineSection() {
  return (
    <section
      id="timeline"
      className="scroll-mt-20 border-y border-border/40 bg-card/30 py-20 sm:py-28"
    >
      <div className="mx-auto max-w-4xl px-4 sm:px-6">
        <div className="mb-10 max-w-2xl">
          <p className="mb-2 text-xs uppercase tracking-[0.3em] text-primary">
            The Chronology
          </p>
          <h2 className="flex items-center gap-2 text-3xl font-bold tracking-tight sm:text-4xl">
            <History className="h-7 w-7 text-primary" />
            From Wan to Korra
          </h2>
          <p className="mt-3 text-muted-foreground">
            Ten thousand years of Avatar history, condensed into the moments that
            reshaped the Four Nations. Dates use the standard BG/AG (Before/After
            Genocide) convention.
          </p>
        </div>

        {/* Vertical spine */}
        <div className="relative">
          <div
            className="pointer-events-none absolute bottom-0 left-[19px] top-2 w-px bg-gradient-to-b from-primary/60 via-primary/20 to-transparent sm:left-[23px]"
            aria-hidden="true"
          />

          <Accordion type="multiple" defaultValue={["era-0"]} className="space-y-3">
            {ERAS.map(([era, events], eraIdx) => (
              <AccordionItem
                key={era}
                value={`era-${eraIdx}`}
                className="overflow-hidden rounded-2xl border border-border/60 bg-background/40 px-2 data-[state=open]:bg-card/60"
              >
                <AccordionTrigger className="px-3 py-4 text-left hover:no-underline">
                  <div className="flex items-center gap-3">
                    <span className="relative z-10 flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-primary/40 bg-card text-primary">
                      <Clock className="h-4 w-4" />
                    </span>
                    <div>
                      <p className="text-sm font-semibold text-foreground">
                        {era}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {events.length} key{" "}
                        {events.length === 1 ? "event" : "events"}
                      </p>
                    </div>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="px-3 pb-4">
                  <ol className="relative ml-5 space-y-4 border-l border-border/50 pl-6">
                    {events.map((ev) => {
                      const color = ELEMENT_COLOR[ev.element];
                      return (
                        <li key={ev.title} className="relative">
                          <span
                            className="absolute -left-[31px] top-1 flex h-6 w-6 items-center justify-center rounded-full border bg-card"
                            style={{ borderColor: `${color}66`, color }}
                          >
                            <span className="h-3.5 w-3.5">
                              <ElementSymbol element={ev.element} strokeWidth={2.4} />
                            </span>
                          </span>
                          <div className="flex flex-wrap items-baseline gap-x-2 gap-y-1">
                            <span
                              className="font-mono text-xs font-semibold"
                              style={{ color }}
                            >
                              {ev.year}
                            </span>
                            <h4 className="text-sm font-semibold text-foreground">
                              {ev.title}
                            </h4>
                          </div>
                          <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                            {ev.detail}
                          </p>
                        </li>
                      );
                    })}
                  </ol>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>

        <p className="mt-8 text-center text-xs text-muted-foreground">
          <span className={cn("font-semibold", elementText.spirit)}>
            BG
          </span>{" "}
          = Before Genocide ·{" "}
          <span className={cn("font-semibold", elementText.spirit)}>
            AG
          </span>{" "}
          = After Genocide (the Air Nomad Genocide, year 0)
        </p>
      </div>
    </section>
  );
}
