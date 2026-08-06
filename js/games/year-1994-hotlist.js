/**
 * Hotlist Surfer — 1994 museum year game.
 * Click good bookmarks before they expire; avoid rot links.
 */
(function () {
  "use strict";
  var YG = (window.ITT && ITT.YearGame) || null;
  var host = document.querySelector('[data-year-game][data-game-id="hotlist"]');
  if (!host) return;

  var GOOD = [
    "CERN — World Wide Web",
    "Yahoo! (Stanford)",
    "NASA Home",
    "NCSA Mosaic",
    "FishCam",
    "IUMA",
    "White House",
    "HotWired",
    "Lycos",
    "Personal homepage",
    "Exploratorium",
    "mcom.com"
  ];
  var ROT = [
    "gopher://gopher.floodgap.com/",
    "Error 404 Not Found",
    "Unable to locate the server",
    "ftp://wuarchive.wustl.edu/",
    "Host unreachable"
  ];
  var GOLD = "Cool Site of the Day ★";

  var field = host.querySelector("[data-game-field]");
  var scoreEl = host.querySelector("[data-game-score]");
  var comboEl = host.querySelector("[data-game-combo]");
  var timeEl = host.querySelector("[data-game-time]");
  var bestEl = host.querySelector("[data-game-best]");
  var livesEl = host.querySelector("[data-game-lives]");
  var statusEl = host.querySelector("[data-itt-action-status]");
  var startBtn = host.querySelector("[data-game-start]");

  var state = "idle";
  var score = 0;
  var combo = 0;
  var lives = 3;
  var timeLeft = 60;
  var rows = [];
  var rowId = 0;
  var spawnTimer = null;
  var tickTimer = null;
  var expireMs = 2800;
  var roundSec = YG && YG.isFast() ? 8 : 60;

  function best() {
    return YG ? YG.loadBest("hotlist", "1994") : 0;
  }

  function setStatus(m) {
    if (YG) YG.setStatus(statusEl, m);
    else if (statusEl) statusEl.textContent = m;
  }

  function paintHud() {
    if (scoreEl) scoreEl.textContent = String(score);
    if (comboEl) comboEl.textContent = String(combo);
    if (timeEl) timeEl.textContent = String(Math.max(0, Math.ceil(timeLeft)));
    if (livesEl) livesEl.textContent = String(lives);
    if (bestEl) bestEl.textContent = String(best());
  }

  function clearField() {
    rows = [];
    if (field) field.innerHTML = "";
  }

  function pickType() {
    var r = Math.random();
    if (r < 0.1) return "gold";
    if (r < 0.3) return "rot";
    return "good";
  }

  function spawnRow() {
    if (state !== "running" || !field) return;
    while (rows.length >= 7) {
      var old = rows.shift();
      if (old && old.el && old.el.parentNode) old.el.parentNode.removeChild(old.el);
    }
    var type = pickType();
    var label =
      type === "gold"
        ? GOLD
        : type === "rot"
          ? ROT[Math.floor(Math.random() * ROT.length)]
          : GOOD[Math.floor(Math.random() * GOOD.length)];
    var id = ++rowId;
    var el = document.createElement("div");
    el.setAttribute("role", "listitem");
    el.setAttribute("data-row-id", String(id));
    el.style.cssText =
      "padding:4px 6px;margin:2px 0;border:1px solid #808080;background:#fff;cursor:pointer;font-family:Times New Roman,Times,serif;font-size:14px;";
    if (type === "rot") {
      el.style.color = "#666";
      el.innerHTML = '<font color="#666">' + escapeHtml(label) + "</font>";
    } else if (type === "gold") {
      el.style.background = "#ffffcc";
      el.innerHTML =
        '<a href="#" style="color:#0000ee" onclick="return false"><b>' +
        escapeHtml(label) +
        "</b></a>";
    } else {
      el.innerHTML =
        '<a href="#" style="color:#0000ee" onclick="return false">' + escapeHtml(label) + "</a>";
    }
    el.addEventListener("click", function (ev) {
      if (ev.preventDefault) ev.preventDefault();
      onClick(id);
    });
    field.appendChild(el);
    var rec = { id: id, type: type, el: el, born: Date.now() };
    rows.push(rec);
    window.setTimeout(function () {
      expireRow(id);
    }, expireMs);
  }

  function escapeHtml(s) {
    return String(s)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
  }

  function removeRow(id) {
    for (var i = 0; i < rows.length; i++) {
      if (rows[i].id === id) {
        if (rows[i].el && rows[i].el.parentNode) rows[i].el.parentNode.removeChild(rows[i].el);
        rows.splice(i, 1);
        return true;
      }
    }
    return false;
  }

  function expireRow(id) {
    if (state !== "running") return;
    for (var i = 0; i < rows.length; i++) {
      if (rows[i].id === id) {
        if (rows[i].type === "good" || rows[i].type === "gold") {
          combo = 0;
        }
        removeRow(id);
        paintHud();
        return;
      }
    }
  }

  function onClick(id) {
    if (state !== "running") return;
    var row = null;
    for (var i = 0; i < rows.length; i++) {
      if (rows[i].id === id) {
        row = rows[i];
        break;
      }
    }
    if (!row) return;
    if (row.type === "rot") {
      combo = 0;
      lives -= 1;
      setStatus("Rotten link! Lives " + lives);
      removeRow(id);
      paintHud();
      if (lives <= 0) endRun("lives");
      return;
    }
    if (row.type === "gold") {
      score += 5;
      combo += 1;
      if (combo >= 5) score += 1;
      setStatus("Cool Site of the Day! +" + (combo >= 5 ? 6 : 5));
    } else {
      score += 1;
      combo += 1;
      if (combo >= 5) score += 1;
      setStatus("Bookmarked! combo " + combo);
    }
    removeRow(id);
    paintHud();
  }

  function endRun(reason) {
    if (state !== "running") return;
    state = "results";
    if (spawnTimer) {
      clearInterval(spawnTimer);
      spawnTimer = null;
    }
    if (tickTimer) {
      clearInterval(tickTimer);
      tickTimer = null;
    }
    clearField();
    var blob = null;
    if (YG && score > 0) {
      blob = YG.saveBest("hotlist", score, { year: "1994" });
    }
    var bestN = blob ? blob.best : best();
    setStatus(
      "Round over (" +
        reason +
        ") · score " +
        score +
        " · best " +
        bestN +
        " · press Start"
    );
    if (bestEl) bestEl.textContent = String(bestN);
    state = "idle";
    if (startBtn) startBtn.disabled = false;
  }

  function start() {
    if (spawnTimer) clearInterval(spawnTimer);
    if (tickTimer) clearInterval(tickTimer);
    clearField();
    score = 0;
    combo = 0;
    lives = 3;
    timeLeft = roundSec;
    state = "running";
    if (startBtn) startBtn.disabled = true;
    setStatus("Transferring hotlist…");
    paintHud();
    window.setTimeout(function () {
      if (state !== "running") return;
      setStatus("Click good links · avoid rot · " + roundSec + "s");
      spawnRow();
      spawnTimer = setInterval(spawnRow, 700 + Math.floor(Math.random() * 400));
      tickTimer = setInterval(function () {
        if (state !== "running") return;
        timeLeft -= 0.25;
        paintHud();
        if (timeLeft <= 0) endRun("time");
      }, 250);
    }, YG && YG.isFast() ? 100 : 400);
  }

  if (startBtn) {
    startBtn.addEventListener("click", function () {
      start();
    });
  }
  document.addEventListener("keydown", function (e) {
    if (state === "idle" && (e.code === "Space" || e.key === " ")) {
      e.preventDefault();
      start();
    }
    if (state === "running" && e.key >= "1" && e.key <= "7") {
      var idx = parseInt(e.key, 10) - 1;
      if (rows[idx]) onClick(rows[idx].id);
    }
  });

  paintHud();
  setStatus("Press Start to surf the hotlist");
})();
