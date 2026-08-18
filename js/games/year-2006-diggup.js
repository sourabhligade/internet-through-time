/**
 * Digg up — 2006 leftover extra (minute).
 * Key: itt06-game-diggup
 * Kind: pick. Incomplete never writes. Traps never write.
 */
(function () {
  "use strict";
  var MX = window.ITT && ITT.YearExtraMinute;
  if (!MX) return;
  MX.mount({
  "year": "2006",
  "id": "diggup",
  "kind": "pick",
  "queryLabel": "Query",
  "runLabel": "Search",
  "submitLabel": "Submit",
  "holdLabel": "Hold",
  "holdMs": 1600,
  "items": [
    {
      "id": "d1",
      "label": "\u25b2 Story: iPod battery rumor (847 diggs)"
    },
    {
      "id": "d2",
      "label": "\u25b2 Story: Firefox 2 ships"
    },
    {
      "id": "d3",
      "label": "\u25b2 Story: YouTube sale chatter"
    },
    {
      "id": "ad",
      "label": "Sponsored: cheap ringtones",
      "role": "trap",
      "trap": "Sponsored"
    }
  ],
  "startStatus": "Three diggs. Skip sponsored.",
  "idleStatus": "Press Start. Incomplete never writes."
});
})();
