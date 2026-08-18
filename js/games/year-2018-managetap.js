/**
 * Manage tap — 2018 leftover extra (minute).
 * Key: itt18-game-managetap
 * Kind: seq. Incomplete never writes. Traps never write.
 */
(function () {
  "use strict";
  var MX = window.ITT && ITT.YearExtraMinute;
  if (!MX) return;
  MX.mount({
  "year": "2018",
  "id": "managetap",
  "kind": "seq",
  "confirm": "manage",
  "queryLabel": "Query",
  "runLabel": "Search",
  "submitLabel": "Submit",
  "holdLabel": "Hold",
  "holdMs": 1600,
  "items": [
    {
      "id": "ban",
      "label": "See the cookie banner",
      "order": 0
    },
    {
      "id": "man",
      "label": "Manage",
      "order": 1
    },
    {
      "id": "rej",
      "label": "Reject extras",
      "order": 2
    },
    {
      "id": "all",
      "label": "Accept All",
      "role": "trap",
      "trap": "Accept All"
    }
  ],
  "startStatus": "Manage. Accept All never writes.",
  "idleStatus": "Press Start. Incomplete never writes."
});
})();
