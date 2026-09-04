/**
 * Wiki preview — 2001 leftover extra (minute).
 * Key: itt01-game-wikiprev
 * Kind: form. Incomplete never writes. Traps never write.
 */
(function () {
  "use strict";
  var MX = window.ITT && ITT.YearExtraMinute;
  if (!MX) return;
  MX.mount({
  "year": "2001",
  "id": "wikiprev",
  "kind": "form",
  "queryLabel": "Query",
  "runLabel": "Search",
  "submitLabel": "Preview",
  "holdLabel": "Hold",
  "holdMs": 1600,
  "fields": [
    {
      "id": "art",
      "label": "Article",
      "need": "internet"
    },
    {
      "id": "ed",
      "label": "Edit",
      "need": "cite needed"
    },
    {
      "id": "prev",
      "label": "Preview box",
      "need": "edit"
    }
  ],
  "startStatus": "Preview before save. No live wiki.",
  "idleStatus": "Press Start. Incomplete never writes."
});
})();
