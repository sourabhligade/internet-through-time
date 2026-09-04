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
    /* Secondary year jumps are not solid primary */
    const primaries = page.locator(".start-path .start-btn.start-primary");
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
  test("2004 shows honesty chip and coach strip when not seen", async ({ page }) => {
    await page.goto("/index.html");
    await page.evaluate(() => {
      Object.keys(localStorage)
        .filter((k) => k.indexOf("itt-ux-coach") === 0 || k.indexOf("itt-2004-coach") === 0)
        .forEach((k) => localStorage.removeItem(k));
      localStorage.removeItem("itt-ux-off");
    });
    await enterYear(page, "2004");
    await page.waitForTimeout(900);
    await expect(page.locator("#itt-ux-honesty-chip")).toBeVisible({ timeout: 8000 });
    await expect(page.locator("#itt-ux-shell-coach")).toBeVisible({ timeout: 8000 });
    await page.locator("[data-ux-coach-ok]").click();
    await expect(page.locator("#itt-ux-shell-coach")).toHaveCount(0);
    const seen = await page.evaluate(() => localStorage.getItem("itt-ux-coach-seen-2004"));
    expect(seen).toBe("1");
  });

  test("ux=0 disables shell coach strip", async ({ page }) => {
    await page.goto("/years/2004/?ux=0");
    const skip = page.locator("#skip-connect");
    if (await skip.isVisible().catch(() => false)) await skip.click();
    await page.waitForTimeout(1000);
    await expect(page.locator("#itt-ux-shell-coach")).toHaveCount(0);
  });
});


test.describe.skip("UX pack U4–U5 content (hereStrip / yearMeter flags off)", () => {
  test("content page mounts you-are-here after immersion", async ({ page }) => {
    await enterYear(page, "2008");
    await goImmersion(page, "2008", "sites/chrome/index.html");
    const frame = contentFrame(page);
    await expect(frame.locator("#itt-ux-here-strip")).toBeVisible({ timeout: 15000 });
    await expect(frame.locator("#itt-ux-here-strip")).toContainText("2008");
  });

  test("about page mounts year meter and about stamp key", async ({ page }) => {
    await page.goto("/years/2008/pages/about.html");
    await page.waitForTimeout(2000);
    await expect(page.locator("#itt-ux-year-meter")).toBeVisible({ timeout: 10000 });
    await expect(page.locator("#itt-ux-year-meter")).toContainText("2008 progress");
    const about = await page.evaluate(() => localStorage.getItem("itt-ux-about-2008"));
    expect(about).toBe("1");
  });
});
