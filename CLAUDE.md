# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev          # start dev server
npm run build        # production build (outputs .vercel/output/ for Vercel)
npm run preview      # NOT supported by the Vercel adapter — use `vercel dev` instead
npm run check        # astro check (TypeScript + .astro diagnostics)
npm run lint         # prettier + eslint check
npm run format       # auto-format with prettier
```

## Architecture

**Stack:** Astro (SSR, `output: 'server'`) + TypeScript + Tailwind CSS v4, deployed on Vercel via `@astrojs/vercel` with ISR (6-hour cache, `isr.expiration` in `astro.config.mjs`). No client-side framework: the page ships zero JS by default; the few interactions are vanilla TypeScript `<script>` blocks bundled by Astro.

### Routing & i18n

Native Astro i18n (`i18n` key in `astro.config.mjs`): `defaultLocale: 'it'`, locales `['it', 'en']`, `prefixDefaultLocale: false`. This requires one physical page per locale:

- `src/pages/index.astro` → `/` (Italian)
- `src/pages/en/index.astro` → `/en` (English)

Both are thin wrappers rendering the shared `src/components/HomePage.astro`, which reads the active locale from `Astro.currentLocale` and passes it down to the layout and components as a prop. `/it` 301-redirects to `/` via the `redirects` config.

All UI strings live in `src/i18n/translations.ts` as a typed `translations` object keyed by locale. Components receive a `locale: Locale` prop and index into that object.

### Server-side data

Fetches run in the frontmatter of `HomePage.astro` (server-side, re-executed on each ISR regeneration), in parallel via `Promise.all`:

- **Joke of the day** — `api.api-ninjas.com/v1/jokeoftheday`, requires `API_TOKEN` env var.
- **GitHub starred repos** — public API, optional `GITHUB_TOKEN` env var raises the rate limit; used to populate the Inspirations section.

Env vars are read with `import.meta.env.*` (no `PUBLIC_` prefix = server-only).

### Client-side interactivity (vanilla)

- **Theme** — an `is:inline` script in the `<head>` of `BaseLayout.astro` reads `localStorage.theme` and sets `data-theme` (+ `.dark` class) on `<html>` before first paint (no FOUC). `ThemeToggle.astro` cycles light → dark → system on click; icons are shown/hidden via CSS rules on `html[data-theme='...']`.
- **Header** (`Header.astro` `<script>`) — live clock (`setInterval`), mobile menu toggle, sticky ticker activation via `IntersectionObserver`.
- **Show more interests** (`HomePage.astro` `<script>`) — all cards are rendered server-side; cards beyond the first 8 carry the `hidden` attribute and `data-interest`; the button reveals 8 more per click and removes itself at the end. Requires the `[hidden] { display: none !important }` reset in `global.css` (Tailwind's `block` would otherwise override it).

### Static data

Project entries are hardcoded in `src/data/projects.ts` as a typed `Project[]` array with bilingual `description` and `longDescription` fields.

### Analytics

`<Analytics />` (`@vercel/analytics/astro`) and `<SpeedInsights />` (`@vercel/speed-insights/astro`) in `BaseLayout.astro`, rendered only when `!import.meta.env.DEV`.

### Environment variables

| Variable       | Required | Purpose                                    |
| -------------- | -------- | ------------------------------------------ |
| `API_TOKEN`    | Yes      | api-ninjas.com key for the joke            |
| `GITHUB_TOKEN` | No       | raises GitHub API rate limit for the stars |

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

### CSS variables (defined in `src/styles/global.css`)

| Variable             | Light     | Dark      |
| -------------------- | --------- | --------- |
| `--color-bg`         | `#ffffff` | `#0a0a0a` |
| `--color-fg`         | `#000000` | `#ffffff` |
| `--color-accent`     | `#FF5500` | (same)    |
| `--color-accent-alt` | `#00ff88` | (same)    |
| `--color-muted`      | `#666666` | `#999999` |

Dark mode is applied by adding the `.dark` class to `<html>` (managed by the inline theme script + `ThemeToggle` script). An explicit `data-theme="light"` choice overrides the OS dark preference; with no JS, `prefers-color-scheme` is the fallback. Always use the CSS variables rather than hardcoded colors.

### Reusable CSS classes (defined in `src/styles/global.css`)

- `.btn-brutal` / `.btn-brutal-filled` — primary button style with shadow and hover lift.
- `.tag` / `.tag-filled` — small monospaced uppercase label.
- `.border-brutal` / `.border-brutal-thin` — thick/thin border.
- `.shadow-brutal` / `.shadow-brutal-sm` — offset shadow.
- `.hover-brutal` — adds the translate + shadow-grow hover animation.
- `.glitch` — glitch keyframe animation on hover.
- `.cursor-blink` — appends a blinking `_` cursor via `::after`.
- `.animate-marquee` — continuous horizontal scroll (used in the footer copyright bar).
