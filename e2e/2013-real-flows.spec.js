// @ts-check
const { test, expect } = require('@playwright/test');

async function clearKeys(page, keys) {
  await page.evaluate((ks) => {
    try {
      ks.forEach((k) => localStorage.removeItem(k));
    } catch (e) {
      /* */
    }
  }, keys);
}

async function expectStorageTruthy(page, key) {
  const raw = await page.evaluate((k) => localStorage.getItem(k), key);
  expect(raw, `missing ${key}`).toBeTruthy();
  return raw || '';
}

test.describe('2013 real flows (storage required)', () => {
  test('Vine hold incomplete blocked; post writes itt13-vine-posts', async ({ page }) => {
    await page.goto('/years/2013/sites/vine/record.html');
    await clearKeys(page, ['itt13-vine', 'itt13-vine-list', 'itt13-vine-posts']);
    await page.reload();
    const post = page.locator('[data-vine-post]');
    await expect(post).toBeVisible({ timeout: 15000 });
    await post.click();
    await page.waitForTimeout(120);
    expect(await page.evaluate(() => localStorage.getItem('itt13-vine-posts'))).toBeFalsy();
    const hold = page.locator('[data-vine-hold]');
    await hold.dispatchEvent('pointerdown');
    await page.waitForTimeout(450);
    await hold.dispatchEvent('pointerup');
    await page.locator('[data-vine-caption]').fill('museum 6s loop');
    await post.click();
    await expect
      .poll(async () => page.evaluate(() => localStorage.getItem('itt13-vine-posts')))
      .toMatch(/museum 6s loop|multiStep|real/i);
  });

  test('Slack fillGo empty blocked; join writes itt13-slack', async ({ page }) => {
    await page.goto('/years/2013/sites/slack/index.html');
    await clearKeys(page, ['itt13-slack']);
    await page.reload();
    await page.locator('[data-pack-go]').click();
    await page.waitForTimeout(120);
    expect(await page.evaluate(() => localStorage.getItem('itt13-slack'))).toBeFalsy();
    await page.fill('[data-pack-q]', 'museum-hq');
    await page.locator('[data-pack-go]').click();
    await expect
      .poll(async () => page.evaluate(() => localStorage.getItem('itt13-slack')))
      .toBeTruthy();
  });

  test('IG video share storage', async ({ page }) => {
    await page.goto('/years/2013/sites/instagram/video.html');
    await clearKeys(page, ['itt13-ig-video']);
    await page.reload();
    await page.locator('[data-igv-share]').click();
    expect(await page.evaluate(() => localStorage.getItem('itt13-ig-video'))).toBeFalsy();
    await page.locator('[data-igv-filter="Cinema"]').click();
    await page.locator('[data-igv-caption]').fill('15s cinema residual');
    await page.locator('[data-igv-share]').click();
    const raw = await expectStorageTruthy(page, 'itt13-ig-video');
    expect(raw).toMatch(/Cinema|15/i);
  });

  test('Snap story storage', async ({ page }) => {
    await page.goto('/years/2013/sites/snapchat/story.html');
    await clearKeys(page, ['itt13-snap-story']);
    await page.reload();
    await page.locator('[data-snap-story-add]').click();
    expect(await page.evaluate(() => localStorage.getItem('itt13-snap-story'))).toBeFalsy();
    await page.locator('[data-snap-not-ig]').check();
    await page.locator('[data-snap-story-add]').click();
    const raw = await expectStorageTruthy(page, 'itt13-snap-story');
    expect(raw).toMatch(/expires|24/);
    await expect(page.locator('body')).toContainText(/24h/i);
    await page.locator('[data-snap-clock-24]').click();
    await expect(page.locator('[data-snap-expired]')).toContainText(/expired/i);
  });

  test('5c ack storage', async ({ page }) => {
    await page.goto('/years/2013/sites/iphone/5c.html');
    await clearKeys(page, ['itt13-iphone5c']);
    await page.reload();
    await page.waitForTimeout(500);
    await expect(page.locator('[data-5c-claim]')).toBeDisabled();
    expect(await page.evaluate(() => localStorage.getItem('itt13-iphone5c'))).toBeFalsy();
    await page.locator('[data-5c-color]').first().click();
    await page.locator('[data-5c-claim]').click();
    await expectStorageTruthy(page, 'itt13-iphone5c');
  });

  test('Chrome three checks write itt13-chrome; one-click gone', async ({ page }) => {
    await page.goto('/years/2013/sites/chrome/index.html');
    await expect(page.locator('body')).toContainText(/Chrome|browser|download|StatCounter/i);
    await expect(page.locator('body')).toContainText(/2013/);
    await clearKeys(page, ['itt13-chrome']);
    await page.reload();
    await page.waitForTimeout(600);
    expect(await page.locator('[data-chrome-download]').count()).toBe(0);
    await page.locator('[data-chrome13-save]').click();
    await page.waitForTimeout(120);
    expect(await page.evaluate(() => localStorage.getItem('itt13-chrome'))).toBeFalsy();
    await page.locator('[data-chrome13-habit]').check();
    await page.locator('[data-chrome13-not-edge]').check();
    await page.locator('[data-chrome13-dl]').check();
    await page.locator('[data-chrome13-save]').click();
    const raw = await expectStorageTruthy(page, 'itt13-chrome');
    expect(raw).toMatch(/habit|downloaded|real/i);
  });

  test('Snap index send + Stories link', async ({ page }) => {
    await page.goto('/years/2013/sites/snapchat/index.html');
    await clearKeys(page, ['itt13-snap-count', 'itt13-snap-last-timer']);
    await page.reload();
    await page.waitForTimeout(600);
    await expect(page.locator('a[href*="story"]').first()).toBeVisible();
    await page.locator('[data-snap-not-stories]').check();
    await page.locator('[data-snap-send]').click();
    await page.locator('[data-snap-send]').click();
    await expectStorageTruthy(page, 'itt13-snap-count');
  });

  test('FB Home flop room storage', async ({ page }) => {
    await page.goto('/years/2013/sites/facebook/home.html');
    await expect(page.locator('body')).toContainText(/Facebook Home|launcher|HTC|flop/i);
    await clearKeys(page, ['itt13-fb-home']);
    await page.reload();
    await page.waitForTimeout(500);
    await page.locator('[data-fb-home-install]').click();
    await page.locator('[data-fb-home-flop]').click();
    await expectStorageTruthy(page, 'itt13-fb-home');
  });

  test('HealthCare.gov ack storage', async ({ page }) => {
    await page.goto('/years/2013/sites/healthcare/index.html');
    await clearKeys(page, ['itt13-healthcare-ack']);
    await page.reload();
    await page.locator('[data-hc-email]').fill('you@example.com');
    await page.locator('[data-hc-try="1"]').click();
    await expect(page.locator('[data-hc-try="2"]')).toBeVisible({ timeout: 5000 });
    await page.locator('[data-hc-try="2"]').click();
    await expect(page.locator('[data-healthcare-ack]')).toBeVisible({ timeout: 5000 });
    await page.locator('[data-req]').nth(0).check();
    await page.locator('[data-req]').nth(1).check();
    await page.locator('[data-healthcare-ack]').click();
    await expectStorageTruthy(page, 'itt13-healthcare-ack');
  });

  test('iPad Air interest storage', async ({ page }) => {
    await page.goto('/years/2013/sites/ipad/air.html');
    await clearKeys(page, ['itt13-ipadair']);
    await page.reload();
    await page.waitForTimeout(500);
    await page.locator('[data-air-cfg="cellular"]').click();
    await page.locator('[data-air-mini]').click();
    await page.locator('[data-ipadair-claim]').click();
    await expectStorageTruthy(page, 'itt13-ipadair');
  });

  test('UberX request storage', async ({ page }) => {
    await page.goto('/years/2013/sites/uber/index.html');
    await clearKeys(page, ['itt13-uber']);
    await page.reload();
    await page.waitForTimeout(500);
    await page.locator('#uber-x, [data-uber-kind="uberx"]').first().click();
    await page.locator('[data-uber-confirm]').click();
    const raw = await expectStorageTruthy(page, 'itt13-uber');
    expect(raw).toMatch(/multiStep|uber|checks/i);
  });

  test('Spotify invite writes itt13-spotify*', async ({ page }) => {
    await page.goto('/years/2013/sites/spotify/index.html');
    await page.evaluate(() => {
      try {
        Object.keys(localStorage)
          .filter((k) => k.indexOf('itt13-spotify') === 0)
          .forEach((k) => localStorage.removeItem(k));
      } catch (e) {
        /* */
      }
    });
    await page.reload();
    await page.waitForTimeout(500);
    await page.locator('[data-spotify-ack]').check();
    await page.locator('[data-spotify-no-stream]').check();
    await page.locator('[data-spotify-invite]').first().click();
    const n = await page.evaluate(() => {
      let c = 0;
      for (let i = 0; i < localStorage.length; i++) {
        const k = localStorage.key(i);
        if (k && k.indexOf('itt13-spotify') === 0) c++;
      }
      return c;
    });
    expect(n).toBeGreaterThan(0);
  });
});

