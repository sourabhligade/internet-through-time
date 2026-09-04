/** Gags Lite — 2003 */
(function () {
  "use strict";
  var YG = (window.ITT && ITT.YearGame) || null;
  var host = document.querySelector('[data-year-game][data-game-id="gagslite"]');
  if (!host) return;
  var statusEl = host.querySelector("[data-itt-action-status]");
  var logEl = host.querySelector("[data-log]");
  var php = host.querySelector("[data-php]");
  var ehp = host.querySelector("[data-ehp]");
  var key = YG ? YG.storageKey("gagslite", "2003") : "itt03-game-gagslite";
  var pHP = 30, eHP = 30, round = 0, healUsed = false, active = false;
  function setStatus(m) { if (statusEl) statusEl.textContent = m; }
  function log(m) { if (logEl) logEl.textContent = m + "\n" + (logEl.textContent || ""); }
  function paint() {
    if (php) php.textContent = String(pHP);
    if (ehp) ehp.textContent = String(eHP);
  }
  function end(win) {
    active = false;
    var s = (YG && YG.loadJSON(key, null)) || { wins: 0, losses: 0, bestStreak: 0, streak: 0 };
    if (win) {
      s.wins = (s.wins || 0) + 1;
      s.streak = (s.streak || 0) + 1;
      s.bestStreak = Math.max(s.bestStreak || 0, s.streak);
      setStatus("You win! Streak " + s.streak);
    } else {
      s.losses = (s.losses || 0) + 1;
      s.streak = 0;
      setStatus("You lose.");
    }
    s.gameId = "gagslite"; s.year = "2003"; s.real = true; s.ts = Date.now();
    s.best = s.bestStreak;
    if (YG) YG.saveJSON(key, s);
  }
  function enemyTurn() {
    var roll = Math.random();
    var dmg = roll < 0.45 ? 12 : roll < 0.8 ? 6 : 4;
    if (Math.random() < 0.7) {
      pHP -= dmg;
      log("Enemy hits for " + dmg + "!");
    } else log("Enemy misses!");
    paint();
    if (pHP <= 0) end(false);
    else if (round >= 3) end(pHP >= eHP);
    else setStatus("Your turn · round " + (round + 1));
  }
  function playerGag(type) {
    if (!active) return;
    round++;
    var hit = true, dmg = 0;
    if (type === "pie") { hit = Math.random() < 0.8; dmg = 6; }
    else if (type === "seltzer") { hit = Math.random() < 0.65; dmg = 4; }
    else if (type === "anvil") { hit = Math.random() < 0.45; dmg = 12; }
    else if (type === "cupcake") {
      if (healUsed) { setStatus("Only one cupcake per fight"); round--; return; }
      healUsed = true; pHP = Math.min(30, pHP + 5); log("You heal 5!"); paint();
      setTimeout(enemyTurn, 400); return;
    }
    if (hit) { eHP -= dmg; log("You " + type + " hit for " + dmg + "!"); }
    else log("You " + type + " miss!");
    paint();
    if (eHP <= 0) { end(true); return; }
    setTimeout(enemyTurn, 500);
  }
  host.querySelectorAll("[data-gag]").forEach(function (b) {
    b.addEventListener("click", function () { playerGag(b.getAttribute("data-gag")); });
  });
  var start = host.querySelector("[data-game-start]");
  if (start) start.addEventListener("click", function () {
    pHP = 30; eHP = 30; round = 0; healUsed = false; active = true;
    if (logEl) logEl.textContent = "";
    paint(); setStatus("Fight! Pick a gag");
  });
  paint(); setStatus("Press Start fight");
})();
