/**
 * 99¢ tap — 2003 leftover extra (minute).
 * Key: itt03-game-itunestap
 * Kind: seq. Incomplete never writes. Traps never write.
 */
(function () {
  "use strict";
  var MX = window.ITT && ITT.YearExtraMinute;
  if (!MX) return;
  MX.mount({
  "year": "2003",
  "id": "itunestap",
  "kind": "seq",
  "confirm": "99",
  "queryLabel": "Query",
  "runLabel": "Search",
  "submitLabel": "Submit",
  "holdLabel": "Hold",
  "holdMs": 1600,
  "items": [
    {
      "id": "br",
      "label": "Browse: Today\u2019s 99\u00a2 shelf",
      "order": 0
    },
    {
      "id": "tr",
      "label": "Track \u2014 $0.99",
      "order": 1
    },
    {
      "id": "buy",
      "label": "Buy (theater \u2014 no card)",
      "order": 2
    },
    {
      "id": "album",
      "label": "Buy whole album $9.99 (not this leftover)",
      "role": "trap",
      "trap": "Album upsell"
    }
  ],
  "startStatus": "One 99\u00a2 tap. Album is the other product.",
  "idleStatus": "Press Start. Incomplete never writes."
});
})();
