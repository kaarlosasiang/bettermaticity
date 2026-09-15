#!/usr/bin/env node
/**
 * Generate sitemap.xml from web/migrated-routes.json (the single source of truth
 * for shipped routes). Emits clean URLs (no .html, no trailing slash except root).
 * Usage: node scripts/generate-sitemap.js [siteUrl] > dist/sitemap.xml
 */
const fs = require('fs');
const path = require('path');

const siteUrl = (process.argv[2] || 'https://bettermati.org').replace(/\/$/, '');
const routes = require(path.join(__dirname, '..', 'web', 'migrated-routes.json'));

// Homepage gets top priority; section landing pages higher than deep pages.
function priority(route) {
  if (route === '/') return '1.0';
  const depth = route.split('/').filter(Boolean).length;
  return depth <= 1 ? '0.8' : '0.6';
}

const urls = routes
  .slice()
  .sort()
  .map((r) => {
    const loc = r === '/' ? siteUrl + '/' : siteUrl + r;
    return (
      '  <url>\n' +
      `    <loc>${loc}</loc>\n` +
      `    <changefreq>weekly</changefreq>\n` +
      `    <priority>${priority(r)}</priority>\n` +
      '  </url>'
    );
  })
  .join('\n');

process.stdout.write(
  '<?xml version="1.0" encoding="UTF-8"?>\n' +
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n' +
    urls +
    '\n</urlset>\n'
);
