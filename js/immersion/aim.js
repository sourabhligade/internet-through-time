/**
 * AIM 1999 — screen name · buddy list · IM transcript · away (localStorage)
 * Keys: itt99-aim-user · itt99-aim-buddies · itt99-aim-messages · itt99-aim-away
 * Summary: itt99-aim (one-thing / passport)
 */
(function (global) {
  "use strict";
  var ITT = global.ITT || (global.ITT = {});

  var SEED = [
    { id: "buddy-a", nick: "sk8r99", state: "online" },
    { id: "buddy-b", nick: "xXdarkXx", state: "away" },
    { id: "buddy-c", nick: "soccer_mom", state: "idle" },
    { id: "buddy-d", nick: "tom1999", state: "online" }
  ];

  function U() {
    return ITT.util || {};
  }
  function sk(suffix) {
    return U().immersionStorageKey
      ? U().immersionStorageKey(suffix, "itt99")
      : "itt99-" + suffix;
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
        ITT._immersionApi.actionFeedback(msg, { status: st, flash: !err, kind: "aim" });
      }
    } catch (e) { /* */ }
  }
  function stamp() {
    try {
      if (ITT._immersionApi && ITT._immersionApi.markTourUsed) ITT._immersionApi.markTourUsed("aim");
    } catch (e0) { /* */ }
    try {
      if (ITT.MuseumProgress && ITT.MuseumProgress.stamp) {
        ITT.MuseumProgress.stamp("1999", "aim", { label: "AIM", href: "sites/aim/index.html" });
      }
    } catch (e1) { /* */ }
  }
  function writeSummary(extra) {
    var user = loadJSON(sk("aim-user"), null);
    var blob = {
      multiStep: true,
      real: true,
      year: "1999",
      sn: user && user.sn,
      ts: Date.now()
    };
    if (extra) {
      var k;
      for (k in extra) {
        if (Object.prototype.hasOwnProperty.call(extra, k)) blob[k] = extra[k];
      }
    }
    saveJSON(sk("aim"), blob);
    try {
      if (ITT.revealNextFlow) ITT.revealNextFlow(document);
    } catch (eN) {
      /* */
    }
  }

  function boot(doc) {
    doc = doc || document;
    if (!doc.querySelector("[data-aim-root], [data-aim-signon], [data-aim-im-form], [data-aim-away-form], [data-aim-profile]")) {
      return;
    }

    var userKey = sk("aim-user");
    var budKey = sk("aim-buddies");
    var msgKey = sk("aim-messages");
    var awayKey = sk("aim-away");
    var status = doc.querySelector("[data-aim-status], [data-itt-action-status]");

    function user() {
      return loadJSON(userKey, null);
    }
    function buds() {
      var list = loadJSON(budKey, null);
      if (!list || !list.length) {
        list = SEED.slice();
        saveJSON(budKey, list);
      }
      return list;
    }
    function msgs() {
      return loadJSON(msgKey, {}) || {};
    }
    function away() {
      return loadJSON(awayKey, null);
    }

    function renderList() {
      var list = doc.querySelector("[data-aim-buddies]");
      if (!list) return;
      var u = user();
      var signed = !!(u && u.signedOn);
      var color = { online: "#080", away: "#a60", idle: "#888", warned: "#cc0" };
      if (!signed) {
        /* still render names so trails / one-thing clicks work */
      }
      var a0 = away();
      var youRow = "";
      if (u && u.sn) {
        youRow =
          "<div class='aim-you-row'><b>You · " +
          esc(u.sn) +
          "</b> " +
          (a0 && a0.on ? "<font color='#a60'>AWAY: " + esc(a0.text) + "</font>" : "<font color='#080'>Online</font>") +
          "</div>";
      }
      list.innerHTML =
        youRow +
        buds()
        .map(function (b, bi) {
          var st = b.state || "online";
          var idle = typeof b.idle === "number" ? b.idle : 2 + (bi % 9);
          return (
            "<div style='padding:4px 0;border-bottom:1px solid #b0b0b0;font-size:12px'>" +
            "<b style='color:" +
            (color[st] || "#080") +
            "'>●</b> " +
            '<button type="button" data-aim-pick="' +
            esc(b.id) +
            '" class="ott-btn" style="font-size:12px"><b>' +
            esc(b.nick) +
            "</b></button> <font color='#666'>(" +
            esc(st) +
            ")</font> <font size='1' color='#666'>idle " +
            idle +
            "m</font> " +
            '<button type="button" data-aim-warn="' +
            esc(b.id) +
            '" class="ott-btn" style="font-size:11px;background:#ff0;color:#000">warn</button></div>'
          );
        })
        .join("");
      var picks = list.querySelectorAll("[data-aim-pick]");
      var pi;
      for (pi = 0; pi < picks.length; pi++) {
        picks[pi].addEventListener("click", function (ev) {
          var id = ev.currentTarget.getAttribute("data-aim-pick");
          saveJSON(sk("aim-last-buddy"), { id: id });
          feedback("Selected " + (buddyById(id).nick || id) + " · Open IM window.", status);
        });
      }
      var warns = list.querySelectorAll("[data-aim-warn]");
      var wi;
      for (wi = 0; wi < warns.length; wi++) {
        warns[wi].addEventListener("click", function (ev) {
          var id = ev.currentTarget.getAttribute("data-aim-warn");
          var listB = buds();
          var i;
          for (i = 0; i < listB.length; i++) {
            if (listB[i].id === id) {
              listB[i].state = "warned";
              listB[i].warn = (listB[i].warn || 0) + 1;
            }
          }
          saveJSON(budKey, listB);
          feedback("Warned " + ((buddyById(id) && buddyById(id).nick) || id) + " (yellow theater).", status);
          renderList();
        });
      }
    }

    function renderSession() {
      var el = doc.querySelector("[data-aim-session]");
      if (!el) return;
      var u = user();
      var a = away();
      if (!u) {
        el.textContent = "Not signed on.";
        return;
      }
      el.textContent =
        (u.signedOn ? "Signed on as " : "Signed off · last SN ") +
        (u.sn || "?") +
        (a && a.on ? " · AWAY: " + a.text : "");
    }

    function renderLog() {
      var log = doc.querySelector("[data-aim-log]");
      if (!log) return;
      var id = currentBuddyId();
      var all = msgs();
      var thread = all[id] || [];
      if (!thread.length) {
        log.innerHTML = "<font color='#666' size='2'>No messages yet. Type below.</font>";
        return;
      }
      log.innerHTML = thread
        .map(function (m) {
          return (
            "<div style='margin:3px 0;font-size:12px'><b>" +
            esc(m.from) +
            ":</b> " +
            esc(m.text) +
            "</div>"
          );
        })
        .join("");
    }

    function renderProfile() {
      var box = doc.querySelector("[data-aim-profile]");
      if (!box) return;
      var u = user();
      var a = away();
      var qEl = doc.querySelector("[data-aim-quote-out]");
      var quote = (u && u.quote) || "";
      box.innerHTML =
        "<p><b>Screen Name:</b> " +
        esc((u && u.sn) || "(none)") +
        "</p><p><b>Away:</b> " +
        (a && a.on ? esc(a.text) : "not away") +
        "</p>";
      if (qEl) qEl.textContent = quote || "(no quote yet)";
    }

    function currentBuddyId() {
      try {
        var q = U().queryParam ? U().queryParam("buddy") : "";
        if (q) return q;
      } catch (e) { /* */ }
      var last = loadJSON(sk("aim-last-buddy"), null);
      return (last && last.id) || "buddy-a";
    }

    function buddyById(id) {
      var i;
      var list = buds();
      for (i = 0; i < list.length; i++) {
        if (list[i].id === id) return list[i];
      }
      return list[0];
    }

    renderList();
    renderSession();
    renderLog();
    renderProfile();

    var nameEl = doc.querySelector("[data-aim-buddy-name]");
    if (nameEl) {
      var b0 = buddyById(currentBuddyId());
      nameEl.textContent = b0 ? b0.nick : "buddy";
    }

    var sign = doc.querySelector("[data-aim-signon]");
    if (sign) {
      sign.addEventListener("submit", function (ev) {
        ev.preventDefault();
        var inp =
          sign.querySelector("[name='sn']") ||
          sign.querySelector("#ott-field") ||
          doc.querySelector("#ott-field");
        var sn = inp && inp.value != null ? String(inp.value).replace(/^\s+|\s+$/g, "") : "";
        if (sn.length < 3 || sn.length > 16) {
          feedback("Screen name 3–16 characters required.", status, true);
          return;
        }
        saveJSON(userKey, { sn: sn, signedOn: true, ts: Date.now() });
        buds();
        writeSummary({ signedOn: true });
        feedback("Signed on as " + sn + " (theater · no AOL network).", status);
        stamp();
        renderSession();
        renderList();
      });
    }

    var off = doc.querySelector("[data-aim-signoff]");
    if (off) {
      off.addEventListener("click", function (ev) {
        ev.preventDefault();
        var u = user();
        if (!u || !u.sn) {
          feedback("Not signed on.", status, true);
          return;
        }
        u.signedOn = false;
        saveJSON(userKey, u);
        feedback("Signed off. Transcripts kept in this browser.", status);
        renderSession();
        renderList();
      });
    }

    var imForm = doc.querySelector("[data-aim-im-form]");
    if (imForm) {
      imForm.addEventListener("submit", function (ev) {
        ev.preventDefault();
        var u = user();
        if (!u || !u.signedOn) {
          feedback("Sign on from the Buddy List first.", status, true);
          return;
        }
        var inp = imForm.querySelector("[name='text']") || doc.querySelector("#aim-msg");
        var text = inp && inp.value != null ? String(inp.value).replace(/^\s+|\s+$/g, "") : "";
        if (!text) {
          feedback("Type a message first (empty blocked).", status, true);
          return;
        }
        var id = currentBuddyId();
        var bud = buddyById(id);
        saveJSON(sk("aim-last-buddy"), { id: id });
        var all = msgs();
        if (!all[id]) all[id] = [];
        all[id].push({ from: u.sn, text: text, ts: Date.now() });
        var a = away();
        if (bud && bud.state === "away") {
          all[id].push({
            from: bud.nick,
            text: (a && a.text) || "auto-away: brb (theater)",
            ts: Date.now() + 1
          });
        }
        saveJSON(msgKey, all);
        writeSummary({ messaged: bud && bud.nick });
        if (inp) inp.value = "";
        feedback("Message queued locally · " + (bud ? bud.nick : id), status);
        stamp();
        renderLog();
      });
    }

    var awayForm = doc.querySelector("[data-aim-away-form]");
    if (awayForm) {
      var ta = awayForm.querySelector("[name='away']") || doc.querySelector("#away");
      var cur = away();
      if (ta && cur && cur.text) ta.value = cur.text;
      var presets = doc.querySelectorAll("[data-aim-away-preset]");
      var pri;
      for (pri = 0; pri < presets.length; pri++) {
        presets[pri].addEventListener("click", function (ev) {
          var line = ev.currentTarget.getAttribute("data-aim-away-preset") || "";
          if (ta) ta.value = line;
          feedback("Preset loaded · Set as Away to save.", status);
        });
      }
      awayForm.addEventListener("submit", function (ev) {
        ev.preventDefault();
        var u = user();
        if (!u || !u.signedOn) {
          feedback("Sign on first.", status, true);
          return;
        }
        var text = ta && ta.value != null ? String(ta.value).replace(/^\s+|\s+$/g, "") : "";
        if (text.length < 2) {
          feedback("Away message too short.", status, true);
          return;
        }
        saveJSON(awayKey, { on: true, text: text, ts: Date.now() });
        writeSummary({ away: text });
        feedback("Away set · " + text, status);
        stamp();
        renderSession();
        renderList();
      });
    }

    var quoteForm = doc.querySelector("[data-aim-quote-form]");
    if (quoteForm) {
      quoteForm.addEventListener("submit", function (ev) {
        ev.preventDefault();
        var u = user() || {};
        var qIn = quoteForm.querySelector("[name='quote']") || doc.querySelector("#ott-profile-quote");
        var q = qIn && qIn.value != null ? String(qIn.value).replace(/^\s+|\s+$/g, "") : "";
        if (q.length < 2) {
          feedback("Quote too short.", status, true);
          return;
        }
        u.quote = q;
        saveJSON(userKey, u);
        feedback("Profile quote saved (this browser only).", status);
        renderProfile();
      });
    }

    var addForm = doc.querySelector("[data-aim-add]");
    if (addForm) {
      addForm.addEventListener("submit", function (ev) {
        ev.preventDefault();
        var u = user();
        if (!u || !u.signedOn) {
          feedback("Sign on first.", status, true);
          return;
        }
        var inp = addForm.querySelector("[name='nick']") || doc.querySelector("#aim-add-nick");
        var nick = inp && inp.value != null ? String(inp.value).replace(/^\s+|\s+$/g, "") : "";
        if (nick.length < 2 || nick.length > 16) {
          feedback("Buddy screen name 2–16 characters.", status, true);
          return;
        }
        var list = buds();
        var i;
        for (i = 0; i < list.length; i++) {
          if (String(list[i].nick).toLowerCase() === nick.toLowerCase()) {
            feedback("Already on your Buddy List.", status, true);
            return;
          }
        }
        list.push({
          id: "buddy-" + Date.now(),
          nick: nick,
          state: "online",
          custom: true
        });
        saveJSON(budKey, list);
        writeSummary({ addedBuddy: nick });
        if (inp) inp.value = "";
        feedback("Added " + nick + " (this browser only · no AOL network).", status);
        stamp();
        renderList();
      });
    }
  }

  var features = ITT.ImmersionFeatures || (ITT.ImmersionFeatures = []);
  if (typeof features.registerLocal === "function") {
    features.registerLocal({ id: "aim", featureKey: "aim", boot: boot });
  } else {
    features.push({
      id: "aim",
      needs: function (cfg) {
        return !cfg.features || cfg.features.aim !== false;
      },
      init: function () {
        boot(document);
      }
    });
  }
})(typeof window !== "undefined" ? window : this);
