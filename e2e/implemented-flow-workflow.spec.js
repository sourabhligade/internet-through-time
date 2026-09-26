// @ts-check
/** Visitor workflow for every 2017 and 2019 stop we wired, plus the 2005 rail. */
const fs = require("fs");
const path = require("path");
const { test, expect } = require("@playwright/test");

const ROOT = path.join(__dirname, "..");
const STAR = { 2017: "itt17-faceid", 2019: "itt19-disneyplus" };

function yearStops(year) {
  const text = fs.readFileSync(path.join(ROOT, "js/config/flow-trails.js"), "utf8");
  const start = text.indexOf(`"${year}": [`);
  const end = text.indexOf("\n    ],", start);
  const chunk = text.slice(start, end);
  const re = /"n":\s*(\d+),\s*"name":\s*"([^"]+)",\s*"href":\s*"([^"]+)",\s*"match":\s*"[^"]+",\s*"whenKey":\s*"([^"]+)",\s*"nextHref":\s*"([^"]+)",\s*"nextLabel":\s*"([^"]+)"/g;
  const rows = [];
  let m;
  while ((m = re.exec(chunk))) {
    rows.push({ n: Number(m[1]), name: m[2], href: m[3], key: m[4], nextHref: m[5], nextLabel: m[6] });
  }
  return rows;
}

async function finishLeftover(page, href) {
  if (href.indexOf("animoji") !== -1) {
    await page.evaluate(() => localStorage.setItem("itt17-faceid", "{\"real\":true}"));
    await page.locator("[data-animoji-pick=panda]").click();
    await page.locator("[data-animoji-req]").nth(0).check();
    await page.locator("[data-animoji-req]").nth(1).check();
    await page.locator("[data-animoji-send]").click();
    return;
  }
  const lo = page.locator("[data-lo-save]");
  if (await lo.count()) {
    await page.locator('[data-lo-pick="keep"]').click();
    const reqs = page.locator("[data-lo-req]");
    const n = await reqs.count();
    for (let i = 0; i < n; i++) await reqs.nth(i).check();
    await page.locator("[data-lo-field]").fill("done");
    await lo.first().click();
    return;
  }
  const pick = page.locator("[data-uf17-pick]").first();
  if (await pick.count()) await pick.click();
  const field = page.locator("[data-uf17-field]");
  if (await field.count()) await field.fill("done");
  const reqs = page.locator("[data-uf17-req]");
  const n = await reqs.count();
  for (let i = 0; i < n; i++) await reqs.nth(i).check();
  await page.locator("[data-uf17-save]").click();
}

for (const year of ["2017", "2019"]) {
  test(`${year} shell shows the year window`, async ({ page }) => {
    await page.goto(`/years/${year}/`);
    await expect(page.locator("iframe#content")).toBeVisible();
    await expect(page.locator('link[href*="period-' + year + '.css"]')).toHaveCount(1);
    const frame = page.frameLocator("iframe#content");
    await expect(frame.locator("body")).toBeVisible();
  });

  for (const stop of yearStops(year)) {
    test(`${year} n=${stop.n} ${stop.name} workflow`, async ({ page }) => {
      await page.goto(`/years/${year}/${stop.href}`);
      await expect(page.locator("body")).toBeVisible();
      const links = page.locator("[data-next-flow] a");
      await expect(links.first()).toBeAttached();
      const count = await links.count();
      let match = -1;
      for (let i = 0; i < count; i++) {
        const href = await links.nth(i).getAttribute("href");
        const resolved = new URL(href || "", page.url()).pathname;
        if (resolved.endsWith("/" + stop.nextHref)) match = i;
      }
      expect(match, stop.name + " next").toBeGreaterThanOrEqual(0);
      const next = links.nth(match);
      if (stop.n <= 10) return;
      await expect(next).toBeHidden();
      await page.evaluate((k) => localStorage.removeItem(k), stop.key);
      if (stop.key !== "itt17-animoji") {
        await page.evaluate((k) => localStorage.removeItem(k), STAR[year]);
      }
      await finishLeftover(page, stop.href);
      await expect.poll(() => page.evaluate((k) => localStorage.getItem(k), stop.key)).toBeTruthy();
      const blob = JSON.parse((await page.evaluate((k) => localStorage.getItem(k), stop.key)) || "{}");
      expect(blob.leftover).toBe(true);
      if (stop.key !== "itt17-animoji") {
        expect(await page.evaluate((k) => localStorage.getItem(k), STAR[year])).toBeFalsy();
      }
      await expect(next).toBeVisible();
      await next.click();
      await expect(page).toHaveURL(new RegExp(stop.nextHref.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")));
    });
  }
}

test("2005 leftover rail opens and every painted link is in the 105", async ({ page }) => {
  const text = fs.readFileSync(path.join(ROOT, "js/config/leftover-2x-unique-links.js"), "utf8");
  const start = text.indexOf('"2005": [');
  const end = text.indexOf('"2006":', start);
  const allow = new Set([...text.slice(start, end).matchAll(/"id":\s*"([^"]+)"/g)].map((m) => m[1]));
  await page.goto("/years/2005/sites/qq/index.html");
  await page.evaluate(() => document.documentElement.setAttribute("data-itt-deep", "1"));
  const rail = page.locator("details.itt-also-year");
  await expect(rail.first()).toBeVisible();
  await rail.first().locator("summary").click();
  const links = rail.first().locator("a[href]");
  const n = await links.count();
  expect(n).toBeGreaterThan(80);
  for (let i = 0; i < n; i++) {
    const href = await links.nth(i).getAttribute("href");
    const slug = (href || "").match(/(?:\.\.\/|sites\/)([^/]+)/);
    expect(allow.has(slug && slug[1]), href).toBe(true);
    await expect(links.nth(i)).toBeVisible();
  }
});
