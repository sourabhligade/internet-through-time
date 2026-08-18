/**
 * YouTube surge — 2005 leftover extra (minute).
 * Key: itt05-game-ytsurge
 * Kind: burst. Incomplete never writes. Traps never write.
 */
(function () {
  "use strict";
  var MX = window.ITT && ITT.YearExtraMinute;
  if (!MX) return;
  MX.mount({
  "year": "2005",
  "id": "ytsurge",
  "kind": "burst",
  "queryLabel": "Query",
  "runLabel": "Search",
  "submitLabel": "Submit",
  "holdLabel": "Hold",
  "holdMs": 1600,
  "items": [
    {
      "id": "zoo",
      "label": "\u25ba Me at the zoo (18s)"
    },
    {
      "id": "dorm",
      "label": "\u25ba Dorm guitar (0:41)"
    },
    {
      "id": "cat",
      "label": "\u25ba Cat falls off TV (0:09)"
    },
    {
      "id": "ad",
      "label": "Pre-roll: 30s car ad (skip)",
      "role": "trap",
      "trap": "Pre-roll"
    }
  ],
  "startStatus": "Three plays. Skip the pre-roll.",
  "idleStatus": "Press Start. Incomplete never writes."
});
})();
