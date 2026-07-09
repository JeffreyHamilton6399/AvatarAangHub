import {
  Compass,
  Search,
  Sparkles,
  Palette,
  ScrollText,
  Users,
  Film,
  BookOpen,
  type LucideIcon,
} from "lucide-react";
import { Card } from "@/components/ui/card";
import { FEATURES } from "@/lib/avatar-data";

const ICONS: Record<string, LucideIcon> = {
  Compass,
  Search,
  Sparkles,
  Palette,
  ScrollText,
  Users,
  Film,
  BookOpen,
};

export function FeaturesSection() {
  return (
    <section id="features" className="scroll-mt-20 py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="mb-10 max-w-2xl">
          <p className="mb-2 text-xs uppercase tracking-[0.3em] text-primary">
            What's Inside
          </p>
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Built for fans, by a fan
          </h2>
          <p className="mt-3 text-muted-foreground">
            AvatarArchive is a love letter to the franchise — rebuilt in Next.js
            with all the original content: real episode titles, the graphic novel
            library, the full timeline, and every page of the original static site,
            now in a modern, themeable, responsive app.
          </p>
        </div>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {FEATURES.map((f) => {
            const Icon = ICONS[f.icon] ?? Sparkles;
            return (
              <Card
                key={f.title}
                className="group relative overflow-hidden rounded-2xl border-border/60 bg-card/50 p-6 backdrop-blur transition-all duration-300 hover:-translate-y-1 hover:card-glow"
              >
                <div className="pointer-events-none absolute -right-10 -top-10 h-28 w-28 rounded-full bg-primary/10 opacity-0 blur-2xl transition-opacity group-hover:opacity-100" />
                <span className="mb-4 inline-flex h-11 w-11 items-center justify-center rounded-xl border border-primary/30 bg-primary/10 text-primary">
                  <Icon className="h-5 w-5" />
                </span>
                <h3 className="text-base font-semibold text-foreground">
                  {f.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {f.description}
                </p>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}
