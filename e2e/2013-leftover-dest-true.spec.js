// @ts-check
/**
 * CUT-OPEN leftover dest-true: leftover-3× first + leftover-2× on 2013 / .
 * Second leftover-3× strip is not named.
 */
const { test, expect } = require("@playwright/test");
const { revealLeftoverRails , destOnDisk } = require('./helpers');

async function getKey(page, k) {
  return page.evaluate((key) => localStorage.getItem(key), k);
}

async function completePop(page, popId, key, gold, fill) {
  await page.evaluate((ks) => {
    ks.forEach((k) => localStorage.removeItem(k));
  }, [key, gold]);
  await page.reload();
  await revealLeftoverRails(page);
  const go = page.locator(`[data-pop-go][data-pop-id='${popId}']`).first();
  await go.click();
  expect(await getKey(page, key)).toBeFalsy();
  const panel = page.locator("[data-pop-panel]").filter({ has: go }).first();
  const keep = panel.locator("[data-pop-pick='keep']");
  if ((await keep.count()) > 0) await keep.first().click();
  const reqs = panel.locator("[data-pop-req]");
  for (let i = 0; i < (await reqs.count()); i++) await reqs.nth(i).check();
  const field = panel.locator("[data-pop-field]").first();
  if (await field.count()) await field.fill(fill);
  await go.click();
  await expect.poll(() => getKey(page, key)).toBeTruthy();
  expect(await getKey(page, gold)).toBeFalsy();
}

async function completeLo(page, loKey, gold, fill) {
  await page.evaluate((ks) => {
    ks.forEach((k) => localStorage.removeItem(k));
  }, [loKey, gold]);
  await page.reload();
  await revealLeftoverRails(page);
  const save = page.locator(`[data-lo-save][data-lo-key="${loKey}"]`).first();
  const panel = page.locator("[data-lo-panel]").filter({ has: save }).first();
  await save.click();
  expect(await getKey(page, loKey.startsWith("itt") ? loKey : null) || await getKey(page, loKey)).toBeFalsy();
  const keep = panel.locator("[data-lo-pick='keep']");
  if ((await keep.count()) > 0) await keep.first().click();
  const reqs = panel.locator("[data-lo-req]");
  for (let i = 0; i < (await reqs.count()); i++) await reqs.nth(i).check();
  const field = panel.locator("[data-lo-field]").first();
  if (await field.count()) await field.fill(fill);
  await panel.locator("[data-lo-save]").first().click();
}

test.describe("2013 leftover dest-true", () => {
  test("Ask.fm leftover empty never writes · complete writes pop4", async ({ page }) => {
    await page.goto("/years/2013/sites/askfm/index.html");
    await expect(page.locator("h1")).toContainText(/Ask\.fm/i);
    await expect(page.locator("[data-pop-go]")).toHaveCount(1);
    expect(await getKey(page, "itt13-pop4-askfm")).toBeFalsy();
    expect(await getKey(page, "itt13-vine-posts")).toBeFalsy();
    await completePop(page, "askfm", "itt13-pop4-askfm", "itt13-vine-posts", "ask.fm leftover");
  });
  test("Whisper leftover empty never writes · complete writes pop4", async ({ page }) => {
    await page.goto("/years/2013/sites/whisper/index.html");
    await expect(page.locator("h1")).toContainText(/Whisper/i);
    await expect(page.locator("[data-pop-go]")).toHaveCount(1);
    expect(await getKey(page, "itt13-pop4-whisper")).toBeFalsy();
    expect(await getKey(page, "itt13-vine-posts")).toBeFalsy();
    await completePop(page, "whisper", "itt13-pop4-whisper", "itt13-vine-posts", "whisper leftover");
  });
  test("YouTube popular wiki save writes itt13-wiki and not the Vine star", async ({ page }) => {
    await page.goto("/years/2013/sites/youtube/index.html");
    await page.evaluate(() => {
      localStorage.removeItem("itt13-wiki");
      localStorage.removeItem("itt13-vine-posts");
    });
    await page.reload();
    const save = page.locator("[data-itt-popular-save][data-storage-key='wiki']");
    await save.click();
    expect(await getKey(page, "itt13-wiki")).toBeFalsy();
    const reqs = page.locator("[data-popular-req][data-pop-for='wiki']");
    const n = await reqs.count();
    for (let i = 0; i < n; i++) await reqs.nth(i).check();
    await save.click();
    await expect.poll(() => getKey(page, "itt13-wiki"), { timeout: 8000 }).toBeTruthy();
    expect(await getKey(page, "itt13-vine-posts")).toBeFalsy();
  });
  test("Vine leftover-2× lx then d2 never writes gold", async ({ page }) => {
    test.skip(true, "official dest leftover-2× panels = 0");
    await page.goto("/years/2013/sites/vine/record.html");
    await page.evaluate(() => {
      localStorage.removeItem("itt13-vine-lx");
      localStorage.removeItem("itt13-vine-d2");
      localStorage.removeItem("itt13-vine-posts");
    });
    await page.reload();
    await revealLeftoverRails(page);
    const p1 = page.locator("[data-lo-panel]").filter({ has: page.locator('[data-lo-save][data-lo-key="vine-lx"]') }).first();
    await p1.locator("[data-lo-save]").click();
    expect(await getKey(page, "itt13-vine-lx")).toBeFalsy();
    await p1.locator("[data-lo-pick='keep']").click();
    const r1 = p1.locator("[data-lo-req]");
    for (let i = 0; i < (await r1.count()); i++) await r1.nth(i).check();
    await p1.locator("[data-lo-field]").fill("vine leftover");
    await p1.locator("[data-lo-save]").click();
    await expect.poll(() => getKey(page, "itt13-vine-lx")).toBeTruthy();
    const p2 = page.locator("[data-lo-panel]").filter({ has: page.locator('[data-lo-save][data-lo-key="vine-d2"]') }).first();
    await p2.locator("[data-lo-pick='keep']").click();
    const r2 = p2.locator("[data-lo-req]");
    for (let i = 0; i < (await r2.count()); i++) await r2.nth(i).check();
    await p2.locator("[data-lo-field]").fill("vine leftover two");
    await p2.locator("[data-lo-save]").click();
    await expect.poll(() => getKey(page, "itt13-vine-d2")).toBeTruthy();
    expect(await getKey(page, "itt13-vine-posts")).toBeFalsy();
  });
});
