// @ts-check
const { test, expect } = require("@playwright/test");

test.describe("2011 Airbnb listing persist", () => {
  test("search pick book on index; listing page shows requested after reload", async ({ page }) => {
    await page.goto("/years/2011/sites/airbnb/index.html");
    await page.evaluate(() => localStorage.removeItem("itt11-airbnb"));
    await page.reload();
    await page.waitForTimeout(400);

    await page.locator("[data-abnb-book]").click();
    expect(await page.evaluate(() => localStorage.getItem("itt11-airbnb"))).toBeNull();

    await page.fill("#ott-field", "San Francisco");
    await page.locator("[data-abnb-search]").click();
    await page.locator("[data-abnb-listing]").first().click();
    await page.locator("[data-abnb-book]").click();
    await expect
      .poll(async () => page.evaluate(() => localStorage.getItem("itt11-airbnb")))
      .toMatch(/Mission loft|requested/);

    await page.goto("/years/2011/sites/airbnb/listing.html");
    await page.waitForTimeout(400);
    await expect(page.locator("[data-abnb-listing-title]")).toContainText(/Mission loft|San Francisco/i);
    await expect(page.locator("[data-abnb-requested]")).toContainText(/request/i);
    await page.reload();
    await page.waitForTimeout(300);
    await expect(page.locator("[data-abnb-requested]")).toContainText(/request/i);
    await page.goto("/years/2011/sites/airbnb/request.html");
    await expect(page.locator("[data-abnb-request-recap]")).toContainText(/Requested/i);
  });
});
