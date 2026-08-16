/**
 * 2021 REAL product theaters — ATT · Signal · Meta · Flash brick · Five Letter
 * Incomplete never writes. Prefix itt21-* via YearExtras.
 */
(function (global) {
  "use strict";
  var ITT = global.ITT || (global.ITT = {});
  var YX = ITT.YearExtras && ITT.YearExtras.forYear("2021");
  if (!YX) {
    console.error("ITT.YearExtras missing for 2021 — load year-extras-kit.js first");
    return;
  }

  function bootAtt(doc) {
    doc = doc || document;
    var allow = doc.querySelector("[data-att-allow]");
    var st = doc.querySelector("[data-att-status]") || doc.querySelector("[data-itt-action-status]");
    if (allow) {
      allow.addEventListener("click", function () {
        YX.feedback("That is the period button. This exhibit only saves Ask App Not to Track.", st, { error: true });
      });
    }
    var prev = YX.loadJSON(YX.key("att"), null);
    if (prev && prev.real) YX.showNext(doc);
  }

  function bootWhatsApp(doc) {
    doc = doc || document;
    var acc = doc.querySelector("[data-wa-accept]");
    var st = doc.querySelector("[data-wa-status]") || doc.querySelector("[data-itt-action-status]");
    if (!acc) return;
    acc.addEventListener("click", function () {
      YX.feedback("That is the scare button. Leave for Signal. Accept does not write.", st, { error: true });
    });
  }

  function bootFlash(doc) {
    doc = doc || document;
    var play = doc.querySelector("[data-flash-play]");
    var st = doc.querySelector("[data-flash-status]") || doc.querySelector("[data-itt-action-status]");
    if (play) {
      play.addEventListener("click", function () {
        YX.feedback("Adobe blocked Flash content on 12 Jan 2021. It will not play.", st, { error: true });
      });
    }
  }

  function bootFive(doc) {
    doc = doc || document;
    var board = doc.querySelector("[data-five-board]");
    var input = doc.querySelector("[data-five-guess]");
    var enter = doc.querySelector("[data-five-enter]");
    var st = doc.querySelector("[data-five-status]");
    var save = doc.querySelector("[data-five-save]");
    var yg = doc.querySelector('[data-year-game][data-game-id="five"]');
    if (!board || !input || !enter) return;
    /* year-2021-five.js owns the grid when the year-game host is present */
    if (yg || board.children.length) {
      if (save) {
        save.addEventListener("click", function (ev) {
          var host = yg || doc.querySelector("[data-year-game]");
          var finished = host && host.getAttribute("data-five-done") === "1";
          if (!finished) {
            if (ev && ev.preventDefault) ev.preventDefault();
            if (ev && ev.stopImmediatePropagation) ev.stopImmediatePropagation();
            YX.feedback("Finish a game first (win or six misses). Abandon never writes.", st, { error: true });
          }
        }, true);
      }
      var prevYg = YX.loadJSON(YX.key("game-five"), null);
      if (prevYg && prevYg.real) YX.showNext(doc);
      return;
    }
    var SECRET = "TRACE";
    var row = 0;
    var done = false;
    var won = false;
    var i;
    for (i = 0; i < 30; i++) {
      var cell = doc.createElement("div");
      cell.className = "itt21-cell";
      cell.setAttribute("data-five-cell", String(i));
      board.appendChild(cell);
    }
    function paintRow(guess, r) {
      var letters = guess.toUpperCase().split("");
      var secret = SECRET.split("");
      var used = [false, false, false, false, false];
      var j, k;
      for (j = 0; j < 5; j++) {
        var el = board.children[r * 5 + j];
        el.textContent = letters[j] || "";
        if (letters[j] === secret[j]) {
          el.className = "itt21-cell is-hit";
          used[j] = true;
        }
      }
      for (j = 0; j < 5; j++) {
        var el2 = board.children[r * 5 + j];
        if (el2.className.indexOf("is-hit") !== -1) continue;
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
    enter.addEventListener("click", function () {
      if (done) return;
      var g = String(input.value || "").replace(/[^a-zA-Z]/g, "");
      if (g.length !== 5) {
        if (st) st.textContent = "Type five letters.";
        return;
      }
      paintRow(g, row);
      if (g.toUpperCase() === SECRET) {
        done = true;
        won = true;
        if (st) st.textContent = "Got it in " + (row + 1) + ".";
      } else {
        row += 1;
        if (row >= 6) {
          done = true;
          if (st) st.textContent = "Six misses. Word was TRACE (museum).";
        }
      }
      input.value = "";
    });
    if (save) {
      save.addEventListener("click", function (ev) {
        if (!done) {
          if (ev && ev.preventDefault) ev.preventDefault();
          if (ev && ev.stopImmediatePropagation) ev.stopImmediatePropagation();
          YX.feedback("Finish a game first (win or six misses). Abandon never writes.", st, { error: true });
        }
      }, true);
    }
    var prev = YX.loadJSON(YX.key("game-five"), null);
    if (prev && prev.real) YX.showNext(doc);
  }

  function bootResidualNext(doc) {
    doc = doc || document;
    var btns = doc.querySelectorAll("[data-itt-real-save]");
    var i;
    for (i = 0; i < btns.length; i++) {
      (function (btn) {
        var suffix = btn.getAttribute("data-storage-key") || "";
        if (suffix && YX.loadJSON(YX.key(suffix), null)) YX.showNext(doc);
        btn.addEventListener("click", function () {
          setTimeout(function () {
            var s = btn.getAttribute("data-storage-key") || "";
            if (s && YX.loadJSON(YX.key(s), null)) YX.showNext(doc);
          }, 0);
        });
      })(btns[i]);
    }
  }

  function bootAll(doc) {
    doc = doc || document;
    bootAtt(doc);
    bootWhatsApp(doc);
    bootFlash(doc);
    bootFive(doc);
    bootResidualNext(doc);
    try {
      doc.documentElement.setAttribute("data-itt-feat-year2021extras", "1");
    } catch (e) { /* */ }
  }

  var features = ITT.ImmersionFeatures || (ITT.ImmersionFeatures = []);
  if (typeof features.registerLocal === "function") {
    features.registerLocal({
      id: "year2021extras",
      featureKey: "year2021extras",
      boot: bootAll
    });
  } else {
    features.push({
      id: "year2021extras",
      needs: function (cfg) {
        return !cfg.features || cfg.features.year2021extras !== false;
      },
      boot: bootAll
    });
  }
})(typeof window !== "undefined" ? window : this);
