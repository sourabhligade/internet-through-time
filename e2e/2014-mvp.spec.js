// @ts-check
const { test, expect } = require("@playwright/test");
const { enterYear, goInFrame } = require("./helpers");

test.describe("2014 MVP", () => {
  test("shell boots 2014", async ({ page }) => {
    await enterYear(page, "2014");
    await expect(page.locator("body")).toHaveAttribute("data-itt-year", "2014");
    await expect(page.locator("#content, iframe, .content-frame").first()).toBeVisible({ timeout: 15000 });
  });

  test("home lists P0 thesis + ott-guided", async ({ page }) => {
    await page.goto("/years/2014/pages/home.html");
    await expect(page.locator('[data-ott-one-thing="2014"]')).toBeVisible();
    await expect(page.locator("#ott-guided-2014")).toBeVisible();
    await expect(page.locator("#ott-guided-2014 ol li")).toHaveCount(6);
    const text = await page.locator("body").innerText();
    expect(text).toMatch(/WhatsApp/i);
    expect(text).toMatch(/Heartbleed|iPhone 6|968,882,453/i);
  });

  test("about dual scale and bans", async ({ page }) => {
    await page.goto("/years/2014/pages/about.html");
    await expect(page.locator("body")).toContainText("968,882,453");
    await expect(page.locator("body")).toContainText(/1 billion|September 2014/i);
    await expect(page.locator("body")).toContainText(/Stories|TikTok|Reactions|Meta/i);
  });

  test("window title is 2014", async ({ page }) => {
    await enterYear(page, "2014");
    const title = (await page.locator("#window-title").textContent()) || "";
    expect(title).toMatch(/2014/);
    expect(title).not.toMatch(/2004/);
  });

  test("WhatsApp / Chrome titleMap stay 2014 after navigate", async ({ page }) => {
    await enterYear(page, "2014");
    await goInFrame(page, "sites/whatsapp/index.html");
    await expect.poll(async () => page.locator("#window-title").textContent()).toMatch(/WhatsApp/);
    expect(await page.locator("#window-title").textContent()).toMatch(/2014/);
    expect(await page.locator("#window-title").textContent()).not.toMatch(/2013 residual/i);
    await goInFrame(page, "sites/chrome/index.html");
    await expect.poll(async () => page.locator("#window-title").textContent()).toMatch(/Chrome/);
    expect(await page.locator("#window-title").textContent()).toMatch(/2014/);
    expect(await page.locator("#window-title").textContent()).not.toMatch(/2013/);
  });

  test("dirbar has WhatsApp", async ({ page }) => {
    await enterYear(page, "2014");
    await expect(page.locator("#dirbar .dir-btn, .dir-btn", { hasText: "WhatsApp" }).first()).toBeVisible({
      timeout: 15000,
    });
  });
});
