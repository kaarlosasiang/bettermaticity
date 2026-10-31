# Contributing to BetterMati.org

Thank you for your interest in contributing to BetterMati.org! This civic-tech project thrives on community participation. Whether you're a developer, designer, translator, data researcher or a resident of Mati, your contributions are welcome.

Please read the [Code of Conduct](CODE_OF_CONDUCT.md) before taking part.

## Getting Started

The whole site is one Vite + React + TypeScript app in [`web/`](web/), prerendered to static HTML. Content lives as JSON in [`data/`](data/).

### Prerequisites

- Node.js 20 (see `.nvmrc`)
- npm 10 or higher
- Git
- Python 3 (optional: for `serve.py` and the Playwright tests)

### Setup

```bash
git clone https://github.com/kaarlosasiang/bettermaticity.git
cd bettermaticity/web
npm install
npm run dev
```

Open http://localhost:5173 in your browser.

The Playwright and production-build tooling lives at the repo root; run `npm install` there too if you need it.

## How to Contribute

### Reporting Bugs

1. Check existing [issues](https://github.com/kaarlosasiang/bettermaticity/issues) to avoid duplicates
2. Create a new issue with:
   - Clear, descriptive title
   - The page URL and steps to reproduce
   - Expected vs actual behavior
   - Browser and device information
   - Screenshots if applicable

### Reporting Wrong or Outdated Information

Open an issue with the page, what is wrong, and a link to the official source that shows the correct information. A City office memo, ordinance, or government portal page is the kind of source we need.

### Suggesting Features

1. Open an issue with the `enhancement` label
2. Describe the feature and how it helps residents
3. Include mockups or examples if possible

### Submitting Code

1. **Fork** the repository and **create** a branch
   ```bash
   git checkout -b your-change-name
   ```
2. **Make** your changes (app code goes in `web/`, content in `data/`)
3. **Check** your work
   ```bash
   cd web
   npm run typecheck && npm run lint && npm test
   cd ..
   npm run format
   ```
   If you touched the header, footer or volunteer dialog, also run the Playwright specs from the repo root: `npm run test:chrome` (or `npm test` for every browser).
4. **Commit** with a plain, imperative subject that says what changed
   ```bash
   git commit -m "Add search to the barangays page"
   ```
5. **Push** to your fork and **open** a Pull Request against `main`

### Commit Messages

Write the subject as an instruction, starting with a verb: "Add …", "Fix …", "Update …", "Remove …". Keep it under about 70 characters and use the body to explain why, when that isn't obvious.

## Contribution Areas

| Area               | Description                                                         |
| ------------------ | ------------------------------------------------------------------- |
| Bug Fixes          | Fix reported issues                                                 |
| Features           | Implement new functionality                                         |
| Data               | Replace placeholders with verified City of Mati data, with sources  |
| Translations       | Translate the site into Cebuano, or review existing Cebuano strings |
| Design             | Improve UI/UX and accessibility                                     |
| Documentation      | Improve guides and comments                                         |
| Data Visualization | Improve charts and tables                                           |

## Project Rules

[`CLAUDE.md`](CLAUDE.md) is the detailed guide to the codebase. The rules that matter most:

### Pages and routes

- **Adding a page takes three edits:** the component in `web/src/pages/`, an entry in `web/src/routes.tsx`, and an entry in `web/migrated-routes.json`. Skip the third and the page works in dev but never ships.
- Give new routes a lazy import: `lazy: () => import('./pages/X').then((m) => ({ Component: m.default }))`.
- Add the page to the Site index in `web/src/lib/siteIndex.ts`, which feeds `/sitemap` and site-wide search. A test fails if a route can't be found from search.
- Every page renders `<Seo title description canonicalPath />`.

### Code

- TypeScript strict; avoid `any`. Functional components in PascalCase files; use the `@/` alias for `web/src` and `@data` for the root `data/`.
- Use `AppLink`, not a bare `<Link>` or `<a>`, for internal links.
- Reach for an existing primitive (`Container`, `Band`, `PageHeader`, `StatRow`, `RuledGrid`, `FilterPanel`, …) or a shadcn `ui/` component before writing new layout markup.
- Style with Tailwind utilities and the design tokens in `web/src/index.css`; avoid ad-hoc global CSS.
- Use lucide-react for icons (react-icons only for brand marks).
- Animate with the shared primitives in `web/src/components/motion.ts`, not a direct `framer-motion` import.
- Fonts are self-hosted. Never add a Google Fonts or CDN `<link>`: the site's Content Security Policy blocks it.
- Prettier is enforced: single quotes, semicolons, 2-space indent, 100 columns.
- Tests are Vitest + Testing Library, next to the code they cover.

### Content and data

- To change displayed content, edit the JSON in `data/`, not the components.
- Only use information from official government sources, and record the source.
- Records not yet confirmed stay clearly marked (`[Placeholder]`, `[TODO]` or `_status: "draft"`) until they are verified.
- Verified facts are tracked as BM-001. Don't "correct" them from general knowledge.
- Don't publish personal information about private individuals.

### Translations

- Strings live in `web/src/locales/en.json` and `ceb.json`, with flat kebab-case keys (a `.` in a key is literal).
- Every new UI string needs an English key. Cebuano is optional; missing strings fall back to English.
- The site supports English and Cebuano only.

### Versions and releases

- `version.json` is the master version. Never hand-edit version strings; use the scripts.
- `npm run release` bumps the version and drafts a `data/changelog.json` entry. Rewrite every drafted `TODO` line for residents (or delete it) before merging; tests fail until you do.

## Pull Request Process

1. Make sure the checks above pass
2. Update documentation if your change affects it
3. Describe what changed and why, with screenshots for visual changes
4. Link related issues
5. Wait for review and address feedback

## Review Criteria

Pull requests are reviewed for:

- Code quality and consistency with the existing code
- Functionality and bug-free operation
- Accessibility (WCAG 2.1) and mobile layout
- Data accuracy and sources (for content changes)
- Security considerations

## Community

- **Discord:** [Join our community](https://discord.com/invite/qeSu7RJkjQ)
- **Facebook:** [@bettermati.org](https://www.facebook.com/bettermati.org)
- **LinkedIn:** [Connect with us](https://www.linkedin.com/company/bettermati)
- **Email:** volunteer@bettermati.org

## Recognition

Contributors are credited through the repository's history. Significant contributions may be highlighted on the website.

## Questions?

Feel free to open an issue or reach out on Discord. We're happy to help!

---

Thank you for helping make government information accessible to the people of Mati.
