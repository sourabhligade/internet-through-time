// @ts-check
/**
 * 2016–2018 leftover 3× — REAL multi-step, not fill+go plaques.
 * Star / guided 6 stay locked. Keys remain ittYY-pop-<slug>.
 */
const { test, expect } = require("@playwright/test");
const { openAlsoYear } = require("./helpers");


const YEARS = [
  {
    year: "2016",
    prefix: "itt16",
    rooms: [
      { id: "reddit", next: /netflix/ },
      { id: "netflix", next: /youtube/ },
      { id: "youtube", next: /home\.html/ },
    ],
  },
  {
    year: "2017",
    prefix: "itt17",
    rooms: [
      { id: "reddit", next: /youtube/ },
      { id: "youtube", next: /amazon/ },
      { id: "amazon", next: /home\.html/ },
    ],
  },
  {
    year: "2018",
    prefix: "itt18",
    rooms: [
      { id: "reddit", next: /youtube/ },
      { id: "youtube", next: /wikipedia/ },
      { id: "wikipedia", next: /home\.html/ },
    ],
  },
];

async function getKey(page, key) {
  return page.evaluate((k) => localStorage.getItem(k), key);
}

function leftoverPanel(page, id) {
  return page.locator(`[data-pop-panel][data-itt-lo3x]:has(button[data-pop-go][data-pop-id="${id}"]:not([data-pop-key]))`).first();
}

function leftoverGo(page, id) {
  return leftoverPanel(page, id).locator(`button[data-pop-go][data-pop-id="${id}"]`);
}

async function complete(page, id) {
  const panel = leftoverPanel(page, id);
  const go = leftoverGo(page, id);
  const keep = panel.locator('[data-pop-pick="keep"]');
  if (await keep.count()) await keep.first().click();
  else await panel.locator("[data-pop-pick]").first().click();
  const reqs = panel.locator("[data-pop-req]");
  const nReq = await reqs.count();
  for (let i = 0; i < nReq; i++) await reqs.nth(i).check();
  const field = panel.locator("[data-pop-field]").first();
  if (await field.count()) {
    const ph = (await field.getAttribute("placeholder")) || "museum residual";
    await field.fill(ph.length >= 2 ? ph : "museum residual");
  }
  await go.click();
}

for (const y of YEARS) {
  test.describe(`${y.year} leftover 3× detail`, () => {
    for (const room of y.rooms) {
      const key = `${y.prefix}-pop-${room.id}`;
      const path = `/years/${y.year}/sites/${room.id}/index.html`;

      test(`${room.id} incomplete never writes · complete reveals Next`, async ({ page }) => {
        await page.goto(path);
        await page.evaluate((k) => localStorage.removeItem(k), key);
        await page.reload();
        const go = leftoverGo(page, room.id);
        const panel = leftoverPanel(page, room.id);
        await expect(go).toHaveAttribute("data-pop-bound", "1", { timeout: 15000 });
        await expect(page.locator("html")).toHaveAttribute("data-itt-year", y.year);
        expect(await panel.locator("[data-pop-pick]").count()).toBeGreaterThan(0);
        expect(await panel.locator("[data-pop-req]").count()).toBeGreaterThan(0);
        await go.click();
        expect(await getKey(page, key)).toBeFalsy();
        const field = panel.locator("[data-pop-field]").first();
        if (await field.count()) await field.fill("a");
        await go.click();
        expect(await getKey(page, key)).toBeFalsy();
        const trap = panel.locator('[data-pop-pick="trap"], [data-pop-trap]');
        if (await trap.count()) {
          await trap.first().click();
          await go.click();
          expect(await getKey(page, key)).toBeFalsy();
        }
        await complete(page, room.id);
        await expect.poll(async () => getKey(page, key), { timeout: 8000 }).toBeTruthy();
        const raw = (await getKey(page, key)) || "";
        expect(raw).toMatch(/"real"\s*:\s*true/);
        expect(raw).toMatch(/multiStep/);
        const next = page.locator("[data-next-flow]:not([hidden]) a, [data-next-flow] a").first();
        await expect(next).toBeVisible();
        const nh = await next.getAttribute("href");
        expect(nh, key + " next").toBeTruthy();
        expect(nh).not.toMatch(/years\/(?!2016|2017|2018)/);
        await page.reload();
        await expect(page.locator("[data-next-flow] a").first()).toBeVisible();
      });
    }

    test(`home still 6 guided · star unchanged · 3× linked`, async ({ page }) => {
      await page.goto(`/years/${y.year}/pages/home.html`);
      await expect(page.locator(`#ott-guided-${y.year} ol > li`)).toHaveCount(6);
      await expect(page.locator(".itt-year-star [data-ott-one-thing]")).toHaveCount(1);
      await openAlsoYear(page, y.year);
      const pop = page.locator(`[data-itt-pop3x="${y.year}"]`).first();
      await expect(pop).toBeVisible();
      for (const room of y.rooms) {
        await expect(page.locator(`[data-itt-pop3x="${y.year}"] a[href*="${room.id}"]`).first()).toBeVisible();
      }
    });
  });
}
