// @ts-check
const { test, expect } = require("@playwright/test");

const DOOR = "/app/index.html#/year/2021";

async function getKey(page, key) {
  return page.evaluate((k) => localStorage.getItem(k), key);
}

test("every 2021 save link writes only its own key", async ({ page }) => {
  test.setTimeout(120000);
  await page.goto(DOOR);
  const labels = (await page.locator(".rails button").allTextContents()).filter((text) => /^\d+ /.test(text));
  expect(labels).toHaveLength(13);
  for (const label of labels) {
    const n = Number(label.split(" ")[0]);
    await page.getByRole("button", { name: label, exact: true }).click();
    const room = page.locator("article.stop");
    const key = ((await room.locator("code").first().textContent()) || "").trim();
    await page.evaluate((k) => {
      localStorage.removeItem(k);
      localStorage.removeItem("itt21-att");
    }, key);
    const trap = room.locator(".actions button").first();
    await trap.click();
    expect(await getKey(page, key), label).toBeFalsy();
    const verb = room.locator(".actions button").last();
    await verb.click();
    expect(await getKey(page, key), label).toBeFalsy();
    const boxes = room.locator("input[type='checkbox']");
    await boxes.nth(0).check();
    await boxes.nth(1).check();
    await room.locator("input:not([type='checkbox'])").fill("flow link");
    await verb.click();
    await expect.poll(() => getKey(page, key)).toBeTruthy();
    const blob = JSON.parse((await getKey(page, key)) || "{}");
    expect(blob.year, label).toBe("2021");
    if (n <= 10) expect(blob.official, label).toBe(true);
    else {
      expect(blob.leftover, label).toBe(true);
      expect(await getKey(page, "itt21-att"), label).toBeFalsy();
    }
  }
  for (const name of ["Amazon", "Google", "Instagram", "Twitter", "YouTube"]) {
    await page.getByRole("button", { name, exact: true }).click();
    await expect(page.locator("article.stop h1")).toHaveText(name);
    expect(await getKey(page, "itt21-att"), name).toBeFalsy();
  }
});
