// @ts-check
const { test, expect } = require("@playwright/test");

test.describe("2015 Discord live UX", () => {
  test("server + message persist; empty blocked", async ({ page }) => {
    await page.goto("/years/2015/sites/discord/channel.html");
    await page.evaluate(() => {
      localStorage.removeItem("itt15-discord-msgs");
      try {
        sessionStorage.removeItem("itt15-discord-server");
      } catch (e) {
        /* */
      }
    });
    await page.reload();
    await page.locator("[data-discord-send]").click();
    expect(await page.evaluate(() => localStorage.getItem("itt15-discord-msgs"))).toBeFalsy();
    await page.goto("/years/2015/sites/discord/index.html");
    await page.locator("[data-discord-server='Museum HQ']").click();
    await page.goto("/years/2015/sites/discord/channel.html");
    await page.locator("[data-discord-send]").click();
    expect(await page.evaluate(() => localStorage.getItem("itt15-discord-msgs"))).toBeFalsy();
    await page.fill("[data-discord-msg]", "ship it residual");
    await page.locator("[data-discord-send]").click();
    await expect.poll(async () => page.evaluate(() => localStorage.getItem("itt15-discord-msgs"))).toMatch(/ship it residual/);
    await page.reload();
    await expect(page.locator("[data-discord-thread]")).toContainText(/ship it residual/i);
    expect(await page.evaluate(() => localStorage.getItem("itt14-slack") || "")).toBeFalsy();
  });
});
