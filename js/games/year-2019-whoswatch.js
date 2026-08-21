/**
 * Who's watch — 2019 leftover extra (minute).
 * Key: itt19-game-whoswatch
 */
(function () {
  "use strict";
  var MX = window.ITT && ITT.YearExtraMinute;
  if (!MX) return;
  MX.mount({
    year: "2019",
    id: "whoswatch",
    kind: "seq",
    confirm: "profile",
    items: [
      { id: "grid", label: "See Who's watching", order: 0 },
      { id: "adult", label: "Pick Adult", order: 1 },
      { id: "kids", label: "Pick Kids", order: 2 },
      { id: "trial", label: "Start free trial", role: "trap", trap: "Trial" }
    ],
    startStatus: "Pick profiles. Trial never writes.",
    idleStatus: "Press Start. Incomplete never writes."
  });
})();
