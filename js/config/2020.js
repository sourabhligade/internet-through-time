/**
 * Year config — 2020 CUT-OPEN lean door
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
    "sites/amongus/index.html",
    "sites/animalcrossing/index.html",
    "sites/classroom/index.html",
    "sites/clubhouse/index.html",
    "sites/discord/index.html",
    "sites/facebook/index.html",
    "sites/google/index.html",
    "sites/hbomax/index.html",
    "sites/houseparty/index.html",
    "sites/instagram/index.html",
    "sites/netflix/index.html",
    "sites/nyt/index.html",
    "sites/peacock/index.html",
    "sites/playable/game.html",
    "sites/playable/index.html",
    "sites/reddit/index.html",
    "sites/slack/index.html",
    "sites/teams/index.html",
    "sites/tiktok/index.html",
    "sites/wikipedia/index.html",
    "sites/youtube/index.html",
    "sites/zoom/index.html",
    "sites/zoom/meeting.html"
  ];;;;;
  var urlMap = {
    "index.html": "http://museum.local/index.html",
    "pages/home.html": "http://home.microsoft.com/intl/web2020/",
    "pages/about.html": "http://home.microsoft.com/intl/web2020/about.html",
    "pages/map.html": "http://museum.local/years/2020/map/"};
  var i;
  for (i = 0; i < rooms.length; i++) {
    if (!urlMap[rooms[i]]) {
      urlMap[rooms[i]] = "http://museum.local/years/2020/" + rooms[i];
    }
  }
  ITT.configs["2020"] = {
    year: "2020",
    rooms: rooms,
    home: "pages/home.html",
    start: "pages/home.html",
    storagePrefix: "itt20",
    prefsKey: "itt-2020-prefs",
    bookmarksKey: "itt-2020-bookmarks",
    connectedKey: "itt-2020-connected",
    immersionScript: "js/immersion-2020.js",
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
      homeUrl: "http://home.microsoft.com/intl/web2020/",
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
      { title: "Zoom Leave", path: "sites/zoom/meeting.html" },
      { title: "Houseparty leftover", path: "sites/houseparty/index.html" },
      { title: "Classroom leftover", path: "sites/classroom/index.html" }
    ],
    fallbackUrlBase: "http://home.microsoft.com/intl/web2020/",
    locationHints: [
      { re: /zoom|leave meeting|mute/i, path: "sites/zoom/meeting.html" },
      { re: /houseparty/i, path: "sites/houseparty/index.html" },
      { re: /discord/i, path: "sites/discord/index.html" },
      { re: /teams/i, path: "sites/teams/index.html" },
      { re: /classroom/i, path: "sites/classroom/index.html" },
      { re: /netflix/i, path: "sites/netflix/index.html" },
      { re: /tiktok/i, path: "sites/tiktok/index.html" },
      { re: /among.?us|impostor/i, path: "sites/amongus/index.html" },
      { re: /animal.?crossing|acnh/i, path: "sites/animalcrossing/index.html" },
    ]
  };
})(typeof window !== "undefined" ? window : this);
