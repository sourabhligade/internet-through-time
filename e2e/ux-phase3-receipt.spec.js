// @ts-check
/**
 * Museum-grade UX phase 3. Accepted write prints Saved.
 * Keys stay in storage. They leave the glass.
 * Off dest-true 12. Do not dest-farm.
 */
const { test, expect } = require("@playwright/test");
const { completeReactStop, contentFrame, enterYear, goInFrame } = require("./helpers.js");
const {
  getKey,
  verbReady,
  finishOfficial,
  verbReadyInFrame,
  finishOfficialIn,
  envelope,
  statusText,
} = require("./ux-phase-io.js");

async function openDest(page, path, key) {
  await page.goto(path);
  await verbReady(page);
  await page.evaluate((k) => localStorage.removeItem(k), key);
}

async function statusPaint(page, sel) {
  return page.evaluate((s) => {
    const el = document.querySelector(s);
    if (!el) return null;
    const cs = getComputedStyle(el);
    return {
      text: String(el.textContent || "").replace(/\s+/g, " ").trim(),
      color: cs.color,
    };
  }, sel);
}

async function expectSavedGlass(page, key) {
  await expect.poll(() => getKey(page, key), { timeout: 8000 }).toBeTruthy();
  await envelope(page, key);
  await expect.poll(() => statusText(page), { timeout: 8000 }).toMatch(/^(Saved\.|This browser blocked the save\.)$/);
  const text = await statusText(page);
  expect(text).not.toMatch(/itt1[56]-/);
  await expect(page.locator("[data-official-status]").first()).not.toContainText(/itt1[56]-/);
  const paint = await statusPaint(page, "[data-official-status]");
  if (paint && paint.text === "Saved.") expect(paint.color).toBe("rgb(0, 102, 0)");
}

test.describe("UX phase 3 receipt glass", () => {
  test("Stories empty and trap hold in red and write nothing", async ({ page }) => {
    await openDest(page, "/years/2016/sites/instagram/stories.html", "itt16-ig-stories");
    await page.locator("[data-official-verb]").first().click();
    expect(await getKey(page, "itt16-ig-stories")).toBeNull();
    const empty = await statusPaint(page, "[data-official-status]");
    expect(empty, "empty hold").toBeTruthy();
    expect(empty.text).toMatch(/never writes/);
    expect(empty.color).toBe("rgb(170, 0, 0)");
    const trap = page.locator("[data-official-trap]").first();
    if (await trap.count()) {
      await trap.click();
      expect(await getKey(page, "itt16-ig-stories")).toBeNull();
      const held = await statusPaint(page, "[data-official-status]");
      expect(held.text).toMatch(/never writes/);
      expect(held.color).toBe("rgb(170, 0, 0)");
    }
  });

  test("Stories official finish says Saved. with no key on the glass", async ({ page }) => {
    await openDest(page, "/years/2016/sites/instagram/stories.html", "itt16-ig-stories");
    await finishOfficial(page);
    await expectSavedGlass(page, "itt16-ig-stories");
  });

  test("Pokémon GO official finish says Saved. with no key on the glass", async ({ page }) => {
    await openDest(page, "/years/2016/sites/pokemongo/index.html", "itt16-pogo");
    await finishOfficial(page);
    await expectSavedGlass(page, "itt16-pogo");
  });

  test("Reactions official finish says Saved. with no key on the glass", async ({ page }) => {
    await openDest(page, "/years/2016/sites/facebook/reactions.html", "itt16-fb-react");
    await finishOfficial(page);
    await expectSavedGlass(page, "itt16-fb-react");
  });

  test("E2E official finish says Saved. with no key on the glass", async ({ page }) => {
    await openDest(page, "/years/2016/sites/whatsapp/e2e.html", "itt16-wa-e2e");
    await finishOfficial(page);
    await expectSavedGlass(page, "itt16-wa-e2e");
  });

  for (const row of [
    { name: "Pokémon GO", path: "/years/2016/sites/pokemongo/index.html", key: "itt16-pogo" },
    { name: "Reactions", path: "/years/2016/sites/facebook/reactions.html", key: "itt16-fb-react" },
    { name: "E2E", path: "/years/2016/sites/whatsapp/e2e.html", key: "itt16-wa-e2e" },
  ]) {
    test(row.name + " empty and trap hold in red and write nothing", async ({ page }) => {
      await openDest(page, row.path, row.key);
      await page.locator("[data-official-verb]").first().click();
      expect(await getKey(page, row.key)).toBeNull();
      const empty = await statusPaint(page, "[data-official-status]");
      expect(empty, "empty hold").toBeTruthy();
      expect(empty.text).toMatch(/never writes/);
      expect(empty.color).toBe("rgb(170, 0, 0)");
      const trap = page.locator("[data-official-trap]").first();
      if (await trap.count()) {
        await trap.click();
        expect(await getKey(page, row.key)).toBeNull();
        const held = await statusPaint(page, "[data-official-status]");
        expect(held.text).toMatch(/never writes/);
        expect(held.color).toBe("rgb(170, 0, 0)");
      }
    });
  }

  test("Stories honesty and Saved. sit inside the 2016 year iframe", async ({ page }) => {
    await enterYear(page, "2016");
    await page.waitForFunction(() => {
      try {
        const frame = document.getElementById("content");
        const doc = frame && frame.contentDocument;
        return !!(doc && doc.querySelector(".ott-guided"));
      } catch (e) {
        return false;
      }
    }, null, { timeout: 20000 });
    await goInFrame(page, "sites/instagram/stories.html");
    await verbReadyInFrame(page);
    await page.evaluate(() => localStorage.removeItem("itt16-ig-stories"));
    const frame = contentFrame(page);
    await expect(frame.locator("html")).toHaveAttribute("data-official-key", "itt16-ig-stories");
    await frame.locator("[data-official-verb]").first().click();
    expect(await getKey(page, "itt16-ig-stories")).toBeNull();
    const empty = await frame.locator("[data-official-status]").first().evaluate((el) => {
      const cs = getComputedStyle(el);
      return {
        text: String(el.textContent || "").replace(/\s+/g, " ").trim(),
        color: cs.color,
      };
    });
    expect(empty.text).toMatch(/never writes/);
    expect(empty.color).toBe("rgb(170, 0, 0)");
    await finishOfficialIn(frame);
    await expect.poll(() => getKey(page, "itt16-ig-stories"), { timeout: 8000 }).toBeTruthy();
    await envelope(page, "itt16-ig-stories");
    const saved = await frame.locator("[data-official-status]").first().evaluate((el) => {
      const cs = getComputedStyle(el);
      return {
        text: String(el.textContent || "").replace(/\s+/g, " ").trim(),
        color: cs.color,
      };
    });
    expect(saved.text).toBe("Saved.");
    expect(saved.color).toBe("rgb(0, 102, 0)");
    await expect(frame.locator("[data-official-status]").first()).not.toContainText(/itt16-/);
    await expect(page).toHaveURL(/\/years\/2016\//);
  });

  test("2015 Periscope incomplete hold is red and writes nothing", async ({ page }) => {
    await page.goto("/app/index.html#/year/2015?stop=itt15-periscope");
    await page.waitForFunction(() => !!(window.ITT && window.ITT.User && window.ITT.User.store), null, {
      timeout: 15000,
    });
    const room = page.locator("article.stop#itt15-periscope");
    await room.waitFor({ timeout: 15000 });
    await page.evaluate(() => localStorage.removeItem("itt15-periscope"));
    await room.locator(".actions button").last().click();
    expect(await getKey(page, "itt15-periscope")).toBeNull();
    await expect(room.locator(".status")).toHaveText("Tick honesty first. Incomplete never writes.");
    const paint = await statusPaint(page, "article.stop#itt15-periscope .status");
    expect(paint.color).toBe("rgb(170, 0, 0)");
    await expect(room.locator(".status")).not.toContainText(/itt15-/);
  });

  test("2015 Periscope official finish says Saved. with no key on the glass", async ({ page }) => {
    await page.goto("/app/index.html#/year/2015?stop=itt15-periscope");
    await page.waitForFunction(() => !!(window.ITT && window.ITT.User && window.ITT.User.store), null, {
      timeout: 15000,
    });
    const room = page.locator("article.stop#itt15-periscope");
    await room.waitFor({ timeout: 15000 });
    await page.evaluate(() => localStorage.removeItem("itt15-periscope"));
    await completeReactStop(page, room);
    await expect.poll(() => getKey(page, "itt15-periscope"), { timeout: 8000 }).toBeTruthy();
    await envelope(page, "itt15-periscope");
    await expect(room.locator(".status")).toHaveText("Saved.");
    await expect(room.locator(".status")).not.toContainText(/itt15-/);
    const paint = await statusPaint(page, "article.stop#itt15-periscope .status");
    expect(paint.color).toBe("rgb(0, 102, 0)");
  });
});
