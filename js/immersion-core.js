/**
 * immersion-core.js — compatibility shim (SRP split)
 * Prefer immersion-199x.js which loads js/immersion/* modules.
 * If something still loads this file alone, it pulls feature modules then no-ops create
 * (create lives in immersion/create.js — load order must include feature scripts first).
 *
 * For direct inclusion without the year boot, use immersion-199x.js instead.
 */
(function (global) {
  "use strict";
  var ITT = global.ITT || (global.ITT = {});
  // Legacy path: if Immersion.create missing, warn (boot scripts should load modules).
  if (!ITT.Immersion || !ITT.Immersion.create) {
    console.warn(
      "ITT: immersion-core.js is a shim. Load js/immersion/*.js via immersion-199x.js " +
      "(or include immersion modules before create)."
    );
  }
})(typeof window !== "undefined" ? window : this);
