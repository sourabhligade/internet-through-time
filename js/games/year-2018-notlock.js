/**
 * Not Secure leftover — 2018 leftover cabinet (H13 minute).
 * Key: itt18-game-notlock
 * Kind: seq. Incomplete never writes. Traps never write.
 */
(function () {
  "use strict";
  var MX = window.ITT && ITT.YearExtraMinute;
  if (!MX) return;
  MX.mount({
  "year": "2018",
  "id": "notlock",
  "kind": "seq",
  "confirm": "lock",
  "queryLabel": "Query",
  "runLabel": "Search",
  "submitLabel": "Submit",
  "holdLabel": "Hold",
  "holdMs": 1600,
  "items": [
    {
      "id": "bar",
      "label": "Read leftover bar",
      "order": 0
    },
    {
      "id": "lock",
      "label": "Note leftover lock",
      "order": 1
    },
    {
      "id": "leave",
      "label": "Leave leftover",
      "order": 2
    },
    {
      "id": "hack",
      "label": "Bypass HTTPS (trap)",
      "role": "trap",
      "trap": "no exploit"
    }
  ],
  "startStatus": "Bar, lock, leave. No exploit.",
  "idleStatus": "Press Start. Incomplete never writes."
});
})();
