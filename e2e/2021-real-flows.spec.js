// @ts-check
const { test, expect } = require("@playwright/test");

/**
 * @param {import("@playwright/test").Page} page
 * @param {{ path: string, key: string }} spec
 */
async function blockedThenWrites(page, spec) {
  await page.goto(`/years/2021/${spec.path}`);
  await page.evaluate((k) => localStorage.removeItem(k), spec.key);
  await page.reload();
  await page
    .waitForFunction(
      () =>
        document.documentElement.getAttribute("data-itt-feat-year2021extras") === "1" ||
        !!document.querySelector("[data-itt-real-save]"),
      null,
      { timeout: 15000 }
    )
    .catch(() => {});
  await page.locator("[data-itt-real-save]").click();
  expect(await page.evaluate((k) => localStorage.getItem(k), spec.key)).toBeFalsy();
  const boxes = page.locator("[data-req]");
  const n = await boxes.count();
  for (let i = 0; i < n; i++) await boxes.nth(i).check({ force: true });
  const field = page.locator("[data-dest-field]");
  if (await field.count()) await field.fill("2021 note");
  await page.locator("[data-itt-real-save]").click();
  await expect.poll(async () => page.evaluate((k) => localStorage.getItem(k), spec.key)).toBeTruthy();
  const blob = JSON.parse((await page.evaluate((k) => localStorage.getItem(k), spec.key)) || "null");
  expect(blob.real).toBe(true);
  expect(String(blob.year)).toBe("2021");
}

test.describe("2021 REAL residual + P1", () => {
  test("Signal incomplete then complete writes itt21-signal", async ({ page }) => {
    await blockedThenWrites(page, { path: "sites/signal/index.html", key: "itt21-signal" });
  });

  test("Meta incomplete then complete writes itt21-meta", async ({ page }) => {
    await blockedThenWrites(page, { path: "sites/meta/index.html", key: "itt21-meta" });
  });

  test("Copilot preview incomplete then writes itt21-copilot", async ({ page }) => {
    await blockedThenWrites(page, { path: "sites/copilot/index.html", key: "itt21-copilot" });
  });

  test("WhatsApp Accept never writes", async ({ page }) => {
    await page.goto("/years/2021/sites/whatsapp/policy.html");
    await page.evaluate(() => {
      localStorage.removeItem("itt21-signal");
      localStorage.removeItem("itt21-wa");
    });
    await page.reload();
    await page.locator("[data-wa-accept]").click();
    expect(await page.evaluate(() => localStorage.getItem("itt21-signal"))).toBeNull();
    expect(await page.evaluate(() => Object.keys(localStorage).filter((k) => k.indexOf("itt21-") === 0))).toEqual([]);
  });

  test("Outage empty never writes", async ({ page }) => {
    await page.goto("/years/2021/sites/outage/index.html");
    await page.evaluate(() => localStorage.removeItem("itt21-outage"));
    await page.reload();
    await page.locator("[data-itt-real-save]").click();
    expect(await page.evaluate(() => localStorage.getItem("itt21-outage"))).toBeNull();
  });
});
