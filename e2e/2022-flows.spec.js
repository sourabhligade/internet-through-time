// @ts-check
const { test, expect } = require("@playwright/test");

const FLOWS = [
  { label: "1 ChatGPT", path: /\/chatgpt\//, key: "itt22-chatgpt", fill: "explain this" },
  { label: "2 Wordle", path: /\/wordle\//, key: "itt22-wordle", fill: "crane" },
  { label: "3 Twitter", path: /\/twitter\//, key: "itt22-twitter", fill: "bird leftover" },
  { label: "4 BeReal", path: /\/bereal\//, key: "itt22-bereal", fill: "two min" },
  { label: "5 Island", path: /\/iphone\//, key: "itt22-island", fill: "look leftover" },
  { label: "6 FTX", path: /\/ftx\//, key: "itt22-ftx", fill: "ack leftover" },
  { label: "7 Mastodon", path: /\/mastodon\//, key: "itt22-mastodon", fill: "join leftover" },
  { label: "8 TikTok", path: /\/tiktok\//, key: "itt22-tiktok", fill: "fyp leftover" },
  { label: "9 Win11", path: /\/windows11\//, key: "itt22-win11", fill: "room leftover" },
  { label: "10 Game", path: /\/playable\/game/, key: "itt22-game-prompt", fill: "queue leftover" },
];

test.describe("2022 official 10", () => {
  test("every dirbar flow opens and writes its leftover/star key", async ({ page }) => {
    await page.goto("/years/2022/");
    const skip = page.locator("#skip-connect");
    if (await skip.isVisible().catch(() => false)) await skip.click();
    await page.evaluate(() => {
      document.querySelectorAll(".dialog").forEach((d) => d.classList.add("hidden"));
      const bd = document.getElementById("modal-backdrop");
      if (bd) {
        bd.classList.add("hidden");
        bd.style.display = "none";
      }
      Object.keys(localStorage)
        .filter((k) => k.indexOf("itt22") === 0)
        .forEach((k) => localStorage.removeItem(k));
    });
    await expect(page.locator("#dirbar")).toBeVisible({ timeout: 15000 });

    for (const f of FLOWS) {
      await page.evaluate(() => {
        document.querySelectorAll(".dialog, #modal-backdrop").forEach((el) => {
          el.classList.add("hidden");
          el.style.display = "none";
        });
      });
      await page.locator("#dirbar").getByText(f.label, { exact: true }).click({ force: true });
      await expect.poll(async () => {
        try {
          return page.frames().some((fr) => f.path.test(fr.url()));
        } catch (e) {
          return false;
        }
      }).toBeTruthy();
      const frame = page.frameLocator("#content");
      await expect(frame.locator("[data-official-verb]")).toBeVisible({ timeout: 10000 });
      await frame.locator("[data-official-trap]").first().click({ force: true });
      const afterTrap = await page.evaluate((k) => localStorage.getItem(k), f.key);
      expect(afterTrap, f.label + " trap").toBeNull();
      const reqs = frame.locator("[data-official-req]");
      const n = await reqs.count();
      for (let i = 0; i < n; i++) await reqs.nth(i).check({ force: true });
      await frame.locator("[data-official-need]").first().fill(f.fill);
      await frame.locator("[data-official-verb]").first().click({ force: true });
      await expect.poll(() => page.evaluate((k) => localStorage.getItem(k), f.key)).toBeTruthy();
    }
  });

  test("ChatGPT Send shows a reply and Next", async ({ page }) => {
    await page.goto("/years/2022/sites/chatgpt/index.html");
    await page.locator("[data-official-need]").fill("hello there");
    await page.locator("[data-official-verb]").click();
    await expect(page.locator("#gpt22-thread")).toContainText(/ChatGPT|language model|preview/i);
    await expect(page.locator("[data-next-flow]")).toBeVisible();
    await expect(page.locator("[data-next-flow] a")).toHaveAttribute("href", /wordle/);
  });

  test("map hrefs resolve", async ({ page }) => {
    await page.goto("/years/2022/pages/map.html");
    const hrefs = await page.locator("a[href]").evaluateAll((as) =>
      as.map((a) => a.getAttribute("href")).filter((h) => h && !h.startsWith("#"))
    );
    expect(hrefs.length).toBeGreaterThan(8);
    for (const h of hrefs) {
      const res = await page.request.get(new URL(h, page.url()).href);
      expect(res.status(), h).toBe(200);
    }
  });

  test("playables lobby is not 404", async ({ page }) => {
    const res = await page.goto("/years/2022/sites/playable/index.html");
    expect(res && res.status()).toBe(200);
    await expect(page.locator("body")).toContainText(/Prompt Queue|playable/i);
  });
});
