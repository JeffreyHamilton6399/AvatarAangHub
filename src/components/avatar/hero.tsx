"use client";

import { ParticleCanvas } from "./particle-canvas";
import { SERIES } from "@/lib/avatar-data";

export function Hero() {
  const featured = SERIES[0]; // ATLA as the featured hero
  const explore = () =>
    document.querySelector("section")?.nextElementSibling?.scrollIntoView({ behavior: "smooth" });

  return (
    <section className="relative isolate flex min-h-[70vh] items-end overflow-hidden">
      {/* Background — featured series backdrop */}
      <div className="absolute inset-0 -z-10">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-40"
          style={{ backgroundImage: `url(${featured.backgroundImage})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/70 to-background/30" />
        <div className="absolute inset-0 bg-gradient-to-r from-background via-background/50 to-transparent" />
      </div>

      {/* Floating element icons */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <ParticleCanvas className="h-full w-full opacity-90" />
      </div>

      <div className="mx-auto w-full max-w-7xl px-4 py-16 sm:px-6 lg:px-10">
        <div className="max-w-2xl">
          <p className="aa-slide-up font-body-aa mb-2 text-[0.7rem] uppercase tracking-[0.4em] text-gold">
            The Avatar Universe
          </p>

          <h1
            className="aa-slide-up font-display text-[clamp(2.5rem,7vw,5rem)] font-bold leading-none tracking-[0.06em]"
            style={{
              background: "linear-gradient(135deg, #fff 0%, #d4e8ff 40%, #4db8ff 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
              animationDelay: "0.08s",
            }}
          >
            AvatarArchive
          </h1>

          <p
            className="aa-slide-up font-body-aa mt-4 max-w-xl text-sm leading-relaxed text-muted-foreground sm:text-base"
            style={{ animationDelay: "0.16s" }}
          >
            {featured.synopsis}
          </p>
        </div>
      </div>
    </section>
  );
}
