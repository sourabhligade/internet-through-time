/**
 * Year config — 2021 CUT-OPEN lean door
 */
(function (global) {
  "use strict";
  var ITT = global.ITT || (global.ITT = {});
  ITT.configs = ITT.configs || {};
  var rooms = [
    "index.html",
    "pages/about.html",
    "pages/home.html",
    "pages/map.html",
    "sites/amazon/index.html",
    "sites/att/about.html",
    "sites/att/c.html",
    "sites/att/index.html",
    "sites/att/more.html",
    "sites/chrome/index.html",
    "sites/clubhouse21/index.html",
    "sites/coinbaseipo/index.html",
    "sites/copilot/about.html",
    "sites/copilot/c.html",
    "sites/copilot/index.html",
    "sites/copilot/more.html",
    "sites/epicapple/index.html",
    "sites/facebook/about.html",
    "sites/facebook/c.html",
    "sites/facebook/index.html",
    "sites/facebook/more.html",
    "sites/flash/index.html",
    "sites/google/index.html",
    "sites/instagram/c.html",
    "sites/instagram/index.html",
    "sites/instagram/more.html",
    "sites/m1/index.html",
    "sites/meta/index.html",
    "sites/nft/index.html",
    "sites/playable/about.html",
    "sites/playable/c.html",
    "sites/playable/extra-a.html",
    "sites/playable/extra-b.html",
    "sites/playable/extra-c.html",
    "sites/playable/extra-d.html",
    "sites/playable/extra-e.html",
    "sites/playable/extra-f.html",
    "sites/playable/extra-g.html",
    "sites/playable/extra-h.html",
    "sites/playable/extra-i.html",
    "sites/playable/famous.html",
    "sites/playable/game-2.html",
    "sites/playable/game-3.html",
    "sites/playable/game-4.html",
    "sites/playable/game-5.html",
    "sites/playable/game-6.html",
    "sites/playable/game-7.html",
    "sites/playable/game-8.html",
    "sites/playable/game.html",
    "sites/playable/index.html",
    "sites/playable/more-a.html",
    "sites/playable/more-b.html",
    "sites/playable/more-c.html",
    "sites/playable/more-d.html",
    "sites/playable/more.html",
    "sites/signal/about.html",
    "sites/signal/c.html",
    "sites/signal/index.html",
    "sites/signal/more.html",
    "sites/twitter/index.html",
    "sites/twitter/more.html",
    "sites/windows10/index.html",
    "sites/windows11/index.html",
    "sites/youtube/c.html",
    "sites/youtube/index.html",
    "sites/youtube/more.html"
  ];;;;;
  var urlMap = {
    "index.html": "http://museum.local/index.html",
    "pages/home.html": "http://home.microsoft.com/intl/web2021/",
    "pages/about.html": "http://home.microsoft.com/intl/web2021/about.html",
    "pages/map.html": "http://museum.local/years/2021/map/"};
  var i;
  for (i = 0; i < rooms.length; i++) {
    if (!urlMap[rooms[i]]) {
      urlMap[rooms[i]] = "http://museum.local/years/2021/" + rooms[i];
    }
  }
  ITT.configs["2021"] = {
    year: "2021",
    rooms: rooms,
    home: "pages/home.html",
    start: "pages/home.html",
    storagePrefix: "itt21",
    prefsKey: "itt-2021-prefs",
    bookmarksKey: "itt-2021-bookmarks",
    connectedKey: "itt-2021-connected",
    immersionScript: "js/immersion-2021.js",
    maximizedDefault: true,
    browserTitleSuffix: " - Chrome habit",
    connectMode: "broadband",
    connectSpeedLine: "Connected · always-on broadband (museum)",
    connectBrowserLine: "Starting Chrome habit (museum desktop frame)...",
    defaultPrefs: {
      underline: true,
      expireDays: 30,
      autoload: true,
      modemDelay: 20,
      homeUrl: "http://home.microsoft.com/intl/web2021/",
      homePath: "pages/home.html",
      showToolbar: true,
      showLocation: true,
      showDirbar: true,
      showDesktopIcons: true,
      desktopBg: "#0078d7"
    },
    urlMap: urlMap,
    bookmarks: [
      { title: "Starting Point", path: "pages/home.html" },
      { title: "ATT Ask", path: "sites/att/index.html" },
      { title: "Signal leftover", path: "sites/signal/index.html" },
      { title: "Copilot waitlist", path: "sites/copilot/index.html" }
    ],
    fallbackUrlBase: "http://home.microsoft.com/intl/web2021/",
    locationHints: [
      { re: /att|tracking|ask app|idfa|not to track/i, path: "sites/att/index.html" },
      { re: /signal/i, path: "sites/signal/index.html" },
      { re: /copilot|waitlist/i, path: "sites/copilot/index.html" },
      { re: /meta|rename/i, path: "sites/meta/index.html" },
      { re: /windows.?11|win11/i, path: "sites/windows11/index.html" },
      { re: /flash/i, path: "sites/flash/index.html" },
      { re: /chrome/i, path: "sites/chrome/index.html" },
      { re: /windows.?10|win10/i, path: "sites/windows10/index.html" }
    ]
  };
})(typeof window !== "undefined" ? window : this);
