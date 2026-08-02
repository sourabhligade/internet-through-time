/**
 * Orkut 2004 — Google social network (localStorage, itt04)
 */
(function (global) {
  "use strict";
  var ITT = global.ITT || (global.ITT = {});
  function key(k) {
    if (ITT.util && ITT.util.immersionStorageKey) {
      return ITT.util.immersionStorageKey("orkut-" + k, "itt04");
    }
    return "itt04-orkut-" + k;
  }
  function loadFriends() {
    try {
      return JSON.parse(localStorage.getItem(key("friends")) || "null");
    } catch (e) {
      return null;
    }
  }
  function saveFriends(list) {
    localStorage.setItem(key("friends"), JSON.stringify(list));
  }
  function loadProfile() {
    try {
      return JSON.parse(localStorage.getItem(key("profile")) || "null");
    } catch (e) {
      return null;
    }
  }
  function saveProfile(p) {
    localStorage.setItem(key("profile"), JSON.stringify(p));
  }
  function esc(s) {
    return String(s || "")
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;");
  }
  function defaults() {
    return [
      { name: "João (seed)", about: "São Paulo · scraps forever" },
      { name: "Priya", about: "Bangalore · communities" },
      { name: "Alex", about: "Mountain View · Google coworker lore" },
    ];
  }
  function render(doc) {
    var p = loadProfile() || { name: "You", status: "New on Orkut" };
    var n = doc.querySelector("[data-orkut-name]");
    var s = doc.querySelector("[data-orkut-status]");
    if (n) n.textContent = p.name;
    if (s) s.textContent = p.status;
    var list = doc.querySelector("[data-orkut-friends]");
    if (list) {
      var friends = loadFriends();
      if (!friends || !friends.length) {
        friends = defaults();
        saveFriends(friends);
      }
      list.innerHTML = friends
        .map(function (f) {
          return (
            "<div class='orkut-friend'><b>" +
            esc(f.name) +
            "</b><br><font size='1' color='#444'>" +
            esc(f.about || "") +
            "</font></div>"
          );
        })
        .join("");
    }
  }
  function boot(doc) {
    doc = doc || document;
    if (!doc.querySelector("[data-orkut-root], [data-orkut-add], [data-orkut-profile]")) return;
    var form = doc.querySelector("[data-orkut-profile]");
    if (form) {
      var p = loadProfile() || {};
      if (form.querySelector('[name="name"]') && p.name) form.querySelector('[name="name"]').value = p.name;
      if (form.querySelector('[name="status"]') && p.status)
        form.querySelector('[name="status"]').value = p.status;
      form.addEventListener("submit", function (ev) {
        ev.preventDefault();
        saveProfile({
          name: (form.querySelector('[name="name"]') || {}).value || "You",
          status: (form.querySelector('[name="status"]') || {}).value || "",
        });
        var st = doc.querySelector("[data-orkut-status-msg]");
        if (st) st.textContent = "Profile saved (this browser only).";
        render(doc);
      });
    }
    var add = doc.querySelector("[data-orkut-add]");
    if (add) {
      add.addEventListener("submit", function (ev) {
        ev.preventDefault();
        var name = (add.querySelector('[name="fname"]') || {}).value || "Friend";
        var about = (add.querySelector('[name="fabout"]') || {}).value || "";
        var friends = loadFriends() || defaults();
        friends.unshift({ name: name, about: about });
        saveFriends(friends.slice(0, 40));
        var st = doc.querySelector("[data-orkut-add-status]");
        if (st) st.textContent = "Added " + name + " to friends.";
        add.reset();
        render(doc);
      });
    }
    render(doc);
  }
  function register() {
    if (!ITT.ImmersionFeatures || !ITT.ImmersionFeatures.registerLocal) {
      setTimeout(register, 20);
      return;
    }
    ITT.ImmersionFeatures.registerLocal({ id: "orkut", boot: boot });
  }
  register();
})(typeof window !== "undefined" ? window : this);
