// @ts-check
const { test, expect } = require('@playwright/test');
const { enterYear, checkAllReq } = require('./helpers');

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

test.describe('2016 flows A–T', () => {
  test('A enter year — shell boot', async ({ page }) => {
    await enterYear(page, '2016');
    await expect(page.locator('body')).toHaveAttribute('data-itt-year', '2016');
    await expect(page.locator('#content')).toBeVisible();
  });

  test('B thesis about REAL', async ({ page }) => {
    await page.goto('/years/2016/pages/about.html');
    await clearKeys(page, ['itt16-thesis-ack']);
    await page.reload();
    await expect(page.locator('body')).toContainText('1,045,534,808');
    await checkAllReq(page);
    await page.locator('[data-itt-real-save][data-storage-key="thesis-ack"]').click();
    await expectStorageTruthy(page, 'itt16-thesis-ack');
  });

  test('C Stories write', async ({ page }) => {
    await page.goto('/years/2016/sites/instagram/stories.html');
    await clearKeys(page, ['itt16-ig-stories']);
    await page.reload();
    await page.locator('[data-ig-story-text]').fill('flow story');
    await checkAllReq(page);
    await page.locator('[data-ig-story-add]').click();
    await expectStorageTruthy(page, 'itt16-ig-stories');
  });

  test('G Reactions pick', async ({ page }) => {
    await page.goto('/years/2016/sites/facebook/reactions.html');
    await clearKeys(page, ['itt16-reactions']);
    await page.reload();
    await page.waitForSelector('[data-fb-react-save]', { timeout: 10000 });
    await page.waitForTimeout(400);
    await page.locator('[data-fb-react="haha"]').click();
    await page.locator('[data-fb-react-save]').click();
    await expect
      .poll(async () => page.evaluate(() => localStorage.getItem('itt16-reactions')), {
        timeout: 8000,
      })
      .toBeTruthy();
  });

  test('H–I jack + AirPods', async ({ page }) => {
    await page.goto('/years/2016/sites/iphone/jack.html');
    await clearKeys(page, ['itt16-iphone7-jack', 'itt16-airpods']);
    await page.reload();
    await checkAllReq(page);
    await page.locator('[data-itt-real-save][data-storage-key="iphone7-jack"]').click();
    await expectStorageTruthy(page, 'itt16-iphone7-jack');
    await page.goto('/years/2016/sites/airpods/index.html');
    await page.reload();
    await checkAllReq(page);
    await page.locator('[data-airpods-save]').click();
    await expectStorageTruthy(page, 'itt16-airpods');
  });

  test('J–K Vine + musical.ly', async ({ page }) => {
    await page.goto('/years/2016/sites/vine/goodbye.html');
    await clearKeys(page, ['itt16-vine-end', 'itt16-musically']);
    await page.reload();
    await checkAllReq(page);
    await page.locator('[data-itt-real-save][data-storage-key="vine-end"]').click();
    await expectStorageTruthy(page, 'itt16-vine-end');
    await page.goto('/years/2016/sites/musically/create.html');
    await page.reload();
    await page.locator('[data-mly-song]').fill('Hotline Bling');
    await checkAllReq(page);
    await page.locator('[data-mly-post]').click();
    await expectStorageTruthy(page, 'itt16-musically');
  });

  test('L WA E2E', async ({ page }) => {
    await page.goto('/years/2016/sites/whatsapp/security.html');
    await clearKeys(page, ['itt16-wa-e2e']);
    await page.reload();
    await checkAllReq(page);
    await page.locator('[data-itt-real-save][data-storage-key="wa-e2e"]').click();
    await expectStorageTruthy(page, 'itt16-wa-e2e');
  });

  test('P Win10 free end', async ({ page }) => {
    await page.goto('/years/2016/sites/windows10/index.html');
    await clearKeys(page, ['itt16-win10-end']);
    await page.reload();
    await expect(page.locator('body')).toContainText(/Jul(y)?\s*29|ended|free upgrade/i);
    await checkAllReq(page);
    await page.locator('[data-itt-real-save][data-storage-key="win10-end"]').click();
    await expectStorageTruthy(page, 'itt16-win10-end');
  });

  test('E–F Pokémon GO multipage storage', async ({ page }) => {
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
    await page.locator('[data-pogo-team="instinct"]').click();
    await page.locator('[data-pogo-continue-team]').click();
    await page.waitForURL(/catch\.html/);
    await page.locator('[data-pogo-species]').fill('Pidgey');
    await page.locator('[data-pogo-catch]').click();
    await expectStorageTruthy(page, 'itt16-pogo-catches');
    await page.goto('/years/2016/sites/pokemongo/battery.html');
    await page.locator('[data-pogo-battery]').check();
    await page.locator('[data-pogo-save]').click();
    await expectStorageTruthy(page, 'itt16-pogo');
  });

  test('M–O Allo LinkedIn Rift', async ({ page }) => {
    await page.goto('/years/2016/sites/allo/index.html');
    await clearKeys(page, ['itt16-allo', 'itt16-linkedin-deal', 'itt16-rift']);
    await page.reload();
    await page.locator('[data-allo-msg]').fill('On my way');
    await checkAllReq(page);
    await page.locator('[data-itt-real-save][data-storage-key="allo"]').click();
    await expectStorageTruthy(page, 'itt16-allo');

    await page.goto('/years/2016/sites/linkedin/deal.html');
    await page.reload();
    await checkAllReq(page);
    await page.locator('[data-itt-real-save][data-storage-key="linkedin-deal"]').click();
    await expectStorageTruthy(page, 'itt16-linkedin-deal');

    await page.goto('/years/2016/sites/oculus/rift.html');
    await page.reload();
    await checkAllReq(page);
    await page.locator('[data-itt-real-save][data-storage-key="rift"]').click();
    await expectStorageTruthy(page, 'itt16-rift');
  });

  test('R–S Spectacles + Switch announce', async ({ page }) => {
    await page.goto('/years/2016/sites/snapchat/spectacles.html');
    await clearKeys(page, ['itt16-spectacles', 'itt16-switch-announce']);
    await page.reload();
    await checkAllReq(page);
    await page.locator('[data-itt-real-save][data-storage-key="spectacles"]').click();
    await expectStorageTruthy(page, 'itt16-spectacles');

    await page.goto('/years/2016/sites/nintendo/switch.html');
    await page.reload();
    await checkAllReq(page);
    await page.locator('[data-itt-real-save][data-storage-key="switch-announce"]').click();
    await expectStorageTruthy(page, 'itt16-switch-announce');
  });
});
