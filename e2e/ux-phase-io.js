// @ts-check
/**
 * Shared I/O for museum-grade UX phase locks.
 * Off dest-true 12. Do not dest-farm.
 */
const { expect } = require("@playwright/test");

/**
 * @param {import("@playwright/test").Page} page
 * @param {string} key
 */
async function getKey(page, key) {
  return page.evaluate((k) => localStorage.getItem(k), key);
}

/**
 * @param {import("@playwright/test").Page} page
 */
async function verbReady(page) {
  await page.waitForFunction(() => {
    const verbs = document.querySelectorAll("[data-official-verb]");
    if (!verbs.length) return document.readyState === "complete";
    return [...verbs].every((el) => el.getAttribute("data-official-verb-bound") === "1");
  }, null, { timeout: 15000 });
}

/**
 * Tick honesty + need, then the first official verb.
 * @param {import("@playwright/test").Page} page
 */
async function finishOfficial(page) {
  const boxes = page.locator("[data-official-req], [data-req]");
  const n = await boxes.count();
  for (let i = 0; i < n; i++) await boxes.nth(i).check();
  const need = page.locator("[data-official-need]").first();
  if (await need.count()) await need.fill("leftover residual");
  await page.locator("[data-official-verb]").first().click();
}

/**
 * Official-verb bound inside the year iframe.
 * @param {import("@playwright/test").Page} page
 */
async function verbReadyInFrame(page) {
  await page.waitForFunction(() => {
    try {
      const doc = document.getElementById("content") && document.getElementById("content").contentDocument;
      if (!doc) return false;
      const verbs = doc.querySelectorAll("[data-official-verb]");
      if (!verbs.length) return doc.readyState === "complete";
      return [...verbs].every((el) => el.getAttribute("data-official-verb-bound") === "1");
    } catch (e) {
      return false;
    }
  }, null, { timeout: 20000 });
}

/**
 * Tick honesty + need, then the first official verb in a frame.
 * @param {import("@playwright/test").FrameLocator} frame
 */
async function finishOfficialIn(frame) {
  const boxes = frame.locator("[data-official-req], [data-req]");
  const n = await boxes.count();
  for (let i = 0; i < n; i++) await boxes.nth(i).check();
  const need = frame.locator("[data-official-need]").first();
  if (await need.count()) await need.fill("leftover residual");
  await frame.locator("[data-official-verb]").first().click();
}

/**
 * @param {import("@playwright/test").Page} page
 * @param {string} key
 */
async function envelope(page, key) {
  const raw = await getKey(page, key);
  expect(raw, key).toBeTruthy();
  const blob = JSON.parse(raw || "{}");
  expect(blob.v, key + " v").toBe(1);
  expect(blob.real, key + " real").toBe(true);
  expect(blob.kind, key + " kind").toBe("official");
  return blob;
}

/**
 * Visitor-facing status on HTML dests.
 * @param {import("@playwright/test").Page} page
 */
async function statusText(page) {
  return page.evaluate(() => {
    const sel =
      "[data-official-status], [data-pogo-status], [data-fb-react-status], [data-ig-story-status], [data-wa-e2e-status], [data-iphone7-status], [role='status']";
    const texts = Array.from(document.querySelectorAll(sel)).map((el) => {
      return String(el.textContent || "").replace(/\s+/g, " ").trim();
    }).filter(Boolean);
    const saved = texts.find((t) => t === "Saved." || t === "This browser blocked the save.");
    return saved || texts[0] || "";
  });
}

module.exports = {
  getKey,
  verbReady,
  finishOfficial,
  verbReadyInFrame,
  finishOfficialIn,
  envelope,
  statusText,
};
