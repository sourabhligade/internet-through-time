// @ts-check
const { test, expect } = require("@playwright/test");

test.describe("2020 Zoom REAL", () => {
  test("Join without code does not write", async ({ page }) => {
    await page.goto("/years/2020/sites/zoom/index.html");
    await page.evaluate(() => {
      localStorage.removeItem("itt20-zoom");
      sessionStorage.removeItem("itt20-zoom-draft");
    });
    await page.reload();
    await page.waitForTimeout(400);
    await page.locator("[data-zoom-join]").click();
    await page.waitForTimeout(150);
    expect(await page.evaluate(() => localStorage.getItem("itt20-zoom"))).toBeFalsy();
  });

  test("Join + leave without chat does not write", async ({ page }) => {
    await page.goto("/years/2020/sites/zoom/index.html");
    await page.evaluate(() => {
      localStorage.removeItem("itt20-zoom");
      sessionStorage.removeItem("itt20-zoom-draft");
    });
    await page.reload();
    await page.locator("#itt20-code").fill("847392");
    await page.locator("[data-zoom-join]").click();
    await page.waitForURL(/join\.html/);
    await page.locator("[data-admit]").click();
    await page.waitForURL(/meeting\.html/);
    await page.locator("[data-leave]").click();
    await page.waitForTimeout(200);
    expect(page.url()).toMatch(/meeting\.html/);
    expect(await page.evaluate(() => localStorage.getItem("itt20-zoom"))).toBeFalsy();
  });

  test("full path writes JSON and isolates 2019", async ({ page }) => {
    await page.goto("/years/2020/sites/zoom/index.html");
    await page.evaluate(() => {
      localStorage.removeItem("itt20-zoom");
      localStorage.setItem("itt19-disneyplus", '{"keep":true}');
      sessionStorage.removeItem("itt20-zoom-draft");
    });
    await page.reload();
    await page.locator("#itt20-code").fill("84739258101");
    await page.locator("[data-zoom-join]").click();
    await page.waitForURL(/join\.html/);
    await page.locator("[data-admit]").click();
    await page.waitForURL(/meeting\.html/);
    await page.locator("[data-mute]").click();
    await page.locator("[name='line']").fill("can you see my screen");
    await page.locator("[data-chat]").evaluate((f) => f.requestSubmit());
    await page.locator("[data-leave]").click();
    await page.waitForURL(/recap\.html/);
    await page.locator("[data-zoom-part]").check();
    await page.locator("[data-zoom-not-live]").check();
    await page.locator("[data-zoom-save]").click();
    await expect.poll(async () => page.evaluate(() => localStorage.getItem("itt20-zoom"))).toBeTruthy();
    const blob = JSON.parse((await page.evaluate(() => localStorage.getItem("itt20-zoom"))) || "{}");
    expect(blob.multiStep).toBe(true);
    expect(blob.real).toBe(true);
    expect(blob.year).toBe("2020");
    expect(blob.code).toBe("84739258101");
    expect(blob.left).toBe(true);
    expect(blob.chat.length).toBeGreaterThanOrEqual(1);
    expect(blob.participantsHonesty).toBe(true);
    const dplus = await page.evaluate(() => localStorage.getItem("itt19-disneyplus"));
    expect(dplus).toContain("keep");
  });

  test("mute persists across meeting reload", async ({ page }) => {
    await page.goto("/years/2020/sites/zoom/index.html");
    await page.evaluate(() => sessionStorage.removeItem("itt20-zoom-draft"));
    await page.reload();
    await page.locator("#itt20-code").fill("111222");
    await page.locator("[data-zoom-join]").click();
    await page.waitForURL(/join\.html/);
    await page.locator("[data-admit]").click();
    await page.waitForURL(/meeting\.html/);
    await expect(page.locator("[data-mute]")).toHaveAttribute("aria-pressed", "true");
    await page.locator("[data-mute]").click();
    await expect(page.locator("[data-mute]")).toHaveAttribute("aria-pressed", "false");
    await page.reload();
    await expect(page.locator("[data-mute]")).toHaveAttribute("aria-pressed", "false");
  });

  test("recap reload still shows the same code after save", async ({ page }) => {
    await page.goto("/years/2020/sites/zoom/index.html");
    await page.evaluate(() => {
      localStorage.removeItem("itt20-zoom");
      sessionStorage.removeItem("itt20-zoom-draft");
    });
    await page.reload();
    await page.locator("#itt20-code").fill("999888777");
    await page.locator("[data-zoom-join]").click();
    await page.waitForURL(/join\.html/);
    await page.locator("[data-admit]").click();
    await page.waitForURL(/meeting\.html/);
    await page.locator("[name='line']").fill("can you hear me");
    await page.locator("[data-chat]").evaluate((f) => f.requestSubmit());
    await page.locator("[data-leave]").click();
    await page.waitForURL(/recap\.html/);
    await page.locator("[data-zoom-part]").check();
    await page.locator("[data-zoom-not-live]").check();
    await page.locator("[data-zoom-save]").click();
    await expect.poll(async () => page.evaluate(() => localStorage.getItem("itt20-zoom"))).toBeTruthy();
    await page.reload();
    await expect(page.locator("[data-recap-code]")).toContainText("999888777");
    await expect(page.locator("[data-recap-chat]")).toContainText(/1/);
  });

  test("recap without honesty checks does not write", async ({ page }) => {
    await page.goto("/years/2020/sites/zoom/index.html");
    await page.evaluate(() => {
      localStorage.removeItem("itt20-zoom");
      sessionStorage.removeItem("itt20-zoom-draft");
    });
    await page.reload();
    await page.locator("#itt20-code").fill("111111");
    await page.locator("[data-zoom-join]").click();
    await page.waitForURL(/join\.html/);
    await page.locator("[data-admit]").click();
    await page.waitForURL(/meeting\.html/);
    await page.locator("[name='line']").fill("hi");
    await page.locator("[data-chat]").evaluate((f) => f.requestSubmit());
    await page.locator("[data-leave]").click();
    await page.waitForURL(/recap\.html/);
    await page.locator("[data-zoom-save]").click();
    await page.waitForTimeout(150);
    expect(await page.evaluate(() => localStorage.getItem("itt20-zoom"))).toBeFalsy();
  });
});

