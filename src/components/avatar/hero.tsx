"use client";

import { ParticleCanvas } from "./particle-canvas";
import { SERIES } from "@/lib/avatar-data";

export function Hero() {
  const featured = SERIES[0]; // ATLA as the featured hero
  const explore = () =>
    document.querySelector("section")?.nextElementSibling?.scrollIntoView({ behavior: "smooth" });

  return (
    <section className="relative isolate flex min-h-[80vh] items-end overflow-hidden">
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
          {/* 4 element symbols */}
          <div className="aa-fade-in mb-6 flex items-center gap-6">
            {[
              { src: "/images/air.png", alt: "Air", color: "var(--air)", delay: "0s" },
              { src: "/images/water.png", alt: "Water", color: "var(--water)", delay: "0.5s" },
              { src: "/images/earth.png", alt: "Earth", color: "var(--earth)", delay: "1s" },
              { src: "/images/fire.png", alt: "Fire", color: "var(--fire)", delay: "1.5s" },
            ].map((el) => (
              <img
                key={el.alt}
                src={el.src}
                alt={el.alt}
                className="h-7 w-7 object-contain opacity-80 sm:h-8 sm:w-8"
                style={{ animation: `aa-pulse-glow 3s ease-in-out infinite ${el.delay}`, color: el.color }}
              />
            ))}
          </div>

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

          <div
            className="aa-slide-up mt-8 flex flex-wrap items-center gap-3"
            style={{ animationDelay: "0.24s" }}
          >
            <button
              onClick={explore}
              className="press-aa inline-flex items-center gap-2 rounded-full bg-white px-7 py-3 font-serif text-[0.6rem] uppercase tracking-[0.3em] text-black transition-all hover:bg-white/90"
            >
              <svg className="h-3.5 w-3.5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M8 5v14l11-7z" />
              </svg>
              Start Watching
            </button>
            <button
              onClick={explore}
              className="press-aa inline-flex items-center gap-2 rounded-full border border-border bg-background/50 px-7 py-3 font-serif text-[0.6rem] uppercase tracking-[0.3em] text-foreground backdrop-blur transition-colors hover:bg-background/80"
            >
              Browse
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
