/**
 * Continue Row — 2019 museum year game (Disney+ Who's watching class).
 * Adult easy · Kids other color · two profiles · two Continue titles · Kids blocked · row persists.
 * Storage: itt19-game-continuerow via YearGame.saveBest
 * Start trial is the trap. No official Disney art.
 */
(function () {
  "use strict";
  var YG = (window.ITT && ITT.YearGame) || null;
  var host = document.querySelector('[data-year-game][data-game-id="continuerow"]');
  if (!host) return;

  var scoreEl = host.querySelector("[data-game-score]");
  var bestEl = host.querySelector("[data-game-best]");
  var statusEl = host.querySelector("[data-itt-action-status]");
  var startBtn = host.querySelector("[data-game-start]");
  var trialBtn = host.querySelector("[data-cr-trial]");
  var contBtn = host.querySelector("[data-cr-continue]");
  var rowEl = host.querySelector("[data-cr-row]");
  var kidsBlock = host.querySelector("[data-cr-kids-block]");

  var fast = YG && ((YG.isFast && YG.isFast()) || (YG.isTest && YG.isTest()));
  var profiles = {};
  var titles = [];
  var kidsOn = false;
  var running = false;

  function setStatus(m) {
    if (YG) YG.setStatus(statusEl, m);
    else if (statusEl) statusEl.textContent = m;
  }
  function paintBest() {
    if (bestEl) bestEl.textContent = String(YG ? YG.loadBest("continuerow", "2019") : 0);
  }
  function paintRow() {
    if (rowEl) rowEl.textContent = titles.length ? "Continue: " + titles.join(" · ") : "Continue row empty";
  }
  function paintScore(n) {
    if (scoreEl) scoreEl.textContent = String(n);
  }

  function reset() {
    profiles = {};
    titles = [];
    kidsOn = false;
    running = true;
    paintScore(0);
    paintRow();
    if (kidsBlock) kidsBlock.setAttribute("hidden", "hidden");
    var btns = host.querySelectorAll("[data-cr-profile], [data-cr-add]");
    var i;
    for (i = 0; i < btns.length; i++) {
      btns[i].className = (btns[i].className || "").replace(/\bis-on\b/g, "");
    }
    setStatus("Pick Adult and Kids. Add two titles on Adult. Trial never writes.");
  }

  function trySave() {
    if (!running) {
      setStatus("New Game first.");
      return;
    }
    if (!profiles.adult || !profiles.kids) {
      setStatus("Pick Adult and Kids. Incomplete never writes.");
      return;
    }
    if (titles.length < 2) {
      setStatus("Add two titles to the Adult Continue row.");
      return;
    }
    var sc = 20 + titles.length * 10;
    paintScore(sc);
    if (YG) YG.saveBest("continuerow", sc, { year: "2019", gold: true });
    paintBest();
    running = false;
    setStatus("Continue row holds · score " + sc);
  }

  if (trialBtn) {
    trialBtn.addEventListener("click", function () {
      setStatus("Start trial is the trap. No points. Continue is the save.");
    });
  }
  if (startBtn) {
    startBtn.addEventListener("click", function () {
      reset();
      if (fast && YG) {
        profiles.adult = true;
        profiles.kids = true;
        titles = ["the-mandalorian-class", "frozen-2-class"];
        paintRow();
        paintScore(12);
        YG.saveBest("continuerow", 12, { year: "2019", gold: true });
        paintBest();
        running = false;
        setStatus("test/fast · Continue row written");
      }
    });
  }

  var pbtns = host.querySelectorAll("[data-cr-profile]");
  var i;
  for (i = 0; i < pbtns.length; i++) {
    pbtns[i].addEventListener("click", function () {
      if (!running) reset();
      var id = this.getAttribute("data-cr-profile") || "";
      profiles[id] = true;
      this.className = (this.className || "") + " is-on";
      kidsOn = id === "kids";
      if (kidsBlock) {
        if (kidsOn) {
          kidsBlock.removeAttribute("hidden");
        } else {
          kidsBlock.setAttribute("hidden", "hidden");
        }
      }
      setStatus(id === "kids" ? "Kids — blocked title hidden. Switch back." : "Adult.");
    });
  }
  var adds = host.querySelectorAll("[data-cr-add]");
  for (i = 0; i < adds.length; i++) {
    adds[i].addEventListener("click", function () {
      if (!running) reset();
      if (kidsOn) {
        setStatus("Kids profile — that title is blocked.");
        return;
      }
      var t = this.getAttribute("data-title") || "title";
      if (titles.indexOf(t) < 0) titles.push(t);
      this.className = (this.className || "") + " is-on";
      paintRow();
      setStatus("Adult Continue (" + titles.length + ").");
    });
  }
  if (contBtn) contBtn.addEventListener("click", trySave);

  host.__ittContinueRowEnd = function (sc) {
    paintScore(Number(sc) || 40);
    if (YG) YG.saveBest("continuerow", Number(sc) || 40, { year: "2019", gold: true });
    paintBest();
  };

  paintBest();
  paintRow();
  setStatus("New Game · trial never writes · Continue is the save");
})();
