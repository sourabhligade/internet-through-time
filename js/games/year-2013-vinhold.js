/**
 * Vine hold — 2013 leftover extra (minute).
 * Key: itt13-game-vinhold
 * Kind: hold. Incomplete never writes. Traps never write.
 */
(function () {
  "use strict";
  var MX = window.ITT && ITT.YearExtraMinute;
  if (!MX) return;
  MX.mount({
  "year": "2013",
  "id": "vinhold",
  "kind": "hold",
  "queryLabel": "Query",
  "runLabel": "Search",
  "submitLabel": "Submit",
  "holdLabel": "Hold to record",
  "holdMs": 1600,
  "startStatus": "Hold the full beat. Early release never writes.",
  "idleStatus": "Press Start. Incomplete never writes."
});
})();
