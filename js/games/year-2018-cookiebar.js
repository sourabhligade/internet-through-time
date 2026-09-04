/**
 * Cookie leftover — 2018 leftover cabinet (H13 minute).
 * Key: itt18-game-cookiebar
 * Kind: seq. Incomplete never writes. Traps never write.
 */
(function () {
  "use strict";
  var MX = window.ITT && ITT.YearExtraMinute;
  if (!MX) return;
  MX.mount({
  "year": "2018",
  "id": "cookiebar",
  "kind": "seq",
  "confirm": "manage",
  "queryLabel": "Query",
  "runLabel": "Search",
  "submitLabel": "Submit",
  "holdLabel": "Hold",
  "holdMs": 1600,
  "items": [
    {
      "id": "see",
      "label": "See leftover banner",
      "order": 0
    },
    {
      "id": "manage",
      "label": "Manage leftover",
      "order": 1
    },
    {
      "id": "save",
      "label": "Save leftover",
      "order": 2
    },
    {
      "id": "all",
      "label": "Accept All (trap)",
      "role": "trap",
      "trap": "never the save"
    }
  ],
  "startStatus": "See, Manage, Save. Accept All never writes.",
  "idleStatus": "Press Start. Incomplete never writes."
});
})();
