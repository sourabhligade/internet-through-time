/**
 * Battle-bus leftover — 2017 leftover cabinet (H13 minute).
 * Key: itt17-game-dropbus
 * Kind: seq. Incomplete never writes. Traps never write.
 */
(function () {
  "use strict";
  var MX = window.ITT && ITT.YearExtraMinute;
  if (!MX) return;
  MX.mount({
  "year": "2017",
  "id": "dropbus",
  "kind": "seq",
  "confirm": "bus",
  "queryLabel": "Query",
  "runLabel": "Search",
  "submitLabel": "Submit",
  "holdLabel": "Hold",
  "holdMs": 1600,
  "items": [
    {
      "id": "board",
      "label": "Board leftover bus",
      "order": 0
    },
    {
      "id": "drop",
      "label": "Drop leftover",
      "order": 1
    },
    {
      "id": "land",
      "label": "Land leftover",
      "order": 2
    },
    {
      "id": "vbuck",
      "label": "Buy V-Bucks (trap)",
      "role": "trap",
      "trap": "no shop"
    }
  ],
  "startStatus": "Board, drop, land. Shop is the trap.",
  "idleStatus": "Press Start. Incomplete never writes."
});
})();
