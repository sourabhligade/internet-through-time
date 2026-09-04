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
];

async function getKey(page, key) {
  return page.evaluate((k) => localStorage.getItem(k), key);
}

async function complete(page) {
  await page.locator("[data-pop-pick]").first().click();
  await page.locator("[data-pop-req]").check();
  const field = page.locator("[data-pop-field]");
  const v = await field.inputValue();
  if (!String(v || "").trim() || String(v).trim().length < 2) {
    await field.fill("museum residual");
  }
  await page.locator("[data-pop-go]").click();
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
        await expect(page.locator("[data-pop-go]")).toHaveAttribute("data-pop-bound", "1", { timeout: 15000 });
        await expect(page.locator("html")).toHaveAttribute("data-itt-year", y.year);
        await expect(page.locator("[data-pop-pick]")).toHaveCount(3);
        await expect(page.locator("[data-pop-req]")).toHaveCount(1);
        await page.locator("[data-pop-go]").click();
        expect(await getKey(page, key)).toBeFalsy();
        await page.fill("[data-pop-field]", "almost");
        await page.locator("[data-pop-go]").click();
        expect(await getKey(page, key)).toBeFalsy();
        await page.locator("[data-pop-pick]").first().click();
        await page.locator("[data-pop-go]").click();
        expect(await getKey(page, key)).toBeFalsy();
        await complete(page);
        await expect.poll(async () => getKey(page, key), { timeout: 8000 }).toBeTruthy();
        const raw = (await getKey(page, key)) || "";
        expect(raw).toMatch(/"real"\s*:\s*true/);
        expect(raw).toMatch(/multiStep/);
        await expect(page.locator("[data-next-flow] a").first()).toBeVisible();
        await expect(page.locator("[data-next-flow] a").first()).toHaveAttribute("href", room.next);
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
