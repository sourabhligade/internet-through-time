// @ts-check
/**
 * Phase 3 lock for 1998–2001. Empty, trap, one character, and a Wikipedia
 * Save before official-verb is bound leave the star empty. Preview is not
 * Save. The 1,539-page walk is phase 6.
 */
const { test, expect } = require("@playwright/test");

async function raw(page, key) {
  return page.evaluate((k) => localStorage.getItem(k), key);
}

async function clearKeys(page, keys) {
  await page.evaluate((list) => {
    list.forEach((k) => localStorage.removeItem(k));
  }, keys);
}

async function verbReady(page) {
  await page.waitForFunction(
    () => {
      const verbs = document.querySelectorAll("[data-official-verb]");
      if (!verbs.length) return document.readyState === "complete";
      return [...verbs].every((el) => el.getAttribute("data-official-verb-bound") === "1");
    },
    null,
    { timeout: 15000 }
  );
}

test.describe("1998-2001 phase 3 empty holds", () => {
  test("Lucky empty, trap, and one character leave the star empty", async ({ page }) => {
    await page.goto("/years/1998/sites/google/lucky.html");
    await verbReady(page);
    await clearKeys(page, ["itt98-lucky"]);
    await page.locator("[data-google-lucky]").click();
    expect(await raw(page, "itt98-lucky")).toBeNull();
    await page.locator("[data-lucky-trap]").click();
    expect(await raw(page, "itt98-lucky")).toBeNull();
    await page.fill('input[name="q"]', "x");
    await page.locator("[data-google-lucky]").click();
    expect(await raw(page, "itt98-lucky")).toBeNull();
  });

  test("AIM empty, one character, and two characters leave the star empty", async ({ page }) => {
    await page.goto("/years/1999/sites/aim/index.html");
    await page.waitForSelector("[data-aim-signon]");
    await clearKeys(page, ["itt99-aim", "itt99-aim-user"]);
    await page.locator("[data-aim-signon] button[type='submit']").click();
    expect(await raw(page, "itt99-aim")).toBeNull();
    expect(await raw(page, "itt99-aim-user")).toBeNull();
    await page.fill("[name='sn']", "x");
    await page.locator("[data-aim-signon] button[type='submit']").click();
    expect(await raw(page, "itt99-aim")).toBeNull();
    await page.fill("[name='sn']", "ab");
    await page.locator("[data-aim-signon] button[type='submit']").click();
    expect(await raw(page, "itt99-aim")).toBeNull();
    await page.locator("[data-lo-trap]").first().click();
    expect(await raw(page, "itt99-aim")).toBeNull();
  });

  test("MapQuest empty, one character, missing To, and trap leave the star empty", async ({ page }) => {
    await page.goto("/years/2000/sites/mapquest/index.html");
    await verbReady(page);
    await clearKeys(page, ["itt00-mapquest", "itt00-mapquest-trip"]);
    await page.locator("[data-official-verb]").click();
    expect(await raw(page, "itt00-mapquest")).toBeNull();
    await page.fill("[name='from']", "x");
    await page.locator("[data-official-verb]").click();
    expect(await raw(page, "itt00-mapquest")).toBeNull();
    await page.fill("[name='from']", "123 Main St");
    await page.locator("[data-official-verb]").click();
    expect(await raw(page, "itt00-mapquest")).toBeNull();
    await page.fill("[name='to']", "x");
    await page.locator("[data-official-verb]").click();
    expect(await raw(page, "itt00-mapquest")).toBeNull();
    await page.locator("[data-mq-trap]").click();
    expect(await raw(page, "itt00-mapquest")).toBeNull();
    await page.locator("[data-lo-trap]").first().click();
    expect(await raw(page, "itt00-mapquest")).toBeNull();
  });

  test("Wikipedia Save before bind, empty, one character, and Preview leave the star empty", async ({
    page,
  }) => {
    await page.goto("/years/2001/sites/wikipedia/edit.html");
    await page.waitForSelector("[data-wiki-save]");
    await clearKeys(page, ["itt01-wiki", "itt01-wiki-pages"]);
    await page.fill("[data-wiki-body]", "museum");
    const bound = await page.locator("[data-wiki-save]").getAttribute("data-official-verb-bound");
    if (bound !== "1") {
      await page.locator("[data-wiki-save]").click();
      expect(await raw(page, "itt01-wiki")).toBeNull();
      expect(await raw(page, "itt01-wiki-pages")).toBeNull();
    }
    await verbReady(page);
    await clearKeys(page, ["itt01-wiki", "itt01-wiki-pages"]);
    await page.fill("[data-wiki-body]", "");
    await page.locator("[data-wiki-save]").click();
    expect(await raw(page, "itt01-wiki")).toBeNull();
    await page.fill("[data-wiki-body]", "x");
    await page.locator("[data-wiki-save]").click();
    expect(await raw(page, "itt01-wiki")).toBeNull();
    expect(await raw(page, "itt01-wiki-pages")).toBeNull();
    await page.fill("[data-wiki-body]", "museum");
    await page.locator("[data-wiki-preview]").first().click();
    expect(await raw(page, "itt01-wiki")).toBeNull();
    await page.locator("[data-lo-trap]").first().click();
    expect(await raw(page, "itt01-wiki")).toBeNull();
  });

  test("Wikipedia museum after bind writes official", async ({ page }) => {
    await page.goto("/years/2001/sites/wikipedia/edit.html");
    await verbReady(page);
    await clearKeys(page, ["itt01-wiki", "itt01-wiki-pages"]);
    await page.fill("[data-wiki-body]", "x");
    await page.locator("[data-wiki-save]").click();
    expect(await raw(page, "itt01-wiki")).toBeNull();
    await page.fill("[data-wiki-body]", "museum");
    await page.locator("[data-wiki-save]").click();
    await expect.poll(() => raw(page, "itt01-wiki"), { timeout: 8000 }).toBeTruthy();
    const saved = JSON.parse((await raw(page, "itt01-wiki")) || "null");
    expect(saved.kind).toBe("official");
    expect(saved.real).toBe(true);
    expect(saved.year).toBe("2001");
    expect(saved.key).toBe("itt01-wiki");
  });
});
