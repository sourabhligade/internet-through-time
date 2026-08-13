// @ts-check
/**
 * 2019 — check each trail flow end-to-end (gates + multipage + keys).
 * Mirrors docs/2019-GOALS-PHASES-AND-USER-FLOWS-CLEAR.md trails T1–T6 + thesis + P1.
 */
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

async function getKey(page, key) {
  return page.evaluate((k) => localStorage.getItem(k), key);
}

async function expectKey(page, key, re) {
  await expect
    .poll(async () => getKey(page, key), { timeout: 8000 })
    .toBeTruthy();
  const raw = (await getKey(page, key)) || '';
  if (re) expect(raw).toMatch(re);
  return raw;
}

test.describe('2019 flow check — thesis B', () => {
  test('About dual-cite + incomplete blocked + REAL save', async ({ page }) => {
    await page.goto('/years/2019/pages/about.html');
    await clearKeys(page, ['itt19-thesis-ack']);
    await page.reload();
    await expect(page.locator('body')).toContainText('1,630,322,579');
    await expect(page.locator('body')).toContainText(/4\.1B|53\.6/i);
    await expect(page.locator('body')).toContainText(/2018|not dual-cited|honest/i);
    await page.locator('[data-itt-real-save][data-storage-key="thesis-ack"]').click();
    await page.waitForTimeout(120);
    expect(await getKey(page, 'itt19-thesis-ack')).toBeFalsy();
    await checkAllReq(page);
    await page.locator('[data-itt-real-save][data-storage-key="thesis-ack"]').click();
    await expectKey(page, 'itt19-thesis-ack', /real|true|2019/i);
  });
});

test.describe('2019 flow check — T1 TikTok', () => {
  test('empty blocked · then post · create surface shares key', async ({ page }) => {
    await clearKeys(page, ['itt19-tiktok']);
    await page.goto('/years/2019/sites/tiktok/index.html');
    await page.reload();
    await checkAllReq(page);
    await page.locator('[data-tt-post]').click();
    await page.waitForTimeout(120);
    expect(await getKey(page, 'itt19-tiktok')).toBeFalsy();
    await page.locator('[data-tt-caption]').fill('fyp check T1');
    await page.locator('[data-tt-sound="trend"]').click();
    await page.locator('[data-tt-post]').click();
    await expectKey(page, 'itt19-tiktok', /fyp check T1/i);
    await expect(page.locator('[data-tt-list]')).toContainText(/fyp check T1/i);

    await page.goto('/years/2019/sites/tiktok/create.html');
    await page.locator('[data-tt-caption]').fill('create surface');
    await checkAllReq(page);
    await page.locator('[data-tt-post]').click();
    const raw = await expectKey(page, 'itt19-tiktok');
    expect(raw).toMatch(/create surface/i);
  });
});

test.describe('2019 flow check — T2 Disney+', () => {
  test('join incomplete · join REAL · queue without join blocked · queue REAL', async ({ page }) => {
    await clearKeys(page, ['itt19-disneyplus']);
    await page.goto('/years/2019/sites/disneyplus/index.html');
    await page.reload();
    await expect(page.locator('body')).toContainText(/Nov(ember)?\s*12|2019/i);
    await checkAllReq(page);
    await page.locator('[data-dplus-join]').click();
    await page.waitForTimeout(120);
    expect(await getKey(page, 'itt19-disneyplus')).toBeFalsy();
    await page.locator('[data-dplus-plan]').selectOption('monthly');
    await page.locator('[data-dplus-join]').click();
    await expectKey(page, 'itt19-disneyplus', /monthly|joined|2019-11-12/i);

    await page.goto('/years/2019/sites/disneyplus/queue.html');
    await clearKeys(page, ['itt19-disneyplus']);
    await page.reload();
    await page.locator('[data-dplus-title]').fill('The Mandalorian');
    await checkAllReq(page);
    await page.locator('[data-dplus-queue]').click();
    await page.waitForTimeout(150);
    expect(await getKey(page, 'itt19-disneyplus')).toBeFalsy();

    await page.goto('/years/2019/sites/disneyplus/index.html');
    await page.locator('[data-dplus-plan]').selectOption('annual');
    await checkAllReq(page);
    await page.locator('[data-dplus-join]').click();
    await page.goto('/years/2019/sites/disneyplus/queue.html');
    await page.locator('[data-dplus-title]').fill('The Mandalorian');
    await checkAllReq(page);
    await page.locator('[data-dplus-queue]').click();
    await expectKey(page, 'itt19-disneyplus', /Mandalorian/i);
    await expect(page.locator('[data-dplus-list]')).toContainText(/Mandalorian/i);
  });
});

test.describe('2019 flow check — T3 Arcade', () => {
  test('trial incomplete · trial REAL · play without trial blocked · play REAL', async ({ page }) => {
    await clearKeys(page, ['itt19-arcade']);
    await page.goto('/years/2019/sites/arcade/index.html');
    await page.reload();
    await expect(page.locator('body')).toContainText(/Sep(tember)?\s*19|2019/i);
    await checkAllReq(page);
    await page.locator('[data-arcade-start]').click();
    await page.waitForTimeout(120);
    expect(await getKey(page, 'itt19-arcade')).toBeFalsy();
    await page.locator('[data-arcade-game]').selectOption('oceanhorn2');
    await page.locator('[data-arcade-start]').click();
    await expectKey(page, 'itt19-arcade', /oceanhorn2|started|2019-09-19/i);

    await page.goto('/years/2019/sites/arcade/play.html');
    await clearKeys(page, ['itt19-arcade']);
    await page.reload();
    await checkAllReq(page);
    await page.locator('[data-arcade-play-save]').click();
    await page.waitForTimeout(150);
    expect(await getKey(page, 'itt19-arcade')).toBeFalsy();

    await page.goto('/years/2019/sites/arcade/index.html');
    await page.locator('[data-arcade-game]').selectOption('sayonara');
    await checkAllReq(page);
    await page.locator('[data-arcade-start]').click();
    await page.goto('/years/2019/sites/arcade/play.html');
    await checkAllReq(page);
    await page.locator('[data-arcade-play-save]').click();
    await expectKey(page, 'itt19-arcade', /played|sayonara/i);
  });
});

test.describe('2019 flow check — T4 hardware', () => {
  test('iPhone 11 color required · AirPods Pro order · pair multipage', async ({ page }) => {
    await clearKeys(page, ['itt19-iphone11', 'itt19-airpods-pro']);
    await page.goto('/years/2019/sites/iphone/iphone11.html');
    await page.reload();
    await expect(page.locator('body')).toContainText(/dual camera/i);
    await checkAllReq(page);
    await page.locator('[data-itt-real-save][data-storage-key="iphone11"]').click();
    await page.waitForTimeout(120);
    expect(await getKey(page, 'itt19-iphone11')).toBeFalsy();
    await page.locator('[data-ip11-color]').selectOption('purple');
    await page.locator('[data-itt-real-save][data-storage-key="iphone11"]').click();
    await expectKey(page, 'itt19-iphone11', /purple|real/i);

    await page.goto('/years/2019/sites/airpodspro/index.html');
    await page.reload();
    await expect(page.locator('body')).toContainText(/ANC|Oct/i);
    await page.locator('[data-airpods-pro-save]').click();
    await page.waitForTimeout(120);
    expect(await getKey(page, 'itt19-airpods-pro')).toBeFalsy();
    await checkAllReq(page);
    await page.locator('[data-airpods-pro-save]').click();
    await expectKey(page, 'itt19-airpods-pro', /ordered|true/i);

    await page.goto('/years/2019/sites/airpodspro/pair.html');
    await page.locator('[data-airpods-pro-pair]').click();
    await page.waitForTimeout(120);
    let raw = (await getKey(page, 'itt19-airpods-pro')) || '';
    expect(raw).not.toMatch(/"paired"\s*:\s*true/);
    await page.locator('[data-airpods-pro-pair-case]').check();
    await page.locator('[data-airpods-pro-pair-lit]').check();
    await page.locator('[data-airpods-pro-pair]').click();
    raw = await expectKey(page, 'itt19-airpods-pro');
    expect(raw).toMatch(/paired/i);
  });
});

test.describe('2019 flow check — T5 Stadia', () => {
  test('claim incomplete · claim REAL · stream without claim blocked · stream REAL', async ({ page }) => {
    await clearKeys(page, ['itt19-stadia']);
    await page.goto('/years/2019/sites/stadia/index.html');
    await page.reload();
    await expect(page.locator('body')).toContainText(/Nov(ember)?\s*19|2019/i);
    await expect(page.locator('body')).toContainText(/not invent later shutdown|Founder/i);
    await checkAllReq(page);
    await page.locator('[data-stadia-claim]').click();
    await page.waitForTimeout(120);
    expect(await getKey(page, 'itt19-stadia')).toBeFalsy();
    await page.locator('[data-stadia-tier]').selectOption('founders');
    await page.locator('[data-stadia-claim]').click();
    await expectKey(page, 'itt19-stadia', /founders|claimed|2019-11-19/i);

    await page.goto('/years/2019/sites/stadia/stream.html');
    await clearKeys(page, ['itt19-stadia']);
    await page.reload();
    await page.locator('[data-stadia-game]').fill('Destiny 2');
    await checkAllReq(page);
    await page.locator('[data-stadia-stream]').click();
    await page.waitForTimeout(150);
    expect(await getKey(page, 'itt19-stadia')).toBeFalsy();

    await page.goto('/years/2019/sites/stadia/index.html');
    await page.locator('[data-stadia-tier]').selectOption('pro');
    await checkAllReq(page);
    await page.locator('[data-stadia-claim]').click();
    await page.goto('/years/2019/sites/stadia/stream.html');
    await page.locator('[data-stadia-game]').fill('Destiny 2');
    await checkAllReq(page);
    await page.locator('[data-stadia-stream]').click();
    await expectKey(page, 'itt19-stadia', /Destiny|streaming/i);
  });
});

test.describe('2019 flow check — T6 Apple TV+', () => {
  test('start incomplete · start REAL · progress without start blocked · progress REAL', async ({ page }) => {
    await clearKeys(page, ['itt19-appletv']);
    await page.goto('/years/2019/sites/appletv/index.html');
    await page.reload();
    await expect(page.locator('body')).toContainText(/Nov(ember)?\s*1|2019/i);
    await checkAllReq(page);
    await page.locator('[data-tv-start]').click();
    await page.waitForTimeout(120);
    expect(await getKey(page, 'itt19-appletv')).toBeFalsy();
    await page.locator('[data-tv-show]').selectOption('morningshow');
    await page.locator('[data-tv-start]').click();
    await expectKey(page, 'itt19-appletv', /morningshow|watching|2019-11-01/i);

    await page.goto('/years/2019/sites/appletv/watch.html');
    await clearKeys(page, ['itt19-appletv']);
    await page.reload();
    await checkAllReq(page);
    await page.locator('[data-tv-progress]').click();
    await page.waitForTimeout(150);
    expect(await getKey(page, 'itt19-appletv')).toBeFalsy();

    await page.goto('/years/2019/sites/appletv/index.html');
    await page.locator('[data-tv-show]').selectOption('dickinson');
    await checkAllReq(page);
    await page.locator('[data-tv-start]').click();
    await page.goto('/years/2019/sites/appletv/watch.html');
    await checkAllReq(page);
    await page.locator('[data-tv-progress]').click();
    await expectKey(page, 'itt19-appletv', /progress|dickinson/i);
  });
});

test.describe('2019 flow check — P1 FTC + prefix + home trails', () => {
  test('FTC $5B REAL', async ({ page }) => {
    await page.goto('/years/2019/sites/facebook/ftc-fine.html');
    await clearKeys(page, ['itt19-ftc-fine']);
    await page.reload();
    await expect(page.locator('body')).toContainText(/\$5|5 billion|Jul(y)?\s*24|2019/i);
    await page.locator('[data-itt-real-save][data-storage-key="ftc-fine"]').click();
    await page.waitForTimeout(120);
    expect(await getKey(page, 'itt19-ftc-fine')).toBeFalsy();
    await checkAllReq(page);
    await page.locator('[data-itt-real-save][data-storage-key="ftc-fine"]').click();
    await expectKey(page, 'itt19-ftc-fine');
  });

  test('prefix isolation no itt16', async ({ page }) => {
    await page.goto('/years/2019/pages/about.html');
    await page.evaluate(() => {
      Object.keys(localStorage)
        .filter((k) => k.startsWith('itt16-') || k.startsWith('itt19-'))
        .forEach((k) => localStorage.removeItem(k));
    });
    await page.reload();
    await checkAllReq(page);
    await page.locator('[data-itt-real-save]').click();
    const keys = await page.evaluate(() =>
      Object.keys(localStorage).filter((k) => k.startsWith('itt16-') || k.startsWith('itt19-'))
    );
    expect(keys.some((k) => k.startsWith('itt19-'))).toBeTruthy();
    expect(keys.filter((k) => k.startsWith('itt16-'))).toEqual([]);
  });

  test('home trails T1–T6 hrefs + P1 FTC', async ({ page }) => {
    await page.goto('/years/2019/pages/home.html');
    for (const href of ['tiktok', 'disneyplus', 'arcade', 'iphone11', 'stadia', 'appletv', 'ftc-fine']) {
      await expect(page.locator(`a[href*="${href}"]`).first()).toBeVisible();
    }
    await expect(page.locator('body')).toContainText(/Dual camera|dual camera/i);
  });
});
