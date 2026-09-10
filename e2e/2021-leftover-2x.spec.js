// @ts-check
/**
 * 2021 leftover 2× — two leftover writers on every dest.
 * Leftover complete never writes itt21-att.
 */
const { test, expect } = require("@playwright/test");
const { revealLeftoverRails } = require("./helpers");

const fs = require("fs");
const path = require("path");
const SITES = path.join(__dirname, "..", "years", "2021", "sites");
const DESTS = fs
  .readdirSync(SITES)
  .filter((d) => fs.statSync(path.join(SITES, d)).isDirectory())
  .sort()
  .map((slug) => ({
    slug,
    file: fs.existsSync(path.join(SITES, slug, "game.html")) ? "game.html" : "index.html",
  }));

test("2021 dests have leftover 2× writers", async ({ page }) => {
  expect(DESTS.length).toBe(98);
  for (const dest of DESTS) {
    await page.goto(`/years/2021/sites/${dest.slug}/${dest.file}`);
    const n = await page.locator("[data-lo-save]").count();
    expect(n, dest.slug + " leftover 2×").toBeGreaterThanOrEqual(2);
  }
});

test("2021 leftover 2× complete never writes gold", async ({ page }) => {
  for (const dest of [
    { slug: "youtube", file: "index.html" },
    { slug: "signal", file: "index.html" },
    { slug: "clubhouse", file: "index.html" },
    { slug: "nft", file: "index.html" },
    { slug: "att", file: "index.html" },
  ]) {
    await page.goto(`/years/2021/sites/${dest.slug}/${dest.file}`);
    await page.evaluate(() => {
      try {
        localStorage.removeItem("itt21-att");
      } catch (e) {
        /* */
      }
    });
    await page.reload();
    await revealLeftoverRails(page);
    const save = page.locator("[data-lo-save]").first();
    await expect(save).toBeVisible();
    await save.click();
    expect(await page.evaluate(() => localStorage.getItem("itt21-att"))).toBeFalsy();
    const picks = page.locator("[data-lo-pick]");
    const pn = await picks.count();
    for (let i = 0; i < Math.min(pn, 2); i++) await picks.nth(i).click();
    const reqs = page.locator("[data-lo-req]");
    const rn = await reqs.count();
    for (let i = 0; i < rn; i++) await reqs.nth(i).check();
    await save.click();
    expect(await page.evaluate(() => localStorage.getItem("itt21-att")), dest.slug).toBeFalsy();
  }
});
