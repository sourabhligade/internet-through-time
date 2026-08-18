/**
 * Top 8 swap — 2003 leftover extra (minute).
 * Key: itt03-game-top8swap
 * Kind: seq. Incomplete never writes. Traps never write.
 */
(function () {
  "use strict";
  var MX = window.ITT && ITT.YearExtraMinute;
  if (!MX) return;
  MX.mount({
  "year": "2003",
  "id": "top8swap",
  "kind": "seq",
  "confirm": "top8",
  "queryLabel": "Query",
  "runLabel": "Search",
  "submitLabel": "Submit",
  "holdLabel": "Hold",
  "holdMs": 1600,
  "items": [
    {
      "id": "s3",
      "label": "Slot 3 \u2014 Jess (autoplay MIDI)",
      "order": 0
    },
    {
      "id": "s7",
      "label": "Slot 7 \u2014 dorm roommate",
      "order": 1
    },
    {
      "id": "ok",
      "label": "Confirm swap (they will notice)",
      "order": 2
    },
    {
      "id": "tom",
      "label": "Delete Tom",
      "role": "trap",
      "trap": "Tom stays"
    }
  ],
  "startStatus": "Swap 3 and 7. Tom stays.",
  "idleStatus": "Press Start. Incomplete never writes."
});
})();
