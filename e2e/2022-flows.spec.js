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

const FLOW_HREFS = [
  { label: "1 ChatGPT", href: "/years/2022/sites/chatgpt/index.html", key: "itt22-chatgpt", fill: "explain this" },
  { label: "2 Wordle", href: "/years/2022/sites/wordle/index.html", key: "itt22-wordle", fill: "crane" },
  { label: "3 Twitter", href: "/years/2022/sites/twitter/index.html", key: "itt22-twitter", fill: "bird leftover" },
  { label: "4 BeReal", href: "/years/2022/sites/bereal/index.html", key: "itt22-bereal", fill: "two min" },
  { label: "5 Island", href: "/years/2022/sites/iphone/14.html", key: "itt22-island", fill: "look leftover" },
  { label: "6 FTX", href: "/years/2022/sites/ftx/index.html", key: "itt22-ftx", fill: "ack leftover" },
  { label: "7 Mastodon", href: "/years/2022/sites/mastodon/index.html", key: "itt22-mastodon", fill: "join leftover" },
  { label: "8 TikTok", href: "/years/2022/sites/tiktok/index.html", key: "itt22-tiktok", fill: "fyp leftover" },
  { label: "9 Win11", href: "/years/2022/sites/windows11/index.html", key: "itt22-win11", fill: "room leftover" },
  { label: "10 Game", href: "/years/2022/sites/playable/game.html", key: "itt22-game-prompt", fill: "queue leftover" },
];

test.describe("2022 official 10", () => {
  test("every official dest trap never writes and complete writes", async ({ page }) => {
    for (const f of FLOW_HREFS) {
      await page.goto(f.href);
      await page.evaluate((k) => localStorage.removeItem(k), f.key);
      await page.reload();
      await expect(page.locator("[data-official-verb]")).toBeVisible();
      await page.locator("[data-official-trap]").first().click();
      expect(await page.evaluate((k) => localStorage.getItem(k), f.key), f.label + " trap").toBeNull();
      const reqs = page.locator("[data-official-req]");
      const n = await reqs.count();
      for (let i = 0; i < n; i++) await reqs.nth(i).check();
      if (await page.locator("[data-official-need]").count()) {
        await page.locator("[data-official-need]").first().fill(f.fill);
      }
      await page.locator("[data-official-verb]").first().click();
      await expect.poll(() => page.evaluate((k) => localStorage.getItem(k), f.key), {
        timeout: 8000,
      }).toBeTruthy();
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
