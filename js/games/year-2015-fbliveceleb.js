/**
 * FB Live leftover — 2015 leftover cabinet (H13 minute).
 * Key: itt15-game-fbliveceleb
 * Kind: seq. Incomplete never writes. Traps never write.
 */
(function () {
  "use strict";
  var MX = window.ITT && ITT.YearExtraMinute;
  if (!MX) return;
  MX.mount({
  "year": "2015",
  "id": "fbliveceleb",
  "kind": "seq",
  "confirm": "celeb",
  "queryLabel": "Query",
  "runLabel": "Search",
  "submitLabel": "Submit",
  "holdLabel": "Hold",
  "holdMs": 1600,
  "items": [
    {
      "id": "watch",
      "label": "Watch leftover stream",
      "order": 0
    },
    {
      "id": "heart",
      "label": "Tap a leftover heart",
      "order": 1
    },
    {
      "id": "leave",
      "label": "Leave",
      "order": 2
    },
    {
      "id": "go",
      "label": "Go LIVE yourself (trap)",
      "role": "trap",
      "trap": "stars only"
    }
  ],
  "startStatus": "Watch, heart, leave. You are not the celeb.",
  "idleStatus": "Press Start. Incomplete never writes."
});
})();
