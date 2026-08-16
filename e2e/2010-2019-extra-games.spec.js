// @ts-check
/**
 * Extra year games 2010–2017 — 4 pack games each (plus existing year game).
 * Incomplete never writes. Full tap+optional phrase+finish writes.
 */
const { test, expect } = require("@playwright/test");

/** @type {{ year: string, file: string, id: string, need: number, phrase: string }[]} */
const GAMES = [
  { year: "2010", file: "sling.html", id: "sling", need: 4, phrase: "" },
  { year: "2010", file: "square.html", id: "square", need: 3, phrase: "square" },
  { year: "2010", file: "pad.html", id: "pad", need: 3, phrase: "" },
  { year: "2010", file: "kinect.html", id: "kinect", need: 3, phrase: "" },
  { year: "2013", file: "swipedeck.html", id: "swipedeck", need: 4, phrase: "" },
  { year: "2013", file: "tweet140.html", id: "tweet140", need: 3, phrase: "just setting up" },
  { year: "2013", file: "onesnap.html", id: "onesnap", need: 3, phrase: "" },
  { year: "2013", file: "keepbox.html", id: "keepbox", need: 3, phrase: "" },
  { year: "2014", file: "icedump.html", id: "icedump", need: 3, phrase: "" },
  { year: "2014", file: "bleedkey.html", id: "bleedkey", need: 3, phrase: "rotate" },
  { year: "2014", file: "bluetick.html", id: "bluetick", need: 3, phrase: "" },
  { year: "2014", file: "bendtap.html", id: "bendtap", need: 3, phrase: "" },
  { year: "2015", file: "faceround.html", id: "faceround", need: 3, phrase: "" },
  { year: "2015", file: "livehold.html", id: "livehold", need: 3, phrase: "" },
  { year: "2015", file: "peachtap.html", id: "peachtap", need: 3, phrase: "" },
  { year: "2015", file: "musictrial.html", id: "musictrial", need: 3, phrase: "three months" },

  { year: "2017", file: "notchduck.html", id: "notchduck", need: 3, phrase: "" },
  { year: "2017", file: "animoji.html", id: "animoji", need: 3, phrase: "" },
  { year: "2017", file: "stormloot.html", id: "stormloot", need: 3, phrase: "" },
  { year: "2017", file: "savenet.html", id: "savenet", need: 3, phrase: "save the net" },
  { year: "2010", file: "fruit.html", id: "fruit", need: 4, phrase: "" },
  { year: "2013", file: "triviasix.html", id: "triviasix", need: 3, phrase: "trivia" },
  { year: "2014", file: "crosshop.html", id: "crosshop", need: 4, phrase: "" },
  { year: "2015", file: "vaulttap.html", id: "vaulttap", need: 3, phrase: "" },

  { year: "2017", file: "planedrop.html", id: "planedrop", need: 3, phrase: "" }
];

function keyOf(g) {
  return `itt${g.year.slice(2)}-game-${g.id}`;
}

test.describe("2010–2017 extra year games", () => {
  for (const g of GAMES) {
    test(`${g.year} ${g.id} incomplete then full`, async ({ page }) => {
      const key = keyOf(g);
      const url = `/years/${g.year}/sites/playable/${g.file}`;
      await page.goto(url);
      await page.evaluate((k) => localStorage.removeItem(k), key);
      await page.reload();
      await expect(page.locator(`[data-year-game][data-game-id="${g.id}"]`)).toBeVisible();
      await page.locator("[data-game-start]").click();
      await page.locator("[data-pack-act]").click();
      expect(await page.evaluate((k) => localStorage.getItem(k), key)).toBeFalsy();
      for (let i = 1; i < g.need; i++) await page.locator("[data-pack-act]").click();
      if (g.phrase) await page.locator("[data-pack-type]").fill(g.phrase);
      await page.locator("[data-pack-finish]").click();
      await expect.poll(async () => page.evaluate((k) => localStorage.getItem(k), key)).toBeTruthy();
      await expect(page.locator('[data-step="save"][data-done="1"]')).toBeVisible();
    });
  }

  for (const g of GAMES.filter((x) => x.year === "2010")) {
    test(`2010 ${g.id} literacy save is REAL (boot stub, incomplete never writes)`, async ({ page }) => {
      const lit = `itt10-${g.id}-lit`;
      const url = `/years/2010/sites/playable/${g.file}`;
      await page.goto(url);
      await page.evaluate((k) => localStorage.removeItem(k), lit);
      await page.reload();
      const save = page.locator('[data-itt-real-save]');
      await expect(save).toBeVisible({ timeout: 15000 });
      await save.click();
      expect(await page.evaluate((k) => localStorage.getItem(k), lit)).toBeFalsy();
      const req = page.locator("[data-req]");
      const n = await req.count();
      for (let i = 0; i < n; i++) await req.nth(i).check({ force: true });
      await save.click();
      await expect.poll(async () => page.evaluate((k) => localStorage.getItem(k), lit), { timeout: 8000 }).toBeTruthy();
      const raw = (await page.evaluate((k) => localStorage.getItem(k), lit)) || "";
      expect(raw).toMatch(/real|true|multiStep/i);
    });
  }

  for (const year of ["2010", "2013", "2017"]) {
    test(`${year} steps.html lists extras`, async ({ page }) => {
      const res = await page.goto(`/years/${year}/sites/playable/steps.html`);
      expect(res && res.ok()).toBeTruthy();
      expect(await page.locator("ol li").count()).toBeGreaterThanOrEqual(8);
    });
  }
});
