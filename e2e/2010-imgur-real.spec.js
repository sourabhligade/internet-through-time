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
    await expect
      .poll(async () => page.evaluate(() => localStorage.getItem("itt10-reddit")))
      .toMatch(/imgur\.residual/i);
    await page.goto("/years/2010/sites/reddit/index.html");
    await page.locator("[data-reddit-sort='newest']").first().click();
    await expect(page.locator("[data-reddit-list]")).toContainText(/imgur\.residual/i);
    await page.reload();
    await page.locator("[data-reddit-sort='newest']").first().click();
    await expect(page.locator("[data-reddit-list]")).toContainText(/imgur\.residual/i);
    const blob = await page.evaluate(() => localStorage.getItem("itt10-reddit"));
    expect(blob).toMatch(/"real":\s*true/);
    expect(blob).toMatch(/"year":\s*"2010"/);
    expect(await page.evaluate(() => localStorage.getItem("itt11-airbnb") || "")).not.toMatch(/imgur/);
  });

  test("empty reddit submit never writes itt10-reddit", async ({ page }) => {
    await page.goto("/years/2010/sites/reddit/submit.html");
    await page.evaluate(() => {
      Object.keys(localStorage)
        .filter((k) => k.startsWith("itt10-reddit"))
        .forEach((k) => localStorage.removeItem(k));
      localStorage.setItem("itt11-airbnb", '{"keep":1}');
    });
    await page.reload();
    await page.waitForTimeout(400);
    await page.locator("form[data-reddit-submit] button[type='submit']").click();
    expect(await page.evaluate(() => localStorage.getItem("itt10-reddit"))).toBeNull();
    await page.fill("form[data-reddit-submit] [name='title']", "no url post");
    await page.locator("form[data-reddit-submit] button[type='submit']").click();
    expect(await page.evaluate(() => localStorage.getItem("itt10-reddit"))).toBeNull();
    expect(await page.evaluate(() => localStorage.getItem("itt11-airbnb"))).toBe('{"keep":1}');
  });
});
