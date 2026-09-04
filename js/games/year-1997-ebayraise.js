/**
 * eBay raise — 1997 leftover extra (minute).
 * Key: itt97-game-ebayraise
 * Kind: seq. Incomplete never writes. Traps never write.
 */
(function () {
  "use strict";
  var MX = window.ITT && ITT.YearExtraMinute;
  if (!MX) return;
  MX.mount({
  "year": "1997",
  "id": "ebayraise",
  "kind": "seq",
  "confirm": "bid",
  "queryLabel": "Query",
  "runLabel": "Search",
  "submitLabel": "Submit",
  "holdLabel": "Hold",
  "holdMs": 1600,
  "items": [
    {
      "id": "view",
      "label": "View: Beanie Baby \u2014 current $3.50",
      "order": 0
    },
    {
      "id": "r1",
      "label": "Raise +$1.00 (now $4.50)",
      "order": 1
    },
    {
      "id": "r2",
      "label": "Raise +$2.00 (now $6.50)",
      "order": 2
    },
    {
      "id": "ok",
      "label": "Confirm bid (theater \u2014 no charge)",
      "order": 3
    },
    {
      "id": "scam",
      "label": "Wire money off-site to \u201cwin now\u201d",
      "role": "trap",
      "trap": "Off-site scam"
    }
  ],
  "startStatus": "Raise in order. Off-site wire is a trap.",
  "idleStatus": "Press Start. Incomplete never writes."
});
})();
