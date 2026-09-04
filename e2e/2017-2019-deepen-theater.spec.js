// @ts-check
/**
 * 2017–2019 leftover deepen theaters — first click is the period verb.
 * 4× leftover pack still walked by 2x-links-all-years.spec.js.
 */
const { test, expect } = require("@playwright/test");


async function getKey(page, key) {
  return page.evaluate((k) => localStorage.getItem(k), key);
}

/**
 * @param {import('@playwright/test').Page} page
 * @param {{path:string,key:string,ns:string,kind:string}} spec
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
  await page.locator(`[data-${ns}-trap]`).first().click();
  await expect.poll(async () => getKey(page, spec.key)).toBeFalsy();
  const ticks = page.locator(`[data-${ns}-req]`);
  const n = await ticks.count();
  expect(n).toBeGreaterThanOrEqual(2);
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
}

test("2017 Face ID gold dest is still Face ID, leftover Cloudbleed never writes gold", async ({ page }) => {
  await page.goto("/years/2017/sites/iphone/x.html");
  await expect(page.locator("[data-faceid], [data-faceid-unlock], [data-x-unlock]").first()).toBeVisible();
  await walkTheater(page, {
    path: "/years/2017/sites/cloudbleed/index.html",
    key: "itt17-cbleed-dp",
    ns: "p17",
    kind: "checks",
  });
  const gold = await page.evaluate(() => localStorage.getItem("itt17-faceid"));
  expect(gold).toBeFalsy();
});

test("2017 Zoom leftover dest is not 2020 mass", async ({ page }) => {
  await walkTheater(page, {
    path: "/years/2017/sites/zoom17/index.html",
    key: "itt17-zoom17-dp",
    ns: "p17",
    kind: "query",
  });
});

test("2019 WeWork leftover checks · live order trap", async ({ page }) => {
  await walkTheater(page, {
    path: "/years/2019/sites/wework/index.html",
    key: "itt19-wework-dp",
    ns: "p19",
    kind: "checks",
  });
});

test("2019 xCloud leftover wait · Stadia trap", async ({ page }) => {
  await walkTheater(page, {
    path: "/years/2019/sites/xcloud/index.html",
    key: "itt19-xcloud-dp",
    ns: "p19",
    kind: "wait",
  });
});

test("2017/2019 guided lists stay 6 · deepen strip is outside", async ({ page }) => {
  for (const y of ["2017", "2019"]) {
    await page.goto(`/years/${y}/pages/home.html`);
    await expect(page.locator(`#ott-guided-${y} ol > li`)).toHaveCount(6);
    await expect(page.locator(`#ott-2x-${y}-dp`)).toBeVisible();
    const inside = await page.locator(`#ott-guided-${y} #ott-2x-${y}-dp`).count();
    expect(inside).toBe(0);
  }
});
