// @ts-check
const { test, expect } = require("@playwright/test");

test.describe("2009 Stack Overflow accept persist", () => {
  test("accept + score survive reload", async ({ page }) => {
    await page.goto("/years/2009/sites/stackoverflow/question.html");
    await page.evaluate(() => {
      localStorage.removeItem("itt09-stackoverflow");
      localStorage.removeItem("itt09-so-accepted");
    });
    await page.reload();
    await page.waitForTimeout(500);

    await page.locator("[data-so-vote='up']").click();
    await page.locator("[data-so-accept='a']").click();
    await expect
      .poll(async () => page.evaluate(() => localStorage.getItem("itt09-stackoverflow")))
      .toMatch(/"accepted"\s*:\s*"a"/);
    await expect(page.locator("[data-so-score]")).toHaveText("4");
    await expect(page.locator("[data-so-accepted-flag]")).toContainText(/a/i);
    await expect
      .poll(async () => page.evaluate(() => localStorage.getItem("itt09-so-accepted")))
      .toMatch(/"id"\s*:\s*"a"/);
    await page.reload();
    await page.waitForTimeout(400);
    await expect(page.locator("[data-so-score]")).toHaveText("4");
    await expect(page.locator("[data-so-accepted-flag]")).toContainText(/a/i);
  });

  test("empty ask blocked; second accept moves the check", async ({ page }) => {
    await page.goto("/years/2009/sites/stackoverflow/index.html");
    await page.evaluate(() => localStorage.removeItem("itt09-stackoverflow"));
    await page.reload();
    await page.locator("form[data-so-ask] button[type='submit']").click();
    expect(await page.evaluate(() => localStorage.getItem("itt09-stackoverflow"))).toBeFalsy();

    await page.goto("/years/2009/sites/stackoverflow/question.html");
    await page.evaluate(() => {
      localStorage.removeItem("itt09-stackoverflow");
      localStorage.removeItem("itt09-so-accepted");
    });
    await page.reload();
    await page.locator("[data-so-accept='a']").click();
    await expect
      .poll(async () => page.evaluate(() => localStorage.getItem("itt09-stackoverflow")))
      .toMatch(/"accepted"\s*:\s*"a"/);
    await page.locator("[data-so-accept='b']").click();
    await expect
      .poll(async () => page.evaluate(() => localStorage.getItem("itt09-stackoverflow")))
      .toMatch(/"accepted"\s*:\s*"b"/);
    await expect(page.locator("[data-so-accepted-flag]")).toContainText(/b/i);
    await page.reload();
    await expect(page.locator("[data-so-accepted-flag]")).toContainText(/b/i);
    const blob = await page.evaluate(() => localStorage.getItem("itt09-stackoverflow") || "");
    expect(blob).toMatch(/"acceptedId"\s*:\s*"b"/);
    expect(await page.evaluate(() => localStorage.getItem("itt08-github") || "")).toBeFalsy();
  });
});
