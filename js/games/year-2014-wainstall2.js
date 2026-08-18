/**
 * WA install tap — 2014 leftover extra (minute).
 * Key: itt14-game-wainstall2
 * Kind: seq. Incomplete never writes. Traps never write.
 */
(function () {
  "use strict";
  var MX = window.ITT && ITT.YearExtraMinute;
  if (!MX) return;
  MX.mount({
  "year": "2014",
  "id": "wainstall2",
  "kind": "seq",
  "confirm": "install",
  "queryLabel": "Query",
  "runLabel": "Search",
  "submitLabel": "Submit",
  "holdLabel": "Hold",
  "holdMs": 1600,
  "items": [
    {
      "id": "get",
      "label": "Get WhatsApp (theater install)",
      "order": 0
    },
    {
      "id": "con",
      "label": "Allow contacts",
      "order": 1
    },
    {
      "id": "chat",
      "label": "Open chat",
      "order": 2
    },
    {
      "id": "sms",
      "label": "Fall back to SMS forever",
      "role": "trap",
      "trap": "SMS"
    }
  ],
  "startStatus": "Install path. SMS is the old world.",
  "idleStatus": "Press Start. Incomplete never writes."
});
})();
