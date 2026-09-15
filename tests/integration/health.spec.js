// @ts-check
const { test, expect } = require('@playwright/test');

// Coexistence smoke tests against the built dist/ served through serve.py.
// The real /services/health content tests live with the pilot; this verifies the
// pipeline: prerender (SSR), hydration, shared chrome, /_app assets, and that the
// legacy home is untouched.

test('services/health is prerendered (content present before JS)', async ({ request }) => {
  const res = await request.get('/services/health');
  expect(res.status()).toBe(200);
  const html = await res.text();
  // SSR content in the raw HTML (crawlable, no JS executed).
  expect(html).toContain('Health Services');
  expect(html).toContain('Barangay Health Stations'); // a section rendered from i18n
  expect(html).toContain('City Health Office');
  // Hashed Vite bundle referenced from the standalone page.
  expect(html).toMatch(/\/_app\/app-[^"]+\.js/);
});

test('services/health renders and hydrates with shared chrome', async ({ page }) => {
  // domcontentloaded (not 'load'): we assert prerendered markup + hydration, and we
  // don't want the test coupled to every subresource (fonts/images) settling.
  await page.goto('/services/health', { waitUntil: 'domcontentloaded' });
  await expect(page.getByRole('heading', { level: 1, name: 'Health Services' })).toBeVisible();
  await expect(page.getByRole('banner')).toBeVisible(); // <header>
  await expect(page.getByRole('contentinfo')).toBeVisible(); // <footer>
  // Nav is in the DOM on all viewports; on mobile it's collapsed with
  // visibility:hidden (correctly out of the a11y tree), so query the DOM node.
  await expect(page.locator('nav[aria-label="Main Navigation"]')).toBeAttached();
});

// Folder-based section pages (privacy/index.html, services/index.html, ...) must be
// overridden by the React build, not shadowed by the legacy folder. Regression guard.
test('folder-based routes serve the React build, not the legacy folder', async ({ request }) => {
  for (const path of ['/privacy', '/services', '/faq', '/contact']) {
    const res = await request.get(path); // follows the .html/redirect resolution
    expect(res.status(), `${path} status`).toBe(200);
    const html = await res.text();
    expect(html, `${path} should be the React build`).toMatch(/\/_app\/app-[^"]+\.js/);
  }
});

test('un-migrated legacy route is still served by legacy', async ({ request }) => {
  const res = await request.get('/government/');
  expect(res.status()).toBe(200);
  const html = await res.text();
  expect(html).not.toContain('/_app/');
});

test('legacy home is still served (not clobbered by the React build)', async ({ request }) => {
  const res = await request.get('/');
  expect(res.status()).toBe(200);
  const html = await res.text();
  // Legacy home loads the legacy bundles, not the Vite /_app bundle.
  expect(html).toContain('assets/js/main.js');
  expect(html).not.toContain('/_app/');
});
