/**
 * Google Chrome — download / prefer REAL (Windows-first)
 * Keys: ittYY-chrome via immersionStorageKey
 *
 * REAL rules:
 *  - Prefer never writes without a prior download on this key.
 *  - If the page has [data-chrome-check] / [data-req] literacy boxes, download
 *    requires them first (incomplete writes nothing).
 *  - Legacy pages without literacy boxes still allow download (one step) so
 *    earlier-year rooms keep working; prefer remains gated on download.
 */
(function (global) {
  "use strict";
  var ITT = global.ITT || (global.ITT = {});

  function U() {
    return ITT.util || {};
  }
  function storageKey() {
    return U().immersionStorageKey
      ? U().immersionStorageKey("chrome", "itt08")
      : "itt08-chrome";
  }
  function load() {
    try {
      return JSON.parse(localStorage.getItem(storageKey()) || "null");
    } catch (e) {
      return null;
    }
  }
  function save(obj) {
    localStorage.setItem(storageKey(), JSON.stringify(obj));
  }
  function countChecked(doc, sel) {
    var nodes = doc.querySelectorAll(sel);
    var n = 0;
    var i;
    for (i = 0; i < nodes.length; i++) if (nodes[i].checked) n++;
    return n;
  }
  function feedback(msg, st, opts) {
    opts = opts || {};
    if (st) {
      st.textContent = msg;
      try {
        st.style.color = opts.error ? "#a00" : "#060";
      } catch (eC) {
        /* */
      }
    }
    if (ITT._immersionApi && ITT._immersionApi.actionFeedback) {
      ITT._immersionApi.actionFeedback(msg, {
        doc: document,
        status: st,
        kind: opts.kind || "chrome",
        flash: !opts.error
      });
    }
  }
  function boot(doc) {
    doc = doc || document;
    if (!doc.querySelector("[data-chrome-download], [data-chrome-status], [data-chrome-prefer]")) return;
    var st = doc.querySelector("[data-chrome-status]");
    var cur = load();
    if (st && cur) {
      st.textContent =
        (cur.downloaded ? "Downloaded · " : "") +
        (cur.preferred ? "preferred browser · " : "") +
        storageKey();
    }
    var dl = doc.querySelector("[data-chrome-download]");
    if (dl && dl.getAttribute("data-bound") !== "1") {
      dl.setAttribute("data-bound", "1");
      dl.addEventListener("click", function (ev) {
        ev.preventDefault();
        var litNodes = doc.querySelectorAll("[data-chrome-check], [data-req]");
        if (litNodes.length) {
          var min = parseInt(dl.getAttribute("data-min-checks") || "2", 10);
          if (isNaN(min) || min < 1) min = 2;
          min = Math.min(min, litNodes.length);
          var n = countChecked(doc, "[data-chrome-check], [data-req]");
          if (n < min) {
            feedback(
              "REAL gate: check " + min + " literacy box(es) before download (not a soft mock).",
              st,
              { error: true, kind: "chrome-dl" }
            );
            return;
          }
        } else {
          /* No literacy markup: two-step arm (first click confirms, second writes) */
          if (dl.getAttribute("data-chrome-armed") !== "1") {
            dl.setAttribute("data-chrome-armed", "1");
            feedback(
              "Confirm: no real installer — click Download again to save (REAL two-step).",
              st,
              { error: true, kind: "chrome-dl" }
            );
            return;
          }
        }
        var o = load() || {};
        o.downloaded = true;
        o.multiStep = true;
        o.real = true;
        o.ts = Date.now();
        o.platform = "Windows";
        save(o);
        var yLabel = "";
        try {
          yLabel =
            String(ITT._immersionYear || "") ||
            (doc.documentElement && doc.documentElement.getAttribute("data-itt-year")) ||
            "";
        } catch (eY) {
          /* */
        }
        var era =
          yLabel === "2008" || yLabel === "2009"
            ? "Windows beta/1.0 class"
            : yLabel
              ? "stable auto-update · " + yLabel
              : "download";
        feedback("Download started · " + era + " · " + storageKey(), st, { kind: "chrome-dl" });
      });
    }
    var pref = doc.querySelector("[data-chrome-prefer]");
    if (pref && pref.getAttribute("data-bound") !== "1") {
      pref.setAttribute("data-bound", "1");
      pref.addEventListener("click", function (ev) {
        ev.preventDefault();
        var o = load() || {};
        if (!o.downloaded) {
          feedback("REAL gate: download Chrome first, then set preferred.", st, {
            error: true,
            kind: "chrome-pref"
          });
          return;
        }
        o.preferred = true;
        o.multiStep = true;
        o.real = true;
        o.ts = Date.now();
        save(o);
        feedback(
          "Set as preferred (local only · museum shell still IE) · " + storageKey(),
          st,
          { kind: "chrome-pref" }
        );
      });
    }
  }
  if (ITT.ImmersionFeatures && ITT.ImmersionFeatures.registerLocal) {
    ITT.ImmersionFeatures.registerLocal({ id: "chromeBrowser", boot: boot });
  } else {
    if (document.readyState === "loading") {
      document.addEventListener("DOMContentLoaded", function () {
        boot(document);
      });
    } else {
      boot(document);
    }
  }
})(typeof window !== "undefined" ? window : this);
