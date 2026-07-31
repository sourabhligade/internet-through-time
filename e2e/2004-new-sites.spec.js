// @ts-check
const { test, expect } = require('@playwright/test');

test.describe('2004 new sites', () => {
  test('orkut add friend → itt04-orkut-friends', async ({ page }) => {
    await page.goto('/years/2004/sites/orkut/friends.html');
    await page.evaluate(() => {
      try {
        Object.keys(localStorage).filter((k) => k.indexOf('itt04-orkut') === 0).forEach((k) => localStorage.removeItem(k));
      } catch (e) {}
    });
    await page.reload();
    await page.waitForSelector('[data-orkut-add]', { timeout: 20000 });
    await page.fill('[name="fname"]', 'RealOrkutFriend');
    await page.fill('[name="fabout"]', 'scraps');
    await page.locator('[data-orkut-add] button[type="submit"]').click();
    await expect(page.locator('[data-orkut-friends]')).toContainText('RealOrkutFriend', { timeout: 5000 });
    expect(await page.evaluate(() => localStorage.getItem('itt04-orkut-friends')) || '').toContain('RealOrkutFriend');
  });

  test('livejournal post → itt04-lj-posts', async ({ page }) => {
    await page.goto('/years/2004/sites/livejournal/update.html');
    await page.evaluate(() => {
      try { localStorage.removeItem('itt04-lj-posts'); } catch (e) {}
    });
    await page.reload();
    await page.waitForSelector('[data-lj-post]', { timeout: 20000 });
    const title = 'LJEntry ' + Date.now();
    await page.fill('[name="title"]', title);
    await page.fill('[name="body"]', 'hello journal');
    await page.locator('[data-lj-post] button[type="submit"]').click();
    await expect(page.locator('[data-lj-posts]')).toContainText(title, { timeout: 5000 });
    expect(await page.evaluate(() => localStorage.getItem('itt04-lj-posts')) || '').toContain(title);
  });

  test('craigslist post → itt04-craigslist-posts', async ({ page }) => {
    await page.goto('/years/2004/sites/craigslist/post.html');
    await page.evaluate(() => {
      try { localStorage.removeItem('itt04-craigslist-posts'); } catch (e) {}
    });
    await page.reload();
    await page.waitForSelector('[data-cl-post]', { timeout: 20000 });
    await page.fill('[name="title"]', 'PowerBook G4');
    await page.fill('[name="price"]', '900');
    await page.fill('[name="body"]', 'works great');
    await page.locator('[data-cl-post] button[type="submit"]').click();
    await expect(page.locator('[data-cl-list]')).toContainText('PowerBook G4', { timeout: 5000 });
    expect(await page.evaluate(() => localStorage.getItem('itt04-craigslist-posts')) || '').toContain('PowerBook');
  });

  test('technorati cosmos → itt04-technorati-cosmos', async ({ page }) => {
    await page.goto('/years/2004/sites/technorati/cosmos.html');
    await page.waitForSelector('[data-technorati-cosmos]', { timeout: 20000 });
    await page.fill('[name="url"]', 'http://www.example.com/');
    await page.locator('[data-technorati-cosmos] button[type="submit"]').click();
    await expect(page.locator('[data-technorati-list]')).toContainText(/kottke|boingboing|scripting/i, { timeout: 5000 });
    expect(await page.evaluate(() => localStorage.getItem('itt04-technorati-cosmos')) || '').toContain('example.com');
  });

  test('new rooms load with period identity', async ({ page }) => {
    const cases = [
      ['/years/2004/sites/yelp/index.html', /Yelp|2004/i],
      ['/years/2004/sites/imdb/index.html', /IMDb|Movie/i],
      ['/years/2004/sites/bbc/index.html', /BBC/i],
      ['/years/2004/sites/skype/index.html', /Skype/i],
      ['/years/2004/sites/wow/index.html', /Warcraft|Azeroth|2004/i],
    ];
    for (const [path, re] of cases) {
      await page.goto(path);
      await expect(page.locator('body')).toContainText(re);
    }
  });
});
