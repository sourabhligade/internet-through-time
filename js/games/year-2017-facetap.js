/**
 * Face tap — 2017 leftover extra (minute).
 * Key: itt17-game-facetap
 * Kind: seq. Incomplete never writes. Traps never write.
 */
(function () {
  "use strict";
  var MX = window.ITT && ITT.YearExtraMinute;
  if (!MX) return;
  MX.mount({
  "year": "2017",
  "id": "facetap",
  "kind": "seq",
  "confirm": "face",
  "queryLabel": "Query",
  "runLabel": "Search",
  "submitLabel": "Submit",
  "holdLabel": "Hold",
  "holdMs": 1600,
  "items": [
    {
      "id": "raise",
      "label": "Raise phone",
      "order": 0
    },
    {
      "id": "scan",
      "label": "Scan (theater dots)",
      "order": 1
    },
    {
      "id": "un",
      "label": "Unlock",
      "order": 2
    },
    {
      "id": "pass",
      "label": "Use passcode instead (fallback)",
      "role": "trap",
      "trap": "Passcode"
    }
  ],
  "startStatus": "Face path. Passcode is fallback, not this leftover.",
  "idleStatus": "Press Start. Incomplete never writes."
});
})();
