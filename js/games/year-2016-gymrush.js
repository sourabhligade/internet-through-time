/**
 * Gym Rush — 2016 Pokémon GO silhouette theater (museum original · no official sprites).
 * REAL: multi-tap score → itt16-game-gymrush
 */
(function () {
  "use strict";
  var YG = (window.ITT && ITT.YearGame) || null;
  var host = document.querySelector('[data-year-game][data-game-id="gymrush"]');
  if (!host) return;
  var field = host.querySelector("[data-game-field]");
  var scoreEl = host.querySelector("[data-game-score]");
  var bestEl = host.querySelector("[data-game-best]");
  var timeEl = host.querySelector("[data-game-time]");
  var statusEl = host.querySelector("[data-itt-action-status]");
  var startBtn = host.querySelector("[data-game-start]");
  var score = 0, left = 30, running = false, tid = null, spawnT = null;

  function setStatus(m) {
    if (YG) YG.setStatus(statusEl, m);
    else if (statusEl) statusEl.textContent = m;
  }
  function paint() {
    if (scoreEl) scoreEl.textContent = String(score);
    if (timeEl) timeEl.textContent = String(left);
    if (bestEl && YG) bestEl.textContent = String(YG.loadBest("gymrush", "2016"));
  }
  function stop() {
    running = false;
    if (tid) { clearInterval(tid); tid = null; }
    if (spawnT) { clearTimeout(spawnT); spawnT = null; }
    if (field) field.innerHTML = "";
  }
  function end() {
    stop();
    var blob = YG ? YG.saveBest("gymrush", score, { year: "2016", merge: { silhouette: true } }) : { best: score };
    if (bestEl) bestEl.textContent = String(blob.best);
    setStatus("Session over · score " + score + " · best " + blob.best + " · itt16-game-gymrush");
    try {
      if (window.ITT && ITT.MuseumProgress) {
        ITT.MuseumProgress.stamp("2016", "gymrush", { label: "Gym Rush", href: "sites/playable/game.html" });
      }
    } catch (e) { /* */ }
  }
  function spawn() {
    if (!running || !field) return;
    var b = document.createElement("button");
    b.type = "button";
    b.className = "yg-spawn";
    b.textContent = ["GYM", "STOP", "POKESTOP", "EGG", "RAID"][Math.floor(Math.random() * 5)];
    b.style.cssText =
      "position:absolute;left:" + (8 + Math.random() * 70) + "%;top:" + (10 + Math.random() * 60) +
      "%;padding:8px 10px;font-weight:bold;font-size:12px;border:2px solid #0d47a1;background:#e3f2fd;color:#0d47a1;cursor:pointer;border-radius:20px";
    b.addEventListener("click", function () {
      if (!running) return;
      score += 1;
      paint();
      if (b.parentNode) b.parentNode.removeChild(b);
    });
    field.appendChild(b);
    setTimeout(function () {
      if (b.parentNode && running) b.parentNode.removeChild(b);
    }, 1100 + Math.random() * 600);
    spawnT = setTimeout(spawn, 380 + Math.random() * 320);
  }
  function start() {
    stop();
    score = 0;
    left = YG && YG.isFast() ? 8 : 30;
    running = true;
    paint();
    setStatus("Tap map nodes — silhouette only · no official art");
    tid = setInterval(function () {
      left -= 1;
      paint();
      if (left <= 0) end();
    }, 1000);
    spawn();
  }
  if (startBtn) startBtn.addEventListener("click", start);
  paint();
  setStatus("Press Start · AR outdoor game culture theater");
  if (YG) YG.focusHost();
})();
