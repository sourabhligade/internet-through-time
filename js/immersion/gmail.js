/**
 * Gmail immersion — invite-only · 1GB theater (localStorage only)
 * Year-aware: 2005 → itt05-gmail* (migrates itt04 if present) · else itt04-*
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
        "2004"
    );
  }
  function pref() {
    var y = year();
    if (y === "2008") return "itt08";
    if (y === "2007") return "itt07";
    if (y === "2006") return "itt06";
    if (y === "2005") return "itt05";
    return "itt04";
  }
  function KEY() {
    return pref() + "-gmail";
  }
  function MSG() {
    return pref() + "-gmail-msgs";
  }
  function INVKEY() {
    return pref() + "-gmail-invites";
  }
  function DRAFTKEY() {
    return pref() + "-gmail-drafts";
  }
  function loadDrafts() {
    try {
      return JSON.parse(localStorage.getItem(DRAFTKEY()) || "[]") || [];
    } catch (e) {
      return [];
    }
  }
  function saveDrafts(list) {
    localStorage.setItem(DRAFTKEY(), JSON.stringify(list));
  }
  function migrate(primary, legacy) {
    try {
      if (localStorage.getItem(primary)) return;
      var leg = localStorage.getItem(legacy);
      if (leg) localStorage.setItem(primary, leg);
    } catch (e) { /* */ }
  }
  function loadUser() {
    if (pref() === "itt05") migrate(KEY(), "itt04-gmail");
    try {
      return JSON.parse(localStorage.getItem(KEY()) || "null");
    } catch (e) {
      return null;
    }
  }
  function saveUser(u) {
    localStorage.setItem(KEY(), JSON.stringify(u));
  }
  function loadMsgs() {
    if (pref() === "itt05") migrate(MSG(), "itt04-gmail-msgs");
    try {
      return JSON.parse(localStorage.getItem(MSG()) || "null");
    } catch (e) {
      return null;
    }
  }
  function saveMsgs(m) {
    localStorage.setItem(MSG(), JSON.stringify(m));
  }
  function esc(s) {
    return String(s || "").replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
  }
  function seedMsgs() {
    var m = loadMsgs();
    if (m && m.length) return m;
    m = [
      { from: "team@google.com", subj: "Welcome to Gmail", body: "1 GB free. Invite-only beta. Search, don't sort.", ts: Date.now() - 86400000 },
      { from: "invites@gmail.com", subj: "You have invitations", body: "Share invites with friends — scarcity is the point.", ts: Date.now() - 3600000 }
    ];
    saveMsgs(m);
    return m;
  }
  function renderList(doc) {
    var el = doc.querySelector("[data-gmail-list]");
    if (!el) return;
    var msgs = seedMsgs();
    el.innerHTML = msgs.map(function (m, i) {
      return (
        "<div class='gmail-row'>" +
        "<span class='gmail-from'><b>" +
        esc(m.from) +
        "</b></span> " +
        "<span class='gmail-subj'>" +
        esc(m.subj) +
        "</span> " +
        "<font size='1' color='#666'>" +
        (m.body ? esc(String(m.body).slice(0, 48)) + (String(m.body).length > 48 ? "…" : "") : "") +
        "</font>" +
        "</div>"
      );
    }).join("");
  }
  function boot(doc) {
    doc = doc || document;
    var login = doc.querySelector("[data-gmail-login]");
    if (login) {
      login.addEventListener("submit", function (ev) {
        ev.preventDefault();
        var email = (login.querySelector('[name="email"]') || {}).value || "you@gmail.com";
        saveUser({ email: email, invited: true, ts: Date.now() });
        var st = doc.querySelector("[data-gmail-status]");
        if (st) st.textContent = "Signed in. Opening inbox…";
        setTimeout(function () {
          if (global.location) global.location.href = "inbox.html";
        }, 200);
      });
    }
    var who = doc.querySelector("[data-gmail-user]");
    var searchBtn = doc.querySelector("[data-gmail-search]");
    if (searchBtn) {
      searchBtn.onclick = function () {
        var q = ((doc.querySelector("[data-gmail-q]") || {}).value || "").toLowerCase().trim();
        var listEl = doc.querySelector("[data-gmail-list]");
        if (!listEl) return;
        var src = seedMsgs().slice();
        var msgs = src;
        if (q) {
          msgs = src.filter(function (m) {
            return ((m.from || "") + " " + (m.subj || "") + " " + (m.body || "")).toLowerCase().indexOf(q) !== -1;
          });
        }
        if (!msgs.length) {
          listEl.innerHTML = "<p><i>No conversations match.</i></p>";
          return;
        }
        listEl.innerHTML = msgs
          .map(function (m) {
            return (
              "<div class='gmail-row'>" +
              "<span class='gmail-from'><b>" +
              esc(m.from) +
              "</b></span> " +
              "<span class='gmail-subj'>" +
              esc(m.subj) +
              "</span></div>"
            );
          })
          .join("");
      };
    }

    var u = loadUser();
    if (who) who.textContent = u && u.email ? u.email : "(not signed in)";
    renderList(doc);
    var compose = doc.querySelector("[data-gmail-compose]");
    if (compose) {
      compose.addEventListener("submit", function (ev) {
        ev.preventDefault();
        var to = (compose.querySelector('[name="to"]') || {}).value || "friend@example.com";
        var subj = (compose.querySelector('[name="subj"]') || {}).value || "(no subject)";
        var body = (compose.querySelector('[name="body"]') || {}).value || "";
        var msgs = seedMsgs();
        msgs.unshift({ from: "me (sent)", subj: subj, body: body, to: to, ts: Date.now() });
        saveMsgs(msgs.slice(0, 40));
        var st = doc.querySelector("[data-gmail-compose-status]");
        if (st) st.textContent = "Message sent — opening inbox…";
        setTimeout(function () {
          if (global.location) global.location.href = "inbox.html";
        }, 250);
      });
      var draftBtn = compose.querySelector("[data-gmail-draft], button[data-gmail-draft]");
      if (!draftBtn) {
        var buttons = compose.querySelectorAll("button[type='button']");
        var bi;
        for (bi = 0; bi < buttons.length; bi++) {
          if (/save draft/i.test(buttons[bi].textContent || buttons[bi].value || "")) {
            draftBtn = buttons[bi];
            break;
          }
        }
      }
      if (draftBtn) {
        draftBtn.onclick = function (ev) {
          if (ev && ev.preventDefault) ev.preventDefault();
          var to = (compose.querySelector('[name="to"]') || {}).value || "";
          var subj = (compose.querySelector('[name="subj"]') || {}).value || "(no subject)";
          var body = (compose.querySelector('[name="body"]') || {}).value || "";
          var drafts = loadDrafts();
          drafts.unshift({ to: to, subj: subj, body: body, ts: Date.now() });
          saveDrafts(drafts.slice(0, 20));
          var st = doc.querySelector("[data-gmail-compose-status]");
          if (st) {
            st.textContent =
              "Draft saved in this browser (" + DRAFTKEY() + "). " + drafts.length + " draft(s).";
          }
          return false;
        };
      }
    }
    var inv = doc.querySelector("[data-gmail-invite]");
    if (inv) {
      if (pref() === "itt05") migrate(INVKEY(), "itt04-gmail-invites");
      function invLeft() {
        try {
          var n = parseInt(localStorage.getItem(INVKEY()) || "6", 10);
          return isNaN(n) ? 6 : n;
        } catch (e) {
          return 6;
        }
      }
      function setInv(n) {
        localStorage.setItem(INVKEY(), String(n));
      }
      var el = doc.querySelector("[data-gmail-invites]");
      if (el) el.textContent = String(invLeft());
      inv.addEventListener("submit", function (ev) {
        ev.preventDefault();
        var left = invLeft();
        var st = doc.querySelector("[data-gmail-invite-status]");
        var email = (inv.querySelector('[name="email"]') || {}).value || "friend@example.com";
        if (left <= 0) {
          if (st) st.textContent = "No invitations left.";
          return;
        }
        setInv(left - 1);
        if (el) el.textContent = String(left - 1);
        if (st) st.textContent = "Invitation recorded for " + email + ". " + (left - 1) + " left.";
        inv.reset();
      });
    }
  }
  function register() {
    if (!ITT.ImmersionFeatures || !ITT.ImmersionFeatures.registerLocal) {
      setTimeout(register, 20);
      return;
    }
    ITT.ImmersionFeatures.registerLocal({ id: "gmail", boot: boot });
  }
  register();
})(typeof window !== "undefined" ? window : this);
