/**
 * Reactions leftover — 2016 leftover cabinet (H13 minute).
 * Key: itt16-game-reactbar
 * Kind: pick. Incomplete never writes. Traps never write.
 */
(function () {
  "use strict";
  var MX = window.ITT && ITT.YearExtraMinute;
  if (!MX) return;
  MX.mount({
  "year": "2016",
  "id": "reactbar",
  "kind": "pick",
  "confirm": "love",
  "queryLabel": "Query",
  "runLabel": "Search",
  "submitLabel": "Submit",
  "holdLabel": "Hold",
  "holdMs": 1600,
  "items": [
    {
      "id": "love",
      "label": "Love leftover",
      "order": 0
    },
    {
      "id": "haha",
      "label": "Haha leftover",
      "order": 1
    },
    {
      "id": "wow",
      "label": "Wow leftover",
      "order": 2
    },
    {
      "id": "care",
      "label": "Care 2020 (trap)",
      "role": "trap",
      "trap": "Care is later"
    }
  ],
  "startStatus": "Pick Love leftover. Care is later.",
  "idleStatus": "Press Start. Incomplete never writes."
});
})();
