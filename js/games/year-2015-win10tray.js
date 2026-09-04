/**
 * GWX leftover — 2015 leftover cabinet (H13 minute).
 * Key: itt15-game-win10tray
 * Kind: hold. Incomplete never writes. Traps never write.
 */
(function () {
  "use strict";
  var MX = window.ITT && ITT.YearExtraMinute;
  if (!MX) return;
  MX.mount({
  "year": "2015",
  "id": "win10tray",
  "kind": "hold",
  "confirm": "tray",
  "queryLabel": "Query",
  "runLabel": "Search",
  "submitLabel": "Submit",
  "holdLabel": "Hold",
  "holdMs": 1600,
  "items": [
    {
      "id": "see",
      "label": "See the leftover tray",
      "order": 0
    },
    {
      "id": "hold",
      "label": "Hold Get Windows 10 leftover",
      "order": 1
    },
    {
      "id": "dismiss",
      "label": "Dismiss",
      "order": 2
    },
    {
      "id": "upgrade",
      "label": "Upgrade now (trap)",
      "role": "trap",
      "trap": "not January chrome"
    }
  ],
  "startStatus": "See, hold, dismiss. Upgrade is the trap.",
  "idleStatus": "Press Start. Incomplete never writes."
});
})();
