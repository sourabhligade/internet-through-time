/**
 * Immersion config — 2007
 * Thesis: iPhone · Gmail open · Street View · Facebook Platform · Twitter breakout
 */
(function (global) {
  "use strict";
  var ITT = global.ITT || (global.ITT = {});
  ITT.immersionConfigs = ITT.immersionConfigs || {};

  ITT.immersionConfigs["2007"] = {
    year: "2007",
    storagePrefix: "itt07",
    features: {
      nav: true,
      amazon: true,
      auction: true,
      geocities: true,
      google: true,
      excite: true,
      yahoo: true,
      napster: true,
      blogger: true,
      slashdot: true,
      technorati: true,
      plugin: true,
      friendster: true,
      kazaa: true,
      myspace: true,
      itunes: true,
      wordpress: true,
      linkedin: true,
      adsense: true,
      bloglines: true,
      gmail: true,
      facebook: true,
      flickr: true,
      youtube: true,
      maps: true,
      reddit: true,
      digg: true,
      podcasts: true,
      delicious: true,
      housingmaps: true,
      feedburner: true,
      twitter: true,
      docs: true,
      aws: true,
      reader: true,
      iphone: true
    },
    navSubtitle: "XP · IE · iPhone · Gmail open · Street View · Facebook Platform",
    nav: [
      { label: "Start", href: "pages/home.html", match: "/pages/" },
      { label: "iPhone", href: "sites/iphone/index.html", match: "/iphone/" },
      { label: "Gmail", href: "sites/gmail/index.html", match: "/gmail/" },
      { label: "Maps", href: "sites/maps/index.html", match: "/maps/" },
      { label: "Facebook", href: "sites/facebook/index.html", match: "/facebook/" },
      { label: "Twitter", href: "sites/twitter/index.html", match: "/twitter/" },
      { label: "YouTube", href: "sites/youtube/index.html", match: "/youtube/" },
      { label: "Google", href: "sites/google/index.html", match: "/google/" }
    ],
    footerNav: [
      { label: "Starting Point", href: "pages/home.html" },
      { label: "iPhone", href: "sites/iphone/index.html" },
      { label: "Gmail", href: "sites/gmail/index.html" },
      { label: "Street View", href: "sites/maps/streetview.html" },
      { label: "Facebook Platform", href: "sites/facebook/platform.html" },
      { label: "Twitter", href: "sites/twitter/index.html" },
      { label: "About 2007", href: "pages/about.html" }
    ],
    tour: [
      {
        id: "about",
        label: "About 2007",
        href: "pages/about.html",
        match: "/about",
        hint: "iPhone · open Gmail · Street View · platforms",
        doneMessage: "Mobile web arrives · open signup · maps on the street."
      },
      {
        id: "iphone",
        label: "iPhone",
        href: "sites/iphone/index.html",
        match: "/iphone/",
        hint: "Jan 9 announce · Jun 29 ship · no App Store",
        doneMessage: "Safari on multi-touch — not an app platform yet."
      },
      {
        id: "gmail",
        label: "Gmail open",
        href: "sites/gmail/index.html",
        match: "/gmail/",
        hint: "Feb 14 open to everyone",
        doneMessage: "Invite scarcity ends as product default."
      },
      {
        id: "maps",
        label: "Street View",
        href: "sites/maps/streetview.html",
        match: "/streetview",
        hint: "May 29 debut",
        doneMessage: "Pegman-class street photography theater."
      },
      {
        id: "facebook",
        label: "Facebook Platform",
        href: "sites/facebook/platform.html",
        match: "/platform",
        hint: "May 24 apps platform",
        doneMessage: "Third-party apps on the social graph."
      },
      {
        id: "twitter",
        label: "Twitter",
        href: "sites/twitter/index.html",
        match: "/twitter/",
        hint: "SXSW breakout year",
        doneMessage: "140 chars still · growth year."
      },
      {
        id: "youtube",
        label: "YouTube",
        href: "sites/youtube/index.html",
        match: "/youtube/",
        hint: "Google-owned all year",
        doneMessage: "Broadcast Yourself under Google."
      }
    ]
  };
})(typeof window !== "undefined" ? window : this);
