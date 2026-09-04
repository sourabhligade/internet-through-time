/**
 * ICQ 1997 — UIN + buddy list + offline message theater (localStorage)
 * Keys: itt97-icq-uin · itt97-icq-buddies · itt97-icq-messages
 */
(function (global) {
  "use strict";
  var ITT = global.ITT || (global.ITT = {});

  function U() {
    return ITT.util || {};
  }
  function sk(suffix) {
    return U().immersionStorageKey
      ? U().immersionStorageKey(suffix, "itt97")
      : "itt97-" + suffix;
  }
  function loadJSON(k, fb) {
    try {
      var raw = localStorage.getItem(k);
      if (!raw) return fb;
      return JSON.parse(raw);
    } catch (e) {
      return fb;
    }
  }
  function saveJSON(k, v) {
    localStorage.setItem(k, JSON.stringify(v));
  }
  function esc(s) {
    return String(s || "")
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;");
  }

  function boot(doc) {
    doc = doc || document;
    if (!doc.querySelector("[data-icq-register], [data-icq-buddy-form], [data-icq-msg-form], [data-icq-buddies]")) {
      return;
    }

    var uinKey = sk("icq-uin");
    var budKey = sk("icq-buddies");
    var msgKey = sk("icq-messages");
    var status = doc.querySelector("[data-icq-status]");

    function setStatus(msg, err) {
      if (!status) return;
      status.textContent = msg || "";
      status.style.color = err ? "#a00" : "#060";
    }

    function render() {
      var uin = loadJSON(uinKey, null);
      var buds = loadJSON(budKey, []) || [];
      var msgs = loadJSON(msgKey, []) || [];
      var uinEl = doc.querySelector("[data-icq-uin-display]");
      if (uinEl) {
        uinEl.textContent = uin && uin.uin ? "Your UIN: " + uin.uin : "No UIN yet — register first.";
      }
      var list = doc.querySelector("[data-icq-buddies]");
      if (list) {
        if (!buds.length) {
          list.innerHTML = "<font size='2' color='#555'>Buddy list empty.</font>";
        } else {
          list.innerHTML = buds
            .map(function (b) {
              return (
                "<div style='padding:4px 0;border-bottom:1px solid #ddd;font-size:12px'>" +
                "<b style='color:#080'>●</b> " +
                esc(b.nick || b.uin) +
                " <font color='#666'>(" +
                esc(b.uin) +
                ")</font></div>"
              );
            })
            .join("");
        }
      }
      var msgList = doc.querySelector("[data-icq-messages]");
      if (msgList) {
        if (!msgs.length) {
          msgList.innerHTML = "<font size='2' color='#555'>No offline messages.</font>";
        } else {
          msgList.innerHTML = msgs
            .slice()
            .reverse()
            .map(function (m) {
              return (
                "<div style='font-size:12px;margin:4px 0;padding:4px;background:#ffc'>" +
                "<b>" +
                esc(m.to) +
                ":</b> " +
                esc(m.text) +
                "</div>"
              );
            })
            .join("");
        }
      }
    }

    render();

    var reg = doc.querySelector("[data-icq-register]");
    if (reg) {
      reg.addEventListener("submit", function (ev) {
        ev.preventDefault();
        var nick = (reg.querySelector("[name=nick]") && reg.querySelector("[name=nick]").value || "").trim();
        if (!nick) {
          setStatus("Pick a nickname first.", true);
          return;
        }
        /* Theater UIN: 8-digit class */
        var uin = String(10000000 + Math.floor(Math.random() * 89999999));
        saveJSON(uinKey, { nick: nick, uin: uin, ts: Date.now() });
        setStatus("Registered · UIN " + uin + " (theater · not Mirabilis).");
        render();
        try {
          if (ITT._immersionApi && ITT._immersionApi.markTourUsed) ITT._immersionApi.markTourUsed();
        } catch (e) { /* */ }
      });
    }

    var buddyForm = doc.querySelector("[data-icq-buddy-form]");
    if (buddyForm) {
      buddyForm.addEventListener("submit", function (ev) {
        ev.preventDefault();
        if (!loadJSON(uinKey, null)) {
          setStatus("Register a UIN first.", true);
          return;
        }
        var bu = (buddyForm.querySelector("[name=uin]") && buddyForm.querySelector("[name=uin]").value || "").replace(/\D/g, "");
        var bn = (buddyForm.querySelector("[name=nick]") && buddyForm.querySelector("[name=nick]").value || "").trim();
        if (bu.length < 5) {
          setStatus("Enter a buddy UIN (5+ digits).", true);
          return;
        }
        var buds = loadJSON(budKey, []) || [];
        buds.push({ uin: bu, nick: bn || ("User " + bu.slice(-4)), ts: Date.now() });
        saveJSON(budKey, buds);
        setStatus("Buddy added · " + buds.length + " on list.");
        if (buddyForm.querySelector("[name=uin]")) buddyForm.querySelector("[name=uin]").value = "";
        render();
        try {
          if (ITT._immersionApi && ITT._immersionApi.markTourUsed) ITT._immersionApi.markTourUsed();
        } catch (e2) { /* */ }
      });
    }

    var msgForm = doc.querySelector("[data-icq-msg-form]");
    if (msgForm) {
      msgForm.addEventListener("submit", function (ev) {
        ev.preventDefault();
        if (!loadJSON(uinKey, null)) {
          setStatus("Register a UIN first.", true);
          return;
        }
        var to = (msgForm.querySelector("[name=to]") && msgForm.querySelector("[name=to]").value || "").trim();
        var text = (msgForm.querySelector("[name=text]") && msgForm.querySelector("[name=text]").value || "").trim();
        if (!to || !text) {
          setStatus("To + message required (empty blocked).", true);
          return;
        }
        var msgs = loadJSON(msgKey, []) || [];
        msgs.push({ to: to, text: text, ts: Date.now() });
        saveJSON(msgKey, msgs);
        setStatus("Offline message queued · " + msgs.length + " (theater).");
        if (msgForm.querySelector("[name=text]")) msgForm.querySelector("[name=text]").value = "";
        render();
        try {
          if (ITT._immersionApi && ITT._immersionApi.markTourUsed) ITT._immersionApi.markTourUsed();
        } catch (e3) { /* */ }
      });
    }
  }

  var features = ITT.ImmersionFeatures || (ITT.ImmersionFeatures = []);
  if (typeof features.registerLocal === "function") {
    features.registerLocal({
      id: "icq",
      featureKey: "icq",
      boot: boot
    });
  } else {
    features.push({
      id: "icq",
      needs: function (cfg) {
        return !cfg.features || cfg.features.icq !== false;
      },
      init: function () {
        boot(document);
      }
    });
  }
})(typeof window !== "undefined" ? window : this);
