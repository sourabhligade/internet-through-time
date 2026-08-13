// @ts-check
const { test, expect } = require("@playwright/test");
const { enterYear } = require("./helpers");

test.describe("2018 flow-map + home links exist", () => {
  test("flow-map hrefs 200", async ({ page }) => {
    const { ITT } = await page.evaluate(async () => {
      await new Promise((res, rej) => {
        const s = document.createElement("script");
        s.src = "/js/config/flow-maps.js";
        s.onload = res;
        s.onerror = rej;
        document.head.appendChild(s);
      });
      return { ITT: window.ITT };
    }).catch(() => ({ ITT: null }));
    await page.goto("/years/2018/pages/map.html");
    await expect(page.locator("[data-itt-flow-map]")).toBeVisible({ timeout: 15000 });
    const hrefs = await page.locator("[data-itt-flow-map] a[href]").evaluateAll((els) =>
      els.map((a) => a.getAttribute("href") || "")
    );
    const rels = hrefs.filter((h) => h && !h.startsWith("http") && !h.startsWith("#"));
    expect(rels.length).toBeGreaterThan(5);
    for (const rel of rels.slice(0, 40)) {
      const clean = rel.replace(/^\.\.\//, "").replace(/^\//, "");
      const path = clean.startsWith("years/") ? `/${clean}` : `/years/2018/${clean.replace(/^pages\//, "pages/").replace(/^sites\//, "sites/")}`;
      /* resolve relative from map.html (pages/) */
      const fromPages = rel.startsWith("../") ? `/years/2018/${rel.replace(/^\.\.\//, "")}` : `/years/2018/pages/${rel}`;
      const res = await page.goto(fromPages);
      expect(res && res.ok(), fromPages).toBeTruthy();
      await expect(page.locator("html")).toHaveAttribute("data-itt-year", "2018");
    }
  });

  test("guided 6 hrefs exist", async ({ page }) => {
    await page.goto("/years/2018/pages/home.html");
    await expect(page.locator("#ott-guided-2018 ol li")).toHaveCount(6);
    const hrefs = await page.locator("#ott-guided-2018 a[href]").evaluateAll((els) =>
      els.map((a) => a.getAttribute("href"))
    );
    for (const h of hrefs) {
      if (!h) continue;
      const res = await page.goto(`/years/2018/pages/${h}`.replace("/pages/../", "/"));
      expect(res && res.ok(), h).toBeTruthy();
      await page.goto("/years/2018/pages/home.html");
    }
  });

  test("shell dirbar GDPR live", async ({ page }) => {
    await enterYear(page, "2018");
    await expect(page.locator("#dirbar .dir-btn", { hasText: "GDPR" }).first()).toBeVisible();
  });
});
