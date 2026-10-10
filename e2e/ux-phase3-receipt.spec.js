// @ts-check
/**
 * Museum-grade UX phase 3. Accepted write prints Saved.
 * Keys stay in storage. They leave the glass.
 * Off dest-true 12. Do not dest-farm.
 */
const { test, expect } = require("@playwright/test");
const { contentFrame, enterYear, goInFrame } = require("./helpers.js");
const {
  getKey,
  verbReady,
  finishOfficial,
  verbReadyInFrame,
  finishOfficialIn,
  envelope,
  statusText,
} = require("./ux-phase-io.js");

async function openDest(page, path, key) {
  await page.goto(path);
  await verbReady(page);
  await page.evaluate((k) => localStorage.removeItem(k), key);
}

async function statusPaint(page, sel) {
  return page.evaluate((s) => {
    const el = document.querySelector(s);
    if (!el) return null;
    const cs = getComputedStyle(el);
    return {
      text: String(el.textContent || "").replace(/\s+/g, " ").trim(),
      color: cs.color,
    };
  }, sel);
}

async function expectSavedGlass(page, key) {
  await expect.poll(() => getKey(page, key), { timeout: 8000 }).toBeTruthy();
  await envelope(page, key);
  await expect.poll(() => statusText(page), { timeout: 8000 }).toMatch(/^(Saved\.|This browser blocked the save\.)$/);
  const text = await statusText(page);
  expect(text).not.toMatch(/itt1[56]-/);
  await expect(page.locator("[data-official-status]").first()).not.toContainText(/itt1[56]-/);
  const paint = await statusPaint(page, "[data-official-status]");
  if (paint && paint.text === "Saved.") expect(paint.color).toBe("rgb(0, 102, 0)");
}

test.describe("UX phase 3 receipt glass", () => {
  for (const row of [
    { name: "WhatsApp Install", path: "/years/2014/sites/whatsapp/index.html", key: "itt14-wa-install" },
  ]) {
    test(row.name + " empty and trap hold in red and write nothing", async ({ page }) => {
      await openDest(page, row.path, row.key);
      await page.locator("[data-official-verb]").first().click();
      expect(await getKey(page, row.key)).toBeNull();
      const empty = await statusPaint(page, "[data-official-status]");
      expect(empty, "empty hold").toBeTruthy();
      expect(empty.text).toMatch(/never writes/);
      expect(empty.color).toBe("rgb(170, 0, 0)");
      const trap = page.locator("[data-official-trap]").first();
      if (await trap.count()) {
        await trap.click();
        expect(await getKey(page, row.key)).toBeNull();
        const held = await statusPaint(page, "[data-official-status]");
        expect(held.text).toMatch(/never writes/);
        expect(held.color).toBe("rgb(170, 0, 0)");
      }
    });
  }

  test("2015 omitted hash is not a door", async ({ page }) => {
    const res = await page.goto("/app/index.html#/year/2015");
    expect(res && res.ok()).toBeTruthy();
    await expect(page.getByRole("heading", { name: "2015 is not a door" })).toBeVisible();
    await expect(page.locator(".door")).toHaveCount(0);
    await expect(page.locator("body")).not.toContainText("Periscope");
  });
});
