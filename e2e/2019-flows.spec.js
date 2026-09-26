// @ts-check
const { test, expect } = require("@playwright/test");

const DOOR = "/app/index.html#/year/2019";

async function getKey(page, key) {
  return page.evaluate((k) => localStorage.getItem(k), key);
}

test.describe("2019 flows", () => {
  test("2019 card opens the React year", async ({ page }) => {
    await page.goto("/");
    await expect(page.locator("a.year-card.available[data-year='2019']")).toHaveAttribute(
      "href",
      /app\/index\.html#\/year\/2019/
    );
  });

  test("guided stays exactly 6", async ({ page }) => {
    await page.goto(DOOR);
    await expect(page.locator("article.stop ol > li")).toHaveCount(6);
    await expect(page.getByRole("heading", { name: "Disney+ Continue" })).toBeVisible();
  });

  test("Disney+ trial / empty never writes; Continue writes", async ({ page }) => {
    await page.goto(DOOR);
    await page.evaluate(() => localStorage.removeItem("itt19-disneyplus"));
    await page.getByRole("button", { name: "1 Disney+ Continue" }).click();
    const room = page.locator("article.stop");
    await room.getByRole("button", { name: "Continue", exact: true }).click();
    expect(await getKey(page, "itt19-disneyplus")).toBeFalsy();
    await room.getByRole("button", { name: "Start weeklong trial" }).click();
    expect(await getKey(page, "itt19-disneyplus")).toBeFalsy();
    const boxes = room.locator("input[type='checkbox']");
    await boxes.nth(0).check();
    await boxes.nth(1).check();
    await room.getByRole("button", { name: "Adult" }).click();
    await room.getByRole("button", { name: "The Mandalorian" }).click();
    await room.getByRole("button", { name: "Frozen 2" }).click();
    await room.getByRole("button", { name: "Kids" }).click();
    await room.getByRole("button", { name: "Adult" }).click();
    await room.getByRole("button", { name: "Continue", exact: true }).click();
    await expect.poll(() => getKey(page, "itt19-disneyplus")).toBeTruthy();
    const blob = JSON.parse((await getKey(page, "itt19-disneyplus")) || "{}");
    expect(blob.official).toBe(true);
    expect(blob.year).toBe("2019");
  });

  test("TikTok empty never writes; honesty + note writes", async ({ page }) => {
    await page.goto(DOOR);
    await page.evaluate(() => localStorage.removeItem("itt19-tiktok"));
    await page.getByRole("button", { name: "2 TikTok For You" }).click();
    const room = page.locator("article.stop");
    await room.getByRole("button", { name: "Post", exact: true }).click();
    expect(await getKey(page, "itt19-tiktok")).toBeFalsy();
    const boxes = room.locator("input[type='checkbox']");
    await boxes.nth(0).check();
    await boxes.nth(1).check();
    await room.getByPlaceholder("leftover note").fill("museum leftover");
    await room.getByRole("button", { name: "Post", exact: true }).click();
    await expect.poll(() => getKey(page, "itt19-tiktok")).toBeTruthy();
  });
});
