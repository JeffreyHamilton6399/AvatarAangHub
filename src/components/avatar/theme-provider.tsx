"use client";

import * as React from "react";
import { ThemeProvider as NextThemesProvider } from "next-themes";

type Theme = "dark" | "parchment" | "water" | "earth" | "fire" | "air";

export const AA_THEMES: { id: Theme; name: string; element: string; swatch: string }[] = [
  { id: "dark", name: "Dark", element: "Spirit", swatch: "#1b1830" },
  { id: "parchment", name: "Parchment", element: "Scroll", swatch: "#e9dcb6" },
  { id: "water", name: "Water", element: "Water", swatch: "#2da6f4" },
  { id: "earth", name: "Earth", element: "Earth", swatch: "#7cb342" },
  { id: "fire", name: "Fire", element: "Fire", swatch: "#ef4444" },
  { id: "air", name: "Air", element: "Air", swatch: "#f59e0b" },
];

export function ThemeProvider({
  children,
}: {
  children: React.ReactNode;
}) {
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
