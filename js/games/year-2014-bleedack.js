/**
 * Heartbleed rotate — 2014 leftover extra (minute).
 * Key: itt14-game-bleedack
 * Kind: seq. Incomplete never writes. Traps never write.
 */
(function () {
  "use strict";
  var MX = window.ITT && ITT.YearExtraMinute;
  if (!MX) return;
  MX.mount({
  "year": "2014",
  "id": "bleedack",
  "kind": "seq",
  "confirm": "rotate",
  "queryLabel": "Query",
  "runLabel": "Search",
  "submitLabel": "Submit",
  "holdLabel": "Hold",
  "holdMs": 1600,
  "items": [
    {
      "id": "cve",
      "label": "See CVE-2014-0160 (read-only)",
      "order": 0
    },
    {
      "id": "rot",
      "label": "Rotate password (theater)",
      "order": 1
    },
    {
      "id": "ok",
      "label": "Confirm rotate",
      "order": 2
    },
    {
      "id": "poc",
      "label": "Run the proof of concept (blocked)",
      "role": "trap",
      "trap": "No exploit"
    }
  ],
  "startStatus": "Rotate. Do not run the bug.",
  "idleStatus": "Press Start. Incomplete never writes."
});
})();
