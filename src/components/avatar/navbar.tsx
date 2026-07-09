"use client";

import * as React from "react";
import { Menu, Search, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { ThemeSwitcher } from "./theme-switcher";
import { ElementSymbol } from "./element-symbol";
import type { ElementId } from "@/lib/avatar-data";

interface NavLink {
  id: string;
  label: string;
  element: ElementId;
}

const LINKS: NavLink[] = [
  { id: "series", label: "Series", element: "air" },
  { id: "episodes", label: "Episodes", element: "water" },
  { id: "characters", label: "Characters", element: "earth" },
  { id: "elements", label: "Elements", element: "fire" },
  { id: "books", label: "Comics", element: "spirit" },
  { id: "timeline", label: "Timeline", element: "none" },
  { id: "games", label: "Games", element: "air" },
  { id: "about", label: "About", element: "water" },
];

export function Navbar({ onSearch }: { onSearch: () => void }) {
  const [open, setOpen] = React.useState(false);
  const [scrolled, setScrolled] = React.useState(false);
  const [active, setActive] = React.useState<string>("");

  React.useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  React.useEffect(() => {
    const ids = LINKS.map((l) => l.id);
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        if (visible[0]) setActive(visible[0].target.id);
      },
      { rootMargin: "-40% 0px -50% 0px", threshold: [0, 0.25, 0.5, 1] }
    );
    ids.forEach((id) => {
      const el = document.getElementById(id);
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
          ? "border-b border-border/60 bg-background/80 backdrop-blur-md"
          : "bg-transparent"
      )}
    >
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6">
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="group flex items-center gap-2.5"
          aria-label="AvatarArchive home"
        >
          <span className="relative flex h-9 w-9 items-center justify-center">
            <span className="absolute inset-0 rounded-full bg-primary/15 blur-md transition-opacity group-hover:opacity-100" />
            <span className="relative flex h-9 w-9 items-center justify-center rounded-full border border-primary/40 bg-card text-primary">
              <span className="h-5 w-5">
                <ElementSymbol element="air" strokeWidth={2.2} />
              </span>
            </span>
          </span>
          <span className="flex flex-col leading-none">
            <span className="text-sm font-semibold tracking-wide text-foreground">
              AvatarArchive
            </span>
            <span className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
              The Four Nations
            </span>
          </span>
        </button>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-1 md:flex" aria-label="Primary">
          {LINKS.map((l) => (
            <button
              key={l.id}
              onClick={() => go(l.id)}
              className={cn(
                "relative rounded-full px-3.5 py-2 text-sm font-medium transition-colors",
                active === l.id
                  ? "text-foreground"
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              {active === l.id && (
                <span className="absolute inset-0 rounded-full bg-primary/12" />
              )}
              <span className="relative">{l.label}</span>
            </button>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={onSearch}
            className="hidden gap-2 rounded-full border-border/60 bg-background/40 px-3 backdrop-blur sm:inline-flex"
          >
            <Search className="h-4 w-4" />
            <span className="text-muted-foreground">Search</span>
            <kbd className="ml-1 rounded bg-muted px-1.5 py-0.5 font-mono text-[10px] text-muted-foreground">
              /
            </kbd>
          </Button>
          <Button
            variant="outline"
            size="icon"
            onClick={onSearch}
            className="rounded-full border-border/60 bg-background/40 backdrop-blur sm:hidden"
            aria-label="Search"
          >
            <Search className="h-4 w-4" />
          </Button>
          <ThemeSwitcher />
          <Button
            variant="ghost"
            size="icon"
            className="rounded-full md:hidden"
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
          className="border-b border-border/60 bg-background/95 px-4 py-3 backdrop-blur md:hidden"
          aria-label="Mobile"
        >
          <div className="flex flex-col gap-1">
            {LINKS.map((l) => (
              <button
                key={l.id}
                onClick={() => go(l.id)}
                className={cn(
                  "rounded-lg px-3 py-2.5 text-left text-sm font-medium transition-colors",
                  active === l.id
                    ? "bg-primary/12 text-foreground"
                    : "text-muted-foreground hover:bg-accent hover:text-foreground"
                )}
              >
                {l.label}
              </button>
            ))}
          </div>
        </nav>
      )}
    </header>
  );
}
