// @ts-check
/** Same-path year-window reload still boots a fresh room, and the first finished visit saves. */
const { test, expect } = require("@playwright/test");
const { enterYear, goInFrame, waitForImmersion, contentFrame } = require("./helpers");

test("2006 Yahoo same-path reload saves on the first finished visit", async ({ page }) => {
  await enterYear(page, "2006");
  await goInFrame(page, "sites/yahoo/index.html");
  await waitForImmersion(page, "2006");
  await goInFrame(page, "sites/yahoo/index.html");
  await waitForImmersion(page, "2006");

  const frame = contentFrame(page);
  const save = frame.locator("[data-lo-save]");
  await save.click();
  expect(await page.evaluate(() => localStorage.getItem("itt06-yahoo-lx"))).toBeFalsy();
  expect(await page.evaluate(() => localStorage.getItem("itt06-tweets"))).toBeFalsy();

  await frame.locator('[data-lo-pick="keep"]').click();
  await frame.locator("[data-lo-req]").nth(0).check();
  await frame.locator("[data-lo-req]").nth(1).check();
  await frame.locator("[data-lo-field]").fill("yahoo");
  await save.click();

  await expect.poll(async () => page.evaluate(() => localStorage.getItem("itt06-yahoo-lx"))).toBeTruthy();
  const raw = await page.evaluate(() => localStorage.getItem("itt06-yahoo-lx"));
  expect(JSON.parse(raw || "{}").leftover).toBe(true);
  expect(await page.evaluate(() => localStorage.getItem("itt06-tweets"))).toBeFalsy();
});
