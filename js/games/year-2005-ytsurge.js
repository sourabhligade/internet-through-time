/**
 * YouTube surge — 2005 leftover extra (minute).
 * Key: itt05-game-ytsurge
 */
(function () {
  "use strict";
  var MX = window.ITT && ITT.YearExtraMinute;
  if (!MX) return;
  MX.mount({
    year: "2005",
    id: "ytsurge",
    kind: "seq",
    confirm: "upload",
    items: [
      { id: "title", label: "Type a title (not empty)", order: 0 },
      { id: "tag", label: "Tag the clip", order: 1 },
      { id: "upload", label: "Upload leftover", order: 2 },
      { id: "google", label: "Google already owns this (2006)", role: "trap", trap: "2006" }
    ],
    idleStatus: "Press Start. Incomplete never writes."
  });
})();
