/**
 * LiveJournal 2004 — friends page + post (localStorage, itt04)
 */
(function (global) {
  "use strict";
  var ITT = global.ITT || (global.ITT = {});
  function key(k) {
    return "itt04-lj-" + k;
  }
  function loadPosts() {
    try {
      return JSON.parse(localStorage.getItem(key("posts")) || "[]");
    } catch (e) {
      return [];
    }
  }
  function savePosts(p) {
    localStorage.setItem(key("posts"), JSON.stringify(p));
  }
  function loadFriends() {
    try {
      return JSON.parse(localStorage.getItem(key("friends")) || "[]");
    } catch (e) {
      return [];
    }
  }
  function saveFriends(f) {
    localStorage.setItem(key("friends"), JSON.stringify(f));
  }
  function esc(s) {
    return String(s || "")
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;");
  }
  function boot(doc) {
    doc = doc || document;
    if (!doc.querySelector("[data-lj-root], [data-lj-post], [data-lj-friend]")) return;

    var list = doc.querySelector("[data-lj-posts]");
    function renderPosts() {
      if (!list) return;
      var posts = loadPosts();
      if (!posts.length) {
        list.innerHTML =
          "<p style='font-size:12px;color:#666'>No entries yet — write one from Update Journal.</p>";
        return;
      }
      list.innerHTML = posts
        .map(function (p) {
          return (
            "<div class='lj-post'><b>" +
            esc(p.title) +
            "</b> <font size='1' color='#666'>" +
            esc(p.date || "") +
            "</font><p style='font-size:12px'>" +
            esc(p.body) +
            "</p></div>"
          );
        })
        .join("");
    }

    var flist = doc.querySelector("[data-lj-friends]");
    function renderFriends() {
      if (!flist) return;
      var friends = loadFriends();
      if (!friends.length) {
        friends = [{ name: "bradfitz", about: "Founder lore" }, { name: "kottke", about: "blogroll" }];
        saveFriends(friends);
      }
      flist.innerHTML = friends
        .map(function (f) {
          return "<li><b>" + esc(f.name) + "</b> — " + esc(f.about || "") + "</li>";
        })
        .join("");
    }

    var form = doc.querySelector("[data-lj-post]");
    if (form) {
      form.addEventListener("submit", function (ev) {
        ev.preventDefault();
        var title = (form.querySelector('[name="title"]') || {}).value || "Untitled";
        var body = (form.querySelector('[name="body"]') || {}).value || "";
        var posts = loadPosts();
        posts.unshift({ title: title, body: body, date: new Date().toLocaleString() });
        savePosts(posts.slice(0, 40));
        var st = doc.querySelector("[data-lj-status]");
        if (st) st.textContent = "Posted to your journal (this browser only).";
        form.reset();
        renderPosts();
      });
    }
    var fform = doc.querySelector("[data-lj-friend]");
    if (fform) {
      fform.addEventListener("submit", function (ev) {
        ev.preventDefault();
        var name = (fform.querySelector('[name="name"]') || {}).value || "friend";
        var about = (fform.querySelector('[name="about"]') || {}).value || "";
        var friends = loadFriends();
        friends.unshift({ name: name, about: about });
        saveFriends(friends.slice(0, 40));
        var st = doc.querySelector("[data-lj-friend-status]");
        if (st) st.textContent = "Added " + name + " to friends list.";
        fform.reset();
        renderFriends();
      });
    }
    renderPosts();
    renderFriends();
  }
  function register() {
    if (!ITT.ImmersionFeatures || !ITT.ImmersionFeatures.registerLocal) {
      setTimeout(register, 20);
      return;
    }
    ITT.ImmersionFeatures.registerLocal({ id: "livejournal", boot: boot });
  }
  register();
})(typeof window !== "undefined" ? window : this);
