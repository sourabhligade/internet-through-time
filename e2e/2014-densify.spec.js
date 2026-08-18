// @ts-check
const { test, expect } = require('@playwright/test');

test.describe('2014 leftover densify copy', () => {
  test('About dual scale + 1B + money cites + bans', async ({ page }) => {
    await page.goto('/years/2014/pages/about.html');
    await expect(page.locator('body')).toContainText('968,882,453');
    await expect(page.locator('body')).toContainText(/1 billion|1B/i);
    await expect(page.locator('body')).toContainText('$16');
    await expect(page.locator('body')).toContainText('$19');
    await expect(page.locator('body')).toContainText('CVE-2014-0160');
    await expect(page.locator('body')).toContainText(/Stories|TikTok|Windows 10/i);
    await expect(page.locator('body')).toContainText(/Watch/i);
  });

  test('home guided + connection trails', async ({ page }) => {
    await page.goto('/years/2014/pages/home.html');
    await expect(page.locator('body')).toContainText(/Connection trails|Guided multi-step/i);
    await expect(page.locator('a[href*="whatsapp/index"]').first()).toBeVisible();
    await expect(page.locator('a[href*="heartbleed"]').first()).toBeVisible();
    await expect(page.locator('a[href*="icebucket"]').first()).toBeVisible();
  });

  test('iPhone 6 prints 6 Plus + Watch ships 2015', async ({ page }) => {
    await page.goto('/years/2014/sites/iphone/index.html');
    await expect(page.locator('body')).toContainText('iPhone 6');
    await expect(page.locator('body')).toContainText('6 Plus');
    await expect(page.locator('body')).toContainText(/9 Sep|19 Sep/i);
    await expect(page.locator('body')).toContainText(/2015/i);
  });

  test('Tile Fold cabinet exists and start never writes', async ({ page }) => {
    await page.goto('/years/2014/sites/playable/index.html');
    await expect(page.locator('body')).not.toContainText(/No year game cabinet/i);
    await expect(page.locator('body')).toContainText(/Tile Fold/i);
    await page.goto('/years/2014/sites/playable/game.html');
    await expect(page.locator('[data-game-start]')).toBeVisible();
    await page.evaluate(() => localStorage.removeItem('itt14-game-tilefold'));
    await page.reload();
    await expect(page.evaluate(() => localStorage.getItem('itt14-game-tilefold'))).resolves.toBeFalsy();
    await page.locator('[data-game-start]').click();
    await expect(page.locator('[data-tile-board]')).toBeVisible();
    expect(await page.evaluate(() => localStorage.getItem('itt14-game-tilefold'))).toBeFalsy();
  });

  test('error pages point at live 2014 dests', async ({ page }) => {
    await page.goto('/years/2014/pages/error/404.html');
    await expect(page.locator('a[href*="vine"], a[href*="snowden"]')).toHaveCount(0);
    expect((await page.request.get('/years/2014/pages/home.html')).status()).toBe(200);
    expect((await page.request.get('/years/2014/sites/whatsapp/index.html')).status()).toBe(200);
    expect((await page.request.get('/years/2014/sites/heartbleed/index.html')).status()).toBe(200);
    await page.goto('/years/2014/pages/error/unreachable.html');
    await expect(page.locator('a[href*="vine"], a[href*="snowden"]')).toHaveCount(0);
    await expect(page.locator('a[href*="whatsapp"]').first()).toBeVisible();
  });

  test('leftover rooms load', async ({ page }) => {
    await page.goto('/years/2014/sites/material/index.html');
    await expect(page.locator('body')).toContainText(/Material|Lollipop/i);
    await page.goto('/years/2014/sites/slack/index.html');
    await expect(page.locator('[data-slack-join]')).toBeVisible();
    await page.goto('/years/2014/sites/twitch/index.html');
    await expect(page.locator('body')).toContainText(/Amazon|25 Aug/i);
    await page.goto('/years/2014/sites/facebook/index.html');
    await expect(page.locator('body')).toContainText(/\$16|\$19/i);
    await page.goto('/years/2014/sites/twitter/index.html');
    await expect(page.locator('body')).toContainText(/140/i);
    await page.goto('/years/2014/sites/youtube/index.html');
    await expect(page.locator('[data-yt-play]')).toBeVisible();
    await page.goto('/years/2014/sites/chrome/index.html');
    await expect(page.locator('[data-chrome-download]')).toBeVisible();
  });

  test('five year-games exist and pack start never writes', async ({ page }) => {
    for (const file of ['game.html', 'game-2.html', 'game-3.html', 'game-4.html', 'game-5.html']) {
      const res = await page.goto(`/years/2014/sites/playable/${file}`);
      expect(res && res.ok(), file).toBeTruthy();
    }
    await page.goto('/years/2014/sites/playable/game-2.html');
    await page.evaluate(() => localStorage.removeItem('itt14-game-icehold'));
    await page.reload();
    await page.locator('[data-pack-finish]').click();
    expect(await page.evaluate(() => localStorage.getItem('itt14-game-icehold'))).toBeFalsy();
  });

  test('50 trail dests are live on-disk rooms', async ({ page }) => {
    const fs = require('fs');
    const path = require('path');
    const root = path.join(__dirname, '..');
    const base = fs.readFileSync(path.join(root, 'js/config/flow-trails.js'), 'utf8');
    const extra = fs.readFileSync(path.join(root, 'js/config/flow-trails-5x.js'), 'utf8');
    const hrefs = [];
    const re = /"href"\s*:\s*"(sites\/[^"]+|pages\/[^"]+)"/g;
    const slice14 = (src) => {
      const i = src.indexOf('"2014"');
      if (i < 0) return '';
      const j = src.indexOf(']', i);
      return src.slice(i, j + 1);
    };
    for (const src of [slice14(base), slice14(extra)]) {
      let m;
      while ((m = re.exec(src))) hrefs.push(m[1]);
      re.lastIndex = 0;
    }
    const uniq = [...new Set(hrefs)];
    expect(uniq.length, 'trail hrefs').toBeGreaterThanOrEqual(10);
    for (const href of uniq) {
      const res = await page.request.get(`/years/2014/${href}`);
      expect(res.status(), href).toBe(200);
    }
  });

  test('home leftover chips Slack Twitch Material Watch', async ({ page }) => {
    await page.goto('/years/2014/pages/home.html');
    await expect(page.locator('body')).toContainText(/Slack/i);
    await expect(page.locator('body')).toContainText(/Twitch/i);
    await expect(page.locator('body')).toContainText(/Material/i);
    await expect(page.locator('body')).toContainText(/Watch/i);
    await expect(page.locator('body')).toContainText(/Windows 10/i);
  });
});
