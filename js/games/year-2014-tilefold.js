/**
 * Tile Fold — 2014 museum year game (2048-class merge).
 */
(function () {
  "use strict";
  var YG = (window.ITT && ITT.YearGame) || null;
  var host = document.querySelector('[data-year-game][data-game-id="tilefold"]');
  if (!host) return;

  var boardEl = host.querySelector("[data-tf-board]");
  var scoreEl = host.querySelector("[data-game-score]");
  var bestEl = host.querySelector("[data-game-best]");
  var statusEl = host.querySelector("[data-itt-action-status]");
  var newBtn = host.querySelector("[data-game-start]");

  var grid = [];
  var score = 0;
  var won = false;
  var over = false;

  function setStatus(m) {
    if (YG) YG.setStatus(statusEl, m);
    else if (statusEl) statusEl.textContent = m;
  }

  function emptyGrid() {
    var g = [];
    for (var r = 0; r < 4; r++) {
      g[r] = [0, 0, 0, 0];
    }
    return g;
  }

  function empties(g) {
    var list = [];
    for (var r = 0; r < 4; r++)
      for (var c = 0; c < 4; c++) if (!g[r][c]) list.push({ r: r, c: c });
    return list;
  }

  function spawn(g) {
    var e = empties(g);
    if (!e.length) return;
    var cell = e[Math.floor(Math.random() * e.length)];
    g[cell.r][cell.c] = Math.random() < 0.9 ? 2 : 4;
  }

  function slideRowRight(row) {
    var arr = row.filter(function (x) {
      return x !== 0;
    });
    var gained = 0;
    var i;
    for (i = arr.length - 1; i > 0; i--) {
      if (arr[i] === arr[i - 1]) {
        arr[i] *= 2;
        gained += arr[i];
        arr[i - 1] = 0;
        i--;
      }
    }
    arr = arr.filter(function (x) {
      return x !== 0;
    });
    while (arr.length < 4) arr.unshift(0);
    return { row: arr, gained: gained };
  }

  function rotateCW(g) {
    var n = emptyGrid();
    for (var r = 0; r < 4; r++)
      for (var c = 0; c < 4; c++) n[c][3 - r] = g[r][c];
    return n;
  }

  function moveDir(dir) {
    // 0 right, 1 down, 2 left, 3 up — rotate to right
    var g = grid;
    var k;
    for (k = 0; k < dir; k++) g = rotateCW(g);
    var moved = false;
    var gained = 0;
    var r;
    for (r = 0; r < 4; r++) {
      var before = g[r].slice();
      var res = slideRowRight(g[r]);
      g[r] = res.row;
      gained += res.gained;
      for (var c = 0; c < 4; c++) if (before[c] !== g[r][c]) moved = true;
    }
    for (k = 0; k < (4 - dir) % 4; k++) g = rotateCW(g);
    // fix: rotate back dir times inverse = (4-dir)%4 already above for non-zero
    // When dir=0, no rotate back needed — loop 0 times OK
    // When dir=1 (down): we rotated CW once to make down→right, then need 3 CW = 1 CCW
    // Actually after processing we did (4-dir)%4 CW which for dir=1 is 3 — correct restore
    if (!moved) return false;
    grid = g;
    score += gained;
    spawn(grid);
    if (scoreEl) scoreEl.textContent = String(score);
    checkWinLose();
    saveBest();
    render();
    return true;
  }

  // Recalculate rotate-back more carefully
  function move(dirName) {
    if (over) return;
    var map = { right: 0, down: 1, left: 2, up: 3 };
    var dir = map[dirName];
    if (dir == null) return;

    var g = grid.map(function (row) {
      return row.slice();
    });
    var rot;
    for (rot = 0; rot < dir; rot++) g = rotateCW(g);

    var moved = false;
    var gained = 0;
    for (var r = 0; r < 4; r++) {
      var before = g[r].join(",");
      var res = slideRowRight(g[r]);
      g[r] = res.row;
      gained += res.gained;
      if (g[r].join(",") !== before) moved = true;
    }

    for (rot = 0; rot < (4 - (dir % 4)) % 4; rot++) g = rotateCW(g);

    if (!moved) return;
    grid = g;
    score += gained;
    spawn(grid);
    if (scoreEl) scoreEl.textContent = String(score);
    checkWinLose();
    saveBest();
    render();
  }

  function canMove() {
    if (empties(grid).length) return true;
    var r, c;
    for (r = 0; r < 4; r++)
      for (c = 0; c < 4; c++) {
        var v = grid[r][c];
        if (c < 3 && grid[r][c + 1] === v) return true;
        if (r < 3 && grid[r + 1][c] === v) return true;
      }
    return false;
  }

  function checkWinLose() {
    var r, c;
    for (r = 0; r < 4; r++)
      for (c = 0; c < 4; c++) {
        if (grid[r][c] >= 2048 && !won) {
          won = true;
          setStatus("You made 2048! Keep going or New Game.");
          if (YG) {
            var prev = YG.loadJSON(YG.storageKey("tilefold", "2014"), {}) || {};
            prev.wins = (prev.wins || 0) + 1;
            prev.bestTile = Math.max(prev.bestTile || 0, 2048);
            prev.bestScore = Math.max(prev.bestScore || 0, score);
            prev.best = prev.bestScore;
            prev.gameId = "tilefold";
            prev.year = "2014";
            prev.real = true;
            prev.ts = Date.now();
            YG.saveJSON(YG.storageKey("tilefold", "2014"), prev);
          }
        }
      }
    if (!canMove()) {
      over = true;
      setStatus("Game over · score " + score);
    }
  }

  function saveBest() {
    if (!YG) return;
    var key = YG.storageKey("tilefold", "2014");
    var prev = YG.loadJSON(key, null) || {};
    var best = Math.max(prev.bestScore || prev.best || 0, score);
    var bestTile = prev.bestTile || 2;
    for (var r = 0; r < 4; r++)
      for (var c = 0; c < 4; c++) bestTile = Math.max(bestTile, grid[r][c]);
    YG.saveJSON(key, {
      gameId: "tilefold",
      year: "2014",
      best: best,
      bestScore: best,
      bestTile: bestTile,
      wins: prev.wins || 0,
      last: score,
      ts: Date.now(),
      real: true
    });
    if (bestEl) bestEl.textContent = String(best);
  }

  function color(v) {
    var map = {
      0: "#cdc1b4",
      2: "#eee4da",
      4: "#ede0c8",
      8: "#f2b179",
      16: "#f59563",
      32: "#f67c5f",
      64: "#f65e3b",
      128: "#edcf72",
      256: "#edcc61",
      512: "#edc850",
      1024: "#edc53f",
      2048: "#edc22e"
    };
    return map[v] || "#3c3a32";
  }

  function render() {
    if (!boardEl) return;
    boardEl.innerHTML = "";
    boardEl.style.cssText =
      "display:grid;grid-template-columns:repeat(4,70px);grid-template-rows:repeat(4,70px);gap:8px;background:#bbada0;padding:8px;width:fit-content;border-radius:6px";
    for (var r = 0; r < 4; r++) {
      for (var c = 0; c < 4; c++) {
        var v = grid[r][c];
        var cell = document.createElement("div");
        cell.style.cssText =
          "width:70px;height:70px;border-radius:4px;display:flex;align-items:center;justify-content:center;font-size:" +
          (v >= 1000 ? "18" : "24") +
          "px;font-weight:bold;background:" +
          color(v) +
          ";color:" +
          (v <= 4 ? "#776e65" : "#f9f6f2");
        cell.textContent = v ? String(v) : "";
        boardEl.appendChild(cell);
      }
    }
  }

  function newGame() {
    grid = emptyGrid();
    score = 0;
    won = false;
    over = false;
    spawn(grid);
    spawn(grid);
    if (scoreEl) scoreEl.textContent = "0";
    if (bestEl) bestEl.textContent = String(YG ? YG.loadBest("tilefold", "2014") : 0);
    setStatus("Arrow keys or WASD to slide");
    render();
  }

  if (YG && YG.focusHost) YG.focusHost("[data-year-game]");
  function onKey(e) {
    var k = e.key;
    if (k === "ArrowRight" || k === "d" || k === "D") {
      move("right");
      return true;
    }
    if (k === "ArrowLeft" || k === "a" || k === "A") {
      move("left");
      return true;
    }
    if (k === "ArrowUp" || k === "w" || k === "W") {
      move("up");
      return true;
    }
    if (k === "ArrowDown" || k === "s" || k === "S") {
      move("down");
      return true;
    }
    if (k === "r" || k === "R") {
      newGame();
      return true;
    }
    return false;
  }
  if (YG && YG.onKeys) YG.onKeys(onKey);
  else document.addEventListener("keydown", function (e) { if (onKey(e)) e.preventDefault(); }, true);

  // swipe
  var sx = 0;
  var sy = 0;
  if (boardEl) {
    boardEl.addEventListener(
      "touchstart",
      function (e) {
        if (e.touches[0]) {
          sx = e.touches[0].clientX;
          sy = e.touches[0].clientY;
        }
      },
      { passive: true }
    );
    boardEl.addEventListener(
      "touchend",
      function (e) {
        if (!e.changedTouches[0]) return;
        var dx = e.changedTouches[0].clientX - sx;
        var dy = e.changedTouches[0].clientY - sy;
        if (Math.abs(dx) < 24 && Math.abs(dy) < 24) return;
        if (Math.abs(dx) > Math.abs(dy)) move(dx > 0 ? "right" : "left");
        else move(dy > 0 ? "down" : "up");
      },
      { passive: true }
    );
  }

  if (newBtn) newBtn.addEventListener("click", newGame);
  host.querySelectorAll("[data-tf-dir]").forEach(function (btn) {
    btn.addEventListener("click", function () {
      move(btn.getAttribute("data-tf-dir"));
      if (YG && YG.focusHost) YG.focusHost("[data-year-game]");
    });
  });
  newGame();
})();
