#!/bin/bash
# BetterMati — Production Build Script (end-state: single Vite/React SSG app)
# Usage:
#   bash build.sh            — bump patch, build everything
#   bash build.sh --no-bump  — keep current version, build everything
#   bash build.sh minor      — bump minor, build everything
#   bash build.sh major      — bump major, build everything
#
# Pipeline (React is the whole site; the legacy static site has been retired):
#   0 env → 1 version → 2 clean → 3 vite build → 4 assemble dist → 5 chmod
# The Vite SSG output IS the site. Static passthrough (assets/images, data, admin,
# error/offline pages, .htaccess, sw.js, manifest, robots, version.json) is layered
# on top, and sitemap.xml is generated from migrated-routes.json.

set -e

BUMP_TYPE="patch"
SKIP_BUMP=false

for arg in "$@"; do
    case $arg in
        --no-bump) SKIP_BUMP=true ;;
        major|minor|patch) BUMP_TYPE=$arg ;;
    esac
done

echo ""
echo "╔══════════════════════════════════════════╗"
echo "║   BetterMati — Production Build           ║"
echo "╚══════════════════════════════════════════╝"

# ── 0. Build-time configuration (optional .env, see web/.env.example) ─────────
SITE_URL_DEFAULT="https://bettermati.org"
if [ -f .env ]; then
    set -a
    # shellcheck disable=SC1091
    . ./.env
    set +a
    export VITE_SITE_URL="${VITE_SITE_URL:-$SITE_URL}"
    echo ""
    echo "▶ [0/5] Loaded .env (VITE_SITE_URL=${VITE_SITE_URL:-unset})"
fi
SITE_URL="${VITE_SITE_URL:-${SITE_URL:-$SITE_URL_DEFAULT}}"

# ── 1. Version (single source of truth: version.json) ────────────────────────
echo ""
echo "▶ [1/5] Version management..."
if [ "$SKIP_BUMP" = false ]; then
    node scripts/bump-version.js "$BUMP_TYPE"
else
    echo "  Skipping bump (--no-bump). Current: $(node -e "console.log(require('./version.json').version)")"
fi
VERSION=$(node -e "console.log(require('./version.json').version)")

# ── 2. Clean dist ────────────────────────────────────────────────────────────
echo ""
echo "▶ [2/5] Cleaning dist/..."
rm -rf dist
mkdir -p dist

# ── 3. Build Vite/React app (SSG → web/dist) ─────────────────────────────────
echo ""
echo "▶ [3/5] Vite (React) SSG build..."
(
    cd web
    echo "  Installing dependencies..."
    npm ci --prefer-offline 2>/dev/null || npm install --silent
    echo "  Running vite-react-ssg build..."
    npm run build
)
echo "  Vite build complete (web/dist)."

# ── 4. Assemble dist ─────────────────────────────────────────────────────────
echo ""
echo "▶ [4/5] Assembling dist/..."

# 4a. The SSG output is the site (hashed /_app bundles + prerendered route HTML).
cp -r web/dist/. dist/

# 4b. Flat → folder for parent routes. vite-react-ssg (dirStyle:'flat') emits
# government.html AND government/officials.html; a directory named "government"
# shadows government.html in Apache, so parent routes (those with children) must
# live at <route>/index.html. Leaf routes stay flat. Computed from migrated-routes.json.
node -e '
  const fs = require("fs"), path = require("path");
  const routes = require("./web/migrated-routes.json");
  const isParent = (r) => r !== "/" && routes.some((o) => o !== r && o.startsWith(r + "/"));
  for (const r of routes) {
    if (!isParent(r)) continue;
    const rel = r.replace(/^\//, "");
    const flat = path.join("dist", rel + ".html");
    const dir = path.join("dist", rel);
    if (!fs.existsSync(flat)) { console.error("  MISSING parent route: " + rel + ".html"); process.exit(1); }
    fs.mkdirSync(dir, { recursive: true });
    fs.renameSync(flat, path.join(dir, "index.html"));
    console.log("  folderized " + rel + " → " + rel + "/index.html");
  }
'

# 4c. Static passthrough (things the React app needs at runtime + server config).
echo "  Static passthrough (assets/images, data, admin, error pages, config)..."
cp -r assets dist/assets
mkdir -p dist/data && cp -r data/. dist/data/
[ -d admin ] && cp -r admin dist/admin
cp 403.html 404.html 500.html offline.html dist/ 2>/dev/null || true
cp .htaccess sw.js manifest.webmanifest robots.txt version.json dist/ 2>/dev/null || true

# 4d. Generate sitemap.xml from migrated-routes.json.
node scripts/generate-sitemap.js "$SITE_URL" > dist/sitemap.xml
echo "  sitemap.xml generated ($SITE_URL)"

# ── 5. cPanel file permissions (755 dirs / 644 files) ────────────────────────
echo ""
echo "▶ [5/5] Setting cPanel file permissions..."
find dist -type d -exec chmod 755 {} \;
find dist -type f -exec chmod 644 {} \;
echo "  Directories: 755 | Files: 644"

# ── Summary ───────────────────────────────────────────────────────────────────
DIST_SIZE=$(du -sh dist 2>/dev/null | cut -f1 || echo "N/A")
ROUTE_COUNT=$(node -e "console.log(require('./web/migrated-routes.json').length)")

echo ""
echo "╔══════════════════════════════════════════╗"
printf  "║  ✓ Build complete!  v%-20s║\n" "${VERSION}"
echo "╠══════════════════════════════════════════╣"
printf  "║  Routes: %-31s║\n" "${ROUTE_COUNT}"
printf  "║  Dist:   %-31s║\n" "${DIST_SIZE}"
echo "╠══════════════════════════════════════════╣"
echo "║  Upload dist/ → cPanel public_html/      ║"
echo "║  Preview: python3 serve.py -d dist -p 8888 ║"
echo "╚══════════════════════════════════════════╝"
echo ""
