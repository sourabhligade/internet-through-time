// @ts-check
/**
 * 2014 WhatsApp one-thing REAL — install → deal honesty → chat
 * Keys: itt14-wa-install · itt14-wa-msgs
 * Bans: no WhatsApp Web (2015) · no default E2E (2016) · still called WhatsApp (not Meta)
 */
const { test, expect } = require("@playwright/test");

async function clearWa14(page) {
  await page.evaluate(() => {
    Object.keys(localStorage)
      .filter((k) => k.startsWith("itt14-wa") || k.startsWith("itt13-wa"))
      .forEach((k) => localStorage.removeItem(k));
  });
}

test.describe("2014 WhatsApp real flows", () => {
  test("empty install does not write; name writes itt14-wa-install only", async ({ page }) => {
    await page.goto("/years/2014/sites/whatsapp/index.html");
    await clearWa14(page);
    await page.reload();

    await page.locator("[data-wa-install]").click();
    await page.waitForTimeout(120);
    expect(await page.evaluate(() => localStorage.getItem("itt14-wa-install"))).toBeFalsy();

    await page.fill("[data-wa-name]", "Jan residual");
    await page.locator("[data-wa-install]").click();
    await expect.poll(async () => page.evaluate(() => localStorage.getItem("itt14-wa-install"))).toBeTruthy();
    const leak13 = await page.evaluate(() =>
      Object.keys(localStorage).filter((k) => k.startsWith("itt13-wa"))
    );
    expect(leak13).toEqual([]);
  });

  test("chat without install / empty send do not write; send writes itt14-wa-msgs", async ({ page }) => {
    await page.goto("/years/2014/sites/whatsapp/chat.html");
    await clearWa14(page);
    await page.reload();

    await page.fill("[data-wa-text]", "should fail");
    await page.locator("[data-wa-send-btn]").click();
    await page.waitForTimeout(120);
    expect(await page.evaluate(() => localStorage.getItem("itt14-wa-msgs"))).toBeFalsy();

    await page.goto("/years/2014/sites/whatsapp/index.html");
    await page.fill("[data-wa-name]", "Glenn");
    await page.locator("[data-wa-install]").click();
    await expect.poll(async () => page.evaluate(() => localStorage.getItem("itt14-wa-install"))).toBeTruthy();

    await page.goto("/years/2014/sites/whatsapp/chat.html");
    await page.locator("[data-wa-send-btn]").click();
    await page.waitForTimeout(120);
    expect(await page.evaluate(() => localStorage.getItem("itt14-wa-msgs"))).toBeFalsy();

    await page.fill("[data-wa-text]", "hello 2014 deal year");
    await page.locator("[data-wa-send-btn]").click();
    await expect
      .poll(async () => {
        const raw = await page.evaluate(() => localStorage.getItem("itt14-wa-msgs"));
        return raw && raw.includes("hello 2014 deal year");
      })
      .toBeTruthy();
    await expect(page.locator("[data-wa-list]")).toContainText(/hello 2014 deal year/i);
    const leak13 = await page.evaluate(() =>
      Object.keys(localStorage).filter((k) => k.startsWith("itt13-wa"))
    );
    expect(leak13).toEqual([]);
  });

  test("deal room dual-cites money and close date; bans Web / E2E / Meta", async ({ page }) => {
    await page.goto("/years/2014/sites/whatsapp/about.html");
    await expect(page.locator("body")).toContainText(/\$19|19 billion/i);
    await expect(page.locator("body")).toContainText(/\$16|4B|\$4B|12B/i);
    await expect(page.locator("body")).toContainText(/October 6|Oct 6/i);
    await page.goto("/years/2014/sites/whatsapp/index.html");
    await expect(page.locator("body")).toContainText(/WhatsApp Web|E2E|Meta/i);
    await expect(page.locator("body")).toContainText(/not Meta|no WhatsApp Web|2016/i);
  });

  test("home one-thing is WhatsApp not Slack", async ({ page }) => {
    await page.goto("/years/2014/pages/home.html");
    const href = await page.locator('[data-ott-one-thing="2014"]').getAttribute("href");
    expect(href || "").toMatch(/whatsapp/i);
    expect(href || "").not.toMatch(/slack/i);
  });
});
