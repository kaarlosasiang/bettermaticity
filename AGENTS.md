# Repository Guidelines

## Project Structure & Module Organization

BetterMati.org is a React/TypeScript civic information portal, prerendered with Vite and `vite-react-ssg`.

- `web/src/`: pages, reusable components, hooks, data utilities, and styles. Translations live in `locales/` (`en`, `fil`, `ceb`).
- `web/src/routes.tsx` and `web/migrated-routes.json`: routing and the production prerender list; keep them aligned when adding pages.
- `data/`: shared reference data; `assets/` and `web/public/`: static assets.
- `tests/`: Playwright browser tests; `tests/integration/`: production-output tests. React unit tests sit beside source files.
- `scripts/`, `build.sh`, and `serve.py`: maintenance, packaging, production assembly, and local serving. Treat `dist/` and `web/dist/` as generated output.

## Build, Test, and Development Commands

Use Node.js 20 (`.nvmrc`) and Python 3. Run commands from the repository root:

- `npm ci && npm --prefix web ci`: install both dependency sets.
- `npm --prefix web run dev`: start the Vite development server.
- `npm --prefix web run typecheck` and `npm --prefix web run lint`: check TypeScript and run Oxlint.
- `npm --prefix web test`: run Vitest unit tests.
- `bash build.sh --no-bump`: assemble production output without changing the version. `npm run build` bumps the patch version.
- `python3 serve.py -d dist -p 8888`: preview production with clean-URL handling.
- `npm run test:integration`: build and run production Playwright tests.
- `npm run format:check`: check Prettier formatting.

## Coding Style & Naming Conventions

Follow Prettier: two-space indentation, semicolons, single quotes, 100-character lines, and LF endings. Use PascalCase for React components, camelCase for functions, and `useX` for hooks. Prefer existing `@/` and `@data/` import aliases. Preserve semantic HTML, keyboard accessibility, responsive layouts, and translation coverage.

## Testing Guidelines

Use Vitest with Testing Library and jsdom for component behavior; name tests `*.test.ts` or `*.test.tsx`. Browser tests use `*.spec.js`. Cover changed behavior and accessibility; no numeric coverage threshold is configured. Root `npm test` runs the older static-source harness, so verify its assumptions before using it for React changes.

## Commit & Pull Request Guidelines

History mixes descriptive imperatives, `feat:`/`fix:` prefixes, and optional emoji. Prefer the documented `Type: Brief description` convention, such as `Fix: correct hotline number`. PRs should describe changes, link related issues, report validation, and include screenshots for UI changes. Update relevant documentation and attribute civic data to verified official sources.
