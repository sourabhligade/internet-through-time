/**
 * Meerkat hop — 2015 leftover cabinet (H13 minute).
 * Key: itt15-game-meerkathop
 * Kind: seq. Incomplete never writes. Traps never write.
 */
(function () {
  "use strict";
  var MX = window.ITT && ITT.YearExtraMinute;
  if (!MX) return;
  MX.mount({
  "year": "2015",
  "id": "meerkathop",
  "kind": "seq",
  "confirm": "live",
  "queryLabel": "Query",
  "runLabel": "Search",
  "submitLabel": "Submit",
  "holdLabel": "Hold",
  "holdMs": 1600,
  "items": [
    {
      "id": "open",
      "label": "Open leftover stream",
      "order": 0
    },
    {
      "id": "go",
      "label": "Go live (theater)",
      "order": 1
    },
    {
      "id": "end",
      "label": "End stream",
      "order": 2
    },
    {
      "id": "vod",
      "label": "Keep forever (trap)",
      "role": "trap",
      "trap": "VOD later"
    }
  ],
  "startStatus": "Open, live, end. VOD is later.",
  "idleStatus": "Press Start. Incomplete never writes."
});
})();
