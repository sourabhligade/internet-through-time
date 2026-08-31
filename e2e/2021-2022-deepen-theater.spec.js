// @ts-check
/**
 * 2021/2022 deepen product theaters — first click is the period verb.
 * 4× leftover pack still walked by 2x-links-all-years.spec.js.
 */
const { test, expect } = require("@playwright/test");


async function getKey(page, key) {
  return page.evaluate((k) => localStorage.getItem(k), key);
}

/**
 * @param {import('@playwright/test').Page} page
 * @param {{path:string,key:string,ns:string,kind:string,trap?:string}} spec
 */
async function walkTheater(page, spec) {
  await page.goto(spec.path);
  await page.evaluate((k) => localStorage.removeItem(k), spec.key);
  await page.reload();
  const ns = spec.ns;
  const go = page.locator(`[data-${ns}-go]`);
  await expect(go).toBeVisible();
  await expect(page.locator("[data-dest-field]")).toHaveCount(0);
  await go.click();
  await expect.poll(async () => getKey(page, spec.key)).toBeFalsy();
  if (spec.trap) {
    await page.locator(`[data-${ns}-trap]`).first().click();
    await expect.poll(async () => getKey(page, spec.key)).toBeFalsy();
  }
  const ticks = page.locator(`[data-${ns}-req]`);
  const n = await ticks.count();
  for (let i = 0; i < n; i++) await ticks.nth(i).check();
  if (spec.kind === "query") {
    await page.locator(`[data-${ns}-field]`).fill("ok leftover");
  } else if (spec.kind === "hops") {
    const hops = page.locator(`[data-${ns}-hop]`);
    expect(await hops.count()).toBeGreaterThanOrEqual(2);
    await hops.nth(0).click();
    await hops.nth(1).click();
  } else if (spec.kind === "wait") {
    await page.locator(`[data-${ns}-wait]`).click();
    await page.waitForTimeout(2200);
  }
  await go.click();
  await expect.poll(async () => getKey(page, spec.key), { timeout: 8000 }).toBeTruthy();
  const blob = JSON.parse((await getKey(page, spec.key)) || "{}");
  expect(blob.real).toBe(true);
  expect(String(blob.year)).toBe(spec.key.slice(3, 5) === "21" ? "2021" : "2022");
}

test("2021 AirTag theater query", async ({ page }) => {
  await walkTheater(page, {
    path: "/years/2021/sites/airtag/index.html",
    key: "itt21-airtag-dp",
    ns: "p21",
    kind: "query",
    trap: "1",
  });
});

test("2021 Log4j theater checks · exploit trap", async ({ page }) => {
  await walkTheater(page, {
    path: "/years/2021/sites/log4j/index.html",
    key: "itt21-log4j-dp",
    ns: "p21",
    kind: "checks",
    trap: "1",
  });
});

test("2021 Shorts theater hops", async ({ page }) => {
  await walkTheater(page, {
    path: "/years/2021/sites/shorts/index.html",
    key: "itt21-shorts-dp",
    ns: "p21",
    kind: "hops",
    trap: "1",
  });
});

test("2021 Relay theater wait", async ({ page }) => {
  await walkTheater(page, {
    path: "/years/2021/sites/relay/index.html",
    key: "itt21-relay-dp",
    ns: "p21",
    kind: "wait",
    trap: "1",
  });
});

test("2022 Copilot GA theater query · GPT-4 trap", async ({ page }) => {
  await walkTheater(page, {
    path: "/years/2022/sites/copilotga/index.html",
    key: "itt22-copga-dp",
    ns: "p22",
    kind: "query",
    trap: "1",
  });
});

test("2022 FTX theater checks · trade trap", async ({ page }) => {
  await walkTheater(page, {
    path: "/years/2022/sites/ftx/index.html",
    key: "itt22-ftx-dp",
    ns: "p22",
    kind: "checks",
    trap: "1",
  });
});

test("2022 iOS 16 theater hops", async ({ page }) => {
  await walkTheater(page, {
    path: "/years/2022/sites/ios16/index.html",
    key: "itt22-ios16-dp",
    ns: "p22",
    kind: "hops",
    trap: "1",
  });
});

test("2022 Gen-2 theater query · last dest Next is Send", async ({ page }) => {
  await walkTheater(page, {
    path: "/years/2022/sites/gen2/index.html",
    key: "itt22-gen2-dp",
    ns: "p22",
    kind: "query",
    trap: "1",
  });
  const res = await page.request.get("/years/2022/sites/chatgpt/index.html");
  expect(res.status()).toBe(200);
});
