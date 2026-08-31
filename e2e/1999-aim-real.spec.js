// @ts-check
/**
 * 1999 AIM product machine — sign on · IM · persist
 * Keys: itt99-aim-user · itt99-aim-messages · itt99-aim
 */
const { test, expect } = require("@playwright/test");


async function clearAim(page) {
  await page.evaluate(() => {
    Object.keys(localStorage)
      .filter((k) => k.startsWith("itt99-aim"))
      .forEach((k) => localStorage.removeItem(k));
  });
}

test.describe("1999 AIM real machine", () => {
  test("empty sign-on blocked; sign on writes user + summary", async ({ page }) => {
    await page.goto("/years/1999/sites/aim/index.html");
    await clearAim(page);
    await page.reload();
    await page.waitForTimeout(500);

    await page.locator("form[data-aim-signon] button[type='submit']").click();
    await expect
      .poll(async () => page.evaluate(() => localStorage.getItem("itt99-aim-user")))
      .toBeNull();

    await page.fill("#ott-field", "coolkid99");
    await page.locator("form[data-aim-signon] button[type='submit']").click();
    await expect
      .poll(async () => page.evaluate(() => localStorage.getItem("itt99-aim-user")))
      .toMatch(/coolkid99/);
    await expect(page.locator("[data-aim-session]")).toContainText(/coolkid99/i);
    await expect(page.locator("[data-aim-buddies]")).toContainText(/sk8r99/i);
  });

  test("IM empty blocked; send persists transcript", async ({ page }) => {
    await page.goto("/years/1999/sites/aim/index.html");
    await clearAim(page);
    await page.reload();
    await page.waitForTimeout(500);
    await page.fill("#ott-field", "msguser99");
    await page.locator("form[data-aim-signon] button[type='submit']").click();
    await expect
      .poll(async () => page.evaluate(() => !!localStorage.getItem("itt99-aim-user")))
      .toBeTruthy();

    await page.goto("/years/1999/sites/aim/im.html?buddy=buddy-a");
    await page.waitForTimeout(500);
    await page.locator("form[data-aim-im-form] button[type='submit']").click();
    await expect
      .poll(async () => page.evaluate(() => localStorage.getItem("itt99-aim-messages")))
      .toBeNull();

    await page.fill("#aim-msg", "hey from the museum");
    await page.locator("form[data-aim-im-form] button[type='submit']").click();
    await expect
      .poll(async () => {
        const raw = await page.evaluate(() => localStorage.getItem("itt99-aim-messages"));
        return raw && raw.includes("hey from the museum");
      })
      .toBeTruthy();
    await page.reload();
    await page.waitForTimeout(400);
    await expect(page.locator("[data-aim-log]")).toContainText(/hey from the museum/i);
  });

  test("away preset persists after reload", async ({ page }) => {
    await page.goto("/years/1999/sites/aim/index.html");
    await clearAim(page);
    await page.reload();
    await page.fill("#ott-field", "awaykid99");
    await page.locator("form[data-aim-signon] button[type='submit']").click();
    await expect
      .poll(async () => page.evaluate(() => !!localStorage.getItem("itt99-aim-user")))
      .toBeTruthy();
    await page.goto("/years/1999/sites/aim/away.html");
    await page.locator("[data-aim-away-preset]").first().click();
    await page.locator("form[data-aim-away-form] button[type='submit']").click();
    await expect
      .poll(async () => page.evaluate(() => localStorage.getItem("itt99-aim-away")))
      .toMatch(/library|dinner|away|homework/i);
    await page.reload();
    await expect(page.locator("#away")).toHaveValue(/library|dinner|away|homework|brb/i);
  });

  test("does not leak itt97 or itt00 keys", async ({ page }) => {
    await page.goto("/years/1999/sites/aim/index.html");
    await page.evaluate(() => {
      Object.keys(localStorage)
        .filter((k) => k.startsWith("itt97-") || k.startsWith("itt00-") || k.startsWith("itt99-aim"))
        .forEach((k) => localStorage.removeItem(k));
    });
    await page.reload();
    await page.waitForTimeout(400);
    await page.fill("#ott-field", "isouser");
    await page.locator("form[data-aim-signon] button[type='submit']").click();
    await expect
      .poll(async () => page.evaluate(() => !!localStorage.getItem("itt99-aim-user")))
      .toBeTruthy();
    const leak = await page.evaluate(() =>
      Object.keys(localStorage).filter((k) => k.startsWith("itt97-") || k.startsWith("itt00-"))
    );
    expect(leak).toEqual([]);
  });

  test("add buddy empty blocked; custom buddy persists", async ({ page }) => {
    await page.goto("/years/1999/sites/aim/index.html");
    await clearAim(page);
    await page.reload();
    await page.waitForTimeout(400);
    await page.fill("#ott-field", "host99");
    await page.locator("form[data-aim-signon] button[type='submit']").click();
    await expect
      .poll(async () => page.evaluate(() => !!localStorage.getItem("itt99-aim-user")))
      .toBeTruthy();

    await page.locator("form[data-aim-add] button[type='submit']").click();
    const before = await page.evaluate(() => localStorage.getItem("itt99-aim-buddies"));
    expect(before && before.includes("newpal99")).toBeFalsy();

    await page.fill("#aim-add-nick", "newpal99");
    await page.locator("form[data-aim-add] button[type='submit']").click();
    await expect
      .poll(async () => {
        const raw = await page.evaluate(() => localStorage.getItem("itt99-aim-buddies"));
        return raw && raw.includes("newpal99");
      })
      .toBeTruthy();
    await expect(page.locator("[data-aim-buddies]")).toContainText(/newpal99/i);
  });
});
