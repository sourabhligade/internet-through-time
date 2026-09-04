/**
 * Stumble twice — 2002 leftover extra (minute).
 * Key: itt02-game-stumble2
 * Kind: pick. Incomplete never writes. Traps never write.
 */
(function () {
  "use strict";
  var MX = window.ITT && ITT.YearExtraMinute;
  if (!MX) return;
  MX.mount({
  "year": "2002",
  "id": "stumble2",
  "kind": "pick",
  "queryLabel": "Query",
  "runLabel": "Search",
  "submitLabel": "Submit",
  "holdLabel": "Hold",
  "holdMs": 1600,
  "items": [
    {
      "id": "s1",
      "label": "Stumble: dorm-photo blog (2002)"
    },
    {
      "id": "s2",
      "label": "Stumble: flash toy hub (textbook)"
    },
    {
      "id": "pop",
      "label": "POP-UP: You are the 1,000,000th visitor",
      "role": "trap",
      "trap": "Pop-up"
    }
  ],
  "startStatus": "Two stumbles. Kill the pop-up by not clicking it.",
  "idleStatus": "Press Start. Incomplete never writes."
});
})();
