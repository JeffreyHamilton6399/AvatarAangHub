"use client";

import * as React from "react";
import { Menu, Search, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { ThemeSwitcher } from "./theme-switcher";

interface NavLink {
  id: string;
  label: string;
  symbol: string;
}

const LINKS: NavLink[] = [
  { id: "series", label: "Series", symbol: "/images/air.png" },
  { id: "episodes", label: "Episodes", symbol: "/images/water.png" },
  { id: "characters", label: "Characters", symbol: "/images/earth.png" },
  { id: "elements", label: "Elements", symbol: "/images/fire.png" },
  { id: "books", label: "Library", symbol: "/images/air.png" },
  { id: "timeline", label: "Timeline", symbol: "/images/water.png" },
  { id: "games", label: "More", symbol: "/images/earth.png" },
  { id: "about", label: "About", symbol: "/images/fire.png" },
];

export function Navbar({ onSearch }: { onSearch: () => void }) {
  const [open, setOpen] = React.useState(false);
  const [scrolled, setScrolled] = React.useState(false);
  const [active, setActive] = React.useState("");

  React.useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  React.useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        if (visible[0]) setActive(visible[0].target.id);
      },
      { rootMargin: "-40% 0px -50% 0px", threshold: [0, 0.25, 0.5, 1] }
    );
    LINKS.forEach((l) => {
      const el = document.getElementById(l.id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  const go = (id: string) => {
    setOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <header
      className={cn(
        "sticky top-0 z-50 w-full transition-all duration-300",
        scrolled
          ? "border-b border-border bg-background/85 backdrop-blur-md"
          : "border-b border-transparent bg-transparent"
      )}
    >
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6">
        {/* Brand */}
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="flex items-center gap-3"
          aria-label="AvatarArchive home"
        >
          <span className="flex h-9 w-9 items-center justify-center">
            <img
              src="/images/air.png"
              alt=""
              className="h-8 w-8 object-contain opacity-90"
              style={{ filter: "drop-shadow(0 0 6px rgba(245,197,24,0.4))" }}
            />
          </span>
          <span className="flex flex-col leading-none">
            <span className="font-display text-sm tracking-[0.1em] text-foreground">
              AvatarArchive
            </span>
            <span className="font-body-aa text-[9px] uppercase tracking-[0.25em] text-muted-foreground">
              The Four Nations
            </span>
          </span>
        </button>

        {/* Desktop nav */}
        <nav className="hidden items-center md:flex" aria-label="Primary">
          {LINKS.map((l) => (
            <button
              key={l.id}
              onClick={() => go(l.id)}
              className={cn(
                "press-aa relative px-3.5 py-2 font-serif text-xs uppercase tracking-[0.18em] transition-colors",
                active === l.id
                  ? "text-gold"
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              {l.label}
              {active === l.id && (
                <span className="absolute inset-x-3 -bottom-0.5 h-px bg-gradient-to-r from-transparent via-gold to-transparent" style={{ background: "linear-gradient(to right, transparent, var(--gold), transparent)" }} />
              )}
            </button>
          ))}
        </nav>

        {/* Actions */}
        <div className="flex items-center gap-1.5">
          <Button
            variant="ghost"
            size="icon"
            onClick={onSearch}
            className="rounded-full text-muted-foreground hover:text-foreground"
            aria-label="Search"
          >
            <Search className="h-4 w-4" />
          </Button>
          <ThemeSwitcher />
          <Button
            variant="ghost"
            size="icon"
            className="rounded-full text-muted-foreground md:hidden"
            onClick={() => setOpen((v) => !v)}
            aria-label="Toggle menu"
            aria-expanded={open}
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>
      </div>

      {/* Mobile nav */}
      {open && (
        <nav
          className="border-t border-border bg-background/95 px-4 py-3 backdrop-blur md:hidden"
          aria-label="Mobile"
        >
          <div className="grid grid-cols-2 gap-1">
            {LINKS.map((l) => (
              <button
                key={l.id}
                onClick={() => go(l.id)}
                className={cn(
                  "press-aa flex items-center gap-2.5 rounded-md px-3 py-2.5 text-left font-serif text-xs uppercase tracking-[0.15em] transition-colors",
                  active === l.id
                    ? "bg-secondary text-gold"
                    : "text-muted-foreground hover:bg-secondary hover:text-foreground"
                )}
              >
                <img src={l.symbol} alt="" className="h-4 w-4 object-contain opacity-70" />
                {l.label}
              </button>
            ))}
          </div>
        </nav>
      )}
    </header>
  );
}
