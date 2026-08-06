// @ts-check
/**
 * 2005 densify — REAL multipage + storage (no soft page-load mocks).
 */
const { test, expect } = require('@playwright/test');

/**
 * @param {import('@playwright/test').Page} page
 * @param {string[]} keys
 */
async function clearKeys(page, keys) {
  await page.evaluate((ks) => {
    try {
      ks.forEach((k) => localStorage.removeItem(k));
    } catch (e) {
      /* */
    }
  }, keys);
}

test.describe('2005 densify REAL', () => {
  test('YouTube multipage: upload mutates itt05-yt-uploads + list', async ({ page }) => {
    await page.goto('/years/2005/sites/youtube/upload.html');
    await clearKeys(page, ['itt05-yt-uploads']);
    await page.reload();
    await page.waitForSelector('[data-yt-upload]', { timeout: 20000 });
    const title = 'DensifyYT ' + Date.now();
    await page.fill('[name="title"]', title);
    await page.locator('[data-yt-upload] button[type="submit"]').click();
    await expect(page.locator('[data-yt-upload-status]')).toContainText(/Upload|list|videos/i, {
      timeout: 10000,
    });
    expect(await page.evaluate(() => localStorage.getItem('itt05-yt-uploads'))).toContain(title);
    await page.goto('/years/2005/sites/youtube/index.html');
    await page.waitForSelector('[data-yt-list]', { timeout: 20000 });
    await expect(page.locator('[data-yt-list]')).toContainText(title, { timeout: 10000 });
    await expect(page.locator('body')).toContainText(/Broadcast Yourself/i);
  });

  test('Maps: search + zoom write itt05-maps-state', async ({ page }) => {
    await page.goto('/years/2005/sites/maps/index.html');
    await clearKeys(page, ['itt05-maps-state']);
    await page.reload();
    await page.waitForSelector('[data-maps-status]', { timeout: 20000 });
    await page.locator('[data-maps-zoom="in"]').click();
    await page.fill('[name="what"]', 'coffee');
    await page.fill('[name="where"]', 'Portland, OR');
    await page.locator('[data-maps-search] button[type="submit"]').click();
    await expect(page.locator('[data-maps-status]')).toContainText(/Local Search|coffee|Portland/i, {
      timeout: 5000,
    });
    expect(await page.evaluate(() => localStorage.getItem('itt05-maps-state') || '')).toMatch(
      /coffee|Portland|zoom|history/i
    );
  });

  test('Reddit: submit + boost write itt05-reddit-links', async ({ page }) => {
    await page.goto('/years/2005/sites/reddit/submit.html');
    await clearKeys(page, ['itt05-reddit-links']);
    await page.reload();
    await page.waitForSelector('[data-reddit-submit]', { timeout: 20000 });
    const title = 'DensifyReddit ' + Date.now();
    await page.fill('[name="title"]', title);
    await page.fill('[name="url"]', 'http://example.com/densify');
    await page.locator('[data-reddit-submit] button[type="submit"]').click();
    expect(await page.evaluate(() => localStorage.getItem('itt05-reddit-links'))).toContain(title);
    await page.goto('/years/2005/sites/reddit/index.html');
    await page.waitForSelector('[data-reddit-up]', { timeout: 20000 });
    await expect(page.locator('[data-reddit-list]')).toContainText(title, { timeout: 10000 });
    const up = page.locator('[data-reddit-up]').first();
    const id = await up.getAttribute('data-reddit-up');
    const before = parseInt(await page.locator(`[data-reddit-score="${id}"]`).innerText(), 10);
    await up.click();
    await expect(page.locator(`[data-reddit-score="${id}"]`)).toContainText(String(before + 1), {
      timeout: 5000,
    });
  });

  test('Digg: digg + submit use itt05 only (not itt04)', async ({ page }) => {
    await page.goto('/years/2005/sites/digg/index.html');
    await clearKeys(page, ['itt05-digg-links', 'itt04-digg-links']);
    await page.reload();
    await page.waitForSelector('[data-digg-up="0"]', { timeout: 20000 });
    const before = parseInt(await page.locator('[data-digg-count="0"]').innerText(), 10);
    await page.locator('[data-digg-up="0"]').click();
    await expect(page.locator('[data-digg-count="0"]')).toContainText(String(before + 1), {
      timeout: 5000,
    });
    expect(await page.evaluate(() => localStorage.getItem('itt05-digg-links'))).toBeTruthy();
    expect(await page.evaluate(() => localStorage.getItem('itt04-digg-links'))).toBeNull();

    const title = 'DensifyDigg ' + Date.now();
    await page.goto('/years/2005/sites/digg/submit.html');
    await page.waitForSelector('[data-digg-submit]', { timeout: 20000 });
    await page.fill('[name="title"]', title);
    await page.fill('[name="url"]', 'http://example.com/densify-digg');
    await page.locator('[data-digg-submit] button[type="submit"]').click();
    expect(await page.evaluate(() => localStorage.getItem('itt05-digg-links'))).toContain(title);
  });

  test('home chips are real paths (not # mock)', async ({ page }) => {
    await page.goto('/years/2005/pages/home.html');
    const links = page.locator('.itt-product-chips a, .itt-start a[href*="sites/"]');
    const n = await links.count();
    expect(n).toBeGreaterThan(0);
    for (let i = 0; i < Math.min(n, 12); i++) {
      const h = await links.nth(i).getAttribute('href');
      expect(h, 'chip ' + i).toBeTruthy();
      expect(h || '').not.toMatch(/^#$/);
      expect(h || '').toMatch(/sites\/|pages\//);
    }
  });

  test('empty YouTube / Digg / Reddit submits do not add mock untitled rows', async ({ page }) => {
    /* Seeds may pre-fill keys on boot — empty submit must leave storage unchanged (no Untitled). */
    await page.goto('/years/2005/sites/youtube/upload.html');
    await clearKeys(page, ['itt05-yt-uploads']);
    await page.reload();
    await page.waitForSelector('[data-yt-upload]', { timeout: 20000 });
    await page.waitForTimeout(200);
    const ytBefore = await page.evaluate(() => localStorage.getItem('itt05-yt-uploads'));
    await page.fill('[name="title"]', '   ');
    await page.locator('[data-yt-upload] button[type="submit"]').click();
    await page.waitForTimeout(300);
    const ytAfter = await page.evaluate(() => localStorage.getItem('itt05-yt-uploads'));
    expect(ytAfter).toBe(ytBefore);
    expect(ytAfter || '').not.toMatch(/"title"\s*:\s*"Untitled"/i);

    await page.goto('/years/2005/sites/digg/submit.html');
    await clearKeys(page, ['itt05-digg-links']);
    await page.reload();
    await page.waitForSelector('[data-digg-submit]', { timeout: 20000 });
    await page.waitForTimeout(200);
    const diggBefore = await page.evaluate(() => localStorage.getItem('itt05-digg-links'));
    await page.fill('[name="title"]', '');
    await page.locator('[data-digg-submit] button[type="submit"]').click();
    await page.waitForTimeout(300);
    const diggAfter = await page.evaluate(() => localStorage.getItem('itt05-digg-links'));
    expect(diggAfter).toBe(diggBefore);
    expect(diggAfter || '').not.toMatch(/untitled/i);

    await page.goto('/years/2005/sites/reddit/submit.html');
    await clearKeys(page, ['itt05-reddit-links']);
    await page.reload();
    await page.waitForSelector('[data-reddit-submit]', { timeout: 20000 });
    await page.waitForTimeout(200);
    const redditBefore = await page.evaluate(() => localStorage.getItem('itt05-reddit-links'));
    await page.fill('[name="title"]', '  ');
    await page.locator('[data-reddit-submit] button[type="submit"]').click();
    await page.waitForTimeout(300);
    const redditAfter = await page.evaluate(() => localStorage.getItem('itt05-reddit-links'));
    expect(redditAfter).toBe(redditBefore);
    expect(redditAfter || '').not.toMatch(/untitled/i);
  });
});
