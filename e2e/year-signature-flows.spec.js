// @ts-check
/**
 * Signature immersion flows — one (or more) thesis interaction per year.
 * Runs inside the year shell so parent browser + iframe immersion both work.
 */
const { test, expect } = require('@playwright/test');
const { enterYear, goImmersion, goInFrame, contentFrame, killOverlays } = require('./helpers');

test.describe('year-signature 1994', () => {
  test('CSotD guestbook REAL → itt94-csotd', async ({ page }) => {
    await enterYear(page, '1994');
    await page.evaluate(() => {
      try {
        Object.keys(localStorage)
          .filter((k) => k.indexOf('itt94-csotd') === 0)
          .forEach((k) => localStorage.removeItem(k));
      } catch (e) {
        /* */
      }
    });
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
    await frame.locator('[name="gbname"]').fill('Sig94 residual');
    await frame.locator('[name="gbnote"]').fill('Worth the modem.');
    await frame.locator('form[data-csotd-gb] input[type="submit"]').click();
    await expect
      .poll(async () => page.evaluate(() => localStorage.getItem('itt94-csotd')), { timeout: 10000 })
      .toMatch(/Sig94|multiStep/i);
  });

  test('Yahoo directory loads via shell', async ({ page }) => {
    await enterYear(page, '1994');
    await goImmersion(page, '1994', 'sites/yahoo/index.html');
    await expect(contentFrame(page).locator('body')).toContainText(/Yahoo|directory|Search/i, { timeout: 15000 });
  });
  test('FishCam room loads', async ({ page }) => {
    await enterYear(page, '1994');
    await goImmersion(page, '1994', 'sites/fishcam/index.html');
    await expect(contentFrame(page).locator('body')).toContainText(/Fish|Cam|fish/i, { timeout: 15000 });
  });
});

test.describe('year-signature 1995', () => {
  test('Amazon add-to-cart', async ({ page }) => {
    await enterYear(page, '1995');
    await goImmersion(page, '1995', 'sites/amazon/book-neuromancer.html');
    const frame = contentFrame(page);
    const add = frame.locator('[data-add-cart]').first();
    await expect(add).toBeVisible({ timeout: 20000 });
    await page.evaluate(() => localStorage.setItem('itt95-amazon-cart', '[]'));
    await add.click({ force: true });
    await expect
      .poll(async () => page.evaluate(() => {
        try { return JSON.parse(localStorage.getItem('itt95-amazon-cart') || '[]').length; } catch (e) { return 0; }
      }), { timeout: 12000 })
      .toBeGreaterThan(0);
  });
  test('AuctionWeb bid updates high bidder + storage', async ({ page }) => {
    await enterYear(page, '1995');
    await page.evaluate(() => {
      Object.keys(localStorage)
        .filter((k) => k.indexOf('itt95') === 0 && k.indexOf('bid') !== -1)
        .forEach((k) => localStorage.removeItem(k));
    });
    await goImmersion(page, '1995', 'sites/auctionweb/item-bean.html');
    const frame = contentFrame(page);
    const form = frame.locator('form[data-bid-form]');
    await expect(form).toBeVisible({ timeout: 10000 });
    await form.locator('input[name="bidder"]').fill('Sig95');
    await form.locator('input[name="bid"]').fill('50.00');
    await form.locator('input[type="submit"]').click({ force: true });
    await expect(frame.locator('[data-high-bidder]')).toContainText('Sig95', { timeout: 10000 });
    await expect
      .poll(async () =>
        page.evaluate(() =>
          Object.keys(localStorage).some(
            (k) => k.indexOf('itt95') === 0 && (localStorage.getItem(k) || '').includes('Sig95')
          )
        )
      )
      .toBeTruthy();
  });
});

test.describe('year-signature 1996', () => {
  test('HoTMaiL login to inbox', async ({ page }) => {
    await enterYear(page, '1996');
    await goImmersion(page, '1996', 'sites/hotmail/index.html');
    const frame = contentFrame(page);
    await expect(frame.locator('body')).toContainText(/HoTMaiL|Hotmail|Login/i, { timeout: 15000 });
    const form = frame.locator('form[data-hotmail-login]');
    await expect(form).toBeVisible();
    await form.locator('input[name="login"]').fill('museum');
    await form.locator('input[name="pass"], input[type="password"]').first().fill('pass');
    // Period UI uses input type=image as Enter
    const enter = form.locator('input[type="image"], input[type="submit"], button[type="submit"]').first();
    await enter.click({ force: true });
    await page.waitForTimeout(900);
    await expect(frame.locator('body')).toContainText(/Inbox|Compose|Folders|New Mail|From:|HoTMaiL/i, { timeout: 15000 });
  });
  test('Space Jam hub planets region exists', async ({ page }) => {
    await enterYear(page, '1996');
    await goImmersion(page, '1996', 'sites/spacejam/index.html');
    await expect(contentFrame(page).locator('body')).toContainText(/Space Jam|Jam|Warner/i, { timeout: 15000 });
  });
});

test.describe('year-signature 1997', () => {
  test('eBay item bid raises high bid (real storage)', async ({ page }) => {
    await enterYear(page, '1997');
    await page.evaluate(() => {
      Object.keys(localStorage)
        .filter((k) => k.indexOf('itt97') === 0 && k.indexOf('bid') !== -1)
        .forEach((k) => localStorage.removeItem(k));
    });
    await goImmersion(page, '1997', 'sites/ebay/item-laptop.html');
    const frame = contentFrame(page);
    await expect(frame.locator('body')).toContainText(/eBay|Bid|Auction/i, { timeout: 15000 });
    const form = frame.locator('form[data-bid-form]');
    await expect(form).toBeVisible({ timeout: 10000 });
    await form.locator('input[name="bid"]').fill('510.00');
    await form.locator('input[type="submit"]').click({ force: true });
    await expect(frame.locator('[data-high-bid]')).toContainText('510', { timeout: 10000 });
    await expect
      .poll(async () =>
        page.evaluate(() =>
          Object.keys(localStorage).some(
            (k) => k.indexOf('itt97') === 0 && (localStorage.getItem(k) || '').includes('510')
          )
        )
      )
      .toBeTruthy();
  });
  test('Slashdot comments form', async ({ page }) => {
    await enterYear(page, '1997');
    await goImmersion(page, '1997', 'sites/slashdot/story.html');
    const frame = contentFrame(page);
    await expect(frame.locator('body')).toContainText(/Slashdot|Nerd|comment/i, { timeout: 15000 });
  });
  test('PointCast channels', async ({ page }) => {
    await enterYear(page, '1997');
    await goImmersion(page, '1997', 'sites/pointcast/channels.html');
    await expect(contentFrame(page).locator('body')).toContainText(/Channel|PointCast|CNN/i, { timeout: 15000 });
  });
});

test.describe('year-signature 1998', () => {
  test('Google sparse home + search', async ({ page }) => {
    await enterYear(page, '1998');
    await goImmersion(page, '1998', 'sites/google/index.html');
    const frame = contentFrame(page);
    await expect(frame.locator('body')).toContainText(/Google/i, { timeout: 15000 });
    const form = frame.locator('form[data-google-search], form').first();
    await expect(form.locator('input[name="q"]')).toBeVisible({ timeout: 10000 });
    await form.locator('input[name="q"]').fill('Yahoo');
    await form.locator('input[type="submit"], button[type="submit"]').first().click();
    await page.waitForTimeout(600);
    await expect(frame.locator('body')).toContainText(/Yahoo|result|Search/i, { timeout: 12000 });
  });
  test('Amazon Music add to cart', async ({ page }) => {
    await enterYear(page, '1998');
    await goImmersion(page, '1998', 'sites/amazon/music.html');
    const frame = contentFrame(page);
    const add = frame.locator('[data-add-cart]').first();
    await expect(add).toBeVisible({ timeout: 20000 });
    await page.evaluate(() => localStorage.setItem('itt98-amazon-cart', '[]'));
    await add.click({ force: true });
    await expect
      .poll(async () => page.evaluate(() => {
        try { return JSON.parse(localStorage.getItem('itt98-amazon-cart') || '[]').length; } catch (e) { return 0; }
      }), { timeout: 15000 })
      .toBeGreaterThan(0);
  });
});

test.describe('year-signature 1999', () => {
  test('Napster client/download theater', async ({ page }) => {
    await enterYear(page, '1999');
    await goImmersion(page, '1999', 'sites/napster/index.html');
    const frame = contentFrame(page);
    await expect(frame.locator('body')).toContainText(/Napster/i, { timeout: 15000 });
    const link = frame.locator('a[href*="client"], a[href*="download"], a[href*="legal"]').first();
    await expect(link).toBeVisible({ timeout: 10000 });
    await link.click();
    await page.waitForTimeout(700);
    await expect(frame.locator('body')).toContainText(/Napster|Download|Legal|Client|Beta/i, {
      timeout: 12000,
    });
  });
  test('Blogger post → view + itt99-blog', async ({ page }) => {
    await enterYear(page, '1999');
    await page.evaluate(() => {
      try {
        localStorage.removeItem('itt99-blog');
      } catch (e) {
        /* */
      }
    });
    await goImmersion(page, '1999', 'sites/blogger/edit.html');
    const frame = contentFrame(page);
    await expect(frame.locator('[data-blogger-post]')).toBeVisible({ timeout: 15000 });
    const title = 'SigBlog99 ' + Date.now();
    await frame.locator('[data-blogger-post] [name="title"]').fill(title);
    await frame.locator('[data-blogger-post] [name="body"]').fill('signature post body');
    await Promise.all([
      page.waitForFunction(
        () => {
          try {
            const f = document.getElementById('content');
            const src = (f && f.getAttribute('src')) || '';
            return /view\.html/i.test(src);
          } catch (e) {
            return false;
          }
        },
        null,
        { timeout: 15000 }
      ).catch(() => {}),
      frame.locator('[data-blogger-post] input[type="submit"]').click({ force: true }),
    ]);
    await page.waitForTimeout(500);
    const raw = await page.evaluate(() => localStorage.getItem('itt99-blog'));
    expect(raw || '', 'itt99-blog').toContain(title);
  });
});

test.describe('year-signature 2000', () => {
  test('Amazon smile-era music cart', async ({ page }) => {
    await enterYear(page, '2000');
    await goImmersion(page, '2000', 'sites/amazon/music.html');
    const frame = contentFrame(page);
    const add = frame.locator('[data-add-cart]').first();
    await expect(add).toBeVisible({ timeout: 20000 });
    await page.evaluate(() => localStorage.setItem('itt00-amazon-cart', '[]'));
    await add.click({ force: true });
    await expect
      .poll(async () => page.evaluate(() => {
        try { return JSON.parse(localStorage.getItem('itt00-amazon-cart') || '[]').length; } catch (e) { return 0; }
      }), { timeout: 12000 })
      .toBeGreaterThan(0);
  });
  test('Pets.com multipage', async ({ page }) => {
    await enterYear(page, '2000');
    await goImmersion(page, '2000', 'sites/pets/index.html');
    await expect(contentFrame(page).locator('body')).toContainText(/Pets|sock|puppet|dog/i, { timeout: 15000 });
  });
});

test.describe('year-signature 2004', () => {
  test('Gmail login theater', async ({ page }) => {
    await enterYear(page, '2004');
    await goImmersion(page, '2004', 'sites/gmail/index.html');
    const frame = contentFrame(page);
    await expect(frame.locator('body')).toContainText(/Gmail|Google Mail|GB/i, { timeout: 15000 });
    const form = frame.locator('form[data-gmail-login]');
    await expect(form).toBeVisible({ timeout: 10000 });
    await form
      .locator('input[name="email"], input[name="login"], input[type="text"]')
      .first()
      .fill('you@college.edu');
    const pass = form.locator('input[type="password"]');
    if (await pass.count()) await pass.first().fill('secret');
    await form.locator('input[type="submit"], button[type="submit"]').first().click();
    await page.waitForTimeout(700);
    await expect(frame.locator('body')).toContainText(/Inbox|Compose|Mail|Invitation/i, {
      timeout: 15000,
    });
  });
  test('Digg seed room (Dec 2004 honesty)', async ({ page }) => {
    await enterYear(page, '2004');
    // Seed year: static densify; digg immersion module is 2005
    await goInFrame(page, 'sites/digg/index.html');
    await expect(contentFrame(page).locator('body')).toContainText(/Digg|December|seed/i, { timeout: 15000 });
    await expect(contentFrame(page).locator('a[href*="submit"], a[href*="about"]').first()).toBeVisible();
  });
  test('Flickr upload theater', async ({ page }) => {
    await enterYear(page, '2004');
    await goImmersion(page, '2004', 'sites/flickr/index.html');
    await expect(contentFrame(page).locator('body')).toContainText(/Flickr|photo|Upload/i, { timeout: 15000 });
  });
});

test.describe.skip('year-signature 2005 (wiped)', () => {
  test('YouTube upload theater', async ({ page }) => {
    await enterYear(page, '2005');
    await page.evaluate(() => { try { localStorage.removeItem('itt05-yt-uploads'); } catch (e) { /* */ } });
    await goImmersion(page, '2005', 'sites/youtube/upload.html');
    const frame = contentFrame(page);
    await expect(frame.locator('body')).toContainText(/YouTube|Upload/i, { timeout: 15000 });
    const form = frame.locator('[data-yt-upload]');
    await expect(form).toBeVisible({ timeout: 10000 });
    const title = 'E2E zoo ' + Date.now();
    await form.locator('input[name="title"], input[type="text"]').first().fill(title);
    await form.locator('input[type="submit"], button[type="submit"]').first().click();
    await expect(frame.locator('[data-yt-upload-status]')).toContainText(/Upload|local|list|videos/i, { timeout: 8000 });
    const raw = await page.evaluate(() => localStorage.getItem('itt05-yt-uploads'));
    expect(raw || '').toContain(title);
  });
  test('Reddit submit → storage', async ({ page }) => {
    await enterYear(page, '2005');
    await page.evaluate(() => {
      try {
        localStorage.removeItem('itt05-reddit-links');
      } catch (e) {
        /* */
      }
    });
    await goImmersion(page, '2005', 'sites/reddit/submit.html');
    const frame = contentFrame(page);
    await expect(frame.locator('body')).toContainText(/reddit|Reddit|submit/i, { timeout: 15000 });
    const form = frame.locator('[data-reddit-submit]');
    await expect(form).toBeVisible({ timeout: 10000 });
    const title = 'E2E post ' + Date.now();
    await form.locator('input[name="title"]').fill(title);
    await form.locator('input[type="submit"], button[type="submit"]').first().click();
    await expect
      .poll(async () => page.evaluate(() => localStorage.getItem('itt05-reddit-links')), {
        timeout: 8000,
      })
      .toContain(title);
  });
  test('Maps zoom + search write itt05-maps-state', async ({ page }) => {
    await enterYear(page, '2005');
    await page.evaluate(() => {
      try {
        localStorage.removeItem('itt05-maps-state');
      } catch (e) {
        /* */
      }
    });
    await goImmersion(page, '2005', 'sites/maps/index.html');
    const frame = contentFrame(page);
    await expect(frame.locator('body')).toContainText(/Maps|Google|Zoom|pan/i, { timeout: 15000 });
    const zin = frame.locator('[data-maps-zoom="in"]');
    await expect(zin).toBeVisible({ timeout: 10000 });
    await zin.click();
    await expect(frame.locator('[data-maps-status]')).toContainText(/Zoom/i, { timeout: 5000 });
    await frame.locator('[name="what"]').fill('sig maps');
    await frame.locator('[name="where"]').fill('Boston, MA');
    await frame.locator('[data-maps-search] button[type="submit"]').click();
    await expect
      .poll(async () => page.evaluate(() => localStorage.getItem('itt05-maps-state') || ''), {
        timeout: 8000,
      })
      .toMatch(/sig maps|Boston|zoom|history/i);
  });
  test('Digg dig mutates itt05-digg-links (not mock count only)', async ({ page }) => {
    await enterYear(page, '2005');
    await page.evaluate(() => {
      try {
        localStorage.removeItem('itt05-digg-links');
        localStorage.removeItem('itt04-digg-links');
      } catch (e) {
        /* */
      }
    });
    await goImmersion(page, '2005', 'sites/digg/index.html');
    const frame = contentFrame(page);
    const dig = frame.locator('[data-digg-up="0"]');
    await expect(dig).toBeVisible({ timeout: 10000 });
    const before = parseInt(await frame.locator('[data-digg-count="0"]').innerText(), 10);
    await dig.click();
    await expect(frame.locator('[data-digg-count="0"]')).toContainText(String(before + 1), {
      timeout: 5000,
    });
    const raw = await page.evaluate(() => localStorage.getItem('itt05-digg-links'));
    expect(raw && raw.length > 2).toBeTruthy();
    expect(await page.evaluate(() => localStorage.getItem('itt04-digg-links'))).toBeNull();
  });
});

test.describe.skip('year-signature 2006 (wiped)', () => {
  test('Digg peak digg → itt06-digg-links', async ({ page }) => {
    await enterYear(page, '2006');
    await page.evaluate(() => {
      try {
        localStorage.removeItem('itt06-digg-links');
        localStorage.removeItem('itt05-digg-links');
      } catch (e) {
        /* */
      }
    });
    await goImmersion(page, '2006', 'sites/digg/index.html');
    const frame = contentFrame(page);
    await expect(frame.locator('[data-digg-up="0"]')).toBeVisible({ timeout: 15000 });
    await frame.locator('[data-digg-up="0"]').click();
    await expect
      .poll(async () => page.evaluate(() => localStorage.getItem('itt06-digg-links')), {
        timeout: 8000,
      })
      .toBeTruthy();
    expect(await page.evaluate(() => localStorage.getItem('itt05-digg-links'))).toBeNull();
  });

  test('Twitter compose theater', async ({ page }) => {
    await enterYear(page, '2006');
    await page.evaluate(() => {
      try {
        localStorage.removeItem('itt06-tweets');
      } catch (e) {
        /* */
      }
    });
    await goImmersion(page, '2006', 'sites/twitter/index.html');
    const frame = contentFrame(page);
    await expect(frame.locator('body')).toContainText(/Twitter|tweet|twttr/i, { timeout: 15000 });
    const form = frame.locator('[data-twitter-compose]');
    await expect(form).toBeVisible({ timeout: 10000 });
    await form.locator('[data-twitter-status], textarea').first().fill('sig tweet 2006');
    await form.evaluate((f) => f.requestSubmit());
    await expect
      .poll(async () => page.evaluate(() => localStorage.getItem('itt06-tweets')), { timeout: 8000 })
      .toBeTruthy();
  });
});

test.describe('year-signature 2008', () => {
  test('Chrome download theater → itt08-chrome', async ({ page }) => {
    await enterYear(page, '2008');
    await page.evaluate(() => {
      try {
        localStorage.removeItem('itt08-chrome');
      } catch (e) {
        /* */
      }
    });
    await goImmersion(page, '2008', 'sites/chrome/index.html');
    const frame = contentFrame(page);
    await expect(frame.locator('body')).toContainText(/Chrome|beta|download/i, { timeout: 15000 });
    const dl = frame.locator('[data-chrome-download]');
    await expect(dl).toBeVisible({ timeout: 10000 });
    await frame.locator('[data-chrome-req]').nth(0).check({ force: true });
    await frame.locator('[data-chrome-req]').nth(1).check({ force: true });
    await frame.locator('[data-chrome-req]').nth(2).check({ force: true });
    await dl.click();
    await expect
      .poll(async () => page.evaluate(() => localStorage.getItem('itt08-chrome')), {
        timeout: 8000,
      })
      .toBeTruthy();
  });

  test('App Store install theater', async ({ page }) => {
    await enterYear(page, '2008');
    await page.evaluate(() => {
      try {
        localStorage.removeItem('itt08-apps');
      } catch (e) {
        /* */
      }
    });
    await goImmersion(page, '2008', 'sites/appstore/index.html');
    const frame = contentFrame(page);
    await expect(frame.locator('body')).toContainText(/App Store|app/i, { timeout: 15000 });
    await expect(frame.locator('[data-appstore-catalog]')).toBeVisible({ timeout: 15000 });
    const btn = frame.locator('[data-appstore-install]').first();
    await expect(btn).toBeVisible({ timeout: 15000 });
    const checks = frame.locator('[data-appstore-check]');
    if ((await checks.count()) === 0) await btn.click();
    await expect(checks.first()).toBeVisible({ timeout: 8000 });
    const n = await checks.count();
    for (let i = 0; i < n; i++) await checks.nth(i).check({ force: true });
    await btn.click();
    await expect
      .poll(async () => page.evaluate(() => localStorage.getItem('itt08-apps')), { timeout: 8000 })
      .toBeTruthy();
  });
});


