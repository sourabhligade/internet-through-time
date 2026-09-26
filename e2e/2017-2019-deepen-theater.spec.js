// @ts-check
/**
 * 2017–2019 leftover deepen theaters — first click is the period verb.
 * 4× leftover pack still walked by 2x-links-all-years.spec.js.
 */
const { test, expect } = require("@playwright/test");
const { destOnDisk } = require("./helpers");


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
  const { openReactStop, completeReactStop } = require("./helpers");
  await page.goto("/app/index.html#/year/2017");
  await expect(page.getByRole("heading", { name: "Face ID" })).toBeVisible();
  const room = await openReactStop(page, "2017", "itt17-cloudbleed");
  await page.evaluate(() => {
    localStorage.removeItem("itt17-cloudbleed");
    localStorage.removeItem("itt17-faceid");
  });
  await room.locator(".actions button").last().click();
  expect(await getKey(page, "itt17-cloudbleed")).toBeFalsy();
  await completeReactStop(page, room);
  await expect.poll(async () => getKey(page, "itt17-cloudbleed"), { timeout: 8000 }).toBeTruthy();
  expect(await getKey(page, "itt17-faceid")).toBeFalsy();
});

test("2017 Zoom leftover dest is not 2020 mass", async ({ page }) => {
  const fs = require("fs");
  const path = require("path");
  test.skip(
    !destOnDisk("/years/2017/sites/zoom17/index.html"),
    "2017 Zoom leftover dest zoom17 missing"
  );
  await walkTheater(page, {
    path: "/years/2017/sites/zoom17/index.html",
    key: "itt17-zoom17-dp",
    ns: "p17",
    kind: "query",
  });
});

test("2019 is live lean", async ({ page }) => {
  const fs = require("fs");
  const path = require("path");
  expect(fs.existsSync(path.join(__dirname, "..", "react", "src", "year2019.js"))).toBe(true);
  await page.goto("/");
  await expect(page.locator("a.year-card.available[data-year='2019']")).toHaveAttribute(
    "href",
    /app\/index\.html#\/year\/2019/
  );
});

test("2017 guided list stays 6 · deepen strip is outside", async ({ page }) => {
  await page.goto("/app/index.html#/year/2017");
  await expect(page.locator("article.stop ol > li")).toHaveCount(6);
  await expect(page.getByRole("heading", { name: "Face ID" })).toBeVisible();
});
