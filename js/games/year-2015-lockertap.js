/**
 * Photos locker — 2015 leftover extra (minute).
 * Key: itt15-game-lockertap
 * Kind: seq. Incomplete never writes. Traps never write.
 */
(function () {
  "use strict";
  var MX = window.ITT && ITT.YearExtraMinute;
  if (!MX) return;
  MX.mount({
  "year": "2015",
  "id": "lockertap",
  "kind": "seq",
  "confirm": "locker",
  "queryLabel": "Query",
  "runLabel": "Search",
  "submitLabel": "Submit",
  "holdLabel": "Hold",
  "holdMs": 1600,
  "items": [
    {
      "id": "pick",
      "label": "Pick still from the roll",
      "order": 0
    },
    {
      "id": "lock",
      "label": "Lock (theater locker)",
      "order": 1
    },
    {
      "id": "ok",
      "label": "Confirm",
      "order": 2
    },
    {
      "id": "pub",
      "label": "Share album to the web (not locker)",
      "role": "trap",
      "trap": "Public"
    }
  ],
  "startStatus": "Lock a still. Public share is the other verb.",
  "idleStatus": "Press Start. Incomplete never writes."
});
})();
