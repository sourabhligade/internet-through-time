// @ts-check
const { test, expect } = require("@playwright/test");
const fs = require("fs");
const path = require("path");

function leftoverRoomDests() {
  const root = path.join(__dirname, "..", "years", "2022", "sites");
  return fs
    .readdirSync(root)
    .filter((slug) => fs.existsSync(path.join(root, slug, "index.html")))
    .filter((slug) => {
      const t = fs.readFileSync(path.join(root, slug, "index.html"), "utf8");
      return slug !== "playable" && !t.includes("data-official-key") && t.includes("data-y22-kind");
    })
    .sort();
}

test.describe("2022 real dest e2e", () => {
  test.describe.configure({ timeout: 300000 });

  test("official machines show a result, not only a key", async ({ page }) => {
    await page.goto("/years/2022/sites/chatgpt/index.html");
    await page.locator("[data-official-need]").fill("hello there");
    await page.locator("[data-official-verb]").click();
    await expect(page.locator("#gpt22-thread")).toContainText(/ChatGPT|preview|language model/i);

    await page.goto("/years/2022/sites/wordle/index.html");
    await page.locator("[data-official-need]").fill("crane");
    await page.locator("[data-official-verb]").click();
    await expect(page.locator(".wdl22-tile.is-hit, .wdl22-tile.is-near, .wdl22-tile.is-miss").first()).toBeVisible();

    await page.goto("/years/2022/sites/twitter/index.html");
    await page.locator("[data-official-need]").fill("bird leftover");
    await page.locator("[data-official-verb]").click();
    await expect(page.locator(".tw22-post").first()).toContainText("bird leftover");

    await page.goto("/years/2022/sites/bereal/index.html");
    await page.locator("[data-official-need]").fill("two min");
    await page.locator("[data-official-verb]").click();
    await expect(page.locator(".be22-cam.is-shot").first()).toBeVisible();

    await page.goto("/years/2022/sites/google/index.html");
    await page.locator("[data-y22-q]").fill("search leftover");
    await page.locator("[data-y22-room-go]").click();
    await expect(page.locator("[data-y22-ok='search']")).toBeVisible();

    await page.goto("/years/2022/sites/ftx/index.html");
    await page.locator("[data-official-need]").fill("nov 2022 leftover");
    await page.locator("[data-official-verb]").click();
    await expect(page.locator("[data-y22-official-out]")).toContainText(/collapsed|Nov 2022/i);

    await page.goto("/years/2022/sites/mastodon/index.html");
    await page.locator("[data-official-need]").fill("mastodon.social leftover");
    await page.locator("[data-official-verb]").click();
    await expect(page.locator("[data-y22-official-out]")).toContainText(/Joined leftover/i);

    await page.goto("/years/2022/sites/windows11/index.html");
    await page.locator("[data-official-need]").fill("settings leftover");
    await page.locator("[data-official-verb]").click();
    await expect(page.locator("[data-y22-official-out]")).toContainText(/Win10 still mass/i);

    await page.goto("/years/2022/sites/playable/game.html");
    await page.locator("[data-official-need]").fill("queue leftover");
    await page.locator("[data-official-verb]").click();
    await expect(page.locator("[data-y22-official-out]")).toContainText(/Queue leftover/i);
  });

  test("every leftover dest product verb shows a result, empty does not", async ({ page }) => {
    const dests = leftoverRoomDests();
    expect(dests.length).toBe(75);
    for (const slug of dests) {
      await page.goto("/years/2022/sites/" + slug + "/index.html");
      await expect(page.locator("[data-y22-kind]"), slug).toBeVisible();
      await page.locator("[data-y22-room-go]").click();
      await expect(page.locator("[data-y22-ok]"), slug + " empty").toHaveCount(0);
      await page.locator("[data-y22-q]").fill(slug + " leftover");
      await page.locator("[data-y22-room-go]").click();
      await expect(page.locator("[data-y22-ok]"), slug + " result").toBeVisible();
    }
  });
});
