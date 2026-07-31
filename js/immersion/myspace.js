/**
 * MySpace immersion — profile / Top 8 / comments / invite / contact (localStorage)
 * Year-aware keys: 2004 → itt04-myspace-* · 2003 → itt03-myspace-* · 2005 → itt05-myspace-*
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
  function yearTag() {
    var y = year();
    if (y === "2004") return "itt04";
    if (y === "2005") return "itt05";
    if (y === "2008") return "itt08";
    if (y === "2007") return "itt07";
    if (y === "2006") return "itt06";
    if (y === "2003") return "itt03";
    return "itt03";
  }
  function key(k) {
    return yearTag() + "-myspace-" + k;
  }
  function legacyKey(k) {
    return "itt03-myspace-" + k;
  }
  function getItem(k) {
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
  function setItem(k, v) {
    localStorage.setItem(key(k), v);
  }

  function loadProfile() {
    try {
      return JSON.parse(getItem("profile") || "null");
    } catch (e) {
      return null;
    }
  }
  function saveProfile(p) {
    setItem("profile", JSON.stringify(p));
  }
  function loadComments() {
    try {
      return JSON.parse(getItem("comments") || "[]");
    } catch (e) {
      return [];
    }
  }
  function saveComments(c) {
    setItem("comments", JSON.stringify(c));
  }
  function loadInvites() {
    try {
      return JSON.parse(getItem("invites") || "[]");
    } catch (e) {
      return [];
    }
  }
  function saveInvites(c) {
    setItem("invites", JSON.stringify(c));
  }
  function loadContacts() {
    try {
      return JSON.parse(getItem("contacts") || "[]");
    } catch (e) {
      return [];
    }
  }
  function saveContacts(c) {
    setItem("contacts", JSON.stringify(c));
  }

  function esc(s) {
    return String(s || "")
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;");
  }

  function render(doc) {
    var p =
      loadProfile() || {
        display: "You",
        headline: "New MySpace user",
        about: "Edit your profile — HTML vibes welcome.",
        mood: ":-)",
      };
    var d = doc.querySelector("[data-myspace-display]");
    var h = doc.querySelector("[data-myspace-headline]");
    var a = doc.querySelector("[data-myspace-about]");
    var m = doc.querySelector("[data-myspace-mood]");
    if (d) d.textContent = p.display;
    if (h) h.textContent = p.headline;
    if (a) a.textContent = p.about;
    if (m) m.textContent = p.mood;
    var list = doc.querySelector("[data-myspace-comments]");
    if (list) {
      var comments = loadComments();
      if (!comments.length) {
        comments = [{ who: "Tom", text: "Thanks for the add!" }];
        saveComments(comments);
      }
      list.innerHTML = "";
      comments.forEach(function (c) {
        var div = doc.createElement("div");
        div.className = "myspace-comment";
        div.innerHTML = "<b>" + esc(c.who || "Friend") + "</b>: " + esc(c.text || "");
        list.appendChild(div);
      });
    }
    var invEl = doc.querySelector("[data-myspace-invites]");
    if (invEl) {
      var invs = loadInvites();
      if (!invs.length) invEl.innerHTML = "<font color='#666'>No pending invites yet.</font>";
      else
        invEl.innerHTML =
          "<ul>" +
          invs
            .map(function (i) {
              return "<li>" + esc(i.email) + " — " + esc(i.message || "") + "</li>";
            })
            .join("") +
          "</ul>";
    }
    var cLog = doc.querySelector("[data-myspace-contact-log]");
    if (cLog) {
      var acts = loadContacts();
      if (!acts.length) cLog.innerHTML = "";
      else
        cLog.innerHTML =
          "<ul style='font-size:11px;margin:4px 0'>" +
          acts
            .slice(0, 8)
            .map(function (x) {
              return "<li>" + esc(x.label) + " · " + esc(x.at || "") + "</li>";
            })
            .join("") +
          "</ul>";
    }
  }

  function bind(doc) {
    var form = doc.querySelector("[data-myspace-profile-form]");
    if (form) {
      var p = loadProfile() || {};
      ["display", "headline", "about", "mood"].forEach(function (n) {
        var el = form.querySelector('[name="' + n + '"]');
        if (el && p[n]) el.value = p[n];
      });
      form.addEventListener("submit", function (ev) {
        ev.preventDefault();
        saveProfile({
          display: (form.querySelector('[name="display"]') || {}).value || "You",
          headline: (form.querySelector('[name="headline"]') || {}).value || "",
          about: (form.querySelector('[name="about"]') || {}).value || "",
          mood: (form.querySelector('[name="mood"]') || {}).value || ":-)",
        });
        var st = form.querySelector("[data-myspace-status]");
        if (st) st.textContent = "Profile saved (this browser only).";
        render(doc);
      });
    }
    var cform = doc.querySelector("[data-myspace-comment-form]");
    if (cform) {
      cform.addEventListener("submit", function (ev) {
        ev.preventDefault();
        var who = (cform.querySelector('[name="who"]') || {}).value || "Friend";
        var text = (cform.querySelector('[name="text"]') || {}).value || "";
        if (!String(text).trim()) return;
        var comments = loadComments();
        comments.unshift({ who: who, text: text, ts: Date.now() });
        saveComments(comments.slice(0, 40));
        cform.reset();
        if (cform.querySelector('[name="who"]')) cform.querySelector('[name="who"]').value = who;
        render(doc);
      });
    }
    var iform = doc.querySelector("[data-myspace-invite-form]");
    if (iform) {
      iform.addEventListener("submit", function (ev) {
        ev.preventDefault();
        var email = (iform.querySelector('[name="email"]') || {}).value || "friend@example.com";
        var message = (iform.querySelector('[name="message"]') || {}).value || "";
        var invs = loadInvites();
        invs.unshift({ email: email, message: message, ts: Date.now() });
        saveInvites(invs.slice(0, 40));
        var st = doc.querySelector("[data-myspace-invite-status]");
        if (st) st.textContent = "Invite saved for " + email + " (no SMTP — this browser only).";
        iform.reset();
        render(doc);
      });
    }
    var btns = doc.querySelectorAll("[data-myspace-contact]");
    for (var i = 0; i < btns.length; i++) {
      btns[i].addEventListener("click", function (ev) {
        ev.preventDefault();
        var act = ev.currentTarget.getAttribute("data-myspace-contact") || "action";
        var label = act.charAt(0).toUpperCase() + act.slice(1);
        var acts = loadContacts();
        acts.unshift({
          act: act,
          label: label + " to Tom",
          at: new Date().toLocaleString(),
          ts: Date.now(),
        });
        saveContacts(acts.slice(0, 40));
        var st = doc.querySelector("[data-myspace-contact-status]");
        if (st) {
          st.textContent = label + " saved in this browser.";
          st.style.color = "#060";
        }
        render(doc);
      });
    }
  }

  function boot(doc) {
    doc = doc || document;
    if (
      !doc.querySelector(
        "[data-myspace-root], [data-myspace-profile-form], [data-myspace-invite-form], [data-myspace-comment-form]"
      )
    )
      return;
    render(doc);
    bind(doc);
  }

  function register() {
    if (!ITT.ImmersionFeatures || !ITT.ImmersionFeatures.registerLocal) {
      setTimeout(register, 20);
      return;
    }
    ITT.ImmersionFeatures.registerLocal({ id: "myspace", boot: boot });
  }
  register();
})(typeof window !== "undefined" ? window : this);
