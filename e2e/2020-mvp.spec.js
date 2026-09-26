// @ts-check
const { test, expect } = require("@playwright/test");

async function getKey(page, key) {
  return page.evaluate((k) => localStorage.getItem(k), key);
}

test.describe("2020 MVP", () => {
  test("2020 card opens the React year", async ({ page }) => {
    await page.goto("/");
    const card = page.locator("a.year-card.available[data-year='2020']");
    await expect(card).toBeVisible();
    await expect(card).toHaveAttribute("href", /app\/index\.html#\/year\/2020/);
    await expect(page.locator(".year-card.locked.y2020")).toHaveCount(0);
  });

  test("React door shows Zoom Leave and six guided steps", async ({ page }) => {
    await page.goto("/app/index.html#/year/2020");
    await expect(page.getByRole("heading", { name: "Zoom Leave" })).toBeVisible();
    await expect(page.locator("article.stop ol > li")).toHaveCount(6);
  });

  test("Stay / empty never writes; mute + chat + Leave writes", async ({ page }) => {
    await page.goto("/app/index.html#/year/2020");
    await page.evaluate(() => localStorage.removeItem("itt20-zoom"));
    await page.getByRole("button", { name: "1 Zoom Leave" }).click();
    const room = page.locator("article.stop");
    await room.getByRole("button", { name: "Stay" }).click();
    expect(await getKey(page, "itt20-zoom")).toBeFalsy();
    await room.getByRole("button", { name: "Leave", exact: true }).click();
    expect(await getKey(page, "itt20-zoom")).toBeFalsy();
    const boxes = room.locator("input[type='checkbox']");
    const n = await boxes.count();
    for (let i = 0; i < n; i++) await boxes.nth(i).check();
    await room.getByPlaceholder("chat leftover").fill("brb leftover");
    await room.getByRole("button", { name: "Leave", exact: true }).click();
    await expect.poll(() => getKey(page, "itt20-zoom")).toBeTruthy();
    const blob = JSON.parse((await getKey(page, "itt20-zoom")) || "{}");
    expect(blob.official).toBe(true);
    expect(blob.year).toBe("2020");
  });
});
