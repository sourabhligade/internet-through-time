// @ts-check
/** Shared helpers for year-shell immersion e2e tests */

/**
 * Open a year shell, skip dial-up, dismiss alerts, wait for content iframe body.
 * @param {import('@playwright/test').Page} page
 * @param {string} year
 */
async function enterYear(page, year) {
  await page.goto(`/years/${year}/`);
  const skip = page.locator('#skip-connect');
  if (await skip.isVisible().catch(() => false)) {
    await skip.click();
  }
  for (let i = 0; i < 4; i++) {
    const alert = page.locator('#dlg-alert:not(.hidden)');
    if (await alert.isVisible().catch(() => false)) {
      await page.locator('#dlg-alert-ok, [data-close="dlg-alert"]').first().click();
      await page.waitForTimeout(120);
    } else break;
  }
  // Hide any leftover modal that can intercept clicks
  await page.evaluate(() => {
    const bd = document.getElementById('modal-backdrop');
    if (bd) bd.classList.add('hidden');
    document.querySelectorAll('.dialog:not(.hidden)').forEach((d) => d.classList.add('hidden'));
  });
  await page.waitForFunction(() => {
    const f = document.getElementById('content');
    try {
      return !!(f && f.contentDocument && f.contentDocument.body && f.contentDocument.body.innerHTML.length > 20);
    } catch (e) {
      return false;
    }
  }, null, { timeout: 20000 });
}

/**
 * Navigate the content iframe to a path under the year root.
 * @param {import('@playwright/test').Page} page
 * @param {string} relativePath e.g. sites/amazon/index.html
 */
async function goInFrame(page, relativePath) {
  await page.evaluate((src) => {
    const iframe = document.getElementById('content');
    if (iframe) iframe.src = src;
  }, relativePath);
  await page.waitForTimeout(200);
}

/**
 * Wait until immersion-core has booted for a year inside the iframe.
 * @param {import('@playwright/test').Page} page
 * @param {string} year
 */
async function waitForImmersion(page, year) {
  await page.waitForFunction(
    (y) => {
      try {
        const doc = document.getElementById('content').contentDocument;
        return !!(doc && doc.documentElement.getAttribute('data-itt-immersion-booted') === y);
      } catch (e) {
        return false;
      }
    },
    year,
    { timeout: 20000 }
  );
}

/**
 * Frame locator for the content iframe.
 * @param {import('@playwright/test').Page} page
 */
function contentFrame(page) {
  return page.frameLocator('#content');
}

module.exports = { enterYear, goInFrame, waitForImmersion, contentFrame };
