// @ts-check
/**
 * 2001 MSN Messenger — sign-on · chat · nudge
 * Keys: itt01-msn-user · itt01-msn-messages · itt01-msn-nudge · itt01-msn
 */
const { test, expect } = require("@playwright/test");

async function clearMsn(page) {
  await page.evaluate(() => {
    Object.keys(localStorage)
      .filter((k) => k.startsWith("itt01-msn"))
      .forEach((k) => localStorage.removeItem(k));
  });
}

test.describe("2001 MSN real machine", () => {
  test("empty / no-@ sign-in blocked; chat + nudge persist", async ({ page }) => {
    await page.goto("/years/2001/sites/msn/index.html");
    await clearMsn(page);
    await page.reload();
    await page.waitForTimeout(500);

    await page.locator("form[data-msn-signon] button[type='submit']").click();
    expect(await page.evaluate(() => localStorage.getItem("itt01-msn-user"))).toBeNull();

    await page.fill("#ott-field", "nounderscore");
    await page.locator("form[data-msn-signon] button[type='submit']").click();
    expect(await page.evaluate(() => localStorage.getItem("itt01-msn-user"))).toBeNull();

    await page.fill("#ott-field", "you@hotmail.com");
    await page.locator("form[data-msn-signon] button[type='submit']").click();
    await expect
      .poll(async () => page.evaluate(() => localStorage.getItem("itt01-msn-user")))
      .toMatch(/you@hotmail.com/);
    await expect(page.locator("[data-msn-session]")).toContainText(/you@hotmail.com/i);

    await page.goto("/years/2001/sites/msn/chat.html?c=c1");
    await page.waitForTimeout(400);
    await page.locator("form[data-msn-chat-form] button[type='submit']").click();
    expect(await page.evaluate(() => localStorage.getItem("itt01-msn-messages"))).toBeNull();

    await page.fill("#m", "nudge later residual");
    await page.locator("form[data-msn-chat-form] button[type='submit']").click();
    await expect
      .poll(async () => {
        const raw = await page.evaluate(() => localStorage.getItem("itt01-msn-messages"));
        return raw && raw.includes("nudge later residual");
      })
      .toBeTruthy();
    await page.reload();
    await page.waitForTimeout(300);
    await expect(page.locator("[data-msn-log]")).toContainText(/nudge later residual/i);

    await page.locator("[data-msn-nudge]").click();
    await expect
      .poll(async () => {
        const raw = await page.evaluate(() => localStorage.getItem("itt01-msn-nudge"));
        return raw && /"count":\s*[1-9]/.test(raw);
      })
      .toBeTruthy();
    await expect(page.locator("[data-msn-nudge-count]")).toContainText("1");
  });

  test("signed-off chat queues offline then delivers on sign-on", async ({ page }) => {
    await page.goto("/years/2001/sites/msn/chat.html?c=c1");
    await clearMsn(page);
    await page.reload();
    await page.waitForTimeout(400);

    await page.fill("#m", "offline residual ping");
    await page.locator("form[data-msn-chat-form] button[type='submit']").click();
    await expect
      .poll(async () => page.evaluate(() => localStorage.getItem("itt01-msn-offline")))
      .toMatch(/offline residual ping/);
    expect(await page.evaluate(() => localStorage.getItem("itt01-msn-messages"))).toBeNull();

    await page.goto("/years/2001/sites/msn/index.html");
    await page.waitForTimeout(300);
    await page.fill("#ott-field", "you@hotmail.com");
    await page.locator("form[data-msn-signon] button[type='submit']").click();
    await expect
      .poll(async () => page.evaluate(() => localStorage.getItem("itt01-msn-messages")))
      .toMatch(/offline residual ping/);

    await page.goto("/years/2001/sites/msn/chat.html?c=c1");
    await page.waitForTimeout(400);
    await expect(page.locator("[data-msn-log]")).toContainText(/offline residual ping/i);
  });
});
