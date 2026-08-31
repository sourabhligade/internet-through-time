// @ts-check
const { test, expect } = require("@playwright/test");


async function clearKeys(page, keys) {
  await page.evaluate((ks) => {
    ks.forEach((k) => {
      try {
        localStorage.removeItem(k);
      } catch (e) { /* */ }
    });
  }, keys);
}

test.describe("2015 leftover trail", () => {
  test("trail #1 is Periscope and Next Watch is live 200", async ({ page, request }) => {
    await page.goto("/years/2015/pages/map.html");
    const ten = page.locator("[data-itt-ten-flows] li");
    await expect(ten).toHaveCount(10, { timeout: 20000 });
    await expect(ten.first()).toContainText(/Periscope/i);
    const href = await page.locator("[data-itt-ten-flows] a").first().getAttribute("href");
    expect(href).toMatch(/periscope/i);
    const url = new URL(href || "", "http://127.0.0.1:8080/years/2015/pages/map.html").href;
    expect((await request.get(url)).status()).toBe(200);
  });

  test("Periscope titled live reveals Watch next", async ({ page }) => {
    await page.goto("/years/2015/sites/periscope/index.html");
    await clearKeys(page, ["itt15-periscope"]);
    await page.reload();
    await page.fill("[data-peri-title]", "museum rooftop");
    await page.locator("[data-peri-live]").click();
    await expect(page.locator("[data-next-flow] a").first()).toBeVisible();
    await expect(page.locator("[data-next-flow] a").first()).toHaveAttribute("href", /watch/i);
  });

  test("Photos backup reveals Win10 next", async ({ page }) => {
    await page.goto("/years/2015/sites/googlephotos/index.html");
    await clearKeys(page, ["itt15-googlephotos"]);
    await page.reload();
    await page.locator('[data-photo-pick="beach"]').click();
    await page.locator("[data-gp-backup]").click();
    await expect(page.locator("[data-next-flow] a").first()).toBeVisible();
    await expect(page.locator("[data-next-flow] a").first()).toHaveAttribute("href", /windows10/i);
  });
});
