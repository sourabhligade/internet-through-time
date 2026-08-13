/**
 * Archive residual placard — non-breaking.
 * Only runs when an element has data-itt-primary-year AND shell year is newer.
 * Does not rewrite history text; only adds a caption once.
 */
(function (global) {
  "use strict";
  var ITT = global.ITT || (global.ITT = {});

  function shellYear() {
    try {
      var y =
        (ITT._immersionYear && String(ITT._immersionYear)) ||
        (document.documentElement && document.documentElement.getAttribute("data-itt-year")) ||
        (document.body && document.body.getAttribute("data-itt-year")) ||
        "";
      if (/^\d{4}$/.test(y)) return parseInt(y, 10);
    } catch (e) {
      /* */
    }
    return 0;
  }

  function injectOne(el, primary, shell) {
    if (!el || el.getAttribute("data-itt-residual-done") === "1") return;
    if (el.querySelector && el.querySelector(".itt-residual-chip")) {
      el.setAttribute("data-itt-residual-done", "1");
      return;
    }
    var chip = document.createElement("div");
    chip.className = "itt-residual-chip";
    chip.setAttribute("role", "note");
    chip.style.cssText =
      "margin:8px 0;padding:8px 10px;background:#fff8e6;border:1px solid #c90;" +
      "font-size:11px;font-family:Arial,Helvetica,sans-serif;line-height:1.45;color:#333";
    chip.innerHTML =
      "<b>Archive residual (not new in " +
      shell +
      "):</b> This room’s primary history is <b>" +
      primary +
      "</b>. " +
      "It is shown inside the " +
      shell +
      " museum shell — do not read it as a " +
      shell +
      " invention.";
    // Prefer insert after nav slot if we are decorating body/main table
    var nav = el.querySelector ? el.querySelector("#itt-nav-slot, .itt-nav-slot") : null;
    if (nav && nav.parentNode) {
      if (nav.nextSibling) nav.parentNode.insertBefore(chip, nav.nextSibling);
      else nav.parentNode.appendChild(chip);
    } else if (el.firstChild) {
      el.insertBefore(chip, el.firstChild);
    } else {
      el.appendChild(chip);
    }
    el.setAttribute("data-itt-residual-done", "1");
  }

  function boot(doc) {
    doc = doc || document;
    var shell = shellYear();
    if (!shell) return;
    var nodes = doc.querySelectorAll("[data-itt-primary-year]");
    var i;
    for (i = 0; i < nodes.length; i++) {
      var el = nodes[i];
      var raw = el.getAttribute("data-itt-primary-year") || "";
      var primary = parseInt(raw, 10);
      if (!primary || primary >= shell) continue;
      // decorate nearest content root: element itself if block-ish, else body
      injectOne(el, primary, shell);
    }
  }

  if (ITT.ImmersionFeatures && typeof ITT.ImmersionFeatures.registerLocal === "function") {
    ITT.ImmersionFeatures.registerLocal({
      id: "residualPlacard",
      featureKey: "residualPlacard",
      boot: boot
    });
  } else {
    var features = ITT.ImmersionFeatures || (ITT.ImmersionFeatures = []);
    features.push({
      id: "residualPlacard",
      needs: function (cfg) {
        return !cfg.features || cfg.features.residualPlacard !== false;
      },
      init: function () {
        boot(document);
      }
    });
    if (document.readyState === "loading") {
      document.addEventListener("DOMContentLoaded", function () {
        boot(document);
      });
    } else {
      boot(document);
    }
  }
})(typeof window !== "undefined" ? window : this);
