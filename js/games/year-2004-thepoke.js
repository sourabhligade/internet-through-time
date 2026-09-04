/**
 * thefacebook poke — 2004 leftover extra (minute).
 * Key: itt04-game-thepoke
 * Kind: seq. Incomplete never writes. Traps never write.
 */
(function () {
  "use strict";
  var MX = window.ITT && ITT.YearExtraMinute;
  if (!MX) return;
  MX.mount({
  "year": "2004",
  "id": "thepoke",
  "kind": "seq",
  "confirm": "poke",
  "queryLabel": "Query",
  "runLabel": "Search",
  "submitLabel": "Submit",
  "holdLabel": "Hold",
  "holdMs": 1600,
  "items": [
    {
      "id": "net",
      "label": "Network: Harvard (college only)",
      "order": 0
    },
    {
      "id": "find",
      "label": "Find: roommate in Adams",
      "order": 1
    },
    {
      "id": "poke",
      "label": "Poke",
      "order": 2
    },
    {
      "id": "open",
      "label": "Open the network to everyone (too early)",
      "role": "trap",
      "trap": "Not 2004"
    }
  ],
  "startStatus": "College network. Then poke.",
  "idleStatus": "Press Start. Incomplete never writes."
});
})();
