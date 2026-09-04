/**
 * Mozilla milestone — 1998 leftover extra (minute).
 * Key: itt98-game-mozmile
 * Kind: seq. Incomplete never writes. Traps never write.
 */
(function () {
  "use strict";
  var MX = window.ITT && ITT.YearExtraMinute;
  if (!MX) return;
  MX.mount({
  "year": "1998",
  "id": "mozmile",
  "kind": "seq",
  "confirm": "mozilla",
  "queryLabel": "Query",
  "runLabel": "Search",
  "submitLabel": "Submit",
  "holdLabel": "Hold",
  "holdMs": 1600,
  "items": [
    {
      "id": "m3",
      "label": "M3 \u2014 new layout engine note",
      "order": 0
    },
    {
      "id": "m4",
      "label": "M4 \u2014 mail/news landing",
      "order": 1
    },
    {
      "id": "m5",
      "label": "M5 \u2014 Chatzilla nightlies",
      "order": 2
    },
    {
      "id": "ie",
      "label": "Internet Explorer 5 download (wrong war)",
      "role": "trap",
      "trap": "Wrong browser"
    }
  ],
  "startStatus": "Milestones in order. IE is the other war.",
  "idleStatus": "Press Start. Incomplete never writes."
});
})();
