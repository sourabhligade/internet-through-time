/**
 * Chrome box — 2008 leftover extra (minute).
 * Key: itt08-game-chromebox
 * Kind: search. Incomplete never writes. Traps never write.
 */
(function () {
  "use strict";
  var MX = window.ITT && ITT.YearExtraMinute;
  if (!MX) return;
  MX.mount({
  "year": "2008",
  "id": "chromebox",
  "kind": "search",
  "query": "chrome",
  "queryLabel": "Omnibox",
  "runLabel": "Go",
  "submitLabel": "Submit",
  "holdLabel": "Hold",
  "holdMs": 1600,
  "results": [
    {
      "label": "Google Chrome \u2014 a fresh take on the browser",
      "role": "hit"
    },
    {
      "label": "Download Internet Explorer 8",
      "role": "decoy",
      "trap": "Wrong browser"
    }
  ],
  "startStatus": "One box. URL and search.",
  "idleStatus": "Press Start. Incomplete never writes."
});
})();
