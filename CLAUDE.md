# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this is

BetterMati.org — a civic-tech portal for LGU Mati, Davao Oriental, Philippines. The repo holds **two coexisting implementations of the same site**:

1. **Static HTML site (root directory)** — the stable, production version. Vanilla HTML5/CSS3/ES6+, no framework, served directly. This is where almost all content and features live.
2. **React app (`react-app/`)** — Next.js 15 App Router, static export. In-progress migration. Currently only the `/services/health` route is actually shipped to production; everything else in the React app is scaffolding.

Both are present on `main`. When a change is requested, assume it targets the **static site at root** unless the React app is explicitly named.

## Commands

Static site (root):
- `npm run dev` / `npm run serve` — serve at `http://localhost:8000` (Python http.server; no build needed for dev)
- `npm run build` — full production build via `build.sh` → outputs `dist/` (bumps patch version first)
- `npm run build:minor` / `build:major` — bump that level, then build without a second bump
- `npm run format` / `format:check` — Prettier over the whole repo
- `npm run package` — build + zip a cPanel-ready release archive
- `npm run version:patch|minor|major` — bump version only (see version system below)

Tests (Playwright, cross-browser: chrome/edge/firefox/safari + mobile):
- `npm test` — run all specs (auto-starts a server on `:8321`)
- `npm run test:chrome` — single project
- Run one file/test: `npx playwright test tests/volunteer-modal.behavior.spec.js` or add `-g "test name"`
- `npm run test:report` — open last HTML report
- Test coverage is currently limited to the volunteer modal (`tests/volunteer-modal.*.spec.js`).

React app (`cd react-app`):
- `npm run dev` — Next dev server
- `npm run build` — `next build` (static export to `react-app/out/`)

Lighthouse: `npm run lighthouse` (`.lighthouserc.json`).

## Version system — single source of truth

`version.json` (root) is the master version. `scripts/bump-version.js` propagates it to: `package.json`, **every HTML file** (the `Ver. X.X.X` footer pattern), and `react-app/public/version.json`. `build.sh` calls this automatically. Never hand-edit version strings in individual files — always bump through the script. At runtime, `assets/js/version.js` fetches `/version.json` and fills `.footer-version` / `[data-version]` elements.

## i18n — two separate translation systems (important)

The static site and React app have **completely independent** translation data. Keeping a string translated in one does *not* touch the other.

- **Static site:** `assets/js/translations.js` holds a `translations` object for `en` / `fil` (Filipino, full) / `ceb` (Cebuano). `TranslationEngine` (exposed as `window.TranslationEngine` and `window.t(key, params)`) applies strings to `[data-i18n]` elements, persists the choice, and notifies observers on language switch. `getTranslation` **falls back to English** for any key missing in the current language — the `ceb` block is a machine-assisted starter set covering high-visibility UI, so most keys currently fall back to English and are pending a full Cebuano translation + native review. Adding UI text means adding a `data-i18n` key in `en` (and ideally `fil`/`ceb`). Helper scripts in `scripts/` (`i18n-upgrade.py`, `add-*-keys.py`, `translate-pass*.py`) manage bulk key operations.
- **React app:** translations are inlined in `react-app/src/contexts/LanguageContext.tsx` — a much smaller subset covering only the migrated routes. Consumed via `useLanguage()` → `t()`.

## Static site architecture

Multi-page site: each top-level directory (`services/`, `government/`, `legislative/`, `budget/`, `statistics/`, `service-details/`, `contact/`, etc.) is a page/section with its own `index.html`. Pages are wired up by including vanilla JS modules with `<script defer>`.

- **Data-driven content:** page content comes from JSON in `data/` (`services.json`, `officials.json`, `resolutions.json`, `ordinances.json`, `dpwh-projects.json`, `competitive-index.json`, etc.). Matching modules in `assets/js/` fetch and render them (`officials.js`, `resolutions.js`, `ordinances.js`, `dpwh-projects.js`, `statistics*.js`, `news.js`). To change displayed data, edit the JSON — not the HTML.
- **Shared JS (`assets/js/`):** `main.js` (nav, PWA install/update banners, service worker registration, global behavior), `search.js` (site-wide search/autocomplete), `info-bar.js` (weather/currency/time via Open-Meteo + ExchangeRate APIs), `weather-map.js` (Leaflet), `volunteer-popup.js`. No bundler — modules communicate via `window` globals and DOM.
- **Styling:** `assets/css/style.css` is the main sheet (~188 KB); page-specific sheets (`statistics.css`, `legislative.css`, `transparency*.css`, `footer.css`, `responsive.css`, `accessibility.css`) layer on top. CSS custom properties, Flexbox/Grid, mobile-first.
- **PWA:** `sw.js` (versioned static + runtime caching, `skipWaiting` seamless updates), `manifest.webmanifest`, `offline.html` fallback. SW registration and the update-banner flow live in `main.js`.

## React app architecture (`react-app/`)

Next.js 15 App Router, `output: 'export'` (fully static, no server). `src/app/` routes, `src/components/layout/` (Header/Footer/InfoBar/HotlineBar), `PWAManager.tsx`, `SearchAutocomplete.tsx`. It reuses the **same** CSS and assets as the static site via `react-app/public/assets/`. Only `services/health` is production-merged (see build).

## Build & deploy (`build.sh`)

Six stages: (1) bump version, (2) clean `dist/`, (3) rsync the legacy static site into `dist/` (excluding all dev/tooling files — see the exclude list in `build.sh`), (4) `next build` the React app and merge only `react-app/out/_next/` → `dist/_next/` and `react-app/out/services/health.html` → `dist/services/health.html` (React routes are cherry-picked so they don't clobber legacy pages), (5) minify HTML (html-minifier-terser), CSS (clean-css), and JS (Babel transpile → Terser), (6) chmod `755` dirs / `644` files for cPanel.

- **Deploy target:** upload `dist/` contents to cPanel `public_html/`. Preview with `npm run serve:dist` (`:8080`).
- **Clean URLs:** `.htaccess` mod_rewrite strips `.html` (301 to clean URL, internal rewrite back to the file). Links should use extensionless paths.
- **Build-time config:** optional git-ignored `.env` (see `.env.example`); `SITE_URL` is exported into the React build.

## Conventions

- Prettier is enforced (`.prettierrc`): single quotes, semicolons, 2-space, 100-col, ES5 trailing commas. Run `npm run format` before committing.
- Legacy JS uses `var` / ES5-style function expressions and defensive `try/catch` around browser storage (Safari private mode throws) — match the surrounding style when editing a file.
- Because there is no bundler, cache-busting on the static site is done with query strings on script `src` (e.g. `weather-map.js?v=1.6.4`) — bump these when changing a cached module.
- Any new/changed UI string on the static site should be added to `en` (required) in `translations.js`, plus `fil` and `ceb` when available; missing `ceb`/`fil` keys fall back to English automatically.
- **This is a fork of a template originally built for LGU Solano.** It was rebranded to the City of Mati, Davao Oriental. LGU-specific records (officials, barangays, resolutions, ordinances, DPWH projects, statistics, budget, and the city history) are currently **clearly-marked placeholders** (`[Placeholder]` / `[TODO]` / `_status: "draft"`) awaiting verified City of Mati data — see the "Placeholders to fill" checklist in `README.md`.
