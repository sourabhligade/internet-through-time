// @ts-check
const { test, expect } = require('@playwright/test');

test.describe('2012 leftover densify copy', () => {
  test('About dual scale + NetCraft jump + bans', async ({ page }) => {
    await page.goto('/years/2012/pages/about.html');
    await expect(page.locator('body')).toContainText('697,089,489');
    await expect(page.locator('body')).toContainText('634 million');
    await expect(page.locator('body')).toContainText(/40 million|wildcard/i);
    await expect(page.locator('body')).toContainText(/Stories|Vine|Windows 8/i);
    await expect(page.locator('body')).toContainText(/Spotify|15 million/i);
    await expect(page.locator('body')).toContainText(/Lilyhammer|House of Cards/i);
  });

  test('home guided + connection trails', async ({ page }) => {
    await page.goto('/years/2012/pages/home.html');
    await expect(page.locator('body')).toContainText(/Connection trails|Guided multi-step/i);
    await expect(page.locator('a[href*="instagram/android"]').first()).toBeVisible();
    await expect(page.locator('a[href*="facebook/ipo"]').first()).toBeVisible();
  });

  test('iPhone 5 prints Lightning + $199/$299/$399', async ({ page }) => {
    await page.goto('/years/2012/sites/iphone/index.html');
    await expect(page.locator('body')).toContainText('Lightning');
    await expect(page.locator('body')).toContainText('$199');
    await expect(page.locator('body')).toContainText('$399');
    await expect(page.locator('body')).toContainText(/EarPods|Schiller|28 Sep/i);
  });

  test('Win8 is late product not January shell', async ({ page }) => {
    await page.goto('/years/2012/sites/windows8/index.html');
    await expect(page.locator('body')).toContainText(/26 Oct|Windows 7/i);
    await expect(page.locator('body')).toContainText(/Start/i);
    await expect(page.locator('body')).toContainText('$39.99');
  });

  test('Chrome prints StatCounter 32.43 / 32.12 / 25.55', async ({ page }) => {
    await page.goto('/years/2012/sites/chrome/index.html');
    await expect(page.locator('body')).toContainText('32.43');
    await expect(page.locator('body')).toContainText('32.12');
    await expect(page.locator('body')).toContainText('25.55');
    await expect(page.locator('body')).toContainText(/IE still|#1 in the US/i);
  });

  test('YouTube Gangnam play + share dests live', async ({ page }) => {
    await page.goto('/years/2012/sites/youtube/index.html');
    await expect(page.locator('body')).toContainText(/Gangnam|1 billion/i);
    await expect(page.locator('[data-yt-play]')).toBeVisible();
    await page.locator('[data-yt-play]').click();
    await expect(page.locator('[data-yt-share-bridges] a').first()).toBeVisible({ timeout: 15000 });
    const hrefs = await page.locator('[data-yt-share-bridges] a').evaluateAll((as) =>
      as.map((a) => a.getAttribute('href') || '')
    );
    expect(hrefs.join(' ')).not.toMatch(/youtube\/about\.html|digg\/submit/);
    for (const h of hrefs) {
      const url = new URL(h, page.url());
      expect((await page.request.get(url.pathname)).status(), url.pathname).toBe(200);
    }
  });

  test('Guess Doodle cabinet exists and game starts without writing', async ({ page }) => {
    await page.goto('/years/2012/sites/playable/index.html');
    await expect(page.locator('body')).not.toContainText(/No year game cabinet/i);
    await expect(page.locator('body')).toContainText(/Guess Doodle/i);
    await page.goto('/years/2012/sites/playable/game.html');
    await expect(page.locator('[data-game-start]')).toBeVisible();
    await page.evaluate(() => localStorage.removeItem('itt12-game-guessdoodle'));
    await page.reload();
    await expect(page.evaluate(() => localStorage.getItem('itt12-game-guessdoodle'))).resolves.toBeFalsy();
    await page.locator('[data-game-start]').click();
    await expect(page.locator('[data-done]')).toBeVisible();
    expect(await page.evaluate(() => localStorage.getItem('itt12-game-guessdoodle'))).toBeFalsy();
    await page.locator('[data-done]').click();
    await expect(page.locator('[data-doodle-guess]').first()).toBeVisible();
    expect(await page.evaluate(() => localStorage.getItem('itt12-game-guessdoodle'))).toBeFalsy();
    const n = await page.locator('[data-doodle-guess]').count();
    for (let i = 0; i < n; i++) {
      await page.locator('[data-doodle-guess]').nth(i).click();
      if (await page.evaluate(() => localStorage.getItem('itt12-game-guessdoodle'))) break;
    }
    await expect.poll(async () => page.evaluate(() => localStorage.getItem('itt12-game-guessdoodle'))).toBeTruthy();
  });

  test('home leftover chips Spotify Netflix Gmail', async ({ page }) => {
    await page.goto('/years/2012/pages/home.html');
    await expect(page.locator('body')).toContainText(/Spotify US residual/i);
    await expect(page.locator('body')).toContainText(/Lilyhammer/i);
    await expect(page.locator('body')).toContainText(/425 million/i);
    await expect(page.locator('body')).toContainText(/House of Cards premieres 1 Feb 2013/i);
  });
});
