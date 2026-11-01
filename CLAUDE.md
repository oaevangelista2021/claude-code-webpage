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

- `npx playwright-cli open http://localhost:3000` — drive the running site interactively with [playwright-cli](https://github.com/microsoft/playwright-cli) (a dev dependency here). This is separate from the `@playwright/test` e2e suite. Run `npx playwright-cli --help` to see the commands, and `npx playwright-cli close` when you're finished. Its agent skill is installed at `.claude/skills/playwright-cli/`; to reinstall it, run `npx playwright-cli install --skills`. Snapshots are written to `.playwright-cli/`, which is gitignored. `package.json` pins `playwright` to the same version as `@playwright/test` on purpose. `@playwright/cli` brings its own newer `playwright`, and without the pin npm puts that copy at the top level of `node_modules`. The suite then fails with "Playwright Test did not expect test.describe() to be called here" or "No tests found". When you upgrade `@playwright/test`, update `playwright` to the same version.

## Architecture

This is a **single-page Next.js (App Router) marketing site** for Buildology, a construction company with an "AI agent" digital workforce. There is only one page (`app/page.tsx`). There is no API or data-fetching layer. The only other routes are the generated favicon (`app/icon.tsx`) and the Apple touch icon (`app/apple-icon.tsx`). Both render through `next/og`'s `ImageResponse` (Satori) and share glyphs from `components/brand-mark.tsx`. Satori supports only a flexbox subset of CSS, so those files use inline-styled flex `<div>`s, not Tailwind.

**TDD is the source of truth.** `e2e/landing.spec.ts` encodes exact required content/behavior (page title, three specific image paths, the literal phrase "Vertical and horizontal projects", the five AI agent names, `mailto:` CTA hrefs, and video scroll-reveal behavior). When changing `app/page.tsx`, check this spec first — several strings and asset paths must match it byte-for-byte, not just approximately.

**Asset filenames are load-bearing.** Files in `public/` are referenced by their exact literal names, including spaces and case (`/oe photo.png`, `/Oscar_1.jpg`, `/Oscar_Director.png`, `/video (construction-timelapse).mp4`). These are matched with plain `<img>`/`<video>` tags (not `next/image`) specifically so the rendered `src` attribute matches the raw filename exactly — `next/image` would rewrite it through `/_next/image?url=...` and break the Playwright asset-rendering assertions.

**Client components.** Only two components use `"use client"`, and everything else in `app/page.tsx` is a server component:
- `components/VideoReveal.tsx` wraps the timelapse `<video>` in an `IntersectionObserver`. The video stays hidden until it scrolls into view, then fades and slides in.
- `components/ui/glass-fold.tsx` is the GlassFold WebGL shader from GradFlow. `app/page.tsx` mounts it in a `fixed inset-0 -z-10` wrapper as the full-page animated backdrop. Sections have no background of their own, so the same blue shows behind every part of the page. Only the header, the hero band, the agent cards and the footer get a see-through tint, using the `night` token (`#06081e`, the shader's background color). If you put an opaque `bg-*` on a section, it will cover the shader there and the page will stop looking uniform. Its colors, speed, scale and grain are props, and it holds a single frame when the user has reduced motion turned on.

**Design system** lives in two places: color/font tokens in `tailwind.config.ts` (`ink`, `steel`, `concrete`, `signal`, `circuit`, `night` colors; `display`/`body`/`mono` font families) and shared visual utilities (`.blueprint-grid`, `.blueprint-grid-light`, `.crosshair`) in `app/globals.css`. Fonts (Oswald, IBM Plex Sans, IBM Plex Mono) are loaded via `next/font/google` in `app/layout.tsx`. The variables are chained:
1. `next/font` defines `--font-oswald`, `--font-plex-sans` and `--font-plex-mono` on whichever element gets its `.variable` classes.
2. `:root` in `globals.css` aliases them to `--font-display`, `--font-body` and `--font-mono`.
3. `tailwind.config.ts` reads those aliases.

Because of step 2, the `.variable` classes must sit on `<html>`. If they sit on `<body>`, the `:root` aliases can't see the variables and resolve to nothing. Every `font-*` class then quietly falls back to the system sans-serif.

**Video asset caveat:** the source timelapse video was originally rendered by the sibling `construction-timelapse-video/` Remotion project (unrelated tooling, not part of the Next.js app — don't wire it into the build). That original render embedded a non-standard ICC color profile in the MP4 container that silently breaks `<video>` decoding in Chrome (`readyState` stuck at 0, never fires `loadedmetadata`, no visible error). If the timelapse video ever needs to be re-rendered, re-encode the output before dropping it in `public/`, e.g.:
```
ffmpeg -i input.mp4 -vf "sidedata=mode=delete:type=ICC_PROFILE,format=yuv420p" \
  -color_range tv -colorspace bt709 -color_primaries bt709 -color_trc bt709 \
  -c:v libx264 -profile:v high -level 4.0 -crf 20 -preset slow -movflags +faststart -an \
  "public/video (construction-timelapse).mp4"
```

## Claude Code hooks

Local copies of the official Claude Code hooks documentation live at the repo root. They are reference material only, not part of the Next.js app. **Before designing, writing, or debugging any hook, read the relevant sections of these files instead of relying on memory.** Event names, input fields, and output schemas change between versions. Each file is large, so `grep -n '^##' <file>` for its outline and read only the sections you need.

- `hooks.docs.start.md` — **guide / quickstart** (~1k lines). Setting up a first hook, common recipes (notifications, auto-format after edits, blocking edits to protected files, re-injecting context after compaction, auditing config changes, auto-approving permission prompts), how matchers and the `if` field filter hooks, where to configure them, prompt/agent/HTTP hooks, and troubleshooting (hook not firing, JSON output ignored, Stop hook block cap, debug techniques).
- `hooks.docs.md` — **full reference** (~3.9k lines). Hook lifecycle and resolution, configuration schema (locations, matcher patterns incl. MCP tools, handler fields for command/HTTP/MCP/prompt/agent hooks), input/output contract (common input fields, exit codes 0/2/other and per-event exit-2 behavior, JSON output, decision control), a per-event section for every hook event (e.g. `SessionStart`, `UserPromptSubmit`, `PreToolUse`, `PermissionRequest`, `PostToolUse`, `Stop`, `SubagentStop`, `PreCompact`, `FileChanged`, `SessionEnd`, …) with its input schema and decision-control options, async/background hooks, security considerations, and debugging.

Working conventions for hooks in this project:
- Project-shared hooks go in `.claude/settings.json` (committed). Personal or machine-specific hooks go in `.claude/settings.local.json`, which currently exists and holds only `skillOverrides`. Merge into existing keys; never overwrite them.
- Put non-trivial hook logic in scripts under `.claude/hooks/` and reference them via `"$CLAUDE_PROJECT_DIR"/.claude/hooks/<script>`. Quote paths, since this repo's directory name contains spaces.
- Look up the exact event name, matcher syntax, and JSON output shape in `hooks.docs.md` before writing the config. Pipe a sample JSON payload into the hook script to test it before relying on it.
- Ideas that fit this repo: run `npx tsc --noEmit` or `npm run lint` after edits to `app/`/`components/`, and block edits to the load-bearing `public/` assets or `e2e/landing.spec.ts`.
