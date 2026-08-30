// @ts-check
const { test, expect } = require("@playwright/test");
async function getKey(page, k) {
  return page.evaluate((key) => window.localStorage.getItem(key), k);
}
test.describe("2011 leftover densify", () => {
  test("About dual-cite + bans", async ({ page }) => {
    await page.goto("/years/2011/pages/about.html");
        await expect(page.locator("body")).toContainText("346,004,403");
    await expect(page.locator("body")).toContainText("555 million");
    await expect(page.locator("body")).toContainText("Android");
    await expect(page.locator("body")).toContainText("iPhone 4");
  });
  test("guided stays exactly 6", async ({ page }) => {
    await page.goto("/years/2011/pages/home.html");
    await expect(page.locator("#ott-guided-2011 ol > li")).toHaveCount(6);
    await expect(page.locator('[data-ott-one-thing="2011"]')).toBeVisible();
  });
  test("star trap + empty never write; complete writes itt11-gplus", async ({ page }) => {
    await page.goto("/years/2011/sites/googleplus/index.html");
    await page.evaluate(() => localStorage.removeItem("itt11-gplus"));
    await page.reload();
    await page.locator("[data-gp11-won]").click();
    await page.locator("[data-gp11-hangout]").click();
    expect(await getKey(page, "itt11-gplus")).toBeFalsy();
    await page.locator("[data-gp11-req]").nth(0).check();
    await page.locator("[data-gp11-req]").nth(1).check();
    await page.fill("[data-gp11-circle]", "Friends");
    await page.locator('[data-gp11-person="ada"]').click();
    await page.locator('[data-gp11-person="al"]').click();
    await page.locator("[data-gp11-hangout]").click();
    await expect.poll(() => getKey(page, "itt11-gplus")).toBeTruthy();
  });
  test("Spotify trap/empty never writes then save", async ({ page }) => {
    await page.goto("/years/2011/sites/spotify/index.html");
    await page.evaluate(() => localStorage.removeItem("itt11-spotify"));
    await page.reload();
    await page.locator("[data-sp11-stream]").click();
    await page.locator("[data-sp11-invite]").click();
    expect(await getKey(page, "itt11-spotify")).toBeFalsy();
    await page.locator("[data-sp11-req]").nth(0).check();
    await page.locator("[data-sp11-req]").nth(1).check();
    await page.locator('[data-sp11-sku="free"]').click();
    await page.locator("[data-sp11-invite]").click();
    await expect.poll(() => getKey(page, "itt11-spotify")).toBeTruthy();
  });
  test("dirbar dests resolve · no 2012 clone rooms", async ({ page }) => {
    await page.goto("/years/2011/");
    await expect(page.locator('[data-go="sites/instagram/android.html"]')).toHaveCount(0);
    await expect(page.locator('[data-go="sites/facebook/ipo.html"]')).toHaveCount(0);
    await expect(page.locator('[data-go="sites/chrome/index.html"]')).toHaveCount(0);
    const goes = await page.locator(".dir-btn[data-go]").evaluateAll((els) =>
      els.map((el) => el.getAttribute("data-go") || "")
    );
    expect(goes.length).toBeGreaterThanOrEqual(6);
    for (const go of goes) {
      const res = await page.request.get("/years/2011/" + go);
      expect(res.status(), "dirbar " + go).toBeLessThan(400);
    }
  });

  test("Siri trap/empty never writes then save", async ({ page }) => {
    await page.goto("/years/2011/sites/iphone/index.html");
    await page.evaluate(() => localStorage.removeItem("itt11-siri"));
    await page.reload();
    await page.locator("[data-sr11-iphone4]").click();
    await page.locator("[data-sr11-ask]").click();
    expect(await getKey(page, "itt11-siri")).toBeFalsy();
    await page.locator("[data-sr11-req]").nth(0).check();
    await page.locator("[data-sr11-req]").nth(1).check();
    await page.fill("[data-sr11-phrase]", "will I need an umbrella");
    await page.locator("[data-sr11-ask]").click();
    await expect.poll(() => getKey(page, "itt11-siri")).toBeTruthy();
  });
});
