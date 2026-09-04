/**
 * Animoji leftover — 2017 leftover cabinet (H13 minute).
 * Key: itt17-game-animojipick
 * Kind: pick. Incomplete never writes. Traps never write.
 */
(function () {
  "use strict";
  var MX = window.ITT && ITT.YearExtraMinute;
  if (!MX) return;
  MX.mount({
  "year": "2017",
  "id": "animojipick",
  "kind": "pick",
  "confirm": "fox",
  "queryLabel": "Query",
  "runLabel": "Search",
  "submitLabel": "Submit",
  "holdLabel": "Hold",
  "holdMs": 1600,
  "items": [
    {
      "id": "fox",
      "label": "Fox leftover",
      "order": 0
    },
    {
      "id": "poo",
      "label": "Pile leftover",
      "order": 1
    },
    {
      "id": "send",
      "label": "Send leftover",
      "order": 2
    },
    {
      "id": "memoji",
      "label": "Memoji 2018 (trap)",
      "role": "trap",
      "trap": "later"
    }
  ],
  "startStatus": "Fox leftover. Memoji is later.",
  "idleStatus": "Press Start. Incomplete never writes."
});
})();
