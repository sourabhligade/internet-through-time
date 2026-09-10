// @ts-check
/**
 * 2004 dest-true official dests — Firefox / Digg / Web 2.0 + Photobucket key.
 * Trap / empty never write. Period control writes official:true.
 */
const { test, expect } = require("@playwright/test");

async function getKey(page, key) {
  return page.evaluate((k) => localStorage.getItem(k), key);
}

async function openClear(page, path, keys) {
  const list = Array.isArray(keys) ? keys : [keys];
  await page.goto(path);
  await page.evaluate((ks) => {
    ks.forEach((k) => {
      try {
        localStorage.removeItem(k);
      } catch (e) {
        /* */
      }
    });
  }, list);
  await page.reload();
}

test.describe("2004 dest-true official", () => {
  test("Firefox Download trap / 0 ticks never write · ticks write itt04-fx", async ({ page }) => {
    await openClear(page, "/years/2004/sites/firefox/index.html", ["itt04-fx", "itt04-thefacebook-networks"]);
    await expect(page.locator("body")).not.toContainText(/Official note/i);
    await page.locator("[data-official-trap]").first().click();
    expect(await getKey(page, "itt04-fx")).toBeFalsy();
    await page.locator("[data-official-verb]").click();
    expect(await getKey(page, "itt04-fx")).toBeFalsy();
    const reqs = page.locator("[data-official-req]");
    const n = await reqs.count();
    for (let i = 0; i < n; i++) await reqs.nth(i).check();
    await page.locator("[data-official-verb]").click();
    await expect.poll(() => getKey(page, "itt04-fx"), { timeout: 8000 }).toBeTruthy();
    const blob = JSON.parse((await getKey(page, "itt04-fx")) || "{}");
    expect(blob.official).toBe(true);
    expect(blob.year).toBe("2004");
    expect(await getKey(page, "itt04-thefacebook-networks")).toBeFalsy();
    const next = page.locator('[data-next-when-key="itt04-fx"] a').first();
    if (await next.count()) {
      const href = await next.getAttribute("href");
      const res = await page.request.get(new URL(href || "", page.url()).pathname);
      expect(res.status()).toBe(200);
    }
  });

  test("Digg seed trap / incomplete never write · pick + ticks write itt04-digg", async ({ page }) => {
    await openClear(page, "/years/2004/sites/digg/index.html", ["itt04-digg", "itt04-thefacebook-networks"]);
    await expect(page.locator("body")).not.toContainText(/Official note/i);
    await page.locator("[data-official-trap]").first().click();
    expect(await getKey(page, "itt04-digg")).toBeFalsy();
    await page.locator("[data-official-verb]").click();
    expect(await getKey(page, "itt04-digg")).toBeFalsy();
    await page.locator('[data-official-pick="firefox"]').click();
    const reqs = page.locator("[data-official-req]");
    const n = await reqs.count();
    for (let i = 0; i < n; i++) await reqs.nth(i).check();
    await page.locator("[data-official-verb]").click();
    await expect.poll(() => getKey(page, "itt04-digg"), { timeout: 8000 }).toBeTruthy();
    expect(JSON.parse((await getKey(page, "itt04-digg")) || "{}").official).toBe(true);
    expect(await getKey(page, "itt04-thefacebook-networks")).toBeFalsy();
  });

  test("Web 2.0 Register empty / trap never write · name + ticks write itt04-web20", async ({ page }) => {
    await openClear(page, "/years/2004/sites/web20conference/index.html", ["itt04-web20"]);
    await expect(page.locator("body")).not.toContainText(/Official note/i);
    await page.locator("[data-official-trap]").first().click();
    expect(await getKey(page, "itt04-web20")).toBeFalsy();
    await page.locator("[data-official-verb]").click();
    expect(await getKey(page, "itt04-web20")).toBeFalsy();
    await page.locator("[data-official-need]").fill("Ada Lovelace");
    const reqs = page.locator("[data-official-req]");
    const n = await reqs.count();
    for (let i = 0; i < n; i++) await reqs.nth(i).check();
    await page.locator("[data-official-verb]").click();
    await expect.poll(() => getKey(page, "itt04-web20"), { timeout: 8000 }).toBeTruthy();
    expect(JSON.parse((await getKey(page, "itt04-web20")) || "{}").official).toBe(true);
  });
});

test("2003 Photobucket gold has official-key", async ({ page }) => {
  await page.goto("/years/2003/sites/photobucket/index.html");
  await expect(page.locator("html")).toHaveAttribute("data-official-key", "itt03-photobucket");
});
