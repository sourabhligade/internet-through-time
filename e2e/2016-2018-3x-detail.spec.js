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
    rooms: [
      { id: "slack", kind: "first", key: "itt16-pop-slack", next: /reddit/ },
      { id: "reddit", kind: "first", key: "itt16-pop-reddit", next: /netflix/ },
      { id: "netflix", kind: "first", key: "itt16-pop-netflix", next: /youtube/ },
      { id: "youtube", kind: "second", key: "itt16-pop2-youtube", next: /alphago/ },
    ],
  },
  {
    year: "2018",
    rooms: [
      { id: "reddit", kind: "first", key: "itt18-pop-reddit", next: /youtube/ },
      { id: "youtube", kind: "first", key: "itt18-pop-youtube", next: /wikipedia/ },
      { id: "wikipedia", kind: "first", key: "itt18-pop-wikipedia", next: /home\.html/ },
    ],
  },
];

async function getKey(page, key) {
  return page.evaluate((k) => localStorage.getItem(k), key);
}

function leftoverPanel(page, id, kind) {
  if (kind === "second") {
    return page
      .locator(`[data-pop-panel][data-itt-lo3x]:has(button[data-pop-go][data-pop-key="pop2-${id}"])`)
      .first();
  }
  if (kind === "third") {
    return page
      .locator(`[data-pop-panel][data-itt-lo3x]:has(button[data-pop-go][data-pop-key="pop3-${id}"])`)
      .first();
  }
  return page
    .locator(`[data-pop-panel][data-itt-lo3x]:has(button[data-pop-go][data-pop-id="${id}"]:not([data-pop-key]))`)
    .first();
}

function leftoverGo(page, id, kind) {
  const panel = leftoverPanel(page, id, kind);
  if (kind === "second") return panel.locator(`button[data-pop-go][data-pop-key="pop2-${id}"]`);
  if (kind === "third") return panel.locator(`button[data-pop-go][data-pop-key="pop3-${id}"]`);
  return panel.locator(`button[data-pop-go][data-pop-id="${id}"]`);
}

async function complete(page, id, kind) {
  const panel = leftoverPanel(page, id, kind);
  const go = leftoverGo(page, id, kind);
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
      const key = room.key;
      const kind = room.kind || "first";
      const path = `/years/${y.year}/sites/${room.id}/index.html`;

      test(`${room.id} incomplete never writes · complete reveals Next`, async ({ page }) => {
        await page.goto(path);
        await page.evaluate((k) => localStorage.removeItem(k), key);
        await page.reload();
        const go = leftoverGo(page, room.id, kind);
        const panel = leftoverPanel(page, room.id, kind);
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
        await complete(page, room.id, kind);
        await expect.poll(async () => getKey(page, key), { timeout: 8000 }).toBeTruthy();
        const raw = (await getKey(page, key)) || "";
        expect(raw).toMatch(/"real"\s*:\s*true/);
        expect(raw).toMatch(/multiStep/);
        const next = page.locator("[data-next-flow]:not([hidden]) a, [data-next-flow] a").first();
        await expect(next).toBeVisible();
        const nh = await next.getAttribute("href");
        expect(nh, key + " next").toBeTruthy();
        expect(nh).toMatch(room.next);
        await page.reload();
        await expect(page.locator("[data-next-flow] a").first()).toBeVisible();
      });
    }

    test(`home still 6 guided · star unchanged · leftover warehouse folded`, async ({ page }) => {
      await page.goto(`/years/${y.year}/pages/home.html`);
      await expect(page.locator(`#ott-guided-${y.year} ol > li`)).toHaveCount(6);
      await expect(page.locator(".itt-year-star [data-ott-one-thing]")).toHaveCount(1);
      await expect(page.locator(`[data-itt-pop3x="${y.year}"]:visible`)).toHaveCount(0);
    });
  });
}
