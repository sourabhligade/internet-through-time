// @ts-check
/**
 * 2023 deepen product theaters — first click is the period verb.
 * 4× leftover pack still walked by 2x-links-all-years.spec.js.
 */
const { test, expect } = require("@playwright/test");


async function getKey(page, key) {
  return page.evaluate((k) => localStorage.getItem(k), key);
}

/**
 * @param {import("@playwright/test").Page} page
 * @param {{path:string,key:string,kind:string}} spec
 */
async function walkTheater(page, spec) {
  await page.goto(spec.path);
  await page.evaluate((k) => localStorage.removeItem(k), spec.key);
  await page.reload();
  const go = page.locator("[data-p23-go]");
  await expect(go).toBeVisible();
  await expect(page.locator("[data-dest-field]")).toHaveCount(0);
  await go.click();
  await expect.poll(async () => getKey(page, spec.key)).toBeFalsy();
  await page.locator("[data-p23-trap]").first().click();
  await expect.poll(async () => getKey(page, spec.key)).toBeFalsy();
  const ticks = page.locator("[data-p23-req]");
  const n = await ticks.count();
  for (let i = 0; i < n; i++) await ticks.nth(i).check();
  if (spec.kind === "query") {
    await page.locator("[data-p23-field]").fill("ok leftover");
  } else if (spec.kind === "hops") {
    const hops = page.locator("[data-p23-hop]");
    expect(await hops.count()).toBeGreaterThanOrEqual(2);
    await hops.nth(0).click();
    await hops.nth(1).click();
  }
  await go.click();
  await expect.poll(async () => getKey(page, spec.key), { timeout: 8000 }).toBeTruthy();
  const blob = JSON.parse((await getKey(page, spec.key)) || "{}");
  expect(blob.real).toBe(true);
  expect(String(blob.year)).toBe("2023");
  expect(blob.plus).toBeFalsy();
}

test("2023 plugins theater query", async ({ page }) => {
  await walkTheater(page, {
    path: "/years/2023/sites/plugins/index.html",
    key: "itt23-plugins-dp",
    kind: "query",
  });
});

test("2023 DevDay theater checks · Store trap", async ({ page }) => {
  await walkTheater(page, {
    path: "/years/2023/sites/devday/index.html",
    key: "itt23-devday-dp",
    kind: "checks",
  });
});

test("2023 Vision Pro theater hops · ships-2024 trap", async ({ page }) => {
  await walkTheater(page, {
    path: "/years/2023/sites/visionpro/index.html",
    key: "itt23-visionpro-dp",
    kind: "hops",
  });
});

test("2023 Gemini leftover never writes Plus", async ({ page }) => {
  await walkTheater(page, {
    path: "/years/2023/sites/gemini/index.html",
    key: "itt23-gemini-dp",
    kind: "query",
  });
  expect(await getKey(page, "itt23-plus")).toBeFalsy();
});
