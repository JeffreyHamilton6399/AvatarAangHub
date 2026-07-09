# AvatarArchive

> The entire Avatar universe — one fan-made media hub.

An unofficial, fan-built archive celebrating **Avatar: The Last Airbender**, **The Legend of Korra**, the films, characters, bending arts, and the full in-universe chronology — rebuilt as a modern Next.js application.

---

## Overview

AvatarArchive is a love letter to the Avatar franchise. This edition reimagines the
original vanilla-HTML project as a type-safe, responsive, accessible React app
ready to deploy on Vercel. Wander the Four Nations, browse every series, meet the
characters, study the four bending arts, and trace ten thousand years of history
across an interactive timeline.

> **Disclaimer:** AvatarArchive is an unofficial fan project. It is not affiliated
> with, endorsed by, or sponsored by Nickelodeon, Viacom, Paramount, or Netflix.
> All trademarks belong to their respective owners.

---

## Features

- **World-map hero** with ambient drifting bending-symbol particles (Canvas 2D)
- **Cross-series search** — one command palette (press `/` or `Cmd/Ctrl+K`) queries every series, character, element, and timeline event
- **Six elemental themes** — Dark, Parchment, Water, Earth, Fire, and Air — re-color the entire site instantly via CSS custom properties
- **Series browser** — every chapter of the saga with books, seasons, and episode counts
- **Character compendium** — color-coded by bending art, filterable and searchable, with affiliations, voice actors, and defining quotes
- **The Four Elements** — philosophy, sub-skills, nations, and notable benders for Water, Earth, Fire, and Air
- **Full chronology** — an accordion timeline from Avatar Wan's era through Korra's, using the standard BG/AG convention
- **Responsive & accessible** — mobile-first layout, semantic HTML, keyboard navigation, reduced-motion support, and a sticky footer

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
# install dependencies
bun install

# start the dev server (http://localhost:3000)
bun run dev

# lint
bun run lint

# production build
bun run build && bun run start
```

> Requires Node.js 18.18+ (or Bun) and Next.js 16.

---

## Deploy on Vercel

This project is configured for one-click deployment on Vercel:

1. Push this repository to GitHub.
2. Go to [vercel.com/new](https://vercel.com/new) and import the repo.
3. Vercel auto-detects Next.js — keep the defaults (Build Command: `next build`, Output Directory: `.next`).
4. Click **Deploy**. No environment variables are required.

The `build` script is plain `next build` with no platform-specific post-build
steps, so it runs cleanly on Vercel, Netlify, or any Node host.

---

## Project Structure

```
src/
├── app/
│   ├── layout.tsx          # root layout + ThemeProvider + metadata
│   ├── page.tsx            # single-page hub orchestrating all sections
│   ├── globals.css         # six elemental theme palettes + utilities
│   └── api/route.ts
├── components/
│   ├── avatar/             # AvatarArchive feature components
│   │   ├── navbar.tsx
│   │   ├── hero.tsx
│   │   ├── particle-canvas.tsx
│   │   ├── series-section.tsx
│   │   ├── characters-section.tsx
│   │   ├── elements-section.tsx
│   │   ├── timeline-section.tsx
│   │   ├── features-section.tsx
│   │   ├── about-section.tsx
│   │   ├── search-command.tsx
│   │   ├── theme-provider.tsx
│   │   ├── theme-switcher.tsx
│   │   ├── element-symbol.tsx
│   │   └── footer.tsx
│   └── ui/                 # shadcn/ui primitives
└── lib/
    ├── avatar-data.ts      # all fan-curated content
    └── utils.ts
```

---

## Credits

Built by **[Jeffrey Creates](https://www.youtube.com/@Jeffrey_Creates)**.

Avatar: The Last Airbender and The Legend of Korra © Nickelodeon / Viacom /
Paramount. This is a non-commercial fan project — no copyright infringement is
intended. Iroh would approve.
