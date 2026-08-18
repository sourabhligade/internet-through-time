/**
 * Street View grab — 2007 leftover extra (minute).
 * Key: itt07-game-svgrab
 * Kind: seq. Incomplete never writes. Traps never write.
 */
(function () {
  "use strict";
  var MX = window.ITT && ITT.YearExtraMinute;
  if (!MX) return;
  MX.mount({
  "year": "2007",
  "id": "svgrab",
  "kind": "seq",
  "confirm": "street",
  "queryLabel": "Query",
  "runLabel": "Search",
  "submitLabel": "Submit",
  "holdLabel": "Hold",
  "holdMs": 1600,
  "items": [
    {
      "id": "grab",
      "label": "Grab pegman",
      "order": 0
    },
    {
      "id": "drop",
      "label": "Drop on blue line (theater street)",
      "order": 1
    },
    {
      "id": "view",
      "label": "Grab the panorama",
      "order": 2
    },
    {
      "id": "live",
      "label": "Load live Street View (blocked)",
      "role": "trap",
      "trap": "No live pano"
    }
  ],
  "startStatus": "Pegman, drop, grab. No live pano.",
  "idleStatus": "Press Start. Incomplete never writes."
});
})();
