// @ts-check
const { test, expect } = require('@playwright/test');

const OPEN = [
  '1994', '1995', '1996', '1997', '1998', '1999', '2000', '2001',
  '2002', '2003', '2004', '2005', '2006', '2007', '2008', '2009', '2010', '2011', '2012', '2013', '2015', '2016', '2017', '2018', '2019', '2020',
];
const LOCKED = ['2014', '2021', '2022', '2023'];

test.describe('hub + year shells', () => {
  test('hub lists playable years; 2014 locked for rebuild', async ({ page }) => {
    await page.goto('/');
    for (const y of OPEN) {
      await expect(page.locator(`a.year-card.available[href*="years/${y}"]`).first()).toBeVisible();
    }
    for (const y of LOCKED) {
      await expect(page.locator(`a.year-card[href*="years/${y}"]`)).toHaveCount(0);
      await expect(page.locator(`.year-card.locked.y${y}`)).toBeVisible();
    }
    await expect(page.locator('body')).toContainText(/26 years open|wiped/i);
    await expect(page.locator('a.year-card.available[href*="years/2018"]')).toBeVisible();
    await expect(page.locator('a.year-card.available[href*="years/2019"]')).toBeVisible();
    await expect(page.locator('a.year-card.available[href*="years/2020"]')).toBeVisible();
    await expect(page.locator('a.year-card.available[href*="years/2021"]')).toHaveCount(0);
    await expect(page.locator('a.year-card.available[href*="years/2022"]')).toHaveCount(0);
    await expect(page.locator('a.year-card.available[href*="years/2023"]')).toHaveCount(0);
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
    await expect(page.locator('.y2005')).toBeVisible();
    await expect(page.locator('.y2006')).toBeVisible();
    await expect(page.locator('.y2007.available')).toBeVisible();
    await expect(page.locator('.y2008')).toBeVisible();
    await expect(page.locator('.y2009.available')).toBeVisible();
    await expect(page.locator('.y2010')).toBeVisible();
    await expect(page.locator('.y2011.available')).toBeVisible();
    await expect(page.locator('.y2012.available')).toBeVisible();
    await expect(page.locator('.y2013.available')).toBeVisible();
    await expect(page.locator('.y2014.locked')).toBeVisible();
    await expect(page.locator('.y2016')).toBeVisible();
    await expect(page.locator('.y2017')).toBeVisible();
    await expect(page.locator('.y2018')).toBeVisible();
    await expect(page.locator('.y2019.available')).toBeVisible();
    await expect(page.locator('.y2020.available')).toBeVisible();
    await expect(page.locator('body')).toContainText(/26 years open|wiped/i);
    await expect(page.locator('a.start-btn[href*="years/2007"]').first()).toBeVisible();
    await expect(page.locator('a.start-btn[href*="years/2008"]').first()).toBeVisible();
    await expect(page.locator('a.start-btn[href*="years/2009"]').first()).toBeVisible();
    await expect(page.locator('#begin-first-night.start-primary')).toBeVisible();
    await expect(page.locator('a.start-btn[href*="years/1994"]').first()).toBeVisible();
    await expect(page.locator('a.start-btn[href="#directory"], a.start-btn[href*="#directory"]')).toBeVisible();
    await expect(page.locator('a.start-btn[href*="games"]')).toBeVisible();
    await expect(page.locator('a.start-btn[href*="years/1998"]')).toBeVisible();
    await expect(page.locator('a.start-btn[href*="years/2005"]')).toBeVisible();
    await expect(page.locator('a.start-btn[href*="years/2008"]')).toBeVisible();
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
    await expect(page.locator('.follow-site a[href*="years/2005/sites/youtube"]')).toBeVisible();
    await expect(page.locator('.compare-2011')).toBeVisible();
    await expect(page.locator('.compare-2011')).toContainText('2011');
    await expect(page.locator('.compare-2011')).toContainText(/Google\+|Spotify|Siri/i);
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
