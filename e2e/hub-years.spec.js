// @ts-check
const { test, expect } = require('@playwright/test');


const OPEN = [
  '1994', '1995', '1996', '1997', '1998', '1999', '2000', '2001', '2002', '2003', '2004', '2005', '2006', '2007', '2008', '2010', '2011', '2012', '2013', '2014', '2015', '2016', '2017', '2018', '2019', '2020', '2021', '2022'
];
const BOARDED = ['2009', '2023', '2024', '2025'];
const LOCKED = [];

test.describe('hub + year shells', () => {
  test('hub lists playable years; 2026+ off disk', async ({ page }) => {
    await page.goto('/');
    for (const y of OPEN) {
      await expect(page.locator(`a.year-card.available[href*="years/${y}"]`).first()).toBeVisible();
    }
    for (const y of BOARDED) {
      await expect(page.locator(`a.year-card[href*="years/${y}"]`)).toHaveCount(0);
      await expect(page.locator(`.year-card.y${y}`)).toHaveCount(0);
    }
    await expect(page.locator('body')).toContainText(/28 years open/i);
    await expect(page.locator('body')).not.toContainText(/2021[–-]2025 boarded/i);
    await expect(page.locator('a.year-card.available[href*="years/2018"]')).toBeVisible();
    await expect(page.locator('a.year-card.available[href*="years/2015"]')).toBeVisible();
    await expect(page.locator('.year-card.locked.y2018')).toHaveCount(0);
    await expect(page.locator('a.year-card.available[href*="years/2019"]')).toBeVisible();
    await expect(page.locator('.year-card.y2019.available')).toBeVisible();
    await expect(page.locator('a.year-card.available[href*="years/2020"]')).toBeVisible();
    await expect(page.locator('a.year-card.available[href*="years/2021"]')).toBeVisible();
    await expect(page.locator('.year-card.y2025')).toHaveCount(0);
  });

  test('passport treats 2020–2022 live and 2023–2025 wiped', async ({ page }) => {
    await page.goto('/');
    const live = await page.evaluate(() => {
      const mp = window.ITT && window.ITT.MuseumProgress;
      if (!mp || !mp.isLiveYear) return null;
      return {
        y2006: mp.isLiveYear('2006'),
        y2007: mp.isLiveYear('2007'),
        y2008: mp.isLiveYear('2008'),
        y2009: mp.isLiveYear('2009'),
        y2020: mp.isLiveYear('2020'),
        y2021: mp.isLiveYear('2021'),
        y2022: mp.isLiveYear('2022'),
        y2023: mp.isLiveYear('2023'),
        y2024: mp.isLiveYear('2024'),
        y2025: mp.isLiveYear('2025'),
        trails: mp.TRAILS ? Object.keys(mp.TRAILS) : [],
      };
    });
    expect(live, 'MuseumProgress on hub').toBeTruthy();
    expect(live.y2006).toBe(true);
    expect(live.y2007).toBe(true);
    expect(live.y2008).toBe(true);
    expect(live.y2009).toBe(false);
    expect(live.y2020).toBe(true);
    expect(live.y2021).toBe(true);
    expect(live.y2022).toBe(true);
    expect(live.y2023).toBe(false);
    expect(live.y2024).toBe(false);
    expect(live.y2025).toBe(false);
    expect(live.trails).toEqual(expect.arrayContaining(['2019-start', '2020-start', '2021-start', '2022-start']));
    expect(live.trails).not.toEqual(expect.arrayContaining(['2023-start', '2024-start', '2025-start']));
  });

  test('hub has no how-to / legal / social footer', async ({ page }) => {
    await page.goto('/');
    await expect(page.locator('#how, .how, #about, .hub-socials, .hub-footer')).toHaveCount(0);
    await expect(page.locator('body')).not.toContainText(/How to use the museum/i);
    await expect(page.locator('body')).not.toContainText(/Educational reconstruction/i);
  });

  test('hub is one product h1 plus year cards', async ({ page }) => {
    await page.goto('/');
    await expect(page.locator('h1')).toHaveText(/The Internet Through Time/);
    await expect(page.locator('.how-quick')).toHaveCount(0);
    await expect(page.locator('.follow-site, #follow-a-site')).toHaveCount(0);
    await expect(page.locator('.compare')).toHaveCount(0);
    await expect(page.locator('.ann-ticker, .hub-ann-strip')).toHaveCount(0);
    await expect(page.locator('a.era-jump-chip')).toHaveCount(0);
  });

  test('hub year cards use period class skins + data-year', async ({ page }) => {
    await page.goto('/');
    for (const y of OPEN) {
      const card = page.locator(`a.year-card.available.y${y}[href*="years/${y}"]`);
      await expect(card).toBeVisible();
      await expect(card).toHaveAttribute('data-year', y);
      await expect(card.locator('.year-card-inner .year')).toHaveText(y);
      await expect(card.locator('.motif')).toHaveCount(1);
    }
    await expect(page.locator('.y1994')).toBeVisible();
    await expect(page.locator('.y2005.available')).toBeVisible();
    await expect(page.locator('.y2006.available')).toBeVisible();
    await expect(page.locator('.y2007.available')).toBeVisible();
    await expect(page.locator('.y2008.available')).toBeVisible();
    await expect(page.locator('.y2009')).toHaveCount(0);
    await expect(page.locator('.y2010')).toBeVisible();
    await expect(page.locator('.y2011.available')).toBeVisible();
    await expect(page.locator('.y2011.locked')).toHaveCount(0);
    await expect(page.locator('.y2012.available')).toBeVisible();
    await expect(page.locator('.y2013.available')).toBeVisible();
    await expect(page.locator('.y2013.locked')).toHaveCount(0);
    await expect(page.locator('.y2014.available')).toBeVisible();
    await expect(page.locator('.y2014.locked')).toHaveCount(0);
    await expect(page.locator('.y2016')).toBeVisible();
    await expect(page.locator('.y2017')).toBeVisible();
    await expect(page.locator('.y2018.available')).toBeVisible();
    await expect(page.locator('.y2018.locked')).toHaveCount(0);
    await expect(page.locator('.y2019.available')).toBeVisible();
    await expect(page.locator('.y2020.available')).toBeVisible();
    await expect(page.locator('.y2021.available')).toBeVisible();
    await expect(page.locator('.y2022.available')).toBeVisible();
    await expect(page.locator('.y2025')).toHaveCount(0);
    await expect(page.locator('body')).toContainText(/28 years open/i);
    await expect(page.locator('h1')).toHaveCount(1);
  });

  test('hub compare and follow-a-site are gone', async ({ page }) => {
    await page.goto('/');
    await expect(page.locator('.compare, .compare-late, .follow-site, #follow-a-site')).toHaveCount(0);
    await expect(page.locator('a.year-card.available[href*="years/2007"]')).toBeVisible();
    await expect(page.locator('.compare-2020')).toHaveCount(0);
    await expect(page.locator('.compare-2022')).toHaveCount(0);
  });

  test('hub has no first-night Start or resume chrome', async ({ page }) => {
    await page.goto('/');
    await expect(page.locator('#begin-first-night')).toHaveCount(0);
    await expect(page.locator('#resume-link, #resume-wrap')).toHaveCount(0);
  });

  for (const year of OPEN) {
    test(`${year} shell boots with content iframe`, async ({ page }) => {
      await page.goto(`/years/${year}/`);
      const skip = page.locator('#skip-connect');
      if (await skip.isVisible().catch(() => false)) await skip.click();
      await page.waitForFunction(() => {
        const f = document.getElementById('content');
        try {
          return !!(f && f.contentDocument && f.contentDocument.body);
        } catch (e) {
          return false;
        }
      }, null, { timeout: 20000 });
      await expect(page.locator('#content')).toBeVisible();
      await expect(page.locator('#location')).toBeVisible();
    });
  }
});
