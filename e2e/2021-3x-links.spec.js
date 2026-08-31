// @ts-check
/**
 * 2021 3× leftover + 3×-links — own spec.
 * Do not change e2e/year-3x3.spec.js or e2e/year-more-3x.spec.js (those stay exactly 3 for 2010–2019).
 */
const { test, expect } = require("@playwright/test");


function slugOf(href) {
  const m = String(href || "").match(/sites\/([^/]+)/);
  return m ? m[1] : "";
}

test.describe("2021 3× leftover strips + links", () => {
  test("home three strips 9+9+9 unique · no ATT · guided 6 · star ATT", async ({ page }) => {
    await page.goto("/years/2021/pages/home.html");
    await expect(page.locator("#ott-guided-2021 ol li")).toHaveCount(6);
    const star = page.locator('[data-ott-one-thing="2021"]');
    await expect(star).toBeVisible();
    await expect(star).toHaveAttribute("href", /att/);

    const pop3x = page.locator('nav[data-itt-pop3x="2021"]');
    const more = page.locator('nav[data-itt-pop-more="2021"]');
    const trio = page.locator('nav[data-itt-pop-3x3="2021"]');
    await expect(pop3x).toBeVisible();
    await expect(more).toBeVisible();
    await expect(trio).toBeVisible();
    await expect(pop3x.locator("a[href*='sites/']")).toHaveCount(9);
    await expect(more.locator("a[href*='sites/']")).toHaveCount(9);
    await expect(trio.locator("a[href*='sites/']")).toHaveCount(9);

    const a = await pop3x.locator("a[href*='sites/']").evaluateAll((els) =>
      els.map((el) => el.getAttribute("href") || "")
    );
    const b = await more.locator("a[href*='sites/']").evaluateAll((els) =>
      els.map((el) => el.getAttribute("href") || "")
    );
    const c = await trio.locator("a[href*='sites/']").evaluateAll((els) =>
      els.map((el) => el.getAttribute("href") || "")
    );
    const sa = a.map(slugOf);
    const sb = b.map(slugOf);
    const sc = c.map(slugOf);
    expect(new Set(sa).size).toBe(9);
    expect(new Set(sb).size).toBe(9);
    expect(new Set(sc).size).toBe(9);
    for (const s of sa) {
      expect(sb).not.toContain(s);
      expect(sc).not.toContain(s);
      expect(s).not.toBe("att");
    }
    for (const s of sb) {
      expect(sc).not.toContain(s);
      expect(s).not.toBe("att");
    }
    for (const s of sc) expect(s).not.toBe("att");

    const samples = [a[0], a[4], a[8], b[0], b[4], b[8], c[0], c[4], c[8]];
    for (const href of samples) {
      const url = new URL(href, "http://x/years/2021/pages/home.html").pathname;
      const res = await page.goto(url);
      expect(res && res.ok(), url).toBeTruthy();
      await expect(page.locator("html")).toHaveAttribute("data-itt-year", "2021");
    }
  });

  test("ATT dest sample also-nav ≥ 36 relative hrefs · first mid last 200", async ({ page }) => {
    await page.goto("/years/2021/sites/att/index.html");
    const box = page.locator("[data-itt-3x-also], [data-itt-3x-links]").first();
    await expect(box).toBeVisible();
    const hrefs = await box.locator("a[href]").evaluateAll((els) =>
      els.map((a) => a.getAttribute("href") || "").filter(Boolean)
    );
    expect(hrefs.length, "2021 also-nav").toBeGreaterThanOrEqual(36);
    expect(hrefs.some((h) => h.startsWith("/years/"))).toBeFalsy();
    const samples = [hrefs[0], hrefs[Math.floor(hrefs.length / 2)], hrefs[hrefs.length - 1]];
    for (const href of samples) {
      const url = new URL(href, "http://x/years/2021/sites/att/index.html").pathname;
      const res = await page.goto(url);
      expect(res && res.ok(), url).toBeTruthy();
      await expect(page.locator("html")).toHaveAttribute("data-itt-year", "2021");
    }
  });
});
