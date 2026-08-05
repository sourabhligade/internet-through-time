/**
 * Immersion config — 2003
 */
(function (global) {
  "use strict";
  var ITT = global.ITT || (global.ITT = {});
  ITT.immersionConfigs = ITT.immersionConfigs || {};

  ITT.immersionConfigs["2003"] = {
    year: "2003",
    storagePrefix: "itt03",
    features: {
      flowMap: true,
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
      bloglines: true
    },
    navSubtitle: "IE 6 · Windows XP · MySpace · iTunes Store",
    nav: [
      { label: "Start", href: "pages/home.html", match: "/pages/" },
      { label: "MySpace", href: "sites/myspace/index.html", match: "/myspace/" },
      { label: "iTunes", href: "sites/itunes/index.html", match: "/itunes/" },
      { label: "WordPress", href: "sites/wordpress/index.html", match: "/wordpress/" },
      { label: "LinkedIn", href: "sites/linkedin/index.html", match: "/linkedin/" },
      { label: "Google", href: "sites/google/index.html", match: "/google/" },
      { label: "Amazon", href: "sites/amazon/index.html", match: "/amazon/" }
    ],
    footerNav: [
      { label: "Starting Point", href: "pages/home.html" },
      { label: "Flow map", href: "pages/map.html" },
      { label: "MySpace", href: "sites/myspace/index.html" },
      { label: "iTunes Store", href: "sites/itunes/index.html" },
      { label: "About 2003", href: "pages/about.html" }
    ],
    tour: [
      {
        id: "about",
        label: "About 2003",
        href: "pages/about.html",
        match: "/about",
        hint: "40.9M sites · four pillars",
        doneMessage: "Social + 99¢ + self-host + pro network."
      },
      {
        id: "myspace",
        label: "MySpace",
        href: "sites/myspace/index.html",
        match: "/myspace/",
        hint: "edit profile · Top 8 · comments",
        doneMessage: "MySpace seed — Friendster still larger in 2003."
      },
      {
        id: "itunes",
        label: "iTunes Store",
        href: "sites/itunes/index.html",
        match: "/itunes/",
        hint: "buy a 99¢ track (theater)",
        doneMessage: "Legal downloads vs KaZaA — not streaming."
      },
      {
        id: "wordpress",
        label: "WordPress",
        href: "sites/wordpress/index.html",
        match: "/wordpress/",
        hint: "self-host publish path",
        doneMessage: "WordPress 0.7 — open self-host blogs."
      },
      {
        id: "linkedin",
        label: "LinkedIn",
        href: "sites/linkedin/index.html",
        match: "/linkedin/",
        hint: "connect professionally",
        doneMessage: "Careers graph — not dating."
      },
      {
        id: "adsense",
        label: "AdSense",
        href: "sites/adsense/index.html",
        match: "/adsense/",
        hint: "pro-blog monetization",
        doneMessage: "Self-serve ads fund content pages."
      },
      {
        id: "bloglines",
        label: "Bloglines",
        href: "sites/bloglines/index.html",
        match: "/bloglines/",
        hint: "browser RSS — no install",
        doneMessage: "Subscribe without a desktop reader."
      },
      {
        id: "google",
        label: "Google",
        href: "sites/google/index.html",
        match: "/google/",
        hint: "search habit continues",
        doneMessage: "Google + Blogger acquisition year."
      },
      {
        id: "amazon",
        label: "Amazon",
        href: "sites/amazon/index.html",
        match: "/amazon/",
        hint: "smile continues",
        doneMessage: "Commerce continuity."
      }
    ]
  };
})(typeof window !== "undefined" ? window : this);
