/**
 * Maps drag — 2005 leftover extra (minute).
 * Key: itt05-game-mapdrag
 */
(function () {
  "use strict";
  var MX = window.ITT && ITT.YearExtraMinute;
  if (!MX) return;
  MX.mount({
    year: "2005",
    id: "mapdrag",
    kind: "seq",
    confirm: "drag",
    items: [
      { id: "pan", label: "Pan the 8 Feb map", order: 0 },
      { id: "zoom", label: "Zoom +/−", order: 1 },
      { id: "drag", label: "Drag — no wait", order: 2 },
      { id: "sv", label: "Street View (2007)", role: "trap", trap: "2007" }
    ],
    idleStatus: "Press Start. Incomplete never writes."
  });
})();
