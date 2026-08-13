// @ts-check
const { test, expect } = require('@playwright/test');
const { checkAllReq } = require('./helpers');

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

test.describe('2016 trail T1 — Stories war', () => {
  test('IG Stories → Snap residual REAL', async ({ page }) => {
    await page.goto('/years/2016/sites/instagram/stories.html');
    await clearKeys(page, ['itt16-ig-stories', 'itt16-snap-story']);
    await page.reload();
    await page.locator('[data-ig-story-text]').fill('trail story');
    await checkAllReq(page);
    await page.locator('[data-ig-story-add]').click();
    await requireKey(page, 'itt16-ig-stories');

    await page.goto('/years/2016/sites/snapchat/story.html');
    await page.reload();
    await expect(page.locator('body')).toContainText(/Stories war|still|compet|Aug 2|2016/i);
    await expect(page.locator('body')).not.toContainText(/Not Instagram Stories \(2016\)/i);
    await page.locator('[data-snap-caption]').fill('snap trail caption');
    await checkAllReq(page);
    await page.locator('[data-snap-story-add]').click();
    await expect
      .poll(async () => page.evaluate(() => localStorage.getItem('itt16-snap-story')), {
        timeout: 8000,
      })
      .toMatch(/snap trail caption/i);
  });
});

test.describe('2016 trail T2 — Outdoor AR', () => {
  test('location → team → catch → battery save', async ({ page }) => {
    await clearKeys(page, [
      'itt16-pogo',
      'itt16-pogo-loc',
      'itt16-pogo-team',
      'itt16-pogo-catches',
    ]);
    await page.goto('/years/2016/sites/pokemongo/index.html');
    await page.reload();
    await checkAllReq(page);
    await page.locator('[data-pogo-continue-loc]').click();
    await page.waitForURL(/team\.html/);
    await page.locator('[data-pogo-team="mystic"]').click();
    await page.locator('[data-pogo-continue-team]').click();
    await page.waitForURL(/catch\.html/);
    await page.locator('[data-pogo-species-opt="Pidgey"]').click();
    await page.locator('[data-pogo-catch]').click();
    await requireKey(page, 'itt16-pogo-catches');
    await page.goto('/years/2016/sites/pokemongo/battery.html');
    await page.locator('[data-pogo-battery]').check();
    await page.locator('[data-pogo-save]').click();
    await requireKey(page, 'itt16-pogo');
  });
});

test.describe('2016 trail T3 — Feed emotion', () => {
  test('Reactions pick', async ({ page }) => {
    await page.goto('/years/2016/sites/facebook/reactions.html');
    await clearKeys(page, ['itt16-reactions']);
    await page.reload();
    await page.waitForSelector('[data-fb-react-save]', { timeout: 10000 });
    await page.waitForTimeout(500);
    await page.locator('[data-fb-react="wow"]').click();
    await page.locator('[data-fb-react-save]').click();
    await expect
      .poll(async () => page.evaluate(() => localStorage.getItem('itt16-reactions')), {
        timeout: 8000,
      })
      .toBeTruthy();
  });
});

test.describe('2016 trail T4 — Phone autumn', () => {
  test('jack → AirPods', async ({ page }) => {
    await page.goto('/years/2016/sites/iphone/jack.html');
    await clearKeys(page, ['itt16-iphone7-jack', 'itt16-airpods']);
    await page.reload();
    await checkAllReq(page);
    await page.locator('[data-itt-real-save][data-storage-key="iphone7-jack"]').click();
    await requireKey(page, 'itt16-iphone7-jack');
    await page.goto('/years/2016/sites/airpods/index.html');
    await page.reload();
    await checkAllReq(page);
    await page.locator('[data-airpods-save]').click();
    await requireKey(page, 'itt16-airpods');
  });
});

test.describe('2016 trail T5 — Six-second end', () => {
  test('Vine → musical.ly', async ({ page }) => {
    await page.goto('/years/2016/sites/vine/goodbye.html');
    await clearKeys(page, ['itt16-vine-end', 'itt16-musically']);
    await page.reload();
    await checkAllReq(page);
    await page.locator('[data-itt-real-save][data-storage-key="vine-end"]').click();
    await requireKey(page, 'itt16-vine-end');
    await page.goto('/years/2016/sites/musically/create.html');
    await page.reload();
    await page.locator('[data-mly-song]').fill('trail song');
    await checkAllReq(page);
    await page.locator('[data-mly-post]').click();
    await requireKey(page, 'itt16-musically');
  });
});

test.describe('2016 trail T6 — Trust', () => {
  test('WhatsApp E2E', async ({ page }) => {
    await page.goto('/years/2016/sites/whatsapp/security.html');
    await clearKeys(page, ['itt16-wa-e2e']);
    await page.reload();
    await checkAllReq(page);
    await page.locator('[data-itt-real-save][data-storage-key="wa-e2e"]').click();
    await requireKey(page, 'itt16-wa-e2e');
  });
});
