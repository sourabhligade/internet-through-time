/**
 * HoTMaiL send — 1996 leftover extra (minute).
 * Key: itt96-game-mailsend
 * Kind: form. Incomplete never writes. Traps never write.
 */
(function () {
  "use strict";
  var MX = window.ITT && ITT.YearExtraMinute;
  if (!MX) return;
  MX.mount({
  "year": "1996",
  "id": "mailsend",
  "kind": "form",
  "queryLabel": "Query",
  "runLabel": "Search",
  "submitLabel": "Send",
  "holdLabel": "Hold",
  "holdMs": 1600,
  "fields": [
    {
      "id": "to",
      "label": "To",
      "need": "friend@hotmail.com"
    },
    {
      "id": "sub",
      "label": "Subject",
      "need": "hello"
    },
    {
      "id": "body",
      "label": "Body",
      "need": "inbox"
    }
  ],
  "startStatus": "Compose the note exactly. Send lives in the browser.",
  "idleStatus": "Press Start. Incomplete never writes."
});
})();
