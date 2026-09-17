# BetterMati.org — web app

This is the **Vite + React 19 + TypeScript + Tailwind v4 + shadcn/ui** application that powers
the entire BetterMati.org site. It is statically prerendered to HTML by
[`vite-react-ssg`](https://github.com/Daydreamer-riri/vite-react-ssg).

**The canonical project documentation lives in the [root README](../README.md)** — project
overview, architecture, production build (`build.sh`), deployment, and contribution guide.

## Commands

Run these from inside `web/`:

| Command             | Description                                       |
| ------------------- | ------------------------------------------------- |
| `npm install`       | Install dependencies                              |
| `npm run dev`       | Start the Vite dev server → http://localhost:5173 |
| `npm run build`     | Build + statically prerender (`vite-react-ssg`)   |
| `npm run preview`   | Preview this app's build output                   |
| `npm run typecheck` | Type-check with `tsc -b`                          |
| `npm run lint`      | Lint with oxlint                                  |
| `npm run test`      | Run unit tests (Vitest + Testing Library)         |

> For a full production build (app + root static passthrough merged into `dist/` for cPanel),
> run `npm run build` from the **repo root**, which invokes `build.sh`.

## Layout

- `src/pages/` — route components; `src/routes.tsx` — route table; `migrated-routes.json` —
  the set of routes prerendered at build time.
- `src/components/{layout,ui,primitives}/` — shared chrome, shadcn/ui primitives, and layout
  primitives.
- `src/lib/` — typed data modules + helpers; `src/locales/` — i18next resources (`en`/`fil`/`ceb`).
- `src/index.css` — Tailwind theme + design tokens; `vite.config.ts` — build/SSG config and
  the dev-only static-passthrough plugin for the root `assets/` and `data/` folders.
