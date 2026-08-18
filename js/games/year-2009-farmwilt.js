/**
 * Farm wilt — 2009 leftover extra (minute).
 * Key: itt09-game-farmwilt
 * Kind: seq. Incomplete never writes. Traps never write.
 */
(function () {
  "use strict";
  var MX = window.ITT && ITT.YearExtraMinute;
  if (!MX) return;
  MX.mount({
  "year": "2009",
  "id": "farmwilt",
  "kind": "seq",
  "confirm": "wilt",
  "queryLabel": "Query",
  "runLabel": "Search",
  "submitLabel": "Submit",
  "holdLabel": "Hold",
  "holdMs": 1600,
  "items": [
    {
      "id": "a",
      "label": "Water plot A (wilt in 4h theater)",
      "order": 0
    },
    {
      "id": "b",
      "label": "Water plot B",
      "order": 1
    },
    {
      "id": "h",
      "label": "Harvest",
      "order": 2
    },
    {
      "id": "cash",
      "label": "Buy Farm Cash (skip)",
      "role": "trap",
      "trap": "IAP"
    }
  ],
  "startStatus": "Water, water, harvest. Skip Farm Cash.",
  "idleStatus": "Press Start. Incomplete never writes."
});
})();
