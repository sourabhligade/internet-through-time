/**
 * FYP tap — 2018 leftover extra (minute).
 * Key: itt18-game-fyptap
 * Kind: seq. Incomplete never writes. Traps never write.
 */
(function () {
  "use strict";
  var MX = window.ITT && ITT.YearExtraMinute;
  if (!MX) return;
  MX.mount({
  "year": "2018",
  "id": "fyptap",
  "kind": "seq",
  "confirm": "fyp",
  "queryLabel": "Query",
  "runLabel": "Search",
  "submitLabel": "Submit",
  "holdLabel": "Hold",
  "holdMs": 1600,
  "items": [
    {
      "id": "s1",
      "label": "Swipe 1 (For You theater)",
      "order": 0
    },
    {
      "id": "s2",
      "label": "Swipe 2",
      "order": 1
    },
    {
      "id": "ling",
      "label": "Linger (the signal)",
      "order": 2
    },
    {
      "id": "live",
      "label": "Open live shop",
      "role": "trap",
      "trap": "Shop"
    }
  ],
  "startStatus": "Swipe, swipe, linger. Skip the shop.",
  "idleStatus": "Press Start. Incomplete never writes."
});
})();
