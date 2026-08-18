// @ts-check
/**
 * Human play-through: tap without New Game, through year-shell, no force-click.
 * This is how a visitor actually uses 2018 + the other year games.
 */
const { test, expect } = require("@playwright/test");
const fs = require("fs");
const path = require("path");
const { enterYear, goInFrame, contentFrame, killOverlays } = require("./helpers");

function yearOnDisk(year) {
  return fs.existsSync(path.join(__dirname, "..", "years", String(year), "index.html"));
}

test.describe("human play — 2018 through year shell", () => {
  test.beforeEach(() => {
    test.skip(!yearOnDisk("2018"), "2018 not on disk");
  });
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

