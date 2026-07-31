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
    var y = year();
    if (y === "2004") return "itt04";
    if (y === "2008") return "itt08";
    if (y === "2007") return "itt07";
    if (y === "2006") return "itt06";
    if (y === "2005") return "itt05";
    if (y === "2003") return "itt03";
    if (y === "2002") return "itt02";
    return "itt02";
  }
  function key(k) {
    return tag() + "-friendster-" + k;
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
    if (!list.length) { list = defaultFriends(); saveFriends(list); }
    var ul = root.querySelector("[data-friendster-friends]");
    if (!ul) return;
    ul.innerHTML = "";
    list.forEach(function (f) {
      var li = document.createElement("li");
      li.innerHTML = "<b>" + (f.name || "Friend") + "</b><br><span style='font-size:11px;color:#444'>" + (f.about || "") + "</span>";
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
        saveProfile({
          name: n ? n.value : "",
          about: a ? a.value : "",
          location: l ? l.value : ""
        });
        var status = form.querySelector("[data-friendster-status]");
        if (status) status.textContent = "Profile saved (this browser only).";
        renderProfile(doc);
      });
    }
    var addForm = doc.querySelector("[data-friendster-add-form]");
    if (addForm) {
      addForm.addEventListener("submit", function (ev) {
        ev.preventDefault();
        var name = (addForm.querySelector('[name="fname"]') || {}).value || "Friend";
        var about = (addForm.querySelector('[name="fabout"]') || {}).value || "";
        var list = loadFriends();
        if (!list.length) list = defaultFriends();
        list.push({ name: name, about: about });
        saveFriends(list);
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
