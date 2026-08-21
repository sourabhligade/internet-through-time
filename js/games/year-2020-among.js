/**
 * Sus Vote — 2020 museum year game (Among Us surge class).
 * 2018 game · 2020 Steam peak 447,476 · two ticks + pick + eject.
 * Storage: itt20-game-among via YearGame.saveBest
 * No official crewmate art.
 */
(function () {
  "use strict";
  var YG = (window.ITT && ITT.YearGame) || null;
  var host = document.querySelector('[data-year-game][data-game-id="among"]');
  if (!host) return;

  var scoreEl = host.querySelector("[data-game-score]");
  var bestEl = host.querySelector("[data-game-best]");
  var statusEl = host.querySelector("[data-itt-action-status]");
  var startBtn = host.querySelector("[data-game-start]");
  var ejectBtn = host.querySelector("[data-sus-eject]");
  var picked = "";
  var running = false;

  function setStatus(m) {
    if (YG) YG.setStatus(statusEl, m);
    else if (statusEl) statusEl.textContent = m;
  }
  function paintBest() {
    if (bestEl) bestEl.textContent = String(YG ? YG.loadBest("among", "2020") : 0);
  }
  function paintScore(n) {
    if (scoreEl) scoreEl.textContent = String(n);
  }
  function ticks() {
    var els = host.querySelectorAll("[data-sus-req]");
    var n = 0;
    var i;
    for (i = 0; i < els.length; i++) if (els[i].checked) n++;
    return n;
  }

  function reset() {
    picked = "";
    running = true;
    paintScore(0);
    var btns = host.querySelectorAll("[data-sus-pick]");
    var i;
    for (i = 0; i < btns.length; i++) {
      btns[i].className = (btns[i].className || "").replace(/\bis-on\b/g, "");
    }
    setStatus("Tick both honesties. Pick a silhouette. Eject. 0 ticks never write.");
  }

  if (startBtn) startBtn.addEventListener("click", reset);

  var picks = host.querySelectorAll("[data-sus-pick]");
  var i;
  for (i = 0; i < picks.length; i++) {
    picks[i].addEventListener("click", function () {
      picked = this.getAttribute("data-sus-pick") || "";
      var j;
      for (j = 0; j < picks.length; j++) {
        picks[j].className = (picks[j].className || "").replace(/\bis-on\b/g, "");
      }
      this.className = (this.className || "") + " is-on";
      setStatus("Picked " + picked + " leftover.");
    });
  }

  if (ejectBtn) {
    ejectBtn.addEventListener("click", function () {
      if (!running) {
        setStatus("New Game first.");
        return;
      }
      if (ticks() < 2) {
        setStatus("Tick both honesties first. Incomplete never writes.");
        return;
      }
      if (!picked) {
        setStatus("Pick a silhouette first.");
        return;
      }
      var sc = 47;
      paintScore(sc);
      if (YG) YG.saveBest("among", sc, { year: "2020", gold: true, steamPeak: 447476, vote: picked });
      try {
        localStorage.setItem(
          "itt20-game-among",
          JSON.stringify({
            real: true,
            multiStep: true,
            year: "2020",
            vote: picked,
            steamPeak: 447476,
            ts: Date.now()
          })
        );
      } catch (e) { /* */ }
      paintBest();
      running = false;
      setStatus("Ejected leftover · itt20-game-among");
      try {
        if (window.ITT && ITT.revealNextFlow) ITT.revealNextFlow(document);
      } catch (eN) { /* */ }
    });
  }

  paintBest();
  setStatus("New Game. 0 ticks never write.");
})();
