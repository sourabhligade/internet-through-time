/**
 * 140 type — 2006 leftover extra (minute).
 * Key: itt06-game-t140type
 * Kind: form. Incomplete never writes. Traps never write.
 */
(function () {
  "use strict";
  var MX = window.ITT && ITT.YearExtraMinute;
  if (!MX) return;
  MX.mount({
  "year": "2006",
  "id": "t140type",
  "kind": "form",
  "queryLabel": "Query",
  "runLabel": "Search",
  "submitLabel": "Update",
  "holdLabel": "Hold",
  "holdMs": 1600,
  "fields": [
    {
      "id": "tw",
      "label": "What are you doing?",
      "need": "twttr"
    }
  ],
  "startStatus": "140-class box. Type twttr. Update.",
  "idleStatus": "Press Start. Incomplete never writes."
});
})();
