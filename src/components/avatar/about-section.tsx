"use client";

import { Github, Youtube } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { SectionHeader, SectionDivider } from "./section-header";

export function AboutSection() {
  return (
    <section id="about" className="scroll-mt-20 py-16 sm:py-20">
      <div className="mx-auto max-w-4xl px-4 sm:px-6">
        <SectionHeader
          eyebrow="About"
          title="A fan-made tribute"
          description="AvatarArchive is an unofficial, fan-built hub celebrating the entire Avatar universe."
          align="center"
        />
        <SectionDivider />

        <div className="mt-8 text-center">
          {/* Four elements */}
          <div className="mb-6 flex items-center justify-center gap-[clamp(1rem,4vw,2.5rem)]">
            {["air", "water", "earth", "fire"].map((el, i) => (
              <img
                key={el}
                src={`/images/${el}.png`}
                alt={el}
                className="h-7 w-7 object-contain opacity-75"
                style={{ animation: `aa-pulse-glow 3s ease-in-out infinite ${i * 0.5}s`, color: `var(--${el})` }}
              />
            ))}
          </div>

          <p className="font-body-aa mx-auto max-w-2xl text-sm leading-relaxed text-muted-foreground">
            From <strong className="text-foreground">Avatar: The Last Airbender</strong> and{" "}
            <strong className="text-foreground">The Legend of Korra</strong> to the films, games,
            and graphic novels. Not affiliated with Nickelodeon, Viacom, Paramount, or Netflix —
            all trademarks belong to their respective owners.
          </p>

          <p className="font-body-aa mx-auto mt-3 max-w-2xl text-sm leading-relaxed text-muted-foreground">
            Built with Next.js, TypeScript, Tailwind CSS, and shadcn/ui. Made by fans, for fans.
            Iroh would approve.
          </p>

          <div className="mt-7 flex flex-wrap justify-center gap-3">
            <Button asChild variant="outline" className="gap-2 rounded-full border-border bg-background/40 font-body-aa text-xs">
              <a
                href="https://github.com/JeffreyHamilton6399/AvatarArchive"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Github className="h-3.5 w-3.5" /> GitHub
              </a>
            </Button>
            <Button asChild variant="outline" className="gap-2 rounded-full border-border bg-background/40 font-body-aa text-xs">
              <a
                href="https://www.youtube.com/@Jeffrey_Creates"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Youtube className="h-3.5 w-3.5" /> Jeffrey Creates
              </a>
            </Button>
          </div>
        </div>

        <Card className="mt-8 rounded-lg border-border/60 bg-background/40 p-4">
          <p className="font-body-aa text-center text-[0.65rem] leading-relaxed text-muted-foreground">
            Avatar: The Last Airbender and The Legend of Korra © Nickelodeon / Viacom / Paramount.
            AvatarArchive is an unofficial fan project and is not endorsed by or affiliated with the
            rights holders. All content is fan-created reference material. No copyright infringement
            intended.
          </p>
        </Card>
      </div>
    </section>
  );
}
