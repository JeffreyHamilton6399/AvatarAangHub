# AvatarArchive

> The entire Avatar universe — one fan-made media hub.

An unofficial, fan-built archive celebrating **Avatar: The Last Airbender**, **The Legend of Korra**, the films, characters, bending arts, graphic novels, and the full in-universe chronology — built as a modern Next.js application with all the original content.

---

## Overview

AvatarArchive is a love letter to the Avatar franchise. This Next.js edition combines the fancy, themeable UI of a modern React app with the **real content** from the original vanilla-HTML project — every episode title, every graphic novel PDF, every image, and every caption file, all served from the same deploy.

> **Disclaimer:** AvatarArchive is an unofficial fan project. It is not affiliated with, endorsed by, or sponsored by Nickelodeon, Viacom, Paramount, or Netflix. All trademarks belong to their respective owners.

---

## Features

- **World-map hero** with ambient drifting bending-symbol particles (Canvas 2D)
- **Live countdown** to the October 9, 2026 *Aang: The Last Airbender* film premiere
- **Cross-series search** — one command palette (press `/` or `Cmd/Ctrl+K`) queries every episode, character, comic, game, and timeline event
- **Six elemental themes** — Dark, Parchment, Water, Earth, Fire, and Air — re-color the entire site instantly
- **Series browser** — ATLA, Korra, Live Action, 2026 film, and 2010 film with detail modals
- **Episodes browser** — all 113+ real episode titles across every Book, with per-book selectors
- **Character compendium** — 15 characters color-coded by bending art, filterable & searchable
- **The Four Elements** — philosophy, sub-skills, nations, and notable benders
- **Graphic novel library** — 18 PDFs across 6 Dark Horse trilogies, readable in-page via an embedded PDF reader
- **Full chronology** — accordion timeline from Avatar Wan's era through Korra's (BG/AG convention)
- **Games & merchandise** — 3 games and 14 curated official storefronts
- **Responsive & accessible** — mobile-first, semantic HTML, keyboard nav, reduced-motion support, sticky footer

## Static Assets Included

All original assets are served from `public/`:

| Folder | Contents |
|--------|----------|
| `public/books/` | 18 graphic novel PDFs (6 trilogies: The Promise, The Search, The Rift, Smoke and Shadow, North and South, Imbalance) |
| `public/images/` | 18 images — element symbols, series backgrounds, world map, movie preview |
| `public/audio/` | 2 ambient audio files (intro + loop) |
| `public/captions/` | 103 SRT caption files across 7 seasons + the 2026 film |
| `public/manifest.json` | PWA web app manifest |

---

## Tech Stack

- **[Next.js 16](https://nextjs.org/)** (App Router) + **React 19**
- **TypeScript 5**
- **[Tailwind CSS 4](https://tailwindcss.com/)** + **[shadcn/ui](https://ui.shadcn.com/)** (New York)
- **[next-themes](https://github.com/pacocoursey/next-themes)** for the elemental theme engine
- **[lucide-react](https://lucide.dev/)** icons
- **[cmdk](https://cmdk.paco.me/)** for the search palette

---

## Getting Started

```bash
bun install
bun run dev      # http://localhost:3000
bun run lint
bun run build && bun run start
```

> Requires Node.js 18.18+ (or Bun) and Next.js 16.

---

## Deploy on Vercel

1. Push this repository to GitHub.
2. Go to [vercel.com/new](https://vercel.com/new) and import the repo.
3. Vercel auto-detects Next.js — keep the defaults (Build Command: `next build`, Output Directory: `.next`).
4. Click **Deploy**. No environment variables are required.

Every `git push` to `main` automatically redeploys.

---

## Project Structure

```
public/                     # static assets served as-is
├── books/                  # 18 graphic novel PDFs
├── images/                 # 18 element & background images
├── audio/                  # ambient audio
├── captions/               # 103 SRT files
└── manifest.json
src/
├── app/
│   ├── layout.tsx          # root layout + ThemeProvider + metadata
│   ├── page.tsx            # single-page hub
│   └── globals.css         # six elemental theme palettes
├── components/
│   ├── avatar/             # AvatarArchive feature components
│   │   ├── navbar, hero, particle-canvas
│   │   ├── film-countdown, series-section, episodes-section
│   │   ├── characters-section, elements-section, books-section
│   │   ├── timeline-section, games-merch-section
│   │   ├── features-section, about-section, footer
│   │   ├── search-command, theme-provider, theme-switcher
│   │   └── element-symbol
│   └── ui/                 # shadcn/ui primitives
└── lib/
    └── avatar-data.ts      # all fan-curated content (real episode titles, novels, games, stores, timeline)
```

---

## Credits

Built by **[Jeffrey Creates](https://www.youtube.com/@Jeffrey_Creates)**.

Avatar: The Last Airbender and The Legend of Korra © Nickelodeon / Viacom / Paramount. This is a non-commercial fan project — no copyright infringement is intended. Iroh would approve.
