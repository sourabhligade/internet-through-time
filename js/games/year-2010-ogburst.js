/**
 * Open Graph burst — 2010 leftover extra (minute).
 * Key: itt10-game-ogburst
 * Kind: burst. Incomplete never writes. Traps never write.
 */
(function () {
  "use strict";
  var MX = window.ITT && ITT.YearExtraMinute;
  if (!MX) return;
  MX.mount({
  "year": "2010",
  "id": "ogburst",
  "kind": "burst",
  "queryLabel": "Query",
  "runLabel": "Search",
  "submitLabel": "Submit",
  "holdLabel": "Hold",
  "holdMs": 1600,
  "items": [
    {
      "id": "cnn",
      "label": "Like \u00b7 CNN article"
    },
    {
      "id": "mov",
      "label": "Like \u00b7 movie page"
    },
    {
      "id": "song",
      "label": "Like \u00b7 song"
    },
    {
      "id": "bot",
      "label": "Like \u00b7 14,000 fake fans",
      "role": "trap",
      "trap": "Fake counter"
    }
  ],
  "startStatus": "Three off-site likes. Skip the fake counter.",
  "idleStatus": "Press Start. Incomplete never writes."
});
})();
