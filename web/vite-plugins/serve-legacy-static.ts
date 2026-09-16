import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import type { Plugin } from 'vite';

// Dev-only: serve the repo-root static files (legacy /assets, /data, sw.js,
// manifest, version.json, ...) so `vite dev` has parity with production, where
// build.sh rsyncs them into dist/. Not applied to the production build — those
// files come from the legacy rsync, never from web/dist.
const MIME: Record<string, string> = {
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.webp': 'image/webp',
  '.gif': 'image/gif',
  '.ico': 'image/x-icon',
  '.json': 'application/json',
  '.webmanifest': 'application/manifest+json',
  '.js': 'text/javascript',
  '.css': 'text/css',
  '.woff2': 'font/woff2',
  '.woff': 'font/woff',
  '.txt': 'text/plain',
  '.xml': 'application/xml',
  '.html': 'text/html',
};

export function serveLegacyStatic(): Plugin {
  // This file lives at web/vite-plugins/, so the repo root is two levels up.
  const repoRoot = fileURLToPath(new URL('../../', import.meta.url));
  const prefixes = ['/assets/', '/data/'];
  const exactFiles = new Set([
    '/version.json',
    '/sw.js',
    '/manifest.webmanifest',
    '/robots.txt',
    '/offline.html',
    '/sitemap.xml',
  ]);

  return {
    name: 'serve-legacy-static',
    apply: 'serve',
    configureServer(server) {
      server.middlewares.use((req, res, next) => {
        const url = decodeURIComponent((req.url || '').split('?')[0]);
        const matches = prefixes.some((p) => url.startsWith(p)) || exactFiles.has(url);
        if (!matches) return next();

        const filePath = path.join(repoRoot, url);
        // Guard against path traversal escaping the repo root.
        if (!filePath.startsWith(repoRoot)) return next();
        if (!fs.existsSync(filePath) || !fs.statSync(filePath).isFile()) return next();

        res.setHeader('Content-Type', MIME[path.extname(filePath).toLowerCase()] || 'application/octet-stream');
        fs.createReadStream(filePath).pipe(res);
      });
    },
  };
}
