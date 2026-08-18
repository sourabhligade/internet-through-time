/**
 * Safari URL — 2007 leftover extra (minute).
 * Key: itt07-game-safurl
 * Kind: search. Incomplete never writes. Traps never write.
 */
(function () {
  "use strict";
  var MX = window.ITT && ITT.YearExtraMinute;
  if (!MX) return;
  MX.mount({
  "year": "2007",
  "id": "safurl",
  "kind": "search",
  "query": "safari",
  "queryLabel": "Address",
  "runLabel": "Go",
  "submitLabel": "Submit",
  "holdLabel": "Hold",
  "holdMs": 1600,
  "results": [
    {
      "label": "apple.com/iphone \u2014 Safari on iPhone",
      "role": "hit"
    },
    {
      "label": "App Store (opens 2008)",
      "role": "decoy",
      "trap": "Too early"
    }
  ],
  "startStatus": "Type the URL. The store is next year.",
  "idleStatus": "Press Start. Incomplete never writes."
});
})();
