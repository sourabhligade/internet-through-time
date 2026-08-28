(function () {
  "use strict";
  var MX = window.ITT && ITT.YearExtraMinute;
  if (!MX) return;
  MX.mount({
    year: "2006",
    id: "diggup",
    kind: "seq",
    confirm: "digg",
    items: [
      { id: "open", label: "Open a 2006 seed", order: 0 },
      { id: "digg", label: "Digg it", order: 1 },
      { id: "bury", label: "Bury leftover", order: 2 },
      { id: "v4", label: "Open Digg v4 (2010)", role: "trap", trap: "v4 is 2010" }
    ]
  });
})();
