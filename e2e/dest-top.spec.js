// @ts-check
/**
 * Dest-as-tab footer (GitHub #16): one exhibit-foot under the trail,
 * no sticky wayfind, no duplicate Starting Point / Year menu.
 */
const { test, expect } = require("@playwright/test");
const { enterYear, goInFrame, contentFrame } = require("./helpers");

const TABS = [
  { year: "1995", path: "/years/1995/sites/amazon/ssl-checkout.html" },
  { year: "1997", path: "/years/1997/sites/amazonipo/index.html" },
  { year: "2022", path: "/years/2022/sites/chatgpt/index.html" },
];

test.describe("dest-as-tab footer", () => {
  for (const d of TABS) {
    for (const vp of [
      { width: 1280, height: 800, name: "desktop" },
      { width: 390, height: 844, name: "phone" },
    ]) {
    test(`${d.year} dest tab ${vp.name} has one exhibit-foot and no wayfind`, async ({ page }) => {
      await page.setViewportSize({ width: vp.width, height: vp.height });
      await page.goto(d.path);
      await page.waitForFunction(
        (y) => document.documentElement.getAttribute("data-itt-immersion-booted") === y,
        d.year,
        { timeout: 15000 }
      );
      await expect(page.locator("html")).toHaveClass(/itt-dest-top/);
      await expect(page.locator("#itt-exhibit-foot")).toHaveCount(1);
      await expect(page.locator("#itt-wayfind")).toHaveCount(0);
      await expect(page.locator("#itt-exhibit-foot a.itt-foot-home")).toHaveCount(1);
      await expect(page.locator("#itt-year-menu-link")).toHaveCount(1);
      await expect(page.getByRole("link", { name: /Starting Point/i })).toHaveCount(1);
      await expect(page.getByRole("link", { name: /Year menu/i })).toHaveCount(1);
      const layout = await page.evaluate(() => {
        const foot = document.getElementById("itt-exhibit-foot");
        const trail = document.querySelector("[data-itt-flow-trail]");
        const html = getComputedStyle(document.documentElement);
        const body = getComputedStyle(document.body);
        const footTop = foot ? foot.getBoundingClientRect().top : 0;
        const trailBottom = trail ? trail.getBoundingClientRect().bottom : footTop;
        return {
          htmlMin: html.minHeight,
          bodyMin: body.minHeight,
          footPos: foot ? getComputedStyle(foot).position : "",
          footAfterTrail: !trail || footTop + 1 >= trailBottom,
        };
      });
      expect(layout.htmlMin).toBe("0px");
      expect(layout.bodyMin).toBe("0px");
      expect(layout.footPos === "static" || layout.footPos === "relative").toBeTruthy();
      expect(layout.footAfterTrail).toBeTruthy();
    });
    }
  }

  test("1995 dest tab Year menu and Starting Point go to the hub and the year", async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 800 });
    await page.goto("/years/1995/sites/amazon/ssl-checkout.html");
    await expect(page.locator("#itt-year-menu-link")).toBeVisible({ timeout: 15000 });
    await page.locator("#itt-year-menu-link").click();
    await expect(page).toHaveURL(/\/(index\.html)?$/);
    await expect(page.locator("a.year-card.available")).toHaveCount(24);

    await page.goto("/years/1995/sites/amazon/ssl-checkout.html");
    await expect(page.locator("#itt-exhibit-foot a.itt-foot-home")).toBeVisible({ timeout: 15000 });
    await page.locator("#itt-exhibit-foot a.itt-foot-home").click();
    await expect(page).toHaveURL(/years\/1995\/pages\/home\.html/);
  });

  test("2022 dest tab phone footer is visible and returns to the year", async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto("/years/2022/sites/chatgpt/index.html");
    const home = page.locator("#itt-exhibit-foot a.itt-foot-home");
    await expect(home).toBeVisible({ timeout: 15000 });
    await expect(page.locator("#itt-wayfind")).toHaveCount(0);
    await home.click();
    await expect(page).toHaveURL(/years\/2022\/pages\/home\.html/);
  });

  test("1995 dest in year iframe keeps sticky wayfind", async ({ page }) => {
    await enterYear(page, "1995");
    await goInFrame(page, "sites/amazon/ssl-checkout.html");
    const frame = contentFrame(page);
    await expect(frame.locator("html")).toHaveAttribute("data-itt-immersion-booted", "1995");
    await expect(frame.locator("#itt-wayfind")).toHaveCount(1);
    await expect(frame.locator("#itt-exhibit-foot")).toHaveCount(1);
    await expect(frame.locator("html")).not.toHaveClass(/itt-dest-top/);
  });

  test("hub first click 1995 opens Starting Point then star dest", async ({ page }) => {
    await page.goto("/");
    await page.locator('a.year-card.available[href*="years/1995"]').first().click();
    await page.locator("#skip-connect").click({ force: true, timeout: 3000 }).catch(() => {});
    const frame = page.frameLocator("iframe#content");
    await expect(frame.locator('[data-ott-one-thing="1995"]').first()).toBeVisible({ timeout: 20000 });
    await frame.locator('[data-ott-one-thing="1995"]').first().click();
    await expect
      .poll(async () => {
        return page.evaluate(() => {
          const f = document.getElementById("content");
          try {
            const p = f && f.contentWindow && f.contentWindow.location && f.contentWindow.location.pathname;
            return p || (f && f.getAttribute("src")) || "";
          } catch (e) {
            return (f && f.getAttribute("src")) || "";
          }
        });
      })
      .toMatch(/amazon\/ssl-checkout/);
  });
});
