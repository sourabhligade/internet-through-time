// @ts-check
const { test, expect } = require('@playwright/test');


const OPEN = [
  '1994', '1995', '1996', '1997', '1998', '1999', '2000', '2001', '2002', '2003', '2004', '2005', '2006', '2007', '2008', '2009', '2010', '2011', '2012', '2013', '2015', '2016', '2017', '2019'
];
const LOCKED = ['2014', '2018', '2020', '2021', '2022', '2023', '2024', '2025'];

test.describe('hub + year shells', () => {
  test('hub lists playable years; 2026+ off disk', async ({ page }) => {
    await page.goto('/');
    for (const y of OPEN) {
      await expect(page.locator(`a.year-card.available[href*="years/${y}"]`).first()).toBeVisible();
    }
    for (const y of LOCKED) {
      await expect(page.locator(`a.year-card[href*="years/${y}"]`)).toHaveCount(0);
      await expect(page.locator(`.year-card.locked.y${y}`)).toBeVisible();
    }
    await expect(page.locator('body')).toContainText(/24 years open/i);
    await expect(page.locator('a.year-card.available[href*="years/2018"]')).toHaveCount(0);
    await expect(page.locator('a.year-card.available[href*="years/2015"]')).toBeVisible();
    await expect(page.locator('.year-card.locked.y2018')).toBeVisible();
    await expect(page.locator('a.year-card.available[href*="years/2019"]')).toBeVisible();
    await expect(page.locator('a.year-card.available[href*="years/2020"]')).toHaveCount(0);
    await expect(page.locator('.year-card.locked.y2020')).toBeVisible();
    await expect(page.locator('.year-card.locked.y2025')).toBeVisible();
  });

  test('hub follow links are the real museum socials', async ({ page }) => {
    await page.goto('/');
    const socials = page.locator('.hub-socials');
    await expect(socials).toBeVisible();
    await expect(socials.locator('a[href="https://github.com/sourabhligade/internet-through-time"]')).toBeVisible();
    await expect(socials.locator('a[href="https://x.com/SourabhLigade"]')).toBeVisible();
    await expect(socials.locator('a[href="https://www.linkedin.com/in/ligade24/"]')).toBeVisible();
    await expect(socials.locator('a[href="https://sourabhligade.com"]')).toBeVisible();
  });

  test('hub how-to card + era jump chips (UX U1)', async ({ page }) => {
    await page.goto('/');
    await expect(page.locator('.how-quick')).toBeVisible();
    await expect(page.locator('.how-quick')).toContainText(/How to navigate|Enter a year|Starting Point|Year menu/i);
    await expect(page.locator('a.era-jump-chip[href="#era-1994-1999"]')).toBeVisible();
    await expect(page.locator('a.era-jump-chip[href="#era-2000-2005"]')).toBeVisible();
    await expect(page.locator('a.era-jump-chip[href="#era-2006-2009"]')).toBeVisible();
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
    await expect(page.locator('.y2007.locked')).toHaveCount(0);
    await expect(page.locator('.y2008')).toBeVisible();
    await expect(page.locator('.y2009.available')).toBeVisible();
    await expect(page.locator('.y2009.locked')).toHaveCount(0);
    await expect(page.locator('.y2010')).toBeVisible();
    await expect(page.locator('.y2011.available')).toBeVisible();
    await expect(page.locator('.y2011.locked')).toHaveCount(0);
    await expect(page.locator('.y2012.available')).toBeVisible();
    await expect(page.locator('.y2013.available')).toBeVisible();
    await expect(page.locator('.y2014.available')).toHaveCount(0);
    await expect(page.locator('.y2014.locked')).toBeVisible();
    await expect(page.locator('.y2016')).toBeVisible();
    await expect(page.locator('.y2017')).toBeVisible();
    await expect(page.locator('.y2018')).toBeVisible();
    await expect(page.locator('.y2019.available')).toBeVisible();
    await expect(page.locator('.y2020.available')).toHaveCount(0);
    await expect(page.locator('.y2020.locked')).toBeVisible();
    await expect(page.locator('.y2021.available')).toHaveCount(0);
    await expect(page.locator('.y2021.locked')).toBeVisible();
    await expect(page.locator('.y2022.available')).toHaveCount(0);
    await expect(page.locator('.y2022.locked')).toBeVisible();
    await expect(page.locator('body')).toContainText(/24 years open/i);
    await page.locator('details.start-jumps summary').click();
    await expect(page.locator('#begin-first-night.start-primary')).toBeVisible();
    await expect(page.locator('a.start-btn[href="atlas/"]').first()).toBeVisible();
    await expect(page.locator('a.start-btn[href*="years/1994"]').first()).toBeVisible();
    await expect(page.locator('a.start-btn[href*="years/1998"]').first()).toBeVisible();
    await expect(page.locator('a.start-btn[href*="years/2004"]').first()).toBeVisible();
    await expect(page.locator('a.start-btn[href*="years/2008"]').first()).toBeVisible();
    await expect(page.locator('a.start-btn[href*="games"]')).toBeVisible();
    await expect(page.locator('a[href="#directory"], a[href*="#directory"]').first()).toBeVisible();
  });

  test('hub compare includes 2006–2007 and 2008–2009', async ({ page }) => {
    await page.goto('/');
    await expect(page.locator('.compare-late').first()).toBeVisible();
    await expect(page.locator('.compare-late').first()).toContainText('2006');
    await expect(page.locator('.compare-late').first()).toContainText('2007');
    await expect(page.locator('.compare-late').first()).toContainText(/iPhone|Street View|Platform/i);
    await expect(page.locator('.compare-2008-2009')).toBeVisible();
    await expect(page.locator('.compare-2008-2009')).toContainText('2009');
    await expect(page.locator('.compare-2008-2009')).toContainText(/FarmVille|Like|App Store|Chrome/i);
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
    await expect(page.locator('.compare-2014')).toBeVisible();
    await expect(page.locator('.compare-2014')).toContainText(/WhatsApp/i);
    await expect(page.locator('.compare-2022')).toBeVisible();
    await expect(page.locator('.compare-2022')).toContainText(/ChatGPT|Send/i);
    await expect(page.locator('a.era-jump-chip[href="#era-2010-2013"]')).toBeVisible();
    await expect(page.locator('a.era-jump-chip[href="#era-2015-2020"]')).toBeVisible();
    await expect(page.locator('a.era-jump-chip[href="#era-2021-2022"]')).toBeVisible();
  });

  test('hub has one Start and Resume uses itt-last-year', async ({ page }) => {
    await page.goto('/');
    const start = page.locator('#begin-first-night.start-primary');
    await expect(start).toBeVisible();
    await expect(start).toHaveText(/^Start$/);
    await page.evaluate(() => localStorage.setItem('itt-last-year', '2019'));
    await page.reload();
    const resume = page.locator('#resume-link');
    await expect(resume).toBeVisible();
    await expect(resume).toHaveAttribute('href', 'years/2019/');
    await expect(resume).toContainText('2019');
  });

  test('resume works for every open year including lean doors', async ({ page }) => {
    const lean = ['2007', '2009', '2011', '2013', '2014', '2016', '2017', '2019'];
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
    await page.evaluate(() => localStorage.setItem('itt-last-year', '2025'));
    await page.reload();
    await expect(page.locator('#resume-wrap')).toHaveClass(/hidden/);
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
