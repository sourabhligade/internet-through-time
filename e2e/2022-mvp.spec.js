// @ts-check
const { test, expect } = require("@playwright/test");

test.describe("2022 MVP", () => {
  test("hub card opens 2022 shell", async ({ page }) => {
    await page.goto("/");
    await page.locator('a.year-card.available[href*="years/2022"]').click();
    await expect(page.locator("body")).toHaveAttribute("data-itt-year", "2022");
    await expect(page.locator("#content")).toBeVisible();
  });

  test("home lists P0 thesis · guided 6 · no 2021 clone dests", async ({ page }) => {
    await page.goto("/years/2022/pages/home.html");
    for (const t of ["ChatGPT Send", "Plus never writes", "Twitter", "Wordle"]) {
      await expect(page.locator("body")).toContainText(t);
    }
    await expect(page.locator("#ott-guided-2022 ol li")).toHaveCount(6);
    const hrefs = await page.locator('a[href*="sites/"]').evaluateAll((els) =>
      els.map((a) => a.getAttribute("href") || "")
    );
    expect(hrefs.some((h) => /\/att\//.test(h))).toBe(false);
    expect(hrefs.some((h) => /\/signal\//.test(h))).toBe(false);
    expect(hrefs.some((h) => /\/copilot\//.test(h) && !/copilotga/.test(h))).toBe(false);
  });

  test("about bans Plus dest and invented ILS", async ({ page }) => {
    await page.goto("/years/2022/pages/about.html");
    await expect(page.locator("body")).toContainText(/Plus/i);
    await expect(page.locator("body")).toContainText(/5\.3/i);
    await expect(page.locator("body")).toContainText(/table ends 2018/i);
    await expect(page.locator("body")).not.toContainText(/1,167,715,133/);
  });

  test("ChatGPT Send dest-true writes itt22-chatgpt · Plus never writes", async ({ page }) => {
    await page.goto("/years/2022/sites/chatgpt/index.html");
    await page.evaluate(() => {
      try {
        localStorage.removeItem("itt22-chatgpt");
        localStorage.removeItem("itt21-att");
      } catch (e) {
        /* */
      }
    });
    await page.reload();
    const trap = page.locator("[data-official-trap]").first();
    await trap.click();
    expect(await page.evaluate(() => localStorage.getItem("itt22-chatgpt"))).toBeFalsy();
    const verb = page.locator("[data-official-verb-host] [data-official-verb]");
    await page.locator("[data-official-verb-host] [data-official-need]").fill("explain this");
    const reqs = page.locator("[data-official-verb-host] [data-official-req]");
    const n = await reqs.count();
    for (let i = 0; i < n; i++) await reqs.nth(i).check();
    await verb.click();
    await expect.poll(() => page.evaluate(() => localStorage.getItem("itt22-chatgpt")), { timeout: 8000 }).toBeTruthy();
    const raw = await page.evaluate(() => localStorage.getItem("itt22-chatgpt"));
    const blob = JSON.parse(raw || "null");
    expect(blob && blob.official).toBe(true);
    expect(await page.evaluate(() => localStorage.getItem("itt21-att"))).toBeFalsy();
  });
});
