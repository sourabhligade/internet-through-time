// @ts-check
/** 2003 Photobucket album → MySpace hotlink apply */
const { test, expect } = require("@playwright/test");

test.describe("2003 Photobucket → MySpace", () => {
  test("empty upload blocked; upload then apply shows on profile", async ({ page }) => {
    await page.goto("/years/2003/sites/photobucket/index.html");
    await page.evaluate(() => {
      Object.keys(localStorage)
        .filter((k) => k.startsWith("itt03-photobucket") || k.startsWith("itt03-myspace"))
        .forEach((k) => localStorage.removeItem(k));
    });
    await page.reload();
    await page.waitForTimeout(500);

    await page.locator("form[data-pb-upload] button[type='submit']").click();
    await expect
      .poll(async () => page.evaluate(() => localStorage.getItem("itt03-photobucket-album")))
      .toBeNull();

    await page.fill("#ott-field", "party.jpg");
    await page.locator("form[data-pb-upload] button[type='submit']").click();
    await expect
      .poll(async () => {
        const raw = await page.evaluate(() => localStorage.getItem("itt03-photobucket-album"));
        return raw && raw.includes("party");
      })
      .toBeTruthy();

    await page.goto("/years/2003/sites/photobucket/codes.html");
    await page.waitForTimeout(400);
    await expect(page.locator("[data-pb-codes]")).toContainText(/party/i);

    await page.goto("/years/2003/sites/myspace/index.html");
    await page.waitForTimeout(500);
    await page.locator("[data-pb-apply]").click();
    await expect(page.locator("[data-pb-hotlinks]")).toContainText(/party/i);
    await expect(page.locator("[data-pb-hotlinks] img[data-pb-img]")).toHaveAttribute("alt", /party/i);
    await page.reload();
    await page.waitForTimeout(400);
    await expect(page.locator("[data-pb-hotlinks] img[data-pb-img]")).toBeVisible();
    await expect(page.locator("[data-pb-hotlinks] img[data-pb-img]")).toHaveAttribute("alt", /party/i);
  });
});
