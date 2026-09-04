/**
 * 280 leftover — 2017 leftover cabinet (H13 minute).
 * Key: itt17-game-twoeighty
 * Kind: form. Incomplete never writes. Traps never write.
 */
(function () {
  "use strict";
  var MX = window.ITT && ITT.YearExtraMinute;
  if (!MX) return;
  MX.mount({
  "year": "2017",
  "id": "twoeighty",
  "kind": "seq",
  "confirm": "280",
  "queryLabel": "Query",
  "runLabel": "Search",
  "submitLabel": "Submit",
  "holdLabel": "Hold",
  "holdMs": 1600,
  "items": [
    {
      "id": "draft",
      "label": "Draft leftover",
      "order": 0
    },
    {
      "id": "count",
      "label": "Count leftover 280",
      "order": 1
    },
    {
      "id": "post",
      "label": "Post leftover",
      "order": 2
    },
    {
      "id": "blue",
      "label": "Blue check shop (trap)",
      "role": "trap",
      "trap": "later"
    }
  ],
  "startStatus": "Draft, count 280, post.",
  "idleStatus": "Press Start. Incomplete never writes."
});
})();
