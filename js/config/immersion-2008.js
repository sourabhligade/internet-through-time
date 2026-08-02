/**
 * Immersion config — 2008
 * Thesis: App Store · iPhone 3G · Chrome · Android G1 · Hulu · still mostly PC
 */
(function (global) {
  "use strict";
  var ITT = global.ITT || (global.ITT = {});
  ITT.immersionConfigs = ITT.immersionConfigs || {};

  ITT.immersionConfigs["2008"] = {
    year: "2008",
    storagePrefix: "itt08",
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
      netflix: true
    },
    navSubtitle: "XP · IE 7 · App Store · iPhone 3G · Chrome · Android G1",
    nav: [
      { label: "Start", href: "pages/home.html", match: "/pages/" },
      { label: "App Store", href: "sites/appstore/index.html", match: "/appstore/" },
      { label: "iPhone", href: "sites/iphone/index.html", match: "/iphone/" },
      { label: "Chrome", href: "sites/chrome/index.html", match: "/chrome/" },
      { label: "Android", href: "sites/android/index.html", match: "/android/" },
      { label: "Hulu", href: "sites/hulu/index.html", match: "/hulu/" },
      { label: "Facebook", href: "sites/facebook/index.html", match: "/facebook/" },
      { label: "YouTube", href: "sites/youtube/index.html", match: "/youtube/" }
    ],
    footerNav: [
      { label: "Starting Point", href: "pages/home.html" },
      { label: "App Store", href: "sites/appstore/index.html" },
      { label: "iPhone 3G", href: "sites/iphone/index.html" },
      { label: "Chrome", href: "sites/chrome/index.html" },
      { label: "Android G1", href: "sites/android/index.html" },
      { label: "Hulu", href: "sites/hulu/index.html" },
      { label: "About 2008", href: "pages/about.html" }
    ],
    tour: [
      {
        id: "about",
        label: "About 2008",
        href: "pages/about.html",
        match: "/about",
        hint: "apps + Chrome + first Android · still mostly PC",
        doneMessage: "Gatekeepers begin · browser reinvented · PC still mass."
      },
      {
        id: "appstore",
        label: "App Store",
        href: "sites/appstore/index.html",
        match: "/appstore/",
        hint: "Jul 10–11 · ~500 apps · install theater",
        doneMessage: "There’s an app for that — seed culture."
      },
      {
        id: "iphone",
        label: "iPhone 3G",
        href: "sites/iphone/index.html",
        match: "/iphone/",
        hint: "Jul 11 · $199/$299 · 3G · GPS · OS 2.0",
        doneMessage: "Phone is a platform, not Safari-only."
      },
      {
        id: "chrome",
        label: "Chrome",
        href: "sites/chrome/index.html",
        match: "/chrome/",
        hint: "Sep 2 Windows beta · Dec 1.0",
        doneMessage: "Browser built for web apps · Windows first."
      },
      {
        id: "android",
        label: "Android G1",
        href: "sites/android/index.html",
        match: "/android/",
        hint: "Oct US · T-Mobile · Market",
        doneMessage: "First consumer Android phone."
      },
      {
        id: "hulu",
        label: "Hulu",
        href: "sites/hulu/index.html",
        match: "/hulu/",
        hint: "Mar 12 public · free TV online",
        doneMessage: "Last night’s show legally in the browser."
      },
      {
        id: "youtube",
        label: "YouTube",
        href: "sites/youtube/index.html",
        match: "/youtube/",
        hint: "Google · Flash · HD late year",
        doneMessage: "Broadcast Yourself under Google."
      },
      {
        id: "dropbox",
        label: "Dropbox birthmark",
        href: "sites/dropbox/index.html",
        match: "/dropbox/",
        hint: "Live Stats 2008 chart · folder sync theater",
        doneMessage: "Magic folder · USB stick replacement lore."
      },
      {
        id: "spotify",
        label: "Spotify Europe",
        href: "sites/spotify/index.html",
        match: "/spotify/",
        hint: "Oct Europe · invite · not US public",
        doneMessage: "Freemium Europe · US still iTunes/P2P residual."
      },
      {
        id: "friendconnect",
        label: "Friend Connect",
        href: "sites/friendconnect/index.html",
        match: "/friendconnect/",
        hint: "Dec OpenSocial paste path vs FB Connect",
        doneMessage: "Social login stack wars · still no monopoly."
      }
    ]
  };
})(typeof window !== "undefined" ? window : this);
