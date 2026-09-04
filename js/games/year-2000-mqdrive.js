/**
 * MapQuest print — 2000 leftover extra (minute).
 * Key: itt00-game-mqdrive
 * Kind: wizard. Incomplete never writes. Traps never write.
 */
(function () {
  "use strict";
  var MX = window.ITT && ITT.YearExtraMinute;
  if (!MX) return;
  MX.mount({
  "year": "2000",
  "id": "mqdrive",
  "kind": "wizard",
  "queryLabel": "Query",
  "runLabel": "Search",
  "submitLabel": "Submit",
  "holdLabel": "Hold",
  "holdMs": 1600,
  "panels": [
    {
      "title": "1 \u00b7 From",
      "body": "123 Market St, San Jose, CA",
      "nextLabel": "To \u2192"
    },
    {
      "title": "2 \u00b7 To",
      "body": "1 Infinite Loop is leftover. Use 1 Stockton, SF.",
      "nextLabel": "Get directions"
    },
    {
      "title": "3 \u00b7 Directions",
      "body": "US-101 N \u00b7 48 minutes \u00b7 8 turns (print this).",
      "nextLabel": "Print"
    },
    {
      "title": "4 \u00b7 Print",
      "body": "Theater print. Fold it on the dash. No GPS.",
      "nextLabel": "Done"
    }
  ],
  "startStatus": "Four panels. Print is the destination.",
  "idleStatus": "Press Start. Incomplete never writes."
});
})();
