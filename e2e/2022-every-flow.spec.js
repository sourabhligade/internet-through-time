// @ts-check
/**
 * 2022 every implemented official flow + leftover 2× isolation.
 */
const { test, expect } = require("@playwright/test");

async function getKey(page, key) {
  return page.evaluate((k) => localStorage.getItem(k), key);
}

async function completeOfficial(page) {
  const field = page.locator("[data-official-need]");
  if ((await field.count()) > 0) await field.first().fill("museum leftover");
  const reqs = page.locator("[data-official-req]");
  const n = await reqs.count();
  for (let i = 0; i < n; i++) await reqs.nth(i).check();
  const wait = page.locator("[data-official-wait], [data-lo-wait]");
  if ((await page.locator("[data-official-verb]").count()) === 1 && (await page.locator("[data-official-key]").count()) >= 0) {
    /* bereal wait is leftover, official dest still uses verb */
  }
  await page.locator("[data-official-verb]").click();
}

const OFFICIAL = [
  { href: "sites/chatgpt/index.html", key: "itt22-chatgpt" },
  { href: "sites/twitter/index.html", key: "itt22-twitter" },
  { href: "sites/wordle/index.html", key: "itt22-wordle" },
  { href: "sites/stablediffusion/index.html", key: "itt22-sd" },
  { href: "sites/mastodon/index.html", key: "itt22-mastodon" },
  { href: "sites/bereal/index.html", key: "itt22-bereal" },
  { href: "sites/dalle2/index.html", key: "itt22-dalle2" },
  { href: "sites/chrome/index.html", key: "itt22-chrome" },
  { href: "sites/windows10/index.html", key: "itt22-win10" },
  { href: "sites/playable/game.html", key: "itt22-game-prompt" },
];

test.describe("2022 official 10 · trap never writes · complete writes", () => {
  for (const stop of OFFICIAL) {
    test(stop.key + " incomplete then complete", async ({ page }) => {
      await page.goto("/years/2022/" + stop.href);
      await page.evaluate((k) => localStorage.removeItem(k), stop.key);
      await page.evaluate(() => localStorage.removeItem("itt22-chatgpt"));
      await page.reload();
      await expect(page.locator("[data-official-verb]")).toBeVisible();
      await page.locator("[data-official-trap]").first().click();
      expect(await getKey(page, stop.key)).toBeFalsy();
      if (stop.key === "itt22-bereal") {
        const w = page.locator("[data-official-wait]");
        if ((await w.count()) > 0) {
          await w.first().click();
          await page.waitForTimeout(2200);
        }
      }
      await completeOfficial(page);
      await expect.poll(() => getKey(page, stop.key), { timeout: 8000 }).toBeTruthy();
      if (stop.key !== "itt22-chatgpt") {
        expect(await getKey(page, "itt22-chatgpt")).toBeFalsy();
      }
    });
  }
});

test("2022 leftover gpt-lx never writes gold", async ({ page }) => {
  await page.goto("/years/2022/sites/chatgpt/about.html");
  await page.evaluate(() => {
    localStorage.removeItem("itt22-gpt-lx");
    localStorage.removeItem("itt22-chatgpt");
  });
  await page.reload();
  const panel = page.locator('[data-lo-panel]:has([data-lo-key="gpt-lx"])');
  await panel.locator("[data-lo-req]").nth(0).check();
  await panel.locator("[data-lo-req]").nth(1).check();
  await panel.locator('[data-lo-pick="keep"]').click();
  await panel.locator("[data-lo-save]").click();
  await expect.poll(() => getKey(page, "itt22-gpt-lx"), { timeout: 8000 }).toBeTruthy();
  expect(await getKey(page, "itt22-chatgpt")).toBeFalsy();
});
