// @ts-check
/**
 * Hallway atlas — every on-disk flow layer, every open year.
 * Golds stay locked. 2009 is live HTML. 2020–2022 are live HTML. 2018–2019 and 2023–2025 are absent.
 */
const { test, expect } = require("@playwright/test");

const matrix = require("./2x-links.matrix.json");
const trio = require("../scripts/popular-3x3-sites.json");

const OPEN = [
  "1994", "1995", "1996", "1997", "1998", "1999", "2000", "2001", "2002", "2003",
  "2004", "2005", "2006", "2007", "2008", "2009", "2010", "2011", "2012",
  "2013", "2014", "2020", "2021", "2022"
];
const WIPED = ["2023", "2024", "2025"];
const LEAN = [
  "2007", "2008", "2009", "2010", "2011", "2012",
  "2013", "2014", "2020", "2021", "2022"
];
const WINGS = {
  gray: ["1994", "1995", "1996"],
  bubble: ["1997", "1998", "1999", "2000"],
  rebuild: ["2001", "2002", "2003", "2004", "2005", "2006", "2007"],
  phone: ["2008", "2009", "2010", "2011", "2012", "2013"],
  stream: ["2014"]
};
/** @type {Record<string, RegExp>} */
const GOLD = {
  "1994": /Cool Site of the Day/i,
  "1995": /SSL checkout/i,
  "1996": /Portal wars/i,
  "1997": /PointCast/i,
  "1998": /Lucky/i,
  "1999": /AIM/i,
  "2000": /MapQuest/i,
  "2001": /Wikipedia/i,
  "2002": /StumbleUpon/i,
  "2003": /Photobucket/i,
  "2004": /thefacebook/i,
  "2005": /YouTube/i,
  "2006": /Twitter 140/i,
  "2007": /iPhone Safari/i,
  "2008": /App Store/i,
  "2009": /Like/i,
  "2010": /Instagram/i,
  "2011": /Google\+/,
  "2012": /Instagram Android/i,
  "2013": /Vine/i,
  "2014": /WhatsApp Install/i,
  "2020": /Zoom Leave/i,
  "2021": /Ask App Not to Track/i,
  "2022": /ChatGPT/i,
};

function twoXByYear() {
  /** @type {Record<string, typeof matrix>} */
  const out = {};
  for (const row of matrix) {
    const y = String(row.year);
    if (OPEN.indexOf(y) === -1) continue;
    if (!out[y]) out[y] = [];
    out[y].push(row);
  }
  return out;
}

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

/**
 * @param {import('@playwright/test').Page} page
 */
async function waitCatalog(page) {
  await expect(page.locator("#atlas-all-2x summary .n")).toHaveText(/^[1-9]\d+$/, { timeout: 15000 });
}

test.describe("atlas hallway — all flows", () => {
  test("hub is the title and the year cards", async ({ page }) => {
    await page.goto("/");
    await expect(page.locator("h1")).toHaveText(/The Internet Through Time/);
    await expect(page.locator(".start-hint")).toHaveCount(0);
    await expect(page.locator("a.year-card.available")).toHaveCount(24);
  });

  test("remember lines are year-true and wiped years stay off the spine", async ({ page }) => {
    await page.goto("/atlas/");
    await expect(page.locator('#atlas-spine .atlas-wing[data-wing="wiped-late"]')).toHaveCount(0);
    await expect(page.locator('#atlas-spine .atlas-wing[data-wing="late-lean"]')).toHaveCount(0);
    await page.goto("/atlas/#year-1999");
    await expect(page.locator("#atlas-year p.remember")).toContainText(/ding/i);
    await page.goto("/atlas/#year-2004");
    await expect(page.locator("#atlas-year p.remember")).toContainText(/college/i);
  });

  test("each wing owns its years; lean and boarded classes match disk", async ({ page }) => {
    await page.goto("/atlas/");
    for (const [id, years] of Object.entries(WINGS)) {
      const wing = page.locator(`#atlas-spine .atlas-wing[data-wing="${id}"]`);
      await expect(wing).toBeVisible();
      for (const y of years) {
        await expect(wing.locator(`[data-atlas-year="${y}"]`)).toBeVisible();
      }
    }
    for (const y of LEAN) {
      await expect(page.locator(`#atlas-spine .spine-year.lean.open[data-atlas-year="${y}"]`)).toBeVisible();
    }
    for (const y of ["1994", "1998", "2004", "2006"]) {
      await expect(page.locator(`#atlas-spine [data-atlas-year="${y}"]`)).not.toHaveClass(/lean/);
    }
    await expect(page.locator('#atlas-spine .atlas-wing[data-wing="wiped-late"]')).toHaveCount(0);
  });

  test("hallway lists 2020–2022 and does not list wiped years", async ({ page }) => {
    await page.goto("/atlas/");
    await expect(page.locator('#atlas-spine [data-atlas-year="2020"]')).toHaveCount(1);
    await expect(page.locator('#atlas-spine [data-atlas-year="2021"]')).toHaveCount(1);
    await expect(page.locator('#atlas-spine [data-atlas-year="2022"]')).toHaveCount(1);
    await expect(page.locator('#atlas-spine [data-atlas-year="2017"]')).toHaveCount(0);
    await expect(page.locator('#atlas-spine [data-atlas-year="2018"]')).toHaveCount(0);
    await expect(page.locator('#atlas-spine [data-atlas-year="2019"]')).toHaveCount(0);
    for (const y of ["2015", "2017", "2023", "2024", "2025"]) {
      await expect(page.locator(`#atlas-spine [data-atlas-year="${y}"]`)).toHaveCount(0);
    }
    await expect(page.locator('#atlas-spine [data-atlas-year="2009"]')).toBeVisible();
  });

  test("every open year postcard: locked gold, wander, not-this-year, guided, dest-unique official trail, live hrefs", async ({ page }) => {
    await page.goto("/atlas/");
    for (const y of OPEN) {
      await page.goto("/atlas/#year-" + y);
      const panel = page.locator("#atlas-year");
      await expect(panel.locator("h2")).toContainText(y);
      const remember = panel.locator("p.remember");
      if (await remember.count()) await expect(remember).toContainText(/I remember/i);
      await expect(panel.locator("li.gold")).toContainText(GOLD[y]);
      await expect(panel.locator("li.gold")).not.toContainText(/itt\d{2}-/);
      await expect(panel.locator("a", { hasText: new RegExp("Enter " + y) })).toBeVisible();
      await expect(panel.locator("ol.wander li")).toHaveCount(3);
      await expect(panel).toContainText(/Not this year/i);
      const guidedN = await panel.locator(`#atlas-guided-${y} ol li`).count();
      expect(guidedN, y + " guided").toBeGreaterThanOrEqual(4);
      const officialN = await panel.locator("ol.ten li").count();
      expect(officialN, y + " official").toBeGreaterThanOrEqual(7);
      expect(officialN, y + " official").toBeLessThanOrEqual(10);

      const goldHref = await panel.locator("li.gold a").first().getAttribute("href");
      await expectLive(page, goldHref, y + " gold");

      const wander = await panel.locator("ol.wander a").evaluateAll((els) => els.map((a) => a.getAttribute("href") || ""));
      expect(wander.length, y + " wander").toBe(3);
      for (const h of wander) await expectLive(page, h, y + " wander");

      const guided = await panel.locator(`#atlas-guided-${y} a`).evaluateAll((els) => els.map((a) => a.getAttribute("href") || ""));
      expect(guided.length, y + " guided hrefs").toBeGreaterThanOrEqual(4);
      for (const h of guided) await expectLive(page, h, y + " guided");

      const ten = await panel.locator("ol.ten a").evaluateAll((els) => els.map((a) => a.getAttribute("href") || ""));
      expect(ten.length, y + " official").toBeGreaterThanOrEqual(7);
      expect(ten.length, y + " official").toBeLessThanOrEqual(10);
      const pages = ten.map((h) => String(h).replace(/\\/g, "/").split("?")[0].toLowerCase());
      expect(new Set(pages).size, y + " official dests must be unique hrefs").toBe(pages.length);
      for (const h of ten) await expectLive(page, h, y + " official");

      const gameLinks = panel.locator(".atlas-layer", { hasText: /Year games/ }).locator("a");
      const gn = await gameLinks.count();
      expect(gn, y + " games").toBeGreaterThanOrEqual(1);
      const gHrefs = await gameLinks.evaluateAll((els) => els.map((a) => a.getAttribute("href") || ""));
      for (const h of gHrefs) {
        if (/\/years\/(2015|2017|2018|2019|2023|2024|2025)\//.test(String(h)) || String(h).indexOf("/app/") !== -1) continue;
        await expectLive(page, h, y + " game");
      }
    }
  });

  test("leftover 2× catalog matches the on-disk matrix for every open year", async ({ page }) => {
    test.setTimeout(180000);
    const byYear = twoXByYear();
    const expectedTotal = Object.keys(byYear).reduce((n, y) => n + byYear[y].length, 0);
    await page.goto("/atlas/");
    await waitCatalog(page);
    await expect(page.locator("#atlas-all-2x summary .n")).toHaveText(String(expectedTotal));
    expect(expectedTotal).toBeGreaterThan(0);

    for (const y of OPEN) {
      const want = (byYear[y] || []).length;
      if (!want) continue;
      await page.goto("/atlas/#year-" + y);
      const layer = page.locator("#atlas-2x-" + y);
      await expect(layer).toBeVisible();
      await expect(layer.locator("summary .n")).toHaveText(String(want));
      const hrefs = await layer.locator("a").evaluateAll((els) => els.map((a) => a.getAttribute("href") || ""));
      expect(hrefs.length, y + " 2× listed").toBe(want);
      for (const h of hrefs) await expectLive(page, h, y + " 2×");
    }
  });

  test("popular third-trio rooms on disk are listed after catalog load", async ({ page }) => {
    await page.goto("/atlas/");
    await waitCatalog(page);
    const sample = ["1994", "2004", "2006", "2014"];
    for (const y of sample) {
      const want = (trio[y] || []).length;
      expect(want, y + " trio").toBeGreaterThanOrEqual(3);
      await page.goto("/atlas/#year-" + y);
      const panel = page.locator("#atlas-year");
      await expect(panel.locator(".atlas-layer", { hasText: /third trio/i })).toBeVisible();
      const hrefs = await panel
        .locator(".atlas-layer", { hasText: /third trio/i })
        .locator("a")
        .evaluateAll((els) => els.map((a) => a.getAttribute("href") || ""));
      expect(hrefs.length, y + " trio listed").toBe(want);
      for (const h of hrefs) await expectLive(page, h, y + " trio");
    }
  });

  test("museum-wide Every flow lists 24 golds and live official trails", async ({ page }) => {
    await page.goto("/atlas/");
    await waitCatalog(page);
    const golds = page.locator("#atlas-all-golds ol li");
    await expect(golds).toHaveCount(24);
    const goldHrefs = await page.locator("#atlas-all-golds a").evaluateAll((els) => els.map((a) => a.getAttribute("href") || ""));
    expect(goldHrefs.length).toBe(24);
    for (const h of goldHrefs) await expectLive(page, h, "all-golds");

    await expect(page.locator("#atlas-all-guided")).toBeVisible();
    await expect(page.locator("#atlas-all-official")).toBeVisible();
    await expect(page.locator("#atlas-all-games")).toBeVisible();
    const officialYears = page.locator("#atlas-all-official h4");
    await expect(officialYears).toHaveCount(24);
  });

  test("first night is the real 5-stop walk; spine keeps 2021 and 2022", async ({ page }) => {
    await page.goto("/atlas/");
    const night = page.locator("#trail-first-night");
    await expect(night).toContainText(/Stops in 2010/i);
    await expect(night.locator("ol li")).toHaveCount(5);
    await expect(night).toContainText(/CSotD|guestbook/i);
    await expect(night).toContainText(/Google/i);
    await expect(night).toContainText(/thefacebook/i);
    await expect(night).toContainText(/Twttr|Twitter/i);
    await expect(night).toContainText(/Instagram/i);
    const nightHrefs = await night.locator("a[href]").evaluateAll((els) =>
      els.map((a) => a.getAttribute("href") || "").filter((h) => h && !h.startsWith("#"))
    );
    expect(nightHrefs.length).toBeGreaterThanOrEqual(5);
    for (const h of nightHrefs) await expectLive(page, h, "first-night");

    await expect(page.locator('#atlas-spine [data-atlas-year="2021"]')).toHaveCount(1);
    await expect(page.locator('#atlas-spine [data-atlas-year="2022"]')).toHaveCount(1);
    for (const y of ["2015", "2017", "2023", "2024", "2025"]) {
      await expect(page.locator(`#atlas-spine [data-atlas-year="${y}"]`)).toHaveCount(0);
    }
    await expect(page.locator('#atlas-spine [data-atlas-year="2009"]')).toBeVisible();
  });

  test("find covers leftover 2×, Disney, and empty/no-match", async ({ page }) => {
    await page.goto("/atlas/");
    await waitCatalog(page);
    await expect(page.locator("#atlas-find-results")).toContainText(/Type a name/i);

    await page.fill("#atlas-find", "snap");
    await expect(page.locator("#atlas-find-results a").first()).toBeVisible();

    await page.fill("#atlas-find", "lucky");
    await expect(page.locator("#atlas-find-results a").first()).toBeVisible();

    await page.fill("#atlas-find", "zzzz-not-a-room");
    await expect(page.locator("#atlas-find-results")).toContainText(/No match/i);
  });

  test("hash #year-2022 opens and #year-2017 stays off the spine", async ({ page }) => {
    await page.goto("/atlas/#year-2022");
    await expect(page.locator('#atlas-spine [data-atlas-year="2022"]')).toHaveCount(1);
    await expect(page.locator('#atlas-spine [data-atlas-year="2022"]')).toHaveClass(/selected/);
    await expect(page.locator('#atlas-spine [data-atlas-year="2017"]')).toHaveCount(0);
  });
});
