/**
 * Applet Checkers — 1995 (complex)
 * Full American rules: mandatory captures, multi-jump chains, king both ways,
 * AI: win > block > capture max > center.
 */
(function () {
  "use strict";
  var YG = (window.ITT && ITT.YearGame) || null;
  var host = document.querySelector('[data-year-game][data-game-id="checkers"]');
  if (!host) return;

  var boardEl = host.querySelector("[data-checkers-board]");
  var statusEl = host.querySelector("[data-itt-action-status]");
  var loadEl = host.querySelector("[data-applet-load]");
  var startBtn = host.querySelector("[data-game-start]");
  var resignBtn = host.querySelector("[data-game-resign]");
  var winsEl = host.querySelector("[data-wins]");
  var lossesEl = host.querySelector("[data-losses]");
  var drawsEl = host.querySelector("[data-draws]");
  var modeAi = host.querySelector("[data-mode-ai]");
  var hintEl = host.querySelector("[data-hint]");

  // 0 empty · 1/2 dark man/king · -1/-2 light
  var board = [];
  var turn = 1;
  var selected = null;
  var chainFrom = null; // {r,c} when mid multi-jump
  var state = "idle";
  var vsAi = true;
  var legalCache = [];
  var moveCount = 0;

  function key() {
    return YG ? YG.storageKey("checkers", "1995") : "itt95-game-checkers";
  }
  function loadStats() {
    return (YG && YG.loadJSON(key(), null)) || { wins: 0, losses: 0, draws: 0 };
  }
  function saveStats(result) {
    var s = loadStats();
    if (result === "win") s.wins = (s.wins || 0) + 1;
    else if (result === "loss") s.losses = (s.losses || 0) + 1;
    else s.draws = (s.draws || 0) + 1;
    s.gameId = "checkers";
    s.year = "1995";
    s.lastResult = result;
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
    if (statusEl) statusEl.textContent = m;
  }
  function darkSq(r, c) {
    return (r + c) % 2 === 1;
  }
  function sideOf(p) {
    return p > 0 ? 1 : p < 0 ? -1 : 0;
  }
  function isKing(p) {
    return Math.abs(p) === 2;
  }
  function inB(r, c) {
    return r >= 0 && r < 8 && c >= 0 && c < 8;
  }
  function clone(b) {
    var n = [];
    for (var r = 0; r < 8; r++) n[r] = b[r].slice();
    return n;
  }

  function resetBoard() {
    board = [];
    for (var r = 0; r < 8; r++) {
      board[r] = [];
      for (var c = 0; c < 8; c++) {
        board[r][c] = 0;
        if (!darkSq(r, c)) continue;
        if (r < 3) board[r][c] = -1;
        if (r > 4) board[r][c] = 1;
      }
    }
    turn = 1;
    selected = null;
    chainFrom = null;
    moveCount = 0;
  }

  /** dirs for piece */
  function dirsFor(p) {
    if (isKing(p))
      return [
        [-1, -1],
        [-1, 1],
        [1, -1],
        [1, 1]
      ];
    if (p > 0)
      return [
        [-1, -1],
        [-1, 1]
      ]; // dark up
    return [
      [1, -1],
      [1, 1]
    ];
  }

  /**
   * Generate all capture sequences from (r,c) on board b.
   * Returns array of {path:[{r,c},...], caps:[{r,c},...]} path includes start.
   */
  function captureSequences(b, r, c, side) {
    var p = b[r][c];
    if (sideOf(p) !== side) return [];
    var results = [];
    function dfs(bb, rr, cc, path, caps, piece) {
      var dirs = dirsFor(piece);
      // men capture only forward; kings all — already in dirsFor
      // but men capturing: American rules men capture forward only
      var found = false;
      for (var d = 0; d < dirs.length; d++) {
        var mr = rr + dirs[d][0];
        var mc = cc + dirs[d][1];
        var lr = rr + dirs[d][0] * 2;
        var lc = cc + dirs[d][1] * 2;
        if (!inB(mr, mc) || !inB(lr, lc)) continue;
        if (sideOf(bb[mr][mc]) !== -side) continue;
        if (bb[lr][lc] !== 0) continue;
        // already captured this piece?
        var dup = false;
        for (var i = 0; i < caps.length; i++) {
          if (caps[i].r === mr && caps[i].c === mc) {
            dup = true;
            break;
          }
        }
        if (dup) continue;
        found = true;
        var nb = clone(bb);
        nb[rr][cc] = 0;
        nb[mr][mc] = 0;
        var np = piece;
        // promote mid-sequence? American: promote only when turn ends on last rank
        nb[lr][lc] = np;
        dfs(nb, lr, lc, path.concat([{ r: lr, c: lc }]), caps.concat([{ r: mr, c: mc }]), np);
      }
      if (!found && caps.length) {
        results.push({ path: path, caps: caps });
      }
    }
    dfs(b, r, c, [{ r: r, c: c }], [], p);
    return results;
  }

  function quietMoves(b, r, c, side) {
    var p = b[r][c];
    if (sideOf(p) !== side) return [];
    var out = [];
    var dirs = dirsFor(p);
    for (var d = 0; d < dirs.length; d++) {
      var nr = r + dirs[d][0];
      var nc = c + dirs[d][1];
      if (inB(nr, nc) && b[nr][nc] === 0) {
        out.push({
          path: [
            { r: r, c: c },
            { r: nr, c: nc }
          ],
          caps: []
        });
      }
    }
    return out;
  }

  function allMoves(b, side, fromOnly) {
    var caps = [];
    var quiet = [];
    for (var r = 0; r < 8; r++) {
      for (var c = 0; c < 8; c++) {
        if (sideOf(b[r][c]) !== side) continue;
        if (fromOnly && (r !== fromOnly.r || c !== fromOnly.c)) continue;
        var seq = captureSequences(b, r, c, side);
        for (var i = 0; i < seq.length; i++) caps.push(seq[i]);
        if (!fromOnly) {
          var q = quietMoves(b, r, c, side);
          for (var j = 0; j < q.length; j++) quiet.push(q[j]);
        }
      }
    }
    if (caps.length) return caps; // mandatory capture
    return quiet;
  }

  function applyMove(b, move) {
    var nb = clone(b);
    var start = move.path[0];
    var end = move.path[move.path.length - 1];
    var p = nb[start.r][start.c];
    nb[start.r][start.c] = 0;
    for (var i = 0; i < move.caps.length; i++) {
      nb[move.caps[i].r][move.caps[i].c] = 0;
    }
    // promote at end of turn if on last rank
    if (p === 1 && end.r === 0) p = 2;
    if (p === -1 && end.r === 7) p = -2;
    nb[end.r][end.c] = p;
    return nb;
  }

  function countSide(b, side) {
    var n = 0;
    for (var r = 0; r < 8; r++)
      for (var c = 0; c < 8; c++) if (sideOf(b[r][c]) === side) n++;
    return n;
  }

  function refreshLegal() {
    if (chainFrom) {
      legalCache = allMoves(board, turn, chainFrom);
    } else {
      legalCache = allMoves(board, turn, null);
    }
  }

  function targetsFrom(r, c) {
    var ends = [];
    for (var i = 0; i < legalCache.length; i++) {
      var m = legalCache[i];
      if (m.path[0].r === r && m.path[0].c === c) {
        var e = m.path[m.path.length - 1];
        ends.push({ r: e.r, c: e.c, move: m });
      }
    }
    return ends;
  }

  function render() {
    if (!boardEl) return;
    refreshLegal();
    boardEl.innerHTML = "";
    boardEl.style.cssText =
      "display:grid;grid-template-columns:repeat(8,40px);grid-template-rows:repeat(8,40px);width:320px;border:4px solid #333;margin:8px 0;box-shadow:2px 2px 0 #000";
    var destSet = {};
    if (selected) {
      var tgs = targetsFrom(selected.r, selected.c);
      for (var t = 0; t < tgs.length; t++) destSet[tgs[t].r + "," + tgs[t].c] = tgs[t].move;
    }
    for (var r = 0; r < 8; r++) {
      for (var c = 0; c < 8; c++) {
        (function (rr, cc) {
          var cell = document.createElement("button");
          cell.type = "button";
          var dark = darkSq(rr, cc);
          var key2 = rr + "," + cc;
          var isDest = !!destSet[key2];
          var isSel = selected && selected.r === rr && selected.c === cc;
          if (isDest) cell.setAttribute("data-dest", "1");
          if (isSel) cell.setAttribute("data-selected", "1");
          cell.style.cssText =
            "width:40px;height:40px;padding:0;border:0;font-size:22px;line-height:40px;cursor:" +
            (dark ? "pointer" : "default") +
            ";background:" +
            (isDest ? "#66cc66" : isSel ? "#cccc66" : dark ? "#5a3a1a" : "#e8d5a3") +
            ";";
          var p = board[rr][cc];
          if (p === 1) {
            cell.textContent = "●";
            cell.style.color = "#111";
          } else if (p === 2) {
            cell.textContent = "◆";
            cell.style.color = "#111";
          } else if (p === -1) {
            cell.textContent = "●";
            cell.style.color = "#f5f5f5";
          } else if (p === -2) {
            cell.textContent = "◆";
            cell.style.color = "#f5f5f5";
          }
          cell.title = isDest ? "Move here" : "";
          cell.addEventListener("click", function () {
            onCell(rr, cc, destSet);
          });
          boardEl.appendChild(cell);
        })(r, c);
      }
    }
    if (hintEl) {
      var caps = legalCache.filter(function (m) {
        return m.caps.length;
      }).length;
      hintEl.textContent =
        caps > 0
          ? "Captures available (" + caps + ") — must capture"
          : legalCache.length + " legal move(s)";
    }
  }

  function onCell(r, c, destSet) {
    if (state !== "play") return;
    if (vsAi && turn === -1) return;
    var key2 = r + "," + c;
    if (selected && destSet[key2]) {
      doPlayerMove(destSet[key2]);
      return;
    }
    if (chainFrom) {
      // must continue from chain piece only
      if (r === chainFrom.r && c === chainFrom.c) {
        selected = { r: r, c: c };
        render();
      }
      return;
    }
    if (sideOf(board[r][c]) === turn) {
      var tgs = targetsFrom(r, c);
      if (!tgs.length && legalCache.some(function (m) { return m.caps.length; })) {
        setStatus("A capture is required elsewhere");
        return;
      }
      selected = { r: r, c: c };
      render();
      setStatus(tgs.length ? "Select destination (highlighted)" : "No moves for that piece");
    }
  }

  function finishTurn() {
    selected = null;
    chainFrom = null;
    moveCount++;
    var opp = -turn;
    if (!countSide(board, opp) || !allMoves(board, opp, null).length) {
      endGame(turn === 1 ? "win" : "loss");
      return;
    }
    if (!countSide(board, turn) || !allMoves(board, turn, null).length) {
      endGame(turn === 1 ? "loss" : "win");
      return;
    }
    // draw-ish: 80 moves without capture tracked simply by moveCount
    turn = opp;
    if (vsAi && turn === -1) {
      setStatus("Computer thinking…");
      render();
      setTimeout(aiMove, 450 + Math.random() * 350);
    } else {
      setStatus(turn === 1 ? "Your move (dark)" : "Light's move");
      render();
    }
  }

  function doPlayerMove(move) {
    board = applyMove(board, move);
    // multi-jump already fully in path — entire sequence applied
    finishTurn();
  }

  function scoreMove(b, move, side) {
    var sc = move.caps.length * 100;
    var end = move.path[move.path.length - 1];
    // center bias
    sc += (3.5 - Math.abs(end.r - 3.5)) * 2;
    sc += (3.5 - Math.abs(end.c - 3.5)) * 2;
    // promotion
    var p = b[move.path[0].r][move.path[0].c];
    if (p === side && ((side === 1 && end.r === 0) || (side === -1 && end.r === 7))) sc += 50;
    // after move, does opponent have immediate big capture?
    var nb = applyMove(b, move);
    var oppCaps = allMoves(nb, -side, null).filter(function (m) {
      return m.caps.length;
    });
    var maxOpp = 0;
    for (var i = 0; i < oppCaps.length; i++) maxOpp = Math.max(maxOpp, oppCaps[i].caps.length);
    sc -= maxOpp * 80;
    // win
    if (!countSide(nb, -side) || !allMoves(nb, -side, null).length) sc += 10000;
    return sc;
  }

  function aiMove() {
    if (state !== "play" || turn !== -1) return;
    var moves = allMoves(board, -1, null);
    if (!moves.length) {
      endGame("win");
      return;
    }
    var best = moves[0];
    var bestSc = -1e9;
    for (var i = 0; i < moves.length; i++) {
      var sc = scoreMove(board, moves[i], -1);
      // tiny random for variety
      sc += Math.random() * 3;
      if (sc > bestSc) {
        bestSc = sc;
        best = moves[i];
      }
    }
    board = applyMove(board, best);
    setStatus(
      best.caps.length
        ? "Computer captures " + best.caps.length + "!"
        : "Computer moves"
    );
    finishTurn();
  }

  function endGame(result) {
    state = "over";
    if (vsAi) {
      if (result === "win") {
        setStatus("You win!");
        saveStats("win");
      } else if (result === "loss") {
        setStatus("Computer wins.");
        saveStats("loss");
      } else {
        setStatus("Draw.");
        saveStats("draw");
      }
    } else {
      setStatus(result === "win" ? "Dark wins" : result === "loss" ? "Light wins" : "Draw");
      saveStats(result === "win" ? "win" : result === "loss" ? "loss" : "draw");
    }
    render();
  }

  function startGame() {
    vsAi = !modeAi || modeAi.checked;
    resetBoard();
    state = "loading";
    if (loadEl) {
      loadEl.style.display = "block";
      loadEl.textContent = "Loading Java Applet… 0%";
    }
    if (startBtn) startBtn.disabled = true;
    var p = 0;
    var iv = setInterval(function () {
      p += 25;
      if (loadEl) loadEl.textContent = "Loading Java Applet… " + Math.min(100, p) + "%";
      if (p >= 100) {
        clearInterval(iv);
        if (loadEl) loadEl.textContent = "Applet started · multi-jump enabled";
        state = "play";
        setStatus("Your move (dark) · captures mandatory · kings move both ways");
        if (startBtn) startBtn.disabled = false;
        render();
        setTimeout(function () {
          if (loadEl) loadEl.style.display = "none";
        }, 700);
      }
    }, YG && YG.isFast() ? 15 : 100);
  }

  if (startBtn) startBtn.addEventListener("click", startGame);
  if (resignBtn) {
    resignBtn.addEventListener("click", function () {
      if (state !== "play") return;
      endGame("loss");
      setStatus("You resign.");
    });
  }

  if (YG && YG.focusHost) YG.focusHost("[data-year-game]");
  paintStats();
  resetBoard();
  render();
  setStatus("Press Start — full rules · multi-jump · smart AI");
})();
