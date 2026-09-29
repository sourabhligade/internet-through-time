/**
 * Local debug ring. No network.
 * Arm with ?debug=1 (sticks for the tab). Disarm with ?debug=0.
 * Ring: sessionStorage itt-debug-ring, last 40 rows.
 */
(function (global) {
  "use strict";
  if (global.ITT && global.ITT.debug && global.ITT.debug.record) return;
  var ITT = global.ITT || (global.ITT = {});
  var FLAG = "itt-debug";
  var RING = "itt-debug-ring";
  var CAP = 40;

  function enabled() {
    try {
      return sessionStorage.getItem(FLAG) === "1";
    } catch (e) {
      return false;
    }
  }

  function armFromQuery() {
    var search = "";
    var armedNow = false;
    try {
      search = String(location.search || "");
    } catch (eS) {
      search = "";
    }
    try {
      if (/(?:\?|&)debug=1\b/.test(search)) {
        sessionStorage.setItem(FLAG, "1");
        armedNow = true;
      }
      if (/(?:\?|&)debug=0\b/.test(search)) {
        sessionStorage.removeItem(FLAG);
        sessionStorage.removeItem(RING);
        armedNow = false;
      }
    } catch (eA) {
      /* private mode: ring stays off */
      armedNow = false;
    }
    return armedNow;
  }

  function yearFromLocation() {
    try {
      var m = String(location.pathname || "").match(/\/years\/(\d{4})\b/);
      if (m) return m[1];
      var hm = String(location.hash || "").match(/\/year\/(\d{4})\b/);
      return hm ? hm[1] : "";
    } catch (eY) {
      return "";
    }
  }

  function record(ev) {
    ev = ev || {};
    if (!enabled()) return;
    var row = {
      t: Date.now(),
      year: ev.year || yearFromLocation(),
      href: "",
      key: ev.key || "",
      feature: ev.feature || "",
      error: ev.error || "",
      note: ev.note || ""
    };
    try {
      row.href = (location.pathname || "") + (location.search || "") + (location.hash || "");
    } catch (eH) {
      row.href = "";
    }
    try {
      var list = JSON.parse(sessionStorage.getItem(RING) || "[]");
      if (!Array.isArray(list)) list = [];
      list.push(row);
      if (list.length > CAP) list = list.slice(list.length - CAP);
      sessionStorage.setItem(RING, JSON.stringify(list));
    } catch (eR) {
      /* ring is best-effort */
    }
    try {
      console.warn("ITT debug", row);
    } catch (eC) {
      /* */
    }
  }

  var armedNow = armFromQuery();
  ITT.debug = { enabled: enabled, record: record };
  if (armedNow) record({ feature: "debug-ring", note: "armed" });
  ITT.SAVE_BLOCKED = "This browser blocked the save.";
})(typeof window !== "undefined" ? window : this);
