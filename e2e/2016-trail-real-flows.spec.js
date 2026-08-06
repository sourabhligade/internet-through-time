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
  await expect
    .poll(async () => page.evaluate((k) => localStorage.getItem(k), key), { timeout: 10000 })
    .toBeTruthy();
}

async function wait2016(page) {
  await page.waitForFunction(
    () =>
      document.documentElement.getAttribute('data-itt-feat-year2016extras') === '1' ||
      document.documentElement.getAttribute('data-itt-immersion-booted') === '2016',
    null,
    { timeout: 20000 }
  );
  await page.waitForTimeout(200);
}

test.describe('2016 trail — Stories war', () => {
  test('IG Stories → Reactions → Vine goodbye', async ({ page }) => {
    await page.goto('/years/2016/sites/instagram/stories.html');
    await clearKeys(page, [
      'itt16-ig-stories',
      'itt16-ig-stories-list',
      'itt16-reactions',
      'itt16-vine',
    ]);
    await page.reload();
    await wait2016(page);

    await page.locator('[data-ig-story-text]').fill('Trail story');
    await page.locator('[data-ig-story-24h]').check();
    await page.locator('[data-ig-story-snap]').check();
    await page.locator('[data-ig-story-add]').click();
    await requireKey(page, 'itt16-ig-stories');

    await page.goto('/years/2016/sites/facebook/reactions.html');
    await wait2016(page);
    await page.locator('[data-reaction][value="wow"]').check();
    await page.locator('[data-reaction-save]').click();
    await requireKey(page, 'itt16-reactions');

    await page.goto('/years/2016/sites/vine/goodbye.html');
    await wait2016(page);
    await page.locator('[data-vine-announce]').check();
    await page.locator('[data-vine-offline]').check();
    await page.locator('[data-vine-save]').click();
    await requireKey(page, 'itt16-vine');
  });
});

test.describe('2016 trail — outdoor AR + trust', () => {
  test('PoGO catch → WA E2E literacy', async ({ page }) => {
    await page.goto('/years/2016/sites/pokemongo/index.html');
    await clearKeys(page, ['itt16-pogo', 'itt16-pogo-caught', 'itt16-wa-e2e']);
    await page.reload();
    await wait2016(page);

    await page.locator('[data-pogo-loc]').check();
    await page.locator('[data-pogo-team][value="valor"]').check();
    await page.locator('[data-pogo-catch]').click();
    await page.locator('[data-pogo-battery]').check();
    await page.locator('[data-pogo-save]').click();
    await requireKey(page, 'itt16-pogo');

    await page.goto('/years/2016/sites/whatsapp/security.html');
    await wait2016(page);
    for (let i = 1; i <= 4; i++) {
      await page.locator(`[data-e2e-${i}]`).check();
    }
    await page.locator('[data-e2e-save]').click();
    await requireKey(page, 'itt16-wa-e2e');
  });
});
