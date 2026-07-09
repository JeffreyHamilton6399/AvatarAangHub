"use client";

import * as React from "react";
import { Film, Calendar } from "lucide-react";
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
      <div className="flex h-16 w-16 items-center justify-center rounded-xl border border-primary/30 bg-background/60 font-mono text-2xl font-bold tabular-nums text-foreground backdrop-blur sm:h-20 sm:w-20 sm:text-3xl">
        {String(value).padStart(2, "0")}
      </div>
      <span className="mt-2 text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
        {label}
      </span>
    </div>
  );
}

export function FilmCountdown() {
  const { days, hours, minutes, seconds, done } = useCountdown(FILM_2026_PREMIERE);

  return (
    <section className="relative overflow-hidden py-16 sm:py-20">
      <div
        className="pointer-events-none absolute inset-0 -z-10 opacity-25"
        style={{
          backgroundImage: "url(/images/movie2026bg.png)",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />
      <div className="pointer-events-none absolute inset-0 -z-10 bg-gradient-to-b from-background/80 via-background/60 to-background/90" />

      <div className="mx-auto max-w-4xl px-4 text-center sm:px-6">
        <p className="mb-3 inline-flex items-center gap-2 rounded-full border border-primary/30 bg-card/60 px-4 py-1.5 text-xs uppercase tracking-[0.25em] text-primary backdrop-blur">
          <Calendar className="h-3.5 w-3.5" />
          In Theatres · Paramount+
        </p>

        <h2 className="flex items-center justify-center gap-2 text-3xl font-bold tracking-tight sm:text-4xl">
          <Film className="h-7 w-7 text-primary" />
          Aang: The Last Airbender
        </h2>
        <p className="mt-2 text-sm text-muted-foreground">
          The first animated Avatar theatrical film in over a decade ·
          October 9, 2026
        </p>

        {done ? (
          <p className="mt-10 text-2xl font-semibold text-primary">
            Now premiering!
          </p>
        ) : (
          <div className="mt-10 flex items-center justify-center gap-3 sm:gap-5">
            <Unit value={days} label="Days" />
            <span className="font-mono text-2xl text-primary/40 sm:text-3xl">:</span>
            <Unit value={hours} label="Hours" />
            <span className="font-mono text-2xl text-primary/40 sm:text-3xl">:</span>
            <Unit value={minutes} label="Mins" />
            <span className="font-mono text-2xl text-primary/40 sm:text-3xl">:</span>
            <Unit value={seconds} label="Secs" />
          </div>
        )}
      </div>
    </section>
  );
}
