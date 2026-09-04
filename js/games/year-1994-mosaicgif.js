/**
 * Mosaic inline GIF — 1994 leftover extra (minute).
 * Key: itt94-game-mosaicgif
 * Kind: buffer. Incomplete never writes. Traps never write.
 */
(function () {
  "use strict";
  var MX = window.ITT && ITT.YearExtraMinute;
  if (!MX) return;
  MX.mount({
  "year": "1994",
  "id": "mosaicgif",
  "kind": "buffer",
  "confirm": "mosaic",
  "queryLabel": "Query",
  "runLabel": "Search",
  "submitLabel": "Submit",
  "holdLabel": "Hold",
  "holdMs": 1600,
  "items": [
    {
      "id": "hdr",
      "label": "GIF87a header (6 bytes landed)"
    },
    {
      "id": "pal",
      "label": "216-color Netscape cube"
    },
    {
      "id": "s1",
      "label": "Scanline 12 \u2014 fish eye"
    },
    {
      "id": "s2",
      "label": "Scanline 28 \u2014 water"
    },
    {
      "id": "s3",
      "label": "Scanline 44 \u2014 done"
    },
    {
      "id": "drop",
      "label": "14.4k dropped \u2014 host unreachable",
      "role": "trap",
      "trap": "Modem died"
    }
  ],
  "startStatus": "Transferring inline GIF\u2026 click scanlines. Skip the drop.",
  "idleStatus": "Press Start. Incomplete never writes."
});
})();
