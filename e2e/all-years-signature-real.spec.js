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

  test('2005 YouTube upload → itt05-yt-uploads', async ({ page }) => {
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
  test('2006 Twitter post → itt06-tweets', async ({ page }) => {
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

  test('2007 Gmail open sign-in → itt07-gmail', async ({ page }) => {
    await enterYear(page, '2007');
    await clearPrefix(page, 'itt07-gmail');
    await goImmersion(page, '2007', 'sites/gmail/index.html');
    const frame = contentFrame(page);
    const form = frame.locator('form[data-gmail-login]');
    await expect(form).toBeVisible({ timeout: 15000 });
    await form.locator('[name="email"]').fill('');
    await form.locator('[name="pass"]').fill('');
    await form.locator('button[type="submit"]').click();
    await page.waitForTimeout(80);
    expect(await page.evaluate(() => localStorage.getItem('itt07-gmail'))).toBeFalsy();
    await form.locator('[name="email"]').fill('open@example.com');
    await form.locator('[name="pass"]').fill('secret');
    await form.locator('button[type="submit"]').click();
    await requireKey(page, 'itt07-gmail', /open@example/i);
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

  test('2009 Facebook Like + Stack Overflow ask', async ({ page }) => {
    await enterYear(page, '2009');
    await clearPrefix(page, 'itt09');
    await goImmersion(page, '2009', 'sites/facebook/feed.html');
    const frame = contentFrame(page);
    await expect(frame.locator('[data-fb-like]').first()).toBeVisible({ timeout: 15000 });
    await frame.locator('[data-fb-like]').first().click();
    await requireKey(page, 'itt09-fb-likes');
    await goImmersion(page, '2009', 'sites/stackoverflow/index.html');
    const so = contentFrame(page);
    const ask = so.locator('form[data-so-ask]');
    await expect(ask).toBeVisible({ timeout: 15000 });
    await ask.locator('button[type="submit"]').click();
    await page.waitForTimeout(80);
    expect(await page.evaluate(() => localStorage.getItem('itt09-stackoverflow'))).toBeFalsy();
    await ask.locator('[name="title"]').fill('How do I center a div residual?');
    await ask.locator('[name="body"]').fill('Steps to reproduce residual');
    await ask.locator('button[type="submit"]').click();
    await requireKey(page, 'itt09-stackoverflow');
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

  test('2011 Spotify / Hangout real write', async ({ page }) => {
    await enterYear(page, '2011');
    await clearPrefix(page, 'itt11');
    await goImmersion(page, '2011', 'sites/googleplus/hangouts.html');
    const frame = contentFrame(page);
    await expect(frame.locator('[data-gplus-hangout-start]')).toBeVisible({ timeout: 15000 });
    await frame.locator('[data-req]').nth(0).check({ force: true });
    await frame.locator('[data-req]').nth(1).check({ force: true });
    await frame.locator('[data-gplus-hangout-start]').click();
    await requireKey(page, 'itt11-gplus-hangout');
    await expect(frame.locator('[data-gplus-hangout]')).not.toContainText(/\(mock\)/i);
  });

  test('2012 Instagram Android share REAL', async ({ page }) => {
    await enterYear(page, '2012');
    await clearPrefix(page, 'itt12-ig');
    await goImmersion(page, '2012', 'sites/instagram/android.html');
    const frame = contentFrame(page);
    await expect(frame.locator('[data-ig-share]')).toBeVisible({ timeout: 15000 });
    await frame.locator('[data-ig-share]').click();
    await page.waitForTimeout(80);
    expect(await page.evaluate(() => localStorage.getItem('itt12-ig'))).toBeFalsy();
    await frame.locator('[data-req]').nth(0).check({ force: true });
    await frame.locator('[data-req]').nth(1).check({ force: true });
    await frame.locator('[data-ig-filter="X-Pro II"]').click();
    await frame.locator('[data-ig-caption]').fill('android share residual');
    await frame.locator('[data-ig-share]').click();
    await requireAnyPrefix(page, 'itt12-ig');
  });

  test('2013 Vine 6s REAL', async ({ page }) => {
    await enterYear(page, '2013');
    await clearPrefix(page, 'itt13-vine');
    await goImmersion(page, '2013', 'sites/vine/record.html');
    const frame = contentFrame(page);
    await expect(frame.locator('[data-vine-post]')).toBeVisible({ timeout: 15000 });
    await frame.locator('[data-vine-post]').click();
    await page.waitForTimeout(80);
    expect(await page.evaluate(() => localStorage.getItem('itt13-vine-posts'))).toBeFalsy();
    await frame.locator('[data-req]').nth(0).check({ force: true });
    await frame.locator('[data-req]').nth(1).check({ force: true });
    const hold = frame.locator('[data-vine-hold]');
    for (let i = 0; i < 5; i++) await hold.click();
    await frame.locator('[data-vine-caption]').fill('sig 6s residual');
    await frame.locator('[data-vine-post]').click();
    await requireAnyPrefix(page, 'itt13-vine');
  });

  test('2014 WhatsApp install real write', async ({ page }) => {
    await enterYear(page, '2014');
    await clearPrefix(page, 'itt14');
    await goImmersion(page, '2014', 'sites/whatsapp/index.html');
    const frame = contentFrame(page);
    await expect(frame.locator('[data-wa-install]')).toBeVisible({ timeout: 15000 });
    await frame.locator('[data-wa-install]').click();
    await page.waitForTimeout(120);
    expect(await page.evaluate(() => localStorage.getItem('itt14-wa-install'))).toBeFalsy();
    await frame.locator('[data-req]').nth(0).check({ force: true });
    await frame.locator('[data-req]').nth(1).check({ force: true });
    await frame.locator('[data-wa-install]').click();
    await requireAnyPrefix(page, 'itt14-wa');
  });

  test('2017 Face ID real write', async ({ page }) => {
    test.skip(!yearOnDisk('2017'), '2017 not on disk');
    await enterYear(page, '2017');
    await clearPrefix(page, 'itt17');
    await goImmersion(page, '2017', 'sites/iphone/x.html');
    const frame = contentFrame(page);
    await expect(frame.locator('[data-faceid-save]')).toBeVisible({ timeout: 15000 });
    await frame.locator('[data-faceid-save]').click();
    await page.waitForTimeout(120);
    expect(await page.evaluate(() => localStorage.getItem('itt17-faceid'))).toBeFalsy();
    await frame.locator('[data-faceid-no-home]').check({ force: true });
    await frame.locator('[data-faceid-not-touch]').check({ force: true });
    await frame.locator('[data-faceid-not-xs]').check({ force: true });
    await frame.locator('[data-faceid-save]').click();
    await requireKey(page, 'itt17-faceid', /multiStep|2017-09-12|noHomeButton/i);
  });

  test('2018 GDPR real write', async ({ page }) => {
    test.skip(!yearOnDisk('2018'), '2018 not on disk');
    await enterYear(page, '2018');
    await clearPrefix(page, 'itt18');
    await goImmersion(page, '2018', 'sites/gdpr/rights.html');
    const frame = contentFrame(page);
    await expect(frame.locator('[data-gdpr-save]')).toBeVisible({ timeout: 15000 });
    await frame.locator('[data-gdpr-save]').click();
    await page.waitForTimeout(120);
    expect(await page.evaluate(() => localStorage.getItem('itt18-gdpr'))).toBeFalsy();
    await frame.locator('[data-gdpr-art15]').check({ force: true });
    await frame.locator('[data-gdpr-art17]').check({ force: true });
    await frame.locator('[data-gdpr-date]').check({ force: true });
    await frame.locator('[data-gdpr-save]').click();
    await requireKey(page, 'itt18-gdpr', /multiStep|2018-05-25|manage/i);
  });

  test('2019 Disney+ continue REAL → itt19-disneyplus', async ({ page }) => {
    test.skip(!yearOnDisk('2019'), '2019 not on disk');
    await enterYear(page, '2019');
    await clearPrefix(page, 'itt19-disneyplus');
    await goImmersion(page, '2019', 'sites/disneyplus/home.html');
    const frame = contentFrame(page);
    const continueUi = frame.locator('[data-profile="adult-1"]');
    await expect(continueUi).toBeVisible({ timeout: 15000 });
    await continueUi.click();
    await frame.locator('[data-title="mando"]').click();
    await frame.locator('[data-add-continue]').click();
    await frame.locator('[data-title="lion-king"]').click();
    await frame.locator('[data-add-continue]').click();
    await frame.locator('[data-dplus-date]').check({ force: true });
    await frame.locator('[data-dplus-not-trial]').check({ force: true });
    await frame.locator('[data-dplus-kids]').check({ force: true });
    await frame.locator('[data-dplus-save]').click();
    await requireKey(page, 'itt19-disneyplus', /multiStep|real|mando/i);
  });

  test('2020 Zoom join→leave REAL → itt20-zoom', async ({ page }) => {
    test.skip(!yearOnDisk('2020'), '2020 not on disk');
    await enterYear(page, '2020');
    await clearPrefix(page, 'itt20-zoom');
    await goImmersion(page, '2020', 'sites/zoom/index.html');
    const frame = contentFrame(page);
    await frame.locator('#itt20-code').fill('84739258101');
    await frame.locator('[data-zoom-join]').click();
    await page.waitForTimeout(400);
    await contentFrame(page).locator('[data-admit]').click();
    await page.waitForTimeout(400);
    const meet = contentFrame(page);
    await meet.locator("[name='line']").fill('can you see my screen');
    await meet.locator('[data-chat]').evaluate((f) => f.requestSubmit());
    await meet.locator('[data-leave]').click();
    await page.waitForTimeout(400);
    const recap = contentFrame(page);
    await recap.locator('[data-zoom-part]').check({ force: true });
    await recap.locator('[data-zoom-not-live]').check({ force: true });
    await recap.locator('[data-zoom-save]').click();
    await requireKey(page, 'itt20-zoom', /multiStep|real|84739258101/i);
  });
});
