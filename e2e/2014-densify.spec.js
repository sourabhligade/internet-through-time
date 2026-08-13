// @ts-check
const { test, expect } = require("@playwright/test");

test.describe("2014 densify", () => {
  test("one-thing is WhatsApp", async ({ page }) => {
    await page.goto("/years/2014/pages/home.html");
    await expect(page.locator('[data-ott-one-thing="2014"]')).toHaveAttribute("href", /whatsapp/);
  });

  test("P1 rooms load", async ({ page }) => {
    for (const p of [
      "/years/2014/sites/twitch/index.html",
      "/years/2014/sites/oculus/index.html",
      "/years/2014/sites/alibaba/index.html",
      "/years/2014/sites/echo/index.html",
      "/years/2014/sites/material/index.html",
      "/years/2014/sites/serial/index.html",
      "/years/2014/sites/cardboard/index.html",
      "/years/2014/sites/secret/index.html",
      "/years/2014/sites/yikyak/index.html",
      "/years/2014/sites/ello/index.html",
      "/years/2014/sites/musically/index.html",
    ]) {
      const res = await page.goto(p);
      expect(res && res.ok()).toBeTruthy();
      await expect(page.locator("body")).not.toBeEmpty();
    }
  });

  test("home residual pack is after guided", async ({ page }) => {
    await page.goto("/years/2014/pages/home.html");
    const first = await page.evaluate(() => {
      const el = document.querySelector("[data-ott-one-thing], .ott-guided, .itt-year-true-pack");
      if (!el) return "missing";
      if (el.hasAttribute("data-ott-one-thing") || el.querySelector("[data-ott-one-thing]")) return "one";
      if (el.classList.contains("ott-guided")) return "guided";
      return "pack";
    });
    expect(first).not.toBe("pack");
  });
});
