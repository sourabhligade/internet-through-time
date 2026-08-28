/**
 * For You leftover — 2018 leftover cabinet (H13 minute).
 * Key: itt18-game-fypforu
 * Kind: seq. Incomplete never writes. Traps never write.
 */
(function () {
  "use strict";
  var MX = window.ITT && ITT.YearExtraMinute;
  if (!MX) return;
  MX.mount({
  "year": "2018",
  "id": "fypforu",
  "kind": "seq",
  "confirm": "fyp",
  "queryLabel": "Query",
  "runLabel": "Search",
  "submitLabel": "Submit",
  "holdLabel": "Hold",
  "holdMs": 1600,
  "items": [
    {
      "id": "open",
      "label": "Open leftover For You",
      "order": 0
    },
    {
      "id": "swipe",
      "label": "Swipe leftover",
      "order": 1
    },
    {
      "id": "stay",
      "label": "Stay leftover",
      "order": 2
    },
    {
      "id": "live",
      "label": "Go LIVE (trap)",
      "role": "trap",
      "trap": "not the chip"
    }
  ],
  "startStatus": "Open, swipe, stay. LIVE is leftover.",
  "idleStatus": "Press Start. Incomplete never writes."
});
})();
