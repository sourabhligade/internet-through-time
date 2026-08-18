/**
 * AIM away — 1999 leftover extra (minute).
 * Key: itt99-game-aimaway
 * Kind: form. Incomplete never writes. Traps never write.
 */
(function () {
  "use strict";
  var MX = window.ITT && ITT.YearExtraMinute;
  if (!MX) return;
  MX.mount({
  "year": "1999",
  "id": "aimaway",
  "kind": "form",
  "queryLabel": "Query",
  "runLabel": "Search",
  "submitLabel": "Set away",
  "holdLabel": "Hold",
  "holdMs": 1600,
  "fields": [
    {
      "id": "buddy",
      "label": "Buddy",
      "need": "aolpal"
    },
    {
      "id": "away",
      "label": "Away word",
      "need": "away"
    },
    {
      "id": "why",
      "label": "Reason",
      "need": "at school"
    }
  ],
  "startStatus": "Set away exactly. Idle is the sport.",
  "idleStatus": "Press Start. Incomplete never writes."
});
})();
