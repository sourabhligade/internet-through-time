/**
 * Shared games-wing chrome: consistent nav, dismissible welcome, path-safe roots.
 * Include after scores/announce; works from any depth under /games/.
 */
(function () {
  "use strict";

  /** Resolve relative root to games/ folder from current path */
  function gamesRoot() {
    var path = (location.pathname || "").replace(/\\/g, "/");
    // file:// may be .../games/play/heli.html — match /games/ segment
    var idx = path.lastIndexOf("/games/");
    if (idx === -1) {
      // .../games (no trailing slash) or odd hosts
      if (/\/games$/i.test(path)) return "./";
      return "./";
    }
    var after = path.slice(idx + "/games/".length);
    var segs = after.split("/").filter(Boolean);
    // drop filename
    if (segs.length && /\.html?$/i.test(segs[segs.length - 1])) segs.pop();
    var depth = segs.length;
    if (depth === 0) return "./";
    return new Array(depth + 1).join("../");
  }

  function museumRoot() {
    return gamesRoot() + "../";
  }

  function ensureNav() {
    var top = document.querySelector(".games-top");
    if (!top || top.getAttribute("data-shell-nav") === "1") return;
    var gr = gamesRoot();
    var mr = museumRoot();
    var brand = top.querySelector(".games-brand");
    var brandHtml = brand ? brand.outerHTML : '<div class="games-brand">WEB GAMES</div>';
    top.innerHTML =
      brandHtml +
      '<a href="' + gr + 'index.html">Lobby</a>' +
      '<a href="' + gr + 'announcements.html">News</a>' +
      '<a href="' + gr + 'portals.html">Portals</a>' +
      '<a href="' + gr + 'worlds.html">Worlds</a>' +
      '<a href="' + gr + 'play/index.html">Play</a>' +
      '<a href="' + gr + 'about.html">About</a>' +
      '<a href="' + mr + 'index.html">← Museum hub</a>';
    top.setAttribute("data-shell-nav", "1");
  }

  function fixYearLinks() {
    document.querySelectorAll('a[href*="years/"]').forEach(function (a) {
      var h = a.getAttribute("href") || "";
      // bare directory → index.html (file:// safe)
      if (/years\/20\d\d\/?$/.test(h) && !/\.html/i.test(h)) {
        a.setAttribute("href", h.replace(/\/?$/, "/index.html"));
      }
    });
  }

  function run() {
    ensureNav();
    fixYearLinks();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", run);
  } else {
    run();
  }
})();
