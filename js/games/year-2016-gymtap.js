/**
 * Gym tap — 2016 leftover extra (minute).
 * Key: itt16-game-gymtap
 * Kind: burst. Incomplete never writes. Traps never write.
 */
(function () {
  "use strict";
  var MX = window.ITT && ITT.YearExtraMinute;
  if (!MX) return;
  MX.mount({
  "year": "2016",
  "id": "gymtap",
  "kind": "burst",
  "queryLabel": "Query",
  "runLabel": "Search",
  "submitLabel": "Submit",
  "holdLabel": "Hold",
  "holdMs": 1600,
  "items": [
    {
      "id": "g1",
      "label": "Walk gym \u00b7 park fountain"
    },
    {
      "id": "g2",
      "label": "Walk gym \u00b7 library steps"
    },
    {
      "id": "g3",
      "label": "Walk gym \u00b7 train station"
    },
    {
      "id": "lure",
      "label": "Buy a lure (shop)",
      "role": "trap",
      "trap": "Shop"
    }
  ],
  "startStatus": "Three gyms. Skip the shop.",
  "idleStatus": "Press Start. Incomplete never writes."
});
})();
