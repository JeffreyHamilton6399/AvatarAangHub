"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { SectionHeader, SectionDivider } from "./section-header";
import { TIMELINE, ELEMENT_COLOR } from "@/lib/avatar-data";

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
      className="scroll-mt-20 border-y border-border/50 bg-card/20 py-16 sm:py-20"
    >
      <div className="mx-auto max-w-3xl px-4 sm:px-6">
        <SectionHeader
          eyebrow="The Chronology"
          title="From Wan to Korra"
          description="Ten thousand years of Avatar history, condensed into the moments that reshaped the Four Nations. Dates use the standard BG/AG convention."
        />
        <SectionDivider />

        <div className="mt-8">
          <Accordion type="multiple" defaultValue={["era-0"]} className="space-y-2.5">
            {ERAS.map(([era, events], eraIdx) => (
              <AccordionItem
                key={era}
                value={`era-${eraIdx}`}
                className="overflow-hidden rounded-lg border border-border/60 bg-background/40"
              >
                <AccordionTrigger className="px-4 py-4 text-left font-serif hover:no-underline">
                  <div className="flex items-center gap-3">
                    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-[rgba(201,168,76,0.4)] bg-card">
                      <img src="/images/air.png" alt="" className="h-4 w-4 object-contain opacity-80" />
                    </span>
                    <div>
                      <p className="text-sm font-semibold text-foreground">{era}</p>
                      <p className="font-body-aa text-[0.65rem] uppercase tracking-wider text-muted-foreground">
                        {events.length} {events.length === 1 ? "event" : "events"}
                      </p>
                    </div>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="px-4 pb-4">
                  <ol className="relative ml-5 space-y-4 border-l border-border/50 pl-6">
                    {events.map((ev) => {
                      const color = ELEMENT_COLOR[ev.element];
                      return (
                        <li key={ev.title} className="relative">
                          <span className="absolute -left-[31px] top-1 flex h-6 w-6 items-center justify-center rounded-full border bg-card">
                            <img
                              src={`/images/${ev.element}.png`}
                              alt={ev.element}
                              className="h-3.5 w-3.5 object-contain"
                              style={{ filter: `drop-shadow(0 0 3px ${color})` }}
                            />
                          </span>
                          <div className="flex flex-wrap items-baseline gap-x-2 gap-y-1">
                            <span
                              className="font-mono text-xs font-semibold"
                              style={{ color }}
                            >
                              {ev.year}
                            </span>
                            <h4 className="font-serif text-sm font-semibold text-foreground">
                              {ev.title}
                            </h4>
                          </div>
                          <p className="font-body-aa mt-1 text-sm leading-relaxed text-muted-foreground">
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

        <p className="font-body-aa mt-8 text-center text-[0.65rem] uppercase tracking-wider text-muted-foreground">
          <span className="text-gold">BG</span> = Before Genocide ·{" "}
          <span className="text-gold">AG</span> = After Genocide (Air Nomad Genocide, year 0)
        </p>
      </div>
    </section>
  );
}
