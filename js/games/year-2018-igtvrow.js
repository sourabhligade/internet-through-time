/**
 * IGTV leftover — 2018 leftover cabinet (H13 minute).
 * Key: itt18-game-igtvrow
 * Kind: search. Incomplete never writes. Traps never write.
 */
(function () {
  "use strict";
  var MX = window.ITT && ITT.YearExtraMinute;
  if (!MX) return;
  MX.mount({
  "year": "2018",
  "id": "igtvrow",
  "kind": "search",
  "confirm": "igtv",
  "query": "igtv",
  "results": [
    { "label": "Leftover IGTV row — museum hit", "role": "hit" },
    { "label": "Reels 2020 (trap)", "role": "decoy", "trap": "later" }
  ],
  "queryLabel": "Query",
  "runLabel": "Search",
  "submitLabel": "Submit",
  "holdLabel": "Hold",
  "holdMs": 1600,
  "items": [
    {
      "id": "open",
      "label": "Open leftover IGTV",
      "order": 0
    },
    {
      "id": "hit",
      "label": "Hit leftover row",
      "order": 1
    },
    {
      "id": "back",
      "label": "Back leftover",
      "order": 2
    },
    {
      "id": "reel",
      "label": "Reels 2020 (trap)",
      "role": "trap",
      "trap": "later"
    }
  ],
  "startStatus": "Search igtv. Reels is later.",
  "idleStatus": "Press Start. Incomplete never writes.",
  "query": "igtv"
});
})();
