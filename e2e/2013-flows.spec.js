// @ts-check
/**
 * 2013 flows A–T — real localStorage (itt13)
 */
const { test, expect } = require('@playwright/test');
const { enterYear, waitKey } = require('./helpers');

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
  const raw = await waitKey(page, key, { timeout: 10000 });
  expect(raw, `missing ${key}`).toBeTruthy();
  return raw || '';
}

async function killOverlays(page) {
  await page.evaluate(() => {
    try {
      document.querySelectorAll('.modal-backdrop, #modal-backdrop, #connect-overlay').forEach((el) => {
        el.classList.add('hidden');
        el.style.display = 'none';
      });
      document.querySelectorAll('.dialog').forEach((el) => el.classList.add('hidden'));
    } catch (e) {
      /* */
    }
  });
}

test.describe('2013 flows A–T (real storage)', () => {
  test('A enter year — shell boot', async ({ page }) => {
    await enterYear(page, '2013');
    await expect(page.locator('body')).toHaveAttribute('data-itt-year', '2013');
    const last = await page.evaluate(() => localStorage.getItem('itt-last-year'));
    expect(last).toBe('2013');
  });

  test('B thesis about — dual scale + ack', async ({ page }) => {
    await page.goto('/years/2013/pages/about.html');
    await expect(page.locator('body')).toContainText('672,985,183');
    await clearKeys(page, ['itt13-thesis-ack']);
    await page.reload();
    await expect(page.locator('[data-thesis-req]').first()).toBeVisible({ timeout: 10000 });
    await page.locator('[data-thesis-req]').evaluateAll((els) =>
      els.forEach((e) => {
        e.checked = true;
        e.dispatchEvent(new Event('change', { bubbles: true }));
      })
    );
    await page.locator('[data-thesis-ack]').click();
    await expectStorageTruthy(page, 'itt13-thesis-ack');
  });

  test('C Vine post — real storage', async ({ page }) => {
    await page.goto('/years/2013/sites/vine/record.html');
    await clearKeys(page, ['itt13-vine-posts']);
    await page.reload();
    await page.locator('[data-vine-hold]').dispatchEvent('mousedown');
    await page.waitForTimeout(350); // product timer: Vine hold-to-record
    await page.locator('[data-vine-hold]').dispatchEvent('mouseup');
    await page.locator('[data-vine-post]').click();
    const raw = await expectStorageTruthy(page, 'itt13-vine-posts');
    expect(raw.length).toBeGreaterThan(5);
  });

  test('D Instagram Video share', async ({ page }) => {
    await page.goto('/years/2013/sites/instagram/video.html');
    await clearKeys(page, ['itt13-ig-video']);
    await page.reload();
    await page.locator('[data-igv-filter="Cinema"]').click();
    await page.locator('[data-igv-caption]').fill('15s cinema residual');
    await page.locator('[data-igv-share]').click();
    const raw = await expectStorageTruthy(page, 'itt13-ig-video');
    expect(raw).toMatch(/15|filter|Normal|Cinema/i);
  });

  test('E Snapchat Story add', async ({ page }) => {
    await page.goto('/years/2013/sites/snapchat/story.html');
    await clearKeys(page, ['itt13-snap-story']);
    await page.reload();
    await page.locator('[data-snap-not-ig]').check();
    await page.locator('[data-snap-story-add]').click();
    const raw = await expectStorageTruthy(page, 'itt13-snap-story');
    expect(raw).toMatch(/24|snap/i);
  });

  test('F iOS 7 ack', async ({ page }) => {
    await page.goto('/years/2013/sites/iphone/ios7.html');
    await clearKeys(page, ['itt13-ios7']);
    await page.reload();
    await expect(page.locator('[data-ios7-tile]').first()).toBeVisible({ timeout: 10000 });
    await expect(page.locator('[data-ios7-before]')).toBeVisible();
    await expect(page.locator('[data-ios7-after]')).toBeVisible();
    await page.locator('[data-ios7-tile]').nth(0).click();
    await page.locator('[data-ios7-tile]').nth(1).click();
    expect(await page.evaluate(() => localStorage.getItem('itt13-ios7'))).toBeFalsy();
    await page.locator('[data-ios7-change]').first().check();
    await expectStorageTruthy(page, 'itt13-ios7');
  });

  test('G Touch ID + 5s + 5c claims', async ({ page }) => {
    await page.goto('/years/2013/sites/iphone/touchid.html');
    await clearKeys(page, ['itt13-touchid', 'itt13-iphone5s', 'itt13-iphone5c']);
    await page.reload();
    await expect(page.locator('[data-touchid-enroll]')).toBeVisible({ timeout: 10000 });
    await page.locator('[data-touchid-enroll]').click();
    await page.locator('[data-touchid-unlock]').click();
    await expectStorageTruthy(page, 'itt13-touchid');
    await page.goto('/years/2013/sites/iphone/index.html');
    await expect(page.locator('[data-5s-color]').first()).toBeVisible({ timeout: 10000 });
    await page.locator('[data-5s-color]').first().click();
    await page.locator('[data-iphone5s-claim]').click();
    await expectStorageTruthy(page, 'itt13-iphone5s');

    await page.goto('/years/2013/sites/iphone/5c.html');
    await expect(page.locator('[data-5c-color]').first()).toBeVisible({ timeout: 10000 });
    await page.locator('[data-5c-color]').first().click();
    await page.locator('[data-5c-claim]').click();
    await expectStorageTruthy(page, 'itt13-iphone5c');
  });

  test('H Win8.1 Start tour', async ({ page }) => {
    await page.goto('/years/2013/sites/windows81/index.html');
    await clearKeys(page, ['itt13-win81', 'itt13-win81-tour']);
    await page.reload();
    await expect(page.locator('[data-win81-tile]').first()).toBeVisible({ timeout: 10000 });
    await expect(page.locator('[data-win81-lost]')).toBeVisible();
    await expect(page.locator('[data-win81-start]')).toBeDisabled();
    await page.locator('[data-win81-tile]').nth(0).click();
    await page.locator('[data-win81-tile]').nth(1).click();
    await expect(page.locator('[data-win81-start]')).toBeVisible();
    await page.locator('[data-win81-start]').click();
    await expectStorageTruthy(page, 'itt13-win81');
  });

  test('I Chrome download theater', async ({ page }) => {
    await page.goto('/years/2013/sites/chrome/index.html');
    await expect(page.locator('body')).toContainText(/Chrome|StatCounter|download|browser/i);
    await expect(page.locator('body')).toContainText(/2013/);
    await clearKeys(page, ['itt13-chrome']);
    await page.reload();
    expect(await page.locator('[data-chrome-download]').count()).toBe(0);
    await expect(page.locator('[data-chrome13-save]')).toBeVisible({ timeout: 10000 });
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

  test('J Snowden ack', async ({ page }) => {
    await page.goto('/years/2013/sites/snowden/index.html');
    await clearKeys(page, ['itt13-snowden', 'itt13-snowden-ack']);
    await page.reload();
    await page.locator('[data-snowden-card]').evaluateAll((els) => els.forEach((e) => { e.checked = true; e.dispatchEvent(new Event('change', { bubbles: true })); }));
    await page.locator('[data-snowden-ack]').click();
    await expectStorageTruthy(page, 'itt13-snowden');
  });

  test('K PS4 / Xbox One acks', async ({ page }) => {
    await page.goto('/years/2013/sites/ps4/index.html');
    await clearKeys(page, ['itt13-ps4', 'itt13-xbox']);
    await page.reload();
    await expect(page.locator('[data-ps4-share]')).toBeVisible({ timeout: 10000 });
    await page.locator('[data-ps4-share]').check();
    await page.locator('[data-ps4-ack]').click();
    await expectStorageTruthy(page, 'itt13-ps4');
    await page.goto('/years/2013/sites/xboxone/index.html');
    await expect(page.locator('[data-xbox-drm]')).toBeVisible({ timeout: 10000 });
    await page.locator('[data-xbox-drm]').check();
    await page.locator('[data-xbox-kinect]').check();
    await page.locator('[data-xbox-ack]').click();
    await expectStorageTruthy(page, 'itt13-xbox');
  });

  test('L Facebook Home install', async ({ page }) => {
    await page.goto('/years/2013/sites/facebook/home.html');
    await clearKeys(page, ['itt13-fb-home']);
    await page.reload();
    await expect(page.locator('[data-fb-home-install]')).toBeVisible({ timeout: 10000 });
    await page.locator('[data-fb-home-install]').click();
    await page.locator('[data-fb-home-flop]').click();
    await expectStorageTruthy(page, 'itt13-fb-home');
  });

  test('M Bitcoin news note', async ({ page }) => {
    await page.goto('/years/2013/sites/bitcoin/index.html');
    await expect(page.locator('body')).toContainText(/Bitcoin|Silk Road/i);
    await clearKeys(page, ['itt13-btc-note', 'itt13-btc-room']);
    await page.reload();
    await expect(page.locator('[data-btc-news]')).toBeVisible({ timeout: 10000 });
    await page.locator('[data-btc-news]').check();
    await page.locator('[data-btc-nomarket]').check();
    await page.locator('[data-btc-room-ack]').click();
    await expectStorageTruthy(page, 'itt13-btc-room');
    await expectStorageTruthy(page, 'itt13-btc-note');
  });

  test('N HealthCare.gov public-web literacy', async ({ page }) => {
    await page.goto('/years/2013/sites/healthcare/index.html');
    await expect(page.locator('body')).toContainText(/HealthCare\.gov|October 1|open enrollment/i);
    await expect(page.locator('body')).toContainText(/no real enrollment|educational|PII/i);
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
    const raw = await expectStorageTruthy(page, 'itt13-healthcare-ack');
    expect(raw).toMatch(/healthcare|newsOnly|2013/i);
  });

  test('O iPad Air claim theater', async ({ page }) => {
    await page.goto('/years/2013/sites/ipad/air.html');
    await expect(page.locator('body')).toContainText(/iPad Air|October 22|A7|iOS 7/i);
    await clearKeys(page, ['itt13-ipadair']);
    await page.reload();
    await expect(page.locator('[data-air-cfg="cellular"]')).toBeVisible({ timeout: 10000 });
    await page.locator('[data-air-cfg="cellular"]').click();
    await page.locator('[data-air-mini]').click();
    await page.locator('[data-ipadair-claim]').click();
    const raw = await expectStorageTruthy(page, 'itt13-ipadair');
    expect(raw).toMatch(/multiStep|ipadair|checks/i);
  });

  test('P Spotify residual invite storage', async ({ page }) => {
    await page.goto('/years/2013/sites/spotify/index.html');
    await expect(page.locator('body')).toContainText(/2013/);
    await clearKeys(page, ['itt13-spotify-invite', 'itt13-spotify', 'itt13-spotify-us']);
    await page.reload();
    const invite = page.locator('[data-spotify-invite]').first();
    await expect(invite).toBeVisible();
    await page.locator('[data-spotify-ack]').check();
    await page.locator('[data-spotify-no-stream]').check();
    await invite.click();
    const keys = await page.evaluate(() => {
      const o = {};
      for (let i = 0; i < localStorage.length; i++) {
        const k = localStorage.key(i);
        if (k && k.indexOf('itt13-spotify') === 0) o[k] = localStorage.getItem(k);
      }
      return o;
    });
    expect(Object.keys(keys).length, 'expected itt13-spotify* key').toBeGreaterThan(0);
  });

  test('Q Netflix residual stream/queue storage', async ({ page }) => {
    await page.goto('/years/2013/sites/netflix/index.html');
    await expect(page.locator('body')).toContainText(/2013/);
    await clearKeys(page, ['itt13-netflix-stream', 'itt13-netflix-queue']);
    await page.reload();
    const streamBtn = page.locator('#stream-seed, [data-netflix-stream]').first();
    if (await streamBtn.count()) {
      if (await page.locator('[data-nf-streamfirst]').count()) {
        await page.locator('[data-nf-streamfirst]').check();
      }
      if (await page.locator('[data-nf-discs]').count()) {
        await page.locator('[data-nf-discs]').check();
      }
      await streamBtn.click();
      await expectStorageTruthy(page, 'itt13-netflix-stream');
    } else {
      const form = page.locator('[data-netflix-queue-form]');
      await expect(form).toBeVisible();
      await form.locator('input[type="submit"], button[type="submit"]').first().click();
      const any = await page.evaluate(() => {
        for (let i = 0; i < localStorage.length; i++) {
          const k = localStorage.key(i);
          if (k && k.indexOf('itt13-netflix') === 0) return localStorage.getItem(k);
        }
        return null;
      });
      expect(any).toBeTruthy();
    }
  });

  test('R UberX residual request storage', async ({ page }) => {
    await page.goto('/years/2013/sites/uber/index.html');
    await expect(page.locator('body')).toContainText(/UberX|2013/i);
    await clearKeys(page, ['itt13-uber']);
    await page.reload();
    await expect(page.locator('#uber-x, [data-uber-kind="uberx"]').first()).toBeVisible({ timeout: 10000 });
    await page.locator('#uber-x, [data-uber-kind="uberx"]').first().click();
    await page.locator('[data-uber-confirm]').click();
    const raw = await expectStorageTruthy(page, 'itt13-uber');
    expect(raw).toMatch(/multiStep|uber|checks/i);
  });

  test('S ban literacy', async ({ page }) => {
    await page.goto('/years/2013/pages/about.html');
    await expect(page.locator('body')).toContainText(/TikTok|Reels|Reactions|Meta/i);
    await expect(page.locator('[data-tiktok], [data-reels]')).toHaveCount(0);
  });

  test('T Exit → hub resume 2013', async ({ page }) => {
    await enterYear(page, '2013');
    expect(await page.evaluate(() => localStorage.getItem('itt-last-year'))).toBe('2013');
    await expect(page.locator('#exit-bar a[title="Exit"], #exit-bar a').first()).toHaveAttribute(
      'href',
      /index\.html/
    );
    await killOverlays(page);
    await page.locator('#btn-close').click();
    await expect(page).toHaveURL(/\/($|\?|#|index\.html)/, { timeout: 15000 });
    await expect(page.locator('body')).toContainText(/Internet Through Time|1994/i);
    expect(await page.evaluate(() => localStorage.getItem('itt-last-year'))).toBe('2013');
  });
});
