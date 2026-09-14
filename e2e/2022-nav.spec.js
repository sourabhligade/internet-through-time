// @ts-check
const { test, expect } = require("@playwright/test");

test.describe("2022 chrome nav", () => {
  test("one toolbar; home and back work after ChatGPT", async ({ page }) => {
    await page.goto("/years/2022/index.html?navok2=1");
    await page.evaluate(() => {
      document.querySelectorAll(".dialog, #modal-backdrop, #connect-overlay").forEach((el) => {
        el.classList.add("hidden");
        el.style.display = "none";
      });
    });
    await expect(page.locator("#toolbar")).toHaveCount(1);
    const frame = page.frameLocator("#content");
    await expect(frame.locator('a[href*="chatgpt"]').first()).toBeVisible({ timeout: 15000 });
    await frame.locator('a[href*="chatgpt"]').first().click();
    await expect.poll(async () => {
      try {
        return page.frameLocator("#content").locator("[data-official-verb]").count();
      } catch (e) {
        return 0;
      }
    }).toBeGreaterThan(0);
    await page.locator("#btn-back").click({ force: true });
    await expect.poll(async () => {
      try {
        return page.evaluate(() =>
          document.getElementById("content").contentDocument.location.pathname
        );
      } catch (e) {
        return "";
      }
    }).toMatch(/home/);
    await frame.locator('a[href*="chatgpt"]').first().click();
    await page.waitForTimeout(400);
    await page.evaluate(() => {
      document.querySelectorAll(".dialog, #modal-backdrop").forEach((el) => {
        el.classList.add("hidden");
        el.style.display = "none";
      });
    });
    await page.locator("#btn-home").click({ force: true });
    await expect.poll(async () => {
      try {
        return page.evaluate(() =>
          document.getElementById("content").contentDocument.location.pathname
        );
      } catch (e) {
        return "";
      }
    }).toMatch(/home/);
  });
});
