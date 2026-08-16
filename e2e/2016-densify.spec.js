// @ts-check
const { test, expect } = require('@playwright/test');
const { enterYear, checkAllReq } = require('./helpers');

test.describe('2016 densify', () => {
  test('scale dual-cite on about', async ({ page }) => {
    await page.goto('/years/2016/pages/about.html');
    await expect(page.locator('body')).toContainText('1,045,534,808');
    await expect(page.locator('body')).toContainText('3,424,971,237');
    await expect(page.locator('body')).toContainText(/Mar(ch)?\s*2016|restabil/i);
  });

  test('hard bans TikTok brand Meta Reels Chromium Edge', async ({ page }) => {
    await page.goto('/years/2016/pages/about.html');
    const text = await page.locator('body').innerText();
    expect(text).toMatch(/TikTok/i);
    expect(text).toMatch(/Meta|Reels/i);
    expect(text).toMatch(/Chromium|Edge|Face ID/i);
  });

  test('home trails list 2016 P0', async ({ page }) => {
    await page.goto('/years/2016/pages/home.html');
    const text = await page.locator('body').innerText();
    expect(text).toMatch(/Stories/i);
    expect(text).toMatch(/Pokémon|Pokemon|GO/i);
    expect(text).toMatch(/Reactions/i);
    expect(text).toMatch(/jack|AirPods/i);
    expect(text).toMatch(/Vine|musical\.ly|musically/i);
    expect(text).toMatch(/1,045,534,808|\+21%/i);
  });

  test('whats-new is 2016 spine', async ({ page }) => {
    await page.goto('/years/2016/pages/whats-new.html');
    const text = await page.locator('body').innerText();
    expect(text).toMatch(/2016/);
    expect(text).toMatch(/Stories|Pokémon|Reactions|Vine|Jul 6|Aug 2/i);
  });

  test('GO multipage paths', async ({ page }) => {
    for (const path of [
      '/years/2016/sites/pokemongo/index.html',
      '/years/2016/sites/pokemongo/team.html',
      '/years/2016/sites/pokemongo/catch.html',
      '/years/2016/sites/pokemongo/battery.html',
    ]) {
      const res = await page.goto(path);
      expect(res && res.ok(), path).toBeTruthy();
    }
  });

  test('musical.ly is not titled TikTok', async ({ page }) => {
    await page.goto('/years/2016/sites/musically/index.html');
    const h1 = await page.locator('h1').first().innerText();
    expect(h1).toMatch(/musical\.?ly/i);
    expect(h1).not.toMatch(/^TikTok$/i);
  });

  test('P1 densify rooms load', async ({ page }) => {
    for (const path of [
      '/years/2016/sites/stem/index.html',
      '/years/2016/sites/oculus/rift.html',
      '/years/2016/sites/jio/index.html',
      '/years/2016/sites/windows10/index.html',
      '/years/2016/sites/snapchat/spectacles.html',
      '/years/2016/sites/dyn/index.html',
    ]) {
      const res = await page.goto(path);
      expect(res && res.ok(), path).toBeTruthy();
    }
  });

  test('Stories REAL multipage', async ({ page }) => {
    await page.goto('/years/2016/sites/instagram/stories.html');
    await page.evaluate(() => localStorage.removeItem('itt16-ig-stories'));
    await page.reload();
    await page.locator('[data-ig-story-text]').fill('museum story 2016');
    await checkAllReq(page);
    await page.locator('[data-ig-story-add]').click();
    await expect
      .poll(async () => page.evaluate(() => localStorage.getItem('itt16-ig-stories')))
      .toMatch(/museum story 2016/i);
  });

  test('home continuity archive links 2015 residual', async ({ page }) => {
    await page.goto('/years/2016/pages/home.html');
    await expect(page.locator('body')).toContainText(/Continuity archive/i);
    await expect(page.locator('a[href*="watch"]').first()).toBeVisible();
    await expect(page.locator('a[href*="periscope"]').first()).toBeVisible();
  });

  test('Stories page links Snap residual and not Reels invent', async ({ page }) => {
    await page.goto('/years/2016/sites/instagram/stories.html');
    await expect(page.locator('body')).toContainText(/not Reels/i);
    await expect(page.locator('a[href*="snapchat"]').first()).toBeVisible();
    await expect(page.locator('[data-ig-story-add]')).toBeVisible();
  });

  test('GO multipage links trail chain', async ({ page }) => {
    await page.goto('/years/2016/sites/pokemongo/index.html');
    await expect(page.locator('a[href*="team"]').first()).toBeVisible();
    await page.goto('/years/2016/sites/pokemongo/team.html');
    await expect(page.locator('[data-pogo-team]')).toHaveCount(3);
    await page.goto('/years/2016/sites/pokemongo/catch.html');
    await expect(page.locator('[data-pogo-catch]')).toBeVisible();
    await page.goto('/years/2016/sites/pokemongo/battery.html');
    await expect(page.locator('[data-pogo-save]')).toBeVisible();
  });

  test('Win10 free end and Switch announce honesty', async ({ page }) => {
    await page.goto('/years/2016/sites/windows10/index.html');
    await expect(page.locator('body')).toContainText(/Jul(y)?\s*29|ended/i);
    await page.goto('/years/2016/pages/whats-new.html');
    await expect(page.locator('body')).toContainText(/ships 2017|2017/i);
  });

  test('P1 LinkedIn deal amount and Rift price literacy', async ({ page }) => {
    await page.goto('/years/2016/pages/about.html');
    await expect(page.locator('body')).toContainText(/26\.2|\$196|Jun/i);
    await page.goto('/years/2016/sites/oculus/rift.html');
    await expect(page.locator('body')).toContainText(/\$599|599|Mar/i);
    await expect(page.locator('body')).toContainText(/not.*Quest|tethered|CV1/i);
  });

  test('P1 STEM Spectacles REAL storage', async ({ page }) => {
    await page.goto('/years/2016/sites/stem/index.html');
    await page.evaluate(() => localStorage.removeItem('itt16-stem'));
    await page.reload();
    await page.locator('[data-stem-ligo]').check();
    await page.locator('[data-stem-go]').check();
    await page.locator('[data-stem-save]').click();
    await expect
      .poll(async () => page.evaluate(() => localStorage.getItem('itt16-stem')))
      .toBeTruthy();

    await page.goto('/years/2016/sites/snapchat/spectacles.html');
    await page.evaluate(() => localStorage.removeItem('itt16-spectacles'));
    await page.reload();
    await checkAllReq(page);
    await page.locator('[data-itt-real-save][data-storage-key="spectacles"]').click();
    await expect
      .poll(async () => page.evaluate(() => localStorage.getItem('itt16-spectacles')))
      .toBeTruthy();
  });

  test('nav shell has year 2016', async ({ page }) => {
    await enterYear(page, '2016');
    await expect(page.locator('body')).toHaveAttribute('data-itt-year', '2016');
    await expect(page.locator('#content')).toBeVisible();
  });

  test('map title is 2016', async ({ page }) => {
    await page.goto('/years/2016/pages/map.html');
    await expect(page).toHaveTitle(/2016/i);
    await expect(page.locator('body')).toContainText(/2016|Flow map/i);
  });

  test('Snap residual is 2016 competitor not invent-only', async ({ page }) => {
    await page.goto('/years/2016/sites/snapchat/story.html');
    const text = await page.locator('body').innerText();
    expect(text).toMatch(/Stories war|still|compet|Aug 2|2016/i);
    expect(text).not.toMatch(/Not Instagram Stories \(2016\)/i);
    await expect(page.locator('[data-snap-caption]')).toBeVisible();
    await expect(page.locator('[data-snap-story-add]')).toBeVisible();
  });

  test('multipage densify paths load', async ({ page }) => {
    for (const path of [
      '/years/2016/sites/instagram/stories-about.html',
      '/years/2016/sites/whatsapp/security-about.html',
      '/years/2016/sites/windows10/anniversary.html',
      '/years/2016/sites/edge/about.html',
      '/years/2016/sites/airpods/pair.html',
    ]) {
      const res = await page.goto(path);
      expect(res && res.ok(), path).toBeTruthy();
    }
  });

  test('home trail progress marks done from storage', async ({ page }) => {
    await page.goto('/years/2016/pages/home.html');
    await page.evaluate(() => {
      localStorage.setItem('itt16-ig-stories', JSON.stringify([{ text: 'x', real: true }]));
      localStorage.setItem('itt16-pogo', JSON.stringify({ real: true }));
    });
    await page.reload();
    await page.waitForTimeout(500);
    const doneCards = page.locator('.itt16-trail-card.is-done');
    await expect(doneCards).toHaveCount(2);
  });

  test('GO fix-up links on battery page', async ({ page }) => {
    await page.goto('/years/2016/sites/pokemongo/battery.html');
    await expect(page.locator('a.itt16-btn[href="index.html"]')).toBeVisible();
    await expect(page.locator('a.itt16-btn[href="team.html"]')).toBeVisible();
    await expect(page.locator('a.itt16-btn[href="catch.html"]')).toBeVisible();
  });
});

  test('iphone index residual banner points to jack', async ({ page }) => {
    await page.goto('/years/2016/sites/iphone/index.html');
    await expect(page.locator('[data-itt-year-spine]')).toBeVisible();
    await expect(page.locator('a[href*="jack"]').first()).toBeVisible();
  });
