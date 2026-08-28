/**
 * Sidewalk leftover — 2016 leftover cabinet (H13 minute).
 * Key: itt16-game-walkgo
 * Kind: search. Incomplete never writes. Traps never write.
 */
(function () {
  "use strict";
  var MX = window.ITT && ITT.YearExtraMinute;
  if (!MX) return;
  MX.mount({
  "year": "2016",
  "id": "walkgo",
  "kind": "search",
  "confirm": "gym",
  "query": "gym",
  "results": [
    { "label": "Leftover gym — museum hit", "role": "hit" },
    { "label": "Raid 2017 (trap)", "role": "decoy", "trap": "later" }
  ],
  "queryLabel": "Query",
  "runLabel": "Search",
  "submitLabel": "Submit",
  "holdLabel": "Hold",
  "holdMs": 1600,
  "items": [
    {
      "id": "map",
      "label": "Open leftover map",
      "order": 0
    },
    {
      "id": "hit",
      "label": "Hit leftover gym",
      "order": 1
    },
    {
      "id": "leave",
      "label": "Keep walking",
      "order": 2
    },
    {
      "id": "raid",
      "label": "Raid 2017 (trap)",
      "role": "trap",
      "trap": "later"
    }
  ],
  "startStatus": "Search gym. Raid is later.",
  "idleStatus": "Press Start. Incomplete never writes.",
  "query": "gym"
});
})();
