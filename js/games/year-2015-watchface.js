/**
 * Watch leftover — 2015 leftover cabinet (H13 minute).
 * Key: itt15-game-watchface
 * Kind: seq. Incomplete never writes. Traps never write.
 */
(function () {
  "use strict";
  var MX = window.ITT && ITT.YearExtraMinute;
  if (!MX) return;
  MX.mount({
  "year": "2015",
  "id": "watchface",
  "kind": "seq",
  "confirm": "watch",
  "queryLabel": "Query",
  "runLabel": "Search",
  "submitLabel": "Submit",
  "holdLabel": "Hold",
  "holdMs": 1600,
  "items": [
    {
      "id": "wake",
      "label": "Raise leftover wrist",
      "order": 0
    },
    {
      "id": "face",
      "label": "Pick leftover face",
      "order": 1
    },
    {
      "id": "lower",
      "label": "Lower wrist",
      "order": 2
    },
    {
      "id": "pay",
      "label": "Apple Pay January (trap)",
      "role": "trap",
      "trap": "Pay leftover later"
    }
  ],
  "startStatus": "Wake, face, lower. Pay is later.",
  "idleStatus": "Press Start. Incomplete never writes."
});
})();
