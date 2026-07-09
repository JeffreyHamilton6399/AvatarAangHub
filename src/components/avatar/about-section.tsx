"use client";

import { Heart, Github, Youtube, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ElementSymbol } from "./element-symbol";

export function AboutSection() {
  return (
    <section
      id="about"
      className="scroll-mt-20 border-t border-border/40 bg-card/30 py-20 sm:py-28"
    >
      <div className="mx-auto max-w-4xl px-4 sm:px-6">
        <div className="grid gap-8 lg:grid-cols-[1fr_1.2fr] lg:items-center">
          <div className="flex justify-center">
            <div className="relative h-44 w-44">
              <div className="aa-spin-slow absolute inset-0 rounded-full border border-dashed border-primary/40" />
              <div className="absolute inset-4 flex items-center justify-center rounded-full border border-primary/30 bg-card/60 text-primary">
                <span className="h-16 w-16">
                  <ElementSymbol element="spirit" strokeWidth={1.6} />
                </span>
              </div>
              <div className="aa-pulse-glow absolute inset-0 rounded-full bg-primary/10 blur-2xl" />
            </div>
          </div>

          <div>
            <p className="mb-2 text-xs uppercase tracking-[0.3em] text-primary">
              About
            </p>
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
              A fan-made tribute
            </h2>
            <p className="mt-4 text-pretty text-sm leading-relaxed text-muted-foreground">
              AvatarArchive is an unofficial, fan-built hub celebrating the entire
              Avatar universe — from <strong>Avatar: The Last Airbender</strong>{" "}
              and <strong>The Legend of Korra</strong> to the films, games, and
              graphic novels. It is not affiliated with Nickelodeon, Viacom,
              Paramount, or Netflix. All trademarks belong to their respective
              owners.
            </p>
            <p className="mt-3 text-pretty text-sm leading-relaxed text-muted-foreground">
              This Next.js edition reimagines the original vanilla-HTML project as
              a modern React application — type-safe, responsive, accessible, and
              ready to deploy on Vercel.
            </p>

            <div className="mt-6 flex flex-wrap gap-3">
              <Button asChild className="gap-2 rounded-full">
                <a
                  href="https://github.com/JeffreyHamilton6399/AvatarArchive"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Github className="h-4 w-4" /> View on GitHub
                </a>
              </Button>
              <Button asChild variant="outline" className="gap-2 rounded-full">
                <a
                  href="https://www.youtube.com/@Jeffrey_Creates"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Youtube className="h-4 w-4" /> Jeffrey Creates
                </a>
              </Button>
              <Button asChild variant="ghost" className="gap-2 rounded-full">
                <a
                  href="https://www.nick.com/shows/avatar-the-last-airbender"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <ExternalLink className="h-4 w-4" /> Official site
                </a>
              </Button>
            </div>
          </div>
        </div>

        <Card className="mt-10 rounded-2xl border-border/60 bg-background/40 p-5">
          <p className="flex items-center gap-2 text-center text-xs text-muted-foreground">
            <Heart className="h-3.5 w-3.5 text-primary" />
            Built with Next.js 16, TypeScript, Tailwind CSS, and shadcn/ui. Made
            by fans, for fans. Iroh would approve.
          </p>
        </Card>
      </div>
    </section>
  );
}
