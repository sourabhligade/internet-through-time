/**
 * Five Letter — 2021 museum year game (Wordle-class, original tiles).
 * Five letters · six rows · museum word TRACE.
 * Finish (win or six misses) sets data-five-done. Abandon never writes.
 * Storage: itt21-game-five via data-itt-real-save (incomplete never writes).
 * No NYT masthead · no live solution · NYT buy is 31 Jan 2022.
 */
(function () {
  "use strict";
  var YG = (window.ITT && ITT.YearGame) || null;
  var host = document.querySelector('[data-year-game][data-game-id="five"]');
  if (!host) return;
  var board = host.querySelector("[data-five-board]") || document.querySelector("[data-five-board]");
  var input = host.querySelector("[data-five-guess]") || document.querySelector("[data-five-guess]");
  var enter = host.querySelector("[data-five-enter]") || document.querySelector("[data-five-enter]");
  var st = host.querySelector("[data-five-status]") || document.querySelector("[data-five-status]");
  if (!board || !input || !enter) return;

  var SECRET = "TRACE";
  var row = 0;
  var done = false;
  var won = false;

  function paused() {
    return !!(YG && YG.isPaused && YG.isPaused());
  }

  function setStatus(m) {
    if (YG) YG.setStatus(st, m);
    else if (st) st.textContent = m;
  }

  if (!board.children.length) {
    var i;
    for (i = 0; i < 30; i++) {
      var cell = document.createElement("div");
      cell.className = "itt21-cell";
      cell.setAttribute("data-five-cell", String(i));
      board.appendChild(cell);
    }
  }

  function paintRow(guess, r) {
    var letters = guess.toUpperCase().split("");
    var secret = SECRET.split("");
    var used = [false, false, false, false, false];
    var j, k;
    for (j = 0; j < 5; j++) {
      var el = board.children[r * 5 + j];
      if (!el) continue;
      el.textContent = letters[j] || "";
      if (letters[j] === secret[j]) {
        el.className = "itt21-cell is-hit";
        used[j] = true;
      }
    }
    for (j = 0; j < 5; j++) {
      var el2 = board.children[r * 5 + j];
      if (!el2 || el2.className.indexOf("is-hit") !== -1) continue;
      var near = false;
      for (k = 0; k < 5; k++) {
        if (!used[k] && letters[j] === secret[k]) {
          used[k] = true;
          near = true;
          break;
        }
      }
      el2.className = "itt21-cell " + (near ? "is-near" : "is-miss");
    }
  }

  function finish(didWin) {
    done = true;
    won = !!didWin;
    host.setAttribute("data-five-done", "1");
    host.setAttribute("data-five-won", won ? "1" : "0");
    host.setAttribute("data-five-guesses", String(won ? row + 1 : 6));
    if (YG && YG.markStep) YG.markStep(won ? "win" : "miss", host);
  }

  function submit() {
    if (done || paused()) return;
    var g = String(input.value || "").replace(/[^a-zA-Z]/g, "");
    if (g.length !== 5) {
      setStatus("Type five letters.");
      return;
    }
    paintRow(g, row);
    if (g.toUpperCase() === SECRET) {
      finish(true);
      setStatus("Got it in " + (row + 1) + ".");
    } else {
      row += 1;
      if (row >= 6) {
        finish(false);
        setStatus("Six misses. Word was TRACE (museum).");
      } else {
        setStatus("Guess " + (row + 1) + " of 6.");
      }
    }
    input.value = "";
  }

  enter.addEventListener("click", submit);
  input.addEventListener("keydown", function (ev) {
    if (ev.key === "Enter") {
      ev.preventDefault();
      submit();
    }
  });
})();
