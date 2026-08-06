/**
 * 2010 densify extras — Cablegate · Digg v4 · Groupon · Quora (itt10-*)
 * Optional residual from LEFT-2010-PLUS-UI-UX-DENSIFY-MAP.md
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
        "2010";
      if (/^\d{4}$/.test(y)) return "itt" + y.slice(2);
    } catch (e) { /* */ }
    return "itt10";
  }
  function key(suffix) {
    var fb = prefix();
    return U().immersionStorageKey ? U().immersionStorageKey(suffix, fb) : fb + "-" + suffix;
  }
  function feedback(msg, st, opts) {
    opts = opts || {};
    if (st) {
      st.textContent = msg;
      st.style.color = opts.error ? "#900" : "#060";
    }
    try {
      if (ITT._immersionApi && ITT._immersionApi.actionFeedback) {
        ITT._immersionApi.actionFeedback(msg, { flash: !opts.error, status: st, ms: 3000 });
      }
    } catch (e) { /* */ }
  }
  function loadJSON(k, fb) {
    try {
      var raw = localStorage.getItem(k);
      if (!raw) return fb;
      return JSON.parse(raw);
    } catch (e) {
      return fb;
    }
  }
  function saveJSON(k, v) {
    localStorage.setItem(k, JSON.stringify(v));
  }

  function bootCablegate(doc) {
    doc = doc || document;
    var btn = doc.querySelector("[data-cablegate-ack]");
    if (!btn) return;
    var st = doc.querySelector("[data-cablegate-status]");
    var k = key("cablegate-ack");
    if (localStorage.getItem(k) && st) st.textContent = "Literacy saved · " + k;
    btn.addEventListener("click", function () {
      var a = doc.querySelector("[data-cablegate-1]");
      var b = doc.querySelector("[data-cablegate-2]");
      if (!(a && a.checked && b && b.checked)) {
        feedback("Check both literacy boxes first.", st, { error: true });
        return;
      }
      saveJSON(k, { ok: true, event: "Cablegate", date: "2010-11-28", ts: Date.now() });
      feedback("Cablegate literacy saved · no cable bodies mirrored.", st);
    });
  }

  function bootDiggV4(doc) {
    doc = doc || document;
    var btn = doc.querySelector("[data-diggv4-ack]");
    if (!btn) return;
    var st = doc.querySelector("[data-diggv4-status]");
    var k = key("digg-v4");
    if (localStorage.getItem(k) && st) st.textContent = "Saved · " + k;
    btn.addEventListener("click", function () {
      var a = doc.querySelector("[data-diggv4-algo]");
      var b = doc.querySelector("[data-diggv4-power]");
      if (!(a && a.checked && b && b.checked)) {
        feedback("Check both Digg v4 literacy boxes.", st, { error: true });
        return;
      }
      saveJSON(k, { ok: true, redesign: "2010-08-25", ts: Date.now() });
      feedback("Digg v4 literacy saved · exodus is multi-year.", st);
    });
  }

  function bootGroupon(doc) {
    doc = doc || document;
    var btn = doc.querySelector("[data-groupon-buy]");
    if (!btn) return;
    var st = doc.querySelector("[data-groupon-status]");
    var listEl = doc.querySelector("[data-groupon-list]");
    var k = key("groupon-deals");
    function render() {
      if (!listEl) return;
      var list = loadJSON(k, []);
      if (!list.length) {
        listEl.innerHTML = "<li>No deals bought yet (theater).</li>";
        return;
      }
      listEl.innerHTML = list
        .map(function (x) {
          return "<li><b>" + (x.title || "Deal") + "</b> · " + (x.city || "") + "</li>";
        })
        .join("");
    }
    render();
    btn.addEventListener("click", function () {
      var cityEl = doc.querySelector("[data-groupon-city]");
      var titleEl = doc.querySelector("[data-groupon-title]");
      var city = ((cityEl && cityEl.value) || "Chicago").replace(/^\s+|\s+$/g, "");
      var title = (titleEl && titleEl.textContent) || "Sample deal";
      var list = loadJSON(k, []);
      list.unshift({ title: title, city: city, price: 20, ts: Date.now() });
      saveJSON(k, list.slice(0, 20));
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

  function bootAll(doc) {
    doc = doc || document;
    bootCablegate(doc);
    bootDiggV4(doc);
    bootGroupon(doc);
    bootQuora(doc);
  }

  if (ITT.ImmersionFeatures && ITT.ImmersionFeatures.registerLocal) {
    ITT.ImmersionFeatures.registerLocal({
      id: "year2010extras",
      featureKey: "instagram",
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
