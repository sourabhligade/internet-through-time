/**
 * Space Jam hoop — 1996 leftover extra (minute).
 * Key: itt96-game-jamshot
 * Kind: burst. Incomplete never writes. Traps never write.
 */
(function () {
  "use strict";
  var MX = window.ITT && ITT.YearExtraMinute;
  if (!MX) return;
  MX.mount({
  "year": "1996",
  "id": "jamshot",
  "kind": "burst",
  "queryLabel": "Query",
  "runLabel": "Search",
  "submitLabel": "Submit",
  "holdLabel": "Hold",
  "holdMs": 1600,
  "items": [
    {
      "id": "c",
      "label": "Center hoop \u2014 nothing but net"
    },
    {
      "id": "l",
      "label": "Left wing \u2014 Looney tune-up"
    },
    {
      "id": "r",
      "label": "Right wing \u2014 dunk theater"
    },
    {
      "id": "ad",
      "label": "[AD] Download our player (800K)",
      "role": "trap",
      "trap": "Banner"
    }
  ],
  "startStatus": "Shoot the court. Skip the ad.",
  "idleStatus": "Press Start. Incomplete never writes."
});
})();
