/**
 * Tile Fold — 2014 leftover cabinet.
 * Fold two leftover tiles. Flappy trap never scores. Star stays WhatsApp.
 * Key: itt14-game-tilefold via YearGame.saveBest at two distinct folds.
 * New Fold / load / trap never write.
 */
(function () {
  "use strict";
  var YG = (window.ITT && ITT.YearGame) || null;
  var host = document.querySelector('[data-year-game][data-game-id="tilefold"]');
  if (!host) return;
  host.setAttribute("data-tilefold-engine", "1");

  var scoreEl = host.querySelector("[data-game-score]");
  var bestEl = host.querySelector("[data-game-best]");
  var boardEl = host.querySelector("[data-tilefold-board]");
  var statusEl = host.querySelector("[data-itt-action-status]");
  var startBtn = host.querySelector("[data-game-start]");
  var key = YG ? YG.storageKey("tilefold", "2014") : "itt14-game-tilefold";
  var NEED = 2;
  var running = false;
  var folded = {};
  var n = 0;
  var best = 0;

  try {
    var prev = YG && YG.loadJSON ? YG.loadJSON(key, null) : JSON.parse(localStorage.getItem(key) || "null");
    if (prev && typeof prev.best === "number") best = prev.best;
  } catch (e0) { /* */ }

  function say(m) {
    if (YG && YG.setStatus) YG.setStatus(statusEl, m);
    else if (statusEl) statusEl.textContent = m;
  }
  function paintBoard() {
    if (!boardEl) return;
    var ids = ["a", "b", "c", "d"];
    var i;
    var html = "";
    for (i = 0; i < ids.length; i++) {
      html +=
        "<button type='button' data-tile-fold='" +
        ids[i] +
        "' style='width:64px;height:64px;margin:4px;font-size:13px;background:" +
        (folded[ids[i]] ? "#cde" : "#eee") +
        "'>" +
        (folded[ids[i]] ? "folded" : "Tile " + ids[i].toUpperCase()) +
        "</button>";
    }
    boardEl.innerHTML = html;
    var tiles = boardEl.querySelectorAll("[data-tile-fold]");
    for (i = 0; i < tiles.length; i++) tiles[i].addEventListener("click", onFold);
  }
  function paint() {
    if (scoreEl) scoreEl.textContent = String(n);
    if (bestEl) bestEl.textContent = String(best);
    paintBoard();
  }
  function writeBest() {
    if (n < NEED) return;
    if (YG && YG.saveBest) {
      YG.saveBest("tilefold", n, { year: "2014", merge: { multiStep: true, folds: n } });
    } else {
      try {
        localStorage.setItem(
          key,
          JSON.stringify({
            gameId: "tilefold",
            year: "2014",
            best: Math.max(best, n),
            last: n,
            folds: n,
            real: true,
            multiStep: true,
            ts: Date.now()
          })
        );
      } catch (eS) { /* */ }
    }
    if (n > best) best = n;
    try {
      if (window.ITT && ITT.revealNextFlow) ITT.revealNextFlow(document);
    } catch (eN) { /* */ }
  }
  function onFold(ev) {
    if (!running) {
      say("New Fold first. Load never writes.");
      return;
    }
    var id = ev.currentTarget.getAttribute("data-tile-fold") || "";
    if (!id || folded[id]) {
      say("Already folded. Another leftover tile.");
      return;
    }
    folded[id] = true;
    n += 1;
    paint();
    if (n >= NEED) {
      writeBest();
      say("Folded · " + key);
    } else {
      say("Fold one more leftover tile.");
    }
  }
  function start() {
    running = true;
    folded = {};
    n = 0;
    paint();
    say("New fold. Two tiles write. Flappy never scores.");
  }

  if (startBtn) startBtn.addEventListener("click", start);
  var staticTiles = host.querySelectorAll("[data-tile-fold]");
  var j;
  for (j = 0; j < staticTiles.length; j++) staticTiles[j].addEventListener("click", onFold);
  var trap = host.querySelector("[data-tile-trap]");
  if (trap) {
    trap.addEventListener("click", function () {
      say("Flappy is not the gold. Never writes.");
    });
  }
  paint();
  say("Load never writes. Two tiles write. Trap never scores.");
})();
