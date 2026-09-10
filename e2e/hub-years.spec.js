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
    await expect(page.locator('.year-card.locked.y2019')).toHaveCount(0);
    await expect(page.locator('a.year-card.available[href*="years/2020"]')).toBeVisible();
    await expect(page.locator('.year-card.locked.y2020')).toHaveCount(0);
    await expect(page.locator('.year-card.y2025')).toHaveCount(0);
  });

  test('passport treats 2022 live and 2023–2025 wiped', async ({ page }) => {
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
    expect(live.trails).toEqual(expect.arrayContaining(['2020-start', '2021-start', '2022-start']));
    expect(live.trails).not.toEqual(expect.arrayContaining(['2023-start', '2024-start', '2025-start']));
  });

  test('hub has no how-to / legal / social footer', async ({ page }) => {
    await page.goto('/');
    await expect(page.locator('#how, .how, #about, .hub-socials, .hub-footer')).toHaveCount(0);
    await expect(page.locator('body')).not.toContainText(/How to use the museum/i);
    await expect(page.locator('body')).not.toContainText(/Educational reconstruction/i);
  });

  test('hub how-to card + era jump chips (UX U1)', async ({ page }) => {
    await page.goto('/');
    await expect(page.locator('.how-quick')).toBeVisible();
    await expect(page.locator('.how-quick')).toContainText(/How to navigate|Enter a year|Starting Point|Year menu/i);
    await expect(page.locator('a.era-jump-chip[href="#era-1994-1999"]')).toBeVisible();
    await expect(page.locator('a.era-jump-chip[href="#era-2000-2005"]')).toBeVisible();
    await expect(page.locator('a.era-jump-chip[href="#era-2006"]')).toBeVisible();
    await expect(page.locator('a.era-jump-chip[href*="games"]')).toBeVisible();
    await expect(page.locator('#era-1994-1999')).toBeVisible();
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
    await expect(page.locator('.y2019.locked')).toHaveCount(0);
    await expect(page.locator('.y2020.available')).toBeVisible();
    await expect(page.locator('.y2020.locked')).toHaveCount(0);
    await expect(page.locator('.y2021.available')).toBeVisible();
    await expect(page.locator('.y2021.locked')).toHaveCount(0);
    await expect(page.locator('.y2022.available')).toBeVisible();
    await expect(page.locator('.y2022.locked')).toHaveCount(0);
    await expect(page.locator('.y2025')).toHaveCount(0);
    await expect(page.locator('body')).toContainText(/28 years open/i);
    await page.locator('details.start-jumps summary').click();
    await expect(page.locator('#begin-first-night.start-primary')).toBeVisible();
    await expect(page.locator('a.start-btn[href="atlas/"]').first()).toBeVisible();
    await expect(page.locator('a.start-btn[href*="years/1994"]').first()).toBeVisible();
    await expect(page.locator('a.start-btn[href*="years/1998"]').first()).toBeVisible();
    await expect(page.locator('a.start-btn[href*="years/2004"]').first()).toBeVisible();
    await expect(page.locator('a.start-btn[href*="years/2006"]').first()).toBeVisible();
    await expect(page.locator('a.start-btn[href*="years/2008"]')).toHaveCount(0);
    await expect(page.locator('a.start-btn[href*="games"]')).toBeVisible();
    await expect(page.locator('a[href="#directory"], a[href*="#directory"]').first()).toBeVisible();
  });

  test('hub compare includes 2006 Twttr and 2010, not 2008–2009 doors', async ({ page }) => {
    await page.goto('/');
    await expect(page.locator('.compare-late').first()).toBeVisible();
    await expect(page.locator('.compare-late').first()).toContainText('2006');
    await expect(page.locator('a.year-card.available[href*="years/2007"]')).toBeVisible();
    await expect(page.locator('.compare-2008-2009')).toBeVisible();
    await expect(page.locator('.compare-2008-2009')).toContainText('2010');
    await expect(page.locator('#follow-a-site, .follow-site').first()).toBeVisible();
    await expect(page.locator('.follow-site')).toContainText(/Yahoo|Amazon|Google|Facebook|YouTube/);
    await expect(page.locator('.follow-site a[href*="years/1998/sites/google"]')).toBeVisible();
    await expect(page.locator('.follow-site a[href*="years/2010/sites/youtube"]')).toBeVisible();
    await expect(page.locator('.compare-2011')).toBeVisible();
    await expect(page.locator('.compare-2011')).toContainText('2011');
    await expect(page.locator('.compare-2011')).toContainText(/Google\+|Spotify|Siri/i);
    await expect(page.locator('.compare-2012-2013')).toBeVisible();
    await expect(page.locator('.compare-2012-2013')).toContainText(/Vine|IPO/i);
    await expect(page.locator('.compare-2016-2018')).toBeVisible();
    await expect(page.locator('.compare-2016-2018')).toContainText(/GDPR|Stories|Face ID/i);
    await expect(page.locator('.compare-2020')).toBeVisible();
    await expect(page.locator('.compare-2020')).toContainText(/Zoom|participants/i);
    await expect(page.locator('.compare-2021')).toBeVisible();
    await expect(page.locator('.compare-2021')).toContainText(/Ask App Not to Track|ATT/i);
    await expect(page.locator('.compare-2014')).toBeVisible();
    await expect(page.locator('.compare-2014')).toContainText(/WhatsApp/i);
    await expect(page.locator('.compare-2022')).toBeVisible();
    await expect(page.locator('.compare-2022')).toContainText(/ChatGPT Send|Plus/i);
    await expect(page.locator('a.era-jump-chip[href="#era-2010-2013"]')).toBeVisible();
    await expect(page.locator('a.era-jump-chip[href="#era-2015-2020"]')).toBeVisible();
    await expect(page.locator('a.era-jump-chip[href="#era-2021-2022"]')).toHaveCount(0);
  });

  test('hub has one Start and Resume uses itt-last-year', async ({ page }) => {
    await page.goto('/');
    const start = page.locator('#begin-first-night.start-primary');
    await expect(start).toBeVisible();
    await expect(start).toHaveText(/^Start$/);
    await page.evaluate(() => localStorage.setItem('itt-last-year', '2017'));
    await page.reload();
    const resume = page.locator('#resume-link');
    await expect(resume).toBeVisible();
    await expect(resume).toHaveAttribute('href', 'years/2017/');
    await expect(resume).toContainText('2017');
  });

  test('resume works for every open year including lean doors', async ({ page }) => {
    const lean = ['2011', '2013', '2014', '2016', '2017', '2018', '2019', '2020', '2021', '2022'];
    for (const y of lean) {
      await page.goto('/');
      await page.evaluate((year) => {
        localStorage.setItem('itt-last-year', year);
      }, y);
      await page.reload();
      const link = page.locator('#resume-link');
      await expect(link).toBeVisible();
      await expect(link).toHaveAttribute('href', `years/${y}/`);
      await expect(link).toContainText(y);
    }
    for (const wiped of ['2009', '2023', '2024', '2025']) {
      await page.evaluate((year) => localStorage.setItem('itt-last-year', year), wiped);
      await page.reload();
      await expect(page.locator('#resume-wrap')).toHaveClass(/hidden/);
    }
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
