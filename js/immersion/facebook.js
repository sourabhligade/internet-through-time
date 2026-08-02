/**
 * Thefacebook / Facebook immersion — campus profile + 2006 News Feed (localStorage)
 * Year-aware keys: 2006 → itt06 · 2005 → itt05 (migrates itt04) · else itt04
 */
(function (global) {
  "use strict";
  var ITT = global.ITT || (global.ITT = {});

  function year() {
    if (ITT.util && ITT.util.immersionYear) {
      return ITT.util.immersionYear("2004");
    }
    return String(
      ITT._immersionYear ||
        (typeof document !== "undefined" &&
          document.documentElement &&
          document.documentElement.getAttribute("data-itt-year")) ||
        "2004"
    );
  }
  function KEY() {
    if (ITT.util && ITT.util.immersionStorageKey) {
      return ITT.util.immersionStorageKey("thefacebook", "itt04");
    }
    var y = year();
    if (y && /^\d{4}$/.test(y)) return "itt" + y.slice(2) + "-thefacebook";
    return "itt04-thefacebook";
  }
  function feedKey() {
    if (ITT.util && ITT.util.immersionStorageKey) {
      return ITT.util.immersionStorageKey("fb-feed", "itt06");
    }
    var y = year();
    if (y && /^\d{4}$/.test(y)) return "itt" + y.slice(2) + "-fb-feed";
    return "itt05-fb-feed";
  }
  function load() {
    try {
      var k = KEY();
      var raw = localStorage.getItem(k);
      if (!raw && k === "itt05-thefacebook") {
        raw = localStorage.getItem("itt04-thefacebook");
        if (raw) localStorage.setItem(k, raw);
      }
      if (!raw && k === "itt06-thefacebook") {
        raw = localStorage.getItem("itt05-thefacebook") || localStorage.getItem("itt04-thefacebook");
        if (raw) localStorage.setItem(k, raw);
      }
      if (!raw && k === "itt07-thefacebook") {
        raw =
          localStorage.getItem("itt06-thefacebook") ||
          localStorage.getItem("itt05-thefacebook") ||
          localStorage.getItem("itt04-thefacebook");
        if (raw) localStorage.setItem(k, raw);
      }
      return raw ? JSON.parse(raw) : null;
    } catch (e) {
      return null;
    }
  }
  function save(p) {
    localStorage.setItem(KEY(), JSON.stringify(p));
  }
  function loadFeed() {
    try {
      return JSON.parse(localStorage.getItem(feedKey()) || "null");
    } catch (e) {
      return null;
    }
  }
  function saveFeed(list) {
    localStorage.setItem(feedKey(), JSON.stringify(list));
  }
  function esc(s) {
    return String(s || "").replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
  }
  function appsKey() {
    if (ITT.util && ITT.util.immersionStorageKey) {
      return ITT.util.immersionStorageKey("fb-apps", "itt07");
    }
    return "itt07-fb-apps";
  }
  function loadApps() {
    try {
      return JSON.parse(localStorage.getItem(appsKey()) || "null");
    } catch (e) {
      return null;
    }
  }
  function saveApps(list) {
    localStorage.setItem(appsKey(), JSON.stringify(list));
  }
  function defaultProfile() {
    var y = year();
    if (y >= "2006") {
      var status = "joined Facebook";
      if (y === "2007") status = "using Facebook Platform apps";
      else if (y === "2008") status = "using Facebook Connect";
      else if (y === "2009") status = "Liking everything · FarmVille later";
      else if (y === "2010") status = "Open Graph · Like everywhere";
      else if (y === "2011") status = "Timeline · real names era";
      else if (y === "2012") status = "IPO year · 1B users";
      return {
        name: "You",
        school: "Regional network",
        status: status,
        friends: ["High school friend", "College roommate", "Work buddy", "Cousin"]
      };
    }
    return {
      name: "Harvard Student",
      school: "Harvard",
      status: "Looking for a study group",
      friends: ["Roommate", "Section mate", "TA", "Lab partner"]
    };
  }
  function seedFeed(p) {
    var list = loadFeed();
    if (list && list.length) return list;
    list = [
      {
        who: p.name || "You",
        text: "is using Facebook.",
        ts: Date.now() - 3600000
      },
      {
        who: "Roommate",
        text: "joined the group Study Hall.",
        ts: Date.now() - 7200000
      },
      {
        who: "High school friend",
        text: "added 3 new photos.",
        ts: Date.now() - 86400000
      },
      {
        who: "News Feed",
        text:
          "launched Sep 5–6, 2006 — a stream of friends’ activity. Privacy controls followed Sep 8 after backlash.",
        ts: Date.UTC(2006, 8, 6)
      }
    ];
    saveFeed(list);
    return list;
  }
  function renderFeed(doc, p) {
    var el = doc.querySelector("[data-fb-feed]");
    if (!el) return;
    var list = seedFeed(p);
    el.innerHTML = list
      .slice(0, 30)
      .map(function (row) {
        return (
          "<div class='fb-feed-item' style='border-bottom:1px solid #d8dfea;padding:8px 0;font-size:12px'>" +
          "<b>" +
          esc(row.who || "Someone") +
          "</b> " +
          esc(row.text || "") +
          "</div>"
        );
      })
      .join("");
  }
  function boot(doc) {
    doc = doc || document;
    var p = load();
    if (!p) {
      p = defaultProfile();
      save(p);
    }
    var nameEl = doc.querySelector("[data-fb-name]");
    if (nameEl) nameEl.textContent = p.name;
    var schoolEl = doc.querySelector("[data-fb-school]");
    if (schoolEl) schoolEl.textContent = p.school;
    var statusEl = doc.querySelector("[data-fb-status]");
    if (statusEl) statusEl.textContent = p.status;
    var list = doc.querySelector("[data-fb-friends]");
    if (list) {
      list.innerHTML = (p.friends || []).map(function (f) {
        return "<li>" + esc(f) + "</li>";
      }).join("");
    }
    var form = doc.querySelector("[data-fb-edit]");
    if (form) {
      form.addEventListener("submit", function (ev) {
        ev.preventDefault();
        p.name = (form.querySelector('[name="name"]') || {}).value || p.name;
        p.school = (form.querySelector('[name="school"]') || {}).value || p.school;
        p.status = (form.querySelector('[name="status"]') || {}).value || p.status;
        save(p);
        if (nameEl) nameEl.textContent = p.name;
        if (schoolEl) schoolEl.textContent = p.school;
        if (statusEl) statusEl.textContent = p.status;
        var st = doc.querySelector("[data-fb-save-status]");
        if (st) st.textContent = "Profile saved.";
      });
    }
    var add = doc.querySelector("[data-fb-add]");
    if (add) {
      add.addEventListener("click", function () {
        var who = window.prompt("Add friend (name)", "Friend");
        if (!who) return;
        p.friends = p.friends || [];
        p.friends.unshift(who);
        p.friends = p.friends.slice(0, 20);
        save(p);
        if (list) {
          list.innerHTML = p.friends.map(function (f) {
            return "<li>" + esc(f) + "</li>";
          }).join("");
        }
        var st = doc.querySelector("[data-fb-add-status]");
        if (st) st.textContent = "Added " + who + " to your friends.";
      });
    }
    renderFeed(doc, p);

    var appsEl = doc.querySelector("[data-fb-apps]");
    function renderApps() {
      if (!appsEl) return;
      var apps = loadApps() || [];
      if (!apps.length) {
        appsEl.innerHTML = "<li><font color=#666>No apps yet — add one above.</font></li>";
        return;
      }
      appsEl.innerHTML = apps
        .map(function (a, idx) {
          return (
            "<li style='margin:4px 0'>" +
            esc(a) +
            " <button type='button' data-fb-app-remove='" +
            idx +
            "' style='font-size:10px'>Remove</button></li>"
          );
        })
        .join("");
      var rms = appsEl.querySelectorAll("[data-fb-app-remove]");
      var ri;
      for (ri = 0; ri < rms.length; ri++) {
        rms[ri].addEventListener("click", function (ev) {
          var ix = parseInt(ev.currentTarget.getAttribute("data-fb-app-remove") || "-1", 10);
          var list = loadApps() || [];
          if (ix >= 0 && ix < list.length) {
            var removed = list.splice(ix, 1)[0];
            saveApps(list);
            renderApps();
            var st = doc.querySelector("[data-fb-app-status]");
            if (st) st.textContent = "Removed “" + removed + "”.";
          }
        });
      }
    }
    renderApps();
    var appForm = doc.querySelector("[data-fb-app-add]");
    if (appForm && appForm.getAttribute("data-fb-app-bound") !== "1") {
      appForm.setAttribute("data-fb-app-bound", "1");
      appForm.addEventListener("submit", function (ev) {
        ev.preventDefault();
        var sel = appForm.querySelector('[name="app"]');
        var name = (sel && sel.value) || "App";
        var list = loadApps() || [];
        if (list.indexOf(name) < 0) list.unshift(name);
        saveApps(list.slice(0, 20));
        renderApps();
        var st = doc.querySelector("[data-fb-app-status]");
        if (st) st.textContent = "Added “" + name + "” (Platform theater · May 24, 2007).";
      });
    }

    var statusForm = doc.querySelector("[data-fb-status-post]");
    if (statusForm && statusForm.getAttribute("data-fb-bound") !== "1") {
      statusForm.setAttribute("data-fb-bound", "1");
      statusForm.addEventListener("submit", function (ev) {
        ev.preventDefault();
        var input = statusForm.querySelector('[name="status"]') || statusForm.querySelector("textarea");
        var text = (input && input.value) || "";
        text = String(text).replace(/^\s+|\s+$/g, "");
        if (!text) return;
        var list = loadFeed() || seedFeed(p);
        list.unshift({ who: p.name || "You", text: text, ts: Date.now() });
        saveFeed(list.slice(0, 50));
        p.status = text;
        save(p);
        if (statusEl) statusEl.textContent = p.status;
        if (input) input.value = "";
        renderFeed(doc, p);
        var st = doc.querySelector("[data-fb-feed-status]");
        if (st) st.textContent = "Posted to News Feed (this browser only).";
      });
    }

    var openReg = doc.querySelector("[data-fb-open-register]");
    if (openReg && openReg.getAttribute("data-fb-bound") !== "1") {
      openReg.setAttribute("data-fb-bound", "1");
      openReg.addEventListener("submit", function (ev) {
        ev.preventDefault();
        var email = (openReg.querySelector('[name="email"]') || {}).value || "you@example.com";
        var network = (openReg.querySelector('[name="network"]') || {}).value || "Regional network";
        var name = (openReg.querySelector('[name="name"]') || {}).value || email.split("@")[0];
        p.name = name || p.name;
        p.school = network;
        p.email = email;
        p.open = true;
        save(p);
        var list = loadFeed() || seedFeed(p);
        list.unshift({
          who: p.name,
          text: "joined Facebook (open registration · Sep 26, 2006 class).",
          ts: Date.now()
        });
        saveFeed(list.slice(0, 50));
        var st = doc.querySelector("[data-fb-open-status]");
        if (st) {
          st.textContent =
            "Welcome, " + p.name + " — open to everyone 13+ with a valid email (museum theater).";
        }
        if (nameEl) nameEl.textContent = p.name;
        if (schoolEl) schoolEl.textContent = p.school;
        if (global.location && /open\.html/i.test(String(global.location.href || ""))) {
          global.location.href = "feed.html";
        }
      });
    }


    /* 2009 Like button theater */
    function likesKey() {
      if (ITT.util && ITT.util.immersionStorageKey) {
        return ITT.util.immersionStorageKey("fb-likes", "itt09");
      }
      return "itt09-fb-likes";
    }
    function loadLikes() {
      try { return JSON.parse(localStorage.getItem(likesKey()) || "{}") || {}; }
      catch (e) { return {}; }
    }
    function saveLikes(map) {
      localStorage.setItem(likesKey(), JSON.stringify(map));
    }
    function renderLikes(doc) {
      var map = loadLikes();
      var nodes = doc.querySelectorAll("[data-fb-like]");
      var i;
      for (i = 0; i < nodes.length; i++) {
        var id = nodes[i].getAttribute("data-fb-like") || "post";
        var n = map[id] || 0;
        var countEl = doc.querySelector('[data-fb-like-count="' + id + '"]');
        if (countEl) countEl.textContent = String(n);
        nodes[i].textContent = n ? "Unlike" : "Like";
      }
    }
    renderLikes(doc);
    var likeBtns = doc.querySelectorAll("[data-fb-like]");
    var li;
    for (li = 0; li < likeBtns.length; li++) {
      if (likeBtns[li].getAttribute("data-like-bound") === "1") continue;
      likeBtns[li].setAttribute("data-like-bound", "1");
      likeBtns[li].addEventListener("click", function (ev) {
        var id = ev.currentTarget.getAttribute("data-fb-like") || "post";
        var map = loadLikes();
        map[id] = (map[id] || 0) + 1;
        saveLikes(map);
        renderLikes(doc);
        var msg = "Liked · " + likesKey() + " · this browser only";
        var st = doc.querySelector("[data-fb-like-status]");
        if (st) st.textContent = msg;
        if (ITT._immersionApi && ITT._immersionApi.actionFeedback) {
          ITT._immersionApi.actionFeedback(msg, {
            doc: doc,
            status: st,
            kind: "fb-like",
            flash: true
          });
        } else if (ITT._immersionApi && ITT._immersionApi.showFlash) {
          ITT._immersionApi.showFlash(msg);
        }
      });
    }

    var login = doc.querySelector("[data-fb-login]");
    if (login) {
      login.addEventListener("submit", function (ev) {
        ev.preventDefault();
        var email = (login.querySelector('[name="email"]') || {}).value || "you@college.edu";
        p.name = email.split("@")[0] || p.name;
        save(p);
        if (global.location) {
          global.location.href = year() === "2006" ? "feed.html" : "profile.html";
        }
      });
    }
    var inv = doc.querySelector("[data-fb-invite]");
    if (inv) {
      inv.addEventListener("submit", function (ev) {
        ev.preventDefault();
        var email = (inv.querySelector('[name="email"]') || {}).value || "friend@college.edu";
        var note = (inv.querySelector('[name="note"]') || {}).value || "";
        p.friends = p.friends || [];
        var who = String(email).split("@")[0] || "invitee";
        if (p.friends.indexOf(who) < 0) p.friends.unshift(who);
        p.invites = p.invites || [];
        p.invites.unshift({ email: email, note: note, ts: Date.now() });
        p.invites = p.invites.slice(0, 40);
        save(p);
        var st = doc.querySelector("[data-fb-invite-status]");
        if (st)
          st.textContent =
            "Invite saved for " + email + " — " + who + " added to friends (this browser only).";
        if (list) {
          list.innerHTML = p.friends
            .map(function (f) {
              return "<li>" + esc(f) + "</li>";
            })
            .join("");
        }
        var invList = doc.querySelector("[data-fb-invite-list]");
        if (invList) {
          invList.innerHTML = (p.invites || [])
            .map(function (i) {
              return "<li>" + esc(i.email) + (i.note ? " — " + esc(i.note) : "") + "</li>";
            })
            .join("");
        }
      });
      var invList0 = doc.querySelector("[data-fb-invite-list]");
      if (invList0 && p.invites && p.invites.length) {
        invList0.innerHTML = p.invites
          .map(function (i) {
            return "<li>" + esc(i.email) + (i.note ? " — " + esc(i.note) : "") + "</li>";
          })
          .join("");
      }
    }
    /* 2011 Timeline + algorithmic feed theater */
    function tlKey() {
      if (ITT.util && ITT.util.immersionStorageKey) {
        return ITT.util.immersionStorageKey("fb-timeline", "itt11");
      }
      return "itt" + year().slice(2) + "-fb-timeline";
    }
    function feedModeKey() {
      if (ITT.util && ITT.util.immersionStorageKey) {
        return ITT.util.immersionStorageKey("fb-feed-mode", "itt11");
      }
      return "itt" + year().slice(2) + "-fb-feed-mode";
    }
    var tlEnable = doc.querySelector("[data-fb-timeline-enable]");
    var tlStatus = doc.querySelector("[data-fb-timeline-status]");
    if (tlEnable) {
      try {
        if (localStorage.getItem(tlKey()) === "1" && tlStatus) {
          tlStatus.innerHTML = "Timeline <b>on</b> for this profile (museum · this browser).";
        }
      } catch (eTl) { /* */ }
      tlEnable.addEventListener("click", function (ev) {
        ev.preventDefault();
        try {
          localStorage.setItem(tlKey(), "1");
        } catch (e2) { /* */ }
        if (tlStatus) {
          tlStatus.innerHTML =
            "Timeline enabled · life story profile · Wall effectively retired (Sep 22, 2011 F8 class).";
        }
        if (ITT._immersionApi && ITT._immersionApi.markTourProgress) {
          ITT._immersionApi.markTourProgress();
        }
        if (ITT._immersionApi && ITT._immersionApi.showFlash) {
          ITT._immersionApi.showFlash("Facebook Timeline on (this browser).");
        }
      });
    }
    var modeBtns = doc.querySelectorAll("[data-fb-feed-mode]");
    var modeStatus = doc.querySelector("[data-fb-feed-mode-status]");
    function showMode() {
      var m = "top";
      try {
        m = localStorage.getItem(feedModeKey()) || "top";
      } catch (eM) { /* */ }
      if (modeStatus) {
        modeStatus.innerHTML =
          m === "recent"
            ? "Feed mode: <b>Most Recent</b> (closer to chrono)."
            : "Feed mode: <b>Top Stories</b> (algorithmic “personal newspaper” era begins).";
      }
    }
    showMode();
    for (var mi = 0; mi < modeBtns.length; mi++) {
      modeBtns[mi].addEventListener("click", function (ev) {
        ev.preventDefault();
        var mode = ev.currentTarget.getAttribute("data-fb-feed-mode") || "top";
        try {
          localStorage.setItem(feedModeKey(), mode);
        } catch (e3) { /* */ }
        showMode();
      });
    }
  }
  function register() {
    if (!ITT.ImmersionFeatures || !ITT.ImmersionFeatures.registerLocal) {
      setTimeout(register, 20);
      return;
    }
    ITT.ImmersionFeatures.registerLocal({ id: "facebook", boot: boot });
  }
  register();
})(typeof window !== "undefined" ? window : this);
