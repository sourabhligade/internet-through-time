// @ts-check
/**
 * Every popular-session flow 1994–2019: incomplete never writes · complete writes.
 * Stars: page loads as that year (machine already covered by one-thing).
 */
const { test, expect } = require("@playwright/test");
const fs = require("fs");
const path = require("path");
const { checkAllReq } = require("./helpers");
const FLOWS = require("./popular-flows.matrix.json");

function yearOnDisk(year) {
  try {
    return fs.existsSync(path.join(__dirname, "..", "years", String(year), "index.html"));
  } catch (e) {
    return false;
  }
}

async function clearKey(page, key) {
  await page.evaluate((k) => {
    try {
      localStorage.removeItem(k);
    } catch (e) {
      /* */
    }
  }, key);
}

async function getKey(page, key) {
  return page.evaluate((k) => localStorage.getItem(k), key);
}

test.describe("Popular flows — every year F1–F5 checked", () => {
  for (const flow of FLOWS) {
    if (flow.kind === "star") {
      test(`${flow.year} ${flow.id} star page loads (${flow.key})`, async ({ page }) => {
        test.skip(!yearOnDisk(flow.year), flow.year + " not on disk");
        const res = await page.goto(flow.path);
        expect(res && res.ok(), flow.path).toBeTruthy();
        await expect(page.locator("html")).toHaveAttribute("data-itt-year", flow.year);
        await expect(page.locator("body")).not.toBeEmpty();
      });
      continue;
    }

    test(`${flow.year} ${flow.id} incomplete blocked then REAL ${flow.key}`, async ({ page }) => {
      test.skip(!yearOnDisk(flow.year), flow.year + " not on disk");
      await page.goto(flow.path);
      await clearKey(page, flow.key);
      await page.reload();
      const save = page.locator(
        `[data-itt-popular-save][data-storage-key="${flow.suffix}"], [data-itt-real-save][data-storage-key="${flow.suffix}"]`
      );
      await expect(save).toBeVisible({ timeout: 15000 });
      await save.click();
      await expect.poll(async () => getKey(page, flow.key)).toBeFalsy();
      if (flow.field) {
        await page.locator("#pop-field, [data-popular-field]").first().fill("museum residual");
      }
      const popReq = page.locator("[data-popular-req]");
      if ((await popReq.count()) > 0) {
        const n = await popReq.count();
        for (let i = 0; i < n; i++) await popReq.nth(i).check({ force: true });
      } else {
        await checkAllReq(page);
      }
      await save.click();
      await expect.poll(async () => getKey(page, flow.key), { timeout: 8000 }).toBeTruthy();
      const raw = (await getKey(page, flow.key)) || "";
      expect(raw).toMatch(/real|true|multiStep/i);
      if (flow.next) {
        await expect(page.locator("[data-next-flow] a").first()).toBeVisible();
      }
    });
  }
});
