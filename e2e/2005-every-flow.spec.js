// @ts-check
/**
 * Every 2005 leftover-official writer: trap / empty / 0 ticks / 1 hop never write.
 * Complete writes itt05-* { real, leftover, year:"2005" }.
 * Star itt05-yt-uploads is not in this list (see 2005-official-10).
 */
const fs = require("fs");
const path = require("path");
const { test, expect } = require("@playwright/test");

const ROOT = path.join(__dirname, "..");
const matrix = require("./2x-links.matrix.json");

/** Leftover 9+9+9 dests not already in the 120 freeze rows. */
const EXTRA = [
  { path: "/years/2005/sites/msn/index.html", key: "itt05-msn-lx", title: "MSN leftover hops" },
  { path: "/years/2005/sites/gmail/invite.html", key: "itt05-gmail-invite", title: "Gmail invite leftover" },
];

/** @type {{ path: string, key: string, title: string }[]} */
const FLOWS = matrix
  .filter((r) => r.year === "2005" && r.key !== "itt05-yt-uploads")
  .map((r) => ({ path: r.path, key: r.key, title: r.title || r.key }));
const seen = new Set(FLOWS.map((f) => f.key));
for (const extra of EXTRA) {
  if (!seen.has(extra.key)) FLOWS.push(extra);
}

async function getKey(page, key) {
  return page.evaluate((k) => localStorage.getItem(k), key);
}

/**
 * @param {import("@playwright/test").Page} page
 * @param {string} destPath
 * @param {string} key
 */
async function completeLo(page, destPath, key) {
  const suffix = key.replace(/^itt05-/, "");
  await page.goto(destPath);
  await page.evaluate((k) => {
    localStorage.removeItem(k);
    localStorage.removeItem("itt05-yt-uploads");
    localStorage.removeItem("itt04-flickr");
    localStorage.removeItem("itt06-tweets");
  }, key);
  await page.reload();
  const lo = page.locator(`[data-lo-panel]:has([data-lo-save][data-lo-key="${suffix}"])`).first();
  await lo.locator("[data-lo-save]").waitFor({ timeout: 20000 });
  await page.waitForFunction(
    (suf) => {
      const b = document.querySelector('[data-lo-save][data-lo-key="' + suf + '"]');
      return !!(b && b.getAttribute("data-lo-bound") === "1");
    },
    suffix,
    { timeout: 20000 }
  );
  await page.evaluate((k) => localStorage.removeItem(k), key);

  const clickLo = (loc) => loc.click({ force: true });
  await clickLo(lo.locator("[data-lo-trap]").first());
  expect(await getKey(page, key), key + " trap").toBeFalsy();
  await clickLo(lo.locator("[data-lo-save]"));
  expect(await getKey(page, key), key + " 0 ticks").toBeFalsy();

  const reqs = lo.locator("[data-lo-req]");
  const nReq = await reqs.count();
  for (let i = 0; i < nReq; i++) await reqs.nth(i).check({ force: true });

  const picks = lo.locator("[data-lo-pick]");
  const nPick = await picks.count();
  const hasField = (await lo.locator("[data-lo-field]").count()) > 0;
  if (nPick || hasField) {
    await clickLo(lo.locator("[data-lo-save]"));
    expect(await getKey(page, key), key + " ticks only").toBeFalsy();
  }
  if (nPick) {
    const min = parseInt((await lo.locator("[data-lo-save]").getAttribute("data-lo-min-pick")) || "0", 10);
    const need = min || nPick;
    for (let i = 0; i < need && i < nPick; i++) await clickLo(picks.nth(i));
  }
  if (hasField) {
    await clickLo(lo.locator("[data-lo-save]"));
    expect(await getKey(page, key), key + " empty field").toBeFalsy();
    await lo.locator("[data-lo-field]").fill("museum leftover");
  }
  await clickLo(lo.locator("[data-lo-save]"));
  await expect.poll(() => getKey(page, key), { timeout: 8000 }).toBeTruthy();
  const blob = JSON.parse((await getKey(page, key)) || "{}");
  expect(blob.real, key + " real").toBe(true);
  expect(blob.multiStep, key + " multi").toBe(true);
  expect(String(blob.year), key + " year").toBe("2005");
  expect(await getKey(page, "itt05-yt-uploads"), key + " must not write star").toBeFalsy();
  expect(await getKey(page, "itt04-flickr"), key + " must not write itt04").toBeFalsy();
  expect(await getKey(page, "itt06-tweets"), key + " must not write itt06").toBeFalsy();
}

test.describe("2005 every leftover flow", () => {
  test("freeze matrix has 120 writers", () => {
    expect(FLOWS.length, "2005 2× freeze rows").toBeGreaterThanOrEqual(120);
  });

  for (const fl of FLOWS) {
    const dest = path.join(ROOT, fl.path.replace(/^\//, ""));
    test(`${fl.key} · ${fl.title}`, async ({ page }) => {
      test.skip(!fs.existsSync(dest), fl.path + " missing");
      const html = fs.readFileSync(dest, "utf8");
      const suffix = fl.key.replace(/^itt05-/, "");
      expect(html, fl.key + " dest machine").toContain('data-lo-key="' + suffix + '"');
      await completeLo(page, fl.path, fl.key);
    });
  }
});
