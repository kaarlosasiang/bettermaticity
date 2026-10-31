// @ts-check
const { test, expect } = require('@playwright/test');
const { STORAGE_KEY, SEL, TITLE, gotoFresh, waitForOpen } = require('./helpers/volunteer-modal');

test.describe('Volunteer dialog — display & content', () => {
  test('appears on a first visit with its content', async ({ page }) => {
    await gotoFresh(page);
    const dialog = await waitForOpen(page);
    await expect(dialog.getByRole('heading', { name: TITLE })).toBeVisible();
    await expect(page.locator(SEL.cta)).toHaveText(/Volunteer with us/);
    await expect(page.locator(SEL.close)).toBeVisible();
  });

  test('renders above every other layer', async ({ page }) => {
    await gotoFresh(page);
    await waitForOpen(page);
    const ownedByDialog = await page.evaluate((sel) => {
      const el = document.elementFromPoint(window.innerWidth / 2, window.innerHeight / 2);
      return !!el && !!el.closest(sel);
    }, SEL.dialog);
    expect(ownedByDialog).toBe(true);
  });
});

test.describe('Volunteer dialog — dismissal paths', () => {
  test('the close button closes it and remembers the choice', async ({ page }) => {
    await gotoFresh(page);
    await waitForOpen(page);
    await page.locator(SEL.close).click();
    await expect(page.locator(SEL.dialog)).toBeHidden();
    expect(await page.evaluate((k) => localStorage.getItem(k), STORAGE_KEY)).toBe('1');
  });

  test('clicking the backdrop closes it', async ({ page }) => {
    await gotoFresh(page);
    await waitForOpen(page);
    await page.mouse.click(5, 5);
    await expect(page.locator(SEL.dialog)).toBeHidden();
  });

  test('clicking inside the card does not close it', async ({ page }) => {
    await gotoFresh(page);
    const dialog = await waitForOpen(page);
    await dialog.getByRole('heading', { name: TITLE }).click();
    await expect(dialog).toBeVisible();
  });

  test('Escape closes it', async ({ page }) => {
    await gotoFresh(page);
    await waitForOpen(page);
    await page.keyboard.press('Escape');
    await expect(page.locator(SEL.dialog)).toBeHidden();
  });

  test('does not reappear for a returning visitor', async ({ page }) => {
    await gotoFresh(page, { dismissed: true });
    await page.waitForTimeout(1500);
    await expect(page.locator(SEL.dialog)).toHaveCount(0);
  });

  test('is removed from the DOM after closing', async ({ page }) => {
    await gotoFresh(page);
    await waitForOpen(page);
    await page.keyboard.press('Escape');
    await expect(page.locator(SEL.dialog)).toHaveCount(0);
    await expect(page.locator(SEL.overlay)).toHaveCount(0);
  });

  test('scrolling is locked while open and restored after', async ({ page }) => {
    await gotoFresh(page);
    await waitForOpen(page);
    const before = await page.evaluate(() => window.scrollY);
    await page.mouse.wheel(0, 800);
    await page.waitForTimeout(200);
    expect(await page.evaluate(() => window.scrollY)).toBe(before);
    await page.keyboard.press('Escape');
    await expect(page.locator(SEL.dialog)).toHaveCount(0);
    await page.mouse.wheel(0, 800);
    await expect.poll(() => page.evaluate(() => window.scrollY)).toBeGreaterThan(before);
  });

  test('survives localStorage being unavailable', async ({ page }) => {
    const errors = [];
    page.on('pageerror', (e) => errors.push(e.message));
    await page.addInitScript(() => {
      Object.defineProperty(window, 'localStorage', {
        get() {
          throw new Error('SecurityError: storage disabled');
        },
      });
    });
    await gotoFresh(page);
    await waitForOpen(page);
    await page.locator(SEL.close).click();
    await expect(page.locator(SEL.dialog)).toBeHidden();
    expect(errors).toEqual([]);
  });

  test('opens without console errors', async ({ page }) => {
    const errors = [];
    page.on('console', (m) => {
      // Third-party requests are blocked on purpose; their failures are expected.
      if (m.type() === 'error' && !/ERR_FAILED|net::/.test(m.text())) errors.push(m.text());
    });
    await gotoFresh(page);
    await waitForOpen(page);
    expect(errors).toEqual([]);
  });

  test('rapid repeated dismissal clicks are harmless', async ({ page }) => {
    await gotoFresh(page);
    await waitForOpen(page);
    const close = page.locator(SEL.close);
    await close.click();
    await close.click({ force: true, timeout: 1000 }).catch(() => {});
    await expect(page.locator(SEL.dialog)).toHaveCount(0);
  });
});
