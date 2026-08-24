/**
 * IPO pin — 2012 leftover extra (minute).
 * Key: itt12-game-ipopin
 * Kind: pick. Incomplete never writes. Traps never write.
 */
(function () {
  "use strict";
  var MX = window.ITT && ITT.YearExtraMinute;
  if (!MX) return;
  MX.mount({
  "year": "2012",
  "id": "ipopin",
  "kind": "pick",
  "queryLabel": "Query",
  "runLabel": "Search",
  "submitLabel": "Submit",
  "holdLabel": "Hold",
  "holdMs": 1600,
  "items": [
    {
      "id": "px",
      "label": "Pin $38"
    },
    {
      "id": "lock",
      "label": "Pin lockup note"
    },
    {
      "id": "tick",
      "label": "Pin ticker"
    },
    {
      "id": "rum",
      "label": "Rumor: $200 open (blog)",
      "role": "trap",
      "trap": "Rumor"
    }
  ],
  "startStatus": "Three pins. Skip the rumor.",
  "idleStatus": "Press Start. Incomplete never writes."
});
})();
