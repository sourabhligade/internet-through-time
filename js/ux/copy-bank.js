/**
 * UX copy bank by era — U0-S3
 * Used by shell coach + REAL incomplete coach.
 * Easy remove: nothing else depends if callers guard ITT.UX.Copy.
 */
(function (global) {
  "use strict";
  var ITT = global.ITT || (global.ITT = {});
  var UX = ITT.UX || (ITT.UX = {});

  function eraOfYear(year) {
    var y = parseInt(year, 10) || 2000;
    if (y <= 1995) return "early";
    if (y <= 1999) return "nav";
    if (y <= 2004) return "xp";
    if (y <= 2009) return "web2";
    if (y <= 2013) return "app";
    return "modern";
  }

  var BANK = {
    early: {
      incomplete: function (need, min) {
        return (
          "Not yet — mark at least " +
          min +
          " boxes first (you have " +
          need +
          "). Then try again. Museum theater only."
        );
      },
      incompleteField: "Fill the required field, then try again.",
      success: function (key) {
        return "Saved in this browser · " + key;
      },
      shellCoach:
        "This is a museum desktop. The big window is the period web. ← Exit (Year menu) leaves this year. Starting Point is the year map.",
      gameFocus: "Click the game board for keyboard focus, or use on-screen controls."
    },
    nav: {
      incomplete: function (need, min) {
        return (
          "REAL gate: complete at least " +
          min +
          " checks (now " +
          need +
          "). Incomplete actions do not save."
        );
      },
      incompleteField: "Type the required field first (not a soft mock).",
      success: function (key) {
        return "OK — stored locally · " + key;
      },
      shellCoach:
        "Museum reconstruction of this year’s browser. Content is the large pane. Year menu returns to the hub. Links stay inside this window.",
      gameFocus: "Click the puzzle, then use arrows or the D-pad."
    },
    xp: {
      incomplete: function (need, min) {
        return (
          "Almost — check " +
          (min - need) +
          " more box(es) before this saves (" +
          need +
          "/" +
          min +
          ")."
        );
      },
      incompleteField: "A required field is empty.",
      success: function (key) {
        return "Document saved (this PC only) · " + key;
      },
      shellCoach:
        "Windows-era museum shell. Starting Point = year map · Year menu = all years · Back = previous page in this year.",
      gameFocus: "Focus the game (click it), then play."
    },
    web2: {
      incomplete: function (need, min) {
        return (
          "Need " +
          (min - need) +
          " more check(s) before Save (" +
          need +
          "/" +
          min +
          "). Nothing was written yet."
        );
      },
      incompleteField: "Fill the required field to continue.",
      success: function (key) {
        return "Saved · " + key + " · local only";
      },
      shellCoach:
        "Museum year shell — not a live login. The iframe is the 2000s web. Exit top-left returns to the lobby.",
      gameFocus: "Click the stage for controls."
    },
    app: {
      incomplete: function (need, min) {
        return (
          "Finish " +
          (min - need) +
          " more step(s) (" +
          need +
          "/" +
          min +
          ") — incomplete multi-step does not save."
        );
      },
      incompleteField: "Required text is empty.",
      success: function (key) {
        return "Done · " + key;
      },
      shellCoach:
        "Museum reconstruction. Starting Point maps the year · Year menu exits · scores stay on this device only.",
      gameFocus: "Tap the board, then use keys or on-screen buttons."
    },
    modern: {
      incomplete: function (need, min) {
        return (
          "Almost — complete " +
          (min - need) +
          " more item(s) before Save (" +
          need +
          "/" +
          min +
          "). Educational theater · no real tracking."
        );
      },
      incompleteField: "Required field missing — not saved.",
      success: function (key) {
        return "Preferences / action saved in this browser · " + key;
      },
      shellCoach:
        "Museum desktop for this year. Big window = reconstructed web. ← Year menu leaves. Yellow boxes on pages are exhibit maps, not ads.",
      gameFocus: "Click the game panel for focus (arrow keys need it)."
    }
  };

  UX.Copy = {
    eraOfYear: eraOfYear,
    bank: BANK,
    forYear: function (year) {
      return BANK[eraOfYear(year)] || BANK.web2;
    },
    incomplete: function (year, have, min) {
      var b = UX.Copy.forYear(year);
      return b.incomplete(have, min);
    },
    incompleteField: function (year) {
      return UX.Copy.forYear(year).incompleteField;
    },
    success: function (year, key) {
      return UX.Copy.forYear(year).success(key);
    },
    shellCoach: function (year) {
      return UX.Copy.forYear(year).shellCoach;
    },
    gameFocus: function (year) {
      return UX.Copy.forYear(year).gameFocus;
    }
  };
})(typeof window !== "undefined" ? window : this);
