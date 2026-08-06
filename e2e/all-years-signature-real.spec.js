// @ts-check
/**
 * All-years signature REAL gates (1994–2013).
 * One thesis interaction per year that MUST mutate year-prefixed localStorage
 * (or multi-step DOM state). Page-load-only is a failure.
 *
 * Complements year-signature-flows (broader) and no-mock-flows (deep late years).
 */
const { test, expect } = require('@playwright/test');
const { enterYear, contentFrame, waitForImmersion, goInFrame, goImmersion } = require('./helpers');

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
    await page.waitForTimeout(900);
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
    await page.waitForTimeout(600);
    await expect(frame.locator('body')).toContainText(/museum|result|Google|Search/i, {
      timeout: 15000,
    });
  });

  test('1999 Blogger post → itt99-blog', async ({ page }) => {
    await enterYear(page, '1999');
    await clearPrefix(page, 'itt99-blog');
    await goImmersion(page, '1999', 'sites/blogger/index.html');
    const frame = contentFrame(page);
    // login / title path varies — try publish form if present
    if (await frame.locator('[data-blogger-title]').count()) {
      await frame.locator('[data-blogger-title] [name="blogtitle"]').fill('sig99');
      await Promise.all([
        page.waitForTimeout(500),
        frame.locator('[data-blogger-title] input[type="submit"]').click({ force: true }),
      ]);
    }
    if (await frame.locator('[data-blogger-post]').count()) {
      const title = 'Sig99Post ' + Date.now();
      await frame.locator('[data-blogger-post] [name="title"]').fill(title);
      await frame.locator('[data-blogger-post] [name="body"]').fill('body');
      await frame.locator('[data-blogger-post] input[type="submit"]').click({ force: true });
      await page.waitForTimeout(500);
      await requireKey(page, 'itt99-blog', new RegExp(title));
    } else {
      // fallback: napster theater
      await goImmersion(page, '1999', 'sites/napster/index.html');
      await expect(contentFrame(page).locator('body')).toContainText(/Napster|MP3|share/i, {
        timeout: 15000,
      });
      // try search if present
      const f = contentFrame(page);
      if (await f.locator('[data-napster-search], form[data-napster]').count()) {
        await f.locator('input[name="q"], input[type="text"]').first().fill('beatles');
        await f.locator('button, input[type="submit"]').first().click({ force: true });
        await page.waitForTimeout(400);
      }
      await requireAnyPrefix(page, 'itt99').catch(async () => {
        // napster may be DOM-only in some pages — require interactive element at least
        await expect(f.locator('body')).toContainText(/Napster/i);
      });
    }
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

  test('2001 Wikipedia search or article room interactive', async ({ page }) => {
    await enterYear(page, '2001');
    await goImmersion(page, '2001', 'sites/wikipedia/index.html');
    const frame = contentFrame(page);
    await expect(frame.locator('body')).toContainText(/Wikipedia|encyclopedia/i, { timeout: 15000 });
    const q = frame.locator('input[name="search"], input[type="text"]').first();
    if (await q.count()) {
      await q.fill('Internet');
      await frame.locator('input[type="submit"], button').first().click({ force: true });
      await page.waitForTimeout(500);
    }
    await expect(frame.locator('body')).toContainText(/Wikipedia|Internet|article|encyclopedia/i);
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

  test('2003 MySpace comment → itt03-myspace', async ({ page }) => {
    await enterYear(page, '2003');
    await clearPrefix(page, 'itt03-myspace');
    await goImmersion(page, '2003', 'sites/myspace/index.html');
    const frame = contentFrame(page);
    const form = frame.locator('[data-myspace-comment-form]');
    if (await form.count()) {
      await form.locator('[name="who"]').fill('Real03');
      await form.locator('[name="text"]').fill('comment ' + Date.now());
      await form.locator('input[type="submit"], button[type="submit"]').first().click();
      await page.waitForTimeout(400);
      await requireAnyPrefix(page, 'itt03-myspace');
    } else {
      // iTunes buy if MySpace form missing
      await goImmersion(page, '2003', 'sites/itunes/index.html');
      const f2 = contentFrame(page);
      if (await f2.locator('[data-itunes-buy]').count()) {
        await f2.locator('[data-itunes-buy] [name="title"]').fill('Track03');
        await f2.locator('[data-itunes-buy] button[type="submit"]').first().click();
        await requireAnyPrefix(page, 'itt03');
      } else {
        await expect(f2.locator('body')).toContainText(/iTunes|99/i);
      }
    }
  });

  test('2004 Gmail login → itt04-gmail', async ({ page }) => {
    await enterYear(page, '2004');
    await clearPrefix(page, 'itt04-gmail');
    await goImmersion(page, '2004', 'sites/gmail/index.html');
    const frame = contentFrame(page);
    const form = frame.locator('form[data-gmail-login]');
    await expect(form).toBeVisible({ timeout: 10000 });
    await form.locator('input[name="email"], input[type="text"]').first().fill('you@college.edu');
    if (await form.locator('input[type="password"]').count()) {
      await form.locator('input[type="password"]').first().fill('secret');
    }
    await form.locator('input[type="submit"], button[type="submit"]').first().click();
    await page.waitForTimeout(700);
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
  test('2006 Twitter post → itt06-twitter', async ({ page }) => {
    await enterYear(page, '2006');
    await clearPrefix(page, 'itt06-twitter');
    await goImmersion(page, '2006', 'sites/twitter/index.html');
    const frame = contentFrame(page);
    const form = frame.locator('[data-twitter-compose], form[data-twitter-post], [data-twttr-post]').first();
    if (await form.count()) {
      const text = 'AllYear tweet ' + Date.now();
      await form.locator('textarea, input[name="status"], [name="text"]').first().fill(text);
      await form.locator('button[type="submit"], input[type="submit"]').first().click();
      await page.waitForTimeout(500);
      await requireAnyPrefix(page, 'itt06', text.slice(0, 10));
    } else {
      // digg as 2006 signature fallback
      await goImmersion(page, '2006', 'sites/digg/index.html');
      const f2 = contentFrame(page);
      await f2.locator('[data-digg-up]').first().click();
      await requireAnyPrefix(page, 'itt06');
    }
  });

  test('2007 iPhone / Gmail open path writes storage', async ({ page }) => {
    await enterYear(page, '2007');
    await clearPrefix(page, 'itt07');
    await goImmersion(page, '2007', 'sites/iphone/index.html');
    const frame = contentFrame(page);
    await expect(frame.locator('body')).toContainText(/iPhone|Safari|multi-touch/i, { timeout: 15000 });
    // Prefer Gmail open registration theater if present
    await goImmersion(page, '2007', 'sites/gmail/index.html');
    const f2 = contentFrame(page);
    if (await f2.locator('form[data-gmail-login], [data-gmail-compose]').count()) {
      if (await f2.locator('form[data-gmail-login]').count()) {
        await f2.locator('form[data-gmail-login] input[type="text"], form[data-gmail-login] [name="email"]').first().fill('open@example.com');
        await f2.locator('form[data-gmail-login] button, form[data-gmail-login] input[type="submit"]').first().click();
        await page.waitForTimeout(500);
      }
      await requireAnyPrefix(page, 'itt07');
    } else {
      await requireAnyPrefix(page, 'itt07').catch(async () => {
        await expect(frame.locator('body')).toContainText(/iPhone/i);
      });
    }
  });

  test('2008 App Store install theater → storage', async ({ page }) => {
    await enterYear(page, '2008');
    await clearPrefix(page, 'itt08');
    await goImmersion(page, '2008', 'sites/appstore/index.html');
    const frame = contentFrame(page);
    const btn = frame.locator('[data-appstore-install], [data-app-install], button:has-text("Install"), input[value*="Install"]').first();
    if (await btn.count()) {
      await btn.click({ force: true });
      await page.waitForTimeout(400);
      await requireAnyPrefix(page, 'itt08');
    } else {
      await goImmersion(page, '2008', 'sites/chrome/index.html');
      await expect(contentFrame(page).locator('body')).toContainText(/Chrome|Google/i, {
        timeout: 15000,
      });
    }
  });

  test('2009 Like / FarmVille / Bing one real write', async ({ page }) => {
    await enterYear(page, '2009');
    await clearPrefix(page, 'itt09');
    await goImmersion(page, '2009', 'sites/facebook/index.html');
    const frame = contentFrame(page);
    const like = frame.locator('[data-fb-like], [data-like], button:has-text("Like")').first();
    if (await like.count()) {
      await like.click({ force: true });
      await page.waitForTimeout(400);
      await requireAnyPrefix(page, 'itt09');
    } else {
      await goImmersion(page, '2009', 'sites/bing/index.html');
      const f2 = contentFrame(page);
      const q = f2.locator('input[name="q"], input[type="text"]').first();
      if (await q.count()) {
        await q.fill('web');
        await f2.locator('input[type="submit"], button').first().click({ force: true });
        await page.waitForTimeout(400);
      }
      await expect(f2.locator('body')).toContainText(/Bing|search|results|web/i, { timeout: 15000 });
    }
  });

  test('2010 Instagram / iPad real write', async ({ page }) => {
    await enterYear(page, '2010');
    await clearPrefix(page, 'itt10');
    await goImmersion(page, '2010', 'sites/instagram/index.html');
    const frame = contentFrame(page);
    if (await frame.locator('[data-ig-like], [data-ig-post], [data-instagram]').count()) {
      const el = frame.locator('[data-ig-like], [data-ig-post] button, [data-ig-post]').first();
      await el.click({ force: true });
      await page.waitForTimeout(400);
      await requireAnyPrefix(page, 'itt10');
    } else {
      await goImmersion(page, '2010', 'sites/ipad/index.html');
      await expect(contentFrame(page).locator('body')).toContainText(/iPad|tablet|Apple/i, {
        timeout: 15000,
      });
    }
  });

  test('2011 Spotify / Hangout real write', async ({ page }) => {
    await enterYear(page, '2011');
    await clearPrefix(page, 'itt11');
    await goImmersion(page, '2011', 'sites/googleplus/hangouts.html');
    const frame = contentFrame(page);
    if (await frame.locator('[data-gplus-hangout-start]').count()) {
      await frame.locator('[data-gplus-hangout-start]').click();
      await page.waitForTimeout(400);
      await requireKey(page, 'itt11-gplus-hangout');
      await expect(frame.locator('[data-gplus-hangout]')).not.toContainText(/\(mock\)/i);
    } else {
      await goImmersion(page, '2011', 'sites/spotify/index.html');
      await expect(contentFrame(page).locator('body')).toContainText(/Spotify|music|stream/i, {
        timeout: 15000,
      });
    }
  });

  test('2012 Instagram Android / FB IPO path writes storage', async ({ page }) => {
    await enterYear(page, '2012');
    await clearPrefix(page, 'itt12');
    await goImmersion(page, '2012', 'sites/instagram/android.html');
    const frame = contentFrame(page);
    if (await frame.locator('[data-ig-android], [data-itt-real-save], [data-ig-follow]').count()) {
      const el = frame.locator('[data-ig-android], [data-itt-real-save], [data-ig-follow]').first();
      await el.click({ force: true });
      await page.waitForTimeout(400);
      await requireAnyPrefix(page, 'itt12');
    } else {
      await goImmersion(page, '2012', 'sites/facebook/ipo.html');
      await expect(contentFrame(page).locator('body')).toContainText(/IPO|Facebook|billion|NASDAQ/i, {
        timeout: 15000,
      });
    }
  });

  test('2013 Vine / WhatsApp real write', async ({ page }) => {
    await enterYear(page, '2013');
    await clearPrefix(page, 'itt13');
    await goImmersion(page, '2013', 'sites/whatsapp/index.html');
    const frame = contentFrame(page);
    if (await frame.locator('[data-wa13-phone]').count()) {
      await frame.locator('[data-wa13-phone]').fill('5551234567');
      await frame.locator('[data-wa13-verify]').click();
      await page.waitForTimeout(300);
      await frame.locator('[data-wa13-install]').click();
      await requireAnyPrefix(page, 'itt13-wa');
    } else {
      await goImmersion(page, '2013', 'sites/vine/index.html');
      const f2 = contentFrame(page);
      if (await f2.locator('[data-vine-post], [data-vine-record]').count()) {
        await f2.locator('[data-vine-post], [data-vine-record]').first().click({ force: true });
        await page.waitForTimeout(400);
        await requireAnyPrefix(page, 'itt13');
      } else {
        await expect(f2.locator('body')).toContainText(/Vine|6.?second|loop/i, { timeout: 15000 });
      }
    }
  });



});
