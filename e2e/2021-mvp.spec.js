// @ts-check
const { test, expect } = require("@playwright/test");

test.describe("2021 MVP", () => {
  test("hub card opens 2021 shell", async ({ page }) => {
    await page.goto("/");
    await page.locator('a.year-card.available[href*="years/2021"]').click();
    await expect(page.locator("body")).toHaveAttribute("data-itt-year", "2021");
    await expect(page.locator("#content")).toBeVisible();
  });

  test("home lists P0 thesis", async ({ page }) => {
    await page.goto("/years/2021/pages/home.html");
    for (const t of ["Ask App Not to Track", "Allow never writes", "Signal", "Copilot"]) {
      await expect(page.locator("body")).toContainText(t);
    }
    await expect(page.locator("#ott-guided-2021 ol li")).toHaveCount(6);
  });

  test("about bans ChatGPT dest and invented ILS", async ({ page }) => {
    await page.goto("/years/2021/pages/about.html");
    await expect(page.locator("body")).toContainText(/ChatGPT/i);
    await expect(page.locator("body")).toContainText(/4\.9/i);
    await expect(page.locator("body")).toContainText(/table ends 2018/i);
    await expect(page.locator("body")).not.toContainText(/1,197,982,359/);
  });

  test("ATT Ask dest-true writes itt21-att · Allow never writes", async ({ page }) => {
    await page.goto("/years/2021/sites/att/index.html");
    await page.evaluate(() => {
      try {
        localStorage.removeItem("itt21-att");
      } catch (e) {
        /* */
      }
    });
    await page.reload();
    const trap = page.locator("[data-official-trap]").first();
    await trap.click();
    expect(await page.evaluate(() => localStorage.getItem("itt21-att"))).toBeFalsy();
    const verb = page.locator("[data-official-verb-host] [data-official-verb]");
    const reqs = page.locator("[data-official-verb-host] [data-official-req]");
    const n = await reqs.count();
    for (let i = 0; i < n; i++) await reqs.nth(i).check();
    await verb.click();
    await expect.poll(() => page.evaluate(() => localStorage.getItem("itt21-att")), { timeout: 8000 }).toBeTruthy();
    const raw = await page.evaluate(() => localStorage.getItem("itt21-att"));
    const blob = JSON.parse(raw || "null");
    expect(blob && blob.official).toBe(true);
  });
});
