// @ts-check
const { defineConfig, devices } = require('@playwright/test');

/**
 * Cross-browser validation harness for the React app's browser-only behaviour (the
 * volunteer dialog). Builds web/ and serves web/dist through serve.py, so it runs
 * against the prerendered pages exactly as shipped, without a full build.sh.
 *
 * Chrome and Edge run as real installed channels (not bundled Chromium) so the
 * results reflect the shipping browsers; Firefox uses Gecko and WebKit is the
 * engine behind Safari on both macOS and iOS.
 */
module.exports = defineConfig({
  testDir: './tests',
  // Integration specs run against the built dist/ via playwright.integration.config.js.
  testIgnore: '**/integration/**',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 1 : 0,
  reporter: process.env.CI ? [['github'], ['html', { open: 'never' }]] : [['list']],

  use: {
    baseURL: process.env.BASE_URL || 'http://localhost:8321',
    trace: 'retain-on-failure',
    screenshot: 'only-on-failure',
  },

  webServer: {
    command: 'npm --prefix web run build && python3 serve.py -d web/dist -p 8321',
    url: 'http://localhost:8321/about',
    reuseExistingServer: true,
    timeout: 240_000,
  },

  projects: [
    { name: 'chrome', use: { ...devices['Desktop Chrome'], channel: 'chrome' } },
    { name: 'edge', use: { ...devices['Desktop Edge'], channel: 'msedge' } },
    { name: 'firefox', use: { ...devices['Desktop Firefox'] } },
    { name: 'safari', use: { ...devices['Desktop Safari'] } },
    { name: 'mobile-safari', use: { ...devices['iPhone 13'] } },
    { name: 'mobile-chrome', use: { ...devices['Pixel 7'] } },
  ],
});
