// @ts-check
/**
 * 2008 every dest link — dest URLs live (year boarded).
 */
const { test, expect } = require("@playwright/test");
const fs = require("fs");
const path = require("path");

const SITES = path.join(__dirname, "..", "years", "2008", "sites");

function destFolders() {
  return fs
    .readdirSync(SITES)
    .filter((d) => fs.statSync(path.join(SITES, d)).isDirectory())
    .sort();
}

test.describe("2008 every dest is live", () => {
  for (const dest of destFolders()) {
    const index = path.join(SITES, dest, "index.html");
    const issue = path.join(SITES, dest, "issue.html");
    const file = fs.existsSync(index) ? "index.html" : fs.existsSync(issue) ? "issue.html" : "";
    test(`${dest} ${file} HTTP 200 · year 2008`, async ({ page }) => {
      expect(file, dest + " has index or issue").toBeTruthy();
      const res = await page.goto(`/years/2008/sites/${dest}/${file}`);
      expect(res && res.ok(), dest).toBeTruthy();
      await expect(page.locator("html")).toHaveAttribute("data-itt-year", "2008");
      await expect(page.locator("body")).toBeVisible();
    });
  }
});

test("2008 year shell is live XP+IE7 not bounce", async ({ page }) => {
  await page.goto("/years/2008/");
  const skip = page.locator("#skip-connect");
  if (await skip.isVisible().catch(() => false)) await skip.click();
  await expect(page.locator("body")).toHaveAttribute("data-itt-year", "2008");
  await expect(page.locator("#content")).toBeVisible();
  await expect(page.locator("body")).not.toContainText(/2008 is not on the year menu/i);
});
