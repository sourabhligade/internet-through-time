// @ts-check
const { test, expect } = require("@playwright/test");

const DOOR = "/app/index.html#/year/2017";

async function getKey(page, key) {
  return page.evaluate((k) => localStorage.getItem(k), key);
}

test.describe("2017 MVP", () => {
  test("2017 card opens the React year", async ({ page }) => {
    await page.goto("/");
    const card = page.locator("a.year-card.available[data-year='2017']");
    await expect(card).toBeVisible();
    await expect(card).toHaveAttribute("href", /app\/index\.html#\/year\/2017/);
    await expect(page.locator(".year-card.locked.y2017")).toHaveCount(0);
  });

  test("React door shows Face ID and six guided steps", async ({ page }) => {
    await page.goto(DOOR);
    await expect(page.getByRole("heading", { name: "Face ID" })).toBeVisible();
    await expect(page.locator("article.stop ol > li")).toHaveCount(6);
  });

  test("empty swipe / Home trap never write; Look then Swipe up writes", async ({ page }) => {
    await page.goto(DOOR);
    await page.evaluate(() => localStorage.removeItem("itt17-faceid"));
    await page.getByRole("button", { name: "1 Face ID / iPhone X" }).click();
    const room = page.locator("article.stop");
    await room.getByRole("button", { name: "Home button (trap)" }).click();
    expect(await getKey(page, "itt17-faceid")).toBeFalsy();
    await room.getByRole("button", { name: "Swipe up" }).click();
    expect(await getKey(page, "itt17-faceid")).toBeFalsy();
    await room.locator("input[type='checkbox']").first().check();
    await room.getByPlaceholder("Look").fill("looked");
    await room.getByRole("button", { name: "Swipe up" }).click();
    await expect.poll(() => getKey(page, "itt17-faceid")).toBeTruthy();
    const blob = JSON.parse((await getKey(page, "itt17-faceid")) || "{}");
    expect(blob.official).toBe(true);
    expect(blob.year).toBe("2017");
  });

  test("about dual-cite", async ({ page }) => {
    await page.goto(DOOR);
    await page.locator(".rails").getByRole("button", { name: "About 2017" }).click();
    const about = page.locator("article.stop");
    await expect(about).toContainText("1,766,926,408");
    await expect(about).toContainText(/Face ID/i);
  });
});
