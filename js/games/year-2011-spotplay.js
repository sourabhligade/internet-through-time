/**
 * Spotify US play — 2011 leftover extra (minute).
 * Key: itt11-game-spotplay
 * Kind: seq. Incomplete never writes. Traps never write.
 */
(function () {
  "use strict";
  var MX = window.ITT && ITT.YearExtraMinute;
  if (!MX) return;
  MX.mount({
  "year": "2011",
  "id": "spotplay",
  "kind": "seq",
  "confirm": "invite",
  "queryLabel": "Query",
  "runLabel": "Search",
  "submitLabel": "Submit",
  "holdLabel": "Hold",
  "holdMs": 1600,
  "items": [
    {
      "id": "inv",
      "label": "Paste invite code (theater)",
      "order": 0
    },
    {
      "id": "q",
      "label": "Search track",
      "order": 1
    },
    {
      "id": "play",
      "label": "Play",
      "order": 2
    },
    {
      "id": "pir",
      "label": "Open the torrent instead",
      "role": "trap",
      "trap": "Wrong 2011"
    }
  ],
  "startStatus": "Invite, search, play. No torrent.",
  "idleStatus": "Press Start. Incomplete never writes."
});
})();
