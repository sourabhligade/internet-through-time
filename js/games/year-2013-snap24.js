/**
 * Story 24h — 2013 leftover extra (minute).
 * Key: itt13-game-snap24
 * Kind: wizard. Incomplete never writes. Traps never write.
 */
(function () {
  "use strict";
  var MX = window.ITT && ITT.YearExtraMinute;
  if (!MX) return;
  MX.mount({
  "year": "2013",
  "id": "snap24",
  "kind": "wizard",
  "queryLabel": "Query",
  "runLabel": "Search",
  "submitLabel": "Submit",
  "holdLabel": "Hold",
  "holdMs": 1600,
  "panels": [
    {
      "title": "1 \u00b7 Snap",
      "body": "Hold the circle (theater still).",
      "nextLabel": "Add to Story"
    },
    {
      "title": "2 \u00b7 Story",
      "body": "This is not a one-to-one snap.",
      "nextLabel": "24 hours"
    },
    {
      "title": "3 \u00b7 24h",
      "body": "It dies tomorrow. That is the point.",
      "nextLabel": "Done"
    }
  ],
  "startStatus": "Three panels. A day is the unit.",
  "idleStatus": "Press Start. Incomplete never writes."
});
})();
