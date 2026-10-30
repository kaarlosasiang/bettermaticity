// @ts-check
const { test, expect } = require('@playwright/test');
const { SEL, gotoFresh, waitForOpen } = require('./helpers/volunteer-modal');

test.describe('Volunteer dialog — performance', () => {
  test('opening and closing does not move the page content', async ({ page }) => {
    await gotoFresh(page);
    await waitForOpen(page);
    // Scroll locking can drop the scrollbar and nudge the page sideways; the heading
    // behind the dialog must sit in the same place while it is open and after it closes.
    const heading = page.locator('main h1');
    const open = await heading.boundingBox();
    await page.keyboard.press('Escape');
    await expect(page.locator(SEL.dialog)).toHaveCount(0);
    const closed = await heading.boundingBox();
    expect(open).not.toBeNull();
    expect(Math.abs(open.x - closed.x)).toBeLessThanOrEqual(1);
    expect(Math.abs(open.y - closed.y)).toBeLessThanOrEqual(1);
  });

  test('is not in the prerendered HTML, so it cannot block first paint', async ({ request }) => {
    const html = await (await request.get('/')).text();
    expect(html).not.toContain('Help build BetterMati');
  });

  test('waits before opening, so the page is readable first', async ({ page }) => {
    await gotoFresh(page);
    await page.waitForTimeout(300);
    await expect(page.locator(SEL.dialog)).toHaveCount(0);
    await waitForOpen(page);
  });
});
