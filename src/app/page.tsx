"use client";

import * as React from "react";
import { Navbar } from "@/components/avatar/navbar";
import { Hero } from "@/components/avatar/hero";
import { FilmCountdown } from "@/components/avatar/film-countdown";
import { SeriesSection } from "@/components/avatar/series-section";
import { EpisodesSection } from "@/components/avatar/episodes-section";
import { CharactersSection } from "@/components/avatar/characters-section";
import { ElementsSection } from "@/components/avatar/elements-section";
import { BooksSection } from "@/components/avatar/books-section";
import { TimelineSection } from "@/components/avatar/timeline-section";
import { GamesMerchSection } from "@/components/avatar/games-merch-section";
import { FeaturesSection } from "@/components/avatar/features-section";
import { AboutSection } from "@/components/avatar/about-section";
import { Footer } from "@/components/avatar/footer";
import { SearchCommand } from "@/components/avatar/search-command";

export default function Home() {
  const [searchOpen, setSearchOpen] = React.useState(false);

  React.useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement | null;
      const typing =
        target &&
        (target.tagName === "INPUT" ||
          target.tagName === "TEXTAREA" ||
          target.isContentEditable);
      if (e.key === "/" && !typing && !searchOpen) {
        e.preventDefault();
        setSearchOpen(true);
      }
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setSearchOpen((v) => !v);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [searchOpen]);

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar onSearch={() => setSearchOpen(true)} />
      <main className="flex-1">
        <Hero />
        <FilmCountdown />
        <SeriesSection />
        <EpisodesSection />
        <CharactersSection />
        <ElementsSection />
        <BooksSection />
        <TimelineSection />
        <GamesMerchSection />
        <FeaturesSection />
        <AboutSection />
      </main>
      <Footer />
      <SearchCommand open={searchOpen} onOpenChange={setSearchOpen} />
    </div>
  );
}
