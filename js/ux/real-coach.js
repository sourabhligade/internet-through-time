/**
 * U2 — REAL incomplete coach helpers
 *
 * Used by real-flow.js when ITT.UX.isOn("realCoach").
 * Pulse missing [data-req] checkboxes; era copy for messages.
 *
 * Remove: flags.realCoach = false OR stop loading this file
 *          (real-flow falls back to plain status text).
 */
(function (global) {
  "use strict";
  var ITT = global.ITT || (global.ITT = {});
  var UX = ITT.UX || (ITT.UX = {});

  function pulseMissing(doc, reqSel) {
    doc = doc || document;
    reqSel = reqSel || "[data-req]";
    var nodes = doc.querySelectorAll(reqSel);
    var first = null;
    var i;
    for (i = 0; i < nodes.length; i++) {
      if (!nodes[i].checked) {
        first = nodes[i];
        break;
      }
    }
    if (!first) return null;
    try {
      var label = first.closest ? first.closest("label") : first.parentNode;
      var target = label || first;
      target.classList.add("itt-ux-need-attention");
      window.setTimeout(function () {
        try {
          target.classList.remove("itt-ux-need-attention");
        } catch (e) { /* */ }
      }, 2200);
      try {
        if (first.scrollIntoView) first.scrollIntoView({ block: "nearest", behavior: "smooth" });
      } catch (e2) {
        try {
          first.scrollIntoView(true);
        } catch (e3) { /* */ }
      }
    } catch (e) { /* */ }
    return first;
  }

  function messageIncomplete(year, have, min) {
    if (UX.Copy && UX.Copy.incomplete) return UX.Copy.incomplete(year, have, min);
    return "Need " + min + " checks first (have " + have + "). Nothing saved.";
  }

  function messageField(year) {
    if (UX.Copy && UX.Copy.incompleteField) return UX.Copy.incompleteField(year);
    return "Fill the required field first.";
  }

  function messageSuccess(year, key) {
    if (UX.Copy && UX.Copy.success) return UX.Copy.success(year, key);
    return "Saved · " + key;
  }

  UX.RealCoach = {
    pulseMissing: pulseMissing,
    messageIncomplete: messageIncomplete,
    messageField: messageField,
    messageSuccess: messageSuccess
  };
})(typeof window !== "undefined" ? window : this);
