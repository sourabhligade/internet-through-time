// @ts-check
const { test, expect } = require("@playwright/test");

const DOOR = "/app/index.html#/year/2019";

async function getKey(page, key) {
  return page.evaluate((k) => localStorage.getItem(k), key);
}

test("every 2019 room link saves only its own key", async ({ page }) => {
  test.setTimeout(180000);
  await page.goto(DOOR);
  const labels = (await page.locator(".rails button").allTextContents()).filter((text) => /^\d+ /.test(text));
  expect(labels.length).toBeGreaterThan(70);

  for (const label of labels) {
    const n = Number(label.split(" ")[0]);
    await page.getByRole("button", { name: label, exact: true }).click();
    const room = page.locator("article.stop");
    const key = (await room.locator("code").first().textContent()) || "";
    await page.evaluate((k) => {
      localStorage.removeItem(k);
      localStorage.removeItem("itt19-disneyplus");
    }, key);

    if (n === 1) {
      await room.getByRole("button", { name: "Continue", exact: true }).click();
      expect(await getKey(page, key), label).toBeFalsy();
      await room.getByRole("button", { name: "Start weeklong trial" }).click();
      expect(await getKey(page, key), label).toBeFalsy();
      const boxes = room.locator("input[type='checkbox']");
      await boxes.nth(0).check();
      await boxes.nth(1).check();
      await room.getByRole("button", { name: "Adult" }).click();
      await room.getByRole("button", { name: "The Mandalorian" }).click();
      await room.getByRole("button", { name: "Frozen 2" }).click();
      await room.getByRole("button", { name: "Continue", exact: true }).click();
    } else {
      await room.getByRole("button", { name: "Disney+ as gold (trap)", exact: true }).click();
      expect(await getKey(page, key), label).toBeFalsy();
      const verb = room.locator(".actions button").last();
      await verb.click();
      expect(await getKey(page, key), label).toBeFalsy();
      const boxes = room.locator("input[type='checkbox']");
      await boxes.nth(0).check();
      await boxes.nth(1).check();
      await room.getByPlaceholder("leftover note").fill("flow link");
      await verb.click();
    }

    await expect.poll(() => getKey(page, key), { timeout: 3000 }).toBeTruthy();
    const blob = JSON.parse((await getKey(page, key)) || "{}");
    expect(blob.year, label).toBe("2019");
    if (n <= 10) expect(blob.official, label).toBe(true);
    else {
      expect(blob.leftover, label).toBe(true);
      expect(await getKey(page, "itt19-disneyplus"), label).toBeFalsy();
    }
  }
});
