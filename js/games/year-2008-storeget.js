/**
 * App Store get — 2008 leftover extra (minute).
 * Key: itt08-game-storeget
 * Kind: seq. Incomplete never writes. Traps never write.
 */
(function () {
  "use strict";
  var MX = window.ITT && ITT.YearExtraMinute;
  if (!MX) return;
  MX.mount({
  "year": "2008",
  "id": "storeget",
  "kind": "seq",
  "confirm": "get",
  "queryLabel": "Query",
  "runLabel": "Search",
  "submitLabel": "Submit",
  "holdLabel": "Hold",
  "holdMs": 1600,
  "items": [
    {
      "id": "search",
      "label": "Search the ~500 (2008 shelf)",
      "order": 0
    },
    {
      "id": "pick",
      "label": "Pick: flashlight $0.99 (theater)",
      "order": 1
    },
    {
      "id": "get",
      "label": "GET",
      "order": 2
    },
    {
      "id": "iap",
      "label": "In-app purchase (too late for 2008 day one)",
      "role": "trap",
      "trap": "IAP later"
    }
  ],
  "startStatus": "Get one app. IAP is later.",
  "idleStatus": "Press Start. Incomplete never writes."
});
})();
