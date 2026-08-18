/**
 * KaZaA find — 2002 leftover extra (minute).
 * Key: itt02-game-kazaafind
 * Kind: search. Incomplete never writes. Traps never write.
 */
(function () {
  "use strict";
  var MX = window.ITT && ITT.YearExtraMinute;
  if (!MX) return;
  MX.mount({
  "year": "2002",
  "id": "kazaafind",
  "kind": "search",
  "query": "mp3",
  "queryLabel": "KaZaA",
  "runLabel": "Find",
  "submitLabel": "Submit",
  "holdLabel": "Hold",
  "holdMs": 1600,
  "results": [
    {
      "label": "track.mp3 \u00b7 128kbps \u00b7 SuperNode theater",
      "role": "hit"
    },
    {
      "label": "kazaa_plus_gold.exe",
      "role": "decoy",
      "trap": "Bundled exe"
    }
  ],
  "startStatus": "Find the song. Skip the installer.",
  "idleStatus": "Press Start. Incomplete never writes."
});
})();
