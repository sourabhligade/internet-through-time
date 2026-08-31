// @ts-check
/**
 * After Skip dial-up, iframe links must be clickable without killOverlays().
 */
const { test, expect } = require('@playwright/test');


async function skipOnly(page, year) {
  await page.goto(`/years/${year}/`);
  const skip = page.locator('#skip-connect');
  if (await skip.isVisible().catch(() => false)) {
    await skip.click();
  }
  await page.waitForFunction(() => {
    const f = document.getElementById('content');
    try {
      return !!(f && f.contentDocument && f.contentDocument.body && f.contentDocument.body.innerHTML.length > 20);
    } catch (e) {
      return false;
    }
  }, null, { timeout: 20000 });
}

test.describe('shell overlay honesty', () => {
  test('1994 skip then WebCrawler without killOverlays', async ({ page }) => {
    await skipOnly(page, '1994');
    const overlay = page.locator('#connect-overlay');
    await expect(overlay).toBeHidden();
    const frame = page.frameLocator('#content');
    await expect(frame.getByRole('link', { name: /WebCrawler/i }).first()).toBeVisible({ timeout: 10000 });
    await frame.getByRole('link', { name: /WebCrawler/i }).first().click();
    await expect.poll(async () => {
      return page.evaluate(() => {
        try {
          const f = document.getElementById('content');
          const loc = f && f.contentDocument && f.contentDocument.location;
          return loc ? loc.pathname : (f && f.getAttribute('src')) || '';
        } catch (e) {
          return '';
        }
      });
    }, { timeout: 15000 }).toMatch(/webcrawler/i);
  });

  test('2005 skip leaves iframe clickable', async ({ page }) => {
    await skipOnly(page, '2005');
    await expect(page.locator('#connect-overlay')).toBeHidden();
    const hit = await page.evaluate(() => {
      const f = document.getElementById('content');
      if (!f) return 'no-iframe';
      const r = f.getBoundingClientRect();
      const el = document.elementFromPoint(r.left + r.width / 2, r.top + 40);
      return el ? el.id || el.tagName : 'none';
    });
    expect(hit === 'content' || hit === 'IFRAME' || /IFRAME/i.test(hit)).toBeTruthy();
  });
});
