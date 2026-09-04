// @ts-check
const { test, expect } = require("@playwright/test");


test.describe("1994 Yahoo 3-hub wander", () => {
  test("writes itt94-yahoo-wander only after 3 distinct hubs", async ({ page }) => {
    await page.goto("/years/1994/sites/yahoo/Computers/index.html");
    await page.evaluate(() => {
      localStorage.removeItem("itt94-yahoo-wander");
      try {
        sessionStorage.removeItem("itt94-yahoo-wander-seen");
      } catch (e) {
        /* */
      }
    });
    await page.reload();
    await page.waitForTimeout(400);
    expect(await page.evaluate(() => localStorage.getItem("itt94-yahoo-wander"))).toBeFalsy();

    await page.goto("/years/1994/sites/yahoo/Entertainment/index.html");
    await page.waitForTimeout(300);
    expect(await page.evaluate(() => localStorage.getItem("itt94-yahoo-wander"))).toBeFalsy();

    await page.goto("/years/1994/sites/yahoo/News/index.html");
    await expect
      .poll(async () => page.evaluate(() => localStorage.getItem("itt94-yahoo-wander") || ""), { timeout: 8000 })
      .toMatch(/computers|entertainment|news|yahoo-wander/i);
    const blob = await page.evaluate(() => localStorage.getItem("itt94-yahoo-wander") || "");
    expect(blob).toMatch(/"real"\s*:\s*true/);
    expect(blob).toMatch(/"year"\s*:\s*"1994"/);
    expect(await page.evaluate(() => localStorage.getItem("itt95-ssl") || "")).toBeFalsy();
  });
});
