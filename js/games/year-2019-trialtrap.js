/**
 * Trial trap — 2019 leftover extra (minute).
 * Key: itt19-game-trialtrap
 */
(function () {
  "use strict";
  var MX = window.ITT && ITT.YearExtraMinute;
  if (!MX) return;
  MX.mount({
    year: "2019",
    id: "trialtrap",
    kind: "seq",
    confirm: "continue",
    items: [
      { id: "plan", label: "See $6.99 / $69.99", order: 0 },
      { id: "who", label: "Open Who's watching", order: 1 },
      { id: "cont", label: "Continue", order: 2 },
      { id: "trial", label: "Start 7-day trial", role: "trap", trap: "Trial" }
    ],
    startStatus: "Continue is the save. Trial never writes.",
    idleStatus: "Press Start. Incomplete never writes."
  });
})();
