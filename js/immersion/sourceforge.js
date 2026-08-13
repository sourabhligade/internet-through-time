/**
 * SourceForge 1999 — pick a project, then download theater.
 * Incomplete never writes. Key: itt99-sourceforge
 */
(function (global) {
  "use strict";
  var ITT = global.ITT || (global.ITT = {});

  var PROJECTS = {
    gimp: { name: "GIMP", blurb: "GNU Image Manipulation Program · CVS class host." },
    httpd: { name: "Apache HTTP Server", blurb: "The web’s default server · download stats theater." },
    php: { name: "PHP", blurb: "Hypertext preprocessor · source tarball theater." }
  };

  function U() {
    return ITT.util || {};
  }
  function key() {
    return U().immersionStorageKey
      ? U().immersionStorageKey("sourceforge", "itt99")
      : "itt99-sourceforge";
  }
  function feedback(msg, st, err) {
    if (st) {
      try {
        st.textContent = msg;
        st.style.color = err ? "#a00" : "#060";
      } catch (e) { /* */ }
    }
    try {
      if (ITT._immersionApi && ITT._immersionApi.actionFeedback) {
        ITT._immersionApi.actionFeedback(msg, { flash: !err, status: st });
      }
    } catch (e2) { /* */ }
  }
  function qs(name) {
    return U().queryParam ? U().queryParam(name) : "";
  }

  function bootIndex(doc) {
    var root = doc.querySelector("[data-sf-catalog]");
    if (!root) return;
    var st = doc.querySelector("[data-sf-status]");
    var links = doc.querySelectorAll("[data-sf-open]");
    var i;
    for (i = 0; i < links.length; i++) {
      links[i].addEventListener("click", function (ev) {
        var id = this.getAttribute("data-sf-open");
        if (!PROJECTS[id]) {
          ev.preventDefault();
          feedback("Pick a listed project.", st, true);
        }
      });
    }
  }

  function bootProject(doc) {
    var btn = doc.querySelector("[data-sf-download]");
    if (!btn) return;
    var st = doc.querySelector("[data-sf-status]");
    var id = qs("p") || "";
    var meta = PROJECTS[id];
    var nameEl = doc.querySelector("[data-sf-name]");
    var blurbEl = doc.querySelector("[data-sf-blurb]");
    if (!meta) {
      if (nameEl) nameEl.textContent = "No project picked";
      if (st) feedback("Open a project from the catalog first.", st, true);
      btn.addEventListener("click", function () {
        feedback("Open a project from the catalog first.", st, true);
      });
      return;
    }
    if (nameEl) nameEl.textContent = meta.name;
    if (blurbEl) blurbEl.textContent = meta.blurb;
    try {
      var prev = localStorage.getItem(key());
      if (prev && st) feedback("Saved · " + key(), st, false);
    } catch (e0) { /* */ }
    btn.addEventListener("click", function () {
      var hon = doc.querySelector("[data-sf-not-github]");
      if (!hon || !hon.checked) {
        feedback("Confirm not GitHub · no real tarball first.", st, true);
        return;
      }
      try {
        localStorage.setItem(
          key(),
          JSON.stringify({
            project: id,
            name: meta.name,
            real: true,
            multiStep: true,
            year: "1999",
            notGithub: true,
            ts: Date.now()
          })
        );
      } catch (e1) { /* */ }
      feedback("Download queued · " + meta.name + " · " + key(), st, false);
      try {
        if (ITT._immersionApi && ITT._immersionApi.markTourUsed) ITT._immersionApi.markTourUsed();
      } catch (e2) { /* */ }
    });
  }

  function boot(doc) {
    doc = doc || document;
    bootIndex(doc);
    bootProject(doc);
  }

  if (ITT.ImmersionFeatures && ITT.ImmersionFeatures.registerLocal) {
    ITT.ImmersionFeatures.registerLocal({
      id: "sourceforge",
      featureKey: "sourceforge",
      boot: boot
    });
  } else {
    ITT.ImmersionFeatures = ITT.ImmersionFeatures || [];
    ITT.ImmersionFeatures.push({
      id: "sourceforge",
      needs: function (cfg) {
        return !cfg.features || cfg.features.sourceforge !== false;
      },
      boot: boot
    });
  }
})(typeof window !== "undefined" ? window : this);
