// @ts-check
const { test, expect } = require("@playwright/test");

async function getKey(page, k) {
  return page.evaluate((key) => window.localStorage.getItem(key), k);
}

test.describe("2020 flows", () => {
  test("2020 is live", async ({ page }) => {
    await page.goto("/");
    await expect(page.locator(".year-card.available.y2020")).toBeVisible();
    await expect(page.locator(".year-card.locked.y2020")).toHaveCount(0);
  });

  test("star Join never writes; mute + chat + Leave writes itt20-zoom", async ({ page }) => {
    await page.goto("/years/2020/sites/zoom/meeting.html");
    await page.evaluate(() => localStorage.removeItem("itt20-zoom"));
    await page.reload();
    await page.locator("[data-zoom-join]").click();
    await page.locator("[data-zoom-leave]").click();
    expect(await getKey(page, "itt20-zoom")).toBeFalsy();
    await page.locator("[data-zoom-req]").nth(0).check();
    await page.locator("[data-zoom-req]").nth(1).check();
    await page.locator("[data-zoom-mute]").click();
    await page.fill("[data-zoom-chat]", "can you hear me");
    await page.locator("[data-zoom-send]").click();
    await page.locator("[data-zoom-leave]").click();
    await expect.poll(() => getKey(page, "itt20-zoom")).toBeTruthy();
  });

  test("leftover-3× first dests exist · leftover-2× never writes gold", async ({ page }) => {
    for (const dest of [
      "sites/youtube/index.html",
      "sites/wikipedia/index.html",
      "sites/facebook/index.html",
      "sites/teams/index.html",
      "sites/vine/index.html",
    ]) {
      const res = await page.goto("/years/2020/" + dest);
      expect(res && res.ok(), dest).toBeTruthy();
      const panel = page.locator("[data-lo-panel]").first();
      await expect(panel.locator("[data-lo-save]").first()).toBeVisible();
      await page.evaluate(() => localStorage.removeItem("itt20-zoom"));
      await panel.locator("[data-lo-save]").first().click();
      expect(await page.evaluate(() => localStorage.getItem("itt20-zoom")), dest).toBeFalsy();
    }
    await page.goto("/years/2020/sites/zoom/meeting.html");
    await page.evaluate(() => {
      localStorage.removeItem("itt20-zoom");
      localStorage.removeItem("itt20-zoom-lx");
    });
    await page.reload();
    const panel = page.locator("[data-lo-panel]").filter({ has: page.locator('[data-lo-save][data-lo-key="zoom-lx"]') }).first();
    await panel.locator("[data-lo-save]").click();
    expect(await getKey(page, "itt20-zoom-lx")).toBeFalsy();
    await panel.locator("[data-lo-pick='keep']").click();
    const reqs = panel.locator("[data-lo-req]");
    for (let i = 0; i < (await reqs.count()); i++) await reqs.nth(i).check();
    await panel.locator("[data-lo-field]").fill("zoom leftover");
    await panel.locator("[data-lo-save]").click();
    await expect.poll(() => getKey(page, "itt20-zoom-lx")).toBeTruthy();
    expect(await getKey(page, "itt20-zoom")).toBeFalsy();
  });
});
