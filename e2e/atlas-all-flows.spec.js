// @ts-check
/**
 * Hallway atlas — every on-disk flow layer, every open year.
 * Golds stay locked. Wiped years stay boarded. Leftover 2× is listed, not the chip.
 */
const { test, expect } = require("@playwright/test");

const matrix = require("./2x-links.matrix.json");
const trio = require("../scripts/popular-3x3-sites.json");

const OPEN = [
  "1994", "1995", "1996", "1997", "1998", "1999", "2000", "2001", "2002", "2003",
  "2004", "2005", "2006", "2007", "2008", "2009", "2010", "2011", "2012", "2013",
  "2014", "2015", "2016", "2017", "2019"
];
const WIPED = ["2018", "2020", "2021", "2022", "2023", "2024", "2025"];
const LEAN = [
  "2007", "2009", "2011",
  "2013", "2014", "2015", "2016", "2017",
  "2019"
];
const WINGS = {
  gray: ["1994", "1995", "1996"],
  bubble: ["1997", "1998", "1999", "2000"],
  rebuild: ["2001", "2002", "2003", "2004", "2005", "2006", "2007"],
  phone: ["2008", "2009", "2010", "2011", "2012", "2013"],
  stream: ["2014", "2015", "2016", "2017", "2018", "2019"],
  "late-lean": ["2020", "2021", "2022", "2023", "2024"],
  "wiped-late": ["2025"]
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
  "2008": /GitHub/i,
  "2009": /Like/i,
  "2010": /Instagram/i,
  "2011": /Google\+/i,
  "2012": /Instagram Android/i,
  "2013": /Vine/i,
  "2014": /WhatsApp Install/i,
  "2015": /Periscope|Go LIVE/i,
  "2016": /Instagram Stories/i,
  "2017": /Face ID|iPhone X/i,
  "2018": /GDPR Manage/i,
  "2019": /Disney\+/i,
  "2020": /Zoom Leave/i,
  "2021": /ATT|Ask App Not to Track/i,
  "2022": /ChatGPT Send/i,
  "2023": /Plus Subscribe/i,
  "2024": /GPT-4o Talk/i
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
  test("hub hint names the hallway and the real first-night walk", async ({ page }) => {
    await page.goto("/");
    const hint = page.locator(".start-hint");
    await expect(hint).toContainText(/hallway/i);
    await expect(hint).toContainText(/felt like/i);
    await expect(hint).toContainText(/thefacebook/i);
    await expect(hint).not.toContainText(/YouTube → App Store/i);
  });

  test("remember lines are year-true and wiped years stay silent", async ({ page }) => {
    await page.goto("/atlas/");
    await expect(page.locator('#atlas-spine .atlas-wing[data-wing="wiped-late"] .wing-blurb')).toContainText(/empty for rebuild|wiped for rebuild/i);
    await page.locator('#atlas-spine [data-atlas-year="1999"]').click();
    await expect(page.locator("#atlas-year p.remember")).toContainText(/ding/i);
    await page.locator('#atlas-spine [data-atlas-year="2019"]').click();
    await expect(page.locator("#atlas-year p.remember")).toContainText(/Continue is the save/i);
    await page.locator('#atlas-spine [data-atlas-year="2004"]').click();
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
    for (const y of ["1994", "1998", "2004", "2008"]) {
      await expect(page.locator(`#atlas-spine [data-atlas-year="${y}"]`)).not.toHaveClass(/lean/);
    }
    await expect(page.locator('#atlas-spine .atlas-wing[data-wing="wiped-late"]')).toHaveClass(/atlas-wing/);
  });

  test("wiped years stay boarded — no Enter, all three hashes", async ({ page }) => {
    for (const y of WIPED) {
      await page.goto("/atlas/#year-" + y);
      const panel = page.locator("#atlas-year");
      await expect(panel).toContainText(/wiped/i);
      await expect(panel.locator("p.remember")).toHaveCount(0);
      await expect(panel.locator("a", { hasText: new RegExp("Enter " + y) })).toHaveCount(0);
      await expect(panel.locator("li.gold")).toHaveCount(0);
      await expect(page.locator(`#atlas-spine [data-atlas-year="${y}"]`)).toHaveClass(/wiped/);
    }
  });

  test("every open year postcard: locked gold, wander, not-this-year, guided, official 10, live hrefs", async ({ page }) => {
    await page.goto("/atlas/");
    for (const y of OPEN) {
      await page.locator(`#atlas-spine [data-atlas-year="${y}"]`).click();
      const panel = page.locator("#atlas-year");
      await expect(panel.locator("h2")).toContainText(y);
      await expect(panel.locator("p.remember")).toContainText(/I remember/i);
      await expect(panel.locator("li.gold")).toContainText(GOLD[y]);
      await expect(panel.locator("li.gold")).not.toContainText(/itt\d{2}-/);
      await expect(panel.locator("a", { hasText: new RegExp("Enter " + y) })).toBeVisible();
      await expect(panel.locator("ol.wander li")).toHaveCount(3);
      await expect(panel).toContainText(/Not this year/i);
      const guidedN = await panel.locator(`#atlas-guided-${y} ol li`).count();
      expect(guidedN, y + " guided").toBeGreaterThanOrEqual(4);
      await expect(panel.locator("ol.ten li")).toHaveCount(10);

      const goldHref = await panel.locator("li.gold a").first().getAttribute("href");
      await expectLive(page, goldHref, y + " gold");

      const wander = await panel.locator("ol.wander a").evaluateAll((els) => els.map((a) => a.getAttribute("href") || ""));
      expect(wander.length, y + " wander").toBe(3);
      for (const h of wander) await expectLive(page, h, y + " wander");

      const guided = await panel.locator(`#atlas-guided-${y} a`).evaluateAll((els) => els.map((a) => a.getAttribute("href") || ""));
      expect(guided.length, y + " guided hrefs").toBeGreaterThanOrEqual(4);
      for (const h of guided) await expectLive(page, h, y + " guided");

      const ten = await panel.locator("ol.ten a").evaluateAll((els) => els.map((a) => a.getAttribute("href") || ""));
      expect(ten.length, y + " official").toBe(10);
      for (const h of ten) await expectLive(page, h, y + " official");

      const gameLinks = panel.locator(".atlas-layer", { hasText: /Year games/ }).locator("a");
      const gn = await gameLinks.count();
      expect(gn, y + " games").toBeGreaterThanOrEqual(1);
      const gHrefs = await gameLinks.evaluateAll((els) => els.map((a) => a.getAttribute("href") || ""));
      for (const h of gHrefs) await expectLive(page, h, y + " game");
    }
  });

  test("leftover 2× catalog matches the on-disk matrix for every open year", async ({ page }) => {
    const byYear = twoXByYear();
    const expectedTotal = Object.keys(byYear).reduce((n, y) => n + byYear[y].length, 0);
    await page.goto("/atlas/");
    await waitCatalog(page);
    await expect(page.locator("#atlas-all-2x summary .n")).toHaveText(String(expectedTotal));
    expect(expectedTotal).toBeGreaterThan(1000);

    for (const y of OPEN) {
      const want = (byYear[y] || []).length;
      expect(want, y + " matrix rows").toBeGreaterThan(0);
      await page.locator(`#atlas-spine [data-atlas-year="${y}"]`).click();
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
    const sample = ["1994", "2004", "2008", "2014", "2019"];
    for (const y of sample) {
      const want = (trio[y] || []).length;
      expect(want, y + " trio").toBe(3);
      await page.locator(`#atlas-spine [data-atlas-year="${y}"]`).click();
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

  test("first night is the real 5-stop walk; 2025 stays boarded", async ({ page }) => {
    await page.goto("/atlas/");
    const night = page.locator("#trail-first-night");
    await expect(night).toContainText(/Stops in 2010/i);
    await expect(night.locator("ol li")).toHaveCount(5);
    await expect(night).toContainText(/CSotD|guestbook/i);
    await expect(night).toContainText(/Google/i);
    await expect(night).toContainText(/thefacebook/i);
    await expect(night).toContainText(/App Store/i);
    await expect(night).toContainText(/Instagram/i);
    const nightHrefs = await night.locator("a[href]").evaluateAll((els) =>
      els.map((a) => a.getAttribute("href") || "").filter((h) => h && !h.startsWith("#"))
    );
    expect(nightHrefs.length).toBeGreaterThanOrEqual(5);
    for (const h of nightHrefs) await expectLive(page, h, "first-night");

    await expect(page.locator('#atlas-spine [data-atlas-year="2019"]')).toHaveClass(/open/);
    await expect(page.locator('#atlas-spine [data-atlas-year="2020"]')).toHaveClass(/wiped/);
    await expect(page.locator('#atlas-spine [data-atlas-year="2025"]')).toHaveClass(/wiped/);
  });

  test("find covers leftover 2×, Disney, and empty/no-match", async ({ page }) => {
    await page.goto("/atlas/");
    await waitCatalog(page);
    await expect(page.locator("#atlas-find-results")).toContainText(/Type a name/i);

    await page.fill("#atlas-find", "disney");
    await expect(page.locator("#atlas-find-results a").first()).toHaveAttribute("href", /disneyplus/i);
    await expectLive(page, await page.locator("#atlas-find-results a").first().getAttribute("href"), "find disney");

    await page.fill("#atlas-find", "lucky");
    await expect(page.locator("#atlas-find-results a").first()).toBeVisible();

    await page.fill("#atlas-find", "zzzz-not-a-room");
    await expect(page.locator("#atlas-find-results")).toContainText(/No match/i);
  });

  test("hash #year-2019 enters Disney+", async ({ page }) => {
    await page.goto("/atlas/#year-2019");
    const panel = page.locator("#atlas-year");
    await expect(page.locator('#atlas-spine [data-atlas-year="2019"]')).toHaveClass(/selected/);
    await expect(panel).toContainText(/Disney/i);
    await expect(panel.locator("a", { hasText: /Enter 2019/ })).toBeVisible();
  });
});
