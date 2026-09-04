/**
 * Story leftover rail — 2016 leftover cabinet (H13 minute).
 * Key: itt16-game-storyrail
 * Kind: seq. Incomplete never writes. Traps never write.
 */
(function () {
  "use strict";
  var MX = window.ITT && ITT.YearExtraMinute;
  if (!MX) return;
  MX.mount({
  "year": "2016",
  "id": "storyrail",
  "kind": "seq",
  "confirm": "24h",
  "queryLabel": "Query",
  "runLabel": "Search",
  "submitLabel": "Submit",
  "holdLabel": "Hold",
  "holdMs": 1600,
  "items": [
    {
      "id": "open",
      "label": "Open leftover story",
      "order": 0
    },
    {
      "id": "tap",
      "label": "Tap through leftover",
      "order": 1
    },
    {
      "id": "done",
      "label": "It expires",
      "order": 2
    },
    {
      "id": "reel",
      "label": "Open Reels (trap)",
      "role": "trap",
      "trap": "Reels is later"
    }
  ],
  "startStatus": "Open, tap, expire. Reels is later.",
  "idleStatus": "Press Start. Incomplete never writes."
});
})();
