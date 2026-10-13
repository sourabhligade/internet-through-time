// @ts-check
/**
 * 2021/2022 iframe dests keep sticky wayfind. Dest-as-tab still has no wayfind in the DOM.
 */
const { test, expect } = require("@playwright/test");
const { enterYear, goInFrame, contentFrame } = require("./helpers");

const YEARS = [
  { year: "2021", dest: "sites/att/index.html" },
  { year: "2022", dest: "sites/chatgpt/index.html" },
];

test.describe("2021/2022 dest chrome", () => {
  for (const d of YEARS) {
    test(`${d.year} dest-as-tab has no wayfind in the DOM`, async ({ page }) => {
      await page.goto(`/years/${d.year}/${d.dest}`);
      await page.waitForFunction(
        (y) => document.documentElement.getAttribute("data-itt-immersion-booted") === y,
        d.year,
        { timeout: 15000 }
      );
      await expect(page.locator("html")).toHaveClass(/itt-dest-top/);
      await expect(page.locator("#itt-wayfind")).toHaveCount(0);
      await expect(page.locator("#itt-exhibit-foot")).toHaveCount(1);
    });

    test(`${d.year} iframe dest keeps visible wayfind`, async ({ page }) => {
      await enterYear(page, d.year);
      await goInFrame(page, d.dest);
      const frame = contentFrame(page);
      await expect(frame.locator("html")).toHaveAttribute("data-itt-immersion-booted", d.year);
      await expect(frame.locator("html")).not.toHaveClass(/itt-dest-top/);
      const way = frame.locator("#itt-wayfind");
      await expect(way).toHaveCount(1);
      const display = await way.evaluate((el) => getComputedStyle(el).display);
      expect(display).not.toBe("none");
    });
  }
});
