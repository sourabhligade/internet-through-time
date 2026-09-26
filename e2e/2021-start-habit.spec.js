// @ts-check
const { test, expect } = require("@playwright/test");

const DOOR = "/app/index.html#/year/2021";
const OFFICIAL = [
  "1 ATT Ask",
  "2 Signal",
  "3 Copilot waitlist",
  "4 Meta rename",
  "5 Windows 11",
  "6 Flash brick",
  "7 Chrome habit",
  "8 Windows 10 residual",
  "9 Facebook",
  "10 Five Letter",
];

test.describe("2021 start habit", () => {
  test("hero is Ask App Not to Track · 26 April 2021 · Allow never writes", async ({ page }) => {
    await page.goto(DOOR);
    const hero = page.locator("article.stop");
    await expect(hero).toContainText("26 April 2021");
    await expect(hero).toContainText("iOS 14.5");
    await expect(hero).toContainText("Ask App Not to Track");
    await expect(hero).toContainText("Allow never writes");
    await expect(hero).not.toContainText("One-thing");
    await expect(hero).not.toContainText("Do this first");
  });

  test("guided 6 and official 10 are on the rail", async ({ page }) => {
    await page.goto(DOOR);
    await expect(page.locator("article.stop ol > li")).toHaveCount(6);
    const official = page.locator(".rails").getByRole("heading", { name: "Official ten" }).locator("xpath=..");
    for (const name of OFFICIAL) {
      await expect(official.getByRole("button", { name, exact: true })).toBeVisible();
    }
    await expect(official).not.toContainText(/leftover/i);
  });

  for (const name of OFFICIAL) {
    test("official heading has no leftover · " + name, async ({ page }) => {
      await page.goto(DOOR);
      await page.getByRole("button", { name, exact: true }).click();
      const h1 = page.locator("article.stop h1");
      await expect(h1).toBeVisible();
      await expect(h1).not.toContainText(/leftover/i);
    });
  }
});
