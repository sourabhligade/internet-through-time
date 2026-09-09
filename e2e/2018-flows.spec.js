// @ts-check
const { test, expect } = require("@playwright/test");

async function getKey(page, k) {
  return page.evaluate((key) => window.localStorage.getItem(key), k);
}

test.describe("2018 flows", () => {
  test("2018 is live", async ({ page }) => {
    await page.goto("/");
    await expect(page.locator(".year-card.available.y2018")).toBeVisible();
    await expect(page.locator(".year-card.locked.y2018")).toHaveCount(0);
  });

  test("guided stays exactly 6", async ({ page }) => {
    await page.goto("/years/2018/pages/home.html");
    await expect(page.locator("#ott-guided-2018 ol > li")).toHaveCount(6);
    await expect(page.locator('[data-ott-one-thing="2018"]')).toBeVisible();
  });

  test("star Accept All never writes; Manage + Save writes itt18-gdpr", async ({ page }) => {
    await page.goto("/years/2018/sites/gdpr/index.html");
    await page.evaluate(() => localStorage.removeItem("itt18-gdpr"));
    await page.reload();
    await page.locator("[data-gdpr-accept-all]").click();
    expect(await getKey(page, "itt18-gdpr")).toBeFalsy();
    await page.locator("[data-gdpr-manage]").click();
    await page.locator("[data-gdpr-save]").click();
    await expect.poll(() => getKey(page, "itt18-gdpr")).toBeTruthy();
  });

  test("TikTok FYP empty never writes; two taps + Learn writes", async ({ page }) => {
    await page.goto("/years/2018/sites/tiktok/fyp.html");
    await page.evaluate(() => {
      localStorage.removeItem("itt18-tiktok-fyp");
      localStorage.removeItem("itt18-gdpr");
    });
    await page.reload();
    await page.locator("[data-fyp-learn]").click();
    expect(await getKey(page, "itt18-tiktok-fyp")).toBeFalsy();
    await page.locator('[data-fyp-tap="a"]').click();
    await page.locator('[data-fyp-tap="b"]').click();
    await page.locator("[data-fyp-learn]").click();
    await expect.poll(() => getKey(page, "itt18-tiktok-fyp")).toBeTruthy();
    expect(await getKey(page, "itt18-gdpr")).toBeFalsy();
  });

  test("official dests exist and leftover-2× never writes gold", async ({ page }) => {
    const dests = [
      "sites/trust/index.html",
      "sites/instagram/igtv.html",
      "sites/chrome/not-secure.html",
      "sites/homepod/index.html",
      "sites/spectre/index.html",
      "sites/fortnite/switch.html",
      "sites/github/microsoft.html",
      "sites/playable/game.html",
    ];
    for (const dest of dests) {
      const res = await page.request.get("/years/2018/" + dest);
      expect(res.status(), dest).toBeLessThan(400);
    }
    await page.goto("/years/2018/sites/trust/index.html");
    await page.evaluate(() => {
      localStorage.removeItem("itt18-gdpr");
      localStorage.removeItem("itt18-hear-lx");
    });
    await page.reload();
    const panel = page.locator("[data-lo-panel]").filter({ has: page.locator('[data-lo-save][data-lo-key="hear-lx"]') }).first();
    await panel.locator("[data-lo-save]").click();
    expect(await getKey(page, "itt18-hear-lx")).toBeFalsy();
    await panel.locator("[data-lo-pick='keep']").click();
    const reqs = panel.locator("[data-lo-req]");
    for (let i = 0; i < (await reqs.count()); i++) await reqs.nth(i).check();
    await panel.locator("[data-lo-field]").fill("hear leftover");
    await panel.locator("[data-lo-save]").click();
    await expect.poll(() => getKey(page, "itt18-hear-lx")).toBeTruthy();
    expect(await getKey(page, "itt18-gdpr")).toBeFalsy();
  });
});
