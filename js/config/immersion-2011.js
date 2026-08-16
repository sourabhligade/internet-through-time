/**
 * Immersion config — 2011
 * Thesis: Spotify US · Timeline · Google+ · iPhone 4S/Siri · iPad 2 · Netflix/Qwikster · IE 9
 */
(function (global) {
  "use strict";
  var ITT = global.ITT || (global.ITT = {});
  ITT.immersionConfigs = ITT.immersionConfigs || {};

  ITT.immersionConfigs["2011"] = {
    year: "2011",
    storagePrefix: "itt11",
    features: {
      flowMap: true,
      nav: true,
      facebook: true,
      iphone: true,
      chromeBrowser: true,
      android: true,
      netflix: true,
      instagram: true,
      spotify: true,
      googleplus: true,
      snapchat: true,
      siri: true,
      timeline: true,
      playable: true,
      youtube: true
    },
    navSubtitle: "Win7 · IE 9 · Airbnb request · Spotify US · Timeline · Siri",
    nav: [
      { label: "Start", href: "pages/home.html", match: "/pages/" },
      { label: "Airbnb", href: "sites/airbnb/index.html", match: "/airbnb/" },
      { label: "Spotify", href: "sites/spotify/index.html", match: "/spotify/" },
      { label: "Timeline", href: "sites/facebook/timeline.html", match: "/facebook/" },
      { label: "Google+", href: "sites/googleplus/index.html", match: "/googleplus/" },
      { label: "iPhone 4S", href: "sites/iphone/index.html", match: "/iphone/" },
      { label: "iPad 2", href: "sites/ipad/index.html", match: "/ipad/" },
      { label: "Netflix", href: "sites/netflix/index.html", match: "/netflix/" }
    ],
    footerNav: [
      { label: "Starting Point", href: "pages/home.html" },
      { label: "Flow map", href: "pages/map.html" },
      { label: "Airbnb", href: "sites/airbnb/index.html" },
      { label: "Spotify US", href: "sites/spotify/index.html" },
      { label: "Timeline", href: "sites/facebook/timeline.html" },
      { label: "Google+", href: "sites/googleplus/index.html" },
      { label: "iPhone 4S", href: "sites/iphone/index.html" },
      { label: "IE 9", href: "sites/ie9/index.html" },
      { label: "About 2011", href: "pages/about.html" }
    ],
    tour: [
      {
        id: "airbnb",
        label: "Airbnb request",
        href: "sites/airbnb/index.html",
        match: "/airbnb/",
        hint: "city → listing → request · not Instant Book",
        doneMessage: "Host accepts — museum theater, no pay."
      },
      {
        id: "about",
        label: "About 2011",
        href: "pages/about.html",
        match: "/about",
        hint: "streaming · Timeline · Siri · dual scale",
        doneMessage: "Spotify US · Timeline · Google+ · 4S · PC still mass."
      },
      {
        id: "spotify",
        label: "Spotify US",
        href: "sites/spotify/index.html",
        match: "/spotify/",
        hint: "Jul 14 · invite free · $4.99 / $9.99",
        doneMessage: "Music streaming opens the United States."
      },
      {
        id: "timeline",
        label: "Facebook Timeline",
        href: "sites/facebook/timeline.html",
        match: "/timeline",
        hint: "Sep 22 F8 · life story profile",
        doneMessage: "The Wall becomes a Timeline."
      },
      {
        id: "googleplus",
        label: "Google+",
        href: "sites/googleplus/index.html",
        match: "/googleplus/",
        hint: "Circles · Hangouts · +1",
        doneMessage: "Circles try to beat the friend graph."
      },
      {
        id: "iphone",
        label: "iPhone 4S + Siri",
        href: "sites/iphone/index.html",
        match: "/iphone/",
        hint: "Oct 4 · Siri · iOS 5 · iCloud",
        doneMessage: "Ask Siri — beta voice assistant."
      },
      {
        id: "ipad",
        label: "iPad 2",
        href: "sites/ipad/index.html",
        match: "/ipad/",
        hint: "Mar 11 · thinner · cameras · $499+",
        doneMessage: "Tablet category gets a second generation."
      },
      {
        id: "netflix",
        label: "Netflix / Qwikster",
        href: "sites/netflix/index.html",
        match: "/netflix/",
        hint: "price hike · Qwikster reverse",
        doneMessage: "Streaming is infrastructure — and almost a fiasco."
      },
      {
        id: "ie9",
        label: "Internet Explorer 9",
        href: "sites/ie9/index.html",
        match: "/ie9/",
        hint: "Mar 14 · HTML5 · GPU",
        doneMessage: "IE 9 is the mass browser upgrade story."
      }
    ]
  };
})(typeof window !== "undefined" ? window : this);
