/**
 * Immersion config — 2020
 * Thesis: Zoom · Reels · CCPA · Flash EOL
 */
(function (global) {
  "use strict";
  var ITT = global.ITT || (global.ITT = {});
  ITT.immersionConfigs = ITT.immersionConfigs || {};

  ITT.immersionConfigs["2020"] = {
    year: "2020",
    storagePrefix: "itt20",
    features: {
      year2020extras: true,
      yearplayable: true,
      flowMap: true,
      nav: true,
      chromeBrowser: true,
      amazon: false,
      auction: false
    },
    navSubtitle: "Zoom · mute · 300M participants",
    nav: [
      { label: "Start", href: "pages/home.html", match: "/pages/" },
      { label: "Zoom", href: "sites/zoom/index.html", match: "/zoom" },
      { label: "Reels", href: "sites/instagram/reels.html", match: "/reels" },
      { label: "CCPA", href: "sites/ccpa/index.html", match: "/ccpa" },
      { label: "Flash", href: "sites/flash/eol.html", match: "/flash" },
      { label: "Edge", href: "sites/edge/index.html", match: "/edge" },
      { label: "Chrome", href: "sites/chrome/index.html", match: "/chrome/" },
      { label: "Win10", href: "sites/windows10/index.html", match: "/windows10/" }
    ],
    footerNav: [
      { label: "Starting Point", href: "pages/home.html" },
      { label: "Flow map", href: "pages/map.html" },
      { label: "Zoom", href: "sites/zoom/index.html" },
      { label: "Reels", href: "sites/instagram/reels.html" },
      { label: "CCPA", href: "sites/ccpa/index.html" },
      { label: "Flash", href: "sites/flash/eol.html" },
      { label: "What's New", href: "pages/whats-new.html" },
      { label: "About 2020", href: "pages/about.html" }
    ],
    tour: [
      {
        id: "about",
        label: "About 2020",
        href: "pages/about.html",
        match: "/about",
        hint: "table ended · 189M active",
        doneMessage: "You're muted. Participants, not users."
      },
      {
        id: "zoom",
        label: "Zoom",
        href: "sites/zoom/index.html",
        match: "/zoom",
        hint: "join · mute · chat · leave",
        doneMessage: "The living room is the office."
      },
      {
        id: "reels",
        label: "Reels",
        href: "sites/instagram/reels.html",
        match: "/reels",
        hint: "Aug 5 · 15 seconds",
        doneMessage: "Reels is not Stories."
      },
      {
        id: "ccpa",
        label: "CCPA",
        href: "sites/ccpa/index.html",
        match: "/ccpa",
        hint: "Jan 1 · Do Not Sell",
        doneMessage: "Not the European banner."
      },
      {
        id: "flash",
        label: "Flash",
        href: "sites/flash/eol.html",
        match: "/flash",
        hint: "Dec 31 · the plugin dies",
        doneMessage: "Flash is finally dead."
      },
      {
        id: "edge",
        label: "Edge 79",
        href: "sites/edge/index.html",
        match: "/edge",
        hint: "Jan 15 stable",
        doneMessage: "Chromium Edge is real now."
      }
    ]
  };
})(typeof window !== "undefined" ? window : this);
