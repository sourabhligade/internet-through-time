// @ts-check
/**
 * 2023 gold — ChatGPT Plus Subscribe.
 * Empty / 0 ticks / GPT-4 trap / live charge never write.
 * Both honesties + leftover note + Subscribe Plus writes itt23-plus { real, plus }.
 */
const { test, expect } = require("@playwright/test");

const KEY = "itt23-plus";
const PLUS = "/years/2023/sites/plus/index.html";

async function getKey(page, key) {
  return page.evaluate((k) => localStorage.getItem(k), key);
}

test.describe("2023 ChatGPT Plus gold", () => {
  test("hub card open · guided 6 · plus dest 200", async ({ page }) => {
    await page.goto("/");
    await expect(page.locator('a.year-card.available[href*="years/2023"]').first()).toBeVisible();
    await expect(page.locator(".year-card.locked.y2020")).toBeVisible();
    await expect(page.locator(".year-card.locked.y2024")).toBeVisible();
    await expect(page.locator(".year-card.locked.y2025")).toBeVisible();

    await page.goto("/years/2023/pages/home.html");
    await expect(page.locator('[data-ott-one-thing="2023"]')).toBeVisible();
    await expect(page.locator("#ott-guided-2023 ol > li")).toHaveCount(6);
    const res = await page.request.get(PLUS);
    expect(res.status()).toBe(200);
    const html = await res.text();
    expect(html).toMatch(/data-plus-go/);
    expect(html).toMatch(/data-p23-go/);
    expect(html).toMatch(/data-next-when-key="itt23-plus"/);
    expect(html).not.toMatch(/data-official-verb/);
  });

  test("empty / trap / 0 ticks never write · Subscribe Plus persists", async ({ page }) => {
    await page.goto(PLUS);
    await page.evaluate((k) => localStorage.removeItem(k), KEY);
    await page.reload();

    await page.locator("[data-plus-go]").click();
    expect(await getKey(page, KEY), "empty subscribe").toBeFalsy();

    await page.locator("[data-p23-trap]").first().click();
    expect(await getKey(page, KEY), "GPT-4 trap").toBeFalsy();

    const reqs = page.locator("[data-p23-req]");
    expect(await reqs.count()).toBeGreaterThanOrEqual(2);
    await page.locator("[data-plus-go]").click();
    expect(await getKey(page, KEY), "0 ticks").toBeFalsy();

    await reqs.nth(0).check();
    await reqs.nth(1).check();
    await page.locator("[data-plus-go]").click();
    expect(await getKey(page, KEY), "ticks only / empty field").toBeFalsy();

    await page.locator("[data-p23-field]").fill("plus leftover $20");
    await page.locator("[data-plus-go]").click();
    await expect.poll(() => getKey(page, KEY), { timeout: 8000 }).toBeTruthy();
    const blob = JSON.parse((await getKey(page, KEY)) || "{}");
    expect(blob.real).toBe(true);
    expect(blob.plus).toBe(true);
    expect(String(blob.year)).toBe("2023");
    expect(blob.multiStep).toBe(true);

    await page.reload();
    const again = JSON.parse((await getKey(page, KEY)) || "{}");
    expect(again.real).toBe(true);
    expect(again.plus).toBe(true);
  });

  test("GPT-4 leftover complete never writes the Plus chip", async ({ page }) => {
    await page.goto("/years/2023/sites/gpt4/index.html");
    await page.evaluate((k) => localStorage.removeItem(k), KEY);
    await page.reload();
    const reqs = page.locator("[data-p23-req]");
    const n = await reqs.count();
    for (let i = 0; i < n; i++) await reqs.nth(i).check();
    const field = page.locator("[data-p23-field]");
    if (await field.count()) await field.fill("gpt-4 leftover");
    await page.locator("[data-p23-go]").first().click();
    expect(await getKey(page, KEY), "leftover dest must not write plus").toBeFalsy();
    const leftover = await getKey(page, "itt23-gpt4");
    expect(leftover).toBeTruthy();
    expect(JSON.parse(leftover || "{}").plus).toBeFalsy();
  });
});
