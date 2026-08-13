// @ts-check
/** 2005 Pandora station + thumbs persist */
const { test, expect } = require("@playwright/test");

test.describe("2005 Pandora real machine", () => {
  test("empty seed blocked; create + thumb writes station", async ({ page }) => {
    await page.goto("/years/2005/sites/pandora/index.html");
    await page.evaluate(() => {
      Object.keys(localStorage)
        .filter((k) => k.startsWith("itt05-pandora"))
        .forEach((k) => localStorage.removeItem(k));
    });
    await page.reload();
    await page.waitForTimeout(500);

    await page.locator("form[data-pd-create] button[type='submit']").click();
    await expect
      .poll(async () => page.evaluate(() => localStorage.getItem("itt05-pandora-station")))
      .toBeNull();

    await page.fill("#ott-field", "Radiohead residual");
    await page.locator("form[data-pd-create] button[type='submit']").click();
    await expect
      .poll(async () => {
        const raw = await page.evaluate(() => localStorage.getItem("itt05-pandora-station"));
        return raw && raw.includes("Radiohead");
      })
      .toBeTruthy();

    await page.locator("[data-pd-up]").click();
    await expect
      .poll(async () => {
        const raw = await page.evaluate(() => localStorage.getItem("itt05-pandora-station"));
        return raw && raw.includes('"thumbs"');
      })
      .toBeTruthy();

    await page.reload();
    await page.waitForTimeout(400);
    await expect(page.locator("[data-pd-now]")).toContainText(/Station: Radiohead|Radiohead residual/i);
  });
});
