"use client";

import * as React from "react";
import { ThemeProvider as NextThemesProvider } from "next-themes";

type Theme = "dark" | "parchment" | "water" | "earth" | "fire" | "air";

export const AA_THEMES: {
  id: Theme;
  name: string;
  swatch: string;
}[] = [
  { id: "dark", name: "Dark", swatch: "#04070d" },
  { id: "parchment", name: "Parchment", swatch: "#f5efe0" },
  { id: "water", name: "Water", swatch: "#4db8ff" },
  { id: "earth", name: "Earth", swatch: "#6abf69" },
  { id: "fire", name: "Fire", swatch: "#f97316" },
  { id: "air", name: "Air", swatch: "#f5c518" },
];

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  return (
    <NextThemesProvider
      attribute="class"
      defaultTheme="dark"
      enableSystem={false}
      disableTransitionOnChange
      themes={AA_THEMES.map((t) => t.id)}
    >
      {children}
    </NextThemesProvider>
  );
}
