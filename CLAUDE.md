# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev          # start dev server
npm run build        # production build
npm run preview      # preview production build
npm run check        # svelte-check TypeScript type checking
npm run lint         # prettier + eslint check
npm run format       # auto-format with prettier
```

## Architecture

**Stack:** SvelteKit (Svelte 5) + TypeScript + Tailwind CSS v4, deployed on Vercel.

### Routing & i18n

The single page lives at `src/routes/[[lang=lang]]/` — an optional route segment validated by `src/params/lang.ts` (accepts `en` or `it`). Both `/` and `/it` and `/en` resolve to the same page. The active locale is set in `+layout.svelte` by reading `page.params.lang` and writing to the `locale` store.

All UI strings live in `src/lib/translations.ts` as a typed `translations` object keyed by locale. Components read the locale from `$lib/stores/lang.ts` and index into that object.

### Server-side data (`+page.server.ts`)

Runs with ISR (6-hour cache). Fetches in parallel:

- **Joke of the day** — `api.api-ninjas.com/v1/jokeoftheday`, requires `API_TOKEN` env var.
- **GitHub starred repos** — public API, no auth needed; used to populate the Inspirations section.

### Stores

- `src/lib/stores/lang.ts` — `locale` writable store (`'it' | 'en'`), default `'it'`.
- `src/lib/stores/theme.ts` — `theme` writable store (`'light' | 'dark' | 'system'`), persisted in `localStorage`. Subscribe side-effect applies/removes `dark` class on `<html>`.

### Static data

Project entries are hardcoded in `src/lib/data/projects.ts` as a typed `Project[]` array with bilingual `description` and `longDescription` fields.

### Environment variables

| Variable    | Required | Purpose                         |
| ----------- | -------- | ------------------------------- |
| `API_TOKEN` | Yes      | api-ninjas.com key for the joke |

## Visual style

The site uses a **brutalist** aesthetic. When adding or modifying UI, stay consistent with these rules:

### Design language

- Heavy black borders (`border-brutal` = 4px, `border-brutal-thin` = 2px), all solid and strictly geometric.
- Offset box-shadows that mimic a physical lift: `--shadow-brutal` (6px 6px), `--shadow-brutal-sm` (4px 4px). On hover, elements translate `(-4px, -4px)` and the shadow grows (`--shadow-brutal-hover` 8px 8px) via the `.hover-brutal` class.
- Accent color `#FF5500` (orange) — used for highlights, link underline animations, hover states, and the `.DEV` part of the logo. Never swap it for another color; change the CSS variable `--color-accent` if a redesign is needed.
- All interactive text links (except those with `.no-underline`) get a sliding underline in `--color-accent` via a CSS `::after` pseudo-element.

### Typography

- **Headings** → `JetBrains Mono` (monospace), weight 800, tight tracking (`-0.02em`).
- **Body** → `Space Grotesk` (sans-serif).
- UI labels, tags, buttons, and nav items are always `font-mono`, `uppercase`, `tracking-wider`.

### CSS variables (defined in `src/routes/layout.css`)

| Variable             | Light     | Dark      |
| -------------------- | --------- | --------- |
| `--color-bg`         | `#ffffff` | `#0a0a0a` |
| `--color-fg`         | `#000000` | `#ffffff` |
| `--color-accent`     | `#FF5500` | (same)    |
| `--color-accent-alt` | `#00ff88` | (same)    |
| `--color-muted`      | `#666666` | `#999999` |

Dark mode is applied by adding the `.dark` class to `<html>` (managed by the theme store). Always use the CSS variables rather than hardcoded colors.

### Reusable CSS classes (defined in `layout.css`)

- `.btn-brutal` / `.btn-brutal-filled` — primary button style with shadow and hover lift.
- `.tag` / `.tag-filled` — small monospaced uppercase label.
- `.border-brutal` / `.border-brutal-thin` — thick/thin border.
- `.shadow-brutal` / `.shadow-brutal-sm` — offset shadow.
- `.hover-brutal` — adds the translate + shadow-grow hover animation.
- `.glitch` — glitch keyframe animation on hover.
- `.cursor-blink` — appends a blinking `_` cursor via `::after`.
- `.animate-marquee` — continuous horizontal scroll (used in the footer copyright bar).
