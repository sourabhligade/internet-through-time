/**
 * Pets.com sock — 2000 leftover extra (minute).
 * Key: itt00-game-petsock
 * Kind: pick. Incomplete never writes. Traps never write.
 */
(function () {
  "use strict";
  var MX = window.ITT && ITT.YearExtraMinute;
  if (!MX) return;
  MX.mount({
  "year": "2000",
  "id": "petsock",
  "kind": "pick",
  "queryLabel": "Query",
  "runLabel": "Search",
  "submitLabel": "Submit",
  "holdLabel": "Hold",
  "holdMs": 1600,
  "items": [
    {
      "id": "sock",
      "label": "Sock puppet (warehouse leftover)"
    },
    {
      "id": "kib",
      "label": "Kibble 20lb (shipping > product)"
    },
    {
      "id": "bowl",
      "label": "Bowl \u2014 add to cart (theater)"
    },
    {
      "id": "ipo",
      "label": "IPO flyer \u2014 \u201cpets will scale\u201d",
      "role": "trap",
      "trap": "IPO rot"
    }
  ],
  "startStatus": "Shop the residual. Skip the flyer.",
  "idleStatus": "Press Start. Incomplete never writes."
});
})();
