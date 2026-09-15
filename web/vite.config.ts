/// <reference types="vite-react-ssg" />
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import { fileURLToPath, URL } from 'node:url';
import { readFileSync } from 'node:fs';
import { serveLegacyStatic } from './vite-plugins/serve-legacy-static.js';

// Single source of truth for which routes are live in production. Drives BOTH the
// SSG prerender set (below) and build.sh's cherry-pick merge into dist/.
const migratedRoutes: string[] = JSON.parse(
  readFileSync(new URL('./migrated-routes.json', import.meta.url), 'utf-8')
);

// https://vite.dev/config/
export default defineConfig({
  // ABSOLUTE base — required so a standalone prerendered /services/health.html
  // requests /_app/* (not ./_app/* which would 404 on nested routes).
  base: '/',
  plugins: [react(), tailwindcss(), serveLegacyStatic()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
      // Reference data (officials, services, ...) lives at the repo root data/ dir
      // and is imported at build time (baked into prerendered HTML).
      '@data': fileURLToPath(new URL('../data', import.meta.url)),
    },
  },
  server: {
    // Allow importing from the repo-root data/ dir during dev.
    fs: { allow: ['..'] },
  },
  build: {
    outDir: 'dist',
    // Hashed JS/CSS land in dist/_app/* — NOT dist/assets/* (which would collide
    // with the legacy /assets/css|js|images shipped alongside during coexistence).
    assetsDir: '_app',
    emptyOutDir: true,
  },
  // vite-react-ssg options (augments Vite's UserConfig type).
  ssgOptions: {
    // /services/health -> services/health.html (flat), NOT services/health/index.html.
    // Nested output would trigger an .htaccess trailing-slash 301 and break clean URLs.
    dirStyle: 'flat',
    // vite-react-ssg only offers 'prettify' | 'none' (no 'minify'). JS/CSS are
    // already minified by Vite; the small prerendered HTML is gzip/brotli-compressed
    // by .htaccess, so leave it unformatted.
    formatting: 'none',
    // Prerender EXACTLY the migrated set — same list build.sh merges into dist/.
    includedRoutes: () => migratedRoutes,
  },
});
