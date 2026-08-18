/**
 * Battle-bus tap — 2017 leftover extra (minute).
 * Key: itt17-game-bustap
 * Kind: seq. Incomplete never writes. Traps never write.
 */
(function () {
  "use strict";
  var MX = window.ITT && ITT.YearExtraMinute;
  if (!MX) return;
  MX.mount({
  "year": "2017",
  "id": "bustap",
  "kind": "seq",
  "confirm": "bus",
  "queryLabel": "Query",
  "runLabel": "Search",
  "submitLabel": "Submit",
  "holdLabel": "Hold",
  "holdMs": 1600,
  "items": [
    {
      "id": "board",
      "label": "Board the bus (theater)",
      "order": 0
    },
    {
      "id": "jump",
      "label": "Jump",
      "order": 1
    },
    {
      "id": "land",
      "label": "Land",
      "order": 2
    },
    {
      "id": "vb",
      "label": "Buy V-Bucks (shop)",
      "role": "trap",
      "trap": "Shop"
    }
  ],
  "startStatus": "Board, jump, land. Skip the shop.",
  "idleStatus": "Press Start. Incomplete never writes."
});
})();
