/**
 * Periscope tap — 2015 leftover extra (minute).
 * Key: itt15-game-peritap
 * Kind: seq. Incomplete never writes. Traps never write.
 */
(function () {
  "use strict";
  var MX = window.ITT && ITT.YearExtraMinute;
  if (!MX) return;
  MX.mount({
  "year": "2015",
  "id": "peritap",
  "kind": "seq",
  "confirm": "live",
  "queryLabel": "Query",
  "runLabel": "Search",
  "submitLabel": "Submit",
  "holdLabel": "Hold",
  "holdMs": 1600,
  "items": [
    {
      "id": "title",
      "label": "Title: walking home (theater)",
      "order": 0
    },
    {
      "id": "go",
      "label": "Go LIVE",
      "order": 1
    },
    {
      "id": "stop",
      "label": "Stop",
      "order": 2
    },
    {
      "id": "vod",
      "label": "Save VOD forever (not 2015 default)",
      "role": "trap",
      "trap": "VOD later"
    }
  ],
  "startStatus": "Title, live, stop. VOD is later.",
  "idleStatus": "Press Start. Incomplete never writes."
});
})();
