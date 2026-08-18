/**
 * Circles add — 2011 leftover extra (minute).
 * Key: itt11-game-circladd
 * Kind: pick. Incomplete never writes. Traps never write.
 */
(function () {
  "use strict";
  var MX = window.ITT && ITT.YearExtraMinute;
  if (!MX) return;
  MX.mount({
  "year": "2011",
  "id": "circladd",
  "kind": "pick",
  "queryLabel": "Query",
  "runLabel": "Search",
  "submitLabel": "Submit",
  "holdLabel": "Hold",
  "holdMs": 1600,
  "items": [
    {
      "id": "c1",
      "label": "Add \u00b7 Friends"
    },
    {
      "id": "c2",
      "label": "Add \u00b7 Family"
    },
    {
      "id": "c3",
      "label": "Add \u00b7 Acquaintances"
    },
    {
      "id": "all",
      "label": "Add everyone (overshare)",
      "role": "trap",
      "trap": "Everyone"
    }
  ],
  "startStatus": "Three circles. Everyone is the trap.",
  "idleStatus": "Press Start. Incomplete never writes."
});
})();
