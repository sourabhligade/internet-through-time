// @ts-check
/**
 * Phase 4 lock for 1994–1997. PointCast and CSotD receipts.
 * Status is "Saved." or "This browser blocked the save." and names no storage key.
 * Next stays hidden until the envelope kind is official.
 * The 841-page walk is phase 6.
 */
const { test, expect } = require("@playwright/test");

async function raw(page, key) {
  return page.evaluate((k) => localStorage.getItem(k), key);
}

async function envelope(page, key) {
  const text = await raw(page, key);
  return text ? JSON.parse(text) : null;
}

async function verbReady(page) {
  await page.waitForFunction(() => {
    const verbs = document.querySelectorAll("[data-official-verb]");
    if (!verbs.length) return document.readyState === "complete";
    return [...verbs].every((el) => el.getAttribute("data-official-verb-bound") === "1");
  }, null, { timeout: 15000 });
}

function nextFor(page, key) {
  return page.locator('[data-next-flow][data-next-when-key="' + key + '"]');
}

test.describe("1994-1997 phase 4 receipt", () => {
  test("CSotD official finish says Saved. and shows Next", async ({ page }) => {
    await page.goto("/years/1994/sites/csotd/index.html?pick=3");
    await verbReady(page);
    await page.evaluate(() => {
      Object.keys(localStorage)
        .filter((k) => k.indexOf("itt94-csotd") === 0)
        .forEach((k) => localStorage.removeItem(k));
      sessionStorage.removeItem("itt94-csotd-wandered");
    });
    await page.reload();
    await verbReady(page);
    const status = page.locator("[data-csotd-status]");
    const next = nextFor(page, "itt94-csotd");
    await expect(next).toBeHidden();
    await expect(status).not.toHaveText("Saved.");

    await page.evaluate(() => sessionStorage.setItem("itt94-csotd-wandered", "1"));
    await page.locator("[data-official-pick='today']").click();
    await page.fill("[name='gbname']", "Glenn residual");
    await page.locator("form[data-csotd-gb] input[type='submit']").click();
    await expect(status).toHaveText("Saved.");
    await expect(status).not.toContainText(/itt94-/);
    await expect(next).toBeVisible();
    const saved = await envelope(page, "itt94-csotd");
    expect(saved && saved.kind).toBe("official");
    expect(saved.real).toBe(true);

    await page.reload();
    await verbReady(page);
    await expect(page.locator("[data-csotd-status]")).toHaveText("Saved.");
    await expect(nextFor(page, "itt94-csotd")).toBeVisible();
    const again = await envelope(page, "itt94-csotd");
    expect(again && again.kind).toBe("official");
  });

  test("CSotD toy envelope keeps Next hidden and does not say Saved.", async ({ page }) => {
    await page.goto("/years/1994/sites/csotd/index.html?pick=3");
    await page.evaluate(() => {
      localStorage.setItem(
        "itt94-csotd",
        JSON.stringify({
          v: 1,
          year: "1994",
          key: "itt94-csotd",
          kind: "toy",
          real: true,
          ts: 1,
          name: "Toy visitor",
          body: { name: "Toy visitor" }
        })
      );
    });
    await page.reload();
    await verbReady(page);
    await expect(page.locator("[data-csotd-status]")).not.toHaveText("Saved.");
    await expect(page.locator("[data-csotd-status]")).not.toContainText(/itt94-/);
    await expect(nextFor(page, "itt94-csotd")).toBeHidden();
    const planted = await envelope(page, "itt94-csotd");
    expect(planted && planted.kind).toBe("toy");
    expect(planted.real).toBe(true);
  });

  test("CSotD blocked save says the browser blocked it and writes nothing", async ({ page }) => {
    await page.goto("/years/1994/sites/csotd/index.html?pick=3");
    await verbReady(page);
    await page.evaluate(() => {
      Object.keys(localStorage)
        .filter((k) => k.indexOf("itt94-csotd") === 0)
        .forEach((k) => localStorage.removeItem(k));
      sessionStorage.setItem("itt94-csotd-wandered", "1");
      const orig = localStorage.setItem.bind(localStorage);
      localStorage.setItem = function (k, v) {
        if (String(k).indexOf("itt94-csotd") === 0) {
          const err = new Error("quota");
          err.name = "QuotaExceededError";
          throw err;
        }
        return orig(k, v);
      };
    });
    await page.locator("[data-official-pick='today']").click();
    await page.fill("[name='gbname']", "Glenn residual");
    await page.locator("form[data-csotd-gb] input[type='submit']").click();
    await expect(page.locator("[data-csotd-status]")).toHaveText("This browser blocked the save.");
    await expect(page.locator("[data-csotd-status]")).not.toContainText(/itt94-/);
    expect(await raw(page, "itt94-csotd")).toBeNull();
    await expect(nextFor(page, "itt94-csotd")).toBeHidden();
  });

  test("PointCast official finish says Saved. and shows Next", async ({ page }) => {
    await page.goto("/years/1997/sites/pointcast/index.html");
    await verbReady(page);
    await page.evaluate(() => localStorage.removeItem("itt97-pointcast"));
    await page.reload();
    await verbReady(page);
    const status = page.locator("[data-pc-status]");
    const next = nextFor(page, "itt97-pointcast");
    await expect(next).toBeHidden();
    await page.locator('[data-pc-sub="News"]').click();
    expect(await raw(page, "itt97-pointcast")).toBeNull();
    await expect(status).not.toHaveText("Saved.");
    await expect(status).not.toContainText(/itt97-/);
    await expect(next).toBeHidden();
    await page.locator('[data-pc-sub="Weather"]').click();
    await expect.poll(() => raw(page, "itt97-pointcast"), { timeout: 8000 }).toBeTruthy();
    await expect(status).toHaveText("Saved.");
    await expect(status).not.toContainText(/itt97-/);
    await expect(next).toBeVisible();
    const saved = await envelope(page, "itt97-pointcast");
    expect(saved && saved.kind).toBe("official");
    expect(saved.real).toBe(true);

    await page.reload();
    await verbReady(page);
    await expect(page.locator("[data-pc-status]")).toHaveText("Saved.");
    await expect(nextFor(page, "itt97-pointcast")).toBeVisible();
    const again = await envelope(page, "itt97-pointcast");
    expect(again && again.kind).toBe("official");
  });

  test("PointCast toy envelope keeps Next hidden and does not say Saved.", async ({ page }) => {
    await page.goto("/years/1997/sites/pointcast/index.html");
    await page.evaluate(() => {
      localStorage.setItem(
        "itt97-pointcast",
        JSON.stringify({
          v: 1,
          year: "1997",
          key: "itt97-pointcast",
          kind: "toy",
          real: true,
          ts: 1,
          channels: ["News", "Weather"],
          official: true,
          body: { channels: ["News", "Weather"], official: true }
        })
      );
    });
    await page.reload();
    await verbReady(page);
    await expect(page.locator("[data-pc-status]")).not.toHaveText("Saved.");
    await expect(page.locator("[data-pc-status]")).not.toContainText(/itt97-/);
    await expect(nextFor(page, "itt97-pointcast")).toBeHidden();
    const planted = await envelope(page, "itt97-pointcast");
    expect(planted && planted.kind).toBe("toy");
    expect(planted.real).toBe(true);
  });

  test("SSL checkout official finish says Saved. and shows Next", async ({ page }) => {
    await page.goto("/years/1995/sites/amazon/ssl-checkout.html");
    await verbReady(page);
    await page.evaluate(() => localStorage.removeItem("itt95-ssl-checkout"));
    await page.reload();
    await verbReady(page);
    const status = page.locator("[data-ssl-status], [data-itt-action-status]").first();
    const next = nextFor(page, "itt95-ssl-checkout");
    await expect(next).toBeHidden();
    await page.locator("form[data-ssl-form] button[type='submit']").click();
    expect(await raw(page, "itt95-ssl-checkout")).toBeNull();
    await expect(status).not.toHaveText("Saved.");
    await page.fill("[name='name']", "Ada Lovelace");
    await page.fill("[name='card']", "4111");
    await page.fill("[name='city']", "Seattle");
    await page.locator("form[data-ssl-form] button[type='submit']").click();
    await expect.poll(() => raw(page, "itt95-ssl-checkout"), { timeout: 8000 }).toBeTruthy();
    await expect(status).toHaveText("Saved.");
    await expect(status).not.toContainText(/itt95-/);
    await expect(next).toBeVisible();
    const saved = await envelope(page, "itt95-ssl-checkout");
    expect(saved && saved.kind).toBe("official");
    expect(saved.real).toBe(true);

    await page.reload();
    await verbReady(page);
    await expect(page.locator("[data-ssl-status], [data-itt-action-status]").first()).toHaveText("Saved.");
    await expect(nextFor(page, "itt95-ssl-checkout")).toBeVisible();
  });

  test("SSL checkout toy envelope keeps Next hidden and does not say Saved.", async ({ page }) => {
    await page.goto("/years/1995/sites/amazon/ssl-checkout.html");
    await page.evaluate(() => {
      localStorage.setItem(
        "itt95-ssl-checkout",
        JSON.stringify({
          v: 1,
          year: "1995",
          key: "itt95-ssl-checkout",
          kind: "toy",
          real: true,
          ts: 1,
          name: "Ada",
          body: { name: "Ada" }
        })
      );
    });
    await page.reload();
    await verbReady(page);
    await expect(page.locator("[data-ssl-status], [data-itt-action-status]").first()).not.toHaveText("Saved.");
    await expect(nextFor(page, "itt95-ssl-checkout")).toBeHidden();
    const planted = await envelope(page, "itt95-ssl-checkout");
    expect(planted && planted.kind).toBe("toy");
    expect(planted.real).toBe(true);
  });

  test("SSL checkout blocked save says the browser blocked it and writes nothing", async ({ page }) => {
    await page.goto("/years/1995/sites/amazon/ssl-checkout.html");
    await verbReady(page);
    await page.evaluate(() => {
      localStorage.removeItem("itt95-ssl-checkout");
      const orig = localStorage.setItem.bind(localStorage);
      localStorage.setItem = function (k, v) {
        if (k === "itt95-ssl-checkout") {
          const err = new Error("quota");
          err.name = "QuotaExceededError";
          throw err;
        }
        return orig(k, v);
      };
    });
    await page.fill("[name='name']", "Ada Lovelace");
    await page.fill("[name='card']", "4111");
    await page.fill("[name='city']", "Seattle");
    await page.locator("form[data-ssl-form] button[type='submit']").click();
    await expect(page.locator("[data-ssl-status], [data-itt-action-status]").first()).toHaveText(
      "This browser blocked the save."
    );
    expect(await raw(page, "itt95-ssl-checkout")).toBeNull();
    await expect(nextFor(page, "itt95-ssl-checkout")).toBeHidden();
  });

  test("Portal Wars official finish says Saved. and shows Next", async ({ page }) => {
    await page.goto("/years/1996/sites/portals/wars.html");
    await verbReady(page);
    await page.evaluate(() => {
      localStorage.removeItem("itt96-portal-wars");
      sessionStorage.removeItem("itt96-portal-progress");
    });
    await page.reload();
    await verbReady(page);
    const status = page.locator("[data-portal-status], [data-itt-action-status]").first();
    const next = nextFor(page, "itt96-portal-wars");
    await expect(next).toBeHidden();
    await page.locator("[data-portal='yahoo']").first().click();
    expect(await raw(page, "itt96-portal-wars")).toBeNull();
    await page.goto("/years/1996/sites/portals/wars.html");
    await verbReady(page);
    await page.locator("[data-portal='excite']").first().click();
    expect(await raw(page, "itt96-portal-wars")).toBeNull();
    await page.goto("/years/1996/sites/portals/wars.html");
    await verbReady(page);
    await page.locator("[data-portal='altavista']").first().click();
    await expect.poll(() => raw(page, "itt96-portal-wars"), { timeout: 8000 }).toBeTruthy();
    const saved = await envelope(page, "itt96-portal-wars");
    expect(saved && saved.kind).toBe("official");
    expect(saved.real).toBe(true);

    await page.goto("/years/1996/sites/portals/wars.html");
    await verbReady(page);
    await expect(page.locator("[data-portal-status], [data-itt-action-status]").first()).toHaveText("Saved.");
    await expect(page.locator("[data-portal-status], [data-itt-action-status]").first()).not.toContainText(/itt96-/);
    await expect(nextFor(page, "itt96-portal-wars")).toBeVisible();
  });

  test("Portal Wars toy envelope keeps Next hidden and does not say Saved.", async ({ page }) => {
    await page.goto("/years/1996/sites/portals/wars.html");
    await page.evaluate(() => {
      sessionStorage.removeItem("itt96-portal-progress");
      localStorage.setItem(
        "itt96-portal-wars",
        JSON.stringify({
          v: 1,
          year: "1996",
          key: "itt96-portal-wars",
          kind: "toy",
          real: true,
          ts: 1,
          visited: ["yahoo", "excite", "altavista"],
          body: { visited: ["yahoo", "excite", "altavista"] }
        })
      );
    });
    await page.reload();
    await verbReady(page);
    await expect(page.locator("[data-portal-status], [data-itt-action-status]").first()).not.toHaveText("Saved.");
    await expect(nextFor(page, "itt96-portal-wars")).toBeHidden();
    const planted = await envelope(page, "itt96-portal-wars");
    expect(planted && planted.kind).toBe("toy");
    expect(planted.real).toBe(true);
  });

  test("PointCast blocked save says the browser blocked it and writes nothing", async ({ page }) => {
    await page.goto("/years/1997/sites/pointcast/index.html");
    await verbReady(page);
    await page.evaluate(() => {
      localStorage.removeItem("itt97-pointcast");
      const orig = localStorage.setItem.bind(localStorage);
      localStorage.setItem = function (k, v) {
        if (k === "itt97-pointcast") {
          const err = new Error("quota");
          err.name = "QuotaExceededError";
          throw err;
        }
        return orig(k, v);
      };
    });
    await page.locator('[data-pc-sub="News"]').click();
    await page.locator('[data-pc-sub="Weather"]').click();
    await expect(page.locator("[data-pc-status]")).toHaveText("This browser blocked the save.");
    await expect(page.locator("[data-pc-status]")).not.toContainText(/itt97-/);
    expect(await raw(page, "itt97-pointcast")).toBeNull();
    await expect(nextFor(page, "itt97-pointcast")).toBeHidden();
  });
});
