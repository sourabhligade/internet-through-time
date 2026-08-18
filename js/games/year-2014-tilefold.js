/**
 * Tile Fold — 2014 museum year game.
 * Class: 2048 (Cirulli web 9 Mar 2014) after Threes. Museum original grid.
 * Key: itt14-game-tilefold
 * Incomplete (no Start / no merge) never writes.
 */
(function () {
  "use strict";
  var YG = (window.ITT && ITT.YearGame) || null;
  var host = document.querySelector('[data-year-game][data-game-id="tilefold"]');
  if (!host) return;

  var startBtn = host.querySelector("[data-game-start]");
  var boardEl = host.querySelector("[data-tile-board]");
  var scoreEl = host.querySelector("[data-game-score]");
  var bestEl = host.querySelector("[data-game-best]");
  var statusEl = host.querySelector("[data-itt-action-status]");
  var dirs = host.querySelectorAll("[data-tile-dir]");
  var running = false;
  var wrote = false;
  var score = 0;
  var grid = [];

  function setStatus(m) {
    if (YG && YG.setStatus) YG.setStatus(statusEl, m);
    else if (statusEl) statusEl.textContent = m;
  }

  function empty() {
    var i;
    var j;
    var out = [];
    for (i = 0; i < 4; i++) for (j = 0; j < 4; j++) if (!grid[i][j]) out.push([i, j]);
    return out;
  }

  function spawn() {
    var e = empty();
    if (!e.length) return;
    var p = e[Math.floor(Math.random() * e.length)];
    grid[p[0]][p[1]] = Math.random() < 0.9 ? 2 : 4;
  }

  function paint() {
    if (!boardEl) return;
    var html = "";
    var i;
    var j;
    var v;
    for (i = 0; i < 4; i++) {
      html += "<div>";
      for (j = 0; j < 4; j++) {
        v = grid[i][j];
        html +=
          '<span class="tf-cell" style="display:inline-block;width:56px;height:56px;line-height:56px;text-align:center;margin:2px;background:' +
          (v ? "#f2b179" : "#cdc1b4") +
          ';font-weight:bold">' +
          (v || "") +
          "</span>";
      }
      html += "</div>";
    }
    boardEl.innerHTML = html;
    if (scoreEl) scoreEl.textContent = String(score);
    if (bestEl && YG && YG.loadBest) bestEl.textContent = String(YG.loadBest("tilefold", "2014") || 0);
  }

  function line(vals) {
    var a = vals.filter(function (x) { return x; });
    var i;
    var merged = false;
    var out = [];
    for (i = 0; i < a.length; i++) {
      if (i < a.length - 1 && a[i] === a[i + 1]) {
        out.push(a[i] * 2);
        score += a[i] * 2;
        merged = true;
        i++;
      } else out.push(a[i]);
    }
    while (out.length < 4) out.push(0);
    var changed = false;
    for (i = 0; i < 4; i++) if (out[i] !== vals[i]) changed = true;
    return { line: out, changed: changed, merged: merged };
  }

  function move(dir) {
    if (!running) return;
    var i;
    var j;
    var changed = false;
    var merged = false;
    var r;
    if (dir === "left" || dir === "right") {
      for (i = 0; i < 4; i++) {
        var row = grid[i].slice();
        if (dir === "right") row.reverse();
        r = line(row);
        if (dir === "right") r.line.reverse();
        grid[i] = r.line;
        if (r.changed) changed = true;
        if (r.merged) merged = true;
      }
    } else {
      for (j = 0; j < 4; j++) {
        var col = [grid[0][j], grid[1][j], grid[2][j], grid[3][j]];
        if (dir === "down") col.reverse();
        r = line(col);
        if (dir === "down") r.line.reverse();
        for (i = 0; i < 4; i++) grid[i][j] = r.line[i];
        if (r.changed) changed = true;
        if (r.merged) merged = true;
      }
    }
    if (!changed) {
      setStatus("No fold that way.");
      return;
    }
    spawn();
    paint();
    var max = 0;
    for (i = 0; i < 4; i++) for (j = 0; j < 4; j++) if (grid[i][j] > max) max = grid[i][j];
    if (merged && YG && YG.saveBest && !wrote) {
      YG.saveBest("tilefold", score, { year: "2014", merge: { real: true, gold: max >= 128 } });
      wrote = true;
    } else if (merged && YG && YG.saveBest) {
      YG.saveBest("tilefold", score, { year: "2014", merge: { real: true, gold: max >= 128 } });
    }
    if (max >= 128) setStatus("Gold band · 128. Score " + score);
    else setStatus(merged ? "Fold · " + score : "Moved.");
  }

  function start() {
    running = true;
    wrote = false;
    score = 0;
    grid = [[0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0]];
    spawn();
    spawn();
    paint();
    setStatus("Fold tiles. First merge writes. Load never writes.");
  }

  if (startBtn) startBtn.addEventListener("click", start);
  var di;
  for (di = 0; di < dirs.length; di++) {
    dirs[di].addEventListener("click", function () {
      move(this.getAttribute("data-tile-dir"));
    });
  }
  document.addEventListener("keydown", function (ev) {
    var map = { ArrowLeft: "left", ArrowRight: "right", ArrowUp: "up", ArrowDown: "down" };
    if (map[ev.key]) {
      ev.preventDefault();
      move(map[ev.key]);
    }
  });
  if (bestEl && YG && YG.loadBest) bestEl.textContent = String(YG.loadBest("tilefold", "2014") || 0);
  setStatus("Start. Incomplete never writes.");
})();
