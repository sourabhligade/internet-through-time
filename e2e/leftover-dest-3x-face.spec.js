// @ts-check
/**
 * I7 / U9 leftover dest leftover-3× dest face:
 * leftover dest (no data-official-key) leftover-3× is first paint.
 * Official dest leftover-3× stays gold-only / folded.
 * Starting Point leftover-3× stays hidden.
 * Empty never writes. Complete writes leftover key, never star.
 */
const { test, expect } = require("@playwright/test");
const { revealLeftoverRails } = require("./helpers");

const LEFTOVER_DESTS = [
  {
    year: "2010",
    href: "/years/2010/sites/chrome/index.html",
    slug: "chrome",
    key: "itt10-pop2-chrome",
    star: "itt10-ig-posts",
    go: "[data-pop-go][data-pop-key='pop2-chrome']",
  },
  {
    year: "2012",
    href: "/years/2012/sites/reddit/index.html",
    slug: "reddit",
    key: "itt12-pop3-reddit",
    star: "itt12-ig-android",
  },
  {
    year: "2013",
    href: "/years/2013/sites/reddit/index.html",
    slug: "reddit",
    key: "itt13-pop3-reddit",
    star: "itt13-vine-posts",
  },
  {
    year: "2018",
    href: "/years/2018/sites/reddit/index.html",
    slug: "reddit",
    key: "itt18-pop-reddit",
    star: "itt18-gdpr",
    go: "[data-itt-lo3x] [data-pop-go][data-pop-id='reddit']:not([data-pop-key])",
  },
  {
    year: "2019",
    href: "/years/2019/sites/amazon/index.html",
    slug: "amazon",
    key: "itt19-pop-amazon",
    star: "itt19-disneyplus",
    go: "[data-pop-go][data-pop-id='amazon']:not([data-pop-key])",
  },
];

const OFFICIAL_DEST = {
  year: "1994",
  href: "/years/1994/sites/lycos/index.html",
  go: "[data-pop-go][data-pop-key='pop3-lycos']",
};

function leftoverGo(page, row) {
  if (row.go) return page.locator(row.go).first();
  return page.locator(`[data-pop-go][data-pop-key='pop3-${row.slug}']`).first();
}

function leftoverPanel(page, row) {
  const go = leftoverGo(page, row);
  return page.locator("[data-pop-panel]").filter({ has: go }).first();
}

test.describe("leftover dest leftover-3× dest face", () => {
  for (const row of LEFTOVER_DESTS) {
    test(`${row.year} leftover dest leftover-3× visible without deep`, async ({ page }) => {
      await page.goto(row.href);
      const go = leftoverGo(page, row);
      await expect(go, row.href + " leftover-3× dest face").toBeVisible();
      const insideFold = await go.evaluate((el) => {
        let n = el;
        while (n && n.nodeType === 1) {
          if (n.className && /(^|\\s)itt-also-year(\\s|$)/.test(String(n.className))) return true;
          n = n.parentNode;
        }
        return false;
      });
      expect(insideFold, row.href + " leftover-3× folded into Also this year").toBeFalsy();
    });

    test(`${row.year} leftover dest leftover-3× empty never writes · complete writes leftover only`, async ({
      page,
    }) => {
      await page.goto(row.href);
      await page.evaluate((k) => {
        localStorage.removeItem(k.key);
        localStorage.removeItem(k.star);
      }, { key: row.key, star: row.star });
      await page.reload();
      await revealLeftoverRails(page);
      const go = leftoverGo(page, row);
      await expect(go).toBeVisible();
      const panel = go.locator("xpath=ancestor::*[@data-itt-lo3x or @data-pop-panel][1]");
      await go.click();
      expect(await page.evaluate((k) => localStorage.getItem(k), row.key), "empty go").toBeFalsy();
      const keep = panel.locator('[data-pop-pick="keep"]');
      if ((await keep.count()) > 0) await keep.click();
      else if ((await panel.locator("[data-pop-pick]").count()) > 0) await panel.locator("[data-pop-pick]").first().click();
      const reqs = panel.locator("[data-pop-req]");
      const n = await reqs.count();
      for (let i = 0; i < n; i++) await reqs.nth(i).check();
      const field = panel.locator("[data-pop-field]").first();
      if ((await field.count()) > 0) await field.fill((row.slug || "museum") + " leftover");
      await go.click();
      await expect.poll(() => page.evaluate((k) => localStorage.getItem(k), row.key), { timeout: 8000 }).toBeTruthy();
      expect(await page.evaluate((k) => localStorage.getItem(k), row.star), "star").toBeFalsy();
    });
  }

  test("official dest leftover-3× is not visitor-visible", async ({ page }) => {
    await page.goto(OFFICIAL_DEST.href);
    await expect(page.locator("html")).toHaveAttribute("data-official-key", "itt94-lycos");
    const go = page.locator(OFFICIAL_DEST.go);
    if ((await go.count()) === 0) return;
    await expect(go.first()).not.toBeVisible();
  });

  test("Starting Point leftover-3× warehouse is not first paint", async ({ page }) => {
    for (const year of ["1994", "2013", "2017", "2018", "2021"]) {
      await page.goto(`/years/${year}/pages/home.html`);
      await expect(page.locator(`#ott-guided-${year} ol > li`)).toHaveCount(6, { timeout: 15000 });
      await expect(page.locator(`[data-ott-one-thing="${year}"]`)).toBeVisible();
      await expect(page.locator(`[data-itt-pop3x="${year}"]:not(.itt-also-year *)`)).toHaveCount(0);
      await expect(page.locator(`[data-itt-lo3x]:not(.itt-also-year *)`)).toHaveCount(0);
    }
  });
});
