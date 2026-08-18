// @ts-check
/**
 * 2014 flows — incomplete blocked then REAL write
 */
const { test, expect } = require('@playwright/test');
const { enterYear, contentFrame } = require('./helpers');

async function clearKeys(page, keys) {
  await page.evaluate((ks) => {
    ks.forEach((k) => {
      try {
        localStorage.removeItem(k);
      } catch (e) { /* */ }
    });
  }, keys);
}

test.describe('2014 flows', () => {
  test('A hub card → Win7 / IE9 → Starting Point', async ({ page }) => {
    await page.goto('/');
    await page.locator('a.year-card.available[data-year="2014"]').click();
    await expect(page).toHaveURL(/\/years\/2014/);
    await enterYear(page, '2014');
    await expect(contentFrame(page).locator('body')).toContainText(/WhatsApp|Starting Point|messaging/i);
  });

  test('B thesis literacy writes itt14-thesis-ack', async ({ page }) => {
    await page.goto('/years/2014/pages/about.html');
    await clearKeys(page, ['itt14-thesis-ack']);
    await page.reload();
    await page.locator('[data-itt-real-save][data-storage-key="thesis-ack"]').click();
    expect(await page.evaluate(() => localStorage.getItem('itt14-thesis-ack'))).toBeFalsy();
    await page.locator('[data-thesis-req]').nth(0).check({ force: true });
    await page.locator('[data-thesis-req]').nth(1).check({ force: true });
    await page.locator('[data-itt-real-save][data-storage-key="thesis-ack"]').click();
    await expect.poll(async () => page.evaluate(() => localStorage.getItem('itt14-thesis-ack'))).toBeTruthy();
  });

  test('C WhatsApp two checks write itt14-wa-install', async ({ page }) => {
    await page.goto('/years/2014/sites/whatsapp/index.html');
    await clearKeys(page, ['itt14-wa-install', 'itt14-wa']);
    await page.reload();
    await page.locator('[data-wa-install]').click();
    expect(await page.evaluate(() => localStorage.getItem('itt14-wa-install'))).toBeFalsy();
    await page.locator('[data-req]').nth(0).check({ force: true });
    await page.locator('[data-req]').nth(1).check({ force: true });
    await page.locator('[data-wa-install]').click();
    await expect.poll(async () => page.evaluate(() => localStorage.getItem('itt14-wa-install'))).toMatch(/whatsapp|real/i);
  });

  test('D Heartbleed two checks write itt14-heartbleed', async ({ page }) => {
    await page.goto('/years/2014/sites/heartbleed/index.html');
    await clearKeys(page, ['itt14-heartbleed']);
    await page.reload();
    await page.locator('[data-hb-ack]').click();
    expect(await page.evaluate(() => localStorage.getItem('itt14-heartbleed'))).toBeFalsy();
    await page.locator('[data-req]').nth(0).check({ force: true });
    await page.locator('[data-req]').nth(1).check({ force: true });
    await page.locator('[data-hb-ack]').click();
    await expect.poll(async () => page.evaluate(() => localStorage.getItem('itt14-heartbleed'))).toMatch(/2014-0160|real/i);
  });

  test('E Ice Bucket writes itt14-icebucket', async ({ page }) => {
    await page.goto('/years/2014/sites/icebucket/index.html');
    await clearKeys(page, ['itt14-icebucket']);
    await page.reload();
    await page.locator('[data-ice-nominate]').fill('flow residual');
    await page.locator('[data-ice-req]').check({ force: true });
    await page.locator('[data-ice-dump]').click();
    await expect.poll(async () => page.evaluate(() => localStorage.getItem('itt14-icebucket'))).toBeTruthy();
  });

  test('F iPhone 6 sku + size write itt14-iphone6', async ({ page }) => {
    await page.goto('/years/2014/sites/iphone/index.html');
    await clearKeys(page, ['itt14-iphone6']);
    await page.reload();
    await page.locator('[data-iphone6-order]').click();
    expect(await page.evaluate(() => localStorage.getItem('itt14-iphone6'))).toBeFalsy();
    await page.locator('[name="iphone6-sku"]').first().check({ force: true });
    await page.locator('[name="iphone6-size"]').first().check({ force: true });
    await page.locator('[data-iphone6-order]').click();
    await expect.poll(async () => page.evaluate(() => localStorage.getItem('itt14-iphone6'))).toMatch(/iphone-6|real/i);
  });

  test('G iOS 8 two notes write itt14-ios8', async ({ page }) => {
    await page.goto('/years/2014/sites/iphone/ios8.html');
    await clearKeys(page, ['itt14-ios8']);
    await page.reload();
    await page.locator('[data-ios8-ack]').click();
    expect(await page.evaluate(() => localStorage.getItem('itt14-ios8'))).toBeFalsy();
    await page.locator('[data-req]').nth(0).check({ force: true });
    await page.locator('[data-req]').nth(1).check({ force: true });
    await page.locator('[data-ios8-ack]').click();
    await expect.poll(async () => page.evaluate(() => localStorage.getItem('itt14-ios8'))).toMatch(/ios8|real/i);
  });

  test('H Apple Pay two notes write itt14-applepay', async ({ page }) => {
    await page.goto('/years/2014/sites/iphone/pay.html');
    await clearKeys(page, ['itt14-applepay']);
    await page.reload();
    await page.locator('[data-pay-tap]').click();
    expect(await page.evaluate(() => localStorage.getItem('itt14-applepay'))).toBeFalsy();
    await page.locator('[data-req]').nth(0).check({ force: true });
    await page.locator('[data-req]').nth(1).check({ force: true });
    await page.locator('[data-pay-tap]').click();
    await expect.poll(async () => page.evaluate(() => localStorage.getItem('itt14-applepay'))).toMatch(/tap|real/i);
  });

  test('home guided targets live', async ({ page }) => {
    await page.goto('/years/2014/pages/home.html');
    await expect(page.locator('body')).toContainText(/Connection trails|Guided multi-step/i);
    const hrefs = ['whatsapp/index', 'heartbleed/index', 'icebucket/index', 'iphone/index'];
    for (const h of hrefs) {
      await expect(page.locator(`a[href*="${h}"]`).first()).toBeVisible();
    }
  });

  test('no itt13 / itt15 writes from 2014 pages', async ({ page }) => {
    await page.goto('/years/2014/sites/whatsapp/index.html');
    await page.locator('[data-req]').nth(0).check({ force: true });
    await page.locator('[data-req]').nth(1).check({ force: true });
    await page.locator('[data-wa-install]').click();
    expect(await page.evaluate(() => Object.keys(localStorage).some((k) => k.indexOf('itt13') === 0 || k.indexOf('itt15') === 0))).toBeFalsy();
  });

  test('C2 chat empty never writes then REAL itt14-wa-chat', async ({ page }) => {
    await page.goto('/years/2014/sites/whatsapp/chat.html');
    await clearKeys(page, ['itt14-wa-chat']);
    await page.reload();
    await page.locator('[data-wa-send]').click();
    expect(await page.evaluate(() => localStorage.getItem('itt14-wa-chat'))).toBeFalsy();
    await page.locator('[data-wa-msg]').fill('ok');
    await page.locator('[data-wa-send]').click();
    await expect.poll(async () => page.evaluate(() => localStorage.getItem('itt14-wa-chat'))).toMatch(/ok|real/i);
  });

  test('J Material two notes write itt14-material', async ({ page }) => {
    await page.goto('/years/2014/sites/material/index.html');
    await clearKeys(page, ['itt14-material']);
    await page.reload();
    await page.locator('[data-material-ack]').click();
    expect(await page.evaluate(() => localStorage.getItem('itt14-material'))).toBeFalsy();
    await page.locator('[data-req]').nth(0).check({ force: true });
    await page.locator('[data-req]').nth(1).check({ force: true });
    await page.locator('[data-material-ack]').click();
    await expect.poll(async () => page.evaluate(() => localStorage.getItem('itt14-material'))).toMatch(/real/i);
  });

  test('K Slack empty never writes then REAL itt14-slack', async ({ page }) => {
    await page.goto('/years/2014/sites/slack/index.html');
    await clearKeys(page, ['itt14-slack']);
    await page.reload();
    await page.locator('[data-slack-join]').click();
    expect(await page.evaluate(() => localStorage.getItem('itt14-slack'))).toBeFalsy();
    await page.locator('[data-slack-ws]').fill('museum');
    await page.locator('[data-slack-join]').click();
    await expect.poll(async () => page.evaluate(() => localStorage.getItem('itt14-slack'))).toMatch(/museum|real/i);
  });

  test('L Twitch two notes write itt14-twitch', async ({ page }) => {
    await page.goto('/years/2014/sites/twitch/index.html');
    await clearKeys(page, ['itt14-twitch']);
    await page.reload();
    await page.locator('[data-twitch-ack]').click();
    expect(await page.evaluate(() => localStorage.getItem('itt14-twitch'))).toBeFalsy();
    await page.locator('[data-req]').nth(0).check({ force: true });
    await page.locator('[data-req]').nth(1).check({ force: true });
    await page.locator('[data-twitch-ack]').click();
    await expect.poll(async () => page.evaluate(() => localStorage.getItem('itt14-twitch'))).toMatch(/real/i);
  });

  test('N Facebook deal 0–1 never writes then REAL itt14-fb', async ({ page }) => {
    await page.goto('/years/2014/sites/facebook/index.html');
    await clearKeys(page, ['itt14-fb']);
    await page.reload();
    await page.locator('[data-fb-deal-ack]').click();
    expect(await page.evaluate(() => localStorage.getItem('itt14-fb'))).toBeFalsy();
    await page.locator('[data-req]').nth(0).check({ force: true });
    await page.locator('[data-fb-deal-ack]').click();
    expect(await page.evaluate(() => localStorage.getItem('itt14-fb'))).toBeFalsy();
    await page.locator('[data-req]').nth(1).check({ force: true });
    await page.locator('[data-fb-deal-ack]').click();
    await expect.poll(async () => page.evaluate(() => localStorage.getItem('itt14-fb'))).toMatch(/real/i);
  });

  test('P Chrome <3 never writes then 3-check REAL itt14-chrome', async ({ page }) => {
    await page.goto('/years/2014/sites/chrome/index.html');
    await clearKeys(page, ['itt14-chrome']);
    await page.reload();
    await page.locator('[data-chrome-download]').click();
    expect(await page.evaluate(() => localStorage.getItem('itt14-chrome'))).toBeFalsy();
    await page.locator('[data-chrome-req]').nth(0).check({ force: true });
    await page.locator('[data-chrome-req]').nth(1).check({ force: true });
    await page.locator('[data-chrome-download]').click();
    expect(await page.evaluate(() => localStorage.getItem('itt14-chrome'))).toBeFalsy();
    await page.locator('[data-chrome-req]').nth(2).check({ force: true });
    await page.locator('[data-chrome-download]').click();
    await expect.poll(async () => page.evaluate(() => localStorage.getItem('itt14-chrome'))).toBeTruthy();
  });

  test('M Twitter compose empty blocked then 140 leftover writes', async ({ page }) => {
    await page.goto('/years/2014/sites/twitter/index.html');
    await clearKeys(page, ['itt14-tweets']);
    await page.reload();
    await page.locator('[data-twitter-compose] button[type="submit"]').click();
    expect(await page.evaluate(() => localStorage.getItem('itt14-tweets'))).toBeFalsy();
    await page.locator('[data-twitter-status]').fill('still 140');
    await page.locator('[data-twitter-compose] button[type="submit"]').click();
    await expect.poll(async () => page.evaluate(() => localStorage.getItem('itt14-tweets'))).toMatch(/still 140/);
  });

  test('R guided 6 dests live and stay 6', async ({ page }) => {
    await page.goto('/years/2014/pages/home.html');
    const lis = page.locator('#ott-guided-2014 ol > li');
    await expect(lis).toHaveCount(6);
    const hrefs = [
      'about.html',
      'whatsapp/index',
      'heartbleed/index',
      'icebucket/index',
      'iphone/index',
      'map.html',
    ];
    for (const h of hrefs) {
      const a = page.locator(`#ott-guided-2014 a[href*="${h}"]`).first();
      await expect(a).toBeVisible();
      const href = await a.getAttribute('href');
      const dest = new URL(href || '', page.url());
      expect((await page.request.get(dest.pathname)).status(), dest.pathname).toBe(200);
    }
  });

  test('T map lists on-disk rooms and dests are 200', async ({ page }) => {
    await page.goto('/years/2014/pages/map.html');
    const links = page.locator('ul a[href]');
    const n = await links.count();
    expect(n).toBeGreaterThanOrEqual(16);
    for (let i = 0; i < n; i++) {
      const href = await links.nth(i).getAttribute('href');
      const dest = new URL(href || '', page.url());
      if (!dest.pathname.startsWith('/years/2014/')) continue;
      expect((await page.request.get(dest.pathname)).status(), dest.pathname).toBe(200);
    }
  });

  test('T famous mines + snake load and start never writes', async ({ page }) => {
    await page.goto('/years/2014/sites/playable/famous.html');
    await page.evaluate(() => {
      localStorage.removeItem('itt14-game-mines');
      localStorage.removeItem('itt14-game-snake');
    });
    await page.reload();
    await expect(page.locator('[data-famous="mines"]')).toBeVisible();
    await expect(page.locator('[data-famous="snake"]')).toBeVisible();
    await page.locator('[data-famous="mines"] [data-game-start]').click();
    await page.locator('[data-famous="snake"] [data-game-start]').click();
    expect(await page.evaluate(() => localStorage.getItem('itt14-game-mines'))).toBeFalsy();
    expect(await page.evaluate(() => localStorage.getItem('itt14-game-snake'))).toBeFalsy();
  });

  test('Ice Bucket empty nominate never writes', async ({ page }) => {
    await page.goto('/years/2014/sites/icebucket/index.html');
    await clearKeys(page, ['itt14-icebucket']);
    await page.reload();
    await page.locator('[data-ice-req]').check({ force: true });
    await page.locator('[data-ice-dump]').click();
    expect(await page.evaluate(() => localStorage.getItem('itt14-icebucket'))).toBeFalsy();
  });

  test('YouTube share dests are live 2014 rooms', async ({ page }) => {
    await page.goto('/years/2014/sites/youtube/index.html');
    await page.waitForTimeout(400);
    const hrefs = await page.locator('[data-yt-share-bridges] a[href]').evaluateAll((els) =>
      els.map((a) => a.getAttribute('href') || '')
    );
    expect(hrefs.length).toBeGreaterThan(0);
    expect(hrefs.join(' ')).not.toMatch(/digg\/submit/);
    for (const href of hrefs) {
      const dest = new URL(href, page.url());
      expect((await page.request.get(dest.pathname)).status(), dest.pathname).toBe(200);
    }
  });
});
