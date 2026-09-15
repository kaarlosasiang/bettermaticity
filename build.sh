#!/bin/bash
# BetterMati — Production Build Script
# Usage:
#   bash build.sh            — bump patch, build everything
#   bash build.sh --no-bump  — keep current version, build everything
#   bash build.sh minor      — bump minor, build everything
#   bash build.sh major      — bump major, build everything
#   bash build.sh --no-react — skip the Vite (web/) build
#
# Pipeline (incremental coexistence: legacy static site + Vite/React islands):
#   0 env → 1 version → 2 clean → 3 rsync legacy → 4 vite build →
#   5 minify legacy → 6 merge Vite output → 7 chmod
# Legacy minify runs BEFORE the Vite merge so dist/ holds only legacy files during
# minification; already-minified Vite output (dist/_app + prerendered routes) is
# merged last and never re-minified.

set -e

BUMP_TYPE="patch"
SKIP_BUMP=false
REACT_BUILD=true

for arg in "$@"; do
    case $arg in
        --no-bump) SKIP_BUMP=true ;;
        --no-react) REACT_BUILD=false ;;
        major|minor|patch) BUMP_TYPE=$arg ;;
    esac
done

echo ""
echo "╔══════════════════════════════════════════╗"
echo "║   BetterMati — Production Build           ║"
echo "╚══════════════════════════════════════════╝"

# ── 0. Build-time configuration (optional .env, see web/.env.example) ─────────
# Exported so the Vite build inherits VITE_* vars. Git-ignored and excluded from
# dist/, so nothing here reaches the served output directly.
if [ -f .env ]; then
    set -a
    # shellcheck disable=SC1091
    . ./.env
    set +a
    # Map legacy SITE_URL → VITE_SITE_URL if only the former is set.
    export VITE_SITE_URL="${VITE_SITE_URL:-$SITE_URL}"
    echo ""
    echo "▶ [0/7] Loaded .env (VITE_SITE_URL=${VITE_SITE_URL:-unset})"
fi

# ── 1. Version (single source of truth: version.json) ────────────────────────
echo ""
echo "▶ [1/7] Version management..."
if [ "$SKIP_BUMP" = false ]; then
    node scripts/bump-version.js "$BUMP_TYPE"
else
    echo "  Skipping bump (--no-bump). Current: $(node -e "console.log(require('./version.json').version)")"
fi

VERSION=$(node -e "console.log(require('./version.json').version)")

# ── 2. Clean dist ────────────────────────────────────────────────────────────
echo ""
echo "▶ [2/7] Cleaning dist/..."
rm -rf dist
mkdir -p dist

# ── 3. Copy legacy site (rsync excludes dev-only files) ──────────────────────
echo ""
echo "▶ [3/7] Copying legacy site files..."
if command -v rsync &>/dev/null; then
    rsync -a \
        --exclude='node_modules' \
        --exclude='dist' \
        --exclude='.git' \
        --exclude='.vscode' \
        --exclude='.DS_Store' \
        --exclude='web' \
        --exclude='admin' \
        --exclude='backup-restore-point-*' \
        --exclude='package*.json' \
        --exclude='build.sh' \
        --exclude='babel.config.json' \
        --exclude='serve.py' \
        --exclude='scripts' \
        --exclude='docs' \
        --exclude='*.backup' \
        --exclude='*.md' \
        --exclude='.lighthouserc.json' \
        --exclude='.github' \
        --exclude='.gitignore' \
        --exclude='validate-translations.js' \
        --exclude='tests' \
        --exclude='playwright.config.js' \
        --exclude='playwright-report' \
        --exclude='test-results' \
        --exclude='.prettierrc' \
        --exclude='.prettierignore' \
        --exclude='.editorconfig' \
        --exclude='.env' \
        --exclude='.env.*' \
        --exclude='release' \
        --exclude='*.zip' \
        --exclude='*.tar.gz' \
        --exclude='*.log' \
        . dist/
else
    node scripts/copy-dist.js . dist
fi
echo "  Legacy files copied."

# ── 4. Build Vite/React app (SSG → web/dist) ─────────────────────────────────
echo ""
echo "▶ [4/7] Vite (React) SSG build..."
if [ "$REACT_BUILD" = true ] && [ -f "web/package.json" ]; then
    (
        cd web
        echo "  Installing dependencies..."
        npm ci --prefer-offline 2>/dev/null || npm install --silent
        echo "  Running vite-react-ssg build..."
        npm run build
    )
    echo "  Vite build complete (web/dist)."
elif [ "$REACT_BUILD" = false ]; then
    echo "  Skipped (--no-react)."
else
    echo "  Skipped (web/package.json not found)."
fi

# ── 5. Minify legacy assets (dist = legacy only at this point) ────────────────
echo ""
echo "▶ [5/7] Minifying legacy assets..."

echo "  HTML..."
find dist -name "*.html" -type f | while read -r file; do
    npx --yes html-minifier-terser \
        --collapse-whitespace \
        --remove-comments \
        --remove-optional-tags \
        --remove-redundant-attributes \
        --remove-script-type-attributes \
        --remove-style-link-type-attributes \
        --minify-css true \
        --minify-js true \
        -o "$file" "$file" 2>/dev/null || true
done

echo "  CSS..."
find dist/assets/css -name "*.css" -type f 2>/dev/null | while read -r file; do
    npx --yes cleancss -o "$file" "$file" 2>/dev/null || true
done

echo "  JavaScript (transpile + minify)..."
find dist/assets/js -name "*.js" -type f 2>/dev/null | while read -r file; do
    npx --yes babel "$file" --out-file "$file" 2>/dev/null || true
    npx --yes terser "$file" -o "$file" --compress --mangle 2>/dev/null || true
done

echo "  Legacy assets minified."

# ── 6. Merge Vite SSG output (already minified; AFTER legacy minify) ──────────
echo ""
echo "▶ [6/7] Merging Vite SSG output..."
if [ "$REACT_BUILD" = true ] && [ -d "web/dist/_app" ]; then
    echo "  Hashed assets → dist/_app/"
    cp -r web/dist/_app dist/_app

    # Client-side data-router artifacts (loader data + manifest). Harmless if unused.
    cp -r web/dist/static-loader-data dist/ 2>/dev/null || true
    cp web/dist/static-loader-data-manifest-*.json dist/ 2>/dev/null || true

    # Copy EXACTLY the migrated routes (single source of truth: web/migrated-routes.json).
    # dirStyle:'flat' → /services/health becomes web/dist/services/health.html.
    # Fails hard if a listed route was not prerendered (prerender/deploy drift guard).
    # vite-react-ssg emits flat files (web/dist/privacy.html, web/dist/services/health.html).
    # Legacy section pages are folder/index.html — a folder shadows a sibling .html in
    # Apache, so for any route whose legacy counterpart is a directory we must overwrite
    # that directory's index.html; leaf routes stay flat.
    node -e '
      const fs = require("fs"), path = require("path");
      const routes = require("./web/migrated-routes.json");
      let n = 0;
      for (const r of routes) {
        const rel = r === "/" ? "index" : r.replace(/^\//, "");
        const src = path.join("web", "dist", rel + ".html");
        if (!fs.existsSync(src)) { console.error("  MISSING prerender: " + rel + ".html"); process.exit(1); }
        const asDir = path.join("dist", rel);
        let dst;
        if (r === "/") dst = path.join("dist", "index.html");
        else if (fs.existsSync(asDir) && fs.statSync(asDir).isDirectory()) dst = path.join(asDir, "index.html");
        else dst = path.join("dist", rel + ".html");
        fs.mkdirSync(path.dirname(dst), { recursive: true });
        fs.copyFileSync(src, dst);
        console.log("  merged " + path.relative("dist", dst)); n++;
      }
      console.log("  " + n + " React route(s) merged.");
    '
else
    echo "  Skipped (no web/dist/_app)."
fi

# ── 7. cPanel file permissions (755 dirs / 644 files) ────────────────────────
echo ""
echo "▶ [7/7] Setting cPanel file permissions..."
find dist -type d -exec chmod 755 {} \;
find dist -type f -exec chmod 644 {} \;
echo "  Directories: 755 | Files: 644"

# ── Summary ───────────────────────────────────────────────────────────────────
ORIG_SIZE=$(du -sh . --exclude=node_modules --exclude=dist --exclude=.git --exclude="web/node_modules" --exclude="web/dist" 2>/dev/null | cut -f1 || echo "N/A")
DIST_SIZE=$(du -sh dist 2>/dev/null | cut -f1 || echo "N/A")

echo ""
echo "╔══════════════════════════════════════════╗"
printf  "║  ✓ Build complete!  v%-20s║\n" "${VERSION}"
echo "╠══════════════════════════════════════════╣"
printf  "║  Source: %-31s║\n" "${ORIG_SIZE}"
printf  "║  Dist:   %-31s║\n" "${DIST_SIZE}"
echo "╠══════════════════════════════════════════╣"
echo "║  Upload dist/ → cPanel public_html/      ║"
echo "║  Preview: python3 serve.py -d dist -p 8888 ║"
echo "╚══════════════════════════════════════════╝"
echo ""
