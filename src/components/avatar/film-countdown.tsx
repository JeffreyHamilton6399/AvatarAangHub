"use client";

import * as React from "react";
import { FILM_2026_PREMIERE } from "@/lib/avatar-data";

function useCountdown(target: number) {
  const [now, setNow] = React.useState(() => Date.now());
  React.useEffect(() => {
    const id = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(id);
  }, []);
  const diff = Math.max(0, target - now);
  const days = Math.floor(diff / 86400000);
  const hours = Math.floor((diff % 86400000) / 3600000);
  const minutes = Math.floor((diff % 3600000) / 60000);
  const seconds = Math.floor((diff % 60000) / 1000);
  return { days, hours, minutes, seconds, done: diff === 0 };
}

function Unit({ value, label }: { value: number; label: string }) {
  return (
    <div className="flex flex-col items-center">
      <div className="font-display flex h-14 w-14 items-center justify-center rounded-md border border-[rgba(201,168,76,0.3)] bg-background/60 font-mono text-xl font-bold tabular-nums text-foreground backdrop-blur sm:h-16 sm:w-16 sm:text-2xl">
        {String(value).padStart(2, "0")}
      </div>
      <span className="font-body-aa mt-2 text-[0.55rem] uppercase tracking-[0.2em] text-muted-foreground">
        {label}
      </span>
    </div>
  );
}

export function FilmCountdown() {
  const { days, hours, minutes, seconds, done } = useCountdown(FILM_2026_PREMIERE);

  return (
    <section className="relative overflow-hidden py-12 sm:py-16">
      <div
        className="pointer-events-none absolute inset-0 -z-10 opacity-20"
        style={{
          backgroundImage: "url(/images/movie2026bg.png)",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />
      <div className="pointer-events-none absolute inset-0 -z-10 bg-gradient-to-b from-background/85 via-background/70 to-background/90" />

      <div className="mx-auto max-w-3xl px-4 text-center sm:px-6">
        <p className="font-body-aa mb-3 inline-flex items-center gap-2 rounded-full border border-[rgba(201,168,76,0.3)] bg-card/60 px-4 py-1 text-[0.6rem] uppercase tracking-[0.3em] text-gold backdrop-blur">
          In Theatres · Paramount+
        </p>

        <h2 className="font-display text-2xl font-bold tracking-wide sm:text-3xl">
          Aang: The Last Airbender
        </h2>
        <p className="font-body-aa mt-2 text-xs italic text-muted-foreground">
          The first animated Avatar theatrical film in over a decade · October 9, 2026
        </p>

        {done ? (
          <p className="font-display mt-8 text-2xl text-gold">
            Now premiering!
          </p>
        ) : (
          <div className="mt-8 flex items-center justify-center gap-2 sm:gap-4">
            <Unit value={days} label="Days" />
            <span className="font-mono text-xl text-[var(--gold)] opacity-40 sm:text-2xl">:</span>
            <Unit value={hours} label="Hours" />
            <span className="font-mono text-xl text-[var(--gold)] opacity-40 sm:text-2xl">:</span>
            <Unit value={minutes} label="Mins" />
            <span className="font-mono text-xl text-[var(--gold)] opacity-40 sm:text-2xl">:</span>
            <Unit value={seconds} label="Secs" />
          </div>
        )}
      </div>
    </section>
  );
}
