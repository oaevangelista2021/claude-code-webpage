# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

- `npm run dev` — start the Next.js dev server (http://localhost:3000)
- `npm run build` — production build; also the fastest way to catch TypeScript/build errors
- `npx tsc --noEmit` — type-check only, no build
- `npx playwright test` — run the full e2e suite (auto-starts `next dev` via `webServer` in `playwright.config.ts` if not already running)
- `npx playwright test -g "<test name>"` — run a single test by name
- `npx playwright test e2e/landing.spec.ts` — run a single spec file
- `npm run lint` — Next.js/ESLint

Playwright's browsers must be installed once per machine: `npx playwright install chromium`.

## Architecture

This is a **single-page Next.js (App Router) marketing site** for Buildology, a construction company with an "AI agent" digital workforce. There is only one route (`app/page.tsx`); there is no routing, API, or data-fetching layer.

**TDD is the source of truth.** `e2e/landing.spec.ts` encodes exact required content/behavior (page title, three specific image paths, the literal phrase "Vertical and horizontal projects", the five AI agent names, `mailto:` CTA hrefs, and video scroll-reveal behavior). When changing `app/page.tsx`, check this spec first — several strings and asset paths must match it byte-for-byte, not just approximately.

**Asset filenames are load-bearing.** Files in `public/` are referenced by their exact literal names, including spaces and case (`/oe photo.png`, `/Oscar_1.jpg`, `/Oscar_Director.png`, `/video (construction-timelapse).mp4`). These are matched with plain `<img>`/`<video>` tags (not `next/image`) specifically so the rendered `src` attribute matches the raw filename exactly — `next/image` would rewrite it through `/_next/image?url=...` and break the Playwright asset-rendering assertions.

**Video section is a client component.** `components/VideoReveal.tsx` is the only client component (`"use client"`); it wraps the timelapse `<video>` in an `IntersectionObserver` that reveals it (opacity/translate transition) once scrolled into view. Everything else in `app/page.tsx` is a server component.

**Design system** lives in two places: color/font tokens in `tailwind.config.ts` (`ink`, `steel`, `concrete`, `signal`, `circuit` colors; `display`/`body`/`mono` font families) and shared visual utilities (`.blueprint-grid`, `.blueprint-grid-light`, `.crosshair`) in `app/globals.css`. Fonts (Oswald, IBM Plex Sans, IBM Plex Mono) are loaded via `next/font/google` in `app/layout.tsx` and exposed as CSS variables consumed by `tailwind.config.ts`.

**Video asset caveat:** the source timelapse video was originally rendered by the sibling `construction-timelapse-video/` Remotion project (unrelated tooling, not part of the Next.js app — don't wire it into the build). That original render embedded a non-standard ICC color profile in the MP4 container that silently breaks `<video>` decoding in Chrome (`readyState` stuck at 0, never fires `loadedmetadata`, no visible error). If the timelapse video ever needs to be re-rendered, re-encode the output before dropping it in `public/`, e.g.:
```
ffmpeg -i input.mp4 -vf "sidedata=mode=delete:type=ICC_PROFILE,format=yuv420p" \
  -color_range tv -colorspace bt709 -color_primaries bt709 -color_trc bt709 \
  -c:v libx264 -profile:v high -level 4.0 -crf 20 -preset slow -movflags +faststart -an \
  "public/video (construction-timelapse).mp4"
```
