// @ts-check
/**
 * 2000 leftover stops 21–40.
 * Empty action stores nothing. The real action stores { real, leftover:true }.
 * Official n=1–10 are not these keys.
 */
const { test, expect } = require("@playwright/test");

async function getKey(page, key) {
  return page.evaluate((k) => localStorage.getItem(k), key);
}

async function openFresh(page, slug) {
  const key = "itt00-" + slug;
  await page.goto("/years/2000/sites/" + slug + "/index.html");
  await page.evaluate((k) => localStorage.removeItem(k), key);
  await page.reload();
  await page.waitForTimeout(400);
  return key;
}

function expectLeftover(raw) {
  const blob = JSON.parse(raw || "null");
  expect(blob && blob.real).toBe(true);
  expect(blob.leftover).toBe(true);
  expect(blob.official).toBeFalsy();
  expect(blob.year).toBe("2000");
}

const FLOWS = [
  { slug: "ig", gate: "field", fill: "you@ig.com.br" },
  { slug: "sothebys", gate: "field", fill: "piano" },
  { slug: "farmclub", gate: "pick", pick: "demo" },
  { slug: "emoneymail", gate: "field", fill: "you@college.edu" },
  { slug: "libertad-digital", gate: "tick" },
  { slug: "globo", gate: "tick" },
  { slug: "scour", gate: "field", fill: "mp3 song" },
  { slug: "launch", gate: "pick", pick: "video" },
  { slug: "ukrainska-pravda", gate: "tick" },
  { slug: "paybox", gate: "field", fill: "1234" },
  { slug: "site59", gate: "pick", pick: "weekend" },
  { slug: "cahoot", gate: "field", fill: "Ada" },
  { slug: "eluxury", gate: "pick", pick: "vuitton" },
  { slug: "ucsc-genome", gate: "field", fill: "BRCA" },
  { slug: "bigbrother", gate: "wait" },
  { slug: "emusic", gate: "pick", pick: "track" },
  { slug: "seganet", gate: "pick", pick: "east" },
  { slug: "foldingathome", gate: "wait" },
  { slug: "idealista", gate: "field", fill: "Salamanca" },
  { slug: "voteswap2000", gate: "tick" },
];

for (const flow of FLOWS) {
  test("2000 " + flow.slug + " empty stores nothing; the action stores leftover", async ({ page }) => {
    const key = await openFresh(page, flow.slug);
    const save = page.locator("[data-lo-save]");
    await save.click();
    expect(await getKey(page, key)).toBeFalsy();
    await page.locator("[data-lo-trap]").click();
    expect(await getKey(page, key)).toBeFalsy();
    if (flow.gate === "field") {
      await page.locator("[data-lo-field]").fill(flow.fill);
    } else if (flow.gate === "pick") {
      await page.locator('[data-lo-pick="' + flow.pick + '"]').click();
    } else if (flow.gate === "tick") {
      await page.locator("[data-lo-req]").check();
    } else {
      await page.locator("[data-lo-wait]").click();
      await page.waitForTimeout(1000);
    }
    await save.click();
    await expect.poll(() => getKey(page, key)).toBeTruthy();
    expectLeftover(await getKey(page, key));
    expect(await getKey(page, "itt00-mapquest")).toBeFalsy();
  });
}
