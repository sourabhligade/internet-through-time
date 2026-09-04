/**
 * 5× leftover pack — REAL literacy loops on existing rooms.
 * Incomplete (missing checks / short field) never writes.
 * Pages declare [data-5x-loop][data-5x-suffix] + [data-5x-req] + [data-5x-save].
 */
(function (global) {
  "use strict";
  var ITT = global.ITT || (global.ITT = {});

  function yearOf(el) {
    var y =
      (el && el.getAttribute && el.getAttribute("data-5x-year")) ||
      (ITT._immersionYear && String(ITT._immersionYear)) ||
      (document.documentElement && document.documentElement.getAttribute("data-itt-year")) ||
      "";
    return /^\d{4}$/.test(y) ? y : "";
  }

  function fallbackBootChecks(panel, spec, year) {
    var btn = panel.querySelector(spec.save);
    if (!btn) return;
    var st = panel.querySelector(spec.status);
    function keyOf() {
      return "itt" + String(year).slice(2) + "-" + spec.suffix;
    }
    function write() {
      var i;
      for (i = 0; i < spec.checks.length; i++) {
        var el = panel.querySelector(spec.checks[i]);
        if (!el || !el.checked) {
          if (st) {
            st.textContent = spec.err || "Tick every 5× check first. Incomplete never writes.";
            st.style.color = "#a00";
          }
          return false;
        }
      }
      var blob = {
        multiStep: true,
        real: true,
        year: String(year),
        ts: Date.now(),
        pack: "5x",
        flow: spec.suffix
      };
      try {
        localStorage.setItem(keyOf(), JSON.stringify(blob));
      } catch (e) {
        return false;
      }
      if (st) {
        st.textContent = (spec.okMsg || "5× REAL") + " · " + keyOf();
        st.style.color = "#060";
      }
      return true;
    }
    btn.addEventListener("click", write);
  }

  function bootPanel(panel) {
    if (!panel || panel.getAttribute("data-5x-booted") === "1") return;
    var year = yearOf(panel);
    if (!year) return;
    var YX = ITT.YearExtras ? ITT.YearExtras.forYear(year) : null;
    var suffix = panel.getAttribute("data-5x-suffix") || "";
    if (!suffix) return;
    var reqs = panel.querySelectorAll("[data-5x-req]");
    var checks = [];
    var i;
    for (i = 0; i < reqs.length; i++) {
      var token = reqs[i].getAttribute("data-5x-req") || String(i + 1);
      if (!reqs[i].getAttribute("data-5x-req")) reqs[i].setAttribute("data-5x-req", token);
      checks.push('[data-5x-req="' + token + '"]');
    }
    if (!checks.length) return;
    var spec = {
      save: "[data-5x-save]",
      status: "[data-5x-status]",
      checks: checks,
      suffix: suffix,
      extra: { pack: "5x", flow: suffix },
      err: "Tick every 5× check first. Incomplete never writes.",
      okMsg: "5× REAL"
    };
    var q = panel.querySelector("[data-5x-q]");
    if (q) {
      spec.minLen = {
        sel: "[data-5x-q]",
        n: parseInt(panel.getAttribute("data-5x-min") || "2", 10) || 2,
        err: "Type at least " + (panel.getAttribute("data-5x-min") || "2") + " characters."
      };
    }
    panel.setAttribute("data-5x-booted", "1");
    if (YX && typeof YX.bootChecks === "function") {
      YX.bootChecks(panel, spec);
    } else {
      fallbackBootChecks(panel, spec, year);
    }
    var traps = panel.querySelectorAll("[data-5x-trap]");
    var stEl = panel.querySelector("[data-5x-status]");
    var t;
    for (t = 0; t < traps.length; t++) {
      if (traps[t].getAttribute("data-5x-trap-bound") === "1") continue;
      traps[t].setAttribute("data-5x-trap-bound", "1");
      traps[t].addEventListener("click", function () {
        if (stEl) {
          stEl.textContent = "Trap. That click never writes.";
          stEl.style.color = "#a00";
        }
      });
    }
    revealPanelNext(panel, year, suffix);
    var saveBtn = panel.querySelector("[data-5x-save]");
    if (saveBtn) {
      saveBtn.addEventListener("click", function () {
        revealPanelNext(panel, year, suffix);
      });
    }
  }

  function revealPanelNext(panel, year, suffix) {
    if (!panel) return;
    var yy = year ? String(year).slice(2) : "";
    var key = yy && suffix ? "itt" + yy + "-" + suffix : "";
    var hit = false;
    if (key) {
      try {
        hit = !!localStorage.getItem(key);
      } catch (e) {
        hit = false;
      }
    }
    if (!hit) return;
    var nodes = panel.querySelectorAll("[data-5x-next], [data-next-flow]");
    var i;
    for (i = 0; i < nodes.length; i++) {
      try {
        nodes[i].removeAttribute("hidden");
        nodes[i].style.display = "";
      } catch (eN) {
        /* */
      }
    }
  }

  function boot(doc) {
    doc = doc || document;
    var panels = doc.querySelectorAll("[data-5x-loop]");
    var i;
    for (i = 0; i < panels.length; i++) bootPanel(panels[i]);
    if (ITT.YearExtras && ITT.YearExtras.bootRevealNext) {
      ITT.YearExtras.bootRevealNext(doc);
    }
  }

  ITT.bootFiveX = boot;

  if (typeof ITT.ImmersionFeatures !== "undefined" && ITT.ImmersionFeatures.registerLocal) {
    ITT.ImmersionFeatures.registerLocal({
      id: "five-x-pack",
      featureKey: "fiveX",
      boot: boot
    });
  } else {
    var feats = ITT.ImmersionFeatures || (ITT.ImmersionFeatures = []);
    feats.push({
      id: "five-x-pack",
      needs: function () {
        return true;
      },
      boot: boot
    });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", function () {
      boot(document);
    });
  } else {
    boot(document);
  }
})(typeof window !== "undefined" ? window : this);
