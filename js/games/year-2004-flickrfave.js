/**
 * Flickr fave — 2004 leftover extra (minute).
 * Key: itt04-game-flickrfave
 * Kind: pick. Incomplete never writes. Traps never write.
 */
(function () {
  "use strict";
  var MX = window.ITT && ITT.YearExtraMinute;
  if (!MX) return;
  MX.mount({
  "year": "2004",
  "id": "flickrfave",
  "kind": "pick",
  "queryLabel": "Query",
  "runLabel": "Search",
  "submitLabel": "Submit",
  "holdLabel": "Hold",
  "holdMs": 1600,
  "items": [
    {
      "id": "p1",
      "label": "\u2605 still: rooftop party (tag: sf)"
    },
    {
      "id": "p2",
      "label": "\u2605 still: cat in a sink"
    },
    {
      "id": "p3",
      "label": "\u2605 still: concert phone-cam"
    },
    {
      "id": "ad",
      "label": "Stock CD: 1000 royalty-free photos",
      "role": "trap",
      "trap": "Stock banner"
    }
  ],
  "startStatus": "Three stars. Skip stock.",
  "idleStatus": "Press Start. Incomplete never writes."
});
})();
