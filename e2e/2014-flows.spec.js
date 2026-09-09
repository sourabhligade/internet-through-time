// @ts-check
const { test, expect } = require("@playwright/test");
const { openAlsoYear } = require("./helpers");


async function getKey(page, k) {
  return page.evaluate((key) => window.localStorage.getItem(key), k);
}

test.describe("2014 flows", () => {
  test("2014 is live", async ({ page }) => {
    const fs = require("fs");
    const path = require("path");
    expect(fs.existsSync(path.join(__dirname, "..", "years", "2014", "index.html"))).toBe(true);
    await page.goto("/");
    await expect(page.locator(".year-card.available.y2014")).toBeVisible();
    await expect(page.locator(".year-card.locked.y2014")).toHaveCount(0);
  });

  test("guided stays exactly 6", async ({ page }) => {
    await page.goto("/years/2014/pages/home.html");
    await expect(page.locator("#ott-guided-2014 ol > li")).toHaveCount(6);
    await expect(page.locator('[data-ott-one-thing="2014"]')).toBeVisible();
  });

  test("star trap + empty never write; complete writes itt14-wa-install", async ({ page }) => {
    await page.goto("/years/2014/sites/whatsapp/index.html");
    await page.evaluate(() => localStorage.removeItem("itt14-wa-install"));
    await page.reload();
    await page.locator("[data-wa14-messenger]").click();
    expect(await getKey(page, "itt14-wa-install")).toBeFalsy();
    await page.locator("[data-wa14-install]").click();
    expect(await getKey(page, "itt14-wa-install")).toBeFalsy();
    await page.locator('[data-wa14-deal="16b"]').click();
    await page.locator('[data-wa14-deal="rsu"]').click();
    await page.locator("[data-wa14-install]").click();
    await expect.poll(() => getKey(page, "itt14-wa-install")).toBeTruthy();
  });

  test("Heartbleed exploit never writes; rotate writes", async ({ page }) => {
    await page.goto("/years/2014/sites/heartbleed/index.html");
    await page.evaluate(() => localStorage.removeItem("itt14-heartbleed"));
    await page.reload();
    await page.locator("[data-hb14-exploit]").click();
    expect(await getKey(page, "itt14-heartbleed")).toBeFalsy();
    await page.locator("[data-hb14-rotate]").click();
    expect(await getKey(page, "itt14-heartbleed")).toBeFalsy();
    await page.locator("[data-hb14-req]").nth(0).check();
    await page.locator("[data-hb14-req]").nth(1).check();
    await page.locator("[data-hb14-rotate]").click();
    await expect.poll(() => getKey(page, "itt14-heartbleed")).toBeTruthy();
  });

  test("Ice Bucket empty never writes then nominate writes", async ({ page }) => {
    await page.goto("/years/2014/sites/icebucket/index.html");
    await page.evaluate(() => localStorage.removeItem("itt14-icebucket"));
    await page.reload();
    await page.locator("[data-ice14-dump]").click();
    expect(await getKey(page, "itt14-icebucket")).toBeFalsy();
    await page.locator("[data-ice14-req]").nth(0).check();
    await page.locator("[data-ice14-req]").nth(1).check();
    await page.fill("[data-ice14-name]", "museum leftover");
    await page.locator("[data-ice14-dump]").click();
    await expect.poll(() => getKey(page, "itt14-icebucket")).toBeTruthy();
  });

  test("second leftover 3× is Oculus · Serial · Ello", async ({ page }) => {
    await page.goto("/years/2014/pages/home.html");
    await openAlsoYear(page, "2014");
    const strip = page.locator('nav[data-itt-pop-more="2014"], p.itt-pop-more[data-itt-pop-more="2014"]').first();
    await expect(strip).toContainText(/Oculus/);
    await expect(strip).toContainText(/Serial/);
    await expect(strip).toContainText(/Ello/);
    await expect(strip).not.toContainText(/Heartbleed/);
    await expect(page.locator("#ott-guided-2014 ol > li")).toHaveCount(6);
  });
});
