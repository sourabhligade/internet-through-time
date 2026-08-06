// @ts-check
/**
 * 2012 multi-step trails — real localStorage (itt12)
 * Home connection trails
 */
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
  expect(raw).not.toBe('[]');
  return raw || '';
}

test.describe('2012 trail 6 — Open web + culture', () => {
  test('SOPA blackout → Obama AMA → Gangnam ack', async ({ page }) => {
    await page.goto('/years/2012/sites/wikipedia/sopa-blackout.html');
    await clearKeys(page, ['itt12-sopa-ack', 'itt12-reddit-ama', 'itt12-yt-gangnam']);
    await page.reload();
    await page.locator('[data-sopa-ack]').click();
    await requireKey(page, 'itt12-sopa-ack');

    await page.goto('/years/2012/sites/reddit/ama.html');
    await page.locator('[data-reddit-ama-ack]').click();
    await requireKey(page, 'itt12-reddit-ama');

    await page.goto('/years/2012/sites/youtube/about.html');
    await page.locator('[data-yt-gangnam-ack]').click();
    await requireKey(page, 'itt12-yt-gangnam');
  });
});

test.describe('2012 trail 1 — App-first photos', () => {
  test('Android install → acquisition ack → share', async ({ page }) => {
    await page.goto('/years/2012/sites/instagram/android.html');
    await clearKeys(page, ['itt12-ig-android', 'itt12-ig-owned', 'itt12-ig-posts', 'itt12-ig-platform']);
    await page.reload();
    await page.locator('[data-ig-android-install]').click();
    await requireKey(page, 'itt12-ig-android');

    await page.goto('/years/2012/sites/instagram/acquired.html');
    await page.locator('[data-ig-acquired-ack]').click();
    await requireKey(page, 'itt12-ig-owned');

    await page.goto('/years/2012/sites/instagram/index.html');
    await page.waitForFunction(
      () => document.documentElement.getAttribute('data-itt-immersion-booted') === '2012',
      null,
      { timeout: 25000 }
    );
    await page.locator('[data-ig-filter="Valencia"]').click();
    await page.locator('[data-ig-caption]').fill('trail 2012');
    await page.locator('[data-ig-share]').click();
    await expect
      .poll(async () => {
        return page.evaluate(() =>
          Object.keys(localStorage).some((k) => /ig-posts/i.test(k) && localStorage.getItem(k))
        );
      }, { timeout: 8000 })
      .toBeTruthy();
  });
});

test.describe('2012 trail 2 — Social goes public', () => {
  test('IPO ack → 1B ack', async ({ page }) => {
    await page.goto('/years/2012/sites/facebook/ipo.html');
    await clearKeys(page, ['itt12-fb-ipo-ack', 'itt12-fb-1b-ack']);
    await page.reload();
    await page.locator('[data-fb-ipo-ack]').click();
    await requireKey(page, 'itt12-fb-ipo-ack');

    await page.goto('/years/2012/sites/facebook/about.html');
    await page.locator('[data-fb-1b-ack]').click();
    await requireKey(page, 'itt12-fb-1b-ack');
  });
});

test.describe('2012 trail 3 — Visual browser web', () => {
  test('Pinterest about → pin storage', async ({ page }) => {
    await page.goto('/years/2012/sites/pinterest/about.html');
    await expect(page.locator('body')).toContainText(/Pinterest|2012/i);

    await page.goto('/years/2012/sites/pinterest/index.html');
    await page.evaluate(() => {
      try {
        Object.keys(localStorage)
          .filter((k) => /pin/i.test(k))
          .forEach((k) => localStorage.removeItem(k));
      } catch (e) {
        /* */
      }
    });
    await page.reload();
    await page.waitForFunction(
      () => document.documentElement.getAttribute('data-itt-immersion-booted') === '2012',
      null,
      { timeout: 25000 }
    );
    await page.locator('[data-pin-save]').first().click();
    await expect
      .poll(async () => {
        return page.evaluate(() =>
          Object.keys(localStorage).some((k) => /pin/i.test(k) && localStorage.getItem(k) && localStorage.getItem(k) !== '[]')
        );
      }, { timeout: 8000 })
      .toBeTruthy();
  });
});

test.describe('2012 trail 4 — Apple autumn', () => {
  test('iPhone 5 → Lightning → Maps', async ({ page }) => {
    await page.goto('/years/2012/sites/iphone/index.html');
    await clearKeys(page, ['itt12-iphone5', 'itt12-lightning', 'itt12-maps-note']);
    await page.reload();
    await page.locator('[data-iphone5-claim]').click();
    await requireKey(page, 'itt12-iphone5');

    await page.goto('/years/2012/sites/iphone/lightning.html');
    await page.locator('[data-lightning-ack]').click();
    await requireKey(page, 'itt12-lightning');

    await page.goto('/years/2012/sites/iphone/maps.html');
    await page.locator('[data-maps-q]').fill('Trail Lake');
    await page.locator('[data-maps-search]').click();
    await requireKey(page, 'itt12-maps-note');
  });
});

test.describe('2012 trail 5 — Desktop reimagined', () => {
  test('Chrome download → Win8 tile', async ({ page }) => {
    await page.goto('/years/2012/sites/chrome/index.html');
    await page.evaluate(() => {
      try {
        Object.keys(localStorage)
          .filter((k) => /chrome/i.test(k))
          .forEach((k) => localStorage.removeItem(k));
      } catch (e) {
        /* */
      }
    });
    await page.reload();
    await page.waitForFunction(
      () => document.documentElement.getAttribute('data-itt-immersion-booted') === '2012',
      null,
      { timeout: 25000 }
    );
    await page.locator('[data-chrome-download]').click();
    await expect
      .poll(async () => {
        return page.evaluate(() =>
          Object.keys(localStorage).some((k) => /chrome/i.test(k) && localStorage.getItem(k))
        );
      }, { timeout: 8000 })
      .toBeTruthy();

    await page.goto('/years/2012/sites/windows8/index.html');
    await clearKeys(page, ['itt12-win8-tour']);
    await page.reload();
    await page.locator('[data-win8-tile]').first().click();
    await requireKey(page, 'itt12-win8-tour');
  });
});

test.describe('2012 trail 6 — thesis ack', () => {
  test('About thesis storage', async ({ page }) => {
    await page.goto('/years/2012/pages/about.html');
    await clearKeys(page, ['itt12-thesis-ack']);
    await page.reload();
    await page.locator('[data-thesis-ack]').click();
    await requireKey(page, 'itt12-thesis-ack');
  });
});
