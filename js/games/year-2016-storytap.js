/**
 * Story tap — 2016 leftover extra (minute).
 * Key: itt16-game-storytap
 * Kind: seq. Incomplete never writes. Traps never write.
 */
(function () {
  "use strict";
  var MX = window.ITT && ITT.YearExtraMinute;
  if (!MX) return;
  MX.mount({
  "year": "2016",
  "id": "storytap",
  "kind": "seq",
  "confirm": "story",
  "queryLabel": "Query",
  "runLabel": "Search",
  "submitLabel": "Submit",
  "holdLabel": "Hold",
  "holdMs": 1600,
  "items": [
    {
      "id": "cam",
      "label": "Open camera",
      "order": 0
    },
    {
      "id": "add",
      "label": "Add 24h slide",
      "order": 1
    },
    {
      "id": "share",
      "label": "Share to Story",
      "order": 2
    },
    {
      "id": "grid",
      "label": "Post to the grid instead",
      "role": "trap",
      "trap": "Grid"
    }
  ],
  "startStatus": "Story path. Grid is the other post.",
  "idleStatus": "Press Start. Incomplete never writes."
});
})();
