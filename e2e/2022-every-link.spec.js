// @ts-check
/**
 * 2022 every dest link — dest URLs live (CUT-OPEN lean).
 * Unique dest freeze 98. No 2021 official clone dests.
 */
const { test, expect } = require("@playwright/test");
const fs = require("fs");
const path = require("path");

const SITES = path.join(__dirname, "..", "years", "2022", "sites");

function destFolders() {
  return fs
    .readdirSync(SITES)
    .filter((d) => fs.statSync(path.join(SITES, d)).isDirectory())
    .sort();
}

test.describe("2022 every dest is live", () => {
  test("dest freeze 98 · no 2021 official clone slugs", () => {
    const dests = destFolders();
    expect(dests.length).toBe(98);
    for (const clone of ["att", "signal", "copilot", "meta", "windows11", "flash", "nft", "clubhouse", "squid"]) {
      expect(dests, clone + " clone").not.toContain(clone);
    }
  });

  for (const dest of destFolders()) {
    const index = path.join(SITES, dest, "index.html");
    const game = path.join(SITES, dest, "game.html");
    const file = fs.existsSync(index) ? "index.html" : fs.existsSync(game) ? "game.html" : "";
    test(`${dest} ${file} HTTP 200 · year 2022`, async ({ page }) => {
      expect(file, dest + " has index or game").toBeTruthy();
      const res = await page.goto(`/years/2022/sites/${dest}/${file}`);
      expect(res && res.ok(), dest).toBeTruthy();
      await expect(page.locator("html")).toHaveAttribute("data-itt-year", "2022");
      await expect(page.locator("body")).toBeVisible();
    });
  }
});

test("2022 year shell is live Chrome habit not bounce", async ({ page }) => {
  await page.goto("/years/2022/");
  const skip = page.locator("#skip-connect");
  if (await skip.isVisible().catch(() => false)) await skip.click();
  await expect(page.locator("body")).toHaveAttribute("data-itt-year", "2022");
  await expect(page.locator("#content")).toBeVisible();
  await expect(page.locator("body")).not.toContainText(/2022 is not on the year menu/i);
});
