/**
 * iPod click wheel — 2001 leftover extra (minute).
 * Key: itt01-game-ipodclick
 * Kind: seq. Incomplete never writes. Traps never write.
 */
(function () {
  "use strict";
  var MX = window.ITT && ITT.YearExtraMinute;
  if (!MX) return;
  MX.mount({
  "year": "2001",
  "id": "ipodclick",
  "kind": "seq",
  "confirm": "wheel",
  "queryLabel": "Query",
  "runLabel": "Search",
  "submitLabel": "Submit",
  "holdLabel": "Hold",
  "holdMs": 1600,
  "items": [
    {
      "id": "menu",
      "label": "MENU",
      "order": 0
    },
    {
      "id": "mus",
      "label": "Music",
      "order": 1
    },
    {
      "id": "pl",
      "label": "Playlists",
      "order": 2
    },
    {
      "id": "play",
      "label": "\u25ba Play",
      "order": 3
    },
    {
      "id": "eject",
      "label": "Eject disk mode",
      "role": "trap",
      "trap": "Disk mode"
    }
  ],
  "startStatus": "Click the wheel path. Disk mode is a trap.",
  "idleStatus": "Press Start. Incomplete never writes."
});
})();
