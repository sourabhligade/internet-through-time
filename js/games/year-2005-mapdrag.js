/**
 * Maps drag — 2005 leftover extra (minute).
 * Key: itt05-game-mapdrag
 * Kind: seq. Incomplete never writes. Traps never write.
 */
(function () {
  "use strict";
  var MX = window.ITT && ITT.YearExtraMinute;
  if (!MX) return;
  MX.mount({
  "year": "2005",
  "id": "mapdrag",
  "kind": "seq",
  "confirm": "maps",
  "queryLabel": "Query",
  "runLabel": "Search",
  "submitLabel": "Submit",
  "holdLabel": "Hold",
  "holdMs": 1600,
  "items": [
    {
      "id": "grab",
      "label": "Grab tile (SF downtown)",
      "order": 0
    },
    {
      "id": "drag",
      "label": "Drag \u2014 tiles slide (theater)",
      "order": 1
    },
    {
      "id": "zoom",
      "label": "Zoom + (still tiles, not satellite yet)",
      "order": 2
    },
    {
      "id": "live",
      "label": "Load live tiles (blocked)",
      "role": "trap",
      "trap": "No live tiles"
    }
  ],
  "startStatus": "Grab, drag, zoom. No live tiles.",
  "idleStatus": "Press Start. Incomplete never writes."
});
})();
