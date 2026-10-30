// @ts-check
const { test, expect } = require('@playwright/test');
const { SEL, gotoFresh, waitForOpen } = require('./helpers/volunteer-modal');

const VIEWPORTS = [
  { name: 'small phone', width: 320, height: 568 },
  { name: 'phone', width: 375, height: 812 },
  { name: 'tablet', width: 768, height: 1024 },
  { name: 'desktop', width: 1440, height: 900 },
];

test.describe('Volunteer dialog — responsive layout', () => {
  for (const vp of VIEWPORTS) {
    test.describe(vp.name, () => {
      test.use({ viewport: { width: vp.width, height: vp.height } });

      test('fits inside the viewport', async ({ page }) => {
        await gotoFresh(page);
        const box = await (await waitForOpen(page)).boundingBox();
        expect(box).not.toBeNull();
        expect(box.x).toBeGreaterThanOrEqual(0);
        expect(box.x + box.width).toBeLessThanOrEqual(vp.width);
        expect(box.y).toBeGreaterThanOrEqual(0);
        expect(box.y + box.height).toBeLessThanOrEqual(vp.height);
      });

      test('the CTA and close button are tappable', async ({ page }) => {
        await gotoFresh(page);
        await waitForOpen(page);
        for (const sel of [SEL.cta, SEL.close]) {
          const box = await page.locator(sel).boundingBox();
          expect(box, sel).not.toBeNull();
          expect(box.width, sel).toBeGreaterThanOrEqual(16);
          expect(box.height, sel).toBeGreaterThanOrEqual(16);
        }
      });

      test('does not add horizontal page scroll', async ({ page }) => {
        await gotoFresh(page);
        await waitForOpen(page);
        const overflow = await page.evaluate(
          () => document.documentElement.scrollWidth - window.innerWidth
        );
        expect(overflow).toBeLessThanOrEqual(0);
      });
    });
  }

  test('stays usable when the device is rotated while open', async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await gotoFresh(page);
    await waitForOpen(page);
    await page.setViewportSize({ width: 844, height: 390 });
    await expect(page.locator(SEL.close)).toBeVisible();
    await page.locator(SEL.close).click();
    await expect(page.locator(SEL.dialog)).toHaveCount(0);
  });

  test('is centred horizontally', async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 900 });
    await gotoFresh(page);
    const box = await (await waitForOpen(page)).boundingBox();
    const centre = box.x + box.width / 2;
    expect(Math.abs(centre - 720)).toBeLessThanOrEqual(2);
  });
});
