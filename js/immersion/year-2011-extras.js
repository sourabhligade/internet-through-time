/**
 * 2011 leftover rooms. A finished save shows the room in the frame.
 * The leftover writer still owns the key. Empty and trap never paint.
 */
(function (global) {
  "use strict";
  var ITT = global.ITT || (global.ITT = {});

  function esc(s) {
    return String(s)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;");
  }

  function gatesOk(host, btn) {
    var reqs = host.querySelectorAll("[data-lo-req]");
    var i;
    for (i = 0; i < reqs.length; i++) if (!reqs[i].checked) return false;
    var picks = host.querySelectorAll("[data-lo-pick]");
    var need = btn.getAttribute("data-lo-need-pick") || "";
    var minPick = parseInt(btn.getAttribute("data-lo-min-pick") || "0", 10);
    if (isNaN(minPick)) minPick = 0;
    var pressed = 0;
    var needOn = false;
    for (i = 0; i < picks.length; i++) {
      var on = picks[i].getAttribute("aria-pressed") === "true" || picks[i].getAttribute("data-lo-on") === "1";
      if (!on) continue;
      pressed++;
      if (need && picks[i].getAttribute("data-lo-pick") === need) needOn = true;
    }
    if (picks.length && need && !needOn) return false;
    if (picks.length && minPick && pressed < minPick) return false;
    if (picks.length && !need && !minPick && pressed < 1) return false;
    return true;
  }

  function watchVerb(text) {
    var s = String(text || "").toLowerCase().replace(/^\s+|\s+$/g, "");
    return s === "watch" || s === "play" || s === "watch leftover" || s === "play leftover";
  }

  function boot(doc) {
    doc.addEventListener("click", function (ev) {
      var t = ev.target;
      var btn = t && t.closest ? t.closest("[data-lo-save]") : null;
      if (!btn) return;
      var root = doc.documentElement;
      if (!root || root.hasAttribute("data-official-key")) return;
      var year = root.getAttribute("data-itt-year") || "";
      if (year !== "2010" && year !== "2011" && year !== "2012" && year !== "2013" && year !== "2014" && year !== "2016") return;
      var host = btn.closest("[data-lo-panel]");
      if (!host || host.hasAttribute("data-y22-kind") || host.hasAttribute("data-itt-gold-lx")) return;
      var out = host.querySelector("[data-era-result]");
      if (!out) return;
      if (!gatesOk(host, btn)) return;
      var field = host.querySelector("[data-lo-field]");
      var q = field ? String(field.value || "").replace(/^\s+|\s+$/g, "") : "";
      if (field && q.length < 2) {
        out.textContent = "";
        return;
      }
      var h1 = doc.querySelector("h1");
      var title = h1 ? String(h1.textContent || "").replace(/^\s+|\s+$/g, "") : "";
      if (!title) title = String(btn.textContent || "").replace(/^\s+|\s+$/g, "");
      var keep = host.querySelector('[data-lo-pick="keep"]');
      var stage = watchVerb(keep && keep.textContent) || watchVerb(btn.textContent)
        ? '<div class="era-stage">Now playing</div>'
        : "";
      out.innerHTML = '<div data-era-ok="read">' + stage + "<p>" + esc(title) + "</p><p>" + esc(q) + "</p></div>";
    }, true);
  }

  if (ITT.ImmersionFeatures && ITT.ImmersionFeatures.registerLocal) {
    ITT.ImmersionFeatures.registerLocal({
      id: "year2011rooms",
      featureKey: "oneThingMachines",
      boot: boot
    });
  } else if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", function () { boot(document); });
  } else {
    boot(document);
  }
})(typeof window !== "undefined" ? window : this);
