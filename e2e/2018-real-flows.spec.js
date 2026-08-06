// @ts-check
const { test, expect } = require("@playwright/test");

test.describe("2018 REAL flows — no mocks", () => {
  test("hub unlocks 2018 card", async ({ page }) => {
    await page.goto("/index.html");
    const card = page.locator('a.year-card[data-year="2018"]');
    await expect(card).toBeVisible();
    await expect(card).toHaveAttribute("href", /years\/2018/);
  });

  test("about + GDPR multi-step writes itt18-gdpr", async ({ page }) => {
    await page.goto("/years/2018/pages/about.html");
    await expect(page.locator("body")).toContainText("1,630,322,579");

    await page.goto("/years/2018/sites/gdpr/index.html");
    await page.locator("[data-gdpr-manage]").click();
    await page.locator("[data-gdpr-rights]").check();
    await page.locator("[data-gdpr-save]").click();
    await expect(page.locator("[data-gdpr-status]")).toContainText("itt18-gdpr");
    expect(await page.evaluate(() => localStorage.getItem("itt18-gdpr"))).toBeTruthy();
  });

  test("TikTok incomplete does not write", async ({ page }) => {
    await page.goto("/years/2018/sites/tiktok/index.html");
    await page.locator("[data-tt-save]").click();
    expect(await page.evaluate(() => localStorage.getItem("itt18-tiktok"))).toBeFalsy();
  });

  test("TikTok complete writes", async ({ page }) => {
    await page.goto("/years/2018/sites/tiktok/index.html");
    await page.locator("[data-tt-brand]").check();
    await page.locator("[data-tt-migrate]").check();
    await page.locator("[data-tt-fyp]").check();
    await page.locator('[data-tt-clip="clip-a"]').click();
    await page.locator("[data-tt-save]").click();
    expect(await page.evaluate(() => localStorage.getItem("itt18-tiktok"))).toBeTruthy();
  });

  test("Win10 incomplete does not write; complete writes", async ({ page }) => {
    await page.goto("/years/2018/sites/windows10/index.html");
    await page.locator("[data-win10-save]").click();
    expect(await page.evaluate(() => localStorage.getItem("itt18-win10"))).toBeFalsy();
    await page.locator("[data-win10-mass]").check();
    await page.locator("[data-win10-free-ended]").check();
    await page.locator("[data-win10-edge]").check();
    await page.locator("[data-win10-save]").click();
    expect(await page.evaluate(() => localStorage.getItem("itt18-win10"))).toBeTruthy();
  });

  test("AMP incomplete no write; complete writes", async ({ page }) => {
    await page.goto("/years/2018/sites/amp/index.html");
    await page.locator("[data-amp-save]").click();
    expect(await page.evaluate(() => localStorage.getItem("itt18-amp"))).toBeFalsy();
    await page.locator("[data-amp-open]").click();
    await page.locator("[data-amp-not-ia]").check();
    await page.locator("[data-amp-save]").click();
    expect(await page.evaluate(() => localStorage.getItem("itt18-amp"))).toBeTruthy();
  });

  test("Medium incomplete no write; complete writes", async ({ page }) => {
    await page.goto("/years/2018/sites/medium/modern.html");
    await page.locator("[data-md-save]").click();
    expect(await page.evaluate(() => localStorage.getItem("itt18-medium"))).toBeFalsy();
    await page.locator("[data-md-draft]").fill("Hello 2018 residual draft");
    await page.locator("[data-md-clap]").click();
    await page.locator("[data-md-save]").click();
    expect(await page.evaluate(() => localStorage.getItem("itt18-medium"))).toBeTruthy();
  });

  test("Musical.ly reverse REAL writes", async ({ page }) => {
    await page.goto("/years/2018/sites/musically/index.html");
    await page.locator("[data-mly18-acquire]").check();
    await page.locator("[data-mly18-merge]").check();
    await page.locator("[data-mly18-brand]").check();
    await page.locator("[data-mly18-save]").click();
    expect(await page.evaluate(() => localStorage.getItem("itt18-musical"))).toBeTruthy();
  });

  test("Edge residual multi-step REAL", async ({ page }) => {
    await page.goto("/years/2018/sites/edge/index.html");
    await page.locator("[data-edge-save]").click();
    expect(await page.evaluate(() => localStorage.getItem("itt18-edge"))).toBeFalsy();
    await page.locator("[data-edge-ships]").check();
    await page.locator("[data-edge-not-chromium]").check();
    await page.locator("[data-edge-prefer]").click();
    await page.locator("[data-edge-save]").click();
    expect(await page.evaluate(() => localStorage.getItem("itt18-edge"))).toBeTruthy();
  });

  test("Netflix My List REAL multi-step", async ({ page }) => {
    await page.goto("/years/2018/sites/netflix/modern.html");
    await page.locator("[data-nf-save]").click();
    expect(await page.evaluate(() => localStorage.getItem("itt18-netflix"))).toBeFalsy();
    await page.locator('[data-nf-title="Stranger residual"]').click();
    await page.locator("[data-nf-add]").click();
    await page.locator("[data-nf-save]").click();
    expect(await page.evaluate(() => localStorage.getItem("itt18-netflix"))).toBeTruthy();
  });

  test("Crypto winter REAL", async ({ page }) => {
    await page.goto("/years/2018/sites/crypto/index.html");
    await page.locator("[data-crypto18-advice]").check();
    await page.locator("[data-crypto18-winter]").check();
    await page.locator("[data-crypto18-no-trade]").check();
    await page.locator("[data-crypto18-save]").click();
    expect(await page.evaluate(() => localStorage.getItem("itt18-crypto"))).toBeTruthy();
  });

  test("flow map has 2018 REAL residual branches", async ({ page }) => {
    await page.goto("/years/2018/pages/map.html");
    await page.waitForFunction(() => window.ITT && ITT.flowMaps && ITT.flowMaps["2018"]);
    const thesis = await page.evaluate(() => ITT.flowMaps["2018"].thesis);
    expect(thesis).toMatch(/GDPR|TikTok/i);
    const labels = await page.evaluate(() =>
      ITT.flowMaps["2018"].branches.map((b) => b.label)
    );
    expect(labels.join(" ")).toMatch(/Desktop residual|Residual densify/);
  });
});
