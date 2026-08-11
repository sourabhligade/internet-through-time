/**
 * Immersion config — 2019
 * Thesis: Disney+ · Marshmello · G+ funeral · 4.1B
 */
(function (global) {
  "use strict";
  var ITT = global.ITT || (global.ITT = {});
  ITT.immersionConfigs = ITT.immersionConfigs || {};

  ITT.immersionConfigs["2019"] = {
    year: "2019",
    storagePrefix: "itt19",
    features: {
      year2019extras: true,
      yearplayable: true,
      flowMap: true,
      nav: true,
      chromeBrowser: true,
      amazon: false,
      auction: false
    },
    navSubtitle: "Disney+ · Marshmello · G+ funeral · 4.1B",
    nav: [
      { label: "Start", href: "pages/home.html", match: "/pages/" },
      { label: "Disney+", href: "sites/disneyplus/index.html", match: "/disneyplus" },
      { label: "Marshmello", href: "sites/fortnite/marshmello.html", match: "/marshmello" },
      { label: "Apple TV+", href: "sites/appletv/index.html", match: "/appletv" },
      { label: "G+", href: "sites/googleplus/funeral.html", match: "/googleplus" },
      { label: "Chrome", href: "sites/chrome/index.html", match: "/chrome/" },
      { label: "Win10", href: "sites/windows10/index.html", match: "/windows10/" }
    ],
    footerNav: [
      { label: "Starting Point", href: "pages/home.html" },
      { label: "Flow map", href: "pages/map.html" },
      { label: "Disney+", href: "sites/disneyplus/index.html" },
      { label: "Marshmello", href: "sites/fortnite/marshmello.html" },
      { label: "Apple TV+", href: "sites/appletv/index.html" },
      { label: "G+ funeral", href: "sites/googleplus/funeral.html" },
      { label: "What's New", href: "pages/whats-new.html" },
      { label: "About 2019", href: "pages/about.html" }
    ],
    tour: [
      {
        id: "about",
        label: "About 2019",
        href: "pages/about.html",
        match: "/about",
        hint: "table ended · 4.1B",
        doneMessage: "Disney+ · Marshmello · just over 53% online."
      },
      {
        id: "disneyplus",
        label: "Disney+",
        href: "sites/disneyplus/index.html",
        match: "/disneyplus",
        hint: "Nov 12 · Who’s watching",
        doneMessage: "The living room splits into stacks."
      },
      {
        id: "marshmello",
        label: "Marshmello",
        href: "sites/fortnite/marshmello.html",
        match: "/marshmello",
        hint: "Feb 2 · 10.7M",
        doneMessage: "The concert is a map."
      },
      {
        id: "appletv",
        label: "Apple TV+",
        href: "sites/appletv/index.html",
        match: "/appletv",
        hint: "Nov 1 · $4.99",
        doneMessage: "The other living room."
      },
      {
        id: "gplus",
        label: "Google+",
        href: "sites/googleplus/funeral.html",
        match: "/googleplus",
        hint: "Apr 2 funeral",
        doneMessage: "Plus is a funeral."
      },
      {
        id: "ftc",
        label: "FTC $5B",
        href: "sites/ftc/index.html",
        match: "/ftc",
        hint: "Jul 24",
        doneMessage: "Five billion dollars."
      }
    ]
  };
})(typeof window !== "undefined" ? window : this);
