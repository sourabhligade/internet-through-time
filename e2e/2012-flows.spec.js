// @ts-check
const { test, expect } = require('@playwright/test');


async function clearKeys(page, keys) {
  await page.evaluate((ks) => {
    ks.forEach((k) => { try { localStorage.removeItem(k); } catch (e) { /* */ } });
  }, keys);
}
async function getKey(page, key) {
  return page.evaluate((k) => localStorage.getItem(k), key);
}

test.describe('2012 flows', () => {
  test('A hub card → Win7 / IE9 → Starting Point', async ({ page }) => {
    await page.goto('/');
    const card = page.locator('a.year-card.available.y2012[href*="years/2012"]');
    await expect(card).toBeVisible();
    await card.click();
    const skip = page.locator('#skip-connect');
    if (await skip.isVisible().catch(() => false)) await skip.click();
    await expect(page.locator('body')).toHaveAttribute('data-itt-year', '2012');
    await expect(page.locator('#content')).toBeVisible();
  });

  test('B thesis literacy writes itt12-thesis-ack', async ({ page }) => {
    await page.goto('/years/2012/pages/about.html');
    await clearKeys(page, ['itt12-thesis-ack']);
    await page.reload();
    await page.locator('[data-itt-real-save][data-storage-key="thesis-ack"]').click();
    expect(await getKey(page, 'itt12-thesis-ack')).toBeFalsy();
    const boxes = page.locator('[data-thesis-req]');
    await boxes.nth(0).check();
    await boxes.nth(1).check();
    await page.locator('[data-itt-real-save][data-storage-key="thesis-ack"]').click();
    await expect.poll(() => getKey(page, 'itt12-thesis-ack')).toMatch(/real|true|multiStep/i);
  });

  test('C Pinterest two pins writes itt12-pin', async ({ page }) => {
    await page.goto('/years/2012/sites/pinterest/index.html');
    await clearKeys(page, ['itt12-pin']);
    await page.reload();
    await page.locator('[data-pin-save]').click();
    expect(await getKey(page, 'itt12-pin')).toBeFalsy();
    await page.locator('[data-pin-tile="kitchen"]').click();
    await page.locator('[data-pin-tile="wedding"]').click();
    await page.locator('[data-pin-save]').click();
    await expect.poll(() => getKey(page, 'itt12-pin')).toMatch(/pin|real/i);
  });

  test('D IPO two checks writes itt12-fb-ipo', async ({ page }) => {
    await page.goto('/years/2012/sites/facebook/ipo.html');
    await clearKeys(page, ['itt12-fb-ipo']);
    await page.reload();
    await page.locator('[data-ipo-ack]').click();
    expect(await getKey(page, 'itt12-fb-ipo')).toBeFalsy();
    await page.locator('[data-ipo-req]').nth(0).check();
    await page.locator('[data-ipo-req]').nth(1).check();
    await page.locator('[data-ipo-ack]').click();
    await expect.poll(() => getKey(page, 'itt12-fb-ipo')).toMatch(/38|nasdaq|real/i);
  });

  test('E SOPA skip blocked then writes itt12-sopa', async ({ page }) => {
    await page.goto('/years/2012/sites/wikipedia/sopa.html');
    await clearKeys(page, ['itt12-sopa']);
    await page.reload();
    await page.locator('[data-sopa-save]').click();
    expect(await getKey(page, 'itt12-sopa')).toBeFalsy();
    await page.locator('[data-sopa-req]').nth(0).check();
    await page.locator('[data-sopa-req]').nth(1).check();
    await page.locator('[data-sopa-save]').click();
    await expect.poll(() => getKey(page, 'itt12-sopa')).toMatch(/blackout|sopa|real/i);
  });

  test('F Medium empty blocked then writes itt12-pop-medium', async ({ page }) => {
    await page.goto('/years/2012/sites/medium/index.html');
    await clearKeys(page, ['itt12-pop-medium']);
    await page.reload();
    await page.locator('[data-pop-go]').click();
    expect(await getKey(page, 'itt12-pop-medium')).toBeFalsy();
    await page.locator('[data-pop-field]').fill('museum draft');
    await page.locator('[data-pop-req]').check();
    await page.locator('[data-pop-go]').click();
    await expect.poll(() => getKey(page, 'itt12-pop-medium')).toBeTruthy();
  });

  test('G Flipboard 0–1 blocked then writes itt12-pop-flipboard', async ({ page }) => {
    await page.goto('/years/2012/sites/flipboard/index.html');
    await clearKeys(page, ['itt12-pop-flipboard']);
    await page.reload();
    await page.locator('[data-flip-save]').click();
    expect(await getKey(page, 'itt12-pop-flipboard')).toBeFalsy();
    await page.locator('[data-flip-sec="news"]').click();
    await page.locator('[data-flip-save]').click();
    expect(await getKey(page, 'itt12-pop-flipboard')).toBeFalsy();
    await page.locator('[data-flip-sec="tech"]').click();
    await page.locator('[data-flip-save]').click();
    await expect.poll(() => getKey(page, 'itt12-pop-flipboard')).toMatch(/flip|real/i);
  });

  test('H $1B merge trap never writes; ticks write itt12-ig-fb', async ({ page }) => {
    await page.goto('/years/2012/sites/instagram/acquired.html');
    await clearKeys(page, ['itt12-ig-fb']);
    await page.reload();
    await page.locator('[data-ig-acq-merge]').click();
    expect(await getKey(page, 'itt12-ig-fb')).toBeFalsy();
    await page.locator('[data-ig-acq-ack]').click();
    expect(await getKey(page, 'itt12-ig-fb')).toBeFalsy();
    await page.locator('[data-ig-acq-req]').nth(0).check();
    await page.locator('[data-ig-acq-req]').nth(1).check();
    await page.locator('[data-ig-acq-ack]').click();
    await expect.poll(() => getKey(page, 'itt12-ig-fb')).toBeTruthy();
  });

  test('I Drive Dropbox trap never writes; Drive pick writes itt12-drive', async ({ page }) => {
    await page.goto('/years/2012/sites/googledrive/index.html');
    await clearKeys(page, ['itt12-drive']);
    await page.reload();
    await page.locator('[data-drive-drop]').click();
    expect(await getKey(page, 'itt12-drive')).toBeFalsy();
    await page.locator('[data-drive-req]').nth(0).check();
    await page.locator('[data-drive-req]').nth(1).check();
    await page.locator('[data-drive-ack]').click();
    expect(await getKey(page, 'itt12-drive')).toBeFalsy();
    await page.locator('[data-drive-pick="dropbox"]').click();
    await page.locator('[data-drive-ack]').click();
    expect(await getKey(page, 'itt12-drive')).toBeFalsy();
    await page.locator('[data-drive-pick="drive"]').click();
    await page.locator('[data-drive-ack]').click();
    await expect.poll(() => getKey(page, 'itt12-drive')).toBeTruthy();
  });

  test('J Vine wait 6s trap / empty never writes; wait writes itt12-pop-vinewait', async ({ page }) => {
    await page.goto('/years/2012/sites/vinewait/index.html');
    await clearKeys(page, ['itt12-pop-vinewait']);
    await page.reload();
    await page.locator('[data-vn12-6]').click();
    expect(await getKey(page, 'itt12-pop-vinewait')).toBeFalsy();
    await page.locator('[data-pop-go]').click();
    expect(await getKey(page, 'itt12-pop-vinewait')).toBeFalsy();
    await page.locator('[data-pop-pick]').first().click();
    await page.locator('[data-pop-req]').check();
    await page.fill('[data-pop-field]', 'soon');
    await page.locator('[data-pop-go]').click();
    await expect.poll(() => getKey(page, 'itt12-pop-vinewait')).toBeTruthy();
  });

  test('K Win8 Start trap / one tile never writes; two tiles write itt12-win8-tiles', async ({ page }) => {
    await page.goto('/years/2012/sites/windows8/index.html');
    await clearKeys(page, ['itt12-win8-tiles']);
    await page.reload();
    await page.locator('[data-win8-start]').click();
    expect(await getKey(page, 'itt12-win8-tiles')).toBeFalsy();
    await page.locator('[data-win8-tile="mail"]').click();
    expect(await getKey(page, 'itt12-win8-tiles')).toBeFalsy();
    await page.locator('[data-win8-tile="photos"]').click();
    await expect.poll(() => getKey(page, 'itt12-win8-tiles')).toBeTruthy();
  });

  test('second leftover dests Facebook · Maps · SOPA exist and are not the gold', async ({ page }) => {
    await page.goto("/years/2012/pages/home.html");
    await expect(page.locator("#ott-guided-2012 ol > li")).toHaveCount(6);
    await expect(page.locator('[data-ott-one-thing="2012"]')).toHaveAttribute("href", /instagram\/android/);
    for (const dest of ["sites/facebook/index.html", "sites/iphone/maps.html", "sites/wikipedia/sopa.html"]) {
      const res = await page.request.get("/years/2012/" + dest);
      expect(res.status(), dest).toBeLessThan(400);
    }
  });
});
