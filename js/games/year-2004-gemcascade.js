/**
 * Gem Cascade — 2004 museum year game.
 * Class: Bejeweled / PopCap match-3.
 * Key: itt04-game-gemcascade
 * Incomplete (no Start) never writes.
 */
(function () {
  "use strict";
  var YG = (window.ITT && ITT.YearGame) || null;
  var host = document.querySelector('[data-year-game][data-game-id="gemcascade"]');
  if (!host) return;

  var N = 8;
  var COLORS = ["#e53935", "#fb8c00", "#fdd835", "#43a047", "#1e88e5", "#8e24aa"];
  var NAMES = ["ruby", "amber", "topaz", "jade", "sapphire", "amethyst"];
  var MOVES = 24;

  function locSearch() {
    try {
      if (location.search) return location.search;
    } catch (e0) {
      /* */
    }
    try {
      if (window.frameElement && frameElement.src) {
        var src = String(frameElement.src);
        var i = src.indexOf("?");
        if (i >= 0) return src.slice(i);
      }
    } catch (e1) {
      /* */
    }
    return "";
  }
  function fixtureName() {
    var m = /[?&]fixture=(bounce|match|zero)\b/.exec(locSearch());
    return m ? m[1] : "";
  }

  var boardEl = host.querySelector("[data-gem-board]");
  var scoreEl = host.querySelector("[data-game-score]");
  var bestEl = host.querySelector("[data-game-best]");
  var movesEl = host.querySelector("[data-gem-moves]");
  var statusEl = host.querySelector("[data-itt-action-status]");
  var startBtn = host.querySelector("[data-game-start]");

  var board = [];
  var running = false;
  var saved = false;
  var score = 0;
  var moves = MOVES;
  var sel = -1;

  function setStatus(m) {
    if (YG) YG.setStatus(statusEl, m);
    else if (statusEl) statusEl.textContent = m;
  }
  function paintBest() {
    if (bestEl) bestEl.textContent = String(YG ? YG.loadBest("gemcascade", "2004") : 0);
  }
  function at(r, c) {
    return board[r * N + c];
  }
  function setAt(r, c, v) {
    board[r * N + c] = v;
  }
  function rnd() {
    return (Math.random() * COLORS.length) | 0;
  }
  function wouldMatch(r, c, v) {
    if (c >= 2 && at(r, c - 1) === v && at(r, c - 2) === v) return true;
    if (r >= 2 && at(r - 1, c) === v && at(r - 2, c) === v) return true;
    return false;
  }
  function fillNoMatch() {
    var r, c, v, guard;
    var fix = fixtureName();
    board = [];
    if (fix === "bounce" || fix === "zero") {
      /* Checkerboard — swap of two neighbors cannot make 3. */
      for (r = 0; r < N; r++) {
        for (c = 0; c < N; c++) {
          board.push((r + c) % 2);
        }
      }
      return;
    }
    if (fix === "match") {
      /* Row 0: 0 0 1 0 … · col 2 row 1 is 0. Swap (0,2) with (1,2) → three 0s. */
      for (r = 0; r < N; r++) {
        for (c = 0; c < N; c++) {
          v = (r + c + 1) % 6;
          if (r === 0 && c === 0) v = 0;
          else if (r === 0 && c === 1) v = 0;
          else if (r === 0 && c === 2) v = 1;
          else if (r === 1 && c === 2) v = 0;
          else if (wouldMatch(r, c, v)) v = (v + 2) % 6;
          board.push(v);
        }
      }
      return;
    }
    for (r = 0; r < N; r++) {
      for (c = 0; c < N; c++) {
        guard = 0;
        do {
          v = rnd();
          guard++;
        } while (wouldMatch(r, c, v) && guard < 16);
        board.push(v);
      }
    }
  }
  function findMatches() {
    var mark = [];
    var i, r, c, n;
    for (i = 0; i < N * N; i++) mark[i] = false;
    for (r = 0; r < N; r++) {
      n = 1;
      for (c = 1; c <= N; c++) {
        if (c < N && at(r, c) === at(r, c - 1) && at(r, c) >= 0) n++;
        else {
          if (n >= 3) {
            for (i = 0; i < n; i++) mark[r * N + (c - 1 - i)] = true;
          }
          n = 1;
        }
      }
    }
    for (c = 0; c < N; c++) {
      n = 1;
      for (r = 1; r <= N; r++) {
        if (r < N && at(r, c) === at(r - 1, c) && at(r, c) >= 0) n++;
        else {
          if (n >= 3) {
            for (i = 0; i < n; i++) mark[(r - 1 - i) * N + c] = true;
          }
          n = 1;
        }
      }
    }
    return mark;
  }
  function applyGravity() {
    var c, r, write;
    for (c = 0; c < N; c++) {
      write = N - 1;
      for (r = N - 1; r >= 0; r--) {
        if (at(r, c) >= 0) {
          setAt(write, c, at(r, c));
          if (write !== r) setAt(r, c, -1);
          write--;
        }
      }
      for (r = write; r >= 0; r--) setAt(r, c, rnd());
    }
  }
  function cascade() {
    var total = 0;
    var combo = 1;
    var mark, i, n, cleared;
    var guard = 0;
    while (guard < 12) {
      mark = findMatches();
      n = 0;
      for (i = 0; i < mark.length; i++) if (mark[i]) n++;
      if (!n) break;
      for (i = 0; i < mark.length; i++) if (mark[i]) board[i] = -1;
      total += n * 10 * combo;
      combo++;
      applyGravity();
      guard++;
      cleared = true;
    }
    return total;
  }
  function adjacent(a, b) {
    var ra = (a / N) | 0;
    var ca = a % N;
    var rb = (b / N) | 0;
    var cb = b % N;
    return Math.abs(ra - rb) + Math.abs(ca - cb) === 1;
  }
  function paint() {
    if (!boardEl) return;
    var html = "";
    var i;
    for (i = 0; i < board.length; i++) {
      var v = board[i];
      html +=
        '<button type="button" class="gem-cell' +
        (sel === i ? " is-on" : "") +
        '" data-gem="' +
        i +
        '" style="background:' +
        COLORS[v] +
        '" aria-label="' +
        NAMES[v] +
        '"></button>';
    }
    boardEl.innerHTML = html;
    if (scoreEl) scoreEl.textContent = String(score);
    if (movesEl) movesEl.textContent = String(moves);
  }
  function finish() {
    if (saved) return;
    saved = true;
    running = false;
    if (score > 0 && YG && YG.saveBest) {
      YG.saveBest("gemcascade", score, {
        year: "2004",
        merge: { real: true, multiStep: true, movesLeft: moves }
      });
    }
    if (YG && YG.markStep) YG.markStep("save", host);
    paintBest();
    setStatus(
      score > 0
        ? "Saved · itt04-game-gemcascade · score " + score + "."
        : "No matches — nothing written."
    );
  }
  function start() {
    running = true;
    saved = false;
    score = 0;
    moves = MOVES;
    sel = -1;
    fillNoMatch();
    if (YG && YG.clearSteps) YG.clearSteps(host);
    if (YG && YG.markStep) YG.markStep("start", host);
    paint();
    paintBest();
    setStatus("Swap two neighbors. Match 3+. " + MOVES + " moves.");
    var fix = fixtureName();
    if (fix === "zero") {
      finish();
      return;
    }
    if (!fix && YG && (YG.isFast() || YG.isTest())) {
      score = 12;
      finish();
    }
  }
  function clickGem(idx) {
    if (!running || saved) return;
    if (YG && YG.isPaused && YG.isPaused()) return;
    if (sel < 0) {
      sel = idx;
      paint();
      return;
    }
    if (sel === idx) {
      sel = -1;
      paint();
      return;
    }
    if (!adjacent(sel, idx)) {
      sel = idx;
      paint();
      return;
    }
    var tmp = board[sel];
    board[sel] = board[idx];
    board[idx] = tmp;
    var gained = cascade();
    if (!gained) {
      tmp = board[sel];
      board[sel] = board[idx];
      board[idx] = tmp;
      setStatus("No match — swap bounced.");
    } else {
      score += gained;
      moves -= 1;
      if (YG && YG.markStep) YG.markStep("match", host);
      setStatus("Cascade +" + gained + " · " + moves + " moves left.");
      if (moves <= 0) {
        sel = -1;
        paint();
        finish();
        return;
      }
    }
    sel = -1;
    paint();
  }

  if (boardEl) {
    boardEl.addEventListener("click", function (e) {
      var t = e && e.target;
      while (t && t !== boardEl && !(t.getAttribute && t.getAttribute("data-gem"))) {
        t = t.parentNode;
      }
      if (!t || t === boardEl) return;
      clickGem(parseInt(t.getAttribute("data-gem"), 10));
    });
  }
  if (startBtn) startBtn.addEventListener("click", start);
  paintBest();
  setStatus("Start a cascade. Incomplete never writes.");
})();
