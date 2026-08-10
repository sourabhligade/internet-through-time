// @ts-check
/** 2000 MapQuest generate + print persist */
const { test, expect } = require("@playwright/test");

test.describe("2000 MapQuest real machine", () => {
  test("empty from/to does not write trip; generate persists visitor addresses", async ({ page }) => {
    await page.goto("/years/2000/sites/mapquest/index.html");
    await page.evaluate(() => {
      Object.keys(localStorage)
        .filter((k) => k.startsWith("itt00-mapquest"))
        .forEach((k) => localStorage.removeItem(k));
    });
    await page.reload();
    await page.waitForTimeout(400);

    await page.locator("form[data-mq-form] button[type='submit']").click();
    await expect
      .poll(async () => page.evaluate(() => localStorage.getItem("itt00-mapquest-trip")))
      .toBeNull();

    await page.fill("#ott-field", "12 Pine St, Anytown");
    await page.fill("#mq-to", "88 Harbor Rd");
    await page.locator("form[data-mq-form] button[type='submit']").click();
    await expect
      .poll(async () => {
        const raw = await page.evaluate(() => localStorage.getItem("itt00-mapquest-trip"));
        return raw && raw.includes("12 Pine St");
      })
      .toBeTruthy();

    await page.goto("/years/2000/sites/mapquest/directions.html");
    await page.waitForTimeout(400);
    await expect(page.locator("[data-mq-steps]")).toContainText(/Pine St|Harbor/i);

    await page.goto("/years/2000/sites/mapquest/print.html");
    await page.waitForTimeout(400);
    await expect(page.locator("[data-mq-print]")).toContainText(/12 Pine St/);
    await expect(page.locator("[data-mq-print]")).toContainText(/min residual/i);
    await expect(page.locator("[data-mq-print]")).not.toContainText("12.4 mi · ~22 min residual");
  });
});
