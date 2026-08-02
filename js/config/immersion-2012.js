/**
 * Immersion config — 2012
 * Thesis: Instagram Android + FB buy · IPO · 1B · Pinterest · iPhone 5 · Win8 · Chrome
 */
(function (global) {
  "use strict";
  var ITT = global.ITT || (global.ITT = {});
  ITT.immersionConfigs = ITT.immersionConfigs || {};

  ITT.immersionConfigs["2012"] = {
    year: "2012",
    storagePrefix: "itt12",
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
      iphone: true,
      appstore: true,
      chromeBrowser: true,
      android: true,
      hulu: true,
      netflix: true,
      farmville: true,
      bing: true,
      foursquare: true,
      kickstarter: true,
      wave: true,
      instagram: true,
      pinterest: true,
      spotify: true,
      googleplus: true,
      snapchat: true,
      siri: true,
      timeline: true,
      instagramAndroid: true,
      fbIpo: true,
      uberX: true,
      win8: true
    },
    navSubtitle: "Win7 · Chrome/IE9 · Instagram · FB IPO · iPhone 5 · Pinterest",
    nav: [
      { label: "Start", href: "pages/home.html", match: "/pages/" },
      { label: "Instagram", href: "sites/instagram/index.html", match: "/instagram/" },
      { label: "Facebook", href: "sites/facebook/ipo.html", match: "/facebook/" },
      { label: "Pinterest", href: "sites/pinterest/index.html", match: "/pinterest/" },
      { label: "iPhone 5", href: "sites/iphone/index.html", match: "/iphone/" },
      { label: "iPad mini", href: "sites/ipad/index.html", match: "/ipad/" },
      { label: "Chrome", href: "sites/chrome/index.html", match: "/chrome/" },
      { label: "Win8", href: "sites/windows8/index.html", match: "/windows8/" }
    ],
    footerNav: [
      { label: "Starting Point", href: "pages/home.html" },
      { label: "Instagram", href: "sites/instagram/index.html" },
      { label: "FB IPO", href: "sites/facebook/ipo.html" },
      { label: "Pinterest", href: "sites/pinterest/index.html" },
      { label: "iPhone 5", href: "sites/iphone/index.html" },
      { label: "Windows 8", href: "sites/windows8/index.html" },
      { label: "SOPA", href: "sites/wikipedia/sopa-blackout.html" },
      { label: "About 2012", href: "pages/about.html" }
    ],
    tour: [
      {
        id: "about",
        label: "About 2012",
        href: "pages/about.html",
        match: "/about",
        hint: "visual web · apps · dual scale",
        doneMessage: "Instagram Android · FB IPO · iPhone 5 · Chrome."
      },
      {
        id: "instagram",
        label: "Instagram Android + sale",
        href: "sites/instagram/index.html",
        match: "/instagram/",
        hint: "Apr 3 Android · Apr 9 FB ~$1B",
        doneMessage: "App-first photos · multi-platform · owned but standalone."
      },
      {
        id: "facebook",
        label: "Facebook IPO / 1B",
        href: "sites/facebook/ipo.html",
        match: "/ipo",
        hint: "May 18 · $38 · Oct 1B MAU",
        doneMessage: "Social network goes public at scale."
      },
      {
        id: "pinterest",
        label: "Pinterest",
        href: "sites/pinterest/index.html",
        match: "/pinterest/",
        hint: "mass open · pin boards",
        doneMessage: "Visual web in the browser."
      },
      {
        id: "iphone",
        label: "iPhone 5 + Maps",
        href: "sites/iphone/index.html",
        match: "/iphone/",
        hint: "Lightning · 4″ · iOS 6 Maps",
        doneMessage: "Taller phone · new connector · Maps drama."
      },
      {
        id: "ipad",
        label: "iPad mini",
        href: "sites/ipad/index.html",
        match: "/ipad/",
        hint: "Nov 2 · $329+",
        doneMessage: "Small tablet category."
      },
      {
        id: "win8",
        label: "Windows 8",
        href: "sites/windows8/index.html",
        match: "/windows8/",
        hint: "Oct 26 · Start screen · IE 10",
        doneMessage: "Desktop reimagined (controversial)."
      },
      {
        id: "chrome",
        label: "Chrome vs IE",
        href: "sites/chrome/index.html",
        match: "/chrome/",
        hint: "StatCounter #1 class",
        doneMessage: "Chrome takes the browser crown (label source)."
      }
    ]
  };
})(typeof window !== "undefined" ? window : this);
