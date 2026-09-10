// @ts-check
/**
 * 2007 every dest link — live dest, not bounce, not mock 404.
 * Disk dest folders + every home dest href. Official dests keep dest-true verbs.
 */
const { test, expect } = require("@playwright/test");
const { revealLeftoverRails } = require("./helpers");
const fs = require("fs");
const path = require("path");

const ROOT = path.join(__dirname, "..");
const SITES = path.join(ROOT, "years", "2007", "sites");

const OFFICIAL = [
  { path: "/years/2007/sites/iphone/index.html", key: "itt07-iphone" },
  { path: "/years/2007/sites/streetview/index.html", key: "itt07-streetview" },
  { path: "/years/2007/sites/gmail/index.html", key: "itt07-gmail" },
  { path: "/years/2007/sites/fbplat/index.html", key: "itt07-fbplat" },
  { path: "/years/2007/sites/twitter/index.html", key: "itt07-twitter" },
  { path: "/years/2007/sites/youtube/index.html", key: "itt07-youtube" },
  { path: "/years/2007/sites/tumblr/index.html", key: "itt07-tumblr" },
  { path: "/years/2007/sites/kindle/index.html", key: "itt07-kindle" },
  { path: "/years/2007/sites/ie6/index.html", key: "itt07-ie6" },
  { path: "/years/2007/sites/playable/game.html", key: "itt07-game-safariq" },
];

function destFolders() {
  return fs
    .readdirSync(SITES)
    .filter((d) => fs.statSync(path.join(SITES, d)).isDirectory())
    .sort();
}

test.describe("2007 every dest is live", () => {
  for (const dest of destFolders()) {
    const index = path.join(SITES, dest, "index.html");
    const game = path.join(SITES, dest, "game.html");
    const file = fs.existsSync(index) ? "index.html" : fs.existsSync(game) ? "game.html" : "";
    test(`${dest} ${file} HTTP 200 · year 2007 · not boarded`, async ({ page }) => {
      expect(file, dest + " has index or game").toBeTruthy();
      const res = await page.goto(`/years/2007/sites/${dest}/${file}`);
      expect(res && res.ok(), dest).toBeTruthy();
      await expect(page.locator("html")).toHaveAttribute("data-itt-year", "2007");
      await expect(page.locator("body")).not.toContainText(/2007 is not on the year menu/i);
      await expect(page.locator("h1, [data-official-verb], [data-lo-save]").first()).toBeVisible();
    });
  }
});

test("2007 home every dest href is live", async ({ page }) => {
  const res = await page.goto("/years/2007/pages/home.html");
  expect(res && res.ok()).toBeTruthy();
  await expect(page.locator("#ott-guided-2007 ol li")).toHaveCount(6);
  const hrefs = await page.locator('a[href*="sites/"]').evaluateAll((els) =>
    [...new Set(els.map((a) => a.getAttribute("href") || "").filter(Boolean))]
  );
  expect(hrefs.length).toBeGreaterThan(20);
  for (const href of hrefs) {
    const url = new URL(href, "http://x/years/2007/pages/home.html").pathname;
    const r = await page.request.get(url);
    expect(r.ok(), url).toBeTruthy();
  }
});

test("2007 official dests dest-true verb is dest face", async ({ page }) => {
  for (const row of OFFICIAL) {
    await page.goto(row.path);
    await expect(page.locator("html")).toHaveAttribute("data-official-key", row.key);
    await expect(page.locator("[data-official-verb]")).toBeVisible();
    await expect(page.locator("body")).not.toContainText(/Official note/i);
    await expect(page.locator("body")).not.toContainText(/plaques never stamp/i);
  }
});

test("2007 first-board unique dest leftover never writes gold", async ({ page }) => {
  const samples = ["opensocial", "androidann", "justintv", "yahoo", "googlevideo"];
  for (const slug of samples) {
    await page.goto(`/years/2007/sites/${slug}/index.html`);
    await page.evaluate(() => {
      try {
        localStorage.removeItem("itt07-iphone");
      } catch (e) {
        /* */
      }
    });
    await page.reload();
    await revealLeftoverRails(page);
    const save = page.locator("[data-lo-save]").first();
    await expect(save).toBeVisible();
    await save.click();
    expect(await page.evaluate(() => localStorage.getItem("itt07-iphone"))).toBeFalsy();
    const picks = page.locator("[data-lo-pick]");
    const n = await picks.count();
    for (let i = 0; i < n; i++) await picks.nth(i).click();
    const reqs = page.locator("[data-lo-req]");
    const r = await reqs.count();
    for (let i = 0; i < r; i++) await reqs.nth(i).check();
    await save.click();
    expect(await page.evaluate(() => localStorage.getItem("itt07-iphone"))).toBeFalsy();
  }
});

test("2007 year shell is live XP+IE6 not bounce", async ({ page }) => {
  await page.goto("/years/2007/");
  const skip = page.locator("#skip-connect");
  if (await skip.isVisible().catch(() => false)) await skip.click();
  await expect(page.locator("body")).toHaveAttribute("data-itt-year", "2007");
  await expect(page.locator("#content")).toBeVisible();
  await expect(page.locator("body")).not.toContainText(/2007 is not on the year menu/i);
});
