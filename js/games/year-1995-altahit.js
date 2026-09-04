/**
 * AltaVista hit — 1995 leftover extra (minute).
 * Key: itt95-game-altahit
 * Kind: search. Incomplete never writes. Traps never write.
 */
(function () {
  "use strict";
  var MX = window.ITT && ITT.YearExtraMinute;
  if (!MX) return;
  MX.mount({
  "year": "1995",
  "id": "altahit",
  "kind": "search",
  "query": "mosaic",
  "queryLabel": "AltaVista",
  "runLabel": "Search",
  "submitLabel": "Submit",
  "holdLabel": "Hold",
  "holdMs": 1600,
  "results": [
    {
      "label": "NCSA Mosaic Home Page \u2014 www.ncsa.uiuc.edu",
      "role": "hit"
    },
    {
      "label": "[AD] Cheap domain names \u2014 click here!!!",
      "role": "decoy",
      "trap": "Banner"
    },
    {
      "label": "You are visitor 0003847",
      "role": "decoy",
      "trap": "Counter"
    }
  ],
  "startStatus": "One box. Type mosaic. Click the real hit.",
  "idleStatus": "Press Start. Incomplete never writes."
});
})();
