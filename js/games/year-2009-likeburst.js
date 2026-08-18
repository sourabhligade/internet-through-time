/**
 * Like burst — 2009 leftover extra (minute).
 * Key: itt09-game-likeburst
 * Kind: burst. Incomplete never writes. Traps never write.
 */
(function () {
  "use strict";
  var MX = window.ITT && ITT.YearExtraMinute;
  if (!MX) return;
  MX.mount({
  "year": "2009",
  "id": "likeburst",
  "kind": "burst",
  "queryLabel": "Query",
  "runLabel": "Search",
  "submitLabel": "Submit",
  "holdLabel": "Hold",
  "holdMs": 1600,
  "items": [
    {
      "id": "l1",
      "label": "Like \u00b7 roommate status"
    },
    {
      "id": "l2",
      "label": "Like \u00b7 tagged photo"
    },
    {
      "id": "l3",
      "label": "Like \u00b7 event tonight"
    },
    {
      "id": "l4",
      "label": "Like \u00b7 shared link"
    },
    {
      "id": "ad",
      "label": "Like \u00b7 sponsored page",
      "role": "trap",
      "trap": "Ad like"
    }
  ],
  "startStatus": "Four likes. Skip the sponsored thumb.",
  "idleStatus": "Press Start. Incomplete never writes."
});
})();
