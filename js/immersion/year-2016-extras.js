/**
 * 2016 REAL product theaters — multi-step localStorage only (itt16-*)
 * Stories · PoGO · Reactions · jack/AirPods · Vine dual · WA E2E · P1
 */
(function (global) {
  "use strict";
  var ITT = global.ITT || (global.ITT = {});

  function U() {
    return ITT.util || {};
  }
  function prefix() {
    try {
      var y =
        (ITT._immersionYear && String(ITT._immersionYear)) ||
        (document.documentElement && document.documentElement.getAttribute("data-itt-year")) ||
        "2016";
      if (/^\d{4}$/.test(y)) return "itt" + y.slice(2);
    } catch (e) {
      /* */
    }
    return "itt16";
  }
  function key(suffix) {
    var fb = prefix();
    return U().immersionStorageKey ? U().immersionStorageKey(suffix, fb) : fb + "-" + suffix;
  }
  function feedback(msg, st, opts) {
    opts = opts || {};
    if (st) {
      st.textContent = msg;
      st.style.color = opts.error ? "#a00" : "#060";
    }
    try {
      if (ITT._immersionApi && ITT._immersionApi.actionFeedback) {
        ITT._immersionApi.actionFeedback(msg, { flash: !opts.error, status: st, ms: 3200 });
      }
    } catch (e) {
      /* */
    }
  }
  function saveJSON(k, v) {
    try {
      localStorage.setItem(k, JSON.stringify(v));
    } catch (e) {
      /* */
    }
  }
  function loadJSON(k, fb) {
    try {
      var r = localStorage.getItem(k);
      if (!r) return fb;
      return JSON.parse(r);
    } catch (e) {
      return fb;
    }
  }
  function markUsed() {
    try {
      if (ITT._immersionApi && ITT._immersionApi.markTourUsed) ITT._immersionApi.markTourUsed();
    } catch (e) {
      /* */
    }
  }
  function checked(doc, sel) {
    var el = doc.querySelector(sel);
    return !!(el && el.checked);
  }
  function val(doc, sel) {
    var el = doc.querySelector(sel);
    return el ? String(el.value || "").trim() : "";
  }

  function bootStories(doc) {
    doc = doc || document;
    var btn = doc.querySelector("[data-ig-story-add]");
    if (!btn) return;
    var st = doc.querySelector("[data-ig-story-status]");
    var list = doc.querySelector("[data-ig-story-list]");
    var kList = key("ig-stories-list");
    function render() {
      if (!list) return;
      var arr = loadJSON(kList, []);
      list.innerHTML = "";
      var i;
      for (i = arr.length - 1; i >= 0; i--) {
        var d = doc.createElement("div");
        d.style.cssText =
          "padding:8px;margin:4px 0;border:1px solid #333;border-radius:8px;background:#111";
        d.textContent = "● Your story · " + (arr[i].text || "") + " · 24h";
        list.appendChild(d);
      }
    }
    render();
    btn.addEventListener("click", function () {
      var text = val(doc, "[data-ig-story-text]");
      if (text.length < 1) {
        feedback("Write a story first.", st, { error: true });
        return;
      }
      if (!checked(doc, "[data-ig-story-24h]") || !checked(doc, "[data-ig-story-snap]")) {
        feedback("Confirm 24h + Snap competes honesty.", st, { error: true });
        return;
      }
      var arr = loadJSON(kList, []);
      if (!Array.isArray(arr)) arr = [];
      arr.push({ text: text, ts: Date.now() });
      saveJSON(kList, arr);
      saveJSON(key("ig-stories"), {
        multiStep: true,
        real: true,
        launch: "2016-08-02",
        last: text,
        ts: Date.now()
      });
      render();
      feedback("Added to Story (theater) · " + key("ig-stories"), st);
      markUsed();
    });
  }

  function bootPogo(doc) {
    doc = doc || document;
    var catchBtn = doc.querySelector("[data-pogo-catch]");
    var saveBtn = doc.querySelector("[data-pogo-save]");
    var st = doc.querySelector("[data-pogo-status]");
    var dex = doc.querySelector("[data-pogo-dex]");
    var caught = loadJSON(key("pogo-caught"), []);
    if (!Array.isArray(caught)) caught = [];
    function renderDex() {
      if (!dex) return;
      dex.innerHTML =
        caught.length === 0
          ? "<span style='opacity:0.7'>Dex empty — catch a silhouette.</span>"
          : caught
              .map(function (c, i) {
                return "<div>#" + (i + 1) + " silhouette · team " + (c.team || "?") + "</div>";
              })
              .join("");
    }
    renderDex();
    if (catchBtn) {
      catchBtn.addEventListener("click", function () {
        if (!checked(doc, "[data-pogo-loc]")) {
          feedback("Confirm location honesty first.", st, { error: true });
          return;
        }
        var teamEl = doc.querySelector("[data-pogo-team]:checked");
        if (!teamEl) {
          feedback("Pick a team.", st, { error: true });
          return;
        }
        caught.push({ team: teamEl.value, ts: Date.now() });
        saveJSON(key("pogo-caught"), caught);
        renderDex();
        feedback("Caught a silhouette! (no official art) · " + caught.length, st);
      });
    }
    if (saveBtn) {
      saveBtn.addEventListener("click", function () {
        if (!checked(doc, "[data-pogo-loc]") || !checked(doc, "[data-pogo-battery]")) {
          feedback("Location honesty + battery literacy required.", st, { error: true });
          return;
        }
        if (!caught.length) {
          feedback("Catch at least one silhouette first.", st, { error: true });
          return;
        }
        var teamEl = doc.querySelector("[data-pogo-team]:checked");
        saveJSON(key("pogo"), {
          multiStep: true,
          real: true,
          launch: "2016-07-06",
          team: teamEl ? teamEl.value : caught[0].team,
          catches: caught.length,
          silhouetteOnly: true,
          ts: Date.now()
        });
        feedback("GO session saved · " + key("pogo"), st);
        markUsed();
      });
    }
  }

  function bootReactions(doc) {
    doc = doc || document;
    var btn = doc.querySelector("[data-reaction-save]");
    if (!btn) return;
    var st = doc.querySelector("[data-reaction-status]");
    btn.addEventListener("click", function () {
      var el = doc.querySelector("[data-reaction]:checked");
      if (!el) {
        feedback("Pick a reaction first.", st, { error: true });
        return;
      }
      saveJSON(key("reactions"), {
        reaction: el.value,
        multiStep: true,
        real: true,
        launch: "2016-02-24",
        ts: Date.now()
      });
      feedback("Reacted: " + el.value + " · " + key("reactions"), st);
      markUsed();
    });
  }

  function bootJack(doc) {
    doc = doc || document;
    var btn = doc.querySelector("[data-jack-save]");
    if (!btn) return;
    var st = doc.querySelector("[data-jack-status]");
    btn.addEventListener("click", function () {
      if (
        !checked(doc, "[data-jack-1]") ||
        !checked(doc, "[data-jack-2]") ||
        !checked(doc, "[data-jack-3]")
      ) {
        feedback("Check all 3 jack literacy boxes.", st, { error: true });
        return;
      }
      saveJSON(key("iphone7"), {
        noJack: true,
        multiStep: true,
        real: true,
        announce: "2016-09-07",
        ts: Date.now()
      });
      feedback("Jack literacy saved · " + key("iphone7"), st);
      markUsed();
    });
  }

  function bootAirPods(doc) {
    doc = doc || document;
    var btn = doc.querySelector("[data-airpods-save]");
    if (!btn) return;
    var st = doc.querySelector("[data-airpods-status]");
    btn.addEventListener("click", function () {
      if (
        !checked(doc, "[data-airpods-ship]") ||
        !checked(doc, "[data-airpods-price]") ||
        !checked(doc, "[data-airpods-pair]")
      ) {
        feedback("Check ship · price · pair boxes.", st, { error: true });
        return;
      }
      saveJSON(key("airpods"), {
        multiStep: true,
        real: true,
        order: "2016-12-13",
        price: 159,
        ts: Date.now()
      });
      feedback("AirPods setup saved · " + key("airpods"), st);
      markUsed();
    });
  }

  function bootVine(doc) {
    doc = doc || document;
    var btn = doc.querySelector("[data-vine-save]");
    if (!btn) return;
    var st = doc.querySelector("[data-vine-status]");
    btn.addEventListener("click", function () {
      if (!checked(doc, "[data-vine-announce]") || !checked(doc, "[data-vine-offline]")) {
        feedback("Both dates required: Oct 27 announce AND 2017 offline class.", st, {
          error: true
        });
        return;
      }
      saveJSON(key("vine"), {
        announce: "2016-10-27",
        offlineClass: "2017-01",
        multiStep: true,
        real: true,
        dualDate: true,
        ts: Date.now()
      });
      feedback("Vine dual-date literacy · " + key("vine"), st);
      markUsed();
    });
  }

  function bootE2E(doc) {
    doc = doc || document;
    var btn = doc.querySelector("[data-e2e-save]");
    if (!btn) return;
    var st = doc.querySelector("[data-e2e-status]");
    btn.addEventListener("click", function () {
      var n = 0;
      var i;
      for (i = 1; i <= 4; i++) if (checked(doc, "[data-e2e-" + i + "]")) n++;
      if (n < 4) {
        feedback("Confirm all 4 E2E literacy points.", st, { error: true });
        return;
      }
      saveJSON(key("wa-e2e"), {
        multiStep: true,
        real: true,
        defaultE2E: true,
        date: "2016-04-05",
        ts: Date.now()
      });
      feedback("WhatsApp E2E literacy · " + key("wa-e2e"), st);
      markUsed();
    });
  }

  function bootWin10(doc) {
    doc = doc || document;
    var btn = doc.querySelector("[data-win10-save]");
    if (!btn) return;
    var st = doc.querySelector("[data-win10-status]");
    btn.addEventListener("click", function () {
      if (
        !checked(doc, "[data-win10-ended]") ||
        !checked(doc, "[data-win10-still]") ||
        !checked(doc, "[data-win10-edge]")
      ) {
        feedback("Check free-ended · still product · Edge honesty.", st, { error: true });
        return;
      }
      saveJSON(key("win10"), {
        freeUpgradeEnded: "2016-07-29",
        multiStep: true,
        real: true,
        ts: Date.now()
      });
      feedback("Win10 free-upgrade-end · " + key("win10"), st);
      markUsed();
    });
  }

  function bootBots(doc) {
    doc = doc || document;
    var btn = doc.querySelector("[data-bots-save]");
    if (!btn) return;
    var st = doc.querySelector("[data-bots-status]");
    btn.addEventListener("click", function () {
      if (!checked(doc, "[data-bots-f8]") || !checked(doc, "[data-bots-not-2015]")) {
        feedback("Confirm F8 2016 bots + not-2015-only.", st, { error: true });
        return;
      }
      var pick = val(doc, "[data-bots-pick]");
      if (!pick) {
        feedback("Pick a bot class.", st, { error: true });
        return;
      }
      saveJSON(key("bots"), {
        bot: pick,
        multiStep: true,
        real: true,
        f8: "2016-04-12",
        ts: Date.now()
      });
      feedback("Bot theater: " + pick + " · " + key("bots"), st);
      markUsed();
    });
  }

  function bootRift(doc) {
    doc = doc || document;
    var btn = doc.querySelector("[data-rift-save]");
    if (!btn) return;
    var st = doc.querySelector("[data-rift-status]");
    btn.addEventListener("click", function () {
      if (!checked(doc, "[data-rift-ship]") || !checked(doc, "[data-rift-price]")) {
        feedback("Confirm ship + price.", st, { error: true });
        return;
      }
      saveJSON(key("rift"), {
        ship: "2016-03-28",
        price: 599.99,
        multiStep: true,
        real: true,
        ts: Date.now()
      });
      feedback("Rift ship residual · " + key("rift"), st);
      markUsed();
    });
  }

  function bootLinkedIn(doc) {
    doc = doc || document;
    var btn = doc.querySelector("[data-li-save]");
    if (!btn) return;
    var st = doc.querySelector("[data-li-status]");
    btn.addEventListener("click", function () {
      if (!checked(doc, "[data-li-deal]") || !checked(doc, "[data-li-brand]")) {
        feedback("Confirm deal + brand honesty.", st, { error: true });
        return;
      }
      saveJSON(key("linkedin"), {
        deal: "2016-06-13",
        price: 26.2e9,
        multiStep: true,
        real: true,
        ts: Date.now()
      });
      feedback("LinkedIn deal literacy · " + key("linkedin"), st);
      markUsed();
    });
  }

  function bootAllo(doc) {
    doc = doc || document;
    var btn = doc.querySelector("[data-allo-save]");
    if (!btn) return;
    var st = doc.querySelector("[data-allo-status]");
    btn.addEventListener("click", function () {
      if (!checked(doc, "[data-allo-launch]") || !checked(doc, "[data-allo-smart]")) {
        feedback("Confirm launch + smart reply.", st, { error: true });
        return;
      }
      saveJSON(key("allo"), {
        launch: "2016-09-21",
        multiStep: true,
        real: true,
        ts: Date.now()
      });
      feedback("Allo literacy · " + key("allo"), st);
      markUsed();
    });
  }

  function bootMusically(doc) {
    doc = doc || document;
    var btn = doc.querySelector("[data-mly-save]");
    if (!btn) return;
    var st = doc.querySelector("[data-mly-status]");
    btn.addEventListener("click", function () {
      if (!checked(doc, "[data-mly-not-tt]")) {
        feedback("Confirm not-TikTok brand honesty.", st, { error: true });
        return;
      }
      var cap = val(doc, "[data-mly-caption]");
      if (cap.length < 2) {
        feedback("Write a caption (2+ chars).", st, { error: true });
        return;
      }
      saveJSON(key("musical"), {
        caption: cap,
        notTikTok: true,
        multiStep: true,
        real: true,
        ts: Date.now()
      });
      feedback("Musical.ly post (theater) · " + key("musical"), st);
      markUsed();
    });
  }

  function bootChrome(doc) {
    doc = doc || document;
    var btn = doc.querySelector("[data-chrome16-save]");
    if (!btn) return;
    var st = doc.querySelector("[data-chrome16-status]");
    btn.addEventListener("click", function () {
      if (
        !checked(doc, "[data-chrome16-habit]") ||
        !checked(doc, "[data-chrome16-edge]") ||
        !checked(doc, "[data-chrome16-dl]")
      ) {
        feedback("Confirm habit · Edge · download.", st, { error: true });
        return;
      }
      saveJSON(key("chrome"), {
        downloaded: true,
        preferred: checked(doc, "[data-chrome16-prefer]"),
        multiStep: true,
        real: true,
        year: "2016",
        ts: Date.now()
      });
      feedback("Chrome REAL · " + key("chrome"), st);
      markUsed();
    });
  }

  function bootAll(doc) {
    doc = doc || document;
    bootStories(doc);
    bootPogo(doc);
    bootReactions(doc);
    bootJack(doc);
    bootAirPods(doc);
    bootVine(doc);
    bootE2E(doc);
    bootWin10(doc);
    bootBots(doc);
    bootRift(doc);
    bootLinkedIn(doc);
    bootAllo(doc);
    bootMusically(doc);
    bootChrome(doc);
  }

  var features = ITT.ImmersionFeatures || (ITT.ImmersionFeatures = []);
  if (typeof features.registerLocal === "function") {
    features.registerLocal({
      id: "year2016extras",
      featureKey: "year2016extras",
      boot: bootAll
    });
  } else {
    features.push({
      id: "year2016extras",
      needs: function (cfg) {
        return !cfg.features || cfg.features.year2016extras !== false;
      },
      boot: bootAll
    });
  }
})(typeof window !== "undefined" ? window : this);
