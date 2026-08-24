// @ts-check
/**
 * Every 2020 writer: trap / empty / 0–1 tick never writes; complete writes itt20-* only.
 */
const { test, expect } = require("@playwright/test");

async function getKey(page, key) {
  return page.evaluate((k) => localStorage.getItem(k), key);
}

async function clearKey(page, key) {
  await page.evaluate((k) => localStorage.removeItem(k), key);
}

async function blobOf(page, key) {
  const raw = await getKey(page, key);
  return raw ? JSON.parse(raw) : null;
}

async function assertOnlyItt20(page) {
  const leaked = await page.evaluate(() =>
    Object.keys(localStorage).filter((k) => /^itt(19|21)-/.test(k))
  );
  expect(leaked).toEqual([]);
}

/**
 * @param {import('@playwright/test').Page} page
 * @param {string} url
 * @param {string} key
 */
async function openClean(page, url, key) {
  await page.goto(url);
  await clearKey(page, key);
  await page.reload();
}

/**
 * First / third 3× — pick + every honesty + field ≥2 + Go.
 * @param {import('@playwright/test').Page} page
 * @param {string} url
 * @param {string} key
 */
async function completePop(page, url, key) {
  await openClean(page, url, key);
  await page.locator("[data-pop-go]").click();
  expect(await getKey(page, key)).toBeFalsy();
  await page.locator("[data-pop-pick]").first().click();
  const reqs = page.locator("[data-pop-req]");
  const n = await reqs.count();
  for (let i = 0; i < n; i++) await reqs.nth(i).check();
  const field = page.locator("[data-pop-field]");
  const ph = (await field.getAttribute("placeholder")) || "museum leftover";
  await field.fill(ph.length >= 2 ? ph : "museum leftover");
  await page.locator("[data-pop-go]").click();
  await expect.poll(async () => getKey(page, key), { timeout: 8000 }).toBeTruthy();
  const blob = await blobOf(page, key);
  expect(blob.real).toBe(true);
  expect(String(blob.year)).toBe("2020");
  await assertOnlyItt20(page);
}

test.describe("2020 leftover flows", () => {
  test("Reels 24s never writes; 15s + audio writes", async ({ page }) => {
    await openClean(page, "/years/2020/sites/reels/index.html", "itt20-reels");
    await page.locator("[data-reels-post]").click();
    expect(await getKey(page, "itt20-reels")).toBeFalsy();
    await page.locator('[data-reels-len="24"]').click();
    await page.locator("[data-reels-post]").click();
    expect(await getKey(page, "itt20-reels")).toBeFalsy();
    await page.locator("[data-reels-audio]").click();
    await page.locator('[data-reels-len="15"]').click();
    await page.locator("[data-reels-post]").click();
    await expect.poll(async () => getKey(page, "itt20-reels")).toBeTruthy();
    const blob = await blobOf(page, "itt20-reels");
    expect(blob.real).toBe(true);
    expect(blob.seconds).toBe(15);
    await assertOnlyItt20(page);
  });

  test("GPT-3 ChatGPT trap never writes; waitlist writes", async ({ page }) => {
    await openClean(page, "/years/2020/sites/openai/index.html", "itt20-gpt3");
    await page.locator("[data-gpt-chat]").click();
    expect(await getKey(page, "itt20-gpt3")).toBeFalsy();
    await page.locator("[data-gpt-wait]").click();
    expect(await getKey(page, "itt20-gpt3")).toBeFalsy();
    await page.fill("[data-gpt-email]", "waitlist@museum");
    await page.locator("[data-gpt-wait]").click();
    await expect.poll(async () => getKey(page, "itt20-gpt3")).toBeTruthy();
    const blob = await blobOf(page, "itt20-gpt3");
    expect(blob.real).toBe(true);
    expect(blob.notChat).toBe(true);
    await assertOnlyItt20(page);
  });

  test("Flash Play / YouTube pick never writes; Newgrounds + uninstall writes", async ({ page }) => {
    await openClean(page, "/years/2020/sites/flash/index.html", "itt20-flash");
    await page.locator("[data-flash-play]").click();
    expect(await getKey(page, "itt20-flash")).toBeFalsy();
    await page.locator("[data-flash-uninstall]").click();
    expect(await getKey(page, "itt20-flash")).toBeFalsy();
    await page.locator('[data-flash-site="youtube"]').click();
    await page.locator("[data-flash-uninstall]").click();
    expect(await getKey(page, "itt20-flash")).toBeFalsy();
    await page.locator('[data-flash-site="newgrounds"]').click();
    await page.locator("[data-flash-uninstall]").click();
    await expect.poll(async () => getKey(page, "itt20-flash")).toBeTruthy();
    const blob = await blobOf(page, "itt20-flash");
    expect(blob.real).toBe(true);
    expect(blob.site).toBe("newgrounds");
    await assertOnlyItt20(page);
  });

  test("TikTok banned / empty caption never writes; leftover FYP writes", async ({ page }) => {
    await openClean(page, "/years/2020/sites/tiktok/index.html", "itt20-tiktok-eo");
    await page.locator("[data-eo-ban]").click();
    expect(await getKey(page, "itt20-tiktok-eo")).toBeFalsy();
    await page.locator("[data-eo-open]").click();
    expect(await getKey(page, "itt20-tiktok-eo")).toBeFalsy();
    await page.locator('[data-eo-pick="banned"]').click();
    await page.locator("[data-eo-open]").click();
    expect(await getKey(page, "itt20-tiktok-eo")).toBeFalsy();
    await page.locator('[data-eo-pick="fyp"]').click();
    await page.locator("[data-eo-open]").click();
    expect(await getKey(page, "itt20-tiktok-eo")).toBeFalsy();
    await page.fill("[data-eo-caption]", "leftover fyp");
    await page.locator("[data-eo-open]").click();
    await expect.poll(async () => getKey(page, "itt20-tiktok-eo")).toBeTruthy();
    const blob = await blobOf(page, "itt20-tiktok-eo");
    expect(blob.real).toBe(true);
    expect(blob.stillWorks).toBe(true);
    await assertOnlyItt20(page);
  });

  test("WTI buy / Dec / GameStop never writes; May + no-delivery writes", async ({ page }) => {
    await openClean(page, "/years/2020/sites/markets/wti.html", "itt20-wti");
    await page.locator("[data-wti-buy]").click();
    expect(await getKey(page, "itt20-wti")).toBeFalsy();
    await page.locator("[data-wti-ack]").click();
    expect(await getKey(page, "itt20-wti")).toBeFalsy();
    await page.locator('[data-wti-pick="dec"]').click();
    await page.locator("[data-wti-ack]").click();
    expect(await getKey(page, "itt20-wti")).toBeFalsy();
    await page.locator('[data-wti-pick="gme"]').click();
    await page.locator("[data-wti-ack]").click();
    expect(await getKey(page, "itt20-wti")).toBeFalsy();
    await page.locator('[data-wti-pick="may"]').click();
    await page.locator("[data-wti-ack]").click();
    await expect.poll(async () => getKey(page, "itt20-wti")).toBeTruthy();
    const blob = await blobOf(page, "itt20-wti");
    expect(blob.real).toBe(true);
    expect(blob.noDelivery).toBe(true);
    expect(blob.settle).toBe(-37.63);
    await assertOnlyItt20(page);
  });

  test("Edge Legacy pick never writes; Edge 79 + set writes", async ({ page }) => {
    await openClean(page, "/years/2020/sites/edge/index.html", "itt20-edge");
    await page.locator("[data-edge-set]").click();
    expect(await getKey(page, "itt20-edge")).toBeFalsy();
    await page.locator("[data-edge-set]").click();
    expect(await getKey(page, "itt20-edge")).toBeFalsy();
    await page.locator('[data-edge-pick="legacy"]').click();
    await page.locator("[data-edge-set]").click();
    expect(await getKey(page, "itt20-edge")).toBeFalsy();
    await page.locator('[data-edge-pick="79"]').click();
    await page.locator("[data-edge-set]").click();
    await expect.poll(async () => getKey(page, "itt20-edge")).toBeTruthy();
    const blob = await blobOf(page, "itt20-edge");
    expect(blob.real).toBe(true);
    expect(blob.version).toBe(79);
    await assertOnlyItt20(page);
  });

  test("CCPA Accept All / Sell never writes; Do Not Sell writes", async ({ page }) => {
    await openClean(page, "/years/2020/sites/ccpa/index.html", "itt20-ccpa");
    await page.locator("[data-ccpa-accept]").click();
    expect(await getKey(page, "itt20-ccpa")).toBeFalsy();
    await page.locator("[data-ccpa-dns]").click();
    expect(await getKey(page, "itt20-ccpa")).toBeFalsy();
    await page.locator('[data-ccpa-pick="sell"]').click();
    await page.locator("[data-ccpa-dns]").click();
    expect(await getKey(page, "itt20-ccpa")).toBeFalsy();
    await page.locator('[data-ccpa-pick="dns"]').click();
    await page.locator("[data-ccpa-dns]").click();
    await expect.poll(async () => getKey(page, "itt20-ccpa")).toBeTruthy();
    const blob = await blobOf(page, "itt20-ccpa");
    expect(blob.real).toBe(true);
    expect(blob.doNotSell).toBe(true);
    await assertOnlyItt20(page);
  });

  test("Chrome switch / empty URL never writes; habit + URL writes", async ({ page }) => {
    await openClean(page, "/years/2020/sites/chrome/index.html", "itt20-chrome");
    await page.locator("[data-ch-switch]").click();
    expect(await getKey(page, "itt20-chrome")).toBeFalsy();
    await page.locator("[data-ch-ack]").click();
    expect(await getKey(page, "itt20-chrome")).toBeFalsy();
    await page.locator('[data-ch-pick="edge"]').click();
    await page.locator("[data-ch-ack]").click();
    expect(await getKey(page, "itt20-chrome")).toBeFalsy();
    await page.locator('[data-ch-pick="habit"]').click();
    await page.locator("[data-ch-ack]").click();
    expect(await getKey(page, "itt20-chrome")).toBeFalsy();
    await page.fill("[data-ch-field]", "youtube.com");
    await page.locator("[data-ch-ack]").click();
    await expect.poll(async () => getKey(page, "itt20-chrome")).toBeTruthy();
    const blob = await blobOf(page, "itt20-chrome");
    expect(blob.real).toBe(true);
    expect(blob.habit).toBe(true);
    await assertOnlyItt20(page);
  });

  test("Win10 Get / Win11 never writes; stay mass writes", async ({ page }) => {
    await openClean(page, "/years/2020/sites/windows10/index.html", "itt20-win10");
    await page.locator("[data-w10-get]").click();
    expect(await getKey(page, "itt20-win10")).toBeFalsy();
    await page.locator("[data-w10-ack]").click();
    expect(await getKey(page, "itt20-win10")).toBeFalsy();
    await page.locator('[data-w10-pick="get"]').click();
    await page.locator("[data-w10-ack]").click();
    expect(await getKey(page, "itt20-win10")).toBeFalsy();
    await page.locator('[data-w10-pick="win11"]').click();
    await page.locator("[data-w10-ack]").click();
    expect(await getKey(page, "itt20-win10")).toBeFalsy();
    await page.locator('[data-w10-pick="stay"]').click();
    await page.locator("[data-w10-ack]").click();
    await expect.poll(async () => getKey(page, "itt20-win10")).toBeTruthy();
    const blob = await blobOf(page, "itt20-win10");
    expect(blob.real).toBe(true);
    expect(blob.mass).toBe(true);
    await assertOnlyItt20(page);
  });

  test("Meet Zoom-chip / empty code never writes; leftover join writes", async ({ page }) => {
    await openClean(page, "/years/2020/sites/meet/index.html", "itt20-meet");
    await page.locator("[data-meet-zoom]").click();
    expect(await getKey(page, "itt20-meet")).toBeFalsy();
    expect(await getKey(page, "itt20-zoom")).toBeFalsy();
    await page.locator("[data-meet-join]").click();
    expect(await getKey(page, "itt20-meet")).toBeFalsy();
    await page.fill("[data-meet-code]", "abc-defg-hij");
    await page.locator("[data-meet-join]").click();
    await expect.poll(async () => getKey(page, "itt20-meet")).toBeTruthy();
    expect(await getKey(page, "itt20-zoom")).toBeFalsy();
    const blob = await blobOf(page, "itt20-meet");
    expect(blob.real).toBe(true);
    expect(blob.notStar).toBe(true);
    await assertOnlyItt20(page);
  });

  test("Sus Vote New Game / 0 ticks / no pick never writes; eject writes", async ({ page }) => {
    await openClean(page, "/years/2020/sites/playable/game.html", "itt20-game-among");
    await page.locator("[data-sus-eject]").click();
    expect(await getKey(page, "itt20-game-among")).toBeFalsy();
    await page.locator("[data-game-start]").click();
    await page.locator("[data-sus-eject]").click();
    expect(await getKey(page, "itt20-game-among")).toBeFalsy();
    await page.locator("[data-sus-req]").nth(0).check();
    await page.locator("[data-sus-req]").nth(1).check();
    await page.locator("[data-sus-eject]").click();
    expect(await getKey(page, "itt20-game-among")).toBeFalsy();
    await page.locator('[data-sus-pick="red"]').click();
    await page.locator("[data-sus-eject]").click();
    await expect.poll(async () => getKey(page, "itt20-game-among")).toBeTruthy();
    const blob = await blobOf(page, "itt20-game-among");
    expect(blob.real).toBe(true);
    expect(blob.vote).toBe("red");
    await assertOnlyItt20(page);
  });

  test("extra-a Join / one mute never writes; three mutes write", async ({ page }) => {
    await openClean(page, "/years/2020/sites/playable/extra-a.html", "itt20-extra-a");
    await page.locator("[data-extra-a-join]").click();
    expect(await getKey(page, "itt20-extra-a")).toBeFalsy();
    await page.locator("[data-extra-a-mute]").click();
    expect(await getKey(page, "itt20-extra-a")).toBeFalsy();
    await page.locator("[data-extra-a-mute]").click();
    expect(await getKey(page, "itt20-extra-a")).toBeFalsy();
    await page.locator("[data-extra-a-mute]").click();
    await expect.poll(async () => getKey(page, "itt20-extra-a")).toBeTruthy();
    const blob = await blobOf(page, "itt20-extra-a");
    expect(blob.real).toBe(true);
    expect(blob.taps).toBe(3);
    await assertOnlyItt20(page);
  });

  test("extra-b empty / users never writes; participants writes", async ({ page }) => {
    await openClean(page, "/years/2020/sites/playable/extra-b.html", "itt20-extra-b");
    await page.locator("[data-extra-b-save]").click();
    expect(await getKey(page, "itt20-extra-b")).toBeFalsy();
    await page.fill("[data-extra-b-field]", "users");
    await page.locator("[data-extra-b-save]").click();
    expect(await getKey(page, "itt20-extra-b")).toBeFalsy();
    await page.fill("[data-extra-b-field]", "participants");
    await page.locator("[data-extra-b-save]").click();
    await expect.poll(async () => getKey(page, "itt20-extra-b")).toBeTruthy();
    const blob = await blobOf(page, "itt20-extra-b");
    expect(blob.real).toBe(true);
    await assertOnlyItt20(page);
  });

  test("thesis incomplete never writes; two ticks write", async ({ page }) => {
    await openClean(page, "/years/2020/pages/about.html", "itt20-thesis-ack");
    await page.locator("[data-itt-real-save]").click();
    expect(await getKey(page, "itt20-thesis-ack")).toBeFalsy();
    expect(await getKey(page, "itt20-zoom")).toBeFalsy();
    await page.locator("[data-thesis-req]").nth(0).check();
    await page.locator("[data-thesis-req]").nth(1).check();
    await page.locator("[data-itt-real-save]").click();
    await expect.poll(async () => getKey(page, "itt20-thesis-ack"), { timeout: 8000 }).toBeTruthy();
    expect(await getKey(page, "itt20-zoom")).toBeFalsy();
    await assertOnlyItt20(page);
  });

  test("Mixer Twitch/FB pick never writes; Nowhere writes", async ({ page }) => {
    await openClean(page, "/years/2020/sites/mixer/index.html", "itt20-mixer");
    await page.locator("[data-mx-save]").click();
    expect(await getKey(page, "itt20-mixer")).toBeFalsy();
    await page.locator('[data-mx-pick="twitch"]').click();
    await page.locator("[data-mx-save]").click();
    expect(await getKey(page, "itt20-mixer")).toBeFalsy();
    await page.locator('[data-mx-pick="nowhere"]').click();
    await page.locator("[data-mx-save]").click();
    await expect.poll(async () => getKey(page, "itt20-mixer")).toBeTruthy();
    await assertOnlyItt20(page);
  });

  test("Twitter hack send / 1 flag never writes; 3 flags write", async ({ page }) => {
    await openClean(page, "/years/2020/sites/twitter/hack.html", "itt20-tw-hack");
    await page.locator("[data-tw-send]").click();
    expect(await getKey(page, "itt20-tw-hack")).toBeFalsy();
    await page.locator('[data-tw-flag="a"]').click();
    await page.locator("[data-tw-save]").click();
    expect(await getKey(page, "itt20-tw-hack")).toBeFalsy();
    await page.locator('[data-tw-flag="b"]').click();
    await page.locator('[data-tw-flag="c"]').click();
    await page.locator("[data-tw-save]").click();
    await expect.poll(async () => getKey(page, "itt20-tw-hack")).toBeTruthy();
    await assertOnlyItt20(page);
  });

  test("HBO Max Disney+ trap never writes; leftover title writes", async ({ page }) => {
    await openClean(page, "/years/2020/sites/hbomax/index.html", "itt20-hbomax");
    await page.locator("[data-hbo-trial]").click();
    expect(await getKey(page, "itt20-hbomax")).toBeFalsy();
    await page.locator('[data-hbo-pick="dplus"]').click();
    await page.locator("[data-hbo-watch]").click();
    expect(await getKey(page, "itt20-hbomax")).toBeFalsy();
    await page.locator('[data-hbo-pick="watchmen-class"]').click();
    await page.locator("[data-hbo-watch]").click();
    await expect.poll(async () => getKey(page, "itt20-hbomax")).toBeTruthy();
    await assertOnlyItt20(page);
  });

  test("Peacock HBO trap never writes; leftover title writes", async ({ page }) => {
    await openClean(page, "/years/2020/sites/peacock/index.html", "itt20-peacock");
    await page.locator("[data-pk-hbo]").click();
    expect(await getKey(page, "itt20-peacock")).toBeFalsy();
    await page.locator('[data-pk-pick="hbo"]').click();
    await page.locator("[data-pk-watch]").click();
    expect(await getKey(page, "itt20-peacock")).toBeFalsy();
    await page.locator('[data-pk-pick="office-class"]').click();
    await page.locator("[data-pk-watch]").click();
    await expect.poll(async () => getKey(page, "itt20-peacock")).toBeTruthy();
    await assertOnlyItt20(page);
  });

  test("Epic App Store trap never writes; sideload writes", async ({ page }) => {
    await openClean(page, "/years/2020/sites/epic/index.html", "itt20-epic");
    await page.locator("[data-epic-store]").click();
    expect(await getKey(page, "itt20-epic")).toBeFalsy();
    await page.locator('[data-epic-pick="store"]').click();
    await page.locator("[data-epic-save]").click();
    expect(await getKey(page, "itt20-epic")).toBeFalsy();
    await page.locator('[data-epic-pick="sideload"]').click();
    await page.locator("[data-epic-save]").click();
    await expect.poll(async () => getKey(page, "itt20-epic")).toBeTruthy();
    await assertOnlyItt20(page);
  });

  test("SpaceHey Join trap / empty never writes; add friend writes", async ({ page }) => {
    await openClean(page, "/years/2020/sites/spacehey/index.html", "itt20-spacehey");
    await page.locator("[data-shy-join]").click();
    expect(await getKey(page, "itt20-spacehey")).toBeFalsy();
    await page.locator("[data-shy-add]").click();
    expect(await getKey(page, "itt20-spacehey")).toBeFalsy();
    await page.fill("[data-shy-name]", "leftover");
    await page.locator("[data-shy-add]").click();
    await expect.poll(async () => getKey(page, "itt20-spacehey")).toBeTruthy();
    await assertOnlyItt20(page);
  });

  test("Zoom waiting-room admit never writes the star", async ({ page }) => {
    await openClean(page, "/years/2020/sites/zoom/index.html", "itt20-zoom");
    await page.locator("[data-zoom-admit]").click();
    expect(await getKey(page, "itt20-zoom")).toBeFalsy();
    await page.locator("[data-zoom-join]").click();
    expect(await getKey(page, "itt20-zoom")).toBeFalsy();
  });

  test("ACNH official Nook trap never writes pop3", async ({ page }) => {
    await openClean(page, "/years/2020/sites/acnh/index.html", "itt20-pop3-acnh");
    await page.locator("[data-acnh-nook]").click();
    expect(await getKey(page, "itt20-pop3-acnh")).toBeFalsy();
  });

  test("famous Brick Bat Start never writes", async ({ page }) => {
    await openClean(page, "/years/2020/sites/playable/famous.html", "itt20-game-breakout");
    await page.locator('[data-game-id="breakout"] [data-game-start]').click();
    expect(await getKey(page, "itt20-game-breakout")).toBeFalsy();
    expect(await getKey(page, "itt20-game-memory")).toBeFalsy();
  });
});

test.describe("2020 first 3× leftover", () => {
  test("YouTube empty / no pick never writes · complete writes", async ({ page }) => {
    await completePop(page, "/years/2020/sites/youtube/index.html", "itt20-pop-youtube");
  });
  test("Wikipedia empty / no pick never writes · complete writes", async ({ page }) => {
    await completePop(page, "/years/2020/sites/wikipedia/index.html", "itt20-pop-wikipedia");
  });
  test("Facebook empty / no pick never writes · complete writes", async ({ page }) => {
    await completePop(page, "/years/2020/sites/facebook/index.html", "itt20-pop-facebook");
  });
});

test.describe("2020 second leftover 3× — unique vs third", () => {
  test("home pop-more is Meet · Mixer · HBO Max and not the third trio", async ({ page }) => {
    await page.goto("/years/2020/pages/home.html");
    await expect(page.locator("#ott-guided-2020 ol > li")).toHaveCount(6);
    await expect(page.locator('[data-ott-one-thing="2020"]')).toHaveAttribute("href", /zoom\/meeting/);
    const more = page.locator('[data-itt-pop-more="2020"] a[href*="sites/"]');
    const third = page.locator('[data-itt-pop-3x3="2020"] a[href*="sites/"]');
    await expect(more).toHaveCount(3);
    await expect(third).toHaveCount(3);
    const moreH = await more.evaluateAll((as) => as.map((a) => a.getAttribute("href") || ""));
    const thirdH = await third.evaluateAll((as) => as.map((a) => a.getAttribute("href") || ""));
    expect(moreH.join(" ")).toMatch(/meet\//);
    expect(moreH.join(" ")).toMatch(/mixer\//);
    expect(moreH.join(" ")).toMatch(/hbomax\//);
    for (const h of moreH) expect(thirdH).not.toContain(h);
  });
});

test.describe("2020 third leftover 3×", () => {
  test("ACNH empty / no pick never writes · complete writes", async ({ page }) => {
    await completePop(page, "/years/2020/sites/acnh/index.html", "itt20-pop3-acnh");
  });
  test("Astronomical empty / no pick never writes · complete writes", async ({ page }) => {
    await completePop(page, "/years/2020/sites/astro/index.html", "itt20-pop3-astro");
  });
  test("Quibi empty / no pick never writes · complete writes", async ({ page }) => {
    await completePop(page, "/years/2020/sites/quibi/index.html", "itt20-pop3-quibi");
  });
});
