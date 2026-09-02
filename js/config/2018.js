/**
 * Year config — 2018 lean from-scratch
 * Data only. Behavior lives in browser-core.js.
 */
(function (global) {
  "use strict";
  var ITT = global.ITT || (global.ITT = {});
  ITT.configs = ITT.configs || {};

  var rooms = [
    "sites/androidpie/index.html",
    "sites/btc18/index.html",
    "sites/cf1111/index.html",
    "sites/duplex/index.html",
    "sites/epicstore/index.html",
    "sites/github/index.html",
    "sites/godofwar/index.html",
    "sites/groupft/index.html",
    "sites/ios12/index.html",
    "sites/iphonexr/index.html",
    "sites/iphonexs/index.html",
    "sites/labo/index.html",
    "sites/memoji/index.html",
    "sites/mojave/index.html",
    "sites/oculusgo/index.html",
    "sites/pixel3/index.html",
    "sites/playable/more-c.html",
    "sites/playable/more-d.html",
    "sites/portal18/index.html",
    "sites/rdr2/index.html",
    "sites/slack18/index.html",
    "sites/smashbros/index.html",
    "sites/tiktok/index.html",
    "sites/tumblrban/index.html",
    "sites/watch4/index.html",
    "sites/zoom18/index.html",
    "sites/fnios/index.html",
    "sites/gplusend/index.html",
    "sites/clpersonals/index.html",
    "sites/mastodon/index.html",
    "sites/itunesmovie/index.html",
    "sites/screentime/index.html",
    "sites/playable/extra-i.html",
    "sites/playable/extra-h.html",
    "sites/playable/extra-g.html",
    "sites/playable/extra-f.html",
    "sites/homepod/about.html",
    "sites/github/about.html",
    "sites/discord/about.html",
    "sites/wikipedia/about.html",
    "sites/youtube/about.html",
    "sites/reddit/about.html",
    "sites/instagram/about.html",
    "sites/tiktok/about.html",
    "sites/gdpr/about.html",
    "sites/homepodabout/index.html",
    "sites/githubms/index.html",
    "sites/fnswitch/index.html",
    "sites/fypabout/index.html",
    "sites/igtvabout/index.html",
    "sites/gdpra/index.html",
    "sites/spectre18/index.html",
    "sites/notsecure/index.html",
    "sites/cambridge/index.html",
    "sites/playable/extra-e.html",
    "sites/playable/more-a.html",
    "sites/playable/more-b.html",
    "sites/playable/extra-d.html",
    "sites/playable/extra-c.html",
    "sites/discord/index.html",
    "sites/applemusic/index.html",
    "sites/fortnite/creative.html",

    "pages/home.html",
    "pages/about.html",
    "pages/map.html",
    "pages/whats-new.html",
    "pages/error/404.html",
    "pages/error/unreachable.html",
    "sites/gdpr/index.html",
    "sites/gdpr/manage.html",
    "sites/tiktok/fyp.html",
    "sites/trust/index.html",
    "sites/instagram/igtv.html",
    "sites/chrome/not-secure.html",
    "sites/homepod/index.html",
    "sites/spectre/index.html",
    "sites/fortnite/switch.html",
    "sites/github/microsoft.html",
    "sites/reddit/index.html",
    "sites/youtube/index.html",
    "sites/wikipedia/index.html",
    "sites/playable/game.html",
    "sites/playable/game-5.html",
    "sites/playable/game-4.html",
    "sites/playable/game-3.html",
    "sites/playable/game-2.html",
    "sites/playable/extra-b.html",
    "sites/playable/extra-a.html",
    "sites/playable/famous.html",
    "sites/playable/index.html"
  ];

  var urlMap = {
    "index.html": "http://museum.local/index.html",
    "pages/home.html": "http://home.microsoft.com/intl/web2018/",
    "pages/about.html": "http://home.microsoft.com/intl/web2018/about.html",
    "pages/map.html": "http://museum.local/years/2018/map/",
    "pages/whats-new.html": "http://museum.local/pages/whats-new.html"
  };
  var i;
  for (i = 0; i < rooms.length; i++) {
    if (!urlMap[rooms[i]]) {
      urlMap[rooms[i]] = "http://museum.local/years/2018/" + rooms[i];
    }
  }

  ITT.configs["2018"] = {
    year: "2018",
    storagePrefix: "itt18",
    home: "pages/home.html",
    prefsKey: "itt-2018-prefs",
    bookmarksKey: "itt-2018-bookmarks",
    connectedKey: "itt-2018-connected",
    immersionScript: "js/immersion-2018.js",
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
      homeUrl: "http://home.microsoft.com/intl/web2018/",
      homePath: "pages/home.html",
      showToolbar: true,
      showLocation: true,
      showDirbar: true,
      showDesktopIcons: true,
      desktopBg: "#0078d7"
    },
    perf: {
      navJitterMax: 50,
      navFixedMax: 40,
      imageBudgetMs: 360,
      imageMinStepMs: 30,
      imageMaxStepMs: 80,
      imageStartMs: 70,
      connectEarlyMs: 100,
      connectLineMs: 160,
      connectBusyMs: 280,
      connectEndMs: 120,
      connectBusyChance: 0.08
    },
    urlMap: urlMap,
    bookmarks: [
      { title: "Starting Point", path: "pages/home.html" },
      { title: "GDPR Manage", path: "sites/gdpr/index.html" },
      { title: "TikTok For You", path: "sites/tiktok/fyp.html" },
      { title: "Hearing", path: "sites/trust/index.html" },
      { title: "IGTV", path: "sites/instagram/igtv.html" }
    ],
    fallbackUrlBase: "http://home.microsoft.com/intl/web2018/",
    locationHints: [
      { re: /fortnite.?ios|ios.?fortnite/i, path: "sites/fnios/index.html" },
      { re: /google\+|gplus|g\+/i, path: "sites/gplusend/index.html" },
      { re: /craigslist|fosta|personals/i, path: "sites/clpersonals/index.html" },
      { re: /mastodon/i, path: "sites/mastodon/index.html" },
      { re: /itunes/i, path: "sites/itunesmovie/index.html" },
      { re: /screen.?time/i, path: "sites/screentime/index.html" },
      { re: /gdpr|cookie|consent|manage|banner/i, path: "sites/gdpr/index.html" },
      { re: /tiktok|fyp|for you|musical/i, path: "sites/tiktok/fyp.html" },
      { re: /hearing|zuckerberg|cambridge|senate/i, path: "sites/trust/index.html" },
      { re: /igtv|reels/i, path: "sites/instagram/igtv.html" },
      { re: /not.?secure|chrome.?68|http/i, path: "sites/chrome/not-secure.html" },
      { re: /homepod/i, path: "sites/homepod/index.html" },
      { re: /spectre|meltdown/i, path: "sites/spectre/index.html" },
      { re: /fortnite|switch/i, path: "sites/fortnite/switch.html" },
      { re: /github/i, path: "sites/github/microsoft.html" }
    ]
  };
})(typeof window !== "undefined" ? window : this);
