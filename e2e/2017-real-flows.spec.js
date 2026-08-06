// @ts-check
/**
 * 2017 REAL multi-step flows — incomplete must not write; complete writes itt17-*
 * Direct page loads (no shell iframe) for stable selectors.
 */
const { test, expect } = require('@playwright/test');

/** @param {import('@playwright/test').Page} page @param {string[]} keys */
async function clearKeys(page, keys) {
  await page.evaluate((ks) => {
    try {
      ks.forEach((k) => localStorage.removeItem(k));
    } catch (e) {
      /* */
    }
  }, keys);
}

/** @param {import('@playwright/test').Page} page @param {string} pfx */
async function clearPrefix(page, pfx) {
  await page.evaluate((p) => {
    Object.keys(localStorage)
      .filter((k) => k.startsWith(p))
      .forEach((k) => localStorage.removeItem(k));
  }, pfx);
}

/** @param {import('@playwright/test').Page} page @param {string} key */
async function getKey(page, key) {
  return page.evaluate((k) => localStorage.getItem(k), key);
}

/** @param {import('@playwright/test').Page} page @param {string} key */
async function expectStorageTruthy(page, key) {
  await expect
    .poll(async () => getKey(page, key), { timeout: 8000 })
    .toBeTruthy();
  return (await getKey(page, key)) || '';
}

/** Wait for year-2017-extras boot (not just DOM presence of save buttons) */
async function wait2017(page) {
  await page.waitForFunction(
    () => {
      const d = document.documentElement;
      return (
        d.getAttribute('data-itt-feat-year2017extras') === '1' ||
        d.getAttribute('data-itt-immersion-booted') === '2017'
      );
    },
    null,
    { timeout: 20000 }
  );
  /* Prefer extras feat when REAL save buttons are year-specific */
  await page
    .waitForFunction(
      () => document.documentElement.getAttribute('data-itt-feat-year2017extras') === '1',
      null,
      { timeout: 15000 }
    )
    .catch(() => {});
  await page.waitForTimeout(200);
}

/** @param {import('@playwright/test').Page} page */
async function checkAll(page, selector) {
  await page.locator(selector).evaluateAll((els) =>
    els.forEach((e) => {
      e.checked = true;
      e.dispatchEvent(new Event('change', { bubbles: true }));
    })
  );
}

test.describe('2017 REAL flows · incomplete no write · multi-step save', () => {
  test('About thesis incomplete no write · complete writes itt17-thesis-ack', async ({
    page,
  }) => {
    await page.goto('/years/2017/pages/about.html');
    await clearKeys(page, ['itt17-thesis-ack']);
    await page.reload();
    await wait2017(page);

    await page.locator('[data-itt-real-save][data-storage-key="thesis-ack"]').click();
    await page.waitForTimeout(200);
    expect(await getKey(page, 'itt17-thesis-ack')).toBeFalsy();

    await checkAll(page, '[data-req]');
    await page.locator('[data-itt-real-save][data-storage-key="thesis-ack"]').click();
    await expectStorageTruthy(page, 'itt17-thesis-ack');
  });

  test('Face ID incomplete no write · complete writes faceid', async ({ page }) => {
    await page.goto('/years/2017/sites/iphone/x.html');
    await clearKeys(page, ['itt17-faceid', 'itt17-iphonex']);
    await page.reload();
    await wait2017(page);

    await page.locator('[data-faceid-save]').click();
    await page.waitForTimeout(200);
    expect(await getKey(page, 'itt17-faceid')).toBeFalsy();

    await checkAll(page, '[data-faceid-notch], [data-faceid-look], [data-faceid-price], [data-faceid-store]');
    await page.locator('[data-faceid-save]').click();
    const raw = await expectStorageTruthy(page, 'itt17-faceid');
    expect(raw).toMatch(/2017-09-12|faceid|multiStep/i);
    await expectStorageTruthy(page, 'itt17-iphonex');
  });

  test('Fortnite: free ack required · drop then victory writes fortnite', async ({ page }) => {
    await page.goto('/years/2017/sites/fortnite/index.html');
    await clearKeys(page, ['itt17-fortnite']);
    await page.reload();
    await wait2017(page);

    await page.locator('[data-fn-save]').click();
    await page.waitForTimeout(200);
    expect(await getKey(page, 'itt17-fortnite')).toBeFalsy();

    await page.locator('[data-fn-free]').check();
    await page.locator('[data-fn-sil]').check();
    await page.locator('[data-fn-save]').click();
    await page.waitForTimeout(200);
    expect(await getKey(page, 'itt17-fortnite')).toBeFalsy();

    await page.locator('[data-fn-drop]').click();
    await page.locator('[data-fn-save]').click();
    const raw = await expectStorageTruthy(page, 'itt17-fortnite');
    expect(raw).toMatch(/2017-09-26|silhouette|multiStep/i);
  });

  test('Crypto incomplete no write · complete writes crypto', async ({ page }) => {
    await page.goto('/years/2017/sites/crypto/index.html');
    await clearKeys(page, ['itt17-crypto']);
    await page.reload();
    await wait2017(page);

    await page.locator('[data-crypto-save]').click();
    await page.waitForTimeout(200);
    expect(await getKey(page, 'itt17-crypto')).toBeFalsy();

    await checkAll(page, '[data-crypto-advice], [data-crypto-peak], [data-crypto-ico]');
    await page.locator('[data-crypto-save]').click();
    const raw = await expectStorageTruthy(page, 'itt17-crypto');
    expect(raw).toMatch(/notAdvice|19783|multiStep/i);
  });

  test('WannaCry incomplete no write · complete writes wannacry', async ({ page }) => {
    await page.goto('/years/2017/sites/wannacry/index.html');
    await clearKeys(page, ['itt17-wannacry']);
    await page.reload();
    await wait2017(page);

    await page.locator('[data-wc-save]').click();
    await page.waitForTimeout(200);
    expect(await getKey(page, 'itt17-wannacry')).toBeFalsy();

    await checkAll(page, '[data-wc-date], [data-wc-patch], [data-wc-nopoc]');
    await page.locator('[data-wc-save]').click();
    const raw = await expectStorageTruthy(page, 'itt17-wannacry');
    expect(raw).toMatch(/MS17-010|2017-05-12|noPoc/i);
  });

  test('Twitter 280: under 141 blocked · over 140 writes twitter280', async ({ page }) => {
    await page.goto('/years/2017/sites/twitter/composer.html');
    await clearKeys(page, ['itt17-twitter280']);
    await page.reload();
    await wait2017(page);

    await page.locator('[data-tw280-text]').fill('short under 140');
    await page.locator('[data-tw280-cjk]').check();
    await page.locator('[data-tw280-save]').click();
    await page.waitForTimeout(200);
    expect(await getKey(page, 'itt17-twitter280')).toBeFalsy();

    const long =
      'This is a museum test of the 280 character limit. '.repeat(4) +
      'Past one-forty so the 2017 composer can save.';
    expect(long.length).toBeGreaterThan(140);
    expect(long.length).toBeLessThanOrEqual(280);
    await page.locator('[data-tw280-text]').fill(long);
    await page.locator('[data-tw280-save]').click();
    const raw = await expectStorageTruthy(page, 'itt17-twitter280');
    expect(raw).toMatch(/2017-11-07|multiStep/i);
  });

  test('Vine offline dual-date required', async ({ page }) => {
    await page.goto('/years/2017/sites/vine/offline.html');
    await clearKeys(page, ['itt17-vine-offline']);
    await page.reload();
    await wait2017(page);

    await page.locator('[data-vine17-announce]').check();
    await page.locator('[data-vine17-save]').click();
    await page.waitForTimeout(200);
    expect(await getKey(page, 'itt17-vine-offline')).toBeFalsy();

    await page.locator('[data-vine17-offline]').check();
    await page.locator('[data-vine17-save]').click();
    const raw = await expectStorageTruthy(page, 'itt17-vine-offline');
    expect(raw).toMatch(/2017-01-17|2016-10-27|dualDate/i);
  });

  test('#MeToo careful incomplete no write · complete writes metoo', async ({ page }) => {
    await page.goto('/years/2017/sites/metoo/index.html');
    await clearKeys(page, ['itt17-metoo']);
    await page.reload();
    await wait2017(page);

    await page.locator('[data-metoo-save]').click();
    await page.waitForTimeout(200);
    expect(await getKey(page, 'itt17-metoo')).toBeFalsy();

    await checkAll(page, '[data-metoo-burke], [data-metoo-platform], [data-metoo-careful]');
    await page.locator('[data-metoo-save]').click();
    const raw = await expectStorageTruthy(page, 'itt17-metoo');
    expect(raw).toMatch(/burkeCredit|careful|2017-10-15/i);
  });
});

test.describe('2017 COMPLEX product REAL flows', () => {
  test('Netflix: no list blocked · add + save writes netflix', async ({ page }) => {
    await page.goto('/years/2017/sites/netflix/modern.html');
    await clearPrefix(page, 'itt17-netflix');
    await page.reload();
    await wait2017(page);

    await page.locator('[data-nf-save]').click();
    await page.waitForTimeout(200);
    expect(await getKey(page, 'itt17-netflix')).toBeFalsy();

    await page.locator('[data-nf-title]').first().click();
    await page.locator('[data-nf-add]').click();
    await page.locator('[data-nf-save]').click();
    const raw = await expectStorageTruthy(page, 'itt17-netflix');
    expect(raw).toMatch(/multiStep|list/i);
  });

  test('Spotify: play then free-tier save', async ({ page }) => {
    await page.goto('/years/2017/sites/spotify/modern.html');
    await clearKeys(page, ['itt17-spotify']);
    await page.reload();
    await wait2017(page);

    await page.locator('[data-sp-save]').click();
    await page.waitForTimeout(200);
    expect(await getKey(page, 'itt17-spotify')).toBeFalsy();

    await page.locator('[data-sp-search]').fill('museum anthem');
    await page.locator('[data-sp-play]').click();
    await page.locator('[data-sp-free]').check();
    await page.locator('[data-sp-save]').click();
    await expectStorageTruthy(page, 'itt17-spotify');
  });

  test('YouTube: watch then save', async ({ page }) => {
    await page.goto('/years/2017/sites/youtube/modern.html');
    await clearKeys(page, ['itt17-youtube']);
    await page.reload();
    await wait2017(page);

    await page.locator('[data-yt-save]').click();
    await page.waitForTimeout(200);
    expect(await getKey(page, 'itt17-youtube')).toBeFalsy();

    await page.locator('[data-yt-search]').fill('2017 vlog residual');
    await page.locator('[data-yt-watch]').click();
    await page.locator('[data-yt-save]').click();
    await expectStorageTruthy(page, 'itt17-youtube');
  });

  test('Discord: message + Nitro then save', async ({ page }) => {
    await page.goto('/years/2017/sites/discord/modern.html');
    await clearKeys(page, ['itt17-discord', 'itt17-nitro']);
    await page.reload();
    await wait2017(page);

    await page.locator('[data-dc-save]').click();
    await page.waitForTimeout(200);
    expect(await getKey(page, 'itt17-discord')).toBeFalsy();

    await page.locator('[data-dc-msg]').fill('gg drop');
    await page.locator('[data-dc-send]').click();
    await page.locator('[data-dc-nitro]').check();
    await page.locator('[data-dc-save]').click();
    await expectStorageTruthy(page, 'itt17-discord');
    await expectStorageTruthy(page, 'itt17-nitro');
  });

  test('AMP: open + not-IA then save', async ({ page }) => {
    await page.goto('/years/2017/sites/amp/index.html');
    await clearKeys(page, ['itt17-amp']);
    await page.reload();
    await wait2017(page);

    await page.locator('[data-amp-save]').click();
    await page.waitForTimeout(200);
    expect(await getKey(page, 'itt17-amp')).toBeFalsy();

    await page.locator('[data-amp-open]').click();
    await page.locator('[data-amp-not-ia]').check();
    await page.locator('[data-amp-save]').click();
    await expectStorageTruthy(page, 'itt17-amp');
  });

  test('Medium: draft/clap then save', async ({ page }) => {
    await page.goto('/years/2017/sites/medium/modern.html');
    await clearKeys(page, ['itt17-medium']);
    await page.reload();
    await wait2017(page);

    await page.locator('[data-md-save]').click();
    await page.waitForTimeout(200);
    expect(await getKey(page, 'itt17-medium')).toBeFalsy();

    await page.locator('[data-md-draft]').fill('Long form residual 2017.');
    await page.locator('[data-md-clap]').click();
    await page.locator('[data-md-save]').click();
    await expectStorageTruthy(page, 'itt17-medium');
  });

  test('Equifax literacy multi-step', async ({ page }) => {
    await page.goto('/years/2017/sites/equifax/index.html');
    await clearKeys(page, ['itt17-equifax']);
    await page.reload();
    await wait2017(page);

    await page.locator('[data-eq-save]').click();
    await page.waitForTimeout(200);
    expect(await getKey(page, 'itt17-equifax')).toBeFalsy();

    await checkAll(page, '[data-eq-date], [data-eq-scale], [data-eq-ssn]');
    await page.locator('[data-eq-save]').click();
    const raw = await expectStorageTruthy(page, 'itt17-equifax');
    expect(raw).toMatch(/147000000|2017-09-07|multiStep/i);
  });

  test('Modern lobby three boxes required', async ({ page }) => {
    await page.goto('/years/2017/sites/modern/index.html');
    await clearKeys(page, ['itt17-modern']);
    await page.reload();
    await wait2017(page);

    await page.locator('[data-modern17-save]').click();
    await page.waitForTimeout(200);
    expect(await getKey(page, 'itt17-modern')).toBeFalsy();

    await checkAll(page, '[data-modern17-a], [data-modern17-b], [data-modern17-c]');
    await page.locator('[data-modern17-save]').click();
    await expectStorageTruthy(page, 'itt17-modern');
  });
});

test.describe('2017 shell · home · map smoke', () => {
  test('hub card opens year shell', async ({ page }) => {
    await page.goto('/');
    await expect(page.locator('a.year-card.available[data-year="2017"]')).toBeVisible();
    await page.locator('a.year-card.available[data-year="2017"]').click();
    await expect(page).toHaveURL(/years\/2017/);
    const skip = page.locator('#skip-connect');
    if (await skip.isVisible().catch(() => false)) await skip.click();
    await expect(page.locator('body')).toHaveAttribute('data-itt-year', '2017');
  });

  test('home lists complex rooms', async ({ page }) => {
    await page.goto('/years/2017/pages/home.html');
    await expect(page.locator('body')).toContainText(/1,766,926,408/);
    await expect(page.locator('body')).toContainText(/Face ID|Fortnite|Netflix|Discord|AMP/i);
    await expect(page.locator('a[href*="netflix/modern"]').first()).toBeVisible();
    await expect(page.locator('a[href*="discord/modern"]').first()).toBeVisible();
  });

  test('flow map renders 2017 thesis', async ({ page }) => {
    await page.goto('/years/2017/pages/map.html');
    await wait2017(page);
    await expect
      .poll(async () => page.locator('[data-itt-flow-map]').innerText(), { timeout: 15000 })
      .toMatch(/Face ID|Fortnite|Modern websites|280/i);
  });
});
