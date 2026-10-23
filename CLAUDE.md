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
- `src/pages/personal.astro` → `/personal` (Italian)
- `src/pages/en/personal.astro` → `/en/personal` (English)

All pages are thin wrappers rendering a shared component (`src/components/HomePage.astro`, `src/components/PersonalPage.astro`), which reads the active locale from `Astro.currentLocale` and passes it down to the layout and components as a prop. `/it` 301-redirects to `/` via the `redirects` config.

In `Header.astro`, in-page anchors are home-relative (`${homeHref}#projects`) so they also work from secondary pages, and the language switcher derives the counterpart URL from `Astro.url.pathname` (stays on the current page when switching language).

All UI strings live in `src/i18n/translations.ts` as a typed `translations` object keyed by locale. Components receive a `locale: Locale` prop and index into that object.

### Server-side data

Fetches run in the frontmatter of `HomePage.astro` (server-side, re-executed on each ISR regeneration), in parallel via `Promise.all`:

- **Joke of the day** — `api.api-ninjas.com/v1/jokeoftheday`, requires `API_TOKEN` env var.
- **GitHub starred repos** — public API, optional `GITHUB_TOKEN` env var raises the rate limit; used to populate the Inspirations section.

Env vars are read with `import.meta.env.*` (no `PUBLIC_` prefix = server-only).

### Client-side interactivity (vanilla)

- **Theme** — (currently bypassed by `FORCED_THEME`, see Visual style) an `is:inline` script in the `<head>` of `BaseLayout.astro` reads `localStorage.theme` and sets `data-theme` (+ `.dark` class) on `<html>` before first paint (no FOUC). `ThemeToggle.astro` cycles light → dark → system on click; icons are shown/hidden via CSS rules on `html[data-theme='...']`.
- **Header** (`Header.astro` `<script>`) — live clock (`setInterval`), mobile menu toggle, sticky ticker activation via `IntersectionObserver`.
- **Show more interests** (`HomePage.astro` `<script>`) — all cards are rendered server-side; cards beyond the first 8 carry the `hidden` attribute and `data-interest`; the button reveals 8 more per click and removes itself at the end. Requires the `[hidden] { display: none !important }` reset in `global.css` (Tailwind's `block` would otherwise override it).

### Static data

Project entries are hardcoded in `src/data/projects.ts` as a typed `Project[]` array with bilingual `description` and `longDescription` fields.

### Personal page

`/personal` (`PersonalPage.astro`) hosts the photo portfolio and the future blog:

- **Photos** — grouped by category: `photoCategories` in `src/data/photos.ts` (`PhotoCategory[]`, empty by default), image files in `src/assets/photos/{categoryId}/`, resolved via a recursive `import.meta.glob`. Each category renders as its own subsection (anchor `#photos-{id}`); empty categories are skipped, and with no entries at all an empty-state card is shown. Clicking a photo opens a native `<dialog>` lightbox (vanilla script in the component).
- **Blog** — the section renders only when `PUBLIC_BLOG_ENABLED=true` is set (public env var, inlined at build time). Until then it is completely absent from the markup.

### Analytics

`<Analytics />` (`@vercel/analytics/astro`) and `<SpeedInsights />` (`@vercel/speed-insights/astro`) in `BaseLayout.astro`, rendered only when `!import.meta.env.DEV`.

### Environment variables

| Variable              | Required | Purpose                                             |
| --------------------- | -------- | --------------------------------------------------- |
| `API_TOKEN`           | Yes      | api-ninjas.com key for the joke                     |
| `GITHUB_TOKEN`        | No       | raises GitHub API rate limit for the stars          |
| `PUBLIC_BLOG_ENABLED` | No       | set to `true` to show the blog section on /personal |

## Visual style

The site uses a **cyberpunk / Night City** aesthetic. When adding or modifying UI, stay consistent with these rules:

### Design language

- Thin 1px neon borders (`--color-border`), never thick black borders. Panels and buttons have a **cut bottom-right corner** (`clip-path`); the diagonal edge is redrawn with a gradient because `clip-path` removes the border there.
- Glow instead of drop shadows: `text-shadow`/inset `box-shadow` via `--glow-accent`, `--glow-alt`, `--glow-inset-hover`. Outer box-shadows on clipped elements get cut off, so hover effects use inset glow + `translateY(-4px)` (`.hover-neon`).
- Palette: Night City yellow `#FCEE0A`, neon cyan `#00F0FF`, hot magenta `#FF2A6D`. Two themes: **Night** (dark, neon on near-black) and **Day** (light, black on Night City yellow, red `#E6003A` accent).
- HUD details: `// LABEL` pre-titles (`.hud-label`), neon gradient rules (`.neon-rule`), corner brackets (`.hud-corners`), CRT scanlines over the page (`body::after`), vertical katakana neon sign in the hero.
- Logo: inline SVG in `src/components/Logo.astro` ("E" monogram + blinking terminal cursor in a cut-corner frame), colored via theme variables. `src/assets/favicon.svg` is the same mark with fixed Night colors.
- All interactive text links (except those with `.no-underline`) get a sliding glowing underline in `--color-accent` via `::after`.

### Typography

- **Headings** → `Orbitron` (`--font-display`), weight 800–900, uppercase.
- **Body** → `Rajdhani` (sans-serif, weight 500).
- UI labels, tags, buttons, and nav items are always `font-mono` (`JetBrains Mono`), `uppercase`, wide tracking.

### CSS variables (defined in `src/styles/global.css`)

| Variable             | Day (light)  | Night (dark)            |
| -------------------- | ------------ | ----------------------- |
| `--color-bg`         | `#fcee0a`    | `#05040b`               |
| `--color-surface`    | `#fff69a`    | `#0d0b1a`               |
| `--color-fg`         | `#0a0a12`    | `#e6f7ff`               |
| `--color-accent`     | `#e6003a`    | `#fcee0a`               |
| `--color-accent-alt` | `#006b78`    | `#00f0ff`               |
| `--color-accent-hot` | `#e6003a`    | `#ff2a6d`               |
| `--color-muted`      | `#4a4520`    | `#8c90b8`               |
| `--color-border`     | `#0a0a12`    | `rgb(0 240 255 / 0.35)` |
| `--color-bar-bg/-fg` | black/yellow | yellow/black            |
| `--color-ink`        | `#05040b`    | (same)                  |

**The site is currently locked to Night**: `FORCED_THEME = 'dark'` in `src/theme.ts` renders `class="dark" data-theme="dark"` on `<html>` server-side (works without JS), makes the inline theme script skip `localStorage`, and hides `ThemeToggle` in `Header.astro`. The Day palette and all switching code are kept: set `FORCED_THEME = null` to restore the toggle.

When not forced, dark mode is applied by adding the `.dark` class to `<html>` (managed by the inline theme script + `ThemeToggle` script). An explicit `data-theme="light"` choice overrides the OS dark preference; with no JS, `prefers-color-scheme` is the fallback. Always use the CSS variables rather than hardcoded colors.

### Reusable CSS classes (defined in `src/styles/global.css`)

Base element styles live in `@layer base` and these classes in `@layer components`, so Tailwind utilities can always override them.

- `.btn-cyber` / `.btn-cyber-filled` — outlined neon / filled accent button with cut corner.
- `.cyber-panel` — surface card with neon border and cut corner (`--cut` to resize). `.cyber-border` — plain 1px neon border.
- `.hover-neon` — lift + inner glow + cyan border on hover.
- `.tag` / `.tag-filled` — small monospaced uppercase label.
- `.neon-text` / `.neon-text-alt` — accent / cyan text with glow.
- `.hud-label`, `.neon-rule`, `.hud-corners` — HUD decorations.
- `.glitch` — RGB-split glitch effect; requires `data-text` equal to the element's text.
- `.flicker` — neon sign flicker. `.cursor-blink` — blinking `_` cursor.
- `.animate-marquee` — continuous horizontal scroll (footer copyright bar).

Animations are disabled under `prefers-reduced-motion: reduce`.
