// @ts-check
/**
 * 2014 leftover 4× — empty go never writes; complete writes leftover key, never the star.
 */
const { test, expect } = require("@playwright/test");
const { revealLeftoverRails , destOnDisk } = require('./helpers');

async function getKey(page, key) {
  return page.evaluate((k) => localStorage.getItem(k), key);
}

test("2014 leftover 4× empty then REAL · never writes gold", async ({ page }) => {
  const fs = require("fs");
  const path = require("path");
  test.skip(
    !fs.existsSync(path.join(__dirname, "..", "years/2014/sites/oculus/index.html")) ||
      !fs.readFileSync(path.join(__dirname, "..", "years/2014/sites/oculus/index.html"), "utf8").includes("data-4x-go"),
    "2014 dest-lock leftover 4× is 0"
  );
  test.skip(!destOnDisk('/years/2014/sites/oculus/index.html'), 'dest-lock');
    await page.goto("/years/2014/sites/oculus/index.html");
  await page.evaluate(() => {
    localStorage.removeItem("itt14-oc-6x-4x");
    localStorage.removeItem("itt14-wa-install");
  });
  await page.reload();
  await revealLeftoverRails(page);
  const go = page.locator('[data-4x-go="oc-6x-4x"]').first();
  await go.waitFor({ state: "attached" });
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
  test.skip(!destOnDisk("/years/2014/sites/whatsapp/index.html") ||
    !require("fs").readFileSync(require("path").join(__dirname, "..", "years/2014/sites/whatsapp/index.html"), "utf8").includes("data-4x-go"),
    "2014 dest-lock leftover 4× is 0");
  await page.goto("/years/2014/sites/whatsapp/index.html");
  await page.evaluate(() => {
    localStorage.removeItem("itt14-wa-lx-4x");
    localStorage.removeItem("itt14-wa-install");
  });
  await page.reload();
  await revealLeftoverRails(page);
  const go = page.locator('[data-4x-go="wa-lx-4x"]').first();
  await go.waitFor({ state: "attached" });
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

async function leftover4x(page, href, go, key, star) {
  await page.goto(href);
  await page.evaluate(({ k, s }) => {
    localStorage.removeItem(k);
    localStorage.removeItem(s);
  }, { k: key, s: star });
  await page.reload();
  await revealLeftoverRails(page);
  const panel = page.locator(`[data-4x-panel]:has([data-4x-go="${go}"])`).first();
  const btn = panel.locator(`[data-4x-go="${go}"]`);
  await btn.waitFor({ state: "attached" });
  await btn.click();
  expect(await getKey(page, key)).toBeFalsy();
  const hops = panel.locator("[data-4x-hop]");
  if ((await hops.count()) >= 2) {
    await hops.nth(0).click();
    await hops.nth(1).click();
  }
  const field = panel.locator("[data-4x-field]");
  if ((await field.count()) > 0) await field.first().fill("museum leftover");
  const reqs = panel.locator("[data-4x-req]");
  const n = await reqs.count();
  for (let i = 0; i < n; i++) await reqs.nth(i).check();
  await btn.click();
  await expect.poll(() => getKey(page, key), { timeout: 8000 }).toBeTruthy();
  expect(await getKey(page, star)).toBeFalsy();
}

test("2014 Serial leftover 4× never writes itt14-wa-install", async ({ page }) => {
  test.skip(!destOnDisk("/years/2014/sites/serial/index.html"), "dest-lock");
  await leftover4x(page, "/years/2014/sites/serial/index.html", "se-6x-4x", "itt14-se-6x-4x", "itt14-wa-install");
});

test("2014 Snap leftover 4× never writes itt14-wa-install", async ({ page }) => {
  const fs = require("fs");
  const path = require("path");
  const snap = path.join(__dirname, "..", "years/2014/sites/snapchat/index.html");
  test.skip(!fs.existsSync(snap) || !fs.readFileSync(snap, "utf8").includes("data-4x-go"), "2014 dest-lock leftover 4× is 0");
  await leftover4x(page, "/years/2014/sites/snapchat/index.html", "snap-lx-4x", "itt14-snap-lx-4x", "itt14-wa-install");
});
