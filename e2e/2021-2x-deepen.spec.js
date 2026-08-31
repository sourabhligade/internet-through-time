// @ts-check
/**
 * 2021 2× deepen — home strip + product theaters.
 * 4× leftover pack still walked by 2x-links-all-years.spec.js.
 * 2022 dests stay boarded.
 */
const { test, expect } = require("@playwright/test");

async function getKey(page, key) {
  return page.evaluate((k) => localStorage.getItem(k), key);
}

/**
 * @param {import('@playwright/test').Page} page
 * @param {{path:string,key:string,kind:string}} spec
 */
async function walkTheater(page, spec) {
  await page.goto(spec.path);
  await page.evaluate((k) => localStorage.removeItem(k), spec.key);
  await page.reload();
  await expect(page.locator('html[data-4x-ready="1"]')).toBeAttached({ timeout: 15000 });
  const go = page.locator("[data-p21-go]");
  await expect(go).toBeVisible();
  await expect(page.locator("[data-dest-field]")).toHaveCount(0);
  await go.click();
  await expect.poll(async () => getKey(page, spec.key)).toBeFalsy();
  await page.locator("[data-p21-trap]").first().click();
  await expect.poll(async () => getKey(page, spec.key)).toBeFalsy();
  const ticks = page.locator("[data-p21-req]");
  const n = await ticks.count();
  for (let i = 0; i < n; i++) await ticks.nth(i).check();
  if (spec.kind === "query") {
    await page.locator("[data-p21-field]").fill("ok leftover");
  } else if (spec.kind === "hops") {
    const hops = page.locator("[data-p21-hop]");
    expect(await hops.count()).toBeGreaterThanOrEqual(2);
    await hops.nth(0).click();
    await hops.nth(1).click();
  } else if (spec.kind === "wait") {
    await page.locator("[data-p21-wait]").click();
    await page.waitForTimeout(2200);
  }
  await go.click();
  await expect.poll(async () => getKey(page, spec.key), { timeout: 8000 }).toBeTruthy();
  const blob = JSON.parse((await getKey(page, spec.key)) || "{}");
  expect(blob.real).toBe(true);
  expect(String(blob.year)).toBe("2021");
}

test.describe("2021 2× deepen", () => {
  test("home deepen strip 32 dests + star · guided still 6", async ({ page }) => {
    await page.goto("/years/2021/pages/home.html");
    await expect(page.locator("#ott-guided-2021 ol li")).toHaveCount(6);
    const strip = page.locator("#itt-year-start-extra #ott-2x-2021-dp");
    await expect(strip).toBeVisible();
    const dests = strip.locator("a[href*='sites/'][data-trail-keys$='-dp']");
    await expect(dests).toHaveCount(32);
    await expect(strip.locator("a[href*='sites/att']")).toBeVisible();
    const first = dests.first();
    await expect(first).toHaveAttribute("href", /shorts/);
    const res = await page.goto("/years/2021/sites/shorts/index.html");
    expect(res && res.ok()).toBeTruthy();
    await expect(page.locator("[data-p21-theater]")).toBeVisible();
  });

  test("Shorts hops · TikTok trap never writes", async ({ page }) => {
    await walkTheater(page, {
      path: "/years/2021/sites/shorts/index.html",
      key: "itt21-shorts-dp",
      kind: "hops",
    });
  });

  test("AirTag query · live Find My trap never writes", async ({ page }) => {
    await walkTheater(page, {
      path: "/years/2021/sites/airtag/index.html",
      key: "itt21-airtag-dp",
      kind: "query",
    });
  });

  test("Log4j checks · exploit trap never writes", async ({ page }) => {
    await walkTheater(page, {
      path: "/years/2021/sites/log4j/index.html",
      key: "itt21-log4j-dp",
      kind: "checks",
    });
  });

  test("Relay wait · VPN trap never writes", async ({ page }) => {
    await walkTheater(page, {
      path: "/years/2021/sites/relay/index.html",
      key: "itt21-relay-dp",
      kind: "wait",
    });
  });
});
