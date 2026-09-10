// @ts-check
/**
 * Museum atlas — floor plan of every playable year and flow.
 */
const { test, expect } = require("@playwright/test");


const OPEN = [
  "1994", "1995", "1996", "1997", "1998", "1999", "2000", "2001", "2002", "2003",
  "2004", "2005", "2006",
  "2010", "2011", "2012", "2013", "2014", "2015", "2016", "2017", "2018", "2019", "2020", "2021", "2022",
];
const WIPED = [];
const THREADS = ["yahoo", "amazon", "google", "facebook", "youtube", "mail", "search", "phone", "im"];
const TOURS = ["first-night", "find", "buy", "talk", "phone-trail", "broadcast", "games"];

/**
 * @param {import('@playwright/test').Page} page
 * @param {string} href
 * @param {string} from
 */
async function expectLive(page, href, from) {
  expect(href, from).toBeTruthy();
  const url = new URL(href, "http://127.0.0.1:8080/atlas/");
  const res = await page.request.get(url.pathname);
  expect(res.status(), from + " → " + url.pathname).toBe(200);
}

test.describe("museum atlas", () => {
  test("hub start button, era chip, and footer open atlas", async ({ page }) => {
    await page.goto("/");
    await page.locator('details.start-jumps summary').click();
    await expect(page.locator('a.start-btn[href="atlas/"]').first()).toBeVisible();
    await expect(page.locator('a.era-jump-chip[href="atlas/"]')).toBeVisible();
    await expect(page.locator(".hub-footer")).toHaveCount(0);
    await page.locator('a.start-btn[href="atlas/"]').first().click();
    await expect(page).toHaveURL(/\/atlas\/?/);
    await expect(page.locator("h1")).toContainText(/whole museum/i);
    await expect(page.locator("a[href='../index.html']").first()).toBeVisible();
  });

  test("hallway has five wings and 24 open years · no boarded ticks", async ({ page }) => {
    await page.goto("/atlas/");
    await expect(page.locator("h1")).toContainText(/whole museum/i);
    await expect(page.locator(".lede")).toContainText(/2018/);
    await expect(page.locator("#atlas-spine .atlas-wing")).toHaveCount(5);
    await expect(page.locator('#atlas-spine .atlas-wing[data-wing="wiped-late"]')).toHaveCount(0);
    await expect(page.locator('#atlas-spine .atlas-wing[data-wing="late-lean"]')).toHaveCount(0);
    await expect(page.locator("#atlas-spine .spine-year")).toHaveCount(28);
    await expect(page.locator("#atlas-spine .spine-year.open")).toHaveCount(28);
    await expect(page.locator("#atlas-spine .spine-year.wiped")).toHaveCount(0);
    for (const y of OPEN) {
      await expect(page.locator(`#atlas-spine .spine-year.open[data-atlas-year="${y}"]`)).toBeVisible();
    }
    for (const y of WIPED) {
      await expect(page.locator(`#atlas-spine .spine-year.wiped[data-atlas-year="${y}"]`)).toBeVisible();
    }
  });

  test("2014 door is live from the spine", async ({ page }) => {
    await page.goto("/atlas/");
    const tick = page.locator('#atlas-spine [data-atlas-year="2014"]');
    await expect(tick).toHaveClass(/open/);
    await expect(tick).not.toHaveClass(/wiped/);
    await tick.click();
    const panel = page.locator("#atlas-year");
    await expect(panel).toBeVisible();
    await expect(panel).toContainText(/WhatsApp/i);
    await expect(panel).not.toContainText(/wiped/i);
    const res = await page.request.get("/years/2014/sites/whatsapp/index.html");
    expect(res.status()).toBe(200);
  });

  test("hash #year-2004 shows thefacebook gold", async ({ page }) => {
    await page.goto("/atlas/#year-2004");
    await expect(page.locator('#atlas-spine [data-atlas-year="2004"]')).toHaveClass(/selected/);
    await expect(page.locator("#atlas-year")).toContainText(/thefacebook/i);
    await expect(page.locator("#atlas-year")).not.toContainText(/wiped/i);
  });

  test("select 1998 shows Lucky gold and official 10-stop trail", async ({ page }) => {
    await page.goto("/atlas/");
    await page.locator('#atlas-spine [data-atlas-year="1998"]').click();
    const panel = page.locator("#atlas-year");
    await expect(panel).toBeVisible();
    await expect(panel).toContainText(/Feeling Lucky|Lucky/i);
    await expect(panel.locator("ol.ten li")).toHaveCount(10);
    await expect(panel.locator('a[href*="years/1998/sites/google/lucky"]').first()).toBeVisible();
    await expect(panel.locator('a[href*="years/1998/"]', { hasText: /Enter 1998/ })).toBeVisible();
    const res = await page.request.get("/years/1998/sites/google/lucky.html");
    expect(res.status()).toBe(200);
  });

  test("every open year: gold + 10-stop trail hrefs are 200", async ({ page }) => {
    await page.goto("/atlas/");
    for (const y of OPEN) {
      await page.locator(`#atlas-spine [data-atlas-year="${y}"]`).click();
      const panel = page.locator("#atlas-year");
      await expect(panel.locator("h2")).toContainText(y);
      const goldHref = await panel.locator("li.gold a").first().getAttribute("href");
      await expectLive(page, goldHref, y + " gold");
      await expect(panel.locator("ol.ten li")).toHaveCount(10);
      const trailHrefs = await panel.locator("ol.ten a").evaluateAll((els) =>
        els.map((a) => a.getAttribute("href") || "")
      );
      expect(trailHrefs.length, y + " trail").toBe(10);
      for (const h of trailHrefs) await expectLive(page, h, y + " trail");
    }
  });

  test("all follow-a-site threads and curator tours have live rooms", async ({ page }) => {
    await page.goto("/atlas/");
    for (const id of THREADS) {
      await expect(page.locator("#thread-" + id)).toBeVisible();
    }
    for (const id of TOURS) {
      await expect(page.locator("#trail-" + id)).toBeVisible();
    }
    await expect(page.locator("#atlas-first-night")).toBeVisible();
    const hrefs = await page.locator("#atlas-threads a[href], #atlas-trails a[href]").evaluateAll((els) =>
      els.map((a) => a.getAttribute("href") || "").filter((h) => h && !h.startsWith("#"))
    );
    expect(hrefs.length).toBeGreaterThan(40);
    for (const h of hrefs) await expectLive(page, h, "thread/tour");
  });

  test("find: hotmail hits, empty state, no-match", async ({ page }) => {
    await page.goto("/atlas/");
    await expect(page.locator("#atlas-find-results")).toContainText(/Type a name/i);
    await page.fill("#atlas-find", "hotmail");
    const results = page.locator("#atlas-find-results a");
    await expect(results.first()).toBeVisible();
    await expect(results.first()).toHaveAttribute("href", /hotmail/i);
    await expectLive(page, await results.first().getAttribute("href"), "find hotmail");
    await page.fill("#atlas-find", "zzzz-not-a-room");
    await expect(page.locator("#atlas-find-results")).toContainText(/No match/i);
  });

  test("first night button starts the 1994 trail", async ({ page }) => {
    await page.goto("/atlas/");
    await page.locator("#atlas-first-night").click();
    await expect(page).toHaveURL(/\/years\/1994\//);
  });

  test("2019 door is live from the spine", async ({ page }) => {
    await page.goto("/atlas/");
    const tick = page.locator('#atlas-spine [data-atlas-year="2019"]');
    await expect(tick).not.toHaveClass(/wiped/);
    await tick.click();
    const panel = page.locator("#atlas-year");
    await expect(panel).toBeVisible();
    await expect(panel).toContainText(/Disney\+|Continue/i);
    const res = await page.request.get("/years/2019/sites/disneyplus/home.html");
    expect(res.status()).toBe(200);
  });

  test("hallway ends at 2022 · no 2023–2025 ticks", async ({ page }) => {
    await page.goto("/atlas/");
    await expect(page.locator('#atlas-spine [data-atlas-year="2022"]')).toHaveClass(/open/);
    await expect(page.locator('#atlas-spine [data-atlas-year="2022"]')).not.toHaveClass(/wiped/);
    for (const y of ["2009", "2023", "2024", "2025"]) {
      await expect(page.locator(`#atlas-spine [data-atlas-year="${y}"]`)).toHaveCount(0);
    }
  });

  test("find: lucky still hits 1998 gold", async ({ page }) => {
    await page.goto("/atlas/");
    await page.fill("#atlas-find", "lucky");
    const results = page.locator("#atlas-find-results a");
    await expect(results.first()).toBeVisible();
    await expect(results.first()).toHaveAttribute("href", /lucky/i);
    await expectLive(page, await results.first().getAttribute("href"), "find lucky");
  });
});
