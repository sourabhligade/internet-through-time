/**
 * musical.ly leftover — 2016 leftover cabinet (H13 minute).
 * Key: itt16-game-lipapp
 * Kind: seq. Incomplete never writes. Traps never write.
 */
(function () {
  "use strict";
  var MX = window.ITT && ITT.YearExtraMinute;
  if (!MX) return;
  MX.mount({
  "year": "2016",
  "id": "lipapp",
  "kind": "seq",
  "confirm": "lip",
  "queryLabel": "Query",
  "runLabel": "Search",
  "submitLabel": "Submit",
  "holdLabel": "Hold",
  "holdMs": 1600,
  "items": [
    {
      "id": "pick",
      "label": "Pick leftover sound",
      "order": 0
    },
    {
      "id": "lip",
      "label": "Lip leftover",
      "order": 1
    },
    {
      "id": "post",
      "label": "Post leftover",
      "order": 2
    },
    {
      "id": "tt",
      "label": "TikTok 2018 (trap)",
      "role": "trap",
      "trap": "later name"
    }
  ],
  "startStatus": "Sound, lip, post. TikTok is later.",
  "idleStatus": "Press Start. Incomplete never writes."
});
})();
