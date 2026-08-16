/**
 * Immersion config — 2021
 * Thesis: ATT · Signal · Meta · Win11 residual
 */
(function (global) {
  "use strict";
  var ITT = global.ITT || (global.ITT = {});
  ITT.immersionConfigs = ITT.immersionConfigs || {};

  ITT.immersionConfigs["2021"] = {
    year: "2021",
    storagePrefix: "itt21",
    features: {
      year2021extras: true,
      yearplayable: true,
      flowMap: true,
      nav: true,
      chromeBrowser: true,
      amazon: false,
      auction: false
    },
    navSubtitle: "ATT · Signal · Meta · 4.9B",
    nav: [
      { label: "Start", href: "pages/home.html", match: "/pages/" },
      { label: "ATT", href: "sites/att/index.html", match: "/att" },
      { label: "Signal", href: "sites/signal/index.html", match: "/signal" },
      { label: "Meta", href: "sites/meta/index.html", match: "/meta" },
      { label: "Win11", href: "sites/windows11/index.html", match: "/windows11" },
      { label: "Flash", href: "sites/flash/brick.html", match: "/flash" },
      { label: "Chrome", href: "sites/chrome/index.html", match: "/chrome/" },
      { label: "Win10", href: "sites/windows10/index.html", match: "/windows10/" }
    ],
    footerNav: [
      { label: "Starting Point", href: "pages/home.html" },
      { label: "Flow map", href: "pages/map.html" },
      { label: "ATT", href: "sites/att/index.html" },
      { label: "Signal", href: "sites/signal/index.html" },
      { label: "Meta", href: "sites/meta/index.html" },
      { label: "What's New", href: "pages/whats-new.html" },
      { label: "About 2021", href: "pages/about.html" }
    ],
    tour: [
      {
        id: "about",
        label: "About 2021",
        href: "pages/about.html",
        match: "/about",
        hint: "4.9B · table ended",
        doneMessage: "The table still ended. 4.9 billion people used the internet."
      },
      {
        id: "att",
        label: "ATT",
        href: "sites/att/index.html",
        match: "/att",
        hint: "26 Apr · Not to Track",
        doneMessage: "Allow is the trap. Not to Track is the save."
      },
      {
        id: "signal",
        label: "Signal",
        href: "sites/signal/index.html",
        match: "/signal",
        hint: "Jan exodus",
        doneMessage: "E2E was 2016. This is the Facebook-share scare."
      },
      {
        id: "meta",
        label: "Meta",
        href: "sites/meta/index.html",
        match: "/meta",
        hint: "28 Oct · app still Facebook",
        doneMessage: "The company changed. The app did not."
      }
    ]
  };
})(typeof window !== "undefined" ? window : this);
