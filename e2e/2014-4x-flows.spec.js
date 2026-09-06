// @ts-check
/**
 * 2014 leftover 4× — empty go never writes; complete writes leftover key, never the star.
 */
const { test, expect } = require("@playwright/test");

async function getKey(page, key) {
  return page.evaluate((k) => localStorage.getItem(k), key);
}

test("2014 leftover 4× empty then REAL · never writes gold", async ({ page }) => {
  await page.goto("/years/2014/sites/oculus/index.html");
  await page.evaluate(() => {
    localStorage.removeItem("itt14-oc-6x-4x");
    localStorage.removeItem("itt14-wa-install");
  });
  await page.reload();
  const go = page.locator('[data-4x-go="oc-6x-4x"]').first();
  await go.waitFor();
  await go.click();
  expect(await getKey(page, "itt14-oc-6x-4x")).toBeFalsy();
  const hops = page.locator("[data-4x-hop]");
  if ((await hops.count()) >= 2) {
    await hops.nth(0).click();
    await hops.nth(1).click();
  }
  const field = page.locator("[data-4x-field]");
  if ((await field.count()) > 0) await field.first().fill("museum leftover");
  const reqs = page.locator("[data-4x-req]");
  const n = await reqs.count();
  for (let i = 0; i < n; i++) await reqs.nth(i).check();
  await go.click();
  await expect.poll(() => getKey(page, "itt14-oc-6x-4x"), { timeout: 8000 }).toBeTruthy();
  expect(await getKey(page, "itt14-wa-install")).toBeFalsy();
});

test("2014 WhatsApp leftover 4× never writes itt14-wa-install", async ({ page }) => {
  await page.goto("/years/2014/sites/whatsapp/index.html");
  await page.evaluate(() => {
    localStorage.removeItem("itt14-wa-lx-4x");
    localStorage.removeItem("itt14-wa-install");
  });
  await page.reload();
  const go = page.locator('[data-4x-go="wa-lx-4x"]').first();
  await go.waitFor();
  const reqs = page.locator("[data-4x-panel] [data-4x-req]");
  const n = await reqs.count();
  for (let i = 0; i < n; i++) await reqs.nth(i).check();
  const field = page.locator("[data-4x-panel] [data-4x-field]");
  if ((await field.count()) > 0) await field.first().fill("museum leftover");
  const hops = page.locator("[data-4x-panel] [data-4x-hop]");
  if ((await hops.count()) >= 2) {
    await hops.nth(0).click();
    await hops.nth(1).click();
  }
  await go.click();
  await expect.poll(() => getKey(page, "itt14-wa-lx-4x"), { timeout: 8000 }).toBeTruthy();
  expect(await getKey(page, "itt14-wa-install")).toBeFalsy();
});
