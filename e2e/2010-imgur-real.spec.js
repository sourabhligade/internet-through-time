// @ts-check
/**
 * 2010 Imgur → Reddit viral loop
 * Keys: itt10-imgur-album · itt10-imgur
 */
const { test, expect } = require("@playwright/test");

async function clearImgur(page) {
  await page.evaluate(() => {
    Object.keys(localStorage)
      .filter((k) => k.startsWith("itt10-imgur"))
      .forEach((k) => localStorage.removeItem(k));
  });
}

test.describe("2010 Imgur → Reddit real loop", () => {
  test("empty upload blocked; upload prefills Reddit submit", async ({ page }) => {
    await page.goto("/years/2010/sites/imgur/index.html");
    await clearImgur(page);
    await page.reload();
    await page.waitForTimeout(500);

    await page.locator("form[data-ig-upload] button[type='submit']").click();
    expect(await page.evaluate(() => localStorage.getItem("itt10-imgur"))).toBeNull();

    await page.fill("#ott-field", "meme residual.png");
    await page.locator("form[data-ig-upload] button[type='submit']").click();
    await expect
      .poll(async () => page.evaluate(() => localStorage.getItem("itt10-imgur")))
      .toMatch(/meme/);
    await expect(page.locator("[data-ig-album]")).toContainText(/meme residual/i);
    await expect(page.locator("[data-ig-link]")).toContainText(/imgur\.residual/i);

    const href = await page.locator("a[data-ig-reddit]").first().getAttribute("href");
    expect(href).toMatch(/reddit\/submit\.html/);
    expect(href).toMatch(/title=/);
    expect(href).toMatch(/url=/);

    await page.locator("a[data-ig-reddit]").first().click();
    await expect(page.locator("form[data-reddit-submit] [name='title']")).toHaveValue(/meme residual/i);
    await expect(page.locator("form[data-reddit-submit] [name='url']")).toHaveValue(/imgur\.residual/i);

    await page.locator("form[data-reddit-submit] button[type='submit']").click();
    await expect(page.locator("[data-reddit-status]")).toContainText(/Submitted/i);
  });
});
