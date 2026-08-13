// @ts-check
const { test, expect } = require("@playwright/test");

test.describe("2020 flow-map + home links exist", () => {
  test("flow-map hrefs 200", async ({ page }) => {
    await page.goto("/years/2020/pages/map.html");
    await expect(page.locator("[data-itt-flow-map]")).toBeVisible({ timeout: 15000 });
    const hrefs = await page.locator("[data-itt-flow-map] a[href]").evaluateAll((els) =>
      els.map((a) => a.getAttribute("href") || "")
    );
    const rels = hrefs.filter((h) => h && !h.startsWith("http") && !h.startsWith("#"));
    expect(rels.length).toBeGreaterThan(5);
    for (const rel of rels.slice(0, 40)) {
      const fromPages = rel.startsWith("../")
        ? `/years/2020/${rel.replace(/^\.\.\//, "")}`
        : `/years/2020/pages/${rel}`;
      const res = await page.goto(fromPages);
      expect(res && res.ok(), fromPages).toBeTruthy();
      await expect(page.locator("html")).toHaveAttribute("data-itt-year", "2020");
    }
  });

  test("guided 6 hrefs exist", async ({ page }) => {
    await page.goto("/years/2020/pages/home.html");
    await expect(page.locator("#ott-guided-2020 ol li")).toHaveCount(6);
    const hrefs = await page.locator("#ott-guided-2020 a[href]").evaluateAll((els) =>
      els.map((a) => a.getAttribute("href"))
    );
    for (const href of hrefs) {
      if (!href) continue;
      const url = new URL(href, "http://x/years/2020/pages/home.html").pathname;
      const res = await page.goto(url);
      expect(res && res.ok(), url).toBeTruthy();
    }
  });
});
