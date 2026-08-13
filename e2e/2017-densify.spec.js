// @ts-check
const { test, expect } = require("@playwright/test");

test.describe("2017 densify", () => {
  test("home trail tiles + next-step journeys", async ({ page }) => {
    await page.goto("/years/2017/pages/home.html");
    await expect(page.locator(".itt17-apps a").first()).toBeVisible();
    await expect(page.locator("[data-itt-journeys] ol li")).toHaveCount(6);
  });

  test("Face ID complete reveals next-flow to Fortnite", async ({ page }) => {
    await page.goto("/years/2017/sites/iphone/x.html");
    await page.evaluate(() => localStorage.removeItem("itt17-faceid"));
    await page.reload();
    await expect(page.locator("[data-next-flow]")).toBeHidden();
    await page.locator("[data-faceid-no-home]").check();
    await page.locator("[data-faceid-not-touch]").check();
    await page.locator("[data-faceid-not-xs]").check();
    await page.locator("[data-faceid-save]").click();
    await expect(page.locator("[data-next-flow]")).toBeVisible();
    await expect(page.locator("[data-next-flow] a[href*='fortnite']")).toBeVisible();
  });

  test("About scale is Live Stats +69%", async ({ page }) => {
    await page.goto("/years/2017/pages/about.html");
    await expect(page.locator("body")).toContainText("1,766,926,408");
    await expect(page.locator("body")).toContainText(/\+69%/);
    await expect(page.locator("body")).toContainText(/ITU/i);
  });

  test("home P1 chips include Switch or Yahoo 3B or Nitro", async ({ page }) => {
    await page.goto("/years/2017/pages/home.html");
    const text = await page.locator("body").innerText();
    expect(text).toMatch(/Nintendo Switch|Yahoo 3 billion|Discord Nitro/i);
    await expect(page.locator("#ott-guided-2017 ol li")).toHaveCount(6);
  });

  test("one-thing is Face ID not Fortnite or Netflix", async ({ page }) => {
    await page.goto("/years/2017/pages/home.html");
    await expect(page.locator('[data-ott-one-thing="2017"]')).toHaveAttribute("href", /iphone\/x/);
    await expect(page.locator('[data-ott-one-thing="2017"]')).not.toHaveAttribute("href", /fortnite/);
    await expect(page.locator('[data-ott-one-thing="2017"]')).not.toHaveAttribute("href", /netflix/);
  });

  test("P0 rooms load", async ({ page }) => {
    for (const p of [
      "/years/2017/sites/iphone/x.html",
      "/years/2017/sites/fortnite/index.html",
      "/years/2017/sites/twitter/280.html",
      "/years/2017/sites/wannacry/index.html",
      "/years/2017/sites/vine/gone.html",
      "/years/2017/sites/teams/index.html",
      "/years/2017/sites/equifax/index.html",
      "/years/2017/sites/windows10/index.html",
      "/years/2017/sites/chrome/index.html",
      "/years/2017/sites/playable/game.html",
    ]) {
      const res = await page.goto(p);
      expect(res && res.ok(), p).toBeTruthy();
    }
  });

  test("P1 densify rooms load", async ({ page }) => {
    for (const p of [
      "/years/2017/sites/switch/index.html",
      "/years/2017/sites/bitcoin/index.html",
      "/years/2017/sites/yahoo-3b/index.html",
      "/years/2017/sites/netneutrality/index.html",
      "/years/2017/sites/musically/index.html",
      "/years/2017/sites/snapchat/redesign.html",
      "/years/2017/sites/discord/nitro.html",
      "/years/2017/sites/facebook/2b.html",
    ]) {
      const res = await page.goto(p);
      expect(res && res.ok(), p).toBeTruthy();
      await expect(page.locator("body")).not.toBeEmpty();
    }
  });

  test("guided stays 6; residual pack after guided", async ({ page }) => {
    await page.goto("/years/2017/pages/home.html");
    await expect(page.locator("#ott-guided-2017 ol li")).toHaveCount(6);
    const order = await page.evaluate(() => {
      const guided = document.getElementById("ott-guided-2017");
      const residual = document.querySelector(".itt-year-true-pack");
      if (!guided || !residual) return { ok: false };
      return {
        ok: true,
        guidedBefore: !!(guided.compareDocumentPosition(residual) & Node.DOCUMENT_POSITION_FOLLOWING),
      };
    });
    expect(order.ok).toBe(true);
    expect(order.guidedBefore).toBe(true);
  });
});
