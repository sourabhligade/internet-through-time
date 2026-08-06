/**
 * Lobby Connect Four — 1997 museum year game.
 */
(function () {
  "use strict";
  var YG = (window.ITT && ITT.YearGame) || null;
  var host = document.querySelector('[data-year-game][data-game-id="connect4"]');
  if (!host) return;

  var boardEl = host.querySelector("[data-c4-board]");
  var statusEl = host.querySelector("[data-itt-action-status]");
  var lobbyEl = host.querySelector("[data-lobby-log]");
  var startBtn = host.querySelector("[data-game-start]");
  var resignBtn = host.querySelector("[data-game-resign]");
  var winsEl = host.querySelector("[data-wins]");
  var lossesEl = host.querySelector("[data-losses]");
  var drawsEl = host.querySelector("[data-draws]");

  // board[row][col] 0 empty 1 red(player) 2 yellow(ai); row 0 top, row 5 bottom
  var board = [];
  var state = "idle";
  var turn = 1;

  function key() {
    return YG ? YG.storageKey("connect4", "1997") : "itt97-game-connect4";
  }
  function loadStats() {
    return (YG && YG.loadJSON(key(), null)) || { wins: 0, losses: 0, draws: 0 };
  }
  function saveStats(result) {
    var s = loadStats();
    if (result === "win") s.wins = (s.wins || 0) + 1;
    else if (result === "loss") s.losses = (s.losses || 0) + 1;
    else s.draws = (s.draws || 0) + 1;
    s.gameId = "connect4";
    s.year = "1997";
    s.ts = Date.now();
    s.real = true;
    if (YG) YG.saveJSON(key(), s);
    paintStats();
  }
  function paintStats() {
    var s = loadStats();
    if (winsEl) winsEl.textContent = String(s.wins || 0);
    if (lossesEl) lossesEl.textContent = String(s.losses || 0);
    if (drawsEl) drawsEl.textContent = String(s.draws || 0);
  }
  function setStatus(m) {
    if (YG) YG.setStatus(statusEl, m);
    else if (statusEl) statusEl.textContent = m;
  }

  function reset() {
    board = [];
    for (var r = 0; r < 6; r++) {
      board[r] = [];
      for (var c = 0; c < 7; c++) board[r][c] = 0;
    }
    turn = 1;
  }

  function drop(col, player) {
    for (var r = 5; r >= 0; r--) {
      if (board[r][col] === 0) {
        board[r][col] = player;
        return r;
      }
    }
    return -1;
  }

  function hasWin(player) {
    var dirs = [
      [1, 0],
      [0, 1],
      [1, 1],
      [1, -1]
    ];
    for (var r = 0; r < 6; r++) {
      for (var c = 0; c < 7; c++) {
        if (board[r][c] !== player) continue;
        for (var d = 0; d < dirs.length; d++) {
          var n = 1;
          for (var k = 1; k < 4; k++) {
            var rr = r + dirs[d][0] * k;
            var cc = c + dirs[d][1] * k;
            if (rr < 0 || rr >= 6 || cc < 0 || cc >= 7 || board[rr][cc] !== player) break;
            n++;
          }
          if (n >= 4) return true;
        }
      }
    }
    return false;
  }

  function isFull() {
    for (var c = 0; c < 7; c++) if (board[0][c] === 0) return false;
    return true;
  }

  function render() {
    if (!boardEl) return;
    boardEl.innerHTML = "";
    boardEl.style.cssText =
      "display:grid;grid-template-columns:repeat(7,40px);gap:4px;background:#00a;padding:8px;width:fit-content";
    for (var r = 0; r < 6; r++) {
      for (var c = 0; c < 7; c++) {
        (function (rr, cc) {
          var cell = document.createElement("button");
          cell.type = "button";
          cell.style.cssText =
            "width:40px;height:40px;border-radius:50%;border:2px solid #003;background:" +
            (board[rr][cc] === 1 ? "#c00" : board[rr][cc] === 2 ? "#cc0" : "#eee") +
            ";cursor:pointer;padding:0";
          cell.addEventListener("click", function () {
            onCol(cc);
          });
          boardEl.appendChild(cell);
        })(r, c);
      }
    }
  }

  function onCol(c) {
    if (state !== "play" || turn !== 1) return;
    if (drop(c, 1) < 0) {
      setStatus("Column full");
      return;
    }
    render();
    if (hasWin(1)) {
      state = "over";
      setStatus("You win!");
      saveStats("win");
      return;
    }
    if (isFull()) {
      state = "over";
      setStatus("Draw");
      saveStats("draw");
      return;
    }
    turn = 2;
    setStatus("Computer…");
    setTimeout(aiMove, 400);
  }

  function aiMove() {
    if (state !== "play") return;
    // win / block / prefer center
    var order = [3, 2, 4, 1, 5, 0, 6];
    var c, r, i;
    function tryPlayer(p) {
      for (i = 0; i < order.length; i++) {
        c = order[i];
        r = drop(c, p);
        if (r < 0) continue;
        var win = hasWin(p);
        board[r][c] = 0;
        if (win) return c;
      }
      return -1;
    }
    var col = tryPlayer(2);
    if (col < 0) col = tryPlayer(1);
    if (col < 0) {
      for (i = 0; i < order.length; i++) {
        if (board[0][order[i]] === 0) {
          col = order[i];
          break;
        }
      }
    }
    if (col < 0) {
      state = "over";
      setStatus("Draw");
      saveStats("draw");
      return;
    }
    drop(col, 2);
    render();
    if (hasWin(2)) {
      state = "over";
      setStatus("Computer wins.");
      saveStats("loss");
      return;
    }
    if (isFull()) {
      state = "over";
      setStatus("Draw");
      saveStats("draw");
      return;
    }
    turn = 1;
    setStatus("Your move (red)");
  }

  function findGame() {
    if (startBtn) startBtn.disabled = true;
    state = "lobby";
    var lines = [
      "Searching lobby…",
      "Found table #17",
      "Opponent: Guest_" + (100 + Math.floor(Math.random() * 900)),
      "Game start!"
    ];
    var i = 0;
    if (lobbyEl) lobbyEl.textContent = "";
    function step() {
      if (lobbyEl) lobbyEl.textContent += lines[i] + "\n";
      i++;
      if (i < lines.length) {
        setTimeout(step, YG && YG.isFast() ? 50 : 300);
      } else {
        reset();
        state = "play";
        turn = 1;
        render();
        setStatus("Your move (red)");
        if (startBtn) startBtn.disabled = false;
      }
    }
    step();
  }

  if (startBtn) startBtn.addEventListener("click", findGame);
  if (resignBtn) {
    resignBtn.addEventListener("click", function () {
      if (state !== "play") return;
      state = "over";
      setStatus("You resign.");
      saveStats("loss");
    });
  }

  if (YG && YG.focusHost) YG.focusHost("[data-year-game]");
  paintStats();
  reset();
  render();
  setStatus("Click Find game for lobby theater");
})();
