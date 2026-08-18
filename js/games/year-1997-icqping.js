/**
 * ICQ ping — 1997 leftover extra (minute).
 * Key: itt97-game-icqping
 * Kind: seq. Incomplete never writes. Traps never write.
 */
(function () {
  "use strict";
  var MX = window.ITT && ITT.YearExtraMinute;
  if (!MX) return;
  MX.mount({
  "year": "1997",
  "id": "icqping",
  "kind": "seq",
  "confirm": "uin",
  "queryLabel": "Query",
  "runLabel": "Search",
  "submitLabel": "Submit",
  "holdLabel": "Hold",
  "holdMs": 1600,
  "items": [
    {
      "id": "uin",
      "label": "Enter UIN 12345678",
      "order": 0
    },
    {
      "id": "on",
      "label": "Status: Online (green flower)",
      "order": 1
    },
    {
      "id": "msg",
      "label": "Send: you there?",
      "order": 2
    },
    {
      "id": "spam",
      "label": "Add 400 random UINs",
      "role": "trap",
      "trap": "Spam list"
    }
  ],
  "startStatus": "Ping one UIN. Do not spray the network.",
  "idleStatus": "Press Start. Incomplete never writes."
});
})();
