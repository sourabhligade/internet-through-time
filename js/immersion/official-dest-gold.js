/**
 * Official-trail dest gold — FAIL years.
 * Incomplete never writes. Payload { real, multiStep }.
 */
(function (global) {
  "use strict";
  var ITT = global.ITT || (global.ITT = {});

  function api() {
    return ITT._immersionApi || null;
  }

  function yearOf(doc) {
    try {
      if (ITT._immersionYear) return String(ITT._immersionYear);
    } catch (e0) { /* */ }
    try {
      var y = doc.documentElement && doc.documentElement.getAttribute("data-itt-year");
      if (y) return y;
    } catch (e1) { /* */ }
    return "";
  }

  function prefix(year) {
    if (/^\d{4}$/.test(year)) return "itt" + year.slice(2);
    var a = api();
    if (a && a.YEAR) return "itt" + String(a.YEAR).slice(2);
    return "itt";
  }

  function keyOf(year, suffix) {
    var a = api();
    if (a && a.storageKey) return a.storageKey(suffix);
    return prefix(year) + "-" + suffix;
  }

  function saveGold(year, suffix, extra) {
    var a = api();
    var payload = { multiStep: true, real: true, year: year, ts: Date.now() };
    var k;
    if (extra) for (k in extra) if (Object.prototype.hasOwnProperty.call(extra, k)) payload[k] = extra[k];
    var key = keyOf(year, suffix);
    try {
      if (a && a.saveJSON) a.saveJSON(key, payload);
      else localStorage.setItem(key, JSON.stringify(payload));
    } catch (eS) { /* */ }
    try {
      if (ITT.revealNextFlow) ITT.revealNextFlow(document);
    } catch (eN) { /* */ }
    return key;
  }

  function feedback(msg, st, err) {
    var a = api();
    if (a && a.actionFeedback) {
      a.actionFeedback(msg, { status: st || null, flash: true });
      return;
    }
    if (st) st.textContent = msg;
  }

  function bindForm(doc, sel, suffix, read) {
    var form = doc.querySelector(sel);
    if (!form || form.getAttribute("data-official-gold") === "1") return;
    form.setAttribute("data-official-gold", "1");
    var st = doc.querySelector("[data-official-status]") || form.querySelector("[data-official-status]");
    form.addEventListener("submit", function (ev) {
      ev.preventDefault();
      var year = yearOf(doc);
      var got = read(form, doc);
      if (!got.ok) {
        feedback(got.msg || "Empty never writes.", st, true);
        return;
      }
      var key = saveGold(year, suffix, got.extra || {});
      feedback("Saved · " + key, st);
    });
  }

  function wander(doc, attr, sessSuffix, goldSuffix, need) {
    var nodes = doc.querySelectorAll("[" + attr + "]");
    if (!nodes.length) return;
    var year = yearOf(doc);
    var sessKey = prefix(year) + "-" + sessSuffix;
    function seen() {
      try {
        var raw = sessionStorage.getItem(sessKey);
        var arr = raw ? JSON.parse(raw) : [];
        return Array.isArray(arr) ? arr : [];
      } catch (e) {
        return [];
      }
    }
    var arr = seen();
    var i;
    for (i = 0; i < nodes.length; i++) {
      (function (el) {
        if (el.getAttribute("data-official-gold") === "1") return;
        el.setAttribute("data-official-gold", "1");
        var id = el.getAttribute(attr) || "";
        if (el.tagName === "A" || el.tagName === "AREA") {
          el.addEventListener("click", function () {
            if (id && arr.indexOf(id) === -1) arr.push(id);
            try {
              sessionStorage.setItem(sessKey, JSON.stringify(arr));
            } catch (eS) { /* */ }
            var st = doc.querySelector("[data-official-status], [data-sj-status], [data-drudge-status]");
            if (arr.length >= need) {
              saveGold(year, goldSuffix, { ids: arr.slice(0, 8) });
              feedback(need + " dests · saved", st);
            } else {
              feedback(arr.length + "/" + need + " (writes after " + need + ")", st, true);
            }
          });
        }
      })(nodes[i]);
    }
    var landed = doc.querySelector("[" + attr + "][data-official-land]");
    if (landed) {
      var lid = landed.getAttribute(attr) || "";
      if (lid && arr.indexOf(lid) === -1) {
        arr.push(lid);
        try {
          sessionStorage.setItem(sessKey, JSON.stringify(arr));
        } catch (eL) { /* */ }
      }
      if (arr.length >= need) saveGold(year, goldSuffix, { ids: arr.slice(0, 8) });
    }
  }

  function boot(doc) {
    doc = doc || document;
    bindForm(doc, "form[data-av-search]", "av", function (form) {
      var q = ((form.querySelector("[name='q']") || {}).value || "").replace(/^\s+|\s+$/g, "");
      if (q.length < 2) return { ok: false, msg: "Type a query first. Empty never writes." };
      return { ok: true, extra: { q: q.slice(0, 80) } };
    });
    bindForm(doc, "form[data-ns-download]", "ns-dl", function (form) {
      var os = ((form.querySelector("[name='os']") || {}).value || "").replace(/^\s+|\s+$/g, "");
      if (!os) return { ok: false, msg: "Pick a platform first." };
      return { ok: true, extra: { os: os } };
    });
    bindForm(doc, "form[data-lycos-search]", "lycos", function (form) {
      var q = ((form.querySelector("[name='q'], [data-search-q]") || {}).value || "").replace(/^\s+|\s+$/g, "");
      if (q.length < 2) return { ok: false, msg: "Type a catalog word first." };
      return { ok: true, extra: { q: q.slice(0, 80) } };
    });
    bindForm(doc, "form[data-paypal-send]", "paypal", function (form) {
      var email = ((form.querySelector("[name='email']") || {}).value || "").replace(/^\s+|\s+$/g, "");
      var amount = ((form.querySelector("[name='amount']") || {}).value || "").replace(/^\s+|\s+$/g, "");
      if (email.length < 3 || !amount) return { ok: false, msg: "To + amount required. Empty never writes." };
      return { ok: true, extra: { email: email.slice(0, 80), amount: amount.slice(0, 12) } };
    });
    bindForm(doc, "form[data-y2k-form]", "y2k", function (form) {
      var boxes = form.querySelectorAll("[data-y2k-sys]:checked");
      if (boxes.length < 2) return { ok: false, msg: "Mark two systems remediated first." };
      var ids = [];
      var i;
      for (i = 0; i < boxes.length; i++) ids.push(boxes[i].getAttribute("data-y2k-sys") || "sys");
      return { ok: true, extra: { systems: ids } };
    });
    bindForm(doc, "form[data-td-form]", "td", function (form) {
      var line = ((form.querySelector("[data-td-line]") || {}).value || "").replace(/^\s+|\s+$/g, "");
      var city = ((form.querySelector("[data-td-city]") || {}).value || "").replace(/^\s+|\s+$/g, "");
      if (line.length < 2 || city.length < 2) return { ok: false, msg: "Pick a line and a city. Empty never writes." };
      return { ok: true, extra: { line: line.slice(0, 80), city: city.slice(0, 40) } };
    });

    wander(doc, "data-sj-planet", "sj-seen", "jam", 3);
    wander(doc, "data-drudge-story", "drudge-seen", "drudge", 2);

    var nap = doc.querySelector("form[data-napster-search]");
    if (nap && nap.getAttribute("data-official-gold") !== "1") {
      nap.setAttribute("data-official-gold", "1");
      nap.addEventListener("submit", function () {
        var input = nap.querySelector("input[name='q'], input[type='text']");
        var q = input ? String(input.value || "").replace(/^\s+|\s+$/g, "") : "";
        if (q.length < 2) return;
        saveGold(yearOf(doc), "napster", { q: q.slice(0, 80) });
      });
    }
  }

  if (ITT.ImmersionFeatures && ITT.ImmersionFeatures.registerLocal) {
    ITT.ImmersionFeatures.registerLocal({
      id: "official-dest-gold",
      featureKey: "officialDestGold",
      boot: boot
    });
  } else if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", function () { boot(document); });
  } else {
    boot(document);
  }
})(typeof window !== "undefined" ? window : this);
