"use client";

import { SectionHeader, SectionDivider } from "./section-header";
import { FEATURES } from "@/lib/avatar-data";

export function FeaturesSection() {
  return (
    <section id="features" className="scroll-mt-20 border-y border-border/50 bg-card/20 py-16 sm:py-20">
      <div className="mx-auto max-w-5xl px-4 sm:px-6">
        <SectionHeader
          eyebrow="What's Inside"
          title="Built for fans, by a fan"
          description="AvatarArchive is a love letter to the franchise — every series, every episode, every graphic novel, gathered into one fan-built hub."
          align="center"
        />
        <SectionDivider />

        <div className="mt-8 grid gap-x-8 gap-y-5 sm:grid-cols-2">
          {FEATURES.map((f) => (
            <div key={f.title} className="flex gap-3">
              <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--gold)]" />
              <div>
                <h3 className="font-serif text-sm font-semibold text-foreground">
                  {f.title}
                </h3>
                <p className="font-body-aa mt-1 text-xs leading-relaxed text-muted-foreground">
                  {f.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
