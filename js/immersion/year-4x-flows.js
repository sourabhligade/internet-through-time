/**
 * Leftover dest writers — one module, every ship year.
 * Incomplete never writes. Keys: ittYY-<suffix> from data-4x-go.
 *
 * kinds: query | checks | hops | wait | toggle
 */
(function (global) {
  "use strict";
  var ITT = global.ITT || (global.ITT = {});

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

  function keyFor(doc, suffix) {
    var year = yearOf(doc);
    var YX = ITT.YearExtras && ITT.YearExtras.forYear(year);
    if (YX) return YX.key(suffix);
    return (year ? "itt" + year.slice(2) : "itt") + "-" + suffix;
  }

  function say(st, msg, err) {
    if (st) {
      st.textContent = msg;
      try { st.style.color = err ? "#a00" : "#060"; } catch (eC) { /* */ }
    }
  }

  function blob(doc, extra) {
    var o = { multiStep: true, real: true, year: yearOf(doc), ts: Date.now() };
    var k;
    if (extra) for (k in extra) if (Object.prototype.hasOwnProperty.call(extra, k)) o[k] = extra[k];
    return o;
  }

  function bootOne(doc, btn) {
    if (!btn || btn.getAttribute("data-4x-bound") === "1") return;
    btn.setAttribute("data-4x-bound", "1");
    var root = btn.closest("[data-4x-panel]") || doc;
    var suffix = btn.getAttribute("data-4x-go") || "";
    if (!suffix) return;
    var kind = (root.getAttribute("data-4x-kind") || btn.getAttribute("data-4x-kind") || "query").toLowerCase();
    var min = parseInt(root.getAttribute("data-4x-min") || btn.getAttribute("data-4x-min") || "2", 10);
    if (isNaN(min) || min < 1) min = 2;
    var st = root.querySelector("[data-4x-status]");
    var k = keyFor(doc, suffix);
    var hops = {};
    var waited = false;
    var toggled = { off: false, on: false };

    function revealPanelNext() {
      var next = root.querySelector("[data-next-flow], [data-4x-next]");
      if (next) {
        try {
          next.removeAttribute("hidden");
          next.style.display = "";
        } catch (eN0) { /* */ }
      }
    }

    function paintResult(extra) {
      var well = root.querySelector("[data-4x-result]");
      if (!well) return;
      var bits = [];
      if (extra && extra.q) bits.push(extra.q);
      if (extra && extra.hops && extra.hops.length) bits.push(extra.hops.join(" · "));
      well.textContent = bits.length ? "Still here: " + bits.join(" · ") : "Saved. Reload keeps this dest.";
      well.removeAttribute("hidden");
      well.style.display = "";
    }

    try {
      var raw0 = localStorage.getItem(k);
      if (raw0) {
        var saved0 = JSON.parse(raw0);
        var field0 = root.querySelector("[data-4x-field]");
        if (field0 && saved0 && saved0.q) field0.value = saved0.q;
        say(st, "Still open · " + k);
        paintResult(saved0);
        revealPanelNext();
      }
    } catch (eL) { /* */ }

    var hopBtns = root.querySelectorAll("[data-4x-hop]");
    var hi;
    for (hi = 0; hi < hopBtns.length; hi++) {
      hopBtns[hi].addEventListener("click", function () {
        var id = this.getAttribute("data-4x-hop") || "";
        hops[id] = true;
        this.setAttribute("data-4x-on", "1");
        say(st, "Opened “" + id + "” · " + Object.keys(hops).length + " hop(s)");
      });
    }

    var waitBtn = root.querySelector("[data-4x-wait]");
    if (waitBtn) {
      waitBtn.addEventListener("click", function () {
        var ms = parseInt(waitBtn.getAttribute("data-4x-wait-ms") || "2000", 10);
        say(st, "Waiting (period theater)…");
        waitBtn.disabled = true;
        setTimeout(function () {
          waited = true;
          waitBtn.disabled = false;
          say(st, "Ready · now save");
        }, isNaN(ms) ? 2000 : ms);
      });
    }

    var togOff = root.querySelector('[data-4x-toggle="off"]');
    var togOn = root.querySelector('[data-4x-toggle="on"]');
    if (togOff) {
      togOff.addEventListener("click", function () {
        toggled.off = true;
        say(st, "Images off (1994 power-user). Turn them on to finish.");
      });
    }
    if (togOn) {
      togOn.addEventListener("click", function () {
        toggled.on = true;
        say(st, "Images on again. Save the ritual.");
      });
    }

    btn.addEventListener("click", function () {
      var extra = { kind: kind, flow: suffix };
      if (kind === "query") {
        var field = root.querySelector("[data-4x-field]");
        var v = field ? String(field.value || "").replace(/^\s+|\s+$/g, "") : "";
        if (v.length < min) {
          say(st, "Type at least " + min + " characters. Empty never writes.", true);
          return;
        }
        extra.q = v.slice(0, 80);
      } else if (kind === "checks") {
        var reqs = root.querySelectorAll("[data-4x-req]");
        var n = 0;
        var i;
        for (i = 0; i < reqs.length; i++) if (reqs[i].checked) n++;
        var need = reqs.length ? reqs.length : min;
        if (n < need) {
          say(st, "Tick every honesty box. Incomplete never writes.", true);
          return;
        }
        extra.checks = n;
      } else if (kind === "hops") {
        if (Object.keys(hops).length < min) {
          say(st, "Open " + min + " places first. Incomplete never writes.", true);
          return;
        }
        extra.hops = Object.keys(hops);
      } else if (kind === "wait") {
        if (!waited) {
          say(st, "Wait the period timer first. Skip never writes.", true);
          return;
        }
        extra.waited = true;
      } else if (kind === "toggle") {
        if (!toggled.off || !toggled.on) {
          say(st, "Turn images off, then on. Incomplete never writes.", true);
          return;
        }
        extra.toggled = true;
      } else {
        say(st, "Unknown leftover kind.", true);
        return;
      }

      var payload = blob(doc, extra);
      try {
        localStorage.setItem(k, JSON.stringify(payload));
      } catch (eS) { /* */ }
      say(st, "Done · " + k);
      paintResult(payload);
      revealPanelNext();
    });
  }

  function ensureCss(doc) {
    doc = doc || document;
    if (doc.getElementById("itt-4x-css")) return;
    var href = "/css/itt-4x.css";
    try {
      var path = location.pathname || "";
      var idx = path.indexOf("/years/");
      if (idx !== -1) href = path.slice(0, idx) + "/css/itt-4x.css";
    } catch (eH) { /* */ }
    var link = doc.createElement("link");
    link.id = "itt-4x-css";
    link.rel = "stylesheet";
    link.href = href;
    (doc.head || doc.documentElement).appendChild(link);
  }

  function boot(doc) {
    doc = doc || document;
    ensureCss(doc);
    var btns = doc.querySelectorAll("[data-4x-go]");
    var i;
    for (i = 0; i < btns.length; i++) bootOne(doc, btns[i]);
    try {
      if (doc.documentElement) doc.documentElement.setAttribute("data-4x-ready", "1");
    } catch (eR) { /* */ }
    try {
      if (ITT.foldLeftoverRails) ITT.foldLeftoverRails(doc);
    } catch (eF) { /* */ }
  }

  if (ITT.ImmersionFeatures && ITT.ImmersionFeatures.registerLocal) {
    ITT.ImmersionFeatures.registerLocal({
      id: "year-4x-flows",
      featureKey: "year4xFlows",
      boot: boot
    });
  } else if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", function () { boot(document); });
  } else {
    boot(document);
  }
})(typeof window !== "undefined" ? window : this);
