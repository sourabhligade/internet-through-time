(function () {
  "use strict";
  var MX = window.ITT && ITT.YearExtraMinute;
  if (!MX) return;
  MX.mount({
    year: "2006",
    id: "t140type",
    kind: "seq",
    confirm: "type",
    items: [
      { id: "box", label: "Open the 140 box", order: 0 },
      { id: "type", label: "Type What are you doing?", order: 1 },
      { id: "update", label: "Update", order: 2 },
      { id: "x", label: "Post 280 / For You", role: "trap", trap: "Not 2006" }
    ]
  });
})();
