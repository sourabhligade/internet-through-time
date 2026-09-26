// @ts-check
const { test, expect } = require("@playwright/test");

const DOOR = "/app/index.html#/year/2021";

test.describe("2021 MVP", () => {
  test("hub card opens the React year", async ({ page }) => {
    await page.goto("/");
    await page.locator('a.year-card.available[data-year="2021"]').click();
    await expect(page.getByRole("heading", { name: "Ask App Not to Track" })).toBeVisible();
  });

  test("home lists the thesis and six guided steps", async ({ page }) => {
    await page.goto(DOOR);
    const start = page.locator("article.stop");
    for (const t of ["Ask App Not to Track", "Allow never writes", "Signal", "Copilot"]) {
      await expect(start).toContainText(t);
    }
    await expect(start.locator("ol li")).toHaveCount(6);
  });

  test("about bans ChatGPT dest and invented ILS", async ({ page }) => {
    await page.goto(DOOR);
    await page.locator(".rails").getByRole("button", { name: "About 2021" }).click();
    const about = page.locator("article.stop");
    await expect(about).toContainText(/ChatGPT/i);
    await expect(about).toContainText(/4\.9/);
    await expect(about).toContainText(/table ends 2018/i);
    await expect(about).not.toContainText("1,197,982,359");
  });

  test("ATT Ask writes itt21-att · Allow never writes", async ({ page }) => {
    await page.goto(DOOR);
    await page.evaluate(() => localStorage.removeItem("itt21-att"));
    await page.getByRole("button", { name: "1 ATT Ask" }).click();
    const room = page.locator("article.stop");
    await room.getByRole("button", { name: "Allow", exact: true }).click();
    expect(await page.evaluate(() => localStorage.getItem("itt21-att"))).toBeFalsy();
    const reqs = room.locator("input[type='checkbox']");
    const n = await reqs.count();
    for (let i = 0; i < n; i++) await reqs.nth(i).check();
    await room.getByPlaceholder("Museum App").fill("Museum App");
    await room.getByRole("button", { name: "Ask App Not to Track", exact: true }).click();
    await expect.poll(() => page.evaluate(() => localStorage.getItem("itt21-att"))).toBeTruthy();
    const blob = JSON.parse((await page.evaluate(() => localStorage.getItem("itt21-att"))) || "{}");
    expect(blob.official).toBe(true);
    expect(blob.year).toBe("2021");
  });
});
