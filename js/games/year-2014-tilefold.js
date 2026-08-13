/**
 * Tile Fold — 2014 museum year game (2048-class merge, original).
 * Gold band = reach 128 (museum-short). Writes best via YearGame; complete key itt14-game-tilefold.
 */
(function () {
  "use strict";
  var YG = (window.ITT && ITT.YearGame) || null;
  var canvas = document.getElementById("game-canvas");
  if (!canvas || !canvas.getContext) return;
  var ctx = canvas.getContext("2d");
  var N = 4;
  var SIZE = 320;
  var PAD = 8;
  var CELL = (SIZE - PAD * (N + 1)) / N;
  var board = [];
  var score = 0;
  var won = false;
  var dead = false;
  var scoreEl = document.getElementById("play-score");
  var bestEl = document.querySelector("[data-game-best]");
  var statusEl = document.getElementById("play-status");
  var startBtn = document.getElementById("play-start");

  function paintBest() {
    if (bestEl) bestEl.textContent = String(YG ? YG.loadBest("tilefold", "2014") : 0);
  }
  function setStatus(m) {
    if (statusEl) statusEl.textContent = m;
  }
  function empty() {
    var i, j, o = [];
    for (i = 0; i < N; i++) for (j = 0; j < N; j++) if (!board[i][j]) o.push([i, j]);
    return o;
  }
  function spawn() {
    var e = empty();
    if (!e.length) return;
    var p = e[Math.floor(Math.random() * e.length)];
    board[p[0]][p[1]] = Math.random() < 0.9 ? 2 : 4;
  }
  function reset() {
    var i;
    board = [];
    for (i = 0; i < N; i++) board.push([0, 0, 0, 0]);
    score = 0;
    won = false;
    dead = false;
    spawn();
    spawn();
    if (scoreEl) scoreEl.textContent = "0";
    setStatus("Arrows / WASD to fold. Reach 128 for gold band.");
    draw();
  }
  function slide(row) {
    var a = row.filter(function (x) { return x; });
    var i, out = [];
    for (i = 0; i < a.length; i++) {
      if (a[i] && a[i] === a[i + 1]) {
        out.push(a[i] * 2);
        score += a[i] * 2;
        i++;
      } else out.push(a[i]);
    }
    while (out.length < N) out.push(0);
    return out;
  }
  function rotate(cw) {
    var i, j, n = [];
    for (i = 0; i < N; i++) {
      n[i] = [];
      for (j = 0; j < N; j++) n[i][j] = cw ? board[N - 1 - j][i] : board[j][N - 1 - i];
    }
    board = n;
  }
  function move(dir) {
    if (won || dead) return;
    var old = JSON.stringify(board);
    var k;
    if (dir === "left") {
      for (k = 0; k < N; k++) board[k] = slide(board[k]);
    } else if (dir === "right") {
      for (k = 0; k < N; k++) board[k] = slide(board[k].slice().reverse()).reverse();
    } else if (dir === "up") {
      rotate(false); for (k = 0; k < N; k++) board[k] = slide(board[k]); rotate(true);
    } else if (dir === "down") {
      rotate(true); for (k = 0; k < N; k++) board[k] = slide(board[k]); rotate(false);
    }
    if (JSON.stringify(board) === old) return;
    spawn();
    if (scoreEl) scoreEl.textContent = String(score);
    var r, c, has128 = false, hasEmpty = false;
    for (r = 0; r < N; r++) for (c = 0; c < N; c++) {
      if (board[r][c] >= 128) has128 = true;
      if (!board[r][c]) hasEmpty = true;
    }
    if (has128 && !won) {
      won = true;
      setStatus("Gold band · 128 folded · R to retry");
      if (YG && YG.flash) YG.flash();
      if (YG && YG.beep) YG.beep();
      if (YG) {
        var b = YG.saveBest("tilefold", score, { year: "2014", merge: { gold: true } });
        if (bestEl) bestEl.textContent = String(b.best);
      }
    } else if (!hasEmpty && !won) {
      dead = true;
      setStatus("Board full · score " + score + " · not gold · R retry");
      if (score > 0 && YG) {
        var bd = YG.saveBest("tilefold", score, { year: "2014", merge: { gold: false } });
        if (bestEl) bestEl.textContent = String(bd.best);
      }
    }
    draw();
  }
  var COLORS = {
    0: "#cdc1b4", 2: "#eee4da", 4: "#ede0c8", 8: "#f2b179", 16: "#f59563",
    32: "#f67c5f", 64: "#f65e3b", 128: "#edcf72", 256: "#edcc61"
  };
  function draw() {
    ctx.fillStyle = "#bbada0";
    ctx.fillRect(0, 0, SIZE, SIZE);
    var r, c, v, x, y;
    for (r = 0; r < N; r++) for (c = 0; c < N; c++) {
      v = board[r][c];
      x = PAD + c * (CELL + PAD);
      y = PAD + r * (CELL + PAD);
      ctx.fillStyle = COLORS[v] || "#3c3a32";
      ctx.fillRect(x, y, CELL, CELL);
      if (v) {
        ctx.fillStyle = v <= 4 ? "#776e65" : "#f9f6f2";
        ctx.font = (v >= 100 ? "20px" : "28px") + " bold Clear Sans, Arial";
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillText(String(v), x + CELL / 2, y + CELL / 2);
      }
    }
  }
  function onKey(ev) {
    var m = { ArrowLeft: "left", ArrowRight: "right", ArrowUp: "up", ArrowDown: "down",
      a: "left", d: "right", w: "up", s: "down", A: "left", D: "right", W: "up", S: "down" };
    if (ev.key === "r" || ev.key === "R") { reset(); return; }
    if (m[ev.key]) { ev.preventDefault(); move(m[ev.key]); }
  }
  document.addEventListener("keydown", onKey);
  if (startBtn) startBtn.addEventListener("click", reset);
  var sx = 0, sy = 0;
  canvas.addEventListener("touchstart", function (e) {
    if (!e.touches[0]) return;
    sx = e.touches[0].clientX; sy = e.touches[0].clientY;
  }, { passive: true });
  canvas.addEventListener("touchend", function (e) {
    var t = e.changedTouches[0];
    if (!t) return;
    var dx = t.clientX - sx, dy = t.clientY - sy;
    if (Math.abs(dx) + Math.abs(dy) < 16) return;
    if (Math.abs(dx) > Math.abs(dy)) move(dx > 0 ? "right" : "left");
    else move(dy > 0 ? "down" : "up");
  });
  paintBest();
  reset();
})();
