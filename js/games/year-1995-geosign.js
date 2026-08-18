/**
 * GeoCities sign-in — 1995 leftover extra (minute).
 * Key: itt95-game-geosign
 * Kind: form. Incomplete never writes. Traps never write.
 */
(function () {
  "use strict";
  var MX = window.ITT && ITT.YearExtraMinute;
  if (!MX) return;
  MX.mount({
  "year": "1995",
  "id": "geosign",
  "kind": "form",
  "queryLabel": "Query",
  "runLabel": "Search",
  "submitLabel": "Sign guestbook",
  "holdLabel": "Hold",
  "holdMs": 1600,
  "fields": [
    {
      "id": "hood",
      "label": "Neighborhood",
      "need": "siliconvalley",
      "placeholder": "siliconvalley"
    },
    {
      "id": "addr",
      "label": "Street address",
      "need": "1234",
      "placeholder": "1234"
    },
    {
      "id": "gb",
      "label": "Guestbook",
      "need": "hello",
      "placeholder": "hello"
    }
  ],
  "startStatus": "Fill the homestead card exactly. Then sign.",
  "idleStatus": "Press Start. Incomplete never writes."
});
})();
