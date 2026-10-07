/**
 * Period games wing — localStorage high scores (itt-games-*).
 * Educational theater only; no server.
 */
(function (global) {
  "use strict";

  if (!(global.ITT && global.ITT.User && global.ITT.User.take) &&
      typeof document !== "undefined" && document.readyState === "loading") {
    try {
      var cur = document.currentScript;
      var src = cur && cur.src ? String(cur.src) : "";
      var utilSrc = src.replace(/\/games\/[^/?#]+\.js(?:\?[^#]*)?$/, "/lib/util.js");
      if (utilSrc && utilSrc !== src) {
        document.write('<script src="' + utilSrc.replace(/"/g, "") + '"><\/script>');
      }
    } catch (eUser) { /* */ }
  }

  var KEY = "itt-games-scores";
  var LAST = "itt-games-last-portal";
  var MAX = 8;

  function loadAll() {
    try {
      var raw = window.ITT.User.take(KEY);
      return raw ? raw : {};
    } catch (e) {
      return {};
    }
  }

  function saveAll(obj) {
    try {
      window.ITT.User.store(KEY, obj);
    } catch (e) { /* */ }
  }

  function addScore(gameId, score, name) {
    var all = loadAll();
    var list = all[gameId] || [];
    list.push({
      score: Number(score) || 0,
      name: (name || "Player").slice(0, 16),
      at: Date.now()
    });
    list.sort(function (a, b) { return b.score - a.score; });
    all[gameId] = list.slice(0, MAX);
    saveAll(all);
    return all[gameId];
  }

  function getScores(gameId) {
    var all = loadAll();
    return all[gameId] || [];
  }

  function renderBoard(el, gameId) {
    if (!el) return;
    var list = getScores(gameId);
    if (!list.length) {
      el.innerHTML = "<p style='margin:0;color:#666'>Nothing here yet — play a round above. Scores stay in this browser only.</p>";
      return;
    }
    var html = "<ol>";
    for (var i = 0; i < list.length; i++) {
      html += "<li><b>" + list[i].score + "</b> — " + escapeHtml(list[i].name) + "</li>";
    }
    html += "</ol>";
    el.innerHTML = html;
  }

  function escapeHtml(s) {
    return String(s)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
  }

  function setLastPortal(id) {
    try { window.ITT.User.store(LAST, id); } catch (e) { /* */ }
  }

  function getLastPortal() {
    try { return window.ITT.User.take(LAST) || ""; } catch (e) { return ""; }
  }

  global.ITTGames = {
    addScore: addScore,
    getScores: getScores,
    renderBoard: renderBoard,
    setLastPortal: setLastPortal,
    getLastPortal: getLastPortal,
    KEY: KEY
  };
})(typeof window !== "undefined" ? window : this);
