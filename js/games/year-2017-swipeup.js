/**
 * Swipe leftover — 2017 leftover cabinet (H13 minute).
 * Key: itt17-game-swipeup
 * Kind: hold. Incomplete never writes. Traps never write.
 */
(function () {
  "use strict";
  var MX = window.ITT && ITT.YearExtraMinute;
  if (!MX) return;
  MX.mount({
  "year": "2017",
  "id": "swipeup",
  "kind": "hold",
  "confirm": "swipe",
  "queryLabel": "Query",
  "runLabel": "Search",
  "submitLabel": "Submit",
  "holdLabel": "Hold",
  "holdMs": 1600,
  "items": [
    {
      "id": "look",
      "label": "Look leftover",
      "order": 0
    },
    {
      "id": "hold",
      "label": "Hold swipe-up leftover",
      "order": 1
    },
    {
      "id": "home",
      "label": "Home leftover",
      "order": 2
    },
    {
      "id": "btn",
      "label": "Home button (trap)",
      "role": "trap",
      "trap": "no Home button"
    }
  ],
  "startStatus": "Look, hold swipe, home. Button is the trap.",
  "idleStatus": "Press Start. Incomplete never writes."
});
})();
