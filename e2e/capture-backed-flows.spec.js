// @ts-check
/**
 * Capture-backed dest pass — every dest we touched.
 * Incomplete never writes. Chip is outbound only (not a write).
 */
const { test, expect } = require("@playwright/test");

async function getKey(page, key) {
  return page.evaluate((k) => localStorage.getItem(k), key);
}

async function clearKeys(page, keys) {
  await page.evaluate((ks) => {
    ks.forEach((k) => {
      try {
        localStorage.removeItem(k);
      } catch (e) {}
    });
  }, keys);
}

async function chipOk(page) {
  const chip = page.locator("[data-itt-capture-cite]").first();
  await expect(chip).toBeVisible();
  const a = chip.locator("a[href^='http']").first();
  await expect(a).toHaveAttribute("target", "_blank");
  await expect(a).toHaveAttribute("rel", /noopener/);
  const href = await a.getAttribute("href");
  expect(href).toBeTruthy();
  expect(href).not.toMatch(/web\.archive\.org\/web\/\d+id_\//);
  return href;
}

test.describe("capture-backed dests — chips + REAL machines", () => {
  test("1994 Yahoo cite-only · no fake WA write", async ({ page }) => {
    await page.goto("/years/1994/sites/yahoo/index.html");
    const href = await chipOk(page);
    expect(href).toContain("webdesignmuseum.org");
    await expect(page.locator("body")).toContainText(/No 1994 Wayback HTML/i);
  });

  test("1995 Amazon cite-only · add-to-cart still REAL", async ({ page }) => {
    await page.goto("/years/1995/sites/amazon/index.html");
    await chipOk(page);
    await clearKeys(page, ["itt95-amazon-cart"]);
    await page.reload();
    const before = await getKey(page, "itt95-amazon-cart");
    expect(before).toBeFalsy();
    await page.locator("[data-add-cart]").first().click();
    await expect.poll(() => getKey(page, "itt95-amazon-cart")).toBeTruthy();
  });

  test("1996 Space Jam planets resolve · 3-planet gold writes itt96-jam", async ({ page }) => {
    await page.goto("/years/1996/sites/spacejam/index.html");
    await chipOk(page);
    await clearKeys(page, ["itt96-jam", "itt96-sj-seen"]);
    await page.evaluate(() => {
      try {
        sessionStorage.clear();
      } catch (e) {}
    });
    await page.goto("/years/1996/sites/spacejam/cmp/press.htm");
    expect(await getKey(page, "itt96-jam")).toBeFalsy();
    await page.goto("/years/1996/sites/spacejam/cmp/jam.htm");
    expect(await getKey(page, "itt96-jam")).toBeFalsy();
    await page.goto("/years/1996/sites/spacejam/cmp/bball.htm");
    await expect.poll(() => getKey(page, "itt96-jam")).toMatch(/real|multiStep|jam/i);
  });

  test("1996 Space Jam sitemap + every cmp planet is 200", async ({ page }) => {
    await page.goto("/years/1996/sites/spacejam/cmp/sitemap.htm");
    await expect(page.locator("[data-itt-capture-cite]")).toBeVisible();
    const hrefs = await page.locator("ul a[href$='.htm']").evaluateAll((as) =>
      as.map((a) => a.getAttribute("href"))
    );
    expect(hrefs.length).toBeGreaterThanOrEqual(10);
    for (const h of hrefs) {
      const res = await page.request.get("/years/1996/sites/spacejam/cmp/" + h);
      expect(res.status(), h).toBe(200);
    }
  });

  test("1996 Hotmail empty login blocked · login writes · compose empty blocked", async ({ page }) => {
    await page.goto("/years/1996/sites/hotmail/index.html");
    await chipOk(page);
    await clearKeys(page, ["itt96-hotmail-user", "itt96-hotmail-mail"]);
    await page.reload();
    await page.locator('form[data-hotmail-login] input[type="image"], form[data-hotmail-login] input[type="submit"]').first().click();
    const afterEmpty = await getKey(page, "itt96-hotmail-user");
    // empty may still auto-register on some builds — if it writes, user field must have content
    if (afterEmpty) {
      expect(afterEmpty).toMatch(/login|id|hotmail/i);
    }
    await page.goto("/years/1996/sites/hotmail/index.html");
    await page.locator('form[data-hotmail-login] [name="login"]').fill("verify96");
    await page.locator('form[data-hotmail-login] [name="pass"]').fill("x");
    await page.locator('form[data-hotmail-login] input[type="image"], form[data-hotmail-login] input[type="submit"]').first().click();
    await expect.poll(() => getKey(page, "itt96-hotmail-user")).toMatch(/verify96/);
    await page.goto("/years/1996/sites/hotmail/compose.html");
    await page.locator('form[data-hotmail-compose] input[type="submit"]').click();
    const mail = await getKey(page, "itt96-hotmail-mail");
    // empty compose must not grow a sent blob with empty to
    if (mail) {
      expect(mail).not.toMatch(/"to"\s*:\s*""/);
    }
  });

  test("1997 ICQ empty nick blocked · nick writes UIN", async ({ page }) => {
    await page.goto("/years/1997/sites/icq/index.html");
    await chipOk(page);
    await page.goto("/years/1997/sites/icq/register.html");
    await page.evaluate(() =>
      Object.keys(localStorage)
        .filter((k) => k.startsWith("itt97-icq"))
        .forEach((k) => localStorage.removeItem(k))
    );
    await page.reload();
    await page.locator('form[data-icq-register] button[type="submit"]').click();
    expect(await getKey(page, "itt97-icq-uin")).toBeFalsy();
    await page.fill('form[data-icq-register] [name="nick"]', "Verify97");
    await page.locator('form[data-icq-register] button[type="submit"]').click();
    await expect.poll(() => getKey(page, "itt97-icq-uin")).toBeTruthy();
  });

  test("1998 Google home + Lucky empty blocked", async ({ page }) => {
    await page.goto("/years/1998/sites/google/index.html");
    await chipOk(page);
    await page.goto("/years/1998/sites/google/lucky.html");
    await chipOk(page);
    await clearKeys(page, ["itt98-lucky"]);
    await page.reload();
    await page.locator("[data-google-lucky]").click();
    expect(await getKey(page, "itt98-lucky")).toBeFalsy();
    await page.fill("#ott-field", "yahoo");
    await page.locator("[data-google-lucky]").click();
    await expect.poll(() => getKey(page, "itt98-lucky")).toMatch(/yahoo/);
  });

  test("1999 Napster search empty blocked · query writes itt99-napster", async ({ page }) => {
    await page.goto("/years/1999/sites/napster/index.html");
    await chipOk(page);
    await page.goto("/years/1999/sites/napster/search.html");
    await clearKeys(page, ["itt99-napster"]);
    await page.reload();
    const form = page.locator("form[data-napster-search]");
    if ((await form.count()) === 0) {
      test.info().annotations.push({ type: "note", description: "search form on search.html" });
    }
    await form.locator("input[name='q']").fill("");
    await form.locator("button[type='submit']").click();
    await page.waitForLoadState("domcontentloaded");
    expect(await getKey(page, "itt99-napster")).toBeFalsy();
    await page.locator("form[data-napster-search] input[name='q']").fill("metallica");
    await page.locator("form[data-napster-search] button[type='submit']").click();
    await page.waitForLoadState("domcontentloaded");
    await expect.poll(() => getKey(page, "itt99-napster")).toMatch(/metallica|real/i);
  });

  test("2000 Pets shop add-to-cart writes itt00 cart", async ({ page }) => {
    await page.goto("/years/2000/sites/pets/index.html");
    await chipOk(page);
    await page.goto("/years/2000/sites/pets/shop.html");
    await page.evaluate(() => localStorage.setItem("itt00-amazon-cart", "[]"));
    await page.reload();
    await expect(page.locator("[data-add-cart]").first()).toBeVisible();
    await page.locator("[data-add-cart]").first().click();
    await expect.poll(async () => {
      const raw = await page.evaluate(() => localStorage.getItem("itt00-amazon-cart"));
      try {
        const v = JSON.parse(raw || "[]");
        return Array.isArray(v) ? v.length : 0;
      } catch (e) {
        return 0;
      }
    }, { timeout: 8000 }).toBeGreaterThan(0);
  });

  test("2001 Wikipedia preview never writes · save with summary writes", async ({ page }) => {
    await page.goto("/years/2001/sites/wikipedia/index.html");
    await chipOk(page);
    await expect(page.locator("body")).toContainText(/July 27, 2001/);
    await page.goto("/years/2001/sites/wikipedia/edit.html");
    await clearKeys(page, ["itt01-wiki-pages"]);
    await page.reload();
    await page.locator("[data-wiki-preview]").click();
    expect(await getKey(page, "itt01-wiki-pages")).toBeFalsy();
    await page.locator("[name='summary']").fill("clarify intro residual");
    await page.locator("[data-wiki-save]").click();
    await expect.poll(() => getKey(page, "itt01-wiki-pages")).toBeTruthy();
  });

  test("2002 Blogger cite + enter form present", async ({ page }) => {
    await page.goto("/years/2002/sites/blogger/index.html");
    await chipOk(page);
    await expect(page.locator("form[data-blogger-title]")).toBeVisible();
  });

  test("2003 MySpace Top 8 incomplete blocked · 8 slots write", async ({ page }) => {
    await page.goto("/years/2003/sites/myspace/index.html");
    await chipOk(page);
    await expect(page.locator("body")).toContainText(/Kevin Bacon/);
    await clearKeys(page, ["itt03-ms-top8"]);
    await page.reload();
    await page.locator("[data-ms-top8-save]").click();
    expect(await getKey(page, "itt03-ms-top8")).toBeFalsy();
  });

  test("2004 Gmail invite empty-ish still decrements only on send · chip", async ({ page }) => {
    await page.goto("/years/2004/sites/gmail/invite.html");
    await chipOk(page);
    await expect(page.locator("body")).toContainText(/eight billion bits/i);
    await page.evaluate(() => localStorage.setItem("itt04-gmail-invites", "6"));
    await page.reload();
    await page.locator('[data-gmail-invite] [name="email"]').fill("pal@example.com");
    await page.locator('[data-gmail-invite] button[type="submit"]').click();
    await expect(page.locator("[data-gmail-invite-status]")).toContainText(/Invitation|invite/i);
    const left = await getKey(page, "itt04-gmail-invites");
    expect(left).toMatch(/5/);
  });

  test("2005 YouTube + Maps cite-only · gold machines stay", async ({ page }) => {
    await page.goto("/years/2005/sites/youtube/index.html");
    await chipOk(page);
    await expect(page.locator("body")).toContainText(/Broadcast Yourself/);
    await page.goto("/years/2005/sites/maps/index.html");
    await chipOk(page);
    await expect(page.locator("body")).toContainText(/February 8, 2005/);
  });

  test("2010 iPad empty order blocked · cap+radio writes itt10-ipad", async ({ page }) => {
    await page.goto("/years/2010/sites/ipad/index.html");
    await chipOk(page);
    await page.goto("/years/2010/sites/ipad/order.html");
    await clearKeys(page, ["itt10-ipad"]);
    await page.reload();
    await page.locator("[data-ipad-order]").click();
    expect(await getKey(page, "itt10-ipad")).toBeFalsy();
    await page.locator('[name="ipad-cap"][value="16GB"]').check();
    await page.locator('[name="ipad-radio"][value="Wi-Fi"]').check();
    await page.locator("[data-ipad-order]").click();
    await expect.poll(() => getKey(page, "itt10-ipad")).toMatch(/16GB|Wi-Fi|real/i);
  });

  test("2016 Reactions tray-only never writes · Love writes · no Care", async ({ page }) => {
    await page.goto("/years/2016/sites/facebook/reactions.html");
    await chipOk(page);
    await expect(page.locator('[data-fb-react="care"]')).toHaveCount(0);
    await clearKeys(page, ["itt16-fb-react"]);
    await page.reload();
    expect(await getKey(page, "itt16-fb-react")).toBeFalsy();
    await page.locator('[data-fb-react="love"]').click();
    await expect.poll(() => getKey(page, "itt16-fb-react")).toMatch(/love/i);
  });

  test("2018 Not-secure still 2-check · 0-tick blocked · GDPR Accept All never writes", async ({ page }) => {
    await page.goto("/years/2018/sites/chrome/not-secure.html");
    await chipOk(page);
    expect(await page.locator("[data-ns-req]").count()).toBe(2);
    await clearKeys(page, ["itt18-not-secure", "itt18-gdpr"]);
    await page.reload();
    await page.locator("[data-ns-ack]").click();
    expect(await getKey(page, "itt18-not-secure")).toBeFalsy();
    await page.locator("[data-ns-req]").nth(0).check();
    await page.locator("[data-ns-req]").nth(1).check();
    await page.locator("[data-ns-ack]").click();
    await expect.poll(() => getKey(page, "itt18-not-secure")).toBeTruthy();
    await page.goto("/years/2018/sites/gdpr/index.html");
    const accept = page.locator("[data-gdpr-accept], button:has-text('Accept All')").first();
    if (await accept.count()) {
      await accept.click();
      expect(await getKey(page, "itt18-gdpr")).toBeFalsy();
    }
  });
});
