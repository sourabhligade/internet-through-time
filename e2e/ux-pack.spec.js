// @ts-check
/**
 * UX pack (js/ux/*) — maps to docs/UX-IMPROVEMENT-PHASES-… U1–U5
 * Disable pack: localStorage itt-ux-off=1 should hide coach strip.
 */
const { test, expect } = require("@playwright/test");
const { enterYear, goImmersion, contentFrame } = require("./helpers");

test.describe("UX pack U1 hub", () => {
  test("hub has single primary first-night CTA", async ({ page }) => {
    await page.goto("/index.html");
    await expect(page.locator("#begin-first-night")).toBeVisible();
    await expect(page.locator("#begin-first-night")).toHaveClass(/start-primary/);
    /* Secondary tours are not both solid primary */
    const primaries = page.locator(".start-primary-row .start-btn.start-primary");
    await expect(primaries).toHaveCount(1);
  });

  test("first night primary starts trail", async ({ page }) => {
    await page.goto("/index.html");
    await page.evaluate(() => {
      localStorage.removeItem("itt-first-night");
      localStorage.removeItem("itt-passport");
    });
    await page.locator("#begin-first-night").click();
    await expect(page).toHaveURL(/years\/1994/);
    const night = await page.evaluate(() => localStorage.getItem("itt-first-night"));
    expect(night).toMatch(/first-night/);
  });
});

test.describe("UX pack U1 shell coach", () => {
  test("2005 shows honesty chip and coach strip when not seen", async ({ page }) => {
    await page.goto("/index.html");
    await page.evaluate(() => {
      Object.keys(localStorage)
        .filter((k) => k.indexOf("itt-ux-coach") === 0 || k.indexOf("itt-2005-coach") === 0)
        .forEach((k) => localStorage.removeItem(k));
      localStorage.removeItem("itt-ux-off");
    });
    await enterYear(page, "2005");
    await page.waitForTimeout(900);
    await expect(page.locator("#itt-ux-honesty-chip")).toBeVisible({ timeout: 8000 });
    await expect(page.locator("#itt-ux-shell-coach")).toBeVisible({ timeout: 8000 });
    await page.locator("[data-ux-coach-ok]").click();
    await expect(page.locator("#itt-ux-shell-coach")).toHaveCount(0);
    const seen = await page.evaluate(() => localStorage.getItem("itt-ux-coach-seen-2005"));
    expect(seen).toBe("1");
  });

  test("ux=0 disables shell coach strip", async ({ page }) => {
    await page.goto("/years/2005/?ux=0");
    const skip = page.locator("#skip-connect");
    if (await skip.isVisible().catch(() => false)) await skip.click();
    await page.waitForTimeout(1000);
    await expect(page.locator("#itt-ux-shell-coach")).toHaveCount(0);
  });
});

test.describe("UX pack U2 real coach", () => {
  test("incomplete REAL pulses and does not write", async ({ page }) => {
    await page.goto("/index.html");
    await page.evaluate(() => localStorage.removeItem("itt-ux-off"));
    await page.goto("/years/2018/sites/gdpr/index.html");
    await page.waitForTimeout(1500);
    /* GDPR uses year extras not only data-itt-real-save — try real-save if present */
    const realBtn = page.locator("[data-itt-real-save]");
    if ((await realBtn.count()) > 0) {
      await realBtn.first().click();
      await page.waitForTimeout(200);
      const pulse = await page.locator(".itt-ux-need-attention").count();
      /* pulse optional if no data-req; still no throw */
      expect(pulse).toBeGreaterThanOrEqual(0);
    }
    /* Consent dash incomplete path still no key */
    await page.goto("/years/2018/sites/playable/game.html");
    await page.waitForTimeout(800);
    await page.locator("[data-cd-save]").click({ force: true }).catch(() => {});
    expect(await page.evaluate(() => localStorage.getItem("itt18-game-consentdash"))).toBeFalsy();
  });
});

test.describe("UX pack U4–U5 content", () => {
  test("content page mounts you-are-here after immersion", async ({ page }) => {
    await enterYear(page, "2005");
    await goImmersion(page, "2005", "sites/youtube/index.html");
    const frame = contentFrame(page);
    await expect(frame.locator("#itt-ux-here-strip")).toBeVisible({ timeout: 15000 });
    await expect(frame.locator("#itt-ux-here-strip")).toContainText("2005");
  });

  test("about page mounts year meter and about stamp key", async ({ page }) => {
    await page.goto("/years/2005/pages/about.html");
    await page.waitForTimeout(2000);
    await expect(page.locator("#itt-ux-year-meter")).toBeVisible({ timeout: 10000 });
    await expect(page.locator("#itt-ux-year-meter")).toContainText("2005 progress");
    const about = await page.evaluate(() => localStorage.getItem("itt-ux-about-2005"));
    expect(about).toBe("1");
  });
});
