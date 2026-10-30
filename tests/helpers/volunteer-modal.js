// @ts-check

/** localStorage key the dialog uses to remember a dismissal. */
const STORAGE_KEY = 'bs-vol-popup-v1';

/** The first-visit volunteer invite (web/src/components/VolunteerDialog.tsx). */
const SEL = {
  dialog: '[data-slot="dialog-content"]',
  overlay: '[data-slot="dialog-overlay"]',
  close: '[data-slot="dialog-close"]',
  cta: 'a[href="mailto:volunteer@bettermati.org"]',
};
const TITLE = 'Help build BetterMati';

/**
 * Blocks third-party requests (weather and exchange-rate APIs, embeds, analytics) so
 * the dialog is measured without unrelated network flakiness.
 */
async function blockThirdParty(page) {
  await page.route('**/*', (route) => {
    const url = route.request().url();
    if (url.startsWith('http://localhost') || url.startsWith('data:')) return route.continue();
    return route.abort();
  });
}

/**
 * Loads the home page (the only page that renders the dialog) with a clean slate, so
 * every visit is a first visit. The storage seed runs as an init script because the
 * dialog reads localStorage as soon as it mounts.
 */
async function gotoFresh(page, { dismissed = false } = {}) {
  await blockThirdParty(page);
  await page.addInitScript(
    ([key, value]) => {
      try {
        if (value) localStorage.setItem(key, value);
        else localStorage.removeItem(key);
      } catch (e) {
        /* storage disabled — the dialog must cope on its own */
      }
    },
    [STORAGE_KEY, dismissed ? '1' : '']
  );
  await page.goto('/', { waitUntil: 'domcontentloaded' });
}

/** Waits for the dialog to open (after its ~800 ms delay) and finish animating in. */
async function waitForOpen(page) {
  const dialog = page.locator(SEL.dialog);
  await dialog.waitFor({ state: 'visible', timeout: 10_000 });
  await page.waitForFunction(
    (sel) =>
      document
        .querySelector(sel)
        ?.getAnimations()
        .every((a) => a.playState !== 'running'),
    SEL.dialog
  );
  return dialog;
}

module.exports = { STORAGE_KEY, SEL, TITLE, blockThirdParty, gotoFresh, waitForOpen };
