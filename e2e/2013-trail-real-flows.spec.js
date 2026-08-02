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

async function requireKey(page, key) {
  const raw = await page.evaluate((k) => localStorage.getItem(k), key);
  expect(raw, `trail missing ${key}`).toBeTruthy();
  return raw || '';
}

test.describe('2013 trail — short video stack', () => {
  test('Vine post → IG video → Snap Story', async ({ page }) => {
    await page.goto('/years/2013/sites/vine/record.html');
    await clearKeys(page, ['itt13-vine-posts', 'itt13-ig-video', 'itt13-snap-story']);
    await page.reload();
    await page.locator('[data-vine-hold]').dispatchEvent('mousedown');
    await page.waitForTimeout(300);
    await page.locator('[data-vine-hold]').dispatchEvent('mouseup');
    await page.locator('[data-vine-post]').click();
    await requireKey(page, 'itt13-vine-posts');

    await page.goto('/years/2013/sites/instagram/video.html');
    await page.locator('[data-igv-share]').click();
    await requireKey(page, 'itt13-ig-video');

    await page.goto('/years/2013/sites/snapchat/story.html');
    await page.locator('[data-snap-story-add]').click();
    await requireKey(page, 'itt13-snap-story');
  });
});

test.describe('2013 trail — flat phone + privacy', () => {
  test('iOS 7 → Touch ID → Snowden → thesis', async ({ page }) => {
    await page.goto('/years/2013/sites/iphone/ios7.html');
    await clearKeys(page, ['itt13-ios7', 'itt13-touchid', 'itt13-snowden-ack', 'itt13-thesis-ack']);
    await page.reload();
    await page.locator('[data-ios7-ack]').click();
    await requireKey(page, 'itt13-ios7');

    await page.goto('/years/2013/sites/iphone/touchid.html');
    await page.locator('[data-touchid-enroll]').click();
    await requireKey(page, 'itt13-touchid');

    await page.goto('/years/2013/sites/snowden/index.html');
    await page.locator('[data-snowden-card]').evaluateAll((els) => els.forEach((e) => { e.checked = true; e.dispatchEvent(new Event('change', { bubbles: true })); }));
    await page.locator('[data-snowden-ack]').click();
    await requireKey(page, 'itt13-snowden-ack');

    await page.goto('/years/2013/pages/about.html');
    await page.locator('[data-thesis-ack]').click();
    await requireKey(page, 'itt13-thesis-ack');
  });
});

test.describe('2013 trail — public web + tablet', () => {
  test('Snowden → HealthCare.gov → iPad Air', async ({ page }) => {
    await page.goto('/years/2013/sites/snowden/index.html');
    await clearKeys(page, ['itt13-snowden-ack', 'itt13-healthcare-ack', 'itt13-ipadair']);
    await page.reload();
    await page.locator('[data-snowden-card]').evaluateAll((els) => els.forEach((e) => { e.checked = true; e.dispatchEvent(new Event('change', { bubbles: true })); }));
    await page.locator('[data-snowden-ack]').click();
    await requireKey(page, 'itt13-snowden-ack');

    await page.goto('/years/2013/sites/healthcare/index.html');
    await page.locator('[data-hc-try="1"]').click().catch(() => {});
    await page.waitForTimeout(700);
    await page.locator('[data-hc-try="2"]').click().catch(() => {});
    await page.waitForTimeout(800);
    await page.locator('[data-healthcare-ack]').click();
    await requireKey(page, 'itt13-healthcare-ack');

    await page.goto('/years/2013/sites/ipad/air.html');
    await page.locator('[data-ipadair-ack]').click();
    await requireKey(page, 'itt13-ipadair');
  });

  test('home trails link HealthCare.gov and iPad Air', async ({ page }) => {
    await page.goto('/years/2013/pages/home.html');
    const text = await page.locator('body').innerText();
    expect(text).toMatch(/HealthCare\.gov|healthcare/i);
    expect(text).toMatch(/iPad Air/i);
    await expect(page.locator('a[href*="healthcare"]').first()).toBeVisible();
    await expect(page.locator('a[href*="ipad/air"]').first()).toBeVisible();
  });
});

test.describe('2013 trail — continuity residual N–R', () => {
  test('Spotify invite → Netflix stream → UberX', async ({ page }) => {
    await page.goto('/years/2013/sites/spotify/index.html');
    await clearKeys(page, ['itt13-uber', 'itt13-netflix-stream']);
    await page.reload();
    await page.waitForTimeout(400);
    await page.locator('[data-spotify-invite]').first().click();
    const spotKeys = await page.evaluate(() => {
      const o = [];
      for (let i = 0; i < localStorage.length; i++) {
        const k = localStorage.key(i);
        if (k && k.indexOf('itt13-spotify') === 0) o.push(k);
      }
      return o;
    });
    expect(spotKeys.length).toBeGreaterThan(0);

    await page.goto('/years/2013/sites/netflix/index.html');
    await page.reload();
    await page.waitForTimeout(300);
    await page.locator('#stream-seed').click();
    await requireKey(page, 'itt13-netflix-stream');

    await page.goto('/years/2013/sites/uber/index.html');
    await page.locator('#uber-x, [data-uber-kind="uberx"]').first().click();
    await requireKey(page, 'itt13-uber');
  });
});
