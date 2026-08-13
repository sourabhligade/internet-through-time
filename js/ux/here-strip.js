/**
 * U4-S1 Ambient “you are here” under exhibit nav
 * U6-S1 Room quality chips when data-itt-room is set on <html> or body
 *
 * Remove: flags.hereStrip / roomChips = false
 */
(function (global) {
  "use strict";
  var ITT = global.ITT || (global.ITT = {});
  var UX = ITT.UX || (ITT.UX = {});

  var HERE_ID = "itt-ux-here-strip";
  var CHIP_ID = "itt-ux-room-chip";

  var CHIP_LABELS = {
    p0: "P0 multi-step",
    tour: "Tour stop",
    continuity: "Continuity archive",
    thin: "Thin residual",
    playable: "Playable",
    game: "Year game"
  };

  function yearOf() {
    try {
      if (ITT._immersionYear) return String(ITT._immersionYear);
    } catch (e0) { /* */ }
    try {
      var dy = document.documentElement && document.documentElement.getAttribute("data-itt-year");
      if (dy) return dy;
    } catch (e1) { /* */ }
    try {
      var m = (location.pathname || "").match(/\/years\/(\d{4})\//);
      if (m) return m[1];
    } catch (e2) { /* */ }
    return "";
  }

  function roomName() {
    try {
      var p = location.pathname || "";
      var m = p.match(/\/years\/\d{4}\/(.+)$/);
      var rel = m ? m[1] : p;
      rel = rel.replace(/\/index\.html$/, "/").replace(/\.html$/, "");
      if (rel.indexOf("pages/") === 0) return rel.slice(6) || "start";
      if (rel.indexOf("sites/") === 0) {
        var parts = rel.slice(6).split("/").filter(Boolean);
        return parts.slice(0, 2).join(" · ") || "site";
      }
      return rel || "page";
    } catch (e) {
      return "page";
    }
  }

  function tourHint(year) {
    try {
      var MP = ITT.MuseumProgress;
      if (!MP || typeof MP.currentStep !== "function") return "";
      var step = MP.currentStep();
      if (!step || String(step.year) !== String(year)) return "";
      var n = MP.getNight && MP.getNight();
      if (!n || !n.active) return "";
      var steps = (MP.TRAILS && n.trail && MP.TRAILS[n.trail] && MP.TRAILS[n.trail].steps) || [];
      var total = steps.length || 0;
      var idx = (n.step || 0) + 1;
      return " · Tour " + idx + "/" + total + " · " + (step.title || "");
    } catch (e) {
      return "";
    }
  }

  function mountHere(doc) {
    if (!UX.isOn || !UX.isOn("hereStrip")) return;
    doc = doc || document;
    /* Skip home — already crowded */
    try {
      if ((location.pathname || "").indexOf("/pages/home") !== -1) return;
    } catch (eH) { /* */ }
    UX.ensureCss && UX.ensureCss(doc);
    var existing = doc.getElementById(HERE_ID);
    if (existing && existing.parentNode) existing.parentNode.removeChild(existing);

    var year = yearOf();
    var room = roomName();
    var tour = tourHint(year);
    var el = doc.createElement("div");
    el.id = HERE_ID;
    el.className = "itt-ux-here-strip";
    el.setAttribute("role", "status");
    el.innerHTML =
      '<span class="itt-ux-here-label">You are here</span> ' +
      "<b>" +
      year +
      "</b> · " +
      room.replace(/</g, "&lt;") +
      (tour ? "<span class=\"itt-ux-here-tour\">" + tour.replace(/</g, "&lt;") + "</span>" : "");

    var nav = doc.getElementById("itt-exhibit-nav");
    if (nav && nav.parentNode) {
      if (nav.nextSibling) nav.parentNode.insertBefore(el, nav.nextSibling);
      else nav.parentNode.appendChild(el);
    } else {
      var slot = doc.getElementById("itt-nav-slot");
      if (slot && slot.parentNode) {
        if (slot.nextSibling) slot.parentNode.insertBefore(el, slot.nextSibling);
        else slot.parentNode.appendChild(el);
      } else if (doc.body) {
        doc.body.insertBefore(el, doc.body.firstChild);
      }
    }
  }

  function mountRoomChip(doc) {
    if (!UX.isOn || !UX.isOn("roomChips")) return;
    doc = doc || document;
    var kind =
      (doc.documentElement && doc.documentElement.getAttribute("data-itt-room")) ||
      (doc.body && doc.body.getAttribute("data-itt-room")) ||
      "";
    if (!kind) {
      /* auto-detect playable / game */
      try {
        var path = location.pathname || "";
        if (path.indexOf("/playable/game") !== -1) kind = "game";
        else if (path.indexOf("/playable/") !== -1) kind = "playable";
      } catch (e) { /* */ }
    }
    if (!kind || !CHIP_LABELS[kind]) return;
    if (doc.getElementById(CHIP_ID)) return;
    UX.ensureCss && UX.ensureCss(doc);
    var chip = doc.createElement("div");
    chip.id = CHIP_ID;
    chip.className = "itt-ux-room-chip itt-ux-room-" + kind;
    chip.textContent = CHIP_LABELS[kind];
    chip.title = "Room quality · museum label";
    (doc.body || doc.documentElement).appendChild(chip);
  }

  function boot(doc) {
    if (!UX.isOn || !UX.isOn()) return;
    doc = doc || document;
    mountHere(doc);
    mountRoomChip(doc);
  }

  UX.HereStrip = { mount: mountHere, boot: boot };
  UX.RoomChip = { mount: mountRoomChip };
})(typeof window !== "undefined" ? window : this);
