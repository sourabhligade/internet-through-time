/**
 * Cubicle Whack — 2004 museum year game.
 */
(function () {
  "use strict";
  var YG = (window.ITT && ITT.YearGame) || null;
  var host = document.querySelector('[data-year-game][data-game-id="cubewhack"]');
  if (!host) return;
  var field = host.querySelector("[data-whack-field]");
  var scoreEl = host.querySelector("[data-game-score]");
  var timeEl = host.querySelector("[data-game-time]");
  var bestEl = host.querySelector("[data-game-best]");
  var statusEl = host.querySelector("[data-itt-action-status]");
  var startBtn = host.querySelector("[data-game-start]");

  var holes = [];
  var score = 0;
  var combo = 0;
  var timeLeft = 45;
  var running = false;
  var timers = [];

  function setStatus(m) {
    if (statusEl) statusEl.textContent = m;
  }
  function clearTimers() {
    timers.forEach(clearTimeout);
    timers = [];
  }

  function build() {
    field.innerHTML = "";
    field.style.cssText = "display:grid;grid-template-columns:repeat(3,100px);gap:8px";
    holes = [];
    for (var i = 0; i < 6; i++) {
      var d = document.createElement("button");
      d.type = "button";
      d.style.cssText =
        "width:100px;height:84px;background:linear-gradient(#f0f0e8,#d0d0c8);border:2px solid #666;border-radius:3px;font-size:12px;font-weight:700;cursor:pointer;box-shadow:inset 0 1px 0 #fff";
      d.textContent = "🖥 desk";
      d.dataset.up = "";
      (function (btn, idx) {
        btn.addEventListener("click", function () {
          if (!running || !btn.dataset.up) return;
          var t = btn.dataset.up;
          btn.dataset.up = "";
          btn.textContent = "desk";
          btn.style.background = "#ddd";
          if (t === "hr") {
            score = Math.max(0, score - 2);
            combo = 0;
            setStatus("HR audit! −2");
          } else if (t === "coffee") {
            score += 3 + (combo >= 5 ? 1 : 0);
            combo++;
            setStatus("Coffee! +3");
          } else {
            score += 1 + (combo >= 5 ? 1 : 0);
            combo++;
            setStatus("Memo +1 · combo " + combo);
          }
          if (scoreEl) scoreEl.textContent = String(score);
        });
      })(d, i);
      holes.push(d);
      field.appendChild(d);
    }
  }

  function showOne() {
    if (!running) return;
    var free = holes.filter(function (h) {
      return !h.dataset.up;
    });
    if (!free.length) {
      schedule();
      return;
    }
    var btn = free[Math.floor(Math.random() * free.length)];
    var r = Math.random();
    var type = r < 0.1 ? "hr" : r < 0.3 ? "coffee" : "memo";
    btn.dataset.up = type;
    btn.textContent = type === "hr" ? "HR!" : type === "coffee" ? "☕" : "MEMO";
    btn.style.background = type === "hr" ? "#fcc" : type === "coffee" ? "#cfc" : "#ffc";
    var hide = setTimeout(function () {
      if (btn.dataset.up) {
        if (btn.dataset.up === "memo" || btn.dataset.up === "coffee") combo = 0;
        btn.dataset.up = "";
        btn.textContent = "desk";
        btn.style.background = "#ddd";
      }
    }, 600 + Math.random() * 600);
    timers.push(hide);
    schedule();
  }

  function schedule() {
    if (!running) return;
    var t = setTimeout(showOne, 700 + Math.random() * 500);
    timers.push(t);
  }

  function start() {
    clearTimers();
    score = 0;
    combo = 0;
    timeLeft = YG && YG.isFast() ? 8 : 45;
    running = true;
    if (scoreEl) scoreEl.textContent = "0";
    if (timeEl) timeEl.textContent = String(timeLeft);
    if (bestEl) bestEl.textContent = String(YG ? YG.loadBest("cubewhack", "2004") : 0);
    setStatus("Whack memos · avoid HR!");
    holes.forEach(function (h) {
      h.dataset.up = "";
      h.textContent = "desk";
      h.style.background = "#ddd";
    });
    schedule();
    var tick = setInterval(function () {
      if (!running) {
        clearInterval(tick);
        return;
      }
      timeLeft -= 1;
      if (timeEl) timeEl.textContent = String(timeLeft);
      if (timeLeft <= 0) {
        running = false;
        clearTimers();
        clearInterval(tick);
        if (YG && score > 0) {
          var b = YG.saveBest("cubewhack", score, { year: "2004" });
          if (bestEl) bestEl.textContent = String(b.best);
        }
        setStatus("Time! Score " + score);
      }
    }, 1000);
    timers.push(tick);
  }

  if (startBtn) startBtn.addEventListener("click", start);
  build();
  if (bestEl) bestEl.textContent = String(YG ? YG.loadBest("cubewhack", "2004") : 0);
  setStatus("Press Start");
})();
