/**
 * Immersion config — 2010
 * Thesis: iPad · iPhone 4 · Instagram · Open Graph · Foursquare peak · still mostly PC
 */
(function (global) {
  "use strict";
  var ITT = global.ITT || (global.ITT = {});
  ITT.immersionConfigs = ITT.immersionConfigs || {};

  ITT.immersionConfigs["2010"] = {
    year: "2010",
    storagePrefix: "itt10",
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
      pinterest: true
    },
    navSubtitle: "Win7 · IE 8 · iPad · iPhone 4 · Instagram · Facebook",
    nav: [
      { label: "Start", href: "pages/home.html", match: "/pages/" },
      { label: "iPad", href: "sites/ipad/index.html", match: "/ipad/" },
      { label: "iPhone", href: "sites/iphone/index.html", match: "/iphone/" },
      { label: "Instagram", href: "sites/instagram/index.html", match: "/instagram/" },
      { label: "Facebook", href: "sites/facebook/index.html", match: "/facebook/" },
      { label: "App Store", href: "sites/appstore/index.html", match: "/appstore/" },
      { label: "Foursquare", href: "sites/foursquare/index.html", match: "/foursquare/" },
      { label: "YouTube", href: "sites/youtube/index.html", match: "/youtube/" }
    ],
    footerNav: [
      { label: "Starting Point", href: "pages/home.html" },
      { label: "iPad", href: "sites/ipad/index.html" },
      { label: "iPhone 4", href: "sites/iphone/index.html" },
      { label: "Instagram", href: "sites/instagram/index.html" },
      { label: "FarmVille", href: "sites/farmville/index.html" },
      { label: "Windows 7", href: "sites/windows7/index.html" },
      { label: "About 2010", href: "pages/about.html" }
    ],
    tour: [
      {
        id: "about",
        label: "About 2010",
        href: "pages/about.html",
        match: "/about",
        hint: "tablet + camera apps · still mostly PC",
        doneMessage: "iPad · iPhone 4 · Instagram · Open Graph · PC still mass."
      },
      {
        id: "ipad",
        label: "iPad",
        href: "sites/ipad/index.html",
        match: "/ipad/",
        hint: "Jan 27 · $499 · new category",
        doneMessage: "Tablet category invents itself."
      },
      {
        id: "iphone",
        label: "iPhone 4",
        href: "sites/iphone/index.html",
        match: "/iphone/",
        hint: "Retina · FaceTime · Antennagate",
        doneMessage: "iPhone 4 is the 2010 flagship."
      },
      {
        id: "instagram",
        label: "Instagram",
        href: "sites/instagram/index.html",
        match: "/instagram/",
        hint: "Oct 6 · iOS-only · filters",
        doneMessage: "Square photos + filters."
      },
      {
        id: "facebook",
        label: "Facebook",
        href: "sites/facebook/feed.html",
        match: "/facebook/",
        hint: "Open Graph · 600M · Places",
        doneMessage: "Social plugins colonize the web."
      },
      {
        id: "foursquare",
        label: "Foursquare",
        href: "sites/foursquare/index.html",
        match: "/foursquare/",
        hint: "Mayor culture peak",
        doneMessage: "Check-in is trendy."
      },
      {
        id: "farmville",
        label: "FarmVille",
        href: "sites/farmville/index.html",
        match: "/farmville/",
        hint: "Peak ~84M MAU Mar",
        doneMessage: "Social games peak year."
      },
      {
        id: "appstore",
        label: "App Store",
        href: "sites/appstore/index.html",
        match: "/appstore/",
        hint: "225k+ apps · 5B downloads",
        doneMessage: "Apps for phone and tablet."
      }
    ]
  };
})(typeof window !== "undefined" ? window : this);
