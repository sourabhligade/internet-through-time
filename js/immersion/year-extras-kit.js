/**
 * Shared year-extras kit — storage, feedback, literacy gates.
 * Year files own product boots only. Load before year-*-extras.js.
 *
 *   var YX = ITT.YearExtras.forYear("2019");
 *   YX.key("disneyplus") → itt19-disneyplus
 */
(function (global) {
  "use strict";
  var ITT = global.ITT || (global.ITT = {});

  function util() {
    return ITT.util || {};
  }

  function forYear(fallbackYear) {
    fallbackYear = String(fallbackYear || "");
    var fallbackPrefix = /^\d{4}$/.test(fallbackYear) ? "itt" + fallbackYear.slice(2) : "itt";

    function prefix() {
      try {
        var y =
          (ITT._immersionYear && String(ITT._immersionYear)) ||
          (document.documentElement && document.documentElement.getAttribute("data-itt-year")) ||
          fallbackYear;
        if (/^\d{4}$/.test(y)) return "itt" + y.slice(2);
      } catch (e) {
        /* */
      }
      return fallbackPrefix;
    }

    function key(suffix) {
      var fb = prefix();
      return util().immersionStorageKey ? util().immersionStorageKey(suffix, fb) : fb + "-" + suffix;
    }

    function feedback(msg, st, opts) {
      opts = opts || {};
      if (st) {
        try {
          st.textContent = msg;
          st.style.color = opts.error ? "#a00" : "#060";
        } catch (eC) {
          /* */
        }
      }
      try {
        if (ITT._immersionApi && ITT._immersionApi.actionFeedback) {
          ITT._immersionApi.actionFeedback(msg, { flash: !opts.error, status: st, ms: opts.ms || 3200 });
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
        if (!r) return fb === undefined ? null : fb;
        return JSON.parse(r);
      } catch (e) {
        return fb === undefined ? null : fb;
      }
    }

    function markUsed(stepId) {
      try {
        if (ITT._immersionApi && ITT._immersionApi.markTourUsed) {
          ITT._immersionApi.markTourUsed(stepId || undefined);
        }
      } catch (e) {
        /* */
      }
    }

    function showNext(doc) {
      doc = doc || document;
      revealNextFlow(doc);
    }

    /** Dest-fill help/faq/legal pages — skip product bootAll (2018 lag). */
    function isFillerPage(doc) {
      return ITT.YearExtras.isFillerPage(doc);
    }

    function checked(doc, sel) {
      var el = doc.querySelector(sel);
      return !!(el && el.checked);
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

    /** val(el) or val(doc, sel) */
    function val(a, b) {
      var el = a;
      if (b != null && a && a.querySelector) el = a.querySelector(b);
      return el ? String(el.value || "").trim() : "";
    }

    /**
     * Literacy save: all checks must be on, then write REAL blob.
     * Copies extra so callers' object literals are not mutated.
     *
     * Positional: bootChecks(doc, saveSel, statusSel, checks, suffix, extra)
     * Spec:       bootChecks(doc, { save, status, checks, suffix, extra, err, okMsg, minLen })
     */
    function bootChecks(doc, saveSel, statusSel, checks, suffix, extra) {
      doc = doc || document;
      var err = "Tick every check first.";
      var okMsg = "Saved";
      var minLen = null;
      if (saveSel && typeof saveSel === "object" && saveSel.save) {
        extra = saveSel.extra;
        suffix = saveSel.suffix;
        checks = saveSel.checks;
        statusSel = saveSel.status;
        if (saveSel.err) err = saveSel.err;
        if (saveSel.okMsg) okMsg = saveSel.okMsg;
        if (saveSel.minLen) minLen = saveSel.minLen;
        saveSel = saveSel.save;
      }
      var btn = doc.querySelector(saveSel);
      if (!btn) return;
      var st = doc.querySelector(statusSel);
      var prev = loadJSON(key(suffix), null);
      if (prev && st) {
        feedback(okMsg + " · " + key(suffix), st);
        showNext(doc);
      }
      btn.addEventListener("click", function () {
        var i;
        for (i = 0; i < checks.length; i++) {
          if (!checked(doc, checks[i])) {
            feedback(err, st, { error: true });
            return;
          }
        }
        var title = "";
        if (minLen) {
          title = val(doc, minLen.sel);
          if (title.length < minLen.n) {
            feedback(minLen.err, st, { error: true });
            return;
          }
        }
        var blob = { multiStep: true, real: true, year: fallbackYear, ts: Date.now() };
        var src = extra || {};
        var k;
        for (k in src) {
          if (Object.prototype.hasOwnProperty.call(src, k)) blob[k] = src[k];
        }
        blob.multiStep = true;
        blob.real = true;
        blob.year = fallbackYear;
        blob.ts = Date.now();
        if (minLen) blob.title = title;
        saveJSON(key(suffix), blob);
        feedback(okMsg + " · " + key(suffix), st);
        markUsed();
        showNext(doc);
      });
    }

    function register(id, featureKey, boot) {
      var features = ITT.ImmersionFeatures || (ITT.ImmersionFeatures = []);
      if (typeof features.registerLocal === "function") {
        features.registerLocal({ id: id, featureKey: featureKey, boot: boot });
      } else {
        features.push({
          id: id,
          needs: function (cfg) {
            return !cfg.features || cfg.features[featureKey] !== false;
          },
          boot: boot
        });
      }
    }

    return {
      prefix: prefix,
      key: key,
      feedback: feedback,
      saveJSON: saveJSON,
      loadJSON: loadJSON,
      markUsed: markUsed,
      showNext: showNext,
      checked: checked,
      countChecked: countChecked,
      val: val,
      bootChecks: bootChecks,
      register: register,
      isFillerPage: isFillerPage,
      year: fallbackYear
    };
  }

  function isFillerPath(doc) {
    try {
      var win = (doc && doc.defaultView) || (typeof window !== "undefined" ? window : null);
      var p = (win && win.location && win.location.pathname) || "";
      return /\/(help|faq|legal|press|privacy|terms|support|blog|news|notes|tips|status)\.html$/.test(p);
    } catch (e) {
      return false;
    }
  }

  function revealNextFlow(doc) {
    doc = doc || document;
    var els = doc.querySelectorAll("[data-next-flow]");
    var i;
    for (i = 0; i < els.length; i++) {
      try {
        els[i].removeAttribute("hidden");
        els[i].style.display = "";
      } catch (e) {
        /* */
      }
    }
  }

  function bootRevealNext(doc) {
    doc = doc || document;
    var els = doc.querySelectorAll("[data-next-flow]");
    var i;
    var j;
    var keys;
    var hit;
    for (i = 0; i < els.length; i++) {
      keys = String(els[i].getAttribute("data-next-when-key") || "")
        .split(/[\s,]+/)
        .filter(Boolean);
      if (!keys.length) continue;
      hit = false;
      for (j = 0; j < keys.length; j++) {
        try {
          if (localStorage.getItem(keys[j])) {
            hit = true;
            break;
          }
        } catch (eK) {
          /* */
        }
      }
      if (hit) {
        try {
          els[i].removeAttribute("hidden");
          els[i].style.display = "";
        } catch (eS) {
          /* */
        }
      }
    }
  }

  ITT.revealNextFlow = revealNextFlow;
  ITT.bootRevealNext = bootRevealNext;
  ITT.YearExtras = {
    forYear: forYear,
    revealNextFlow: revealNextFlow,
    bootRevealNext: bootRevealNext,
    isFillerPage: isFillerPath
  };

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", function () {
      bootRevealNext(document);
    });
  } else {
    bootRevealNext(document);
  }
})(typeof window !== "undefined" ? window : this);
