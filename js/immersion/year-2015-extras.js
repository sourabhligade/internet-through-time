/**
 * 2015 REAL product theaters — multi-step localStorage only (itt15-*)
 * Watch ship · Win10 free upgrade · Edge · plus densify gems via real-flow.js
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
        "2015";
      if (/^\d{4}$/.test(y)) return "itt" + y.slice(2);
    } catch (e) {
      /* */
    }
    return "itt15";
  }
  function key(suffix) {
    var fb = prefix();
    return U().immersionStorageKey ? U().immersionStorageKey(suffix, fb) : fb + "-" + suffix;
  }
  function feedback(msg, st, opts) {
    opts = opts || {};
    if (st) {
      st.textContent = msg;
      st.style.color = "";
      try {
        st.classList.remove("is-ok", "is-err");
        st.removeAttribute("data-state");
        if (opts.error) {
          st.classList.add("is-err");
          st.setAttribute("data-state", "err");
        } else if (msg) {
          st.classList.add("is-ok");
          st.setAttribute("data-state", "ok");
        }
      } catch (e0) {
        st.style.color = opts.error ? "#a00" : "#060";
      }
    }
    try {
      if (ITT._immersionApi && ITT._immersionApi.actionFeedback) {
        ITT._immersionApi.actionFeedback(msg, { flash: !opts.error, status: st, ms: 3200 });
      }
    } catch (e) {
      /* */
    }
  }

  function revealNext(doc) {
    doc = doc || document;
    var next = doc.querySelector("[data-itt15-next]");
    if (next) {
      next.hidden = false;
      try {
        next.style.display = "";
      } catch (e) {
        /* */
      }
    }
  }
  function saveJSON(k, v) {
    try {
      localStorage.setItem(k, JSON.stringify(v));
    } catch (e) {
      /* */
    }
  }
  function loadJSON(k, fallback) {
    try {
      var raw = localStorage.getItem(k);
      if (!raw) return fallback;
      return JSON.parse(raw);
    } catch (e) {
      return fallback;
    }
  }
  function checked(doc, sel) {
    var el = doc.querySelector(sel);
    return !!(el && el.checked);
  }
  function countChecked(doc, sel) {
    var nodes = doc.querySelectorAll(sel);
    var n = 0;
    var i;
    for (i = 0; i < nodes.length; i++) if (nodes[i].checked) n++;
    return n;
  }
  function markUsed() {
    try {
      if (ITT._immersionApi && ITT._immersionApi.markTourUsed) ITT._immersionApi.markTourUsed();
    } catch (e) {
      /* */
    }
  }

  function bootWatch15(doc) {
    doc = doc || document;
    var btn = doc.querySelector("[data-watch15-save]");
    if (!btn) return;
    var st = doc.querySelector("[data-watch15-status]");
    btn.addEventListener("click", function () {
      if (!checked(doc, "[data-watch-shipped]")) {
        feedback("Confirm: retail ship 2015 (not 2014 announce-only).", st, { error: true });
        return;
      }
      var face = (doc.querySelector("[data-watch-face]") || {}).value || "sport";
      var band = (doc.querySelector("[data-watch-band]") || {}).value || "sport";
      saveJSON(key("watch"), {
        face: face,
        band: band,
        shipped: "2015-04-24",
        multiStep: true,
        real: true,
        ts: Date.now()
      });
      feedback("Saved · " + face + " face · " + band + " band · shipped 2015", st);
      revealNext(doc);
      markUsed();
    });
  }

  function bootWin10(doc) {
    doc = doc || document;
    var btn = doc.querySelector("[data-win10-upgrade]");
    if (!btn) return;
    var st = doc.querySelector("[data-win10-status]");
    btn.addEventListener("click", function () {
      if (countChecked(doc, "[data-req], [data-win10-free], [data-win10-not-only]") < 2) {
        feedback("Complete both Win10 literacy checks first.", st, { error: true });
        return;
      }
      saveJSON(key("win10"), {
        freeUpgrade: true,
        year: 2015,
        multiStep: true,
        real: true,
        ts: Date.now()
      });
      feedback("Free upgrade reserved (theater). Next: try Edge.", st);
      revealNext(doc);
      markUsed();
    });
  }

  function bootEdge(doc) {
    doc = doc || document;
    var dl = doc.querySelector("[data-edge-download]");
    var pref = doc.querySelector("[data-edge-prefer]");
    var st = doc.querySelector("[data-edge-status]");
    if (dl) {
      dl.addEventListener("click", function () {
        if (countChecked(doc, "[data-req]") < 2) {
          feedback("Complete literacy checks first.", st, { error: true });
          return;
        }
        var o = { downloaded: true, multiStep: true, real: true, ts: Date.now() };
        saveJSON(key("edge"), o);
        feedback("Edge downloaded (theater). Now prefer it as your browser.", st);
        markUsed();
      });
    }
    if (pref) {
      pref.addEventListener("click", function () {
        var raw = null;
        try {
          raw = JSON.parse(localStorage.getItem(key("edge")) || "null");
        } catch (e) {
          raw = null;
        }
        if (!raw || !raw.downloaded) {
          feedback("Download Edge first, then prefer.", st, { error: true });
          return;
        }
        raw.preferred = true;
        raw.ts = Date.now();
        saveJSON(key("edge"), raw);
        feedback("Edge preferred (local). Free-OS trail complete.", st);
        revealNext(doc);
        markUsed();
      });
    }
  }

  /* Periscope / Meerkat / FB Live — titled go-live REAL */
  function bootLiveGo(doc) {
    doc = doc || document;
    var go = doc.querySelector("[data-live-go]");
    if (!go || go.getAttribute("data-bound") === "1") return;
    go.setAttribute("data-bound", "1");
    var st = doc.querySelector("[data-live-status]");
    var list = doc.querySelector("[data-live-list]");
    var app = go.getAttribute("data-live-app") || "periscope";
    var storageSuffix =
      app === "meerkat" ? "meerkat-live" : app === "fblive" ? "fblive-live" : "periscope-live";

    function render() {
      if (!list) return;
      var items = [];
      try {
        items = JSON.parse(localStorage.getItem(key(storageSuffix)) || "[]") || [];
      } catch (e) {
        items = [];
      }
      if (!items.length) {
        list.innerHTML = "<font color='#888'>No live sessions yet.</font>";
        return;
      }
      list.innerHTML = items
        .map(function (it) {
          return (
            "<div style='border-bottom:1px solid #eee;padding:6px 0'><b>LIVE</b> · " +
            String(it.title || "").replace(/</g, "&lt;") +
            "</div>"
          );
        })
        .join("");
    }
    render();

    go.addEventListener("click", function () {
      var titleEl = doc.querySelector("[data-live-title]");
      var title = titleEl && titleEl.value != null ? String(titleEl.value).replace(/^\s+|\s+$/g, "") : "";
      if (title.length < 2) {
        feedback("REAL gate: enter a stream title first (not a soft mock).", st, { error: true });
        return;
      }
      if (countChecked(doc, "[data-req], [data-live-req]") < 2) {
        feedback("REAL gate: complete literacy checks first (not a soft mock).", st, { error: true });
        return;
      }
      var items = [];
      try {
        items = JSON.parse(localStorage.getItem(key(storageSuffix)) || "[]") || [];
      } catch (e2) {
        items = [];
      }
      if (!Array.isArray(items)) items = [];
      items.unshift({
        title: title.slice(0, 120),
        app: app,
        multiStep: true,
        real: true,
        ts: Date.now()
      });
      saveJSON(key(storageSuffix), items.slice(0, 30));
      // also set simple product key for densify/real packs
      if (app === "periscope") {
        saveJSON(key("periscope"), { live: true, title: title.slice(0, 120), multiStep: true, real: true, ts: Date.now() });
      } else if (app === "meerkat") {
        saveJSON(key("meerkat"), { live: true, title: title.slice(0, 120), multiStep: true, real: true, ts: Date.now() });
      } else {
        saveJSON(key("fblive"), { live: true, title: title.slice(0, 120), multiStep: true, real: true, ts: Date.now() });
      }
      feedback("You're LIVE (theater): “" + title.slice(0, 40) + "”", st);
      if (titleEl) titleEl.value = "";
      render();
      revealNext(doc);
      markUsed();
    });
  }

  /* Peach canvas — magic word REAL */
  function bootPeach(doc) {
    doc = doc || document;
    var btn = doc.querySelector("[data-peach-save]");
    if (!btn || btn.getAttribute("data-bound") === "1") return;
    btn.setAttribute("data-bound", "1");
    var st = doc.querySelector("[data-peach-status]");
    var list = doc.querySelector("[data-peach-list]");

    function render() {
      if (!list) return;
      var items = [];
      try {
        items = JSON.parse(localStorage.getItem(key("peach-canvas")) || "[]") || [];
      } catch (e) {
        items = [];
      }
      if (!items.length) {
        list.innerHTML = "<font color='#888'>Canvas empty.</font>";
        return;
      }
      list.innerHTML = items
        .map(function (it) {
          return (
            "<div style='border-bottom:1px solid #eee;padding:6px 0'><b>✦</b> " +
            String(it.word || "").replace(/</g, "&lt;") +
            "</div>"
          );
        })
        .join("");
    }
    render();

    btn.addEventListener("click", function () {
      var wordEl = doc.querySelector("[data-peach-word]");
      var word = wordEl && wordEl.value != null ? String(wordEl.value).replace(/^\s+|\s+$/g, "") : "";
      if (word.length < 2) {
        feedback("REAL gate: enter a magic word first.", st, { error: true });
        return;
      }
      if (!checked(doc, "[data-peach-fade]") || !checked(doc, "[data-peach-lit]")) {
        feedback("Complete fade honesty + literacy checks.", st, { error: true });
        return;
      }
      var items = [];
      try {
        items = JSON.parse(localStorage.getItem(key("peach-canvas")) || "[]") || [];
      } catch (e2) {
        items = [];
      }
      if (!Array.isArray(items)) items = [];
      items.unshift({ word: word.slice(0, 40), multiStep: true, real: true, ts: Date.now() });
      saveJSON(key("peach-canvas"), items.slice(0, 30));
      feedback("Posted “" + word.slice(0, 40) + "” to canvas", st);
      if (wordEl) wordEl.value = "";
      render();
      revealNext(doc);
      markUsed();
    });
  }


  function bootHomeProgress(doc) {
    doc = doc || document;
    if (!doc.querySelector("[data-itt15-home-trails]")) return;
    var cards = doc.querySelectorAll(".itt15-trail-card[data-trail-keys]");
    var i;
    for (i = 0; i < cards.length; i++) {
      var keys = String(cards[i].getAttribute("data-trail-keys") || "").split(",");
      var ok = true;
      var j;
      for (j = 0; j < keys.length; j++) {
        var k = keys[j].replace(/^\s+|\s+$/g, "");
        if (!k) continue;
        try {
          if (!localStorage.getItem(k)) ok = false;
        } catch (e) {
          ok = false;
        }
      }
      if (ok && keys.length) {
        cards[i].classList.add("is-done");
        var mark = cards[i].querySelector(".done-mark");
        if (mark) mark.hidden = false;
      }
    }
  }

  function bootGwx(doc) {
    doc = doc || document;
    var btn = doc.querySelector("[data-gwx-reserve]");
    if (!btn || btn.getAttribute("data-bound") === "1") return;
    btn.setAttribute("data-bound", "1");
    var st = doc.querySelector("[data-gwx-status]");
    btn.addEventListener("click", function () {
      if (countChecked(doc, "[data-req], [data-gwx-req]") < 2) {
        feedback("Complete GWX literacy checks first.", st, { error: true });
        return;
      }
      var prev = loadJSON(key("win10"), null) || {};
      prev.gwx = true;
      prev.freeUpgrade = true;
      prev.multiStep = true;
      prev.real = true;
      prev.year = 2015;
      prev.ts = Date.now();
      saveJSON(key("win10"), prev);
      feedback("GWX reserve theater saved · free upgrade path", st);
      revealNext(doc);
      markUsed();
    });
  }

  function bootWatchPair(doc) {
    doc = doc || document;
    var btn = doc.querySelector("[data-watch-pair-save]");
    if (!btn || btn.getAttribute("data-bound") === "1") return;
    btn.setAttribute("data-bound", "1");
    var st = doc.querySelector("[data-watch-pair-status]");
    btn.addEventListener("click", function () {
      var prev = loadJSON(key("watch"), null);
      if (!prev || !prev.shipped) {
        feedback("REAL gate: save Watch config (shipped 2015) first.", st, { error: true });
        return;
      }
      if (countChecked(doc, "[data-req], [data-watch-pair-req]") < 2) {
        feedback("Complete pairing literacy checks first.", st, { error: true });
        return;
      }
      prev.paired = true;
      prev.ts = Date.now();
      saveJSON(key("watch"), prev);
      feedback("Watch paired (theater)", st);
      revealNext(doc);
      markUsed();
    });
  }

  function bootAll(doc) {
    doc = doc || document;
    bootWatch15(doc);
    bootWin10(doc);
    bootEdge(doc);
    bootLiveGo(doc);
    bootPeach(doc);
    bootGwx(doc);
    bootWatchPair(doc);
    bootHomeProgress(doc);
  }

  var features = ITT.ImmersionFeatures || (ITT.ImmersionFeatures = []);
  if (typeof features.registerLocal === "function") {
    features.registerLocal({
      id: "year2015extras",
      featureKey: "year2015extras",
      boot: bootAll
    });
  } else {
    features.push({
      id: "year2015extras",
      needs: function (cfg) {
        return !cfg.features || cfg.features.year2015extras !== false;
      },
      boot: bootAll
    });
  }
})(typeof window !== "undefined" ? window : this);
