"use client";

import * as React from "react";

/**
 * Persisted watch progress for episodes.
 * Keyed by video URL so it works across the whole archive.
 */
export interface WatchProgress {
  videoUrl: string;
  title: string;
  seriesShort: string;
  bookSublabel: string;
  episodeTitle: string;
  episodeN: number;
  backgroundImage: string;
  accent: string;
  currentTime: number;
  duration: number;
  updatedAt: number;
}

const STORAGE_KEY = "avatarhub_progress";
const MAX_ENTRIES = 12;

function read(): WatchProgress[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const arr = JSON.parse(raw);
    return Array.isArray(arr) ? arr : [];
  } catch {
    return [];
  }
}

function write(entries: WatchProgress[]) {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(entries.slice(0, MAX_ENTRIES)));
    // Notify other components in the same tab
    window.dispatchEvent(new CustomEvent("avatarhub:progress"));
  } catch {
    // ignore quota errors
  }
}

export function saveProgress(entry: WatchProgress) {
  const entries = read();
  const idx = entries.findIndex((e) => e.videoUrl === entry.videoUrl);
  // Don't save if barely started (< 5s) — likely a misclick
  if (entry.currentTime < 5 && idx === -1) return;
  if (idx >= 0) {
    entries[idx] = { ...entries[idx], ...entry };
  } else {
    entries.unshift(entry);
  }
  // Sort by most recently watched
  entries.sort((a, b) => b.updatedAt - a.updatedAt);
  write(entries);
}

export function getProgress(videoUrl: string): number {
  const entries = read();
  return entries.find((e) => e.videoUrl === videoUrl)?.currentTime ?? 0;
}

export function clearProgress(videoUrl: string) {
  const entries = read().filter((e) => e.videoUrl !== videoUrl);
  write(entries);
}

export function useContinueWatching() {
  const [entries, setEntries] = React.useState<WatchProgress[]>([]);

  const refresh = React.useCallback(() => {
    setEntries(read());
  }, []);

  React.useEffect(() => {
    refresh();
    const onChange = () => refresh();
    window.addEventListener("avatarhub:progress", onChange);
    window.addEventListener("storage", onChange);
    return () => {
      window.removeEventListener("avatarhub:progress", onChange);
      window.removeEventListener("storage", onChange);
    };
  }, [refresh]);

  // Filter out fully-watched (>95%) for the continue row
  const continueList = entries.filter(
    (e) => e.duration > 0 && e.currentTime / e.duration < 0.95
  );

  return { continueList, refresh };
}
