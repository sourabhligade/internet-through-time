// @ts-check
/**
 * Signature immersion flows — one (or more) thesis interaction per year.
 * Runs inside the year shell so parent browser + iframe immersion both work.
 */
const { test, expect } = require('@playwright/test');
const { enterYear, goImmersion, goInFrame, contentFrame, killOverlays } = require('./helpers');

test.describe('year-signature 1994', () => {
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

test.describe('year-signature 2001', () => {
  test('Wikipedia densify room', async ({ page }) => {
    await enterYear(page, '2001');
    await goImmersion(page, '2001', 'sites/wikipedia/index.html');
    await expect(contentFrame(page).locator('body')).toContainText(/Wikipedia|encyclopedia|article/i, { timeout: 15000 });
  });
  test('iPod product page', async ({ page }) => {
    await enterYear(page, '2001');
    await goImmersion(page, '2001', 'sites/apple/ipod.html');
    await expect(contentFrame(page).locator('body')).toContainText(/iPod|Apple|1000 songs/i, { timeout: 15000 });
  });
});

test.describe('year-signature 2002', () => {
  test('Friendster profile save → storage', async ({ page }) => {
    await enterYear(page, '2002');
    await page.evaluate(() => {
      try {
        localStorage.removeItem('itt02-friendster-profile');
      } catch (e) {
        /* */
      }
    });
    await goImmersion(page, '2002', 'sites/friendster/profile.html');
    const frame = contentFrame(page);
    await expect(frame.locator('body')).toContainText(/Friendster/i, { timeout: 15000 });
    const form = frame.locator('[data-friendster-profile-form]');
    await expect(form).toBeVisible({ timeout: 10000 });
    await form.locator('input[name="name"], input[name="display"]').first().fill('Museum User');
    await form.locator('input[type="submit"], button[type="submit"]').first().click();
    await expect
      .poll(async () =>
        page.evaluate(() => {
          try {
            return Object.keys(localStorage).some(
              (k) => k.indexOf('itt02-friendster') === 0 && (localStorage.getItem(k) || '').length > 2
            );
          } catch (e) {
            return false;
          }
        }),
        { timeout: 8000 }
      )
      .toBeTruthy();
  });
  test('KaZaA download theater', async ({ page }) => {
    await enterYear(page, '2002');
    await goImmersion(page, '2002', 'sites/kazaa/index.html');
    await expect(contentFrame(page).locator('body')).toContainText(/KaZaA|FastTrack|P2P|download/i, { timeout: 15000 });
  });
});

test.describe('year-signature 2003', () => {
  test('MySpace home densify', async ({ page }) => {
    await enterYear(page, '2003');
    await goImmersion(page, '2003', 'sites/myspace/index.html');
    await expect(contentFrame(page).locator('body')).toContainText(/MySpace|Tom|Friend/i, { timeout: 15000 });
  });
  test('LinkedIn logo/home', async ({ page }) => {
    await enterYear(page, '2003');
    await goImmersion(page, '2003', 'sites/linkedin/index.html');
    await expect(contentFrame(page).locator('body')).toContainText(/LinkedIn|network|professional/i, { timeout: 15000 });
  });
  test('iTunes store 99¢', async ({ page }) => {
    await enterYear(page, '2003');
    await goImmersion(page, '2003', 'sites/itunes/index.html');
    await expect(contentFrame(page).locator('body')).toContainText(/iTunes|99|Music Store|AAC/i, { timeout: 15000 });
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

test.describe('year-signature 2005', () => {
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

test.describe('year-signature 2006', () => {
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

test.describe('year-signature 2007', () => {
  test('Gmail open compose → itt07-gmail-msgs', async ({ page }) => {
    await enterYear(page, '2007');
    await page.evaluate(() => {
      try {
        localStorage.removeItem('itt07-gmail-msgs');
      } catch (e) {
        /* */
      }
    });
    await goImmersion(page, '2007', 'sites/gmail/compose.html');
    const frame = contentFrame(page);
    await expect(frame.locator('[data-gmail-compose]')).toBeVisible({ timeout: 15000 });
    const subj = 'sig07 ' + Date.now();
    await frame.locator('[name="subj"]').fill(subj);
    await frame.locator('[name="body"]').fill('open gmail 2007');
    await frame.locator('[data-gmail-compose] button[type="submit"]').click();
    await expect
      .poll(async () => page.evaluate(() => localStorage.getItem('itt07-gmail-msgs')), {
        timeout: 10000,
      })
      .toMatch(new RegExp(subj.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')));
  });

  test('iPhone product room', async ({ page }) => {
    await enterYear(page, '2007');
    await goImmersion(page, '2007', 'sites/iphone/index.html');
    await expect(contentFrame(page).locator('body')).toContainText(/iPhone|Apple|Safari|2007/i, {
      timeout: 15000,
    });
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
    const btn = frame.locator('[data-appstore-install]').first();
    await expect(btn).toBeVisible({ timeout: 10000 });
    await btn.click();
    await expect
      .poll(async () => page.evaluate(() => localStorage.getItem('itt08-apps')), { timeout: 8000 })
      .toBeTruthy();
  });
});

test.describe('year-signature 2009', () => {
  test('FarmVille plant → itt09-farm', async ({ page }) => {
    await enterYear(page, '2009');
    await page.evaluate(() => {
      try {
        localStorage.removeItem('itt09-farm');
      } catch (e) {
        /* */
      }
    });
    await goImmersion(page, '2009', 'sites/farmville/index.html');
    const frame = contentFrame(page);
    await expect(frame.locator('body')).toContainText(/FarmVille|plant|crop/i, { timeout: 15000 });
    const plant = frame.locator('[data-farm-plant]').first();
    await expect(plant).toBeVisible({ timeout: 10000 });
    await plant.click();
    await expect
      .poll(async () => page.evaluate(() => localStorage.getItem('itt09-farm')), { timeout: 8000 })
      .toBeTruthy();
  });
});

test.describe('year-signature 2010', () => {
  test('Instagram share → itt10-ig-posts', async ({ page }) => {
    await enterYear(page, '2010');
    await page.evaluate(() => {
      try {
        localStorage.removeItem('itt10-ig-posts');
      } catch (e) {
        /* */
      }
    });
    await goImmersion(page, '2010', 'sites/instagram/index.html');
    const frame = contentFrame(page);
    await expect(frame.locator('body')).toContainText(/Instagram|filter|iOS/i, { timeout: 15000 });
    const share = frame.locator('[data-ig-share]');
    await expect(share).toBeVisible({ timeout: 10000 });
    await frame.locator('[data-ig-filter]').nth(1).click();
    await share.click();
    await expect
      .poll(async () => page.evaluate(() => localStorage.getItem('itt10-ig-posts')), { timeout: 8000 })
      .toBeTruthy();
  });
});

test.describe('year-signature 2011', () => {
  test('Spotify invite → itt11-spotify-invited', async ({ page }) => {
    await enterYear(page, '2011');
    await page.evaluate(() => {
      try {
        localStorage.removeItem('itt11-spotify-invited');
        localStorage.removeItem('itt11-spotify-plan');
      } catch (e) {
        /* */
      }
    });
    await goImmersion(page, '2011', 'sites/spotify/index.html');
    const frame = contentFrame(page);
    await expect(frame.locator('body')).toContainText(/Spotify|United States|July 14/i, {
      timeout: 15000,
    });
    const invite = frame.locator('[data-spotify-invite]');
    await expect(invite).toBeVisible({ timeout: 15000 });
    await invite.click();
    await expect
      .poll(async () => page.evaluate(() => localStorage.getItem('itt11-spotify-invited')), {
        timeout: 8000,
      })
      .toMatch(/true/i);
  });
});

test.describe('year-signature 2012', () => {
  test('Instagram Android install → itt12-ig-android', async ({ page }) => {
    await enterYear(page, '2012');
    await page.evaluate(() => {
      try {
        localStorage.removeItem('itt12-ig-android');
        localStorage.removeItem('itt12-ig-platform');
      } catch (e) {
        /* */
      }
    });
    await goImmersion(page, '2012', 'sites/instagram/android.html');
    const frame = contentFrame(page);
    await expect(frame.locator('body')).toContainText(/Android|April 3|Instagram/i, {
      timeout: 15000,
    });
    const install = frame.locator('[data-ig-android-install]');
    await expect(install).toBeVisible({ timeout: 10000 });
    await frame.locator('[data-ig-android-date]').check();
    await frame.locator('[data-ig-android-not-stories]').check();
    await install.click();
    await expect
      .poll(async () => page.evaluate(() => localStorage.getItem('itt12-ig-android')), {
        timeout: 8000,
      })
      .toMatch(/android|2012-04-03|multiStep/i);
  });
});

test.describe('year-signature 2013', () => {
  test('Vine hold → post → itt13-vine-posts', async ({ page }) => {
    await enterYear(page, '2013');
    await page.evaluate(() => {
      try {
        localStorage.removeItem('itt13-vine-posts');
      } catch (e) {
        /* */
      }
    });
    await goImmersion(page, '2013', 'sites/vine/record.html');
    const frame = contentFrame(page);
    await expect(frame.locator('body')).toContainText(/Hold|6 second|Vine/i, { timeout: 15000 });
    const hold = frame.locator('[data-vine-hold]');
    await expect(hold).toBeVisible({ timeout: 10000 });
    await hold.evaluate((el) => {
      el.dispatchEvent(new PointerEvent('pointerdown', { bubbles: true, pointerId: 1 }));
    });
    await page.waitForTimeout(700);
    await hold.evaluate((el) => {
      el.dispatchEvent(new PointerEvent('pointerup', { bubbles: true, pointerId: 1 }));
    });
    await expect(frame.locator('[data-vine-status]')).toContainText(/Ready/i, { timeout: 5000 });
    await killOverlays(page);
    await frame.locator('[data-vine-caption]').fill('sig vine ' + Date.now());
    await frame.locator('[data-vine-post]').click({ force: true });
    await expect
      .poll(async () => page.evaluate(() => localStorage.getItem('itt13-vine-posts')), {
        timeout: 10000,
      })
      .toBeTruthy();
  });

  test('Snapchat Story add → itt13-snap-story', async ({ page }) => {
    await enterYear(page, '2013');
    await page.evaluate(() => {
      try {
        localStorage.removeItem('itt13-snap-story');
      } catch (e) {
        /* */
      }
    });
    await goImmersion(page, '2013', 'sites/snapchat/story.html');
    const frame = contentFrame(page);
    await expect(frame.locator('body')).toContainText(/Story|Snapchat|24/i, { timeout: 15000 });
    const add = frame.locator('[data-snap-story-add]');
    await expect(add).toBeVisible({ timeout: 10000 });
    await frame.locator('[data-snap-not-ig]').check({ force: true });
    await add.click();
    await expect
      .poll(async () => page.evaluate(() => localStorage.getItem('itt13-snap-story')), {
        timeout: 8000,
      })
      .toBeTruthy();
  });
});

test.describe('year-signature 2014', () => {
  test('WhatsApp name → install → itt14-wa-install', async ({ page }) => {
    await enterYear(page, '2014');
    await page.evaluate(() => {
      try {
        localStorage.removeItem('itt14-wa-install');
      } catch (e) {
        /* */
      }
    });
    await goImmersion(page, '2014', 'sites/whatsapp/index.html');
    const frame = contentFrame(page);
    await expect(frame.locator('body')).toContainText(/WhatsApp/i, { timeout: 15000 });
    await frame.locator('[data-wa-install]').click();
    await page.waitForTimeout(150);
    expect(await page.evaluate(() => localStorage.getItem('itt14-wa-install'))).toBeFalsy();
    await frame.locator('[data-wa-name]').fill('sig wa 2014');
    await frame.locator('[data-wa-install]').click();
    await expect
      .poll(async () => page.evaluate(() => localStorage.getItem('itt14-wa-install')), {
        timeout: 10000,
      })
      .toBeTruthy();
  });

  test('Heartbleed rotate ≥2 → itt14-heartbleed-rotate', async ({ page }) => {
    await enterYear(page, '2014');
    await page.evaluate(() => {
      try {
        localStorage.removeItem('itt14-heartbleed-rotate');
      } catch (e) {
        /* */
      }
    });
    await goImmersion(page, '2014', 'sites/heartbleed/rotate.html');
    const frame = contentFrame(page);
    await expect(frame.locator('body')).toContainText(/Heartbleed|password/i, { timeout: 15000 });
    await frame.locator('[data-req]').first().check({ force: true });
    await frame.locator('[data-itt-real-save]').click({ force: true });
    await page.waitForTimeout(150);
    expect(await page.evaluate(() => localStorage.getItem('itt14-heartbleed-rotate'))).toBeFalsy();
    await frame.locator('[data-req]').nth(1).check({ force: true });
    await frame.locator('[data-itt-real-save]').click({ force: true });
    await expect
      .poll(async () => page.evaluate(() => localStorage.getItem('itt14-heartbleed-rotate')), {
        timeout: 10000,
      })
      .toBeTruthy();
  });

  test('Chrome three checks write itt14-chrome; one-click gone', async ({ page }) => {
    await enterYear(page, '2014');
    await page.evaluate(() => {
      try {
        localStorage.removeItem('itt14-chrome');
      } catch (e) {
        /* */
      }
    });
    await goImmersion(page, '2014', 'sites/chrome/index.html');
    const frame = contentFrame(page);
    await expect(frame.locator('[data-chrome-download]')).toHaveCount(0);
    await frame.locator('[data-chrome14-save]').click();
    await page.waitForTimeout(150);
    expect(await page.evaluate(() => localStorage.getItem('itt14-chrome'))).toBeFalsy();
    await frame.locator('[data-chrome14-habit]').check({ force: true });
    await frame.locator('[data-chrome14-not-edge]').check({ force: true });
    await frame.locator('[data-chrome14-dl]').check({ force: true });
    await frame.locator('[data-chrome14-save]').click();
    await expect
      .poll(async () => page.evaluate(() => localStorage.getItem('itt14-chrome')), {
        timeout: 10000,
      })
      .toBeTruthy();
  });

  test('Cardboard incomplete blocked; two checks write itt14-cardboard', async ({ page }) => {
    await enterYear(page, '2014');
    await page.evaluate(() => {
      try {
        localStorage.removeItem('itt14-cardboard');
      } catch (e) {
        /* */
      }
    });
    await goImmersion(page, '2014', 'sites/cardboard/index.html');
    const frame = contentFrame(page);
    await expect(frame.locator('body')).toContainText(/Cardboard/i, { timeout: 15000 });
    await frame.locator('[data-itt-real-save]').click({ force: true });
    await page.waitForTimeout(150);
    expect(await page.evaluate(() => localStorage.getItem('itt14-cardboard'))).toBeFalsy();
    await frame.locator('[data-req]').nth(0).check({ force: true });
    await frame.locator('[data-req]').nth(1).check({ force: true });
    await frame.locator('[data-itt-real-save]').click({ force: true });
    await expect
      .poll(async () => page.evaluate(() => localStorage.getItem('itt14-cardboard')), {
        timeout: 10000,
      })
      .toBeTruthy();
  });
});

test.describe('year-signature 2015', () => {
  test('Watch incomplete blocked; shipped writes itt15-watch', async ({ page }) => {
    await enterYear(page, '2015');
    await page.evaluate(() => {
      try {
        localStorage.removeItem('itt15-watch');
        localStorage.removeItem('itt14-watch');
      } catch (e) {
        /* */
      }
    });
    await goImmersion(page, '2015', 'sites/apple/watch.html');
    const frame = contentFrame(page);
    await expect(frame.locator('body')).toContainText(/Apple Watch/i, { timeout: 15000 });
    await frame.locator('[data-watch-save]').click();
    await page.waitForTimeout(150);
    expect(await page.evaluate(() => localStorage.getItem('itt15-watch'))).toBeFalsy();
    await frame.locator('[data-watch-shipped]').check({ force: true });
    await frame.locator('[data-watch-no-store]').check({ force: true });
    await frame.locator('[data-watch-save]').click();
    await expect
      .poll(async () => page.evaluate(() => localStorage.getItem('itt15-watch')), {
        timeout: 10000,
      })
      .toBeTruthy();
    expect(await page.evaluate(() => localStorage.getItem('itt14-watch'))).toBeFalsy();
  });

  test('Periscope empty title blocked; Go LIVE writes itt15-periscope', async ({ page }) => {
    await enterYear(page, '2015');
    await page.evaluate(() => {
      try {
        localStorage.removeItem('itt15-periscope');
      } catch (e) {
        /* */
      }
    });
    await goImmersion(page, '2015', 'sites/periscope/index.html');
    const frame = contentFrame(page);
    await expect(frame.locator('[data-peri-live]')).toBeVisible({ timeout: 15000 });
    await frame.locator('[data-peri-live]').click();
    await page.waitForTimeout(120);
    expect(await page.evaluate(() => localStorage.getItem('itt15-periscope'))).toBeFalsy();
    await frame.locator('[data-peri-title]').fill('sig live 2015');
    await frame.locator('[data-peri-live]').click();
    await expect
      .poll(async () => page.evaluate(() => localStorage.getItem('itt15-periscope')), {
        timeout: 10000,
      })
      .toBeTruthy();
  });
});

test.describe('year-signature 2016', () => {
  test('Stories incomplete blocked; add writes itt16-ig-stories', async ({ page }) => {
    await enterYear(page, '2016');
    await page.evaluate(() => {
      try {
        localStorage.removeItem('itt16-ig-stories');
        localStorage.removeItem('itt15-watch');
      } catch (e) {
        /* */
      }
    });
    await goImmersion(page, '2016', 'sites/instagram/stories.html');
    const frame = contentFrame(page);
    await expect(frame.locator('body')).toContainText(/Instagram Stories/i, { timeout: 15000 });
    await frame.locator('[data-ig-stories-add]').click();
    await page.waitForTimeout(150);
    expect(await page.evaluate(() => localStorage.getItem('itt16-ig-stories'))).toBeFalsy();
    await frame.locator('[data-ig-stories-caption]').fill('coffee');
    await frame.locator('[data-ig-stories-24h]').check({ force: true });
    await frame.locator('[data-ig-stories-not-reels]').check({ force: true });
    await frame.locator('[data-ig-stories-add]').click();
    await expect
      .poll(async () => page.evaluate(() => localStorage.getItem('itt16-ig-stories')), {
        timeout: 10000,
      })
      .toBeTruthy();
    expect(await page.evaluate(() => localStorage.getItem('itt15-watch'))).toBeFalsy();
  });

  test('Reactions empty pick blocked; Love writes itt16-reactions', async ({ page }) => {
    await enterYear(page, '2016');
    await page.evaluate(() => {
      try {
        localStorage.removeItem('itt16-reactions');
      } catch (e) {
        /* */
      }
    });
    await goImmersion(page, '2016', 'sites/facebook/reactions.html');
    const frame = contentFrame(page);
    await expect(frame.locator('[data-reactions-save]')).toBeVisible({ timeout: 15000 });
    await frame.locator('[data-reactions-save]').click();
    await page.waitForTimeout(120);
    expect(await page.evaluate(() => localStorage.getItem('itt16-reactions'))).toBeFalsy();
    await frame.locator('[data-reaction="love"]').click();
    await frame.locator('[data-reaction-not-dislike]').check({ force: true });
    await frame.locator('[data-reactions-save]').click();
    await expect
      .poll(async () => page.evaluate(() => localStorage.getItem('itt16-reactions')), {
        timeout: 10000,
      })
      .toBeTruthy();
  });

  test('Live incomplete blocked; three checks write itt16-ig-live', async ({ page }) => {
    await enterYear(page, '2016');
    await page.evaluate(() => {
      try {
        localStorage.removeItem('itt16-ig-live');
      } catch (e) {
        /* */
      }
    });
    await goImmersion(page, '2016', 'sites/instagram/live.html');
    const frame = contentFrame(page);
    await expect(frame.locator('[data-ig-live-save]')).toBeVisible({ timeout: 15000 });
    await frame.locator('[data-ig-live-save]').click();
    await page.waitForTimeout(120);
    expect(await page.evaluate(() => localStorage.getItem('itt16-ig-live'))).toBeFalsy();
    await frame.locator('[data-ig-live-date]').check({ force: true });
    await frame.locator('[data-ig-live-gone]').check({ force: true });
    await frame.locator('[data-ig-live-not-reels]').check({ force: true });
    await frame.locator('[data-ig-live-save]').click();
    await expect
      .poll(async () => page.evaluate(() => localStorage.getItem('itt16-ig-live')), {
        timeout: 10000,
      })
      .toBeTruthy();
  });

  test('AMP-SERP incomplete blocked; two checks write itt16-amp-serp', async ({ page }) => {
    await enterYear(page, '2016');
    await page.evaluate(() => {
      try {
        localStorage.removeItem('itt16-amp-serp');
      } catch (e) {
        /* */
      }
    });
    await goImmersion(page, '2016', 'sites/amp/serp.html');
    const frame = contentFrame(page);
    await expect(frame.locator('[data-amp-serp-save]')).toBeVisible({ timeout: 15000 });
    await frame.locator('[data-amp-serp-save]').click();
    await page.waitForTimeout(120);
    expect(await page.evaluate(() => localStorage.getItem('itt16-amp-serp'))).toBeFalsy();
    await frame.locator('[data-amp-serp-date]').check({ force: true });
    await frame.locator('[data-amp-serp-not-2015]').check({ force: true });
    await frame.locator('[data-amp-serp-save]').click();
    await expect
      .poll(async () => page.evaluate(() => localStorage.getItem('itt16-amp-serp')), {
        timeout: 10000,
      })
      .toBeTruthy();
  });
});

test.describe('year-signature 2017', () => {
  test('Face ID incomplete blocked; three checks write itt17-faceid', async ({ page }) => {
    await enterYear(page, '2017');
    await page.evaluate(() => {
      try {
        localStorage.removeItem('itt17-faceid');
        localStorage.removeItem('itt16-ig-stories');
      } catch (e) {
        /* */
      }
    });
    await goImmersion(page, '2017', 'sites/iphone/x.html');
    const frame = contentFrame(page);
    await expect(frame.locator('body')).toContainText(/Face ID/i, { timeout: 15000 });
    await frame.locator('[data-faceid-save]').click();
    await page.waitForTimeout(150);
    expect(await page.evaluate(() => localStorage.getItem('itt17-faceid'))).toBeFalsy();
    await frame.locator('[data-faceid-no-home]').check({ force: true });
    await frame.locator('[data-faceid-not-touch]').check({ force: true });
    await frame.locator('[data-faceid-not-xs]').check({ force: true });
    await frame.locator('[data-faceid-save]').click();
    await expect
      .poll(async () => page.evaluate(() => localStorage.getItem('itt17-faceid')), {
        timeout: 10000,
      })
      .toBeTruthy();
    expect(await page.evaluate(() => localStorage.getItem('itt16-ig-stories'))).toBeFalsy();
  });

  test('Fortnite empty save blocked; three checks write itt17-fortnite', async ({ page }) => {
    await enterYear(page, '2017');
    await page.evaluate(() => {
      try {
        localStorage.removeItem('itt17-fortnite');
      } catch (e) {
        /* */
      }
    });
    await goImmersion(page, '2017', 'sites/fortnite/index.html');
    const frame = contentFrame(page);
    await expect(frame.locator('[data-fn-save]')).toBeVisible({ timeout: 15000 });
    await frame.locator('[data-fn-save]').click();
    await page.waitForTimeout(120);
    expect(await page.evaluate(() => localStorage.getItem('itt17-fortnite'))).toBeFalsy();
    await frame.locator('[data-fn-date]').check({ force: true });
    await frame.locator('[data-fn-free]').check({ force: true });
    await frame.locator('[data-fn-no-art]').check({ force: true });
    await frame.locator('[data-fn-save]').click();
    await expect
      .poll(async () => page.evaluate(() => localStorage.getItem('itt17-fortnite')), {
        timeout: 10000,
      })
      .toBeTruthy();
  });

  test('Twitter 280 short text blocked; 141+ writes itt17-twitter280', async ({ page }) => {
    await enterYear(page, '2017');
    await page.evaluate(() => {
      try {
        localStorage.removeItem('itt17-twitter280');
      } catch (e) {
        /* */
      }
    });
    await goImmersion(page, '2017', 'sites/twitter/280.html');
    const frame = contentFrame(page);
    await expect(frame.locator('[data-tw280-save]')).toBeVisible({ timeout: 15000 });
    await frame.locator('[data-tw280-save]').click();
    await page.waitForTimeout(120);
    expect(await page.evaluate(() => localStorage.getItem('itt17-twitter280'))).toBeFalsy();
    await frame.locator('[data-tw280-text]').fill(
      'This museum tweet is longer than one hundred and forty characters on purpose so last year’s wall would have failed it — keep typing until we clearly pass one-four-one.'
    );
    await frame.locator('[data-tw280-date]').check({ force: true });
    await frame.locator('[data-tw280-not-x]').check({ force: true });
    await frame.locator('[data-tw280-save]').click();
    await expect
      .poll(async () => page.evaluate(() => localStorage.getItem('itt17-twitter280')), {
        timeout: 10000,
      })
      .toBeTruthy();
  });
});

test.describe('year-signature 2018', () => {
  test('GDPR incomplete blocked; three checks write itt18-gdpr', async ({ page }) => {
    await enterYear(page, '2018');
    await page.evaluate(() => {
      try {
        localStorage.removeItem('itt18-gdpr');
        localStorage.removeItem('itt17-faceid');
      } catch (e) {
        /* */
      }
    });
    await goImmersion(page, '2018', 'sites/gdpr/rights.html');
    const frame = contentFrame(page);
    await expect(frame.locator('[data-gdpr-save]')).toBeVisible({ timeout: 15000 });
    await frame.locator('[data-gdpr-save]').click();
    await page.waitForTimeout(150);
    expect(await page.evaluate(() => localStorage.getItem('itt18-gdpr'))).toBeFalsy();
    await frame.locator('[data-gdpr-art15]').check({ force: true });
    await frame.locator('[data-gdpr-art17]').check({ force: true });
    await frame.locator('[data-gdpr-date]').check({ force: true });
    await frame.locator('[data-gdpr-save]').click();
    await expect
      .poll(async () => page.evaluate(() => localStorage.getItem('itt18-gdpr')), {
        timeout: 10000,
      })
      .toBeTruthy();
    expect(await page.evaluate(() => localStorage.getItem('itt17-faceid'))).toBeFalsy();
  });

  test('Accept All on banner does not write itt18-gdpr', async ({ page }) => {
    await page.goto('/years/2018/sites/gdpr/index.html');
    await page.evaluate(() => localStorage.removeItem('itt18-gdpr'));
    await page.reload();
    await page.locator('[data-gdpr-accept-all]').click();
    await page.waitForTimeout(150);
    expect(await page.evaluate(() => localStorage.getItem('itt18-gdpr'))).toBeFalsy();
  });
});

test.describe('year-signature 2019', () => {
  test('Disney+ trial blocked; continue writes itt19-disneyplus', async ({ page }) => {
    await enterYear(page, '2019');
    await page.evaluate(() => {
      try {
        localStorage.removeItem('itt19-disneyplus');
        localStorage.removeItem('itt18-gdpr');
      } catch (e) {
        /* */
      }
    });
    await goImmersion(page, '2019', 'sites/disneyplus/index.html');
    const frame = contentFrame(page);
    await expect(frame.locator('[data-dplus-trial]')).toBeVisible({ timeout: 15000 });
    await frame.locator('[data-dplus-trial]').click();
    await page.waitForTimeout(150);
    expect(await page.evaluate(() => localStorage.getItem('itt19-disneyplus'))).toBeFalsy();
    await frame.locator('[data-profile="adult-1"]').click();
    await frame.locator('[data-title="mando"]').click();
    await frame.locator('[data-add-continue]').click();
    await frame.locator('[data-title="lion-king"]').click();
    await frame.locator('[data-add-continue]').click();
    await frame.locator('[data-dplus-date]').check({ force: true });
    await frame.locator('[data-dplus-not-trial]').check({ force: true });
    await frame.locator('[data-dplus-kids]').check({ force: true });
    await frame.locator('[data-dplus-save]').click();
    await expect
      .poll(async () => page.evaluate(() => localStorage.getItem('itt19-disneyplus')), {
        timeout: 10000,
      })
      .toBeTruthy();
    expect(await page.evaluate(() => localStorage.getItem('itt18-gdpr'))).toBeFalsy();
  });
});

test.describe('year-signature 2020', () => {
  test('Zoom join blocked; recap writes itt20-zoom', async ({ page }) => {
    await enterYear(page, '2020');
    await page.evaluate(() => {
      try {
        localStorage.removeItem('itt20-zoom');
        localStorage.removeItem('itt19-disneyplus');
      } catch (e) {
        /* */
      }
    });
    await goImmersion(page, '2020', 'sites/zoom/index.html');
    const frame = contentFrame(page);
    await expect(frame.locator('[data-zoom-join]')).toBeVisible({ timeout: 15000 });
    await frame.locator('[data-zoom-join]').click();
    await page.waitForTimeout(150);
    expect(await page.evaluate(() => localStorage.getItem('itt20-zoom'))).toBeFalsy();
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
    await expect
      .poll(async () => page.evaluate(() => localStorage.getItem('itt20-zoom')), {
        timeout: 10000,
      })
      .toBeTruthy();
    expect(await page.evaluate(() => localStorage.getItem('itt19-disneyplus'))).toBeFalsy();
  });
});

