// @ts-check
const { test, expect } = require("@playwright/test");

test.describe("2009 Stack Overflow accept persist", () => {
  test("accept + score survive reload", async ({ page }) => {
    await page.goto("/years/2009/sites/stackoverflow/question.html");
    await page.evaluate(() => localStorage.removeItem("itt09-stackoverflow"));
    await page.reload();
    await page.waitForTimeout(500);

    await page.locator("[data-so-vote='up']").click();
    await page.locator("[data-so-accept='a']").click();
    await expect
      .poll(async () => page.evaluate(() => localStorage.getItem("itt09-stackoverflow")))
      .toMatch(/"accepted"\s*:\s*"a"/);
    await expect(page.locator("[data-so-score]")).toHaveText("4");
    await expect(page.locator("[data-so-accepted-flag]")).toContainText(/a/i);
    await page.reload();
    await page.waitForTimeout(400);
    await expect(page.locator("[data-so-score]")).toHaveText("4");
    await expect(page.locator("[data-so-accepted-flag]")).toContainText(/a/i);
  });
});
