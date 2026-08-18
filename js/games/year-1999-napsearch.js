/**
 * Napster search — 1999 leftover extra (minute).
 * Key: itt99-game-napsearch
 * Kind: search. Incomplete never writes. Traps never write.
 */
(function () {
  "use strict";
  var MX = window.ITT && ITT.YearExtraMinute;
  if (!MX) return;
  MX.mount({
  "year": "1999",
  "id": "napsearch",
  "kind": "search",
  "query": "mp3",
  "queryLabel": "Napster",
  "runLabel": "Search",
  "submitLabel": "Submit",
  "holdLabel": "Hold",
  "holdMs": 1600,
  "results": [
    {
      "label": "track.mp3 \u00b7 192kbps \u00b7 3:42 \u00b7 user: dorm12",
      "role": "hit"
    },
    {
      "label": "FREE_CODEC.exe \u00b7 2.1MB",
      "role": "decoy",
      "trap": "Fake codec"
    },
    {
      "label": "(empty folder) \u00b7 0 files",
      "role": "decoy",
      "trap": "Empty share"
    }
  ],
  "startStatus": "Search. Pick the song row. No live share.",
  "idleStatus": "Press Start. Incomplete never writes."
});
})();
