"use client";

import * as React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface RowProps<T> {
  title: string;
  items: T[];
  renderItem: (item: T, index: number) => React.ReactNode;
  keyExtractor: (item: T, index: number) => string;
}

export function NetflixRow<T>({
  title,
  items,
  renderItem,
  keyExtractor,
}: RowProps<T>) {
  const scrollRef = React.useRef<HTMLDivElement | null>(null);
  const [canLeft, setCanLeft] = React.useState(false);
  const [canRight, setCanRight] = React.useState(false);

  const update = React.useCallback(() => {
    const el = scrollRef.current;
    if (!el) return;
    setCanLeft(el.scrollLeft > 8);
    setCanRight(el.scrollLeft < el.scrollWidth - el.clientWidth - 8);
  }, []);

  React.useEffect(() => {
    update();
    const el = scrollRef.current;
    if (!el) return;
    el.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      el.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, [update, items]);

  const scrollBy = (dir: 1 | -1) => {
    const el = scrollRef.current;
    if (!el) return;
    el.scrollBy({ left: dir * Math.round(el.clientWidth * 0.8), behavior: "smooth" });
  };

  return (
    <section className="group/row relative">
      <div className="mb-2 flex items-baseline justify-between px-4 sm:px-6 lg:px-10">
        <h2 className="font-serif text-lg font-semibold tracking-wide text-foreground sm:text-xl">
          {title}
        </h2>
      </div>

      <div className="relative">
        {/* Left arrow */}
        <button
          onClick={() => scrollBy(-1)}
          className={cn(
            "press-aa absolute left-0 top-0 z-20 hidden h-full w-10 items-center justify-center bg-gradient-to-r from-background/95 to-transparent text-foreground transition-opacity sm:flex",
            canLeft ? "opacity-0 group-hover/row:opacity-100" : "pointer-events-none opacity-0"
          )}
          aria-label="Scroll left"
        >
          <ChevronLeft className="h-6 w-6" />
        </button>

        {/* Scrollable row */}
        <div
          ref={scrollRef}
          className="aa-scroll flex gap-2.5 overflow-x-auto scroll-smooth px-4 pb-2 sm:px-6 lg:px-10"
          style={{ scrollbarWidth: "none" }}
        >
          {items.map((item, i) => (
            <div key={keyExtractor(item, i)} className="shrink-0">
              {renderItem(item, i)}
            </div>
          ))}
          <div className="shrink-0 w-1" aria-hidden="true" />
        </div>

        {/* Right arrow */}
        <button
          onClick={() => scrollBy(1)}
          className={cn(
            "press-aa absolute right-0 top-0 z-20 hidden h-full w-10 items-center justify-center bg-gradient-to-l from-background/95 to-transparent text-foreground transition-opacity sm:flex",
            canRight ? "opacity-0 group-hover/row:opacity-100" : "pointer-events-none opacity-0"
          )}
          aria-label="Scroll right"
        >
          <ChevronRight className="h-6 w-6" />
        </button>
      </div>
    </section>
  );
}
