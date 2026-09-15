/**
 * Year config — 2019 lean from-scratch
 * Data only. Behavior lives in browser-core.js.
 */
(function (global) {
  "use strict";
  var ITT = global.ITT || (global.ITT = {});
  ITT.configs = ITT.configs || {};

  var rooms = [
    "index.html",
    "pages/about.html",
    "pages/error/404.html",
    "pages/error/unreachable.html",
    "pages/home.html",
    "pages/map.html",
    "pages/whats-new.html",
    "sites/airpodspro/index.html",
    "sites/airpodspro/pair.html",
    "sites/amazon/index.html",
    "sites/applecard/index.html",
    "sites/appletv/index.html",
    "sites/appletv/watch.html",
    "sites/arcade/index.html",
    "sites/arcade/play.html",
    "sites/chrome/index.html",
    "sites/cnil/index.html",
    "sites/disneyplus/about.html",
    "sites/disneyplus/home.html",
    "sites/disneyplus/index.html",
    "sites/disneyplus/queue.html",
    "sites/facebook/index.html",
    "sites/ftc/index.html",
    "sites/github/index.html",
    "sites/google/index.html",
    "sites/hulu/index.html",
    "sites/instagram/index.html",
    "sites/ios13/index.html",
    "sites/ipados/index.html",
    "sites/iphone/about.html",
    "sites/iphone/iphone11.html",
    "sites/linkedin/index.html",
    "sites/netflix/index.html",
    "sites/nyt/index.html",
    "sites/oculusquest/index.html",
    "sites/pinterest/index.html",
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
    "sites/playable/game.html",
    "sites/playable/index.html",
    "sites/playable/more-a.html",
    "sites/playable/more-b.html",
    "sites/playable/more-c.html",
    "sites/playable/more-d.html",
    "sites/playable/more.html",
    "sites/reddit/index.html",
    "sites/slack/index.html",
    "sites/snapchat/index.html",
    "sites/spotify/index.html",
    "sites/stadia/index.html",
    "sites/stadia/stream.html",
    "sites/switchlite/index.html",
    "sites/tiktok/create.html",
    "sites/tiktok/index.html",
    "sites/twitch/index.html",
    "sites/twitter/index.html",
    "sites/uber/index.html",
    "sites/whatsapp/index.html",
    "sites/wikipedia/index.html",
    "sites/windows10/index.html",
    "sites/yahoo/index.html",
    "sites/youtube/index.html"
  ];;;

  var urlMap = {
    "index.html": "http://museum.local/index.html",
    "pages/home.html": "http://home.microsoft.com/intl/web2019/",
    "pages/about.html": "http://home.microsoft.com/intl/web2019/about.html",
    "pages/map.html": "http://museum.local/years/2019/map/",
    "pages/whats-new.html": "http://museum.local/pages/whats-new.html"};
  var i;
  for (i = 0; i < rooms.length; i++) {
    if (!urlMap[rooms[i]]) {
      urlMap[rooms[i]] = "http://museum.local/years/2019/" + rooms[i];
    }
  }

  ITT.configs["2019"] = {
    year: "2019",
    storagePrefix: "itt19",
    home: "pages/home.html",
    prefsKey: "itt-2019-prefs",
    bookmarksKey: "itt-2019-bookmarks",
    connectedKey: "itt-2019-connected",
    immersionScript: "js/immersion-2019.js",
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
      homeUrl: "http://home.microsoft.com/intl/web2019/",
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
      { title: "Disney+ Continue", path: "sites/disneyplus/home.html" },
      { title: "TikTok For You", path: "sites/tiktok/index.html" },
      { title: "Apple Arcade", path: "sites/arcade/index.html" },
      { title: "Stadia", path: "sites/stadia/index.html" }
    ],
    fallbackUrlBase: "http://home.microsoft.com/intl/web2019/",
    locationHints: [
      { re: /disney|continue|trial/i, path: "sites/disneyplus/home.html" },
      { re: /tiktok|fyp|for you|coppa/i, path: "sites/tiktok/index.html" },
      { re: /arcade/i, path: "sites/arcade/index.html" },
      { re: /apple.?tv|tv\+/i, path: "sites/appletv/index.html" },
      { re: /stadia|founders|premiere/i, path: "sites/stadia/index.html" },
      { re: /iphone.?11/i, path: "sites/iphone/iphone11.html" },
      { re: /airpods/i, path: "sites/airpodspro/index.html" },
      { re: /chrome/i, path: "sites/chrome/index.html" },
      { re: /win(dows)?.?10/i, path: "sites/windows10/index.html" },
      { re: /continue row|playable|game/i, path: "sites/playable/game.html" },
      { re: /ios.?13|dark.?mode/i, path: "sites/ios13/index.html" },
      { re: /ipados/i, path: "sites/ipados/index.html" },
      { re: /cnil/i, path: "sites/cnil/index.html" },
      { re: /\bftc\b/i, path: "sites/ftc/index.html" }
    ]
  };
})(typeof window !== "undefined" ? window : this);
