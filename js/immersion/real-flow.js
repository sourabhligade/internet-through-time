/**
 * REAL-flow system — universal no-mock gates for every year.
 *
 * Markup contracts (any year page):
 *  1) Multi-check literacy:
 *     <input type="checkbox" data-req> × N
 *     <button data-itt-real-save data-storage-key="suffix" data-min-req="2">
 *     Optional: data-requires="[data-req]" · data-require-field="#id" · data-tour-id="step"
 *     Optional status: [data-itt-action-status] or next sibling
 *
 *  2) Empty-block form (product modules still own most of these; this wires data-itt-real-form):
 *     <form data-itt-real-form data-storage-key="suffix" data-require-name="title">
 *     Required fields must be non-empty before write.
 *
 * Storage: year prefix via ITT.util.immersionStorageKey → ittYY-suffix
 * Incomplete actions NEVER write. Soft one-click success is forbidden.
 */
(function (global) {
  "use strict";
  var ITT = global.ITT || (global.ITT = {});

  function U() {
    return ITT.util || {};
  }

  function yearOf() {
    try {
      if (ITT._immersionYear) return String(ITT._immersionYear);
    } catch (e0) { /* */ }
    try {
      var dy =
        typeof document !== "undefined" &&
        document.documentElement &&
        document.documentElement.getAttribute("data-itt-year");
      if (dy) return String(dy);
    } catch (e1) { /* */ }
    try {
      var m = (location.pathname || "").match(/\/years\/(\d{4})\//);
      if (m) return m[1];
    } catch (e2) { /* */ }
    return "1995";
  }

  function prefix() {
    var y = yearOf();
    var fb = "itt" + String(y).slice(2);
    try {
      if (U().immersionStoragePrefix) return U().immersionStoragePrefix(fb);
    } catch (e) { /* */ }
    return fb;
  }

  function storageKey(suffix) {
    var fb = prefix();
    var s = String(suffix || "real-ack").replace(/^itt\d{0,2}-/, "");
    if (U().immersionStorageKey) return U().immersionStorageKey(s, fb);
    return fb + (fb.charAt(fb.length - 1) === "-" ? "" : "-") + s;
  }

  function feedback(msg, st, opts) {
    opts = opts || {};
    if (st) {
      try {
        st.textContent = msg;
        st.style.color = opts.error ? "#900" : "#060";
      } catch (e) { /* */ }
    }
    try {
      if (ITT._immersionApi && ITT._immersionApi.actionFeedback) {
        ITT._immersionApi.actionFeedback(msg, {
          flash: opts.flash !== false && !opts.error,
          status: st,
          ms: opts.ms != null ? opts.ms : 4000,
          kind: "real-flow"
        });
      }
    } catch (e2) { /* */ }
  }

  function saveJSON(k, v) {
    localStorage.setItem(k, JSON.stringify(v));
  }

  function countChecked(doc, sel) {
    var nodes = doc.querySelectorAll(sel);
    var n = 0;
    var i;
    for (i = 0; i < nodes.length; i++) {
      if (nodes[i].checked) n++;
    }
    return n;
  }

  function markUsed(stepId) {
    try {
      if (ITT._immersionApi && typeof ITT._immersionApi.markTourUsed === "function") {
        ITT._immersionApi.markTourUsed(stepId || undefined);
      }
    } catch (e) { /* */ }
  }

  function resolveStatus(doc, btn) {
    var sel = btn.getAttribute("data-status");
    if (sel) {
      var bySel = doc.querySelector(sel);
      if (bySel) return bySel;
    }
    var def = doc.querySelector("[data-itt-action-status], [data-itt-real-status]");
    if (def) return def;
    return btn.nextElementSibling;
  }

  /**
   * Wire every [data-itt-real-save] once.
   * Empty / incomplete → no write.
   */
  function bootRealSave(doc) {
    doc = doc || document;
    var btns = doc.querySelectorAll("[data-itt-real-save]");
    var b;
    for (b = 0; b < btns.length; b++) {
      (function (btn) {
        if (btn.getAttribute("data-itt-real-bound") === "1") return;
        btn.setAttribute("data-itt-real-bound", "1");
        btn.addEventListener("click", function (ev) {
          if (ev && ev.preventDefault) ev.preventDefault();
          var st = resolveStatus(doc, btn);
          var min = parseInt(
            btn.getAttribute("data-min-req") || btn.getAttribute("data-min-checks") || "2",
            10
          );
          if (isNaN(min) || min < 1) min = 2;
          var reqSel =
            btn.getAttribute("data-requires") || btn.getAttribute("data-req") || "[data-req]";
          var n = countChecked(doc, reqSel);
          if (n < min) {
            feedback(
              "REAL gate: complete at least " + min + " checks first (not a soft mock).",
              st,
              { error: true }
            );
            return;
          }
          var field = btn.getAttribute("data-require-field");
          var fieldVal = "";
          if (field) {
            var fe = doc.querySelector(field);
            fieldVal = fe && fe.value != null ? String(fe.value).replace(/^\s+|\s+$/g, "") : "";
            if (fieldVal.length < 2) {
              feedback("REAL gate: fill the required field first.", st, { error: true });
              return;
            }
          }
          var suffix = btn.getAttribute("data-storage-key") || "real-ack";
          var full = storageKey(suffix);
          var payload = {
            multiStep: true,
            real: true,
            checks: n,
            year: yearOf(),
            note: fieldVal || undefined,
            ts: Date.now()
          };
          saveJSON(full, payload);
          feedback("Saved REAL · " + full, st);
          markUsed(btn.getAttribute("data-tour-id") || undefined);
          try {
            btn.setAttribute("data-itt-real-done", "1");
          } catch (eD) { /* */ }
        });
      })(btns[b]);
    }
  }

  /**
   * Optional form gate: data-itt-real-form
   * Writes { fields: {name:value}, multiStep, real, year, ts }
   */
  function bootRealForms(doc) {
    doc = doc || document;
    var forms = doc.querySelectorAll("form[data-itt-real-form]");
    var i;
    for (i = 0; i < forms.length; i++) {
      (function (form) {
        if (form.getAttribute("data-itt-real-form-bound") === "1") return;
        form.setAttribute("data-itt-real-form-bound", "1");
        form.addEventListener("submit", function (ev) {
          ev.preventDefault();
          var st =
            form.querySelector("[data-itt-action-status], [data-itt-real-status]") ||
            doc.querySelector(form.getAttribute("data-status") || "[data-itt-action-status]");
          var requireName = form.getAttribute("data-require-name") || "";
          var names = requireName
            ? requireName.split(/[\s,]+/).filter(Boolean)
            : [];
          var fields = {};
          var ok = true;
          var j;
          if (names.length) {
            for (j = 0; j < names.length; j++) {
              var el =
                form.querySelector('[name="' + names[j] + '"]') ||
                form.querySelector("#" + names[j]);
              var v = el && el.value != null ? String(el.value).replace(/^\s+|\s+$/g, "") : "";
              if (v.length < 1) {
                ok = false;
                break;
              }
              fields[names[j]] = v;
            }
          } else {
            /* default: first text/textarea non-empty */
            var inputs = form.querySelectorAll("input[type='text'], input:not([type]), textarea");
            var any = false;
            for (j = 0; j < inputs.length; j++) {
              var nm = inputs[j].name || "field" + j;
              var vv = String(inputs[j].value || "").replace(/^\s+|\s+$/g, "");
              if (vv) {
                fields[nm] = vv;
                any = true;
              }
            }
            ok = any;
          }
          if (!ok) {
            feedback("REAL gate: required fields empty — nothing saved.", st, { error: true });
            return;
          }
          var suffix = form.getAttribute("data-storage-key") || "form-save";
          var full = storageKey(suffix);
          saveJSON(full, {
            multiStep: true,
            real: true,
            fields: fields,
            year: yearOf(),
            ts: Date.now()
          });
          feedback("Saved REAL · " + full, st);
          markUsed(form.getAttribute("data-tour-id") || undefined);
        });
      })(forms[i]);
    }
  }

  function bootAll(doc) {
    doc = doc || document;
    bootRealSave(doc);
    bootRealForms(doc);
    try {
      if (doc.documentElement) {
        doc.documentElement.setAttribute("data-itt-real-flow", "1");
        doc.documentElement.setAttribute("data-itt-real-year", yearOf());
      }
    } catch (e) { /* */ }
  }

  /* Public API for year-extras / tests */
  ITT.RealFlow = {
    boot: bootAll,
    bootRealSave: bootRealSave,
    bootRealForms: bootRealForms,
    storageKey: storageKey,
    yearOf: yearOf,
    prefix: prefix
  };

  var features = ITT.ImmersionFeatures || (ITT.ImmersionFeatures = []);
  if (typeof features.registerLocal === "function") {
    features.registerLocal({
      id: "realFlow",
      featureKey: "realFlow",
      boot: bootAll
    });
  } else {
    features.push({
      id: "realFlow",
      needs: function (cfg) {
        return !cfg.features || cfg.features.realFlow !== false;
      },
      init: function () {
        bootAll(document);
      }
    });
    if (document.readyState === "loading") {
      document.addEventListener("DOMContentLoaded", function () {
        bootAll(document);
      });
    } else {
      bootAll(document);
    }
  }
})(typeof window !== "undefined" ? window : this);
