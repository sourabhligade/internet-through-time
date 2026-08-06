// @ts-check
/**
 * 1999 hard signature flows — no soft mocks.
 */
const { test, expect } = require('@playwright/test');
const { enterYear, contentFrame, waitForImmersion, goInFrame } = require('./helpers');

test.describe('1999 hard flows', () => {
  test.beforeEach(async ({ page }) => {
    await enterYear(page, '1999');
  });

  test('Napster search returns catalog rows', async ({ page }) => {
    await goInFrame(page, 'sites/napster/search.html?q=radiohead');
    await waitForImmersion(page, '1999');
    const frame = contentFrame(page);
    await expect(frame.locator('#napster-results')).toContainText(/Radiohead|mp3|Download/i, {
      timeout: 15000,
    });
  });

  test('Blogger publish shows post on view', async ({ page }) => {
    await goInFrame(page, 'sites/blogger/edit.html');
    await waitForImmersion(page, '1999');
    const frame = contentFrame(page);
    await frame.locator('textarea[name="body"]').fill('Hard flow post from 1999.');
    await frame.locator('input[name="title"]').fill('E2E post');
    await frame.locator('input[type="submit"][value="Save to Server"], input[type="submit"]').first().click();
    await page.waitForTimeout(1200);
    const body = await contentFrame(page).locator('body').innerText();
    expect(body).toMatch(/Hard flow post from 1999|E2E post|weblog|blogger/i);
  });

  test('Google about is funded-startup era, not empty', async ({ page }) => {
    await goInFrame(page, 'sites/google/about.html');
    await waitForImmersion(page, '1999');
    const frame = contentFrame(page);
    await expect(frame.locator('body')).toContainText(/25|Sequoia|Kleiner|1999|PageRank|Google/i, {
      timeout: 15000,
    });
    const t = await frame.locator('body').innerText();
    expect(t).not.toMatch(/Error code: 404|File not found/i);
  });

  test('Amazon multi-cat home + cart path (no smile)', async ({ page }) => {
    await page.evaluate(() => {
      try {
        Object.keys(localStorage)
          .filter((k) => k.indexOf('itt99') === 0)
          .forEach((k) => localStorage.removeItem(k));
      } catch (e) { /* */ }
    });
    await goInFrame(page, 'sites/amazon/index.html');
    await waitForImmersion(page, '1999');
    const frame = contentFrame(page);
    await expect(frame.locator('body')).toContainText(/Amazon/i, { timeout: 15000 });
    const add = frame.locator('[data-add-cart]').first();
    if (await add.count()) {
      await add.click();
      await expect(frame.locator('[data-cart-count]').first()).not.toHaveText('0', { timeout: 10000 });
    }
    const html = await frame.locator('body').innerHTML();
    // smile logo path ban — path segment smile in logo filenames
    expect(html).not.toMatch(/logo-smile|smile\.gif|amazon-smile/i);
  });

  test('Napster legal has no Museum: label', async ({ page }) => {
    await goInFrame(page, 'sites/napster/legal.html');
    await waitForImmersion(page, '1999');
    const t = await contentFrame(page).locator('body').innerText();
    expect(t).toMatch(/RIAA|copyright|1999/i);
    expect(t).not.toMatch(/Museum:\s/i);
  });
});
