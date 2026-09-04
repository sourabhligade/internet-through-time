/**
 * MSN Messenger 2001 — sign-on · contacts · chat · nudge (localStorage)
 * Keys: itt01-msn-user · itt01-msn-messages · itt01-msn-nudge · summary itt01-msn
 */
(function (global) {
  "use strict";
  var ITT = global.ITT || (global.ITT = {});

  var SEED = [
    { id: "c1", nick: "passport_pal", mail: "pal@hotmail.com" },
    { id: "c2", nick: "nudge_king", mail: "nudge@msn.com" },
    { id: "c3", nick: "xp_user", mail: "xp@hotmail.com" }
  ];

  function U() {
    return ITT.util || {};
  }
  function sk(suffix) {
    return U().immersionStorageKey
      ? U().immersionStorageKey(suffix, "itt01")
      : "itt01-" + suffix;
  }
  function loadJSON(k, fb) {
    try {
      var raw = localStorage.getItem(k);
      if (raw == null || raw === "") return fb;
      return JSON.parse(raw);
    } catch (e) {
      return fb;
    }
  }
  function saveJSON(k, v) {
    try {
      localStorage.setItem(k, JSON.stringify(v));
      return true;
    } catch (e) {
      return false;
    }
  }
  function esc(s) {
    return String(s || "")
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;");
  }
  function feedback(msg, st, err) {
    if (st) {
      st.textContent = msg;
      st.style.color = err ? "#a00" : "#060";
    }
    try {
      if (ITT._immersionApi && ITT._immersionApi.actionFeedback) {
        ITT._immersionApi.actionFeedback(msg, { status: st, flash: !err, kind: "msn" });
      }
    } catch (e) { /* */ }
  }
  function summary(extra) {
    var u = loadJSON(sk("msn-user"), null);
    var blob = {
      multiStep: true,
      real: true,
      year: "2001",
      mail: u && u.mail,
      ts: Date.now()
    };
    if (extra) {
      var k;
      for (k in extra) {
        if (Object.prototype.hasOwnProperty.call(extra, k)) blob[k] = extra[k];
      }
    }
    saveJSON(sk("msn"), blob);
    try {
      if (ITT.revealNextFlow) ITT.revealNextFlow(document);
    } catch (eN) {
      /* */
    }
  }

  function boot(doc) {
    doc = doc || document;
    if (!doc.querySelector("[data-msn-root], [data-msn-signon], [data-msn-chat-form]")) return;

    var st = doc.querySelector("[data-msn-status], [data-msn-nudge-status], [data-itt-action-status]");
    var user = loadJSON(sk("msn-user"), null);
    var msgs = loadJSON(sk("msn-messages"), {}) || {};
    var nudge = loadJSON(sk("msn-nudge"), { count: 0 }) || { count: 0 };
    var offline = loadJSON(sk("msn-offline"), {}) || {};

    function sessEl() {
      var el = doc.querySelector("[data-msn-session]");
      if (!el) return;
      el.textContent = user && user.signedOn ? "Signed in as " + user.mail : "Not signed in.";
    }

    function renderContacts() {
      var box = doc.querySelector("[data-msn-contacts]");
      if (!box) return;
      box.innerHTML =
        "<div class='msn-buddy-group'>Online (" +
        SEED.length +
        ")</div>" +
        SEED.map(function (c) {
          return (
            "<div style='padding:3px 0 3px 8px;font-size:12px'><b style='color:#080'>●</b> " +
            '<a href="chat.html?c=' +
            encodeURIComponent(c.id) +
            '">' +
            esc(c.nick) +
            "</a> <font color='#666' size='1'>" +
            esc(c.mail) +
            "</font></div>"
          );
        }).join("");
    }

    function cid() {
      try {
        var q = U().queryParam ? U().queryParam("c") : "";
        if (q) return q;
      } catch (e) { /* */ }
      return "c1";
    }

    function renderLog() {
      var log = doc.querySelector("[data-msn-log]");
      if (!log) return;
      var id = cid();
      var thread = msgs[id] || [];
      if (!thread.length) {
        log.innerHTML = "<font color='#666' size='2'>No messages yet.</font>";
        return;
      }
      log.innerHTML = thread
        .map(function (m) {
          return "<div style='font-size:12px;margin:3px 0'><b>" + esc(m.from) + ":</b> " + esc(m.text) + "</div>";
        })
        .join("");
    }

    function offlineCount() {
      var n = 0;
      var k;
      for (k in offline) {
        if (Object.prototype.hasOwnProperty.call(offline, k) && offline[k] && offline[k].length) {
          n += offline[k].length;
        }
      }
      return n;
    }

    function noteOffline() {
      var el = doc.querySelector("[data-msn-offline-note]");
      if (!el) return;
      var n = offlineCount();
      el.textContent = n
        ? n + " queued offline · sign in to deliver."
        : "";
    }

    function flushOffline() {
      if (!user || !user.signedOn) return 0;
      var n = 0;
      var k;
      for (k in offline) {
        if (!Object.prototype.hasOwnProperty.call(offline, k)) continue;
        var q = offline[k] || [];
        if (!q.length) continue;
        if (!msgs[k]) msgs[k] = [];
        var i;
        for (i = 0; i < q.length; i++) {
          msgs[k].push({
            from: user.mail,
            text: q[i].text,
            ts: q[i].ts || Date.now(),
            queued: true
          });
          n += 1;
        }
      }
      if (n) {
        saveJSON(sk("msn-messages"), msgs);
        offline = {};
        saveJSON(sk("msn-offline"), offline);
        summary({ delivered: n });
      }
      return n;
    }

    sessEl();
    renderContacts();
    var delivered = flushOffline();
    renderLog();
    noteOffline();
    var nEl = doc.querySelector("[data-msn-nudge-count]");
    if (nEl) nEl.textContent = String(nudge.count || 0);
    if (delivered) {
      feedback("Delivered " + delivered + " queued message(s).", st);
    }

    var sign = doc.querySelector("[data-msn-signon]");
    if (sign) {
      sign.addEventListener("submit", function (ev) {
        ev.preventDefault();
        var inp = sign.querySelector("#ott-field") || sign.querySelector("[name='mail']");
        var mail = inp && inp.value != null ? String(inp.value).replace(/^\s+|\s+$/g, "") : "";
        if (mail.length < 3 || mail.indexOf("@") === -1) {
          feedback("Sign in with a mail-like handle (needs @).", st, true);
          return;
        }
        user = { mail: mail, signedOn: true, ts: Date.now() };
        saveJSON(sk("msn-user"), user);
        summary({ signedOn: true });
        var n = flushOffline();
        feedback(
          "Signed in · " + mail + " (theater · no Microsoft account)." +
            (n ? " Delivered " + n + " queued." : ""),
          st
        );
        try {
          if (ITT._immersionApi && ITT._immersionApi.markTourUsed) ITT._immersionApi.markTourUsed();
        } catch (e) { /* */ }
        sessEl();
        renderLog();
        noteOffline();
      });
    }

    var chat = doc.querySelector("[data-msn-chat-form]");
    if (chat) {
      chat.addEventListener("submit", function (ev) {
        ev.preventDefault();
        var inp = chat.querySelector("[name='text']") || doc.getElementById("m");
        var text = inp && inp.value != null ? String(inp.value).replace(/^\s+|\s+$/g, "") : "";
        if (!text) {
          feedback("Type a message first (empty blocked).", st, true);
          return;
        }
        var id = cid();
        if (!user || !user.signedOn) {
          if (!offline[id]) offline[id] = [];
          offline[id].push({ text: text, ts: Date.now() });
          saveJSON(sk("msn-offline"), offline);
          if (inp) inp.value = "";
          feedback("Offline · queued until sign-in (not delivered).", st);
          noteOffline();
          return;
        }
        if (!msgs[id]) msgs[id] = [];
        msgs[id].push({ from: user.mail, text: text, ts: Date.now() });
        saveJSON(sk("msn-messages"), msgs);
        summary({ messaged: id });
        if (inp) inp.value = "";
        feedback("Message queued locally.", st);
        renderLog();
      });
    }

    var nudgeBtn = doc.querySelector("[data-msn-nudge]");
    if (nudgeBtn) {
      nudgeBtn.addEventListener("click", function (ev) {
        ev.preventDefault();
        if (!user || !user.signedOn) {
          feedback("Sign in first.", st, true);
          return;
        }
        nudge.count = (nudge.count || 0) + 1;
        saveJSON(sk("msn-nudge"), nudge);
        summary({ nudges: nudge.count });
        feedback("Nudge ×" + nudge.count + " (window shake theater · no network).", st);
        if (nEl) nEl.textContent = String(nudge.count);
        try {
          doc.body.style.transform = "translate(3px,0)";
          setTimeout(function () {
            doc.body.style.transform = "";
          }, 120);
        } catch (eN) { /* */ }
      });
    }
  }

  var features = ITT.ImmersionFeatures || (ITT.ImmersionFeatures = []);
  if (typeof features.registerLocal === "function") {
    features.registerLocal({ id: "msn", featureKey: "msn", boot: boot });
  } else {
    features.push({
      id: "msn",
      needs: function (cfg) {
        return !cfg.features || cfg.features.msn !== false;
      },
      init: function () {
        boot(document);
      }
    });
  }
})(typeof window !== "undefined" ? window : this);
