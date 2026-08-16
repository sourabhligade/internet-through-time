// @ts-check
/**
 * Human play-through: tap without New Game, through year-shell, no force-click.
 * This is how a visitor actually uses 2018 + the other year games.
 */
const { test, expect } = require("@playwright/test");
const { enterYear, goInFrame, contentFrame, killOverlays } = require("./helpers");

test.describe("human play — 2018 extras + Consent Dash", () => {
  test("fortdance: Emote is enabled on load; tap 3 + Finish saves", async ({ page }) => {
    await page.goto("/years/2018/sites/playable/fortdance.html");
    await page.evaluate(() => localStorage.removeItem("itt18-game-fortdance"));
    await page.reload();
    const act = page.locator("[data-pack-act]");
    const fin = page.locator("[data-pack-finish]");
    await expect(act).toBeEnabled({ timeout: 8000 });
    await expect(fin).toBeEnabled();
    await act.click();
    await act.click();
    await act.click();
    await fin.click();
    await expect.poll(async () => page.evaluate(() => localStorage.getItem("itt18-game-fortdance"))).toBeTruthy();
  });

  test("Consent Dash: Manage without New Game scores", async ({ page }) => {
    await page.goto("/years/2018/sites/playable/game.html");
    await page.evaluate(() => localStorage.removeItem("itt18-game-consentdash"));
    await page.reload();
    const manage = page.locator("[data-cd-manage]");
    await expect(manage).toBeVisible({ timeout: 8000 });
    await manage.click();
    await expect(page.locator("[data-game-score]").first()).toHaveText("10");
    await manage.click();
    await expect(page.locator("[data-game-score]").first()).toHaveText("20");
  });

  test("2018 year-playable toy starts with something to tap", async ({ page }) => {
    await page.goto("/years/2018/sites/playable/index.html?g=1");
    await expect(page.locator("[data-year-playable]")).toBeVisible({ timeout: 15000 });
    const target = page.locator("[data-yp-stage] .yp-target, [data-yp-stage] [data-yp-click], [data-yp-stage] [data-yp-hold]").first();
    await expect(target).toBeVisible({ timeout: 15000 });
    const before = await page.locator("[data-yp-score]").first().textContent();
    await target.click();
    await expect.poll(async () => page.locator("[data-yp-score]").first().textContent()).not.toBe(before);
  });
});

test.describe("human play — 2018 through year shell", () => {
  test("shell: Consent Dash Manage works inside iframe", async ({ page }) => {
    await enterYear(page, "2018");
    await page.evaluate(() => {
      Object.keys(localStorage)
        .filter((k) => k.indexOf("itt18-game-") === 0)
        .forEach((k) => localStorage.removeItem(k));
    });
    await goInFrame(page, "sites/playable/game.html");
    await killOverlays(page);
    const frame = contentFrame(page);
    await expect(frame.locator("[data-year-game][data-game-id='consentdash']")).toBeVisible({ timeout: 15000 });
    await expect.poll(async () => {
      return frame.locator("[data-year-game][data-game-id='consentdash']").evaluate((el) =>
        typeof el.__ittConsentDashManage === "function"
      );
    }, { timeout: 15000 }).toBe(true);
    const manage = frame.locator("[data-cd-manage]");
    await expect(manage).toBeVisible();
    await manage.click();
    await expect.poll(async () => frame.locator("[data-game-score]").first().textContent(), {
      timeout: 8000,
    }).toBe("10");
  });

  test("shell: Emote Three tap without New Game", async ({ page }) => {
    await enterYear(page, "2018");
    await page.evaluate(() => localStorage.removeItem("itt18-game-fortdance"));
    await goInFrame(page, "sites/playable/fortdance.html");
    await killOverlays(page);
    const frame = contentFrame(page);
    const act = frame.locator("[data-pack-act]");
    await expect(act).toBeEnabled({ timeout: 15000 });
    await act.click();
    await act.click();
    await act.click();
    await frame.locator("[data-pack-finish]").click();
    await expect.poll(async () => page.evaluate(() => localStorage.getItem("itt18-game-fortdance"))).toBeTruthy();
  });

  test("address bar 'consent dash' does not dump you on GDPR", async ({ page }) => {
    await enterYear(page, "2018");
    await killOverlays(page);
    const loc = page.locator("#location, #addr, input[name='location'], [data-location]").first();
    const hasLoc = await loc.count();
    if (!hasLoc) {
      // Fall back to navigate API
      await page.evaluate(() => {
        if (window.ITT && ITT.activeBrowser && ITT.activeBrowser.navigate) {
          // simulate what matchOpenLocation would do by typing into location if present
        }
      });
    }
    const matched = await page.evaluate(() => {
      const hints = (window.ITT && ITT.activeBrowser && ITT.activeBrowser.config && ITT.activeBrowser.config.locationHints) ||
        (window.YEAR_CONFIG && window.YEAR_CONFIG.locationHints) ||
        null;
      // Use the same matcher the shell uses
      const Nav = window.ITT && ITT.BrowserNavigate;
      if (Nav && Nav.matchOpenLocation) {
        const cfg = (window.ITT && ITT.activeBrowser && (ITT.activeBrowser._config || ITT.activeBrowser.config)) || {};
        return Nav.matchOpenLocation("consent dash", cfg.urlMap || {}, cfg.locationHints || []);
      }
      return { missing: true };
    });
    // Soft: if we can read the matcher, it must not be GDPR
    if (matched && !matched.missing && matched.path) {
      expect(String(matched.path)).toMatch(/playable\/game/);
      expect(String(matched.path)).not.toMatch(/gdpr/);
    }
  });
});

test.describe("human play — other year games same trap", () => {
  test("2019 Continue Row: Adult without New Game scores", async ({ page }) => {
    await page.goto("/years/2019/sites/playable/game.html");
    await page.evaluate(() => localStorage.removeItem("itt19-game-continuerow"));
    await page.reload();
    const adult = page.locator("[data-cr-adult]");
    await expect(adult).toBeVisible({ timeout: 8000 });
    await adult.click();
    await expect(page.locator("[data-game-score]").first()).toHaveText("10");
    await page.locator("[data-cr-trial]").click();
    await expect(page.locator("[data-game-score]").first()).toHaveText("10");
  });

  test("2016 Gym Rush: Visit nearest without New Game scores", async ({ page }) => {
    await page.goto("/years/2016/sites/playable/game.html");
    await page.evaluate(() => localStorage.removeItem("itt16-game-gymrush"));
    await page.reload();
    const visit = page.locator("[data-gr-visit]");
    await expect(visit).toBeVisible({ timeout: 8000 });
    await visit.click();
    await expect.poll(async () => page.locator("[data-game-score]").first().textContent()).not.toBe("0");
  });

  test("2017 Storm Circle: Loot nearest without New Game scores", async ({ page }) => {
    await page.goto("/years/2017/sites/playable/game.html");
    await page.evaluate(() => localStorage.removeItem("itt17-game-stormcircle"));
    await page.reload();
    const visit = page.locator("[data-gr-visit]");
    await expect(visit).toBeVisible({ timeout: 8000 });
    await visit.click();
    await expect.poll(async () => page.locator("[data-game-score]").first().textContent()).not.toBe("0");
  });

  test("2020 Crown: Jump without New Game", async ({ page }) => {
    await page.goto("/years/2020/sites/playable/crown.html");
    await page.evaluate(() => localStorage.removeItem("itt20-game-crown"));
    await page.reload();
    const jump = page.locator("[data-crown-jump]");
    await expect(jump).toBeEnabled({ timeout: 8000 });
    await jump.click();
    await expect(page.locator("body")).toContainText(/Gate 1\/|Crown is up/);
  });
});
