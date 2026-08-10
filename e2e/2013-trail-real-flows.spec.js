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
    const hold = page.locator('[data-vine-hold]');
    await hold.dispatchEvent('pointerdown');
    await hold.dispatchEvent('mousedown');
    await page.waitForTimeout(500);
    await hold.dispatchEvent('mouseup');
    await hold.dispatchEvent('pointerup');
    await expect(page.locator('[data-vine-status]')).toContainText(/Ready/i, { timeout: 5000 });
    await page.locator('[data-vine-post]').click();
    await requireKey(page, 'itt13-vine-posts');

    await page.goto('/years/2013/sites/instagram/video.html');
    await page.locator('[data-igv-filter="Cinema"]').click();
    await page.locator('[data-igv-share]').click();
    await requireKey(page, 'itt13-ig-video');

    await page.goto('/years/2013/sites/snapchat/story.html');
    await page.locator('[data-snap-not-ig]').check();
    await page.locator('[data-snap-story-add]').click();
    await requireKey(page, 'itt13-snap-story');
  });
});

test.describe('2013 trail — flat phone + privacy', () => {
  test('iOS 7 → Touch ID → Snowden → thesis', async ({ page }) => {
    await page.goto('/years/2013/sites/iphone/ios7.html');
    await clearKeys(page, ['itt13-ios7', 'itt13-touchid', 'itt13-snowden-ack', 'itt13-thesis-ack']);
    await page.reload();
    await page.waitForTimeout(500);
    await page.locator('[data-ios7-tile]').nth(0).click();
    await page.locator('[data-ios7-tile]').nth(1).click();
    await page.locator('[data-ios7-change]').first().check();
    await requireKey(page, 'itt13-ios7');

    await page.goto('/years/2013/sites/iphone/touchid.html');
    await page.waitForTimeout(400);
    await page.locator('[data-touchid-enroll]').click();
    await page.locator('[data-touchid-unlock]').click();
    await requireKey(page, 'itt13-touchid');

    await page.goto('/years/2013/sites/snowden/index.html');
    await page.locator('[data-snowden-card]').evaluateAll((els) =>
      els.forEach((e) => {
        e.checked = true;
        e.dispatchEvent(new Event('change', { bubbles: true }));
      })
    );
    await page.locator('[data-snowden-ack]').click();
    await requireKey(page, 'itt13-snowden-ack');

    await page.goto('/years/2013/pages/about.html');
    await page.waitForTimeout(400);
    await page.locator('[data-thesis-req]').evaluateAll((els) =>
      els.forEach((e) => {
        e.checked = true;
        e.dispatchEvent(new Event('change', { bubbles: true }));
      })
    );
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
    await page.locator('[data-hc-email]').fill('you@example.com');
    await page.locator('[data-hc-try="1"]').click().catch(() => {});
    await page.waitForTimeout(700);
    await page.locator('[data-hc-try="2"]').click().catch(() => {});
    await page.waitForTimeout(800);
    await page.locator('[data-healthcare-ack]').click();
    await requireKey(page, 'itt13-healthcare-ack');

    await page.goto('/years/2013/sites/ipad/air.html');
    await page.waitForTimeout(500);
    await page.locator('[data-air-cfg="cellular"]').click();
    await page.locator('[data-air-mini]').click();
    await page.locator('[data-ipadair-claim]').click();
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
    await page.locator('[data-spotify-ack]').check();
    await page.locator('[data-spotify-no-stream]').check();
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
    await page.waitForTimeout(400);
    await page.locator('#uber-x, [data-uber-kind="uberx"]').first().click();
    await page.locator('[data-uber-confirm]').click();
    await requireKey(page, 'itt13-uber');
  });
});

async function wait2013Boot(page) {
  await page
    .waitForFunction(
      () => {
        const d = document.documentElement;
        return (
          d.getAttribute('data-itt-immersion-booted') === '2013' ||
          d.getAttribute('data-itt-feat-year2013extras') === '1' ||
          d.getAttribute('data-itt-feat-yeartruepacks') === '1'
        );
      },
      null,
      { timeout: 12000 }
    )
    .catch(() => {});
}

test.describe('2013 trail — gems REAL', () => {
  test('Telegram → Medium → Tumblr Yahoo → FB Home', async ({ page }) => {
    await page.goto('/years/2013/sites/telegram/index.html');
    await clearKeys(page, [
      'itt13-telegram',
      'itt13-medium-draft',
      'itt13-tumblr-yahoo',
      'itt13-fb-home',
    ]);
    await page.reload();
    await wait2013Boot(page);
    await page.locator('[data-telegram-seed]').click();
    expect(await page.evaluate(() => localStorage.getItem('itt13-telegram'))).toBeFalsy();
    await page.locator('[data-telegram-nick], [name=nick]').first().fill('museum_user');
    await page.locator('[data-telegram-privacy]').check();
    await page.locator('[data-telegram-seed]').click();
    await requireKey(page, 'itt13-telegram');

    await page.goto('/years/2013/sites/medium/index.html');
    await page.locator('[data-medium-publish]').click();
    expect(await page.evaluate(() => localStorage.getItem('itt13-medium-draft'))).toBeFalsy();
    await page.locator('[data-medium-draft]').fill('Six-second loops and a long-form essay.');
    await page.locator('[data-medium-literacy]').check();
    await page.locator('[data-medium-publish]').click();
    await requireKey(page, 'itt13-medium-draft');

    await page.goto('/years/2013/sites/tumblr/yahoo.html');
    await page.waitForTimeout(400);
    await page.locator('[data-ty-pin]').click();
    expect(await page.evaluate(() => localStorage.getItem('itt13-tumblr-yahoo'))).toBeFalsy();
    await page.locator('[data-ty-promise]').click();
    await requireKey(page, 'itt13-tumblr-yahoo');

    await page.goto('/years/2013/sites/facebook/home.html');
    await page.waitForTimeout(400);
    await page.locator('[data-fb-home-flop]').click();
    expect(await page.evaluate(() => localStorage.getItem('itt13-fb-home'))).toBeFalsy();
    await page.locator('[data-fb-home-install]').click();
    await page.locator('[data-fb-home-flop]').click();
    await requireKey(page, 'itt13-fb-home');
  });

  test('Slack / Tinder residual packs incomplete never write', async ({ page }) => {
    await page.goto('/years/2013/sites/slack/index.html');
    await clearKeys(page, ['itt13-slack', 'itt13-tinder']);
    await page.reload();
    await wait2013Boot(page);
    await page.locator('[data-pack-go]').click();
    expect(await page.evaluate(() => localStorage.getItem('itt13-slack'))).toBeFalsy();
    await page.locator('[data-pack-q]').fill('museum-hq');
    await page.locator('[data-pack-go]').click();
    await requireKey(page, 'itt13-slack');

    await page.goto('/years/2013/sites/tinder/index.html');
    await page.waitForTimeout(400);
    await page.locator('[data-pack-a]').click();
    expect(await page.evaluate(() => localStorage.getItem('itt13-tinder'))).toBeFalsy();
    await page.locator('[data-pack-b]').click();
    await requireKey(page, 'itt13-tinder');
  });
});
