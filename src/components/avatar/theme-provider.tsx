"use client";

import * as React from "react";
import { ThemeProvider as NextThemesProvider } from "next-themes";

type Theme = "dark" | "parchment";

export const AA_THEMES: { id: Theme; name: string; swatch: string }[] = [
  { id: "dark", name: "Dark", swatch: "#04070d" },
  { id: "parchment", name: "Parchment", swatch: "#f5efe0" },
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
