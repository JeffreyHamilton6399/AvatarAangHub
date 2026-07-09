"use client";

import * as React from "react";
import { useTheme } from "next-themes";
import { Check, Settings } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { AA_THEMES } from "./theme-provider";

export function ThemeSwitcher() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);
  React.useEffect(() => setMounted(true), []);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="rounded-full text-muted-foreground hover:text-foreground"
          aria-label="Choose a theme"
        >
          <Settings className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-44">
        <DropdownMenuLabel className="font-serif text-xs uppercase tracking-widest text-muted-foreground">
          Themes
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        {AA_THEMES.map((t) => (
          <DropdownMenuItem
            key={t.id}
            onClick={() => setTheme(t.id)}
            className="flex items-center justify-between gap-2"
          >
            <span className="flex items-center gap-2">
              <span
                className="h-3 w-3 rounded-full ring-1 ring-border"
                style={{ backgroundColor: t.swatch }}
              />
              <span className="font-body-aa text-sm">{t.name}</span>
            </span>
            {mounted && theme === t.id && <Check className="h-3.5 w-3.5" />}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
