/**
 * Storm Scan — 2017 Face ID scan + storm circle hybrid (museum original).
 * Multi-step: complete scan bar AND clear N zones → save.
 */
(function () {
  "use strict";
  var YG = (window.ITT && ITT.YearGame) || null;
  var host = document.querySelector('[data-year-game][data-game-id="stormscan"]');
  if (!host) return;
  var fill = host.querySelector("[data-scan-fill]");
  var scanBtn = host.querySelector("[data-scan-click]");
  var field = host.querySelector("[data-game-field]");
  var scoreEl = host.querySelector("[data-game-score]");
  var bestEl = host.querySelector("[data-game-best]");
  var statusEl = host.querySelector("[data-itt-action-status]");
  var startBtn = host.querySelector("[data-game-start]");
  var scan = 0, zones = 0, needZones = 8, running = false;

  function setStatus(m, err) {
    if (statusEl) {
      statusEl.textContent = m;
      statusEl.style.color = err ? "#a00" : "#060";
    }
  }
  function paint() {
    if (fill) fill.style.width = Math.min(100, scan) + "%";
    if (scoreEl) scoreEl.textContent = zones + " zones · scan " + Math.min(100, scan) + "%";
    if (bestEl && YG) bestEl.textContent = String(YG.loadBest("stormscan", "2017"));
  }
  function tryWin() {
    if (scan >= 100 && zones >= needZones) {
      running = false;
      var sc = 100 + zones * 5;
      var blob = YG
        ? YG.saveBest("stormscan", sc, { year: "2017", merge: { multiStep: true, faceIdTheater: true } })
        : { best: sc };
      if (bestEl) bestEl.textContent = String(blob.best);
      setStatus("Clear! Face scan + storm literacy · best " + blob.best + " · itt17-game-stormscan");
      try {
        if (window.ITT && ITT.MuseumProgress) {
          ITT.MuseumProgress.stamp("2017", "stormscan", { label: "Storm Scan", href: "sites/playable/game.html" });
        }
      } catch (e) { /* */ }
    }
  }
  function spawnZone() {
    if (!running || !field) return;
    var b = document.createElement("button");
    b.type = "button";
    b.textContent = ["circle", "bus", "drop", "zone"][Math.floor(Math.random() * 4)];
    b.style.cssText =
      "position:absolute;left:" + (10 + Math.random() * 68) + "%;top:" + (12 + Math.random() * 55) +
      "%;padding:6px 10px;background:#311b92;color:#fff;border:1px solid #7c4dff;cursor:pointer;font-size:11px";
    b.addEventListener("click", function () {
      if (!running) return;
      zones += 1;
      paint();
      if (b.parentNode) b.parentNode.removeChild(b);
      tryWin();
      if (running && zones < needZones) setTimeout(spawnZone, 200);
    });
    field.appendChild(b);
    setTimeout(function () {
      if (b.parentNode && running) {
        b.parentNode.removeChild(b);
        if (running && zones < needZones) spawnZone();
      }
    }, 1400);
  }
  function start() {
    running = true;
    scan = 0;
    zones = 0;
    if (field) field.innerHTML = "";
    paint();
    setStatus("Step 1: click Look to fill Face ID scan · Step 2: clear " + needZones + " storm nodes");
    spawnZone();
  }
  if (scanBtn) {
    scanBtn.addEventListener("click", function () {
      if (!running) return;
      scan = Math.min(100, scan + 8);
      paint();
      tryWin();
    });
  }
  if (startBtn) startBtn.addEventListener("click", start);
  paint();
  setStatus("Press Start · Face ID residual + BR silhouette · no biometrics · no skins");
  if (YG) YG.focusHost();
})();
