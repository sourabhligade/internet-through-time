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
  test('AuctionWeb bid form present', async ({ page }) => {
    await enterYear(page, '1995');
    await goImmersion(page, '1995', 'sites/auctionweb/item-bean.html');
    const frame = contentFrame(page);
    await expect(frame.locator('body')).toContainText(/Auction|bid|Bean/i, { timeout: 15000 });
    const bid = frame.locator('[data-auction-bid], form[data-auction-bid], input[name="bid"], input[type="submit"]').first();
    await expect(bid).toBeVisible({ timeout: 10000 });
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
  test('eBay item bid form', async ({ page }) => {
    await enterYear(page, '1997');
    await goImmersion(page, '1997', 'sites/ebay/item-laptop.html');
    const frame = contentFrame(page);
    await expect(frame.locator('body')).toContainText(/eBay|Bid|Auction/i, { timeout: 15000 });
    await expect(frame.locator('[data-ebay-bid], form, input[name="bid"], input[type="submit"]').first()).toBeVisible();
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
    if (await form.locator('input[name="q"]').count()) {
      await form.locator('input[name="q"]').fill('Yahoo');
      await form.locator('input[type="submit"], button[type="submit"]').first().click();
      await page.waitForTimeout(600);
      await expect(frame.locator('body')).toContainText(/Yahoo|result|Search/i, { timeout: 12000 });
    }
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
    await expect(contentFrame(page).locator('body')).toContainText(/Napster/i, { timeout: 15000 });
    // prefer client or download link
    const frame = contentFrame(page);
    const link = frame.locator('a[href*="client"], a[href*="download"], a[href*="legal"]').first();
    if (await link.count()) {
      await link.click();
      await page.waitForTimeout(700);
      await expect(frame.locator('body')).toContainText(/Napster|Download|Legal|Client|Beta/i, { timeout: 12000 });
    }
  });
  test('Blogger home', async ({ page }) => {
    await enterYear(page, '1999');
    await goImmersion(page, '1999', 'sites/blogger/index.html');
    await expect(contentFrame(page).locator('body')).toContainText(/Blog|Pyra|Blogger/i, { timeout: 15000 });
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
  test('Friendster profile form', async ({ page }) => {
    await enterYear(page, '2002');
    await goImmersion(page, '2002', 'sites/friendster/index.html');
    const frame = contentFrame(page);
    await expect(frame.locator('body')).toContainText(/Friendster/i, { timeout: 15000 });
    const form = frame.locator('[data-friendster-profile-form], form').first();
    if (await form.count()) {
      const name = form.locator('input[name="name"], input[name="display"]').first();
      if (await name.count()) {
        await name.fill('Museum User');
        await form.locator('input[type="submit"], button[type="submit"]').first().click();
        await page.waitForTimeout(400);
      }
    }
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
    const form = frame.locator('form[data-gmail-login], form').first();
    if (await form.locator('input[name="email"], input[name="login"], input[type="text"]').count()) {
      await form.locator('input[name="email"], input[name="login"], input[type="text"]').first().fill('you@college.edu');
      const pass = form.locator('input[type="password"]');
      if (await pass.count()) await pass.first().fill('secret');
      await form.locator('input[type="submit"], button[type="submit"]').first().click();
      await page.waitForTimeout(700);
      await expect(frame.locator('body')).toContainText(/Inbox|Compose|Mail|Invitation/i, { timeout: 15000 });
    }
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
  test('Reddit submit', async ({ page }) => {
    await enterYear(page, '2005');
    await goImmersion(page, '2005', 'sites/reddit/index.html');
    const frame = contentFrame(page);
    await expect(frame.locator('body')).toContainText(/reddit|Reddit/i, { timeout: 15000 });
    const form = frame.locator('[data-reddit-submit]');
    if (await form.count()) {
      await form.locator('input[name="title"]').fill('E2E post ' + Date.now());
      await form.locator('input[type="submit"], button[type="submit"]').first().click();
      await page.waitForTimeout(400);
      await expect(frame.locator('[data-reddit-status], body')).toContainText(/submit|local|front/i, { timeout: 8000 });
    }
  });
  test('Maps zoom theater', async ({ page }) => {
    await enterYear(page, '2005');
    await goImmersion(page, '2005', 'sites/maps/index.html');
    const frame = contentFrame(page);
    await expect(frame.locator('body')).toContainText(/Maps|Google|Zoom|pan/i, { timeout: 15000 });
    const zin = frame.locator('[data-maps-zoom="in"]');
    if (await zin.count()) {
      await zin.click();
      await expect(frame.locator('[data-maps-status]')).toContainText(/Zoom/i, { timeout: 5000 });
    }
  });
  test('Digg dig button', async ({ page }) => {
    await enterYear(page, '2005');
    await goImmersion(page, '2005', 'sites/digg/index.html');
    const frame = contentFrame(page);
    const dig = frame.locator('[data-digg-up]').first();
    if (await dig.count()) {
      await dig.click();
      await page.waitForTimeout(300);
      await expect(frame.locator('[data-digg-list]')).toContainText(/digg/i);
    }
  });
});
