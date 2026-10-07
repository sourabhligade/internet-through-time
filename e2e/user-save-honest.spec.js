// @ts-check
/** Phase 1 — honest saves. Empty / trap / blocked write nothing. Status is "Saved." */
const { test, expect } = require("@playwright/test");
const { assertNoWrite, assertEnvelope, assertNextHidden } = require("./dest-true-io");

const MOZILLA = "/years/1998/sites/mozilla/index.html";
const WIKI = "/years/2001/sites/wikipedia/edit.html";
const STUMBLE = "/years/2002/sites/stumbleupon/index.html";
const OFFICE = "/years/2004/sites/openoffice/index.html";
const DRUDGE = "/years/1997/sites/drudge/index.html";

async function waitUser(page) {
  await page.waitForFunction(() => {
    return !!(window.ITT && ITT.User && typeof ITT.User.save === "function" && ITT.revealNextFlow);
  }, null, { timeout: 20000 });
}

test("ITT.User round-trips and a thrown setItem returns false", async ({ page }) => {
  await page.goto(MOZILLA);
  await waitUser(page);
  const round = await page.evaluate(() => {
    const key = "itt98-user-probe";
    localStorage.removeItem(key);
    const ok = ITT.User.save({
      key: key,
      year: "1998",
      kind: "official",
      extra: { official: true, multiStep: true, q: "hi" },
    });
    const rec = ITT.User.read(key);
    const fin = ITT.User.finished(key);
    localStorage.setItem("itt98-user-bare", JSON.stringify("x"));
    const bareRead = ITT.User.read("itt98-user-bare");
    const bareFin = ITT.User.finished("itt98-user-bare");
    localStorage.setItem("itt98-user-string", "plain");
    const stringFin = ITT.User.finished("itt98-user-string");
    const blank = ITT.User.save({ key: "  ", year: "1998", kind: "official" });
    const badKind = ITT.User.save({ key: "itt98-user-bad", year: "1998", kind: "query" });
    ITT.User.save({
      key: "itt98-user-step",
      year: "1998",
      kind: "leftover",
      extra: { leftover: true, kind: "hops", pick: "keep" },
    });
    const step = ITT.User.read("itt98-user-step");
    const orig = Storage.prototype.setItem;
    let blocked = false;
    Storage.prototype.setItem = function () {
      throw new DOMException("quota", "QuotaExceededError");
    };
    try {
      blocked =
        ITT.User.save({
          key: "itt98-user-blocked",
          year: "1998",
          kind: "official",
          extra: { official: true },
        }) === false;
    } finally {
      Storage.prototype.setItem = orig;
    }
    const open = document.createElement("p");
    open.setAttribute("data-next-flow", "1");
    open.setAttribute("hidden", "");
    document.body.appendChild(open);
    ITT.revealNextFlow(document);
    const gated = document.createElement("p");
    gated.setAttribute("data-next-flow", "1");
    gated.setAttribute("data-next-when-key", "itt98-user-string");
    gated.setAttribute("hidden", "");
    document.body.appendChild(gated);
    ITT.revealNextFlow(document);
    [
      key,
      "itt98-user-bare",
      "itt98-user-string",
      "itt98-user-bad",
      "itt98-user-step",
      "itt98-user-blocked",
    ].forEach((k) => localStorage.removeItem(k));
    return {
      ok,
      fin,
      bareRead,
      bareFin,
      stringFin,
      blank,
      badKind,
      blocked,
      blockedStored: localStorage.getItem("itt98-user-blocked"),
      v: rec && rec.v,
      real: rec && rec.real,
      kind: rec && rec.kind,
      key: rec && rec.key,
      q: rec && rec.q,
      official: rec && rec.official,
      stepKind: step && step.kind,
      step: step && step.step,
      stepLeft: step && step.leftover,
      stepPick: step && step.pick,
      emptyKeyReveals: open.hasAttribute("hidden") === false,
      stringStaysHidden: gated.hasAttribute("hidden") === true,
    };
  });
  expect(round.ok).toBe(true);
  expect(round.fin).toBe(true);
  expect(round.v).toBe(1);
  expect(round.real).toBe(true);
  expect(round.kind).toBe("official");
  expect(round.key).toBe("itt98-user-probe");
  expect(round.q).toBe("hi");
  expect(round.official).toBe(true);
  expect(round.bareRead).toBeNull();
  expect(round.bareFin).toBe(false);
  expect(round.stringFin).toBe(false);
  expect(round.blank).toBe(false);
  expect(round.badKind).toBe(false);
  expect(round.blocked).toBe(true);
  expect(round.blockedStored).toBeFalsy();
  expect(round.stepKind).toBe("leftover");
  expect(round.step).toBe("hops");
  expect(round.stepLeft).toBe(true);
  expect(round.stepPick).toBe("keep");
  expect(round.emptyKeyReveals).toBe(true);
  expect(round.stringStaysHidden).toBe(true);
});

test("1998 Mozilla empty, trap, and incomplete write nothing", async ({ page }) => {
  await page.goto(MOZILLA);
  await page.waitForFunction(() => {
    const verb = document.querySelector("[data-official-verb]");
    return !!(verb && verb.getAttribute("data-official-verb-bound") === "1");
  }, null, { timeout: 20000 });
  const status = page.locator("[data-official-status]").first();
  await page.locator("[data-official-verb]").click();
  await expect(status).toContainText("Incomplete never writes.");
  await assertNoWrite(page, "itt98-mozilla");
  await page.locator("[data-official-trap]").click();
  await expect(status).toContainText("Trap. That click never writes.");
  await assertNoWrite(page, "itt98-mozilla");
  const reqs = page.locator("[data-official-verb-host] [data-official-req]");
  const n = await reqs.count();
  expect(n).toBeGreaterThanOrEqual(2);
  for (let i = 0; i < n; i++) await reqs.nth(i).check();
  await page.locator("[data-official-verb]").click();
  await expect(status).toContainText("Empty never writes.");
  await assertNoWrite(page, "itt98-mozilla");
  await page.locator("[data-official-need]").fill("x");
  await page.locator("[data-official-verb]").click();
  await expect(status).toContainText("Empty never writes.");
  await assertNoWrite(page, "itt98-mozilla");
  await assertNextHidden(page);
});

test("1998 Mozilla blocked save stays empty and a real finish says Saved.", async ({ page }) => {
  await page.goto(MOZILLA);
  await page.waitForFunction(() => {
    const verb = document.querySelector("[data-official-verb]");
    return !!(verb && verb.getAttribute("data-official-verb-bound") === "1" && window.ITT && ITT.User);
  }, null, { timeout: 20000 });

  async function arm(block) {
    await page.evaluate((refuse) => {
      const orig = window.__ittSetItem || Storage.prototype.setItem;
      window.__ittSetItem = orig;
      Storage.prototype.setItem = function (k, v) {
        if (refuse && k === "itt98-mozilla") throw new DOMException("quota", "QuotaExceededError");
        return orig.call(this, k, v);
      };
      if (!document.querySelector("[data-next-when-key='itt98-mozilla']")) {
        const next = document.createElement("p");
        next.setAttribute("data-next-flow", "1");
        next.setAttribute("data-next-when-key", "itt98-mozilla");
        next.setAttribute("hidden", "");
        next.textContent = "Next";
        document.body.appendChild(next);
      }
    }, block);
    const reqs = page.locator("[data-official-verb-host] [data-official-req]");
    const n = await reqs.count();
    for (let i = 0; i < n; i++) await reqs.nth(i).check();
    await page.locator("[data-official-need]").fill("source");
    await page.locator("[data-official-verb]").click();
  }

  await arm(true);
  const status = page.locator("[data-official-status]").first();
  await expect(status).toHaveText("This browser blocked the save.");
  await expect(status).not.toContainText("itt98-mozilla");
  await assertNoWrite(page, "itt98-mozilla");
  await expect(page.locator("[data-next-when-key='itt98-mozilla']")).toBeHidden();

  await page.evaluate(() => {
    Storage.prototype.setItem = window.__ittSetItem;
    localStorage.removeItem("itt98-mozilla");
  });
  await arm(false);
  await expect(status).toHaveText("Saved.");
  await expect(status).not.toContainText("itt98-mozilla");
  const blob = await assertEnvelope(page, "itt98-mozilla", { kind: "official", real: true });
  expect(blob.official).toBe(true);
  expect(blob.leftover).toBeFalsy();
  expect(blob.q).toBe("source");
  await expect(page.locator("[data-next-when-key='itt98-mozilla']")).toBeVisible();
});

test("Wikipedia preview writes nothing and Save stores one official envelope", async ({ page }) => {
  await page.goto(WIKI);
  await page.waitForFunction(() => {
    const verb = document.querySelector("[data-wiki-save][data-official-verb]");
    return !!(verb && verb.getAttribute("data-official-verb-bound") === "1" && window.ITT && ITT.User);
  }, null, { timeout: 20000 });
  await assertNextHidden(page);
  await page.locator("[data-wiki-body]").fill("Wiki page");
  await page.locator("[data-wiki-preview]").click();
  await expect(page.locator("[data-wiki-status]")).toContainText("Preview is not Save");
  await assertNoWrite(page, "itt01-wiki");
  await assertNextHidden(page);

  const reqs = page.locator("[data-official-req]");
  const n = await reqs.count();
  for (let i = 0; i < n; i++) await reqs.nth(i).check();
  await page.locator("[data-wiki-save]").click();
  await expect.poll(async () => page.evaluate(() => localStorage.getItem("itt01-wiki")), { timeout: 8000 }).toBeTruthy();
  const blob = await assertEnvelope(page, "itt01-wiki", { kind: "official", real: true });
  expect(blob.official).toBe(true);
  expect(blob.body).toBeUndefined();
  await expect(page.locator("[data-wiki-status]")).toHaveText("Saved.");
  await expect(page.locator("[data-wiki-status]")).not.toContainText("itt01-wiki");
  await expect(page.locator("[data-next-when-key='itt01-wiki']")).toBeVisible();
});

test("leftover rewritten onto the Wikipedia star refuses the official key", async ({ page }) => {
  await page.addInitScript(() => {
    function rewrite() {
      var nodes = document.querySelectorAll("[data-lo-save][data-lo-key='gold-lx']");
      for (var i = 0; i < nodes.length; i++) nodes[i].setAttribute("data-lo-key", "wiki");
    }
    document.addEventListener("DOMContentLoaded", rewrite);
    try {
      new MutationObserver(rewrite).observe(document, {
        childList: true,
        subtree: true,
        attributes: true,
        attributeFilter: ["data-lo-key"],
      });
    } catch (e) { /* document not observable yet */ }
  });
  await page.goto(WIKI);
  await page.waitForFunction(() => {
    const trails = window.ITT && ITT.flowTrails && ITT.flowTrails["2001"];
    const save = document.querySelector("[data-lo-save][data-lo-key='wiki']");
    const hit = trails && trails.some((row) => row && row.whenKey === "itt01-wiki" && Number(row.n) === 1);
    return !!(hit && save && save.getAttribute("data-lo-bound") === "1");
  }, null, { timeout: 20000 });
  const panel = page.locator("[data-lo-panel]").first();
  await panel.locator("[data-lo-req]").nth(0).check();
  await panel.locator("[data-lo-req]").nth(1).check();
  await panel.locator("[data-lo-pick='keep']").click();
  await panel.locator("[data-lo-save]").click();
  await expect(panel.locator("[data-lo-status]")).toHaveText("Leftover never stamps the official key.");
  await assertNoWrite(page, "itt01-wiki");
  await assertNextHidden(page);
});

test("2004 OpenOffice leftover saves once as leftover and reloads Saved.", async ({ page }) => {
  await page.goto(OFFICE);
  await page.waitForFunction(() => {
    const save = document.querySelector("[data-lo-save][data-lo-key='openoffice']");
    return !!(save && save.getAttribute("data-lo-bound") === "1" && window.ITT && ITT.User);
  }, null, { timeout: 20000 });
  const panel = page.locator("[data-itt-dest-true='1']");
  await expect(panel).toHaveCount(1);
  await assertNextHidden(page);
  await panel.locator("[data-lo-trap]").click();
  await expect(panel.locator("[data-lo-status]")).toContainText("never writes");
  await assertNoWrite(page, "itt04-openoffice");
  const reqs = panel.locator("[data-lo-req]");
  const n = await reqs.count();
  for (let i = 0; i < n; i++) await reqs.nth(i).check();
  await panel.locator("[data-lo-pick='keep']").click();
  await panel.locator("[data-lo-field]").fill("suite");
  await panel.locator("[data-lo-save]").click();
  const blob = await assertEnvelope(page, "itt04-openoffice", { kind: "leftover", real: true });
  expect(blob.leftover).toBe(true);
  expect(blob.official).toBeFalsy();
  expect(blob.step).toBeTruthy();
  expect(blob.pick).toBe("keep");
  await expect(panel.locator("[data-lo-status]")).toHaveText("Saved.");
  await expect(panel.locator("[data-lo-status]")).not.toContainText("itt04-openoffice");
  await expect(panel.locator("[data-next-flow]")).toBeVisible();
  await page.reload();
  await expect(panel.locator("[data-lo-status]")).toHaveText("Saved.", { timeout: 20000 });
  const again = await assertEnvelope(page, "itt04-openoffice", { kind: "leftover", real: true });
  expect(again.real).toBe(true);
});

test("StumbleUpon keeps one official envelope and Thumb up does not write again", async ({ page }) => {
  await page.goto(STUMBLE);
  await page.waitForFunction(() => {
    const verb = document.querySelector("[data-su-stumble][data-official-verb]");
    return !!(verb && verb.getAttribute("data-official-verb-bound") === "1" && window.ITT && ITT.User);
  }, null, { timeout: 20000 });
  await page.evaluate(() => localStorage.setItem("itt02-stumble", "plain"));
  await page.evaluate(() => { if (ITT.revealNextFlow) ITT.revealNextFlow(document); });
  expect(await page.evaluate(() => ITT.User.finished("itt02-stumble"))).toBe(false);
  await assertNextHidden(page);
  await page.evaluate(() => localStorage.removeItem("itt02-stumble"));

  await page.locator("[data-su-topic]").selectOption("art");
  await page.locator("[data-official-need]").fill("art leftover");
  const reqs = page.locator("[data-official-req]");
  const n = await reqs.count();
  expect(n).toBeGreaterThanOrEqual(2);
  for (let i = 0; i < n; i++) await reqs.nth(i).check();
  await page.locator("[data-su-stumble]").click();
  const blob = await assertEnvelope(page, "itt02-stumble", { kind: "official", real: true });
  expect(blob.official).toBe(true);
  expect(blob.topic).toBeUndefined();
  const ts = blob.ts;
  await page.locator("[data-su-up]").click();
  await expect(page.locator("[data-su-status]")).toHaveText("Saved.");
  await expect(page.locator("[data-su-status]")).not.toContainText("itt02-stumble");
  const again = await assertEnvelope(page, "itt02-stumble", { kind: "official", real: true });
  expect(again.ts).toBe(ts);
  expect(again.topic).toBeUndefined();
  await expect(page.locator("[data-next-when-key='itt02-stumble']")).toBeVisible();
});

test("year-true leftover paints Saved. only after the write is accepted", async ({ page }) => {
  await page.goto(WIKI);
  await page.waitForFunction(() => {
    return document.documentElement.getAttribute("data-itt-feat-year-true-leftover") === "1";
  }, null, { timeout: 20000 });
  const key = await page.evaluate(() => ITT.YearExtras.forYear("2001").key("ytlprobe"));
  await page.evaluate((k) => {
    const root = document.createElement("div");
    root.setAttribute("data-ytl", "1");
    root.setAttribute("data-ytl-key", "ytlprobe");
    root.setAttribute("data-ytl-verb", "Share");
    root.setAttribute("data-itt-year", "2001");
    root.innerHTML =
      '<input data-ytl-field value="">' +
      '<button type="button" data-ytl-go>Go</button>' +
      '<span data-ytl-status></span>' +
      '<p hidden data-next-flow data-next-when-key="' + k + '">Next</p>';
    document.body.appendChild(root);
    document.documentElement.removeAttribute("data-itt-feat-year-true-leftover");
    ITT["year-true-leftover"].boot(document);
    const orig = Storage.prototype.setItem;
    window.__ittSetItem = orig;
    Storage.prototype.setItem = function (key, val) {
      if (key === k) throw new DOMException("quota", "QuotaExceededError");
      return orig.call(this, key, val);
    };
  }, key);
  const root = page.locator("[data-ytl-key='ytlprobe']");
  await root.locator("[data-ytl-field]").fill("hello");
  await root.locator("[data-ytl-go]").click();
  await expect(root.locator("[data-ytl-status]")).toHaveText("This browser blocked the save.");
  await expect(root.locator("[data-ytl-status]")).not.toContainText(key);
  await assertNoWrite(page, key);
  await expect(root.locator("[data-next-flow]")).toBeHidden();
  await page.evaluate(() => {
    Storage.prototype.setItem = window.__ittSetItem;
  });
  await root.locator("[data-ytl-go]").click();
  await expect(root.locator("[data-ytl-status]")).toHaveText("Saved.");
  const blob = await assertEnvelope(page, key, { kind: "leftover", real: true });
  expect(blob.leftover).toBe(true);
  expect(blob.verb).toBe("Share");
  await expect(root.locator("[data-next-flow]")).toBeVisible();
});

test("Drudge wander keeps the seen list in sessionStorage only", async ({ page }) => {
  await page.goto(DRUDGE);
  await page.waitForFunction(() => {
    const story = document.querySelector("[data-drudge-story]");
    return !!(story && story.getAttribute("data-official-gold") === "1" && window.ITT && ITT.User);
  }, null, { timeout: 20000 });
  await page.evaluate(() => {
    localStorage.removeItem("itt97-drudge");
    localStorage.removeItem("itt97-drudge-seen");
    sessionStorage.removeItem("itt97-drudge-seen");
    document.querySelectorAll("[data-drudge-story]").forEach((el) => {
      el.addEventListener("click", (ev) => ev.preventDefault(), true);
    });
  });
  await assertNextHidden(page);
  await page.locator("[data-drudge-story='ie4']").click({ noWaitAfter: true });
  await assertNoWrite(page, "itt97-drudge");
  expect(await page.evaluate(() => localStorage.getItem("itt97-drudge-seen"))).toBeFalsy();
  const one = await page.evaluate(() => sessionStorage.getItem("itt97-drudge-seen"));
  expect(one).toContain("ie4");
  await page.locator("[data-drudge-story='pathfinder']").click({ noWaitAfter: true });
  const blob = await assertEnvelope(page, "itt97-drudge", { kind: "official", real: true });
  expect(blob.official).toBe(true);
  expect(await page.evaluate(() => localStorage.getItem("itt97-drudge-seen"))).toBeFalsy();
  const seen = JSON.parse((await page.evaluate(() => sessionStorage.getItem("itt97-drudge-seen"))) || "[]");
  expect(seen).toEqual(["ie4", "pathfinder"]);
  await expect(page.locator("[data-official-status]").first()).toContainText("2 dests · saved");
  await expect(page.locator("[data-next-when-key='itt97-drudge']")).toBeVisible();
  expect(page.url()).toContain("/drudge/");
});

test("Drudge wander blocked save writes no official key", async ({ page }) => {
  await page.goto(DRUDGE);
  await page.waitForFunction(() => {
    const story = document.querySelector("[data-drudge-story]");
    return !!(story && story.getAttribute("data-official-gold") === "1" && window.ITT && ITT.User);
  }, null, { timeout: 20000 });
  await page.evaluate(() => {
    localStorage.removeItem("itt97-drudge");
    localStorage.removeItem("itt97-drudge-seen");
    sessionStorage.removeItem("itt97-drudge-seen");
    const orig = Storage.prototype.setItem;
    Storage.prototype.setItem = function (k, v) {
      if (k === "itt97-drudge") throw new DOMException("quota", "QuotaExceededError");
      return orig.call(this, k, v);
    };
    document.querySelectorAll("[data-drudge-story]").forEach((el) => {
      el.addEventListener("click", (ev) => ev.preventDefault(), true);
    });
  });
  await page.locator("[data-drudge-story='ie4']").click({ noWaitAfter: true });
  await page.locator("[data-drudge-story='pathfinder']").click({ noWaitAfter: true });
  await expect(page.locator("[data-official-status]").first()).toContainText("This browser blocked the save.");
  await assertNoWrite(page, "itt97-drudge");
  expect(await page.evaluate(() => localStorage.getItem("itt97-drudge-seen"))).toBeFalsy();
  const seen = JSON.parse((await page.evaluate(() => sessionStorage.getItem("itt97-drudge-seen"))) || "[]");
  expect(seen).toEqual(["ie4", "pathfinder"]);
  await assertNextHidden(page);
});
