/**
 * Friendster immersion — 2002 friend-graph demo (localStorage only)
 */
(function (global) {
  "use strict";
  var ITT = global.ITT || (global.ITT = {});
  function year() {
    return String(
      ITT._immersionYear ||
        (typeof document !== "undefined" &&
          document.documentElement &&
          document.documentElement.getAttribute("data-itt-year")) ||
        ""
    );
  }
  function tag() {
    if (ITT.util && ITT.util.immersionStoragePrefix) {
      return ITT.util.immersionStoragePrefix("itt02");
    }
    var y = year();
    if (y && /^\d{4}$/.test(y)) return "itt" + y.slice(2);
    return "itt02";
  }
  function key(k) {
    return tag() + "-friendster-" + k;
  }
  function esc(s) {
    if (ITT.util && ITT.util.escapeHtml) return ITT.util.escapeHtml(s);
    return String(s || "")
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#39;");
  }
  function legacyKey(k) {
    return "itt02-friendster-" + k;
  }
  function getRaw(k) {
    var v = localStorage.getItem(key(k));
    if (v != null) return v;
    var leg = localStorage.getItem(legacyKey(k));
    if (leg != null && key(k) !== legacyKey(k)) {
      try {
        localStorage.setItem(key(k), leg);
      } catch (e) { /* */ }
      return leg;
    }
    return null;
  }
  function loadProfile() {
    try {
      return JSON.parse(getRaw("profile") || "null");
    } catch (e) {
      return null;
    }
  }
  function saveProfile(p) {
    localStorage.setItem(key("profile"), JSON.stringify(p));
  }
  function loadFriends() {
    try {
      return JSON.parse(getRaw("friends") || "[]");
    } catch (e) {
      return [];
    }
  }
  function saveFriends(list) {
    localStorage.setItem(key("friends"), JSON.stringify(list));
  }

  function defaultFriends() {
    return [
      { name: "Tom (demo)", about: "Everyone's first friend — session seed." },
      { name: "Alex", about: "College roommate · music snob" },
      { name: "Sam", about: "Into blogs and TrackBack" },
      { name: "Jordan", about: "Still on dial-up sometimes" }
    ];
  }

  function renderProfile(root) {
    var p = loadProfile() || { name: "", about: "", location: "" };
    var nameEl = root.querySelector("[data-friendster-name]");
    var aboutEl = root.querySelector("[data-friendster-about]");
    var locEl = root.querySelector("[data-friendster-location]");
    if (nameEl) nameEl.textContent = p.name || "(no name yet)";
    if (aboutEl) aboutEl.textContent = p.about || "Click Edit profile to introduce yourself.";
    if (locEl) locEl.textContent = p.location || "—";
  }

  function renderFriends(root) {
    var list = loadFriends();
    if (!list.length) list = defaultFriends();
    var ul = root.querySelector("[data-friendster-friends]");
    if (!ul) return;
    ul.innerHTML = "";
    list.forEach(function (f) {
      var li = document.createElement("li");
      li.innerHTML = "<b>" + esc(f.name || "Friend") + "</b><br><span style='font-size:11px;color:#444'>" + esc(f.about || "") + "</span>";
      ul.appendChild(li);
    });
  }

  function bindForms(doc) {
    var form = doc.querySelector("[data-friendster-profile-form]");
    if (form) {
      var p = loadProfile() || {};
      var n = form.querySelector('[name="name"]');
      var a = form.querySelector('[name="about"]');
      var l = form.querySelector('[name="location"]');
      if (n) n.value = p.name || "";
      if (a) a.value = p.about || "";
      if (l) l.value = p.location || "";
      form.addEventListener("submit", function (ev) {
        ev.preventDefault();
        var status = form.querySelector("[data-friendster-status]");
        var nameVal = n && n.value != null ? String(n.value).replace(/^\s+|\s+$/g, "") : "";
        if (!nameVal) {
          if (status) status.textContent = "Display name required — empty save writes nothing.";
          if (ITT._immersionApi && ITT._immersionApi.actionFeedback) {
            ITT._immersionApi.actionFeedback("Type a display name first.", {
              doc: doc,
              status: status,
              kind: "friendster-profile",
              flash: false
            });
          }
          return;
        }
        saveProfile({
          name: nameVal,
          about: a ? a.value : "",
          location: l ? l.value : ""
        });
        var msg = "Profile saved (this browser only).";
        if (status) status.textContent = msg;
        if (ITT._immersionApi && ITT._immersionApi.actionFeedback) {
          ITT._immersionApi.actionFeedback(msg, {
            doc: doc,
            status: status,
            kind: "friendster-profile"
          });
        }
        renderProfile(doc);
      });
    }
    var addForm = doc.querySelector("[data-friendster-add-form]");
    if (addForm) {
      addForm.addEventListener("submit", function (ev) {
        ev.preventDefault();
        var name = ((addForm.querySelector('[name="fname"]') || {}).value || "").replace(/^\s+|\s+$/g, "");
        var about = ((addForm.querySelector('[name="fabout"]') || {}).value || "").replace(/^\s+|\s+$/g, "");
        var st = addForm.querySelector("[data-friendster-status]") || doc.querySelector("[data-friendster-status]");
        if (!name || !about) {
          if (st) st.textContent = "Name + testimonial required. Empty never writes.";
          return;
        }
        var list = loadFriends();
        if (!list.length) list = defaultFriends();
        list.push({ name: name, about: about });
        saveFriends(list);
        try {
          var y = year() || "2002";
          var suffix = y === "2003" ? "fs-mass" : "fs";
          var fsKey = ITT.util && ITT.util.immersionStorageKey
            ? ITT.util.immersionStorageKey(suffix, y === "2003" ? "itt03" : "itt02")
            : (y === "2003" ? "itt03-fs-mass" : "itt02-fs");
          localStorage.setItem(fsKey, JSON.stringify({
            multiStep: true,
            real: true,
            year: y,
            ts: Date.now(),
            friend: name.slice(0, 40),
            note: about.slice(0, 80)
          }));
        } catch (eFs) { /* */ }
        if (st) st.textContent = "Posted leftover · " + (year() === "2003" ? "itt03-fs-mass" : "itt02-fs");
        try { if (ITT.revealNextFlow) ITT.revealNextFlow(doc); } catch (eN) { /* */ }
        renderFriends(doc);
        addForm.reset();
      });
    }
  }

  function boot(doc) {
    doc = doc || document;
    if (!doc.querySelector("[data-friendster-root], [data-friendster-profile-form], [data-friendster-friends]")) return;
    var root = doc.querySelector("[data-friendster-root]") || doc.body;
    renderProfile(root);
    renderFriends(root);
    bindForms(doc);
  }

  function register() {
    if (!ITT.ImmersionFeatures || !ITT.ImmersionFeatures.registerLocal) {
      setTimeout(register, 20);
      return;
    }
    ITT.ImmersionFeatures.registerLocal({ id: "friendster", boot: boot });
    /* registerLocal sets ITT.friendster = { boot }; expose helpers after */
    if (ITT.friendster) ITT.friendster.loadProfile = loadProfile;
  }
  register();
})(typeof window !== "undefined" ? window : this);
