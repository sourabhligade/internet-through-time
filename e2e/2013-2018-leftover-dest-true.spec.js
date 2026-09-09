// @ts-check
/**
 * CUT-OPEN leftover dest-true: leftover-3× first + leftover-2× on 2013 / 2018.
 * Second leftover-3× strip is not named.
 */
const { test, expect } = require("@playwright/test");

async function getKey(page, k) {
  return page.evaluate((key) => localStorage.getItem(key), k);
}

async function completePop(page, popId, key, gold, fill) {
  await page.evaluate((ks) => {
    ks.forEach((k) => localStorage.removeItem(k));
  }, [key, gold]);
  await page.reload();
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
  test("Ask.fm leftover-3× dest-true", async ({ page }) => {
    await page.goto("/years/2013/sites/askfm/index.html");
    await completePop(page, "askfm", "itt13-pop-askfm", "itt13-vine-posts", "ask leftover");
  });
  test("Whisper leftover-3× dest-true", async ({ page }) => {
    await page.goto("/years/2013/sites/whisper/index.html");
    await completePop(page, "whisper", "itt13-pop-whisper", "itt13-vine-posts", "whisper leftover");
  });
  test("YouTube leftover-3× dest-true", async ({ page }) => {
    await page.goto("/years/2013/sites/youtube/index.html");
    await completePop(page, "youtube", "itt13-pop-youtube", "itt13-vine-posts", "youtube leftover");
  });
  test("Vine leftover-2× lx then d2 never writes gold", async ({ page }) => {
    await page.goto("/years/2013/sites/vine/record.html");
    await page.evaluate(() => {
      localStorage.removeItem("itt13-vine-lx");
      localStorage.removeItem("itt13-vine-d2");
      localStorage.removeItem("itt13-vine-posts");
    });
    await page.reload();
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

test.describe("2018 leftover dest-true", () => {
  test("Reddit leftover-3× dest-true", async ({ page }) => {
    await page.goto("/years/2018/sites/reddit/index.html");
    await completePop(page, "reddit", "itt18-pop-reddit", "itt18-gdpr", "reddit leftover");
  });
  test("YouTube leftover-3× dest-true", async ({ page }) => {
    await page.goto("/years/2018/sites/youtube/index.html");
    await completePop(page, "youtube", "itt18-pop-youtube", "itt18-gdpr", "youtube leftover");
  });
  test("Wikipedia leftover-3× dest-true", async ({ page }) => {
    await page.goto("/years/2018/sites/wikipedia/index.html");
    await completePop(page, "wikipedia", "itt18-pop-wikipedia", "itt18-gdpr", "wikipedia leftover");
  });
  test("GDPR leftover-2× lx never writes gold", async ({ page }) => {
    await page.goto("/years/2018/sites/gdpr/index.html");
    await page.evaluate(() => {
      localStorage.removeItem("itt18-gdpr-lx");
      localStorage.removeItem("itt18-gdpr");
    });
    await page.reload();
    const p1 = page.locator("[data-lo-panel]").filter({ has: page.locator('[data-lo-save][data-lo-key="gdpr-lx"]') }).first();
    await p1.locator("[data-lo-save]").click();
    expect(await getKey(page, "itt18-gdpr-lx")).toBeFalsy();
    await p1.locator("[data-lo-pick='keep']").click();
    const r1 = p1.locator("[data-lo-req]");
    for (let i = 0; i < (await r1.count()); i++) await r1.nth(i).check();
    await p1.locator("[data-lo-field]").fill("gdpr leftover");
    await p1.locator("[data-lo-save]").click();
    await expect.poll(() => getKey(page, "itt18-gdpr-lx")).toBeTruthy();
    expect(await getKey(page, "itt18-gdpr")).toBeFalsy();
  });
});

test.describe("leftover-2× dest-minute sample 2016 / 2017 / 2019", () => {
  test("2016 Dyn leftover-2×", async ({ page }) => {
    await page.goto("/years/2016/sites/dyn/index.html");
    await page.evaluate(() => {
      localStorage.removeItem("itt16-dyn-lx");
      localStorage.removeItem("itt16-ig-stories");
    });
    await page.reload();
    const p1 = page.locator("[data-lo-panel]").filter({ has: page.locator('[data-lo-save][data-lo-key="dyn-lx"]') }).first();
    await p1.locator("[data-lo-save]").click();
    expect(await getKey(page, "itt16-dyn-lx")).toBeFalsy();
    const r1 = p1.locator("[data-lo-req]");
    for (let i = 0; i < (await r1.count()); i++) await r1.nth(i).check();
    await p1.locator("[data-lo-field]").fill("dyn leftover");
    await p1.locator("[data-lo-save]").click();
    await expect.poll(() => getKey(page, "itt16-dyn-lx")).toBeTruthy();
    expect(await getKey(page, "itt16-ig-stories")).toBeFalsy();
  });
  test("2017 Teams leftover-2×", async ({ page }) => {
    await page.goto("/years/2017/sites/teams/index.html");
    await page.evaluate(() => {
      localStorage.removeItem("itt17-teams-lx");
      localStorage.removeItem("itt17-faceid");
    });
    await page.reload();
    const p1 = page.locator("[data-lo-panel]").filter({ has: page.locator('[data-lo-save][data-lo-key="teams-lx"]') }).first();
    await p1.locator("[data-lo-save]").click();
    expect(await getKey(page, "itt17-teams-lx")).toBeFalsy();
    const r1 = p1.locator("[data-lo-req]");
    for (let i = 0; i < (await r1.count()); i++) await r1.nth(i).check();
    await p1.locator("[data-lo-field]").fill("teams leftover");
    await p1.locator("[data-lo-save]").click();
    await expect.poll(() => getKey(page, "itt17-teams-lx")).toBeTruthy();
    expect(await getKey(page, "itt17-faceid")).toBeFalsy();
  });
  test("2019 Fortnite leftover-2×", async ({ page }) => {
    await page.goto("/years/2019/sites/fortnite/index.html");
    await page.evaluate(() => {
      localStorage.removeItem("itt19-fn-lx");
      localStorage.removeItem("itt19-disneyplus");
    });
    await page.reload();
    const p1 = page.locator("[data-lo-panel]").filter({ has: page.locator('[data-lo-save][data-lo-key="fn-lx"]') }).first();
    await p1.locator("[data-lo-save]").click();
    expect(await getKey(page, "itt19-fn-lx")).toBeFalsy();
    await p1.locator("[data-lo-pick='keep']").click();
    const r1 = p1.locator("[data-lo-req]");
    for (let i = 0; i < (await r1.count()); i++) await r1.nth(i).check();
    await p1.locator("[data-lo-field]").fill("fn leftover");
    await p1.locator("[data-lo-save]").click();
    await expect.poll(() => getKey(page, "itt19-fn-lx")).toBeTruthy();
    expect(await getKey(page, "itt19-disneyplus")).toBeFalsy();
  });
  test("2015 apple about leftover-2× lx then d2 · gold empty", async ({ page }) => {
    await page.goto("/years/2015/sites/apple/about.html");
    await page.evaluate(() => {
      localStorage.removeItem("itt15-apple-lx");
      localStorage.removeItem("itt15-apple-lx-d2");
      localStorage.removeItem("itt15-periscope");
    });
    await page.reload();
    const p1 = page.locator("[data-lo-panel]").filter({ has: page.locator('[data-lo-save][data-lo-key="apple-lx"]') }).first();
    await p1.locator("[data-lo-save]").click();
    expect(await getKey(page, "itt15-apple-lx")).toBeFalsy();
    await p1.locator("[data-lo-pick='keep']").click();
    const r1 = p1.locator("[data-lo-req]");
    for (let i = 0; i < (await r1.count()); i++) await r1.nth(i).check();
    await p1.locator("[data-lo-field]").fill("apple leftover");
    await p1.locator("[data-lo-save]").click();
    await expect.poll(() => getKey(page, "itt15-apple-lx")).toBeTruthy();
    const p2 = page.locator("[data-lo-panel]").filter({ has: page.locator('[data-lo-save][data-lo-key="apple-lx-d2"]') }).first();
    await p2.locator("[data-lo-pick='keep']").click();
    const r2 = p2.locator("[data-lo-req]");
    for (let i = 0; i < (await r2.count()); i++) await r2.nth(i).check();
    await p2.locator("[data-lo-field]").fill("apple leftover two");
    await p2.locator("[data-lo-save]").click();
    await expect.poll(() => getKey(page, "itt15-apple-lx-d2")).toBeTruthy();
    expect(await getKey(page, "itt15-periscope")).toBeFalsy();
  });
  test("2019 iPhone about leftover-2× lx then d2 · gold empty", async ({ page }) => {
    await page.goto("/years/2019/sites/iphone/about.html");
    await page.evaluate(() => {
      localStorage.removeItem("itt19-iphone-ab-lx");
      localStorage.removeItem("itt19-iphone-ab-d2");
      localStorage.removeItem("itt19-disneyplus");
    });
    await page.reload();
    const p1 = page.locator("[data-lo-panel]").filter({ has: page.locator('[data-lo-save][data-lo-key="iphone-ab-lx"]') }).first();
    await p1.locator("[data-lo-save]").click();
    expect(await getKey(page, "itt19-iphone-ab-lx")).toBeFalsy();
    await p1.locator("[data-lo-pick='keep']").click();
    const r1 = p1.locator("[data-lo-req]");
    for (let i = 0; i < (await r1.count()); i++) await r1.nth(i).check();
    await p1.locator("[data-lo-field]").fill("iphone leftover");
    await p1.locator("[data-lo-save]").click();
    await expect.poll(() => getKey(page, "itt19-iphone-ab-lx")).toBeTruthy();
    const p2 = page.locator("[data-lo-panel]").filter({ has: page.locator('[data-lo-save][data-lo-key="iphone-ab-d2"]') }).first();
    await p2.locator("[data-lo-pick='keep']").click();
    const r2 = p2.locator("[data-lo-req]");
    for (let i = 0; i < (await r2.count()); i++) await r2.nth(i).check();
    await p2.locator("[data-lo-field]").fill("iphone leftover two");
    await p2.locator("[data-lo-save]").click();
    await expect.poll(() => getKey(page, "itt19-iphone-ab-d2")).toBeTruthy();
    expect(await getKey(page, "itt19-disneyplus")).toBeFalsy();
  });
});
