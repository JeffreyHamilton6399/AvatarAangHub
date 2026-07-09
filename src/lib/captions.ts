"use client";

import * as React from "react";

export interface Cue {
  start: number; // seconds
  end: number; // seconds
  text: string;
}

/** Parse SRT format into cues. Handles <i> tags, \n line breaks. */
export function parseSRT(content: string): Cue[] {
  const cues: Cue[] = [];
  // Normalize line endings, split into blocks
  const blocks = content.replace(/\r\n/g, "\n").replace(/\r/g, "\n").trim().split(/\n\s*\n/);

  for (const block of blocks) {
    const lines = block.split("\n");
    if (lines.length < 2) continue;
    // Find the timestamp line (skip the optional index number)
    let tsLine = lines[1];
    if (!tsLine || !tsLine.includes("-->")) {
      tsLine = lines[0];
      if (!tsLine || !tsLine.includes("-->")) continue;
    }
    const match = tsLine.match(/(\d{2}:\d{2}:\d{2}[,.]\d{3})\s*-->\s*(\d{2}:\d{2}:\d{2}[,.]\d{3})/);
    if (!match) continue;
    const start = timeToSeconds(match[1]);
    const end = timeToSeconds(match[2]);
    // Text is everything after the timestamp line
    const textIdx = lines.indexOf(tsLine) + 1;
    const text = lines.slice(textIdx).join("\n").trim();
    if (text) cues.push({ start, end, text });
  }
  return cues;
}

function timeToSeconds(t: string): number {
  const m = t.replace(",", ".").match(/(\d{2}):(\d{2}):(\d{2})\.(\d{3})/);
  if (!m) return 0;
  return parseInt(m[1]) * 3600 + parseInt(m[2]) * 60 + parseInt(m[3]) + parseInt(m[4]) / 1000;
}

/** Load and parse an SRT file, returning cues. */
export function useCaptions(srtUrl?: string) {
  const [cues, setCues] = React.useState<Cue[]>([]);
  const [loaded, setLoaded] = React.useState(false);

  React.useEffect(() => {
    if (!srtUrl) {
      setCues([]);
      setLoaded(true);
      return;
    }
    setLoaded(false);
    let cancelled = false;
    fetch(srtUrl)
      .then((r) => {
        if (!r.ok) throw new Error("Not found");
        return r.text();
      })
      .then((text) => {
        if (cancelled) return;
        setCues(parseSRT(text));
        setLoaded(true);
      })
      .catch(() => {
        if (cancelled) return;
        setCues([]);
        setLoaded(true); // captions just aren't available
      });
    return () => {
      cancelled = true;
    };
  }, [srtUrl]);

  return { cues, loaded };
}

/** Get the active cue for a given time. */
export function getActiveCue(cues: Cue[], time: number): Cue | null {
  for (const c of cues) {
    if (time >= c.start && time <= c.end) return c;
  }
  return null;
}
