/**
 * Yahoo catalog hop — 1994 leftover extra (minute).
 * Key: itt94-game-yahoocat
 * Kind: seq. Incomplete never writes. Traps never write.
 */
(function () {
  "use strict";
  var MX = window.ITT && ITT.YearExtraMinute;
  if (!MX) return;
  MX.mount({
  "year": "1994",
  "id": "yahoocat",
  "kind": "seq",
  "confirm": "computers",
  "queryLabel": "Query",
  "runLabel": "Search",
  "submitLabel": "Submit",
  "holdLabel": "Hold",
  "holdMs": 1600,
  "items": [
    {
      "id": "arts",
      "label": "Arts (Architecture, Literature, Museums\u2026)",
      "order": 0
    },
    {
      "id": "comp",
      "label": "Computers (Internet, WWW, Software\u2026)",
      "order": 1
    },
    {
      "id": "ent",
      "label": "Entertainment (Movies, Music, Cool Links\u2026)",
      "order": 2
    },
    {
      "id": "cgi",
      "label": "cgi-bin/search \u2014 500 Server Error",
      "role": "trap",
      "trap": "Broken CGI"
    }
  ],
  "startStatus": "Hop the directory in order. The catalog is the map.",
  "idleStatus": "Press Start. Incomplete never writes."
});
})();
