/**
 * 2010 densify extras — Cablegate · Digg v4 · Groupon · Quora (itt10-*)
 * Optional residual from LEFT-2010-PLUS-UI-UX-DENSIFY-MAP.md
 */
(function (global) {
  "use strict";
  var ITT = global.ITT || (global.ITT = {});
  var YX = ITT.YearExtras && ITT.YearExtras.forYear("2010");
  if (!YX) {
    console.error("ITT.YearExtras missing for 2010 — load year-extras-kit.js first");
    return;
  }
  var prefix = YX.prefix;
  var key = YX.key;
  var feedback = YX.feedback;
  var saveJSON = YX.saveJSON;
  var loadJSON = YX.loadJSON;
  var markUsed = YX.markUsed;
  var showNext = YX.showNext;
  var checked = YX.checked;
  var countChecked = YX.countChecked;
  var val = YX.val;

  function bootCablegate(doc) {
    doc = doc || document;
    var btn = doc.querySelector("[data-cablegate-ack]");
    var p1 = doc.querySelector("[data-cablegate-1]");
    var p2 = doc.querySelector("[data-cablegate-2]");
    if (!btn && !p1) return;
    var st = doc.querySelector("[data-cablegate-status]");
    var kAck = key("cablegate-ack");
    var kLeft = key("cablegate");
    var pinned = { press: false, nodump: false };
    var prev = loadJSON(kAck, null) || loadJSON(kLeft, null);
    function paint() {
      if (p1) p1.setAttribute("data-ott-done", pinned.press ? "1" : "0");
      if (p2) p2.setAttribute("data-ott-done", pinned.nodump ? "1" : "0");
      if (prev && st) st.textContent = "Press pathway filed · no dump · " + kAck;
    }
    if (prev) {
      pinned.press = true;
      pinned.nodump = true;
    }
    paint();
    function persist() {
      if (!(pinned.press && pinned.nodump)) {
        feedback("Pin a press package and stamp no-dump first.", st, { error: true });
        return;
      }
      var payload = {
        ok: true,
        event: "Cablegate",
        date: "2010-11-28",
        press: true,
        noDump: true,
        multiStep: true,
        ts: Date.now()
      };
      saveJSON(kAck, payload);
      saveJSON(kLeft, payload);
      prev = payload;
      paint();
      feedback("Cablegate press pathway saved · no cable bodies mirrored.", st);
    }
    if (p1) {
      p1.addEventListener("click", function () {
        pinned.press = true;
        paint();
        feedback("Guardian package pinned.", st);
      });
    }
    if (p2) {
      p2.addEventListener("click", function () {
        pinned.nodump = true;
        paint();
        feedback("No-dump stamp applied.", st);
      });
    }
    if (btn) btn.addEventListener("click", persist);
  }

  function bootDiggV4(doc) {
    doc = doc || document;
    var btn = doc.querySelector("[data-diggv4-ack]");
    var a = doc.querySelector("[data-diggv4-algo]");
    var b = doc.querySelector("[data-diggv4-power]");
    if (!btn && !a) return;
    var st = doc.querySelector("[data-diggv4-status]");
    var k = key("digg-v4");
    var dug = { algo: false, power: false };
    var prev = loadJSON(k, null);
    function paint() {
      if (a) a.setAttribute("data-ott-done", dug.algo ? "1" : "0");
      if (b) b.setAttribute("data-ott-done", dug.power ? "1" : "0");
      if (prev && st) st.textContent = "v4 front page pinned · " + k;
    }
    if (prev) {
      dug.algo = true;
      dug.power = true;
    }
    paint();
    function persist() {
      if (!(dug.algo && dug.power)) {
        feedback("Digg both stories first (v4 front page is two steps).", st, { error: true });
        return;
      }
      var payload = {
        ok: true,
        redesign: "2010-08-25",
        stories: ["algo", "power"],
        multiStep: true,
        ts: Date.now()
      };
      saveJSON(k, payload);
      prev = payload;
      paint();
      feedback("Digg v4 front page saved · exodus is multi-year.", st);
    }
    if (a) {
      a.addEventListener("click", function () {
        dug.algo = true;
        paint();
        feedback("Dugg publisher story.", st);
      });
    }
    if (b) {
      b.addEventListener("click", function () {
        dug.power = true;
        paint();
        feedback("Dugg power-user story.", st);
      });
    }
    if (btn) btn.addEventListener("click", persist);
  }

  function bootGroupon(doc) {
    doc = doc || document;
    var btn = doc.querySelector("[data-groupon-buy]");
    if (!btn) return;
    var st = doc.querySelector("[data-groupon-status]");
    var listEl = doc.querySelector("[data-groupon-list]");
    var cityEl = doc.querySelector("[data-groupon-city]");
    var kDeals = key("groupon-deals");
    var kLeft = key("groupon");
    function render() {
      if (!listEl) return;
      var list = loadJSON(kDeals, []);
      if (!Array.isArray(list) || !list.length) {
        listEl.innerHTML = "<li>No deals bought yet (theater).</li>";
        return;
      }
      listEl.innerHTML = list
        .map(function (x) {
          return "<li><b>" + (x.title || "Deal") + "</b> · " + (x.city || "") + "</li>";
        })
        .join("");
      if (cityEl && list[0] && list[0].city && !cityEl.value) cityEl.value = list[0].city;
    }
    render();
    btn.addEventListener("click", function () {
      var titleEl = doc.querySelector("[data-groupon-title]");
      var city = ((cityEl && cityEl.value) || "").replace(/^\s+|\s+$/g, "");
      if (city.length < 2) {
        feedback("Pick a city first (empty buy does not write).", st, { error: true });
        return;
      }
      var title = (titleEl && titleEl.textContent) || "Sample deal";
      var list = loadJSON(kDeals, []);
      if (!Array.isArray(list)) list = [];
      list.unshift({ title: title, city: city, price: 20, ts: Date.now() });
      list = list.slice(0, 20);
      saveJSON(kDeals, list);
      saveJSON(kLeft, { multiStep: true, city: city, title: title, ts: Date.now() });
      render();
      feedback("Deal saved for " + city + " (theater · not a real merchant).", st);
    });
  }

  function bootQuora(doc) {
    doc = doc || document;
    var btn = doc.querySelector("[data-quora-follow]");
    if (!btn) return;
    var st = doc.querySelector("[data-quora-status]");
    var listEl = doc.querySelector("[data-quora-list]");
    var k = key("quora-follows");
    function render() {
      if (!listEl) return;
      var list = loadJSON(k, []);
      if (!list.length) {
        listEl.innerHTML = "<li>No topics followed yet.</li>";
        return;
      }
      listEl.innerHTML = list.map(function (t) { return "<li>Following <b>" + t + "</b></li>"; }).join("");
    }
    render();
    btn.addEventListener("click", function () {
      var sel = doc.querySelector("[data-quora-topic]");
      var topic = (sel && sel.value) || "Startups";
      var list = loadJSON(k, []);
      if (list.indexOf(topic) === -1) list.unshift(topic);
      saveJSON(k, list.slice(0, 20));
      render();
      feedback("Following “" + topic + "” (theater).", st);
    });
  }

  function bootIpad(doc) {
    YX.bootChecks(doc, "[data-ipad-claim]", "[data-ipad-status]", [
      "[data-ipad-date]",
      "[data-ipad-not-os]"
    ], "ipad-history", { interested: true, model: "iPad", priceFrom: 499, notIpadOS: true });
  }

  function bootWaSeed(doc) {
    YX.bootChecks(doc, "[data-wa-seed]", "[data-wa-status]", [
      "[data-wa-seed-date]",
      "[data-wa-not-sms]"
    ], "whatsapp-seed", { seed: true, year: "2010", notMassSms: true });
  }

  function bootWaveFuneral(doc) {
    YX.bootChecks(doc, "[data-wave-funeral]", "[data-wave-status]", [
      "[data-wave-may]",
      "[data-wave-aug]"
    ], "wave-funeral", { funeral: true, public: "2010-05-19", ended: "2010-08-04" });
  }

  function bootFbCulture(doc) {
    YX.bootChecks(doc, "[data-fb-culture]", "[data-fb-culture-status]", [
      "[data-fb-film]",
      "[data-fb-no-reels]"
    ], "fb-culture", { film: true, year: "2010", noReels: true });
  }

  function bootUberSf(doc) {
    YX.bootChecks(doc, "#uber-req, [data-uber-kind]", "[data-uber-status], #uber-st", [
      "[data-uber-not-x]",
      "[data-uber-sf]"
    ], "uber", { requested: true, city: "San Francisco", kind: "black-car", notUberX: true });
  }

  function bootAll(doc) {
    doc = doc || document;
    bootCablegate(doc);
    bootDiggV4(doc);
    bootGroupon(doc);
    bootQuora(doc);
    bootIpad(doc);
    bootWaSeed(doc);
    bootWaveFuneral(doc);
    bootFbCulture(doc);
    bootUberSf(doc);
  }

  if (ITT.ImmersionFeatures && ITT.ImmersionFeatures.registerLocal) {
    ITT.ImmersionFeatures.registerLocal({
      id: "year2010extras",
      featureKey: "year2010extras",
      boot: bootAll
    });
  } else {
    if (document.readyState === "loading") {
      document.addEventListener("DOMContentLoaded", function () {
        bootAll(document);
      });
    } else {
      bootAll(document);
    }
  }
})(typeof window !== "undefined" ? window : this);
