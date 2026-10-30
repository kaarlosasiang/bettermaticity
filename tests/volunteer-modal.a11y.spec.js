// @ts-check
const { test, expect } = require('@playwright/test');
const { SEL, TITLE, gotoFresh, waitForOpen } = require('./helpers/volunteer-modal');

test.describe('Volunteer dialog — accessibility', () => {
  test('is a modal dialog named by its heading', async ({ page }) => {
    await gotoFresh(page);
    await waitForOpen(page);
    const dialog = page.getByRole('dialog', { name: TITLE });
    await expect(dialog).toBeVisible();
    await expect(dialog).toHaveAttribute('aria-describedby', /.+/);
  });

  test('the close button and CTA have discernible names', async ({ page }) => {
    await gotoFresh(page);
    await waitForOpen(page);
    await expect(page.getByRole('button', { name: 'Close' })).toBeVisible();
    await expect(page.getByRole('link', { name: /Volunteer with us/ })).toBeVisible();
  });

  test('decorative icons are hidden from assistive tech', async ({ page }) => {
    await gotoFresh(page);
    const dialog = await waitForOpen(page);
    const exposed = await dialog.locator('svg:not([aria-hidden="true"])').count();
    expect(exposed).toBe(0);
  });

  test('focus moves into the dialog on open', async ({ page }) => {
    await gotoFresh(page);
    await waitForOpen(page);
    const inside = await page.evaluate((sel) => !!document.activeElement?.closest(sel), SEL.dialog);
    expect(inside).toBe(true);
  });

  test('Tab and Shift+Tab stay inside the dialog', async ({ page }) => {
    await gotoFresh(page);
    await waitForOpen(page);
    for (const key of ['Tab', 'Tab', 'Tab', 'Shift+Tab', 'Shift+Tab', 'Shift+Tab']) {
      await page.keyboard.press(key);
      const inside = await page.evaluate(
        (sel) => !!document.activeElement?.closest(sel),
        SEL.dialog
      );
      expect(inside, key).toBe(true);
    }
  });

  test('the close button works from the keyboard', async ({ page }) => {
    await gotoFresh(page);
    await waitForOpen(page);
    await page.locator(SEL.close).focus();
    await page.keyboard.press('Enter');
    await expect(page.locator(SEL.dialog)).toHaveCount(0);
  });

  test('focus is not left orphaned after dismissal', async ({ page }) => {
    await gotoFresh(page);
    await waitForOpen(page);
    await page.keyboard.press('Escape');
    await expect(page.locator(SEL.dialog)).toHaveCount(0);
    const tag = await page.evaluate(() => document.activeElement?.tagName);
    expect(tag).toBeTruthy();
    // Focus lands on the page (body or a real control), never inside removed markup.
    expect(await page.evaluate(() => document.activeElement?.isConnected)).toBe(true);
  });

  test('nothing is in the tab order before the reveal delay', async ({ page }) => {
    await gotoFresh(page);
    await expect(page.locator(SEL.dialog)).toHaveCount(0);
  });

  test('respects prefers-reduced-motion', async ({ page }) => {
    await page.emulateMedia({ reducedMotion: 'reduce' });
    await gotoFresh(page);
    const dialog = await waitForOpen(page);
    await expect(dialog).toBeVisible();
  });
});
