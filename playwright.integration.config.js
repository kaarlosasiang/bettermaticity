// @ts-check
const { defineConfig, devices } = require('@playwright/test');

/**
 * Integration harness for the built coexistence output: runs the full production
 * build then serves dist/ through serve.py (which emulates the .htaccess clean-URL
 * rewrites), so migrated React routes are exercised exactly as shipped.
 *
 * Kept separate from playwright.config.js so the fast legacy suite (`npm test`,
 * raw source on :8321) never triggers a build.
 */
module.exports = defineConfig({
  testDir: './tests/integration',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 1 : 0,
  reporter: process.env.CI ? [['github'], ['html', { open: 'never' }]] : [['list']],

  use: {
    baseURL: process.env.BASE_URL || 'http://localhost:8888',
    trace: 'retain-on-failure',
    screenshot: 'only-on-failure',
  },

  webServer: {
    command: 'bash build.sh --no-bump && python3 serve.py -d dist -p 8888',
    url: 'http://localhost:8888/services/health',
    reuseExistingServer: !process.env.CI,
    timeout: 240_000,
  },

  projects: [
    { name: 'chrome', use: { ...devices['Desktop Chrome'], channel: 'chrome' } },
    { name: 'mobile-safari', use: { ...devices['iPhone 13'] } },
  ],
});
