/**
 * iPad tilt — 2010 leftover extra (minute).
 * Key: itt10-game-ipadtilt
 * Kind: seq. Incomplete never writes. Traps never write.
 */
(function () {
  "use strict";
  var MX = window.ITT && ITT.YearExtraMinute;
  if (!MX) return;
  MX.mount({
  "year": "2010",
  "id": "ipadtilt",
  "kind": "seq",
  "confirm": "ipad",
  "queryLabel": "Query",
  "runLabel": "Search",
  "submitLabel": "Submit",
  "holdLabel": "Hold",
  "holdMs": 1600,
  "items": [
    {
      "id": "land",
      "label": "Rotate to landscape",
      "order": 0
    },
    {
      "id": "swipe",
      "label": "Swipe a magazine page (theater)",
      "order": 1
    },
    {
      "id": "back",
      "label": "Tilt back to portrait",
      "order": 2
    },
    {
      "id": "cam",
      "label": "Open camera (1st-gen has none)",
      "role": "trap",
      "trap": "No camera"
    }
  ],
  "startStatus": "Tilt, swipe, tilt. No camera.",
  "idleStatus": "Press Start. Incomplete never writes."
});
})();
