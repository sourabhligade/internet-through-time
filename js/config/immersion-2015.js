/**
 * Immersion config — 2015 (lean)
 * Thesis: Watch ships · Win10 free · Edge · go live · Music · Photos
 */
(function (global) {
  "use strict";
  var ITT = global.ITT || (global.ITT = {});
  ITT.immersionConfigs = ITT.immersionConfigs || {};

  ITT.immersionConfigs["2015"] = {
    year: "2015",
    storagePrefix: "itt15",
    features: {
      year2015extras: true,
      yearplayable: true,
      flowMap: true,
      nav: true,
      chromeBrowser: true,
      snapchat: true,
      amazon: false,
      auction: false,
      geocities: false,
      napster: false
    },
    navSubtitle: "Watch ships · Win10 free · Edge · go live",
    nav: [
      { label: "Start", href: "pages/home.html", match: "/pages/" },
      { label: "Watch", href: "sites/apple/watch.html", match: "/apple/watch" },
      { label: "Win10", href: "sites/windows10/index.html", match: "/windows10/" },
      { label: "Edge", href: "sites/edge/index.html", match: "/edge/" },
      { label: "Periscope", href: "sites/periscope/index.html", match: "/periscope/" },
      { label: "Music", href: "sites/applemusic/index.html", match: "/applemusic/" },
      { label: "Photos", href: "sites/googlephotos/index.html", match: "/googlephotos/" },
      { label: "Chrome", href: "sites/chrome/index.html", match: "/chrome/" }
    ],
    footerNav: [
      { label: "Starting Point", href: "pages/home.html" },
      { label: "Flow map", href: "pages/map.html" },
      { label: "Watch", href: "sites/apple/watch.html" },
      { label: "Win10", href: "sites/windows10/index.html" },
      { label: "Edge", href: "sites/edge/index.html" },
      { label: "Periscope", href: "sites/periscope/index.html" },
      { label: "Music", href: "sites/applemusic/index.html" },
      { label: "What's New", href: "pages/whats-new.html" },
      { label: "About 2015", href: "pages/about.html" }
    ],
    tour: [
      {
        id: "about",
        label: "About 2015",
        href: "pages/about.html",
        match: "/about",
        hint: "863M June · −11% · 1B dip",
        doneMessage: "Watch ships · free Win10 · go live."
      },
      {
        id: "watch",
        label: "Apple Watch",
        href: "sites/apple/watch.html",
        match: "/apple/watch",
        hint: "Apr 24 · face · band · shipped",
        doneMessage: "The wrist computer ships."
      },
      {
        id: "win10",
        label: "Windows 10",
        href: "sites/windows10/index.html",
        match: "/windows10/",
        hint: "Jul 29 · free upgrade · not TP",
        doneMessage: "The last free Windows."
      },
      {
        id: "edge",
        label: "Edge",
        href: "sites/edge/index.html",
        match: "/edge/",
        hint: "EdgeHTML · not Chromium",
        doneMessage: "Spartan ships with Win10."
      },
      {
        id: "periscope",
        label: "Periscope",
        href: "sites/periscope/index.html",
        match: "/periscope/",
        hint: "Mar 26 · Go LIVE",
        doneMessage: "Livestream from a phone."
      },
      {
        id: "music",
        label: "Apple Music",
        href: "sites/applemusic/index.html",
        match: "/applemusic/",
        hint: "Jun 30 · 3-mo trial · Beats 1",
        doneMessage: "Streaming with a radio station."
      },
      {
        id: "chrome",
        label: "Chrome",
        href: "sites/chrome/index.html",
        match: "/chrome/",
        hint: "desktop habit",
        doneMessage: "Chrome remains the habit browser."
      }
    ]
  };
})(typeof window !== "undefined" ? window : this);
