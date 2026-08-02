/**
 * Immersion config — 2009
 * Thesis: 3GS · Like · FarmVille · Bing · Win7 · apps daily · still mostly PC
 */
(function (global) {
  "use strict";
  var ITT = global.ITT || (global.ITT = {});
  ITT.immersionConfigs = ITT.immersionConfigs || {};

  ITT.immersionConfigs["2009"] = {
    year: "2009",
    storagePrefix: "itt09",
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
      wave: true
    },
    navSubtitle: "XP · IE 8 · 3GS · Like · FarmVille · Bing · Win7",
    nav: [
      { label: "Start", href: "pages/home.html", match: "/pages/" },
      { label: "App Store", href: "sites/appstore/index.html", match: "/appstore/" },
      { label: "iPhone", href: "sites/iphone/index.html", match: "/iphone/" },
      { label: "Facebook", href: "sites/facebook/index.html", match: "/facebook/" },
      { label: "FarmVille", href: "sites/farmville/index.html", match: "/farmville/" },
      { label: "Bing", href: "sites/bing/index.html", match: "/bing/" },
      { label: "Twitter", href: "sites/twitter/index.html", match: "/twitter/" },
      { label: "YouTube", href: "sites/youtube/index.html", match: "/youtube/" }
    ],
    footerNav: [
      { label: "Starting Point", href: "pages/home.html" },
      { label: "App Store", href: "sites/appstore/index.html" },
      { label: "iPhone 3GS", href: "sites/iphone/index.html" },
      { label: "FarmVille", href: "sites/farmville/index.html" },
      { label: "Bing", href: "sites/bing/index.html" },
      { label: "Windows 7", href: "sites/windows7/index.html" },
      { label: "About 2009", href: "pages/about.html" }
    ],
    tour: [
      {
        id: "about",
        label: "About 2009",
        href: "pages/about.html",
        match: "/about",
        hint: "social mainstream + apps daily · still mostly PC",
        doneMessage: "Like · FarmVille · 3GS · Bing · Win7 · PC still mass."
      },
      {
        id: "appstore",
        label: "App Store",
        href: "sites/appstore/index.html",
        match: "/appstore/",
        hint: "50k+ apps · 1B downloads · install theater",
        doneMessage: "Apps every day — not ~500 anymore."
      },
      {
        id: "iphone",
        label: "iPhone 3GS",
        href: "sites/iphone/index.html",
        match: "/iphone/",
        hint: "Jun 19 · $199/$299 · OS 3.0 · video · copy/paste",
        doneMessage: "3GS is the 2009 flagship."
      },
      {
        id: "facebook",
        label: "Facebook Like",
        href: "sites/facebook/feed.html",
        match: "/facebook/",
        hint: "Like · Beacon ends · Platform games",
        doneMessage: "Social web goes mainstream."
      },
      {
        id: "farmville",
        label: "FarmVille",
        href: "sites/farmville/index.html",
        match: "/farmville/",
        hint: "Jun 19 · plant · harvest · neighbors",
        doneMessage: "Freemium feed spam invents itself."
      },
      {
        id: "bing",
        label: "Bing",
        href: "sites/bing/index.html",
        match: "/bing/",
        hint: "Jun 3 decision engine",
        doneMessage: "Try the rebrand — Google still wins mindshare."
      },
      {
        id: "windows7",
        label: "Windows 7",
        href: "sites/windows7/index.html",
        match: "/windows7/",
        hint: "Oct 22 GA · not January default",
        doneMessage: "PC not dead · Vista hangover ends."
      },
      {
        id: "foursquare",
        label: "Foursquare",
        href: "sites/foursquare/index.html",
        match: "/foursquare/",
        hint: "SXSW check-in seed",
        doneMessage: "Mayor of the bar — thousands not millions."
      }
    ]
  };
})(typeof window !== "undefined" ? window : this);
