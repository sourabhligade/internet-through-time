/**
 * Android share — 2012 leftover extra (minute).
 * Key: itt12-game-andshare
 * Kind: seq. Incomplete never writes. Traps never write.
 */
(function () {
  "use strict";
  var MX = window.ITT && ITT.YearExtraMinute;
  if (!MX) return;
  MX.mount({
  "year": "2012",
  "id": "andshare",
  "kind": "seq",
  "confirm": "android",
  "queryLabel": "Query",
  "runLabel": "Search",
  "submitLabel": "Submit",
  "holdLabel": "Hold",
  "holdMs": 1600,
  "items": [
    {
      "id": "still",
      "label": "Open still (gallery)",
      "order": 0
    },
    {
      "id": "sheet",
      "label": "Share sheet",
      "order": 1
    },
    {
      "id": "ig",
      "label": "Instagram",
      "order": 2
    },
    {
      "id": "mms",
      "label": "Send as MMS (not the 2012 verb)",
      "role": "trap",
      "trap": "MMS"
    }
  ],
  "startStatus": "Share to IG. MMS is the old verb.",
  "idleStatus": "Press Start. Incomplete never writes."
});
})();
