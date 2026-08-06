/**
 * Box Shift — 2007 complex portal-puzzle
 * Symbols: # wall · . floor · @ player · B box · G goal · * box-on-goal
 *           A padA · C padB (teleport pair) · o button · D door (opens with box on o)
 */
(function () {
  "use strict";
  var YG = (window.ITT && ITT.YearGame) || null;
  var host = document.querySelector('[data-year-game][data-game-id="boxshift"]');
  if (!host) return;
  var pre = host.querySelector("[data-level]");
  var statusEl = host.querySelector("[data-itt-action-status]");
  var levelEl = host.querySelector("[data-level-num]");
  var movesEl = host.querySelector("[data-moves]");

  var LEVELS = [
    // 1 push
    ["######", "#@B.G#", "######"],
    // 2 corner
    ["#######", "#@....#", "#.B#..#", "#...G.#", "#######"],
    // 3 two boxes (only need one on G for simplicity - use one G)
    ["########", "#@..B..#", "#..##..#", "#....G.#", "########"],
    // 4 teleport intro: A <-> C
    ["#########", "#@..A...#", "#...B...#", "#...C.G.#", "#########"],
    // 5 button door
    ["##########", "#@..o...D#", "#...B...D#", "#.......G#", "##########"],
    // 6 combo
    ["##########", "#@A..B..C#", "#.####...#", "#o..D...G#", "##########"],
    // 7 longer
    [
      "############",
      "#@.........#",
      "#.######B..#",
      "#.#....#...#",
      "#.#.A..#.C.#",
      "#.#....#...#",
      "#.######.G.#",
      "############"
    ]
  ];

  var level = 0;
  var grid = [];
  var pr = 0,
    pc = 0;
  var moves = 0;
  var doorOpen = false;
  var key = YG ? YG.storageKey("boxshift", "2007") : "itt07-game-boxshift";

  function loadProgress() {
    return (YG && YG.loadJSON(key, null)) || { maxLevelCleared: 0, bestMoves: {} };
  }
  function saveProgress(cleared, mv) {
    var p = loadProgress();
    p.maxLevelCleared = Math.max(p.maxLevelCleared || 0, cleared);
    p.bestMoves = p.bestMoves || {};
    var id = String(cleared);
    if (p.bestMoves[id] == null || mv < p.bestMoves[id]) p.bestMoves[id] = mv;
    p.gameId = "boxshift";
    p.year = "2007";
    p.real = true;
    p.best = p.maxLevelCleared;
    p.ts = Date.now();
    if (YG) YG.saveJSON(key, p);
  }

  function parse(L) {
    grid = L.map(function (row) {
      return row.split("");
    });
    doorOpen = false;
    moves = 0;
    for (var r = 0; r < grid.length; r++)
      for (var c = 0; c < grid[r].length; c++) {
        if (grid[r][c] === "@") {
          pr = r;
          pc = c;
          grid[r][c] = ".";
        }
      }
    refreshDoors();
  }

  function findPads() {
    var A = null,
      C = null;
    for (var r = 0; r < grid.length; r++)
      for (var c = 0; c < grid[r].length; c++) {
        if (grid[r][c] === "A") A = { r: r, c: c };
        if (grid[r][c] === "C") C = { r: r, c: c };
      }
    return { A: A, C: C };
  }

  function buttonPressed() {
    for (var r = 0; r < grid.length; r++)
      for (var c = 0; c < grid[r].length; c++) {
        if (grid[r][c] === "o") {
          // box on button? we store box on button as 'Q'
          return false;
        }
        if (grid[r][c] === "Q") return true;
      }
    // also if player stands on o — no; need box. Check if any B is where floor was o — use Q
    return false;
  }

  function refreshDoors() {
    doorOpen = false;
    for (var r = 0; r < grid.length; r++)
      for (var c = 0; c < grid[r].length; c++) {
        if (grid[r][c] === "Q") doorOpen = true;
      }
  }

  function isSolid(r, c) {
    if (r < 0 || c < 0 || r >= grid.length || c >= grid[0].length) return true;
    var ch = grid[r][c];
    if (ch === "#") return true;
    if ((ch === "D" || ch === "d") && !doorOpen) return true;
    return false;
  }

  function canEnterBox(r, c) {
    if (isSolid(r, c)) return false;
    var ch = grid[r][c];
    if (ch === "B" || ch === "*" || ch === "Q") return false;
    return true;
  }

  function render() {
    if (levelEl) levelEl.textContent = String(level + 1) + " / " + LEVELS.length;
    if (movesEl) movesEl.textContent = String(moves);
    if (!pre) return;
    var lines = [];
    for (var r = 0; r < grid.length; r++) {
      var row = grid[r].slice();
      // show open door
      for (var c = 0; c < row.length; c++) {
        if ((row[c] === "D" || row[c] === "d") && doorOpen) row[c] = "_";
      }
      if (r === pr) {
        var under = row[pc];
        row[pc] = under === "G" ? "+" : under === "A" || under === "C" ? "@" : "@";
      }
      lines.push(row.join(""));
    }
    pre.textContent = lines.join("\n");
  }

  function teleportIfNeeded(entity) {
    // entity is player or we teleport box when landing on pad
    var pads = findPads();
    if (!pads.A || !pads.C) return;
    var r = entity === "player" ? pr : entity.r;
    var c = entity === "player" ? pc : entity.c;
    var dest = null;
    if (grid[r][c] === "A" || (entity === "player" && r === pads.A.r && c === pads.A.c)) {
      // standing on A cell — pads stay as letters underfoot
      dest = pads.C;
    } else if (grid[r][c] === "C" || (entity === "player" && r === pads.C.r && c === pads.C.c)) {
      dest = pads.A;
    }
    // detect player on pad by coordinate match (pads not overwritten)
    if (entity === "player") {
      if (pr === pads.A.r && pc === pads.A.c) dest = pads.C;
      else if (pr === pads.C.r && pc === pads.C.c) dest = pads.A;
      else dest = null;
      if (dest && !isSolid(dest.r, dest.c) && grid[dest.r][dest.c] !== "B" && grid[dest.r][dest.c] !== "*" && grid[dest.r][dest.c] !== "Q") {
        pr = dest.r;
        pc = dest.c;
        if (statusEl) statusEl.textContent = "Teleported!";
      }
    }
  }

  function tryMove(dr, dc) {
    var nr = pr + dr,
      nc = pc + dc;
    if (isSolid(nr, nc)) return;
    var ch = grid[nr][nc];
    if (ch === "B" || ch === "*" || ch === "Q") {
      var br = nr + dr,
        bc = nc + dc;
      if (!canEnterBox(br, bc)) return;
      // move box
      var destCh = grid[br][bc];
      // clear old
      if (ch === "*") grid[nr][nc] = "G";
      else if (ch === "Q") grid[nr][nc] = "o";
      else grid[nr][nc] = ".";
      // restore pad letters if we had overwrote — pads are never B
      // place box
      if (destCh === "G") grid[br][bc] = "*";
      else if (destCh === "o") grid[br][bc] = "Q";
      else if (destCh === "A" || destCh === "C") {
        grid[br][bc] = "B"; // box on pad; teleport box?
        // teleport box through pad
        var pads = findPads();
        var dest = destCh === "A" ? pads.C : pads.A;
        if (dest && canEnterBox(dest.r, dest.c) && !(dest.r === br && dest.c === bc)) {
          grid[br][bc] = destCh;
          var dch = grid[dest.r][dest.c];
          grid[dest.r][dest.c] = dch === "G" ? "*" : dch === "o" ? "Q" : "B";
        }
      } else grid[br][bc] = "B";
    } else if (ch === "D" && !doorOpen) return;

    pr = nr;
    pc = nc;
    moves++;
    refreshDoors();
    // player teleport
    var pads2 = findPads();
    if (pads2.A && pads2.C) {
      if (pr === pads2.A.r && pc === pads2.A.c) {
        if (!isSolid(pads2.C.r, pads2.C.c) && grid[pads2.C.r][pads2.C.c] !== "B" && grid[pads2.C.r][pads2.C.c] !== "*" && grid[pads2.C.r][pads2.C.c] !== "Q") {
          pr = pads2.C.r;
          pc = pads2.C.c;
          if (statusEl) statusEl.textContent = "Portal hop!";
        }
      } else if (pr === pads2.C.r && pc === pads2.C.c) {
        if (!isSolid(pads2.A.r, pads2.A.c) && grid[pads2.A.r][pads2.A.c] !== "B" && grid[pads2.A.r][pads2.A.c] !== "*" && grid[pads2.A.r][pads2.A.c] !== "Q") {
          pr = pads2.A.r;
          pc = pads2.A.c;
          if (statusEl) statusEl.textContent = "Portal hop!";
        }
      }
    }
    render();
    checkWin();
  }

  function checkWin() {
    var goals = 0,
      filled = 0;
    for (var r = 0; r < grid.length; r++)
      for (var c = 0; c < grid[r].length; c++) {
        if (grid[r][c] === "G") goals++;
        if (grid[r][c] === "*") {
          goals++;
          filled++;
        }
      }
    // win if no empty G left (all goals are *)
    var emptyG = 0;
    for (r = 0; r < grid.length; r++)
      for (c = 0; c < grid[r].length; c++) if (grid[r][c] === "G") emptyG++;
    if (emptyG === 0 && filled > 0) {
      saveProgress(level + 1, moves);
      if (statusEl) statusEl.textContent = "Level clear in " + moves + " moves!";
      if (level < LEVELS.length - 1) {
        setTimeout(function () {
          level++;
          parse(LEVELS[level]);
          render();
          if (statusEl)
            statusEl.textContent =
              "Level " +
              (level + 1) +
              " · # wall · B box · G goal · A/C portals · o button · D door";
        }, 700);
      } else if (statusEl) statusEl.textContent = "All " + LEVELS.length + " levels complete!";
    }
  }

  if (YG && YG.focusHost) YG.focusHost("[data-year-game]");
  function onKey(e) {
    var k = e.key;
    if (k === "ArrowUp" || k === "w" || k === "W") {
      tryMove(-1, 0);
      return true;
    }
    if (k === "ArrowDown" || k === "s" || k === "S") {
      tryMove(1, 0);
      return true;
    }
    if (k === "ArrowLeft" || k === "a" || k === "A") {
      tryMove(0, -1);
      return true;
    }
    if (k === "ArrowRight" || k === "d" || k === "D") {
      tryMove(0, 1);
      return true;
    }
    if (k === "r" || k === "R") {
      parse(LEVELS[level]);
      render();
      return true;
    }
    if (k === "n" || k === "N") {
      if (level < LEVELS.length - 1) {
        level++;
        parse(LEVELS[level]);
        render();
      }
      return true;
    }
    if (k === "p" || k === "P") {
      if (level > 0) {
        level--;
        parse(LEVELS[level]);
        render();
      }
      return true;
    }
    return false;
  }
  if (YG && YG.onKeys) YG.onKeys(onKey);
  else document.addEventListener("keydown", function (e) { if (onKey(e)) e.preventDefault(); }, true);

  // On-screen D-pad so play works without keyboard focus
  var pad = host.querySelector("[data-dpad]");
  if (pad) {
    pad.querySelectorAll("[data-dir]").forEach(function (btn) {
      btn.addEventListener("click", function () {
        var d = btn.getAttribute("data-dir");
        if (d === "up") tryMove(-1, 0);
        if (d === "down") tryMove(1, 0);
        if (d === "left") tryMove(0, -1);
        if (d === "right") tryMove(0, 1);
        if (YG && YG.focusHost) YG.focusHost("[data-year-game]");
      });
    });
  }

  var rst = host.querySelector("[data-restart]");
  if (rst)
    rst.addEventListener("click", function () {
      parse(LEVELS[level]);
      render();
    });
  var next = host.querySelector("[data-next]");
  if (next)
    next.addEventListener("click", function () {
      if (level < LEVELS.length - 1) {
        level++;
        parse(LEVELS[level]);
        render();
      }
    });

  // resume last level
  var prog = loadProgress();
  if (prog.maxLevelCleared > 0) level = Math.min(prog.maxLevelCleared, LEVELS.length - 1);

  parse(LEVELS[level]);
  render();
  if (statusEl)
    statusEl.textContent =
      "Arrows move · R restart · N/P level · A/C portals · o+D button door · push B to G";
})();
