// @ts-check
const { test, expect } = require("@playwright/test");
const { waitKey } = require("./helpers");

test.describe("2017 trail REAL", () => {
  test("Face ID complete next-flow includes Fortnite", async ({ page }) => {
    await page.goto("/years/2017/sites/iphone/x.html");
    await page.evaluate(() => localStorage.removeItem("itt17-faceid"));
    await page.reload();
    await page.locator("[data-faceid-no-home]").check();
    await page.locator("[data-faceid-not-touch]").check();
    await page.locator("[data-faceid-not-xs]").check();
    await page.locator("[data-faceid-save]").click();
    await expect(page.locator("[data-next-flow]")).toBeVisible();
    await expect(page.locator("[data-next-flow] a[href*='fortnite']")).toBeVisible();
    await page.locator("[data-next-flow] a[href*='fortnite']").click();
    await expect(page).toHaveURL(/fortnite/);
    await expect(page.locator("body")).toContainText(/Sep(?:tember)?\s*26/i);
  });

  test("Fortnite complete next-flow to Storm Circle", async ({ page }) => {
    await page.goto("/years/2017/sites/fortnite/index.html");
    await page.evaluate(() => localStorage.removeItem("itt17-fortnite"));
    await page.reload();
    await page.locator("[data-fn-date]").check();
    await page.locator("[data-fn-free]").check();
    await page.locator("[data-fn-no-art]").check();
    await page.locator("[data-fn-save]").click();
    await expect(page.locator("[data-next-flow] a[href*='game.html']")).toBeVisible();
    await page.locator("[data-next-flow] a[href*='game.html']").click();
    await expect(page).toHaveURL(/playable\/game/);
    await expect(page.locator("[data-game-id='stormcircle']")).toBeVisible();
  });

  test("Vine gone residual links musical.ly", async ({ page }) => {
    await page.goto("/years/2017/sites/vine/gone.html");
    await expect(page.locator("p a[href*='musically']").first()).toBeVisible();
    await page.locator("p a[href*='musically']").first().click();
    await expect(page).toHaveURL(/musically/);
    await expect(page.locator("body")).toContainText(/not TikTok/i);
  });

  test("Vine gone complete next-flow to musical.ly", async ({ page }) => {
    await page.goto("/years/2017/sites/vine/gone.html");
    await page.evaluate(() => localStorage.removeItem("itt17-vine-gone"));
    await page.reload();
    await page.locator("[data-vine-gone-date]").check();
    await page.locator("[data-vine-gone-not-2016]").check();
    await page.locator("[data-vine-gone-save]").click();
    await expect(page.locator("[data-next-flow] a[href*='musically']")).toBeVisible();
    await page.locator("[data-next-flow] a[href*='musically']").click();
    await expect(page).toHaveURL(/musically/);
    await expect(page.locator("body")).toContainText(/not TikTok/i);
  });

  test("residual chips lead to this year's gold, not home", async ({ page }) => {
    const rooms = [
      { path: "sites/instagram/stories.html", next: /iphone\/x|musically|twitter\/280/ },
      { path: "sites/airpods/index.html", next: /iphone\/x|ios11/ },
      { path: "sites/whatsapp/e2e.html", next: /teams\/|iphone\/x/ },
      { path: "sites/iphone/index.html", next: /x\.html|iphone\/x/ },
      { path: "sites/facebook/index.html", next: /facebook\/2b|iphone\/x/ },
      { path: "sites/twitter/index.html", next: /280\.html|twitter\/280/ },
      { path: "sites/chrome/about.html", next: /chrome\/index|iphone\/x|flash\/eol/ },
    ];
    for (const room of rooms) {
      await page.goto("/years/2017/" + room.path);
      const next = page.locator("[data-next-flow]");
      await expect(next, room.path).toBeVisible();
      const hrefs = await next.locator("a[href]").evaluateAll((els) =>
        els.map((a) => a.getAttribute("href") || "")
      );
      expect(hrefs.some((h) => room.next.test(h)), room.path + " " + hrefs.join(",")).toBeTruthy();
      expect(hrefs.every((h) => !/pages\/home\.html$/.test(h)), room.path + " dumped to home").toBeTruthy();
      const res = await page.goto(new URL(hrefs[0], "http://x/years/2017/" + room.path).pathname);
      expect(res && res.ok(), hrefs[0]).toBeTruthy();
    }
  });

  test("?trail=2017-start writes night state", async ({ page }) => {
    await page.goto("/");
    await page.evaluate(() => {
      localStorage.removeItem("itt-first-night");
    });
    await page.goto("/years/2017/?trail=2017-start&room=pages%2Fabout.html");
    await page.locator("#skip-connect").click({ timeout: 5000 }).catch(() => {});
    const night = await waitKey(page, "itt-first-night");
    expect(night).toMatch(/2017-start/);
  });
});
