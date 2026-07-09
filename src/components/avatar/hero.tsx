"use client";

import { ParticleCanvas } from "./particle-canvas";

export function Hero() {
  const explore = () =>
    document.getElementById("series")?.scrollIntoView({ behavior: "smooth" });

  return (
    <section className="relative isolate flex min-h-[88vh] items-center overflow-hidden">
      {/* Particle layer */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <ParticleCanvas className="h-full w-full opacity-70" />
      </div>

      {/* World map backdrop, very subtle */}
      <div className="pointer-events-none absolute inset-0 -z-20">
        <div
          className="aa-spin-slow absolute left-1/2 top-1/2 h-[120vmin] w-[120vmin] -translate-x-1/2 -translate-y-1/2 opacity-[0.04]"
          style={{
            backgroundImage: "url(/images/worldmap.png)",
            backgroundSize: "contain",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
          }}
        />
      </div>

      {/* Radial glow */}
      <div className="pointer-events-none absolute inset-0 -z-20">
        <div className="absolute left-1/2 top-1/3 h-[36rem] w-[36rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[rgba(77,184,255,0.10)] blur-[120px]" />
        <div className="absolute left-1/2 bottom-1/4 h-[28rem] w-[28rem] -translate-x-1/2 rounded-full bg-[rgba(201,168,76,0.08)] blur-[120px]" />
      </div>

      <div className="mx-auto w-full max-w-4xl px-4 py-24 text-center sm:px-6">
        {/* Four element symbols in a row */}
        <div className="aa-fade-in mb-8 flex items-center justify-center gap-[clamp(1.5rem,5vw,3.5rem)]">
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
              className="h-[clamp(2rem,5vw,3rem)] w-[clamp(2rem,5vw,3rem)] object-contain opacity-85"
              style={{ animation: `aa-pulse-glow 3s ease-in-out infinite ${el.delay}`, color: el.color }}
            />
          ))}
        </div>

        <p className="aa-slide-up font-body-aa mb-4 text-[0.7rem] uppercase tracking-[0.4em] text-muted-foreground">
          The Avatar Universe
        </p>

        <h1
          className="aa-slide-up font-display text-[clamp(2.5rem,8vw,5.5rem)] font-bold leading-none tracking-[0.08em]"
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
          className="aa-slide-up font-body-aa mt-4 text-base italic tracking-wide text-muted-foreground sm:text-lg"
          style={{ animationDelay: "0.16s" }}
        >
          The entire Avatar universe — one fan-made media hub.
        </p>

        {/* Gold divider */}
        <div
          className="aa-fade-in mx-auto mt-8 h-px w-20"
          style={{
            background: "linear-gradient(to right, transparent, rgba(201,168,76,0.5), transparent)",
            animationDelay: "0.24s",
          }}
        />

        <p
          className="aa-slide-up mx-auto mt-8 max-w-xl font-body-aa text-pretty text-sm leading-relaxed text-muted-foreground sm:text-base"
          style={{ animationDelay: "0.3s" }}
        >
          Every series, every episode, every graphic novel, every era — from the
          Hundred Year War to the Spirit Portals. Choose your path through the
          Four Nations.
        </p>

        <div
          className="aa-slide-up mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row"
          style={{ animationDelay: "0.38s" }}
        >
          <button
            onClick={explore}
            className="press-aa rounded-full bg-gradient-to-br from-[#4db8ff] to-[#1a8fcc] px-7 py-3 font-serif text-[0.6rem] uppercase tracking-[0.3em] text-[#04070d] shadow-[0_4px_18px_rgba(77,184,255,0.35)] transition-all hover:shadow-[0_6px_24px_rgba(77,184,255,0.5)]"
          >
            Enter the Archive
          </button>
          <button
            onClick={() =>
              document.getElementById("timeline")?.scrollIntoView({ behavior: "smooth" })
            }
            className="press-aa rounded-full border border-border bg-background/40 px-7 py-3 font-serif text-[0.6rem] uppercase tracking-[0.3em] text-muted-foreground backdrop-blur transition-colors hover:border-[rgba(201,168,76,0.4)] hover:text-foreground"
          >
            View the Timeline
          </button>
        </div>

        {/* Stats row */}
        <div
          className="aa-fade-in mt-16 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 font-body-aa text-[0.65rem] uppercase tracking-[0.25em] text-muted-foreground"
          style={{ animationDelay: "0.46s" }}
        >
          <span>113+ Episodes</span>
          <span className="h-1 w-1 rounded-full bg-[var(--gold)] opacity-60" />
          <span>18 Graphic Novels</span>
          <span className="h-1 w-1 rounded-full bg-[var(--gold)] opacity-60" />
          <span>15 Characters</span>
          <span className="h-1 w-1 rounded-full bg-[var(--gold)] opacity-60" />
          <span>10,000 Years of Lore</span>
        </div>
      </div>
    </section>
  );
}
