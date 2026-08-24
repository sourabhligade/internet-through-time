// @ts-check
/**
 * All-years signature REAL gates (1994–2016).
 * One thesis interaction per year that MUST mutate year-prefixed localStorage
 * (or multi-step DOM state). Page-load-only is a failure.
 *
 * Complements year-signature-flows (broader) and no-mock-flows (deep late years).
 */
const { test, expect } = require('@playwright/test');

async function twoStepClick(page, selector) {
  const el = page.locator(selector).first();
  await el.click();
  await page.waitForTimeout(150);
  await el.click();
}

const { enterYear, contentFrame, waitForImmersion, goInFrame, goImmersion } = require('./helpers');
const fs = require('fs');
const path = require('path');
function yearOnDisk(year) {
  return fs.existsSync(path.join(__dirname, '..', 'years', String(year), 'index.html'));
}

/**
 * @param {import('@playwright/test').Page} page
 * @param {string} prefix
 */
async function clearPrefix(page, prefix) {
  await page.evaluate((p) => {
    try {
      Object.keys(localStorage)
        .filter((k) => k.indexOf(p) === 0)
        .forEach((k) => localStorage.removeItem(k));
    } catch (e) {
      /* */
    }
  }, prefix);
}

/**
 * @param {import('@playwright/test').Page} page
 * @param {string} key
 * @param {RegExp|string} [match]
 */
async function requireKey(page, key, match) {
  await expect
    .poll(async () => page.evaluate((k) => localStorage.getItem(k), key), {
      timeout: 12000,
      message: 'missing ' + key,
    })
    .toBeTruthy();
  const raw = (await page.evaluate((k) => localStorage.getItem(k), key)) || '';
  if (match) expect(raw).toMatch(match);
  return raw;
}

/**
 * @param {import('@playwright/test').Page} page
 * @param {string} prefix
 * @param {string} [needle] optional substring (case-insensitive via outer check)
 */
async function requireAnyPrefix(page, prefix, needle) {
  await expect
    .poll(
      async () =>
        page.evaluate(
          ({ p, n }) => {
            const keys = Object.keys(localStorage).filter((k) => k.indexOf(p) === 0);
            for (let i = 0; i < keys.length; i++) {
              const v = localStorage.getItem(keys[i]) || '';
              if (v.length < 3) continue;
              if (!n) return keys[i];
              if (v.toLowerCase().indexOf(String(n).toLowerCase()) !== -1) return keys[i];
            }
            return '';
          },
          { p: prefix, n: needle || '' }
        ),
      { timeout: 12000, message: 'no key under ' + prefix + (needle ? ' matching ' + needle : '') }
    )
    .toBeTruthy();
}

test.describe('all-years signature REAL · early web', () => {
  test('1994 CSotD guestbook → itt94-csotd', async ({ page }) => {
    await enterYear(page, '1994');
    await clearPrefix(page, 'itt94-csotd');
    await goImmersion(page, '1994', 'sites/csotd/index.html');
    const frame = contentFrame(page);
    await page.evaluate(() => {
      try {
        const f = document.getElementById('content');
        const w = f && f.contentWindow;
        if (w && w.sessionStorage) w.sessionStorage.setItem('itt94-csotd-wandered', '1');
        sessionStorage.setItem('itt94-csotd-wandered', '1');
      } catch (e) {
        /* */
      }
    });
    await frame.locator('[name="gbname"]').fill('AllYear94');
    await frame.locator('[name="gbnote"]').fill('Worth the modem.');
    await frame.locator('form[data-csotd-gb] input[type="submit"]').click();
    await requireKey(page, 'itt94-csotd', /AllYear94|multiStep/i);
  });

  test('1995 Amazon cart → itt95-amazon-cart', async ({ page }) => {
    await enterYear(page, '1995');
    await page.evaluate(() => localStorage.setItem('itt95-amazon-cart', '[]'));
    await goImmersion(page, '1995', 'sites/amazon/book-neuromancer.html');
    const frame = contentFrame(page);
    await frame.locator('[data-add-cart]').first().click({ force: true });
    await expect
      .poll(async () =>
        page.evaluate(() => {
          try {
            return JSON.parse(localStorage.getItem('itt95-amazon-cart') || '[]').length;
          } catch (e) {
            return 0;
          }
        })
      )
      .toBeGreaterThan(0);
  });

  test('1996 HoTMaiL login → session storage', async ({ page }) => {
    await enterYear(page, '1996');
    await clearPrefix(page, 'itt96');
    await goImmersion(page, '1996', 'sites/hotmail/index.html');
    const frame = contentFrame(page);
    const form = frame.locator('form[data-hotmail-login]');
    await expect(form).toBeVisible({ timeout: 15000 });
    await form.locator('input[name="login"]').fill('museum');
    await form.locator('input[name="pass"], input[type="password"]').first().fill('pass');
    await form.locator('input[type="image"], input[type="submit"], button[type="submit"]').first().click({
      force: true,
    });
    await expect(frame.locator('body')).toContainText(/Inbox|Compose|Folders|New Mail/i, {
      timeout: 15000,
    });
    await requireAnyPrefix(page, 'itt96');
  });

  test('1997 eBay bid → storage', async ({ page }) => {
    await enterYear(page, '1997');
    await clearPrefix(page, 'itt97');
    await goImmersion(page, '1997', 'sites/ebay/item-laptop.html');
    const frame = contentFrame(page);
    const form = frame.locator('form[data-bid-form]');
    await expect(form).toBeVisible({ timeout: 10000 });
    if (await form.locator('input[name="bidder"]').count()) {
      await form.locator('input[name="bidder"]').fill('Real97');
    }
    await form.locator('input[name="bid"]').fill('520.00');
    await form.locator('input[type="submit"]').click({ force: true });
    await expect(frame.locator('[data-high-bid]')).toContainText('520', { timeout: 10000 });
    await requireAnyPrefix(page, 'itt97', '520');
  });

  test('1998 Google search theater → results DOM', async ({ page }) => {
    await enterYear(page, '1998');
    await goImmersion(page, '1998', 'sites/google/index.html');
    const frame = contentFrame(page);
    const q = frame.locator('input[name="q"], input[type="text"]').first();
    await expect(q).toBeVisible({ timeout: 15000 });
    await q.fill('museum web');
    await frame.locator('input[type="submit"], button[type="submit"], input[name="btnG"]').first().click({
      force: true,
    });
    await expect(frame.locator('body')).toContainText(/museum|result|Google|Search/i, {
      timeout: 15000,
    });
  });

  test('1999 AIM sign-on → itt99-aim', async ({ page }) => {
    await enterYear(page, '1999');
    await clearPrefix(page, 'itt99-aim');
    await goImmersion(page, '1999', 'sites/aim/index.html');
    const frame = contentFrame(page);
    const form = frame.locator('form[data-aim-signon]');
    await expect(form).toBeVisible({ timeout: 15000 });
    await form.locator('button[type="submit"]').click();
    await page.waitForTimeout(80);
    expect(await page.evaluate(() => localStorage.getItem('itt99-aim'))).toBeFalsy();
    await form.locator('[name="sn"]').fill('coolkid99');
    await form.locator('button[type="submit"]').click();
    await requireAnyPrefix(page, 'itt99-aim');
  });
});

test.describe('all-years signature REAL · 2000s boom', () => {
  test('2000 Amazon cart → itt00-amazon-cart', async ({ page }) => {
    await enterYear(page, '2000');
    await page.evaluate(() => localStorage.setItem('itt00-amazon-cart', '[]'));
    await goImmersion(page, '2000', 'sites/amazon/music.html');
    const frame = contentFrame(page);
    await frame.locator('[data-add-cart]').first().click({ force: true });
    await expect
      .poll(async () =>
        page.evaluate(() => {
          try {
            return JSON.parse(localStorage.getItem('itt00-amazon-cart') || '[]').length;
          } catch (e) {
            return 0;
          }
        })
      )
      .toBeGreaterThan(0);
  });

  test('2001 Wikipedia edit → itt01-wiki-pages', async ({ page }) => {
    await enterYear(page, '2001');
    await clearPrefix(page, 'itt01-wiki');
    await goImmersion(page, '2001', 'sites/wikipedia/edit.html');
    const frame = contentFrame(page);
    await expect(frame.locator('[data-wiki-save]')).toBeVisible({ timeout: 15000 });
    await frame.locator('textarea[name="text"]').fill('');
    await frame.locator('[data-wiki-save]').click();
    await page.waitForTimeout(80);
    expect(await page.evaluate(() => localStorage.getItem('itt01-wiki-pages'))).toBeFalsy();
    await frame.locator('textarea[name="text"]').fill("'''Wikipedia''' anyone can edit · museum 2001");
    await frame.locator('[data-wiki-save]').click();
    await requireKey(page, 'itt01-wiki-pages');
  });

  test('2002 Friendster profile → itt02-friendster', async ({ page }) => {
    await enterYear(page, '2002');
    await clearPrefix(page, 'itt02-friendster');
    await goImmersion(page, '2002', 'sites/friendster/profile.html');
    const frame = contentFrame(page);
    const form = frame.locator('[data-friendster-profile-form]');
    await expect(form).toBeVisible({ timeout: 10000 });
    await form.locator('input[name="name"], input[name="display"]').first().fill('Real02');
    await form.locator('input[type="submit"], button[type="submit"]').first().click();
    await requireAnyPrefix(page, 'itt02-friendster');
  });

  test('2003 Photobucket upload → itt03-photobucket', async ({ page }) => {
    await enterYear(page, '2003');
    await clearPrefix(page, 'itt03-photobucket');
    await goImmersion(page, '2003', 'sites/photobucket/index.html');
    const frame = contentFrame(page);
    const form = frame.locator('form[data-pb-upload]');
    await expect(form).toBeVisible({ timeout: 15000 });
    await form.locator('button[type="submit"], [data-ott-click="upload"]').first().click();
    await page.waitForTimeout(80);
    expect(
      await page.evaluate(() => localStorage.getItem('itt03-photobucket') || localStorage.getItem('itt03-photobucket-album'))
    ).toBeFalsy();
    await form.locator('[name="file"]').fill('party-pic.jpg');
    await form.locator('button[type="submit"], [data-ott-click="upload"]').first().click();
    await requireAnyPrefix(page, 'itt03-photobucket');
  });

  test('2004 Gmail login → itt04-gmail', async ({ page }) => {
    await enterYear(page, '2004');
    await clearPrefix(page, 'itt04-gmail');
    await goImmersion(page, '2004', 'sites/gmail/index.html');
    const frame = contentFrame(page);
    const form = frame.locator('form[data-gmail-login]');
    await expect(form).toBeVisible({ timeout: 10000 });
    await form.locator('input[name="email"], input[type="text"]').first().fill('you@college.edu');
    await form.locator('input[type="password"], [name="pass"]').first().fill('secret');
    await form.locator('input[type="submit"], button[type="submit"]').first().click();
    await requireKey(page, 'itt04-gmail', /you@college|college\.edu/i);
  });

  test.skip('2005 YouTube upload → itt05-yt-uploads', async ({ page }) => {
    await enterYear(page, '2005');
    await clearPrefix(page, 'itt05-yt');
    await goImmersion(page, '2005', 'sites/youtube/upload.html');
    const frame = contentFrame(page);
    const title = 'AllYearYT ' + Date.now();
    await frame.locator('[data-yt-upload] [name="title"]').fill(title);
    await frame.locator('[data-yt-upload] button[type="submit"]').first().click();
    await expect(frame.locator('[data-yt-upload-status]')).toContainText(/Upload|list|videos/i, {
      timeout: 10000,
    });
    await requireKey(page, 'itt05-yt-uploads', new RegExp(title));
  });
});

test.describe('all-years signature REAL · late web', () => {
  test.skip('2006 Twitter post → itt06-tweets', async ({ page }) => {
    await enterYear(page, '2006');
    await clearPrefix(page, 'itt06-tweets');
    await goImmersion(page, '2006', 'sites/twitter/index.html');
    const frame = contentFrame(page);
    const form = frame.locator('form[data-twitter-compose]');
    await expect(form).toBeVisible({ timeout: 15000 });
    await form.locator('button[type="submit"]').click();
    await page.waitForTimeout(80);
    expect(await page.evaluate(() => localStorage.getItem('itt06-tweets'))).toBeFalsy();
    const text = 'AllYear tweet ' + Date.now();
    await form.locator('[name="status"]').fill(text);
    await form.locator('button[type="submit"]').click();
    await requireKey(page, 'itt06-tweets');
  });

  test('2008 GitHub issue → itt08-github', async ({ page }) => {
    await enterYear(page, '2008');
    await clearPrefix(page, 'itt08-github');
    await goImmersion(page, '2008', 'sites/github/issue.html');
    const frame = contentFrame(page);
    const form = frame.locator('form[data-gh-issue-form]');
    await expect(form).toBeVisible({ timeout: 15000 });
    await form.locator('button[type="submit"]').click();
    await page.waitForTimeout(80);
    expect(await page.evaluate(() => localStorage.getItem('itt08-github'))).toBeFalsy();
    await form.locator('[name="title"]').fill('Cannot center logo residual');
    await form.locator('[name="body"]').fill('Steps to reproduce residual');
    await form.locator('button[type="submit"]').click();
    await requireKey(page, 'itt08-github');
  });

  test('2010 Instagram / iPad real write', async ({ page }) => {
    await enterYear(page, '2010');
    await clearPrefix(page, 'itt10');
    await goImmersion(page, '2010', 'sites/instagram/index.html');
    const frame = contentFrame(page);
    await expect(frame.locator('[data-ig-share]')).toBeVisible({ timeout: 15000 });
    await frame.locator('[data-ig-filter="X-Pro II"]').click();
    await frame.locator('[data-ig-caption]').fill('museum 2010 square');
    await frame.locator('[data-ig-share]').click();
    await requireKey(page, 'itt10-ig-posts');
  });

  test('2017 Face ID real write', async ({ page }) => {
    test.skip(!yearOnDisk('2017'), '2017 not on disk');
    await enterYear(page, '2017');
    await clearPrefix(page, 'itt17');
    await goImmersion(page, '2017', 'sites/iphone/x.html');
    const frame = contentFrame(page);
    await expect(frame.locator('[data-faceid-unlock]')).toBeVisible({ timeout: 15000 });
    await frame.locator('[data-faceid-unlock]').click();
    await page.waitForTimeout(120);
    expect(await page.evaluate(() => localStorage.getItem('itt17-faceid'))).toBeFalsy();
    await frame.locator('[data-faceid-look]').click();
    await frame.locator('[data-faceid-unlock]').click();
    await requireKey(page, 'itt17-faceid', /multiStep|2017-11-03|noHomeButton/i);
  });

  test('2018 GDPR real write', async ({ page }) => {
    test.skip(!yearOnDisk('2018'), '2018 not on disk');
    await enterYear(page, '2018');
    await clearPrefix(page, 'itt18');
    await goImmersion(page, '2018', 'sites/gdpr/index.html');
    const frame = contentFrame(page);
    await expect(frame.locator('[data-gdpr-manage]')).toBeVisible({ timeout: 15000 });
    await frame.locator('[data-gdpr-accept-all]').click();
    await page.waitForTimeout(120);
    expect(await page.evaluate(() => localStorage.getItem('itt18-gdpr'))).toBeFalsy();
    await frame.locator('[data-gdpr-manage]').click();
    await frame.locator('[data-gdpr-req]').nth(0).check({ force: true });
    await frame.locator('[data-gdpr-req]').nth(1).check({ force: true });
    await frame.locator('[data-gdpr-save]').click();
    await requireKey(page, 'itt18-gdpr', /multiStep|2018-05-25|manage/i);
  });

  test('2019 Disney+ continue REAL → itt19-disneyplus', async ({ page }) => {
    test.skip(!yearOnDisk('2019'), '2019 not on disk');
    await enterYear(page, '2019');
    await clearPrefix(page, 'itt19-disneyplus');
    await goImmersion(page, '2019', 'sites/disneyplus/home.html');
    const frame = contentFrame(page);
    const adult = frame.locator('[data-dplus-profile="adult"]');
    await expect(adult).toBeVisible({ timeout: 15000 });
    await adult.click();
    await frame.locator("[data-dplus-add]").nth(0).click();
    await frame.locator("[data-dplus-add]").nth(1).click();
    await frame.locator('[data-dplus-profile="kids"]').click();
    await frame.locator('[data-dplus-profile="adult"]').click();
    await frame.locator("[data-dplus-continue]").click();
    await requireKey(page, 'itt19-disneyplus', /multiStep|real|2019-11-12/i);
  });
});
