// @ts-check
/**
 * 2020 S15 + research densify — every new machine.
 * Do-step first. Incomplete never writes.
 */
const { test, expect } = require("@playwright/test");

/**
 * @param {import("@playwright/test").Page} page
 */
async function waitExtras(page) {
  await page
    .waitForFunction(
      () => document.documentElement.getAttribute("data-itt-feat-year2020extras") === "1",
      null,
      { timeout: 15000 }
    )
    .catch(() => {});
}

test.describe("2020 S15 REAL", () => {
  test("Mixer pick + checks write itt20-mixer; no pick does not", async ({ page }) => {
    await page.goto("/years/2020/sites/mixer/index.html");
    await page.evaluate(() => localStorage.removeItem("itt20-mixer"));
    await page.reload();
    await waitExtras(page);
    await page.locator("[data-mx-date]").check();
    await page.locator("[data-mx-not-twitch]").check();
    await page.locator("[data-mx-not-meta]").check();
    await page.locator("[data-mx-save]").click();
    await page.waitForTimeout(80);
    expect(await page.evaluate(() => localStorage.getItem("itt20-mixer"))).toBeFalsy();
    await page.locator('[data-mx-dest="facebook-gaming"]').click();
    await page.locator("[data-mx-save]").click();
    await expect.poll(async () => page.evaluate(() => localStorage.getItem("itt20-mixer"))).toBeTruthy();
    const blob = JSON.parse((await page.evaluate(() => localStorage.getItem("itt20-mixer"))) || "{}");
    expect(blob.dest).toBe("facebook-gaming");
    expect(blob.year).toBe("2020");
    expect(blob.real).toBe(true);
  });

  test("Peacock pick + checks write itt20-peacock", async ({ page }) => {
    await page.goto("/years/2020/sites/peacock/index.html");
    await page.evaluate(() => localStorage.removeItem("itt20-peacock"));
    await page.reload();
    await waitExtras(page);
    await page.locator("[data-pk-save]").click();
    await page.waitForTimeout(80);
    expect(await page.evaluate(() => localStorage.getItem("itt20-peacock"))).toBeFalsy();
    await page.locator('[data-pk-tier="premium"]').click();
    await page.locator("[data-pk-date]").check();
    await page.locator("[data-pk-price]").check();
    await page.locator("[data-pk-not-hbo]").check();
    await page.locator("[data-pk-save]").click();
    await expect.poll(async () => page.evaluate(() => localStorage.getItem("itt20-peacock"))).toBeTruthy();
    const blob = JSON.parse((await page.evaluate(() => localStorage.getItem("itt20-peacock"))) || "{}");
    expect(blob.tier).toBe("premium");
    expect(blob.premium).toBe(499);
  });

  test("PS5 add-to-cart does not write; checks after cart do", async ({ page }) => {
    await page.goto("/years/2020/sites/ps5/index.html");
    await page.evaluate(() => localStorage.removeItem("itt20-ps5"));
    await page.reload();
    await waitExtras(page);
    await page.locator("[data-ps5-cart]").click();
    await expect(page.locator("[data-ps5-sold]")).toBeVisible();
    expect(await page.evaluate(() => localStorage.getItem("itt20-ps5"))).toBeFalsy();
    await page.locator("[data-ps5-date]").check();
    await page.locator("[data-ps5-price]").check();
    await page.locator("[data-ps5-xbox]").check();
    await page.locator("[data-ps5-save]").click();
    await expect.poll(async () => page.evaluate(() => localStorage.getItem("itt20-ps5"))).toBeTruthy();
    const blob = JSON.parse((await page.evaluate(() => localStorage.getItem("itt20-ps5"))) || "{}");
    expect(blob.soldOut).toBe(true);
    expect(blob.digital).toBe(399);
  });

  test("GPT-3 try does not write; not ChatGPT; save after checks", async ({ page }) => {
    await page.goto("/years/2020/sites/openai/gpt3.html");
    await page.evaluate(() => localStorage.removeItem("itt20-gpt3"));
    await page.reload();
    await waitExtras(page);
    await page.locator("[data-gpt-try]").click();
    await page.waitForTimeout(80);
    expect(await page.evaluate(() => localStorage.getItem("itt20-gpt3"))).toBeFalsy();
    await page.locator("[name='prompt']").fill("write a haiku");
    await page.locator("[data-gpt-try]").click();
    await expect(page.locator("[data-gpt-wait]")).toBeVisible();
    expect(await page.evaluate(() => localStorage.getItem("itt20-gpt3"))).toBeFalsy();
    await page.locator("[data-gpt-date]").check();
    await page.locator("[data-gpt-params]").check();
    await page.locator("[data-gpt-not-chat]").check();
    await page.locator("[data-gpt-save]").click();
    await expect.poll(async () => page.evaluate(() => localStorage.getItem("itt20-gpt3"))).toBeTruthy();
    const blob = JSON.parse((await page.evaluate(() => localStorage.getItem("itt20-gpt3"))) || "{}");
    expect(blob.notChatGPT).toBe(true);
    expect(blob.params).toBe(175000000000);
  });

  test("Shorts US pick does not unlock; India + checks write", async ({ page }) => {
    await page.goto("/years/2020/sites/youtube/shorts.html");
    await page.evaluate(() => localStorage.removeItem("itt20-shorts"));
    await page.reload();
    await waitExtras(page);
    await page.locator('[data-yt-where="us"]').click();
    await page.locator("[data-yt-date]").check();
    await page.locator("[data-yt-not-reels]").check();
    await page.locator("[data-yt-not-world]").check();
    await page.locator("[data-yt-save]").click();
    await page.waitForTimeout(80);
    expect(await page.evaluate(() => localStorage.getItem("itt20-shorts"))).toBeFalsy();
    await page.locator('[data-yt-where="india"]').click();
    await page.locator("[data-yt-save]").click();
    await expect.poll(async () => page.evaluate(() => localStorage.getItem("itt20-shorts"))).toBeTruthy();
    const blob = JSON.parse((await page.evaluate(() => localStorage.getItem("itt20-shorts"))) || "{}");
    expect(blob.where).toBe("india");
  });

  test("Quest 2 SKU + checks write itt20-quest2", async ({ page }) => {
    await page.goto("/years/2020/sites/quest2/index.html");
    await page.evaluate(() => localStorage.removeItem("itt20-quest2"));
    await page.reload();
    await waitExtras(page);
    await page.locator("[data-q2-save]").click();
    await page.waitForTimeout(80);
    expect(await page.evaluate(() => localStorage.getItem("itt20-quest2"))).toBeFalsy();
    await page.locator('[data-q2-sku="64"]').click();
    await page.locator("[data-q2-date]").check();
    await page.locator("[data-q2-price]").check();
    await page.locator("[data-q2-fb]").check();
    await page.locator("[data-q2-save]").click();
    await expect.poll(async () => page.evaluate(() => localStorage.getItem("itt20-quest2"))).toBeTruthy();
    const blob = JSON.parse((await page.evaluate(() => localStorage.getItem("itt20-quest2"))) || "{}");
    expect(blob.sku).toBe("64");
    expect(blob.notMeta).toBe(true);
  });

  test("iOS 14 widget + ATT-next-year write itt20-ios14", async ({ page }) => {
    await page.goto("/years/2020/sites/ios14/index.html");
    await page.evaluate(() => localStorage.removeItem("itt20-ios14"));
    await page.reload();
    await waitExtras(page);
    await page.locator('[data-ios-widget="weather"]').click();
    await page.locator("[data-ios-date]").check();
    await page.locator("[data-ios-lib]").check();
    await page.locator("[data-ios-att]").check();
    await page.locator("[data-ios-save]").click();
    await expect.poll(async () => page.evaluate(() => localStorage.getItem("itt20-ios14"))).toBeTruthy();
    const blob = JSON.parse((await page.evaluate(() => localStorage.getItem("itt20-ios14"))) || "{}");
    expect(blob.widget).toBe("weather");
    expect(blob.attNextYear).toBe(true);
  });

  test("Iowa report fails and does not write; then literacy writes", async ({ page }) => {
    await page.goto("/years/2020/sites/iowa/index.html");
    await page.evaluate(() => localStorage.removeItem("itt20-iowa"));
    await page.reload();
    await waitExtras(page);
    await page.locator("[data-ia-report]").click();
    await expect(page.locator("[data-ia-fail]")).toBeVisible();
    expect(await page.evaluate(() => localStorage.getItem("itt20-iowa"))).toBeFalsy();
    await page.locator("[data-ia-date]").check();
    await page.locator("[data-ia-shadow]").check();
    await page.locator("[data-ia-not-vote]").check();
    await page.locator("[data-ia-save]").click();
    await expect.poll(async () => page.evaluate(() => localStorage.getItem("itt20-iowa"))).toBeTruthy();
    const blob = JSON.parse((await page.evaluate(() => localStorage.getItem("itt20-iowa"))) || "{}");
    expect(blob.failed).toBe(true);
  });

  test("Twitter hack one flag does not write; two flags + checks do", async ({ page }) => {
    await page.goto("/years/2020/sites/twitter/hack.html");
    await page.evaluate(() => localStorage.removeItem("itt20-tw-hack"));
    await page.reload();
    await waitExtras(page);
    await page.locator('[data-tw-flag="a"]').click();
    await page.locator("[data-tw-date]").check();
    await page.locator("[data-tw-n]").check();
    await page.locator("[data-tw-nowallet]").check();
    await page.locator("[data-tw-save]").click();
    await page.waitForTimeout(80);
    expect(await page.evaluate(() => localStorage.getItem("itt20-tw-hack"))).toBeFalsy();
    await page.locator('[data-tw-flag="b"]').click();
    await page.locator("[data-tw-save]").click();
    await expect.poll(async () => page.evaluate(() => localStorage.getItem("itt20-tw-hack"))).toBeTruthy();
    const blob = JSON.parse((await page.evaluate(() => localStorage.getItem("itt20-tw-hack"))) || "{}");
    expect(blob.flagged).toBeGreaterThanOrEqual(2);
    expect(blob.noWallet).toBe(true);
  });

  test("Clubhouse join without code does not write; invite + mass-2021 does", async ({ page }) => {
    await page.goto("/years/2020/sites/clubhouse/index.html");
    await page.evaluate(() => localStorage.removeItem("itt20-clubhouse"));
    await page.reload();
    await waitExtras(page);
    await page.locator("[data-ch-join]").click();
    await page.waitForTimeout(80);
    expect(await page.evaluate(() => localStorage.getItem("itt20-clubhouse"))).toBeFalsy();
    await page.locator("#itt20-ch-code").fill("vcroom");
    await page.locator("[data-ch-join]").click();
    await expect(page.locator("[data-ch-wait]")).toBeVisible();
    expect(await page.evaluate(() => localStorage.getItem("itt20-clubhouse"))).toBeFalsy();
    await page.locator("[data-ch-invite]").check();
    await page.locator("[data-ch-mass]").check();
    await page.locator("[data-ch-save]").click();
    await expect.poll(async () => page.evaluate(() => localStorage.getItem("itt20-clubhouse"))).toBeTruthy();
    const blob = JSON.parse((await page.evaluate(() => localStorage.getItem("itt20-clubhouse"))) || "{}");
    expect(blob.mass).toBe("2021");
    expect(blob.inviteOnly).toBe(true);
  });

  test("Schrems incomplete then write itt20-schrems", async ({ page }) => {
    await page.goto("/years/2020/sites/schrems/index.html");
    await page.evaluate(() => localStorage.removeItem("itt20-schrems"));
    await page.reload();
    await waitExtras(page);
    await page.locator("[data-sc-save]").click();
    await page.waitForTimeout(80);
    expect(await page.evaluate(() => localStorage.getItem("itt20-schrems"))).toBeFalsy();
    await page.locator("[data-sc-date]").check();
    await page.locator("[data-sc-shield]").check();
    await page.locator("[data-sc-not-gdpr]").check();
    await page.locator("[data-sc-save]").click();
    await expect.poll(async () => page.evaluate(() => localStorage.getItem("itt20-schrems"))).toBeTruthy();
    const blob = JSON.parse((await page.evaluate(() => localStorage.getItem("itt20-schrems"))) || "{}");
    expect(blob.caseId).toBe("C-311/18");
    expect(blob.shieldInvalid).toBe(true);
  });
});
