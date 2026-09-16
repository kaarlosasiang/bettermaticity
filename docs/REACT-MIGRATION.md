# BetterMati.org — React/Vite Migration Report

**Status:** ✅ Complete (all waves + end-state cutover)
**Branch:** `feat/react-migration` — _not yet merged to `main` or deployed_
**Version at completion:** `1.2.0`
**Report date:** 2026-09-16

---

## 1. Executive summary

BetterMati.org — the civic-tech portal for LGU Mati, Davao Oriental — has been fully
rebuilt from a **hybrid site** (legacy vanilla HTML/CSS/JS at the repo root + a thin
Next.js island in `react-app/`) into a **single Vite + React + TypeScript + Tailwind v4
+ shadcn/ui** application in the `web/` directory.

The migration was executed **incrementally and coexisting** — React and legacy pages
served side by side, folder by folder — until the last route flipped, at which point the
legacy static site and the Next.js island were **deleted entirely**. The React app is now
the whole site.

| Metric | Before | After |
|---|---|---|
| Implementations | 2 (legacy HTML + Next.js island) | 1 (Vite/React SSG) |
| Routes on React | 1 (`/services/health`) | **48** |
| Production `dist/` size | 9.9 MB | **6.0 MB** |
| Net diff vs `main` | — | 239 files, **+42,159 / −248,006 lines** |
| Legacy CSS/JS shipped | ~1.3 MB | **0** (all bundled under `/_app`) |

---

## 2. Why migrate

The site carried two parallel implementations of the same content, which meant:

- **Double maintenance** — every content or design change had to be made twice, in two
  unrelated codebases with two independent i18n systems.
- **No component reuse** — the legacy site was hand-written HTML with `window`-global JS
  modules and no bundler; the Next.js island shipped only one route.
- **Inconsistent tooling** — no type safety, no shared design system, ad-hoc build steps.

Goal: **one** modern, typed, component-based codebase with a shared design system,
faithful to the current LGU visual identity, deployable to the same cPanel static host.

---

## 3. The stack

| Concern | Choice |
|---|---|
| Language | TypeScript (strict, `verbatimModuleSyntax`) |
| Build / dev | **Vite `^8.2.2`** + `@vitejs/plugin-react` |
| SSG / prerender | **`vite-react-ssg`** — one flat `.html` per route, per-route `<Head>` |
| Routing | `react-router-dom` (v6) |
| Styling | **Tailwind CSS v4** (`@tailwindcss/vite`), `cn()` = clsx + tailwind-merge |
| UI components | **shadcn/ui** (Radix), owned in-repo |
| Icons | `lucide-react` (+ `react-icons/fa6` for brand icons) |
| Fonts | self-hosted **Inter** via `@fontsource-variable/inter` (no CDN) |
| i18n | `i18next` + `react-i18next` — `en` bundled, `fil`/`ceb` lazy-loaded |
| Search | `fuse.js` + shadcn `Command` combobox |
| Charts | `chart.js` + `react-chartjs-2` (rendered client-only via `ClientOnly`) |
| Data (reference) | build-time JSON import from `data/` (baked into prerendered HTML) |
| Data (news) | runtime `fetch('/data/news.json')` (preserves the FTPS live-update flow) |
| Node | 20 (`.nvmrc`) |
| Deploy | cPanel static hosting, `.htaccess` clean URLs, hand-written `sw.js` PWA |

---

## 4. Architecture

- **Rendering.** SSG produces one flat `.html` per route (`dirStyle: 'flat'`), with
  hashed JS/CSS bundles under `/_app/` (`assetsDir: '_app'`, `base: '/'`). Prerendered in
  English (canonical); `fil`/`ceb` switch client-side. **No SPA fallback** — every route
  is a real static file, matching the cPanel/`.htaccess` model.
- **`migrated-routes.json`** is the single source of truth for shipped routes. It drives
  both the SSG prerender allow-list and the build's dist assembly.
- **Design system.** Design tokens were extracted from the legacy `style.css` (brand
  `#0032a0`, Inter, spacing, radii, shadows) into Tailwind `@theme` + shadcn tokens, then
  reusable primitives were built (`Container`, `Section`, `SectionTitle`, `PageHeader`,
  `Grid`, `ServiceCard`, `StatCard`, …) so each page is composed, not hand-rolled.
- **Shared chrome.** `Layout.tsx` wraps every route with `Header`, `Footer`, `InfoBar`
  (weather/FX/clock), `HotlineBar`, `PWAManager`, and skip-link — rebuilt in
  Tailwind/shadcn.
- **`AppLink`** chooses a react-router `<Link>` for migrated routes vs a plain `<a>` (full
  navigation) for legacy/external — this is what made incremental coexistence possible.
- **i18n.** The 770 KB legacy `translations.js` was converted to
  `web/src/locales/{en,fil,ceb}.json` (flat kebab-case keys). `en` = **5,629** keys
  (bundled), `fil` = 5,629 (lazy), `ceb` = 165 (lazy, English fallback for the rest).
  Language choice persists in `localStorage['selectedLang']` so it carried across the
  legacy↔React boundary during coexistence.

---

## 5. Migration waves

The work was structured as a foundation phase, eight content waves, and a final cutover.

| Wave / Phase | Scope | Notes |
|---|---|---|
| **Phase 0 — Foundation** | Vite scaffold, Tailwind+shadcn, design tokens, shared chrome, i18n infra, SEO/analytics, build pipeline, testing infra | Everything shared by all routes |
| **Phase 1 — Pilot** | `/services/health` | Proved the whole pipeline; **retired the Next.js `react-app/` island** |
| **Wave 2** | privacy, terms, accessibility, faq, sitemap, 404/403/500, offline | Static + error pages |
| **Wave 3** | `/services` + 10 category pages, `/contact` | Site search (fuse.js + Command), mailto/tel contact |
| **Wave 3b** | 3 bespoke category pages (business, tax, education) | Richer per-category content |
| **Wave 4** | **All 22 `/service-details/*` pages** | See §6 — the largest wave |
| **Wave 5** | `/government`, `/government/officials`, `/legislative` + frameworks | Build-time typed-data pattern (officials, ordinances, resolutions) |
| **Wave 6** | `/budget`, `/statistics` | Chart.js via `react-chartjs-2`, data tables prerendered for SEO/a11y |
| **Wave 7** | `/news` | Runtime `useNews()` fetch of `/data/news.json` |
| **Wave 8** | `/` (home) | Flagship: hero, weather widget, OSM map, FB feed, volunteer modal (shadcn `Dialog`), JSON-LD |
| **Phase 9** | End-state cutover | See §7 — legacy site retired |

---

## 6. Wave 4 — the 22 service-detail pages

The service-detail pages were the bulk of the content (~24,000 lines of legacy HTML) and
the most varied: office pages (info-box grids), service pages (numbered process steps),
and complex pages (fee tables, process tables, tabbed flows, main+sidebar layouts).

**The 22 pages:** birth-certificate, marriage-certificate, death-certificate,
civil-registrar, municipal-civil-registrar, business-permits-licensing,
tricycle-franchising, property-declaration, human-resource-management, general-services,
municipal-general-services, municipal-accounting, municipal-agriculture,
municipal-assessor, municipal-budget, municipal-engineering, municipal-planning,
municipal-treasurer, mswdo, mswdo-services, seedo-public-market, seedo-slaughterhouse.

**Build convention (applied to every page):**
- Reproduce only the `<main>` content — header/footer/nav come from the shared `Layout`.
- Map every legacy `data-i18n="KEY"` → `t('KEY')`; all keys verified present in `en.json`.
- Literal values with **no** `data-i18n` (fees, processing times, step numbers, phone
  numbers) render as **plain text** — never `t('x') || 'fallback'` (i18next returns the
  key itself when missing, which would leak raw keys).
- Icons only from `lucide-react` (bootstrap `bi-*` mapped to the nearest verified lucide
  name); internal links via `AppLink`; tab switchers via `useState`.
- Reproduce the exact breadcrumb trail; parent routes get folder-route SEO canonicals.

**Execution.** Built partly directly and partly via parallel subagents (each given a
completed sibling page as the style reference). Subagent runs hit intermittent session
limits and transient API errors, which were absorbed by re-dispatch and by finishing the
remainder directly. Every page was verified: `tsc` clean, prerenders as flat SSG HTML,
no raw i18n-key leaks.

**Content note — near-duplicate pairs.** Three pairs cover the same office with
near-identical content but separate i18n keys: `mswdo`/`mswdo-services`,
`civil-registrar`/`municipal-civil-registrar`,
`general-services`/`municipal-general-services`. All six were migrated faithfully because
their legacy URLs must keep working; **consolidating them is a separate content decision.**

---

## 7. Phase 9 — end-state cutover

Once all 48 routes were live and QA'd, the legacy site was removed and the build
simplified to a single-app pipeline.

**Deletions (legacy only — 80 files):**
- `assets/css`, `assets/js`, `assets/animation` (React bundles everything under `/_app`)
- legacy root `index.html`
- all 13 legacy route directories (services, government, legislative, news, budget,
  statistics, contact, privacy, terms, faq, sitemap, accessibility, service-details)

**Kept (static passthrough):** `assets/images`, `data/` (news + reference JSON), `admin/`
(news-editor tool), `.htaccess`, `sw.js`, `manifest.webmanifest`, `robots.txt`,
`version.json`, and the self-contained error/offline pages.

**`build.sh` — rewritten** as a 5-stage single-app pipeline:
`env → version → clean → vite build → assemble dist → chmod`. Assembly:
1. Copy the SSG output (`/_app` + prerendered route HTML) as the site base.
2. **Folderize parent routes** — `vite-react-ssg` emits `government.html` *and*
   `government/officials.html`; an Apache directory named `government` would shadow
   `government.html`, so parent routes (those with children:
   `services`/`government`/`legislative`) are moved to `<route>/index.html`. Leaf routes
   stay flat. Parent-ness is computed from `migrated-routes.json`.
3. Layer static passthrough (assets/images, data, admin, error pages, config).
4. Generate `sitemap.xml` from `migrated-routes.json` via `scripts/generate-sitemap.js`.

**`sw.js`** — cache version `v5 → v6`; removed the legacy-asset precache list (it was
breaking install because `cache.addAll` rejects if any URL 404s). Hashed `/_app` bundles
are now cached at runtime (stale-while-revalidate); they're immutable, so this is robust.
The offline fallback (`/offline.html`) and runtime strategies are unchanged.

**`.htaccess` CSP** — dropped `unpkg.com` and `cdn.jsdelivr.net` (no CDN runtime deps
remain; Inter is self-hosted, deps are bundled). Retained `'unsafe-inline'` because
`vite-react-ssg` inlines hydration/module-preload scripts, plus GA, Facebook plugin, OSM
tiles, and Open-Meteo/exchangerate hosts.

**Error/offline pages** — `403/404/500.html` were rewritten as **self-contained** static
pages (inline CSS, brand-styled) so they no longer depend on the deleted legacy CSS;
`offline.html` was already self-contained. They remain wired to `.htaccess`
`ErrorDocument` and `sw.js` `OFFLINE_URL`.

---

## 8. Verification

- **Type safety:** `tsc -b` clean across all 41 page components.
- **Automated route sweep (all 48 routes, headless):** zero console errors, zero page
  errors, zero white screens, zero raw i18n-key leaks in visible text.
- **Visual QA:** every page *pattern* reviewed (complex main+sidebar, gradient office
  pages, tabbed pages, table-heavy pages — both directly- and subagent-built) — faithful,
  consistent rendering; logo correct and left-aligned on every page.
- **Production build:** `bash build.sh --no-bump` → 48 routes, `dist/` 6.0 MB, parents
  folderized, sitemap generated.
- **Clean URLs (via `serve.py`):** parents, leaves, and service-details all resolve `200`;
  unknown paths `404`. Production hydrates from `/_app` with no console errors.

---

## 9. Build & deploy

```bash
# Development (Vite dev server)
cd web && npm run dev

# Production build (bumps patch version, outputs dist/)
bash build.sh                 # or: --no-bump / minor / major

# Preview the built dist with clean-URL emulation
python3 serve.py -d dist -p 8888

# Deploy: upload dist/ contents → cPanel public_html/
```

`migrated-routes.json` is the single source of truth — adding a route means registering
it in `web/src/routes.tsx` and listing it there; the build and sitemap follow
automatically.

---

## 10. Known follow-ups (not blockers)

1. **Footer logo** — `assets/images/logo/better-mati-logo-white.svg` still contains
   "Better Solano" vector artwork (leftover fork placeholder). The header already uses the
   correct `better-mati-logo.png`. Needs a proper white Mati logo asset.
2. **Officials portraits** — `assets/images/officials/*.jpg` were never added; the
   officials data references them, so those images 404 on `/government/officials`. Needs
   real photos or an initials-avatar fallback in `GovernmentOfficials.tsx`.
3. **Near-duplicate office pages** — the three pairs in §6 could be consolidated (content
   decision).
4. **Merge & deploy** — the migration lives on `feat/react-migration` and has not been
   merged to `main` or deployed.
5. **Placeholder LGU data** — officials, barangays, resolutions, ordinances, DPWH
   projects, statistics, budget, and city history remain clearly-marked placeholders
   awaiting verified City of Mati data (pre-existing; see `README.md`).

---

## 11. Key commits (`feat/react-migration`)

| Commit | Summary |
|---|---|
| `8df27d2` | Phase 9 end-state cutover — retire legacy static site |
| `91bcdf1` | Header: PNG logo + pin to far left |
| `cd7a910` | Wave 4: all 22 service-detail pages |
| _(earlier)_ | Phases 0–3, 3b, 5–8 (foundation, pilot, static, services, government, legislative, budget, statistics, news, home) |
