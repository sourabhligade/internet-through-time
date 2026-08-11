/**
 * Immersion config — 2018
 * Thesis: GDPR · TikTok · hearing · 1.63B
 */
(function (global) {
  "use strict";
  var ITT = global.ITT || (global.ITT = {});
  ITT.immersionConfigs = ITT.immersionConfigs || {};

  ITT.immersionConfigs["2018"] = {
    year: "2018",
    storagePrefix: "itt18",
    features: {
      year2018extras: true,
      yearplayable: true,
      flowMap: true,
      nav: true,
      chromeBrowser: true,
      amazon: false,
      auction: false
    },
    navSubtitle: "GDPR · TikTok · hearing · 1.63B",
    nav: [
      { label: "Start", href: "pages/home.html", match: "/pages/" },
      { label: "GDPR", href: "sites/gdpr/index.html", match: "/gdpr" },
      { label: "TikTok", href: "sites/tiktok/fyp.html", match: "/tiktok" },
      { label: "Hearing", href: "sites/trust/index.html", match: "/trust" },
      { label: "IGTV", href: "sites/instagram/igtv.html", match: "/igtv" },
      { label: "Chrome", href: "sites/chrome/index.html", match: "/chrome/" },
      { label: "Win10", href: "sites/windows10/index.html", match: "/windows10/" }
    ],
    footerNav: [
      { label: "Starting Point", href: "pages/home.html" },
      { label: "Flow map", href: "pages/map.html" },
      { label: "GDPR Manage", href: "sites/gdpr/index.html" },
      { label: "TikTok FYP", href: "sites/tiktok/fyp.html" },
      { label: "Hearing", href: "sites/trust/index.html" },
      { label: "IGTV", href: "sites/instagram/igtv.html" },
      { label: "What's New", href: "pages/whats-new.html" },
      { label: "About 2018", href: "pages/about.html" }
    ],
    tour: [
      {
        id: "about",
        label: "About 2018",
        href: "pages/about.html",
        match: "/about",
        hint: "1.63B · −8%",
        doneMessage: "GDPR · TikTok · hearing · half the world online."
      },
      {
        id: "gdpr",
        label: "GDPR Manage",
        href: "sites/gdpr/index.html",
        match: "/gdpr",
        hint: "25 May · Manage is the save",
        doneMessage: "The banner is the door."
      },
      {
        id: "tiktok",
        label: "TikTok FYP",
        href: "sites/tiktok/fyp.html",
        match: "/tiktok",
        hint: "Aug 2 merge",
        doneMessage: "The loops change their name."
      },
      {
        id: "hearing",
        label: "Hearing",
        href: "sites/trust/index.html",
        match: "/trust",
        hint: "Apr 10",
        doneMessage: "A quiz becomes a hearing."
      },
      {
        id: "igtv",
        label: "IGTV",
        href: "sites/instagram/igtv.html",
        match: "/igtv",
        hint: "Jun 20 · not Reels",
        doneMessage: "Vertical hour-class."
      },
      {
        id: "chrome",
        label: "Chrome 68",
        href: "sites/chrome/not-secure.html",
        match: "/not-secure",
        hint: "Not secure",
        doneMessage: "HTTP pages say Not secure."
      }
    ]
  };
})(typeof window !== "undefined" ? window : this);
