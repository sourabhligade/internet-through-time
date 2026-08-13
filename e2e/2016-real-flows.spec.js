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

async function expectKey(page, key) {
  const raw = await page.evaluate((k) => localStorage.getItem(k), key);
  expect(raw, `missing ${key}`).toBeTruthy();
  return raw || '';
}

test.describe('2016 real flows', () => {
  test('thesis REAL', async ({ page }) => {
    await page.goto('/years/2016/pages/about.html');
    await clearKeys(page, ['itt16-thesis-ack']);
    await page.reload();
    await checkAllReq(page);
    await page.locator('[data-itt-real-save][data-storage-key="thesis-ack"]').click();
    await expectKey(page, 'itt16-thesis-ack');
  });

  test('Stories empty blocked then REAL', async ({ page }) => {
    await page.goto('/years/2016/sites/instagram/stories.html');
    await clearKeys(page, ['itt16-ig-stories']);
    await page.reload();
    await checkAllReq(page);
    await page.locator('[data-ig-story-add]').click();
    await page.waitForTimeout(150);
    expect(await page.evaluate(() => localStorage.getItem('itt16-ig-stories'))).toBeFalsy();
    await page.locator('[data-ig-story-text]').fill('live story');
    await page.locator('[data-ig-story-add]').click();
    await expectKey(page, 'itt16-ig-stories');
  });

  test('Reactions incomplete blocked then REAL', async ({ page }) => {
    await page.goto('/years/2016/sites/facebook/reactions.html');
    await clearKeys(page, ['itt16-reactions']);
    await page.reload();
    await page.locator('[data-fb-react-save]').click();
    await page.waitForTimeout(150);
    expect(await page.evaluate(() => localStorage.getItem('itt16-reactions'))).toBeFalsy();
    await page.locator('[data-fb-react="love"]').click();
    await page.locator('[data-fb-react-save]').click();
    await expectKey(page, 'itt16-reactions');
  });

  test('jack literacy REAL', async ({ page }) => {
    await page.goto('/years/2016/sites/iphone/jack.html');
    await clearKeys(page, ['itt16-iphone7-jack']);
    await page.reload();
    await checkAllReq(page);
    await page.locator('[data-itt-real-save][data-storage-key="iphone7-jack"]').click();
    await expectKey(page, 'itt16-iphone7-jack');
  });

  test('AirPods REAL', async ({ page }) => {
    await page.goto('/years/2016/sites/airpods/index.html');
    await clearKeys(page, ['itt16-airpods']);
    await page.reload();
    await checkAllReq(page);
    await page.locator('[data-airpods-save]').click();
    await expectKey(page, 'itt16-airpods');
  });

  test('Vine end REAL', async ({ page }) => {
    await page.goto('/years/2016/sites/vine/goodbye.html');
    await clearKeys(page, ['itt16-vine-end']);
    await page.reload();
    await checkAllReq(page);
    await page.locator('[data-itt-real-save][data-storage-key="vine-end"]').click();
    await expectKey(page, 'itt16-vine-end');
  });

  test('WA E2E REAL', async ({ page }) => {
    await page.goto('/years/2016/sites/whatsapp/security.html');
    await clearKeys(page, ['itt16-wa-e2e']);
    await page.reload();
    await checkAllReq(page);
    await page.locator('[data-itt-real-save][data-storage-key="wa-e2e"]').click();
    await expectKey(page, 'itt16-wa-e2e');
  });

  test('musical.ly post REAL', async ({ page }) => {
    await page.goto('/years/2016/sites/musically/create.html');
    await clearKeys(page, ['itt16-musically']);
    await page.reload();
    await page.locator('[data-mly-song]').fill('Cool for the Summer');
    await checkAllReq(page);
    await page.locator('[data-mly-post]').click();
    await expectKey(page, 'itt16-musically');
  });

  test('prefix isolation no itt15 writes', async ({ page }) => {
    await page.goto('/years/2016/pages/about.html');
    await page.evaluate(() => {
      Object.keys(localStorage)
        .filter((k) => k.startsWith('itt15-') || k.startsWith('itt16-'))
        .forEach((k) => localStorage.removeItem(k));
    });
    await page.reload();
    await checkAllReq(page);
    await page.locator('[data-itt-real-save]').click();
    const keys = await page.evaluate(() =>
      Object.keys(localStorage).filter((k) => k.startsWith('itt15-') || k.startsWith('itt16-'))
    );
    expect(keys.some((k) => k.startsWith('itt16-'))).toBeTruthy();
    expect(keys.filter((k) => k.startsWith('itt15-'))).toEqual([]);
  });

  test('jack incomplete blocked then REAL', async ({ page }) => {
    await page.goto('/years/2016/sites/iphone/jack.html');
    await clearKeys(page, ['itt16-iphone7-jack']);
    await page.reload();
    await page.locator('[data-itt-real-save][data-storage-key="iphone7-jack"]').click();
    await page.waitForTimeout(150);
    expect(await page.evaluate(() => localStorage.getItem('itt16-iphone7-jack'))).toBeFalsy();
    await checkAllReq(page);
    await page.locator('[data-itt-real-save][data-storage-key="iphone7-jack"]').click();
    await expectKey(page, 'itt16-iphone7-jack');
  });

  test('AirPods incomplete blocked then REAL', async ({ page }) => {
    await page.goto('/years/2016/sites/airpods/index.html');
    await clearKeys(page, ['itt16-airpods']);
    await page.reload();
    await page.locator('[data-airpods-save]').click();
    await page.waitForTimeout(150);
    expect(await page.evaluate(() => localStorage.getItem('itt16-airpods'))).toBeFalsy();
    await checkAllReq(page);
    await page.locator('[data-airpods-save]').click();
    await expectKey(page, 'itt16-airpods');
  });

  test('GO incomplete battery blocked without catch', async ({ page }) => {
    await clearKeys(page, [
      'itt16-pogo',
      'itt16-pogo-loc',
      'itt16-pogo-team',
      'itt16-pogo-catches',
    ]);
    await page.goto('/years/2016/sites/pokemongo/battery.html');
    await page.reload();
    await page.locator('[data-pogo-battery]').check();
    await page.locator('[data-pogo-save]').click();
    await page.waitForTimeout(200);
    expect(await page.evaluate(() => localStorage.getItem('itt16-pogo'))).toBeFalsy();
  });

  test('GO full multipage REAL', async ({ page }) => {
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
    await page.locator('[data-pogo-team="valor"]').click();
    await page.locator('[data-pogo-continue-team]').click();
    await page.waitForURL(/catch\.html/);
    await page.locator('[data-pogo-species-opt="Zubat"]').click();
    await page.locator('[data-pogo-catch]').click();
    await expectKey(page, 'itt16-pogo-catches');
    await page.goto('/years/2016/sites/pokemongo/battery.html');
    await page.locator('[data-pogo-battery]').check();
    await page.locator('[data-pogo-save]').click();
    const raw = await expectKey(page, 'itt16-pogo');
    expect(raw).toMatch(/valor|Zubat|2016-07-06/i);
  });

  test('P1 LinkedIn Rift Switch REAL', async ({ page }) => {
    await page.goto('/years/2016/sites/linkedin/deal.html');
    await clearKeys(page, ['itt16-linkedin-deal', 'itt16-rift', 'itt16-switch-announce']);
    await page.reload();
    await checkAllReq(page);
    await page.locator('[data-itt-real-save][data-storage-key="linkedin-deal"]').click();
    await expectKey(page, 'itt16-linkedin-deal');

    await page.goto('/years/2016/sites/oculus/rift.html');
    await page.reload();
    await checkAllReq(page);
    await page.locator('[data-itt-real-save][data-storage-key="rift"]').click();
    await expectKey(page, 'itt16-rift');

    await page.goto('/years/2016/sites/nintendo/switch.html');
    await page.reload();
    await checkAllReq(page);
    await page.locator('[data-itt-real-save][data-storage-key="switch-announce"]').click();
    await expectKey(page, 'itt16-switch-announce');
  });

  test('musical.ly empty song blocked', async ({ page }) => {
    await page.goto('/years/2016/sites/musically/create.html');
    await clearKeys(page, ['itt16-musically']);
    await page.reload();
    await checkAllReq(page);
    await page.locator('[data-mly-post]').click();
    await page.waitForTimeout(150);
    expect(await page.evaluate(() => localStorage.getItem('itt16-musically'))).toBeFalsy();
  });

  test('Snap residual empty caption blocked then REAL', async ({ page }) => {
    await page.goto('/years/2016/sites/snapchat/story.html');
    await clearKeys(page, ['itt16-snap-story']);
    await page.reload();
    await checkAllReq(page);
    await page.locator('[data-snap-story-add]').click();
    await page.waitForTimeout(150);
    expect(await page.evaluate(() => localStorage.getItem('itt16-snap-story'))).toBeFalsy();
    await page.locator('[data-snap-caption]').fill('museum snap');
    await page.locator('[data-snap-story-add]').click();
    await expectKey(page, 'itt16-snap-story');
  });

  test('AirPods order then pair REAL', async ({ page }) => {
    await page.goto('/years/2016/sites/airpods/index.html');
    await clearKeys(page, ['itt16-airpods']);
    await page.reload();
    await checkAllReq(page);
    await page.locator('[data-airpods-save]').click();
    await expectKey(page, 'itt16-airpods');
    await page.goto('/years/2016/sites/airpods/pair.html');
    await page.reload();
    await page.locator('[data-airpods-pair]').click();
    await page.waitForTimeout(150);
    expect(await page.evaluate(() => localStorage.getItem('itt16-airpods'))).toMatch(/ordered/i);
    await page.locator('[data-airpods-pair-case]').check();
    await page.locator('[data-airpods-pair-lit]').check();
    await page.locator('[data-airpods-pair]').click();
    await expect
      .poll(async () => page.evaluate(() => localStorage.getItem('itt16-airpods')), {
        timeout: 8000,
      })
      .toMatch(/"paired"\s*:\s*true/);
  });

  test('Allo empty message blocked then REAL', async ({ page }) => {
    await page.goto('/years/2016/sites/allo/index.html');
    await clearKeys(page, ['itt16-allo']);
    await page.reload();
    await checkAllReq(page);
    await page.locator('[data-itt-real-save][data-storage-key="allo"]').click();
    await page.waitForTimeout(150);
    expect(await page.evaluate(() => localStorage.getItem('itt16-allo'))).toBeFalsy();
    await page.locator('[data-allo-msg]').fill('Sounds good!');
    await page.locator('[data-itt-real-save][data-storage-key="allo"]').click();
    await expectKey(page, 'itt16-allo');
  });

  test('Edge download then prefer REAL', async ({ page }) => {
    await page.goto('/years/2016/sites/edge/index.html');
    await clearKeys(page, ['itt16-edge']);
    await page.reload();
    await page.locator('[data-edge-prefer]').click();
    await page.waitForTimeout(150);
    expect(await page.evaluate(() => localStorage.getItem('itt16-edge'))).toBeFalsy();
    await checkAllReq(page);
    await page.locator('[data-edge-download]').click();
    await expectKey(page, 'itt16-edge');
    await page.locator('[data-edge-prefer]').click();
    await expect
      .poll(async () => page.evaluate(() => localStorage.getItem('itt16-edge')), {
        timeout: 8000,
      })
      .toMatch(/prefer|true/i);
  });

  test('musical.ly create then index list', async ({ page }) => {
    await page.goto('/years/2016/sites/musically/create.html');
    await clearKeys(page, ['itt16-musically']);
    await page.reload();
    await page.locator('[data-mly-song]').fill('Index list song');
    await checkAllReq(page);
    await page.locator('[data-mly-post]').click();
    await expectKey(page, 'itt16-musically');
    await page.goto('/years/2016/sites/musically/index.html');
    await page.reload();
    await page.waitForTimeout(400);
    await expect(page.locator('[data-mly-list]')).toContainText(/Index list song/i);
  });
});
