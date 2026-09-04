/**
 * Lucky jump — 1998 leftover extra (minute).
 * Key: itt98-game-luckygo
 * Kind: search. Incomplete never writes. Traps never write.
 */
(function () {
  "use strict";
  var MX = window.ITT && ITT.YearExtraMinute;
  if (!MX) return;
  MX.mount({
  "year": "1998",
  "id": "luckygo",
  "kind": "search",
  "query": "yahoo",
  "queryLabel": "Google",
  "runLabel": "I'm Feeling Lucky",
  "submitLabel": "Submit",
  "holdLabel": "Hold",
  "holdMs": 1600,
  "results": [
    {
      "label": "Lucky: Yahoo! (Stanford directory)",
      "role": "hit"
    },
    {
      "label": "1\u201310 blue links (you skipped these)",
      "role": "decoy",
      "trap": "SERP list"
    },
    {
      "label": "[AD] Search the web faster!!!",
      "role": "decoy",
      "trap": "Banner"
    }
  ],
  "startStatus": "One button. Skip the list.",
  "idleStatus": "Press Start. Incomplete never writes."
});
})();
