/**
 * Immersion: Gmail 2004 — webmail theater (1 GB story), localStorage only
 */
(function (global) {
  "use strict";
  var ITT = global.ITT || (global.ITT = {});
  ITT.ImmersionFeatures = ITT.ImmersionFeatures || [];
  ITT.ImmersionFeatures.push({
    id: "gmail",
    needs: function (cfg) { return cfg.features && cfg.features.gmail; },
    init: function (api) {
      var loadJSON = api.loadJSON, saveJSON = api.saveJSON, storageKey = api.storageKey;
      var escapeHtml = api.escapeHtml, showFlash = api.showFlash, markTourProgress = api.markTourProgress;
      var KEY = storageKey("gmail-mail");
      var UKEY = storageKey("gmail-user");

      function seed() {
        return [
          { id: "1", from: "team@gmail.com", subj: "Welcome to Gmail", body: "Search, don't sort. Enjoy a gigabyte of free storage.", unread: true },
          { id: "2", from: "invite@gmail.com", subj: "Your invitation", body: "Gmail is invite-only in 2004. Pass it on carefully.", unread: true },
          { id: "3", from: "news@example.com", subj: "Google files for IPO", body: "Period culture note: 2004 is a big year for Google.", unread: false }
        ];
      }
      function getMail() {
        var m = loadJSON(KEY, null);
        if (!m) { m = seed(); saveJSON(KEY, m); }
        return m;
      }
      function setMail(m) { saveJSON(KEY, m); }

      function visibleMail() {
        var mail = getMail();
        var folder = (api.qs("folder") || "inbox").toLowerCase();
        return mail.filter(function (m) {
          var f = m.folder || "inbox";
          if (folder === "all" || folder === "allmail") return f !== "trash";
          if (folder === "spam") return f === "spam";
          if (folder === "trash") return f === "trash";
          if (folder === "starred") return !!m.starred && f !== "trash";
          if (folder === "sent") return f === "sent" || (m.subj || "").indexOf("Sent:") === 0;
          if (folder === "drafts") return f === "drafts" || (m.id || "").indexOf("draft-") === 0;
          return f === "inbox" || (!m.folder && f !== "spam" && f !== "trash" && f !== "sent" && f !== "drafts");
        });
      }

      function paintList() {
        var host = document.querySelector("[data-gmail-list]");
        if (!host) return;
        var mail = visibleMail();
        if (!mail.length) {
          host.innerHTML = "<p><font size=\"2\" color=\"#666\"><i>No conversations in this view.</i></font></p>";
          return;
        }
        var html = '<table class="gm04-list" width="100%" cellpadding="0" cellspacing="0">';
        for (var i = 0; i < mail.length; i++) {
          var m = mail[i];
          var cls = m.unread ? "gm04-unread" : "";
          html += '<tr class="' + cls + '">' +
            '<td width="24"><input type="checkbox" data-gmail-check value="' + escapeHtml(m.id) + '"></td>' +
            '<td width="28%"><font size="2">' + escapeHtml(m.from) +
            '</font></td><td><a href="read.html?id=' + escapeHtml(m.id) + '"><font size="2">' +
            escapeHtml(m.subj) + '</font></a></td></tr>';
        }
        html += "</table>";
        host.innerHTML = html;
      }

      function selectedIds() {
        var boxes = document.querySelectorAll("[data-gmail-check]:checked");
        var ids = [];
        for (var i = 0; i < boxes.length; i++) ids.push(boxes[i].value);
        return ids;
      }

      function moveSelected(folder, flashMsg) {
        var ids = selectedIds();
        if (!ids.length) {
          showFlash("Select one or more conversations first.");
          return;
        }
        var mail = getMail();
        var idset = {};
        for (var i = 0; i < ids.length; i++) idset[ids[i]] = true;
        for (var j = 0; j < mail.length; j++) {
          if (idset[String(mail[j].id)]) {
            mail[j].folder = folder;
            mail[j].unread = false;
          }
        }
        setMail(mail);
        paintList();
        showFlash(flashMsg.replace("%n", String(ids.length)));
        markTourProgress();
      }

      function wireBulk() {
        var arch = document.querySelector("[data-gmail-archive]");
        var spam = document.querySelector("[data-gmail-spam]");
        var del = document.querySelector("[data-gmail-delete]");
        var more = document.querySelector("[data-gmail-more]");
        if (arch) {
          arch.addEventListener("click", function (ev) {
            ev.preventDefault();
            moveSelected("archive", "Archived %n conversation(s). Search, don't sort.");
          });
        }
        if (spam) {
          spam.addEventListener("click", function (ev) {
            ev.preventDefault();
            moveSelected("spam", "Reported %n as spam.");
          });
        }
        if (del) {
          del.addEventListener("click", function (ev) {
            ev.preventDefault();
            moveSelected("trash", "Moved %n to Trash.");
          });
        }
        if (more) {
          more.addEventListener("click", function (ev) {
            ev.preventDefault();
            var ids = selectedIds();
            if (!ids.length) {
              showFlash("Select conversations, then use More for star / labels.");
              return;
            }
            var mail = getMail();
            var idset = {};
            for (var i = 0; i < ids.length; i++) idset[ids[i]] = true;
            for (var j = 0; j < mail.length; j++) {
              if (idset[String(mail[j].id)]) {
                mail[j].starred = !mail[j].starred;
              }
            }
            setMail(mail);
            paintList();
            showFlash("Star toggled on %n conversation(s).".replace("%n", String(ids.length)));
            markTourProgress();
          });
        }
        /* 2004 Gmail: plain gray toolbar widgets via CSS (.gm04-nav input) — no blue app chips */
        var bulkBtns = [arch, spam, del, more];
        for (var bi = 0; bi < bulkBtns.length; bi++) {
          var b = bulkBtns[bi];
          if (!b) continue;
          if ((b.className || "").indexOf("gm04-btn") === -1) b.className = (b.className ? b.className + " " : "") + "gm04-btn";
        }
      }

      function paintRead() {
        var host = document.querySelector("[data-gmail-read]");
        if (!host) return;
        var id = api.qs("id") || "1";
        var mail = getMail();
        var msg = null;
        for (var i = 0; i < mail.length; i++) {
          if (String(mail[i].id) === String(id)) msg = mail[i];
        }
        if (!msg) msg = mail[0];
        if (msg) {
          msg.unread = false;
          setMail(mail);
          host.innerHTML = '<p><font size="2"><b>From:</b> ' + escapeHtml(msg.from) +
            '<br><b>Subject:</b> ' + escapeHtml(msg.subj) + '</font></p><hr>' +
            '<p><font size="2">' + escapeHtml(msg.body) + '</font></p>';
        }
        markTourProgress();
      }

      function wireCompose() {
        var form = document.querySelector("[data-gmail-compose]");
        if (!form) return;
        form.addEventListener("submit", function (ev) {
          ev.preventDefault();
          var to = (form.querySelector('[name="to"]') || {}).value || "";
          var subj = (form.querySelector('[name="subj"]') || {}).value || "(no subject)";
          var body = (form.querySelector('[name="body"]') || {}).value || "";
          var mail = getMail();
          mail.unshift({
            id: String(Date.now()),
            from: "me@gmail.com",
            subj: "Sent: " + subj,
            body: "To: " + to + "\n\n" + body,
            unread: false,
            folder: "sent"
          });
          setMail(mail);
          showFlash("Message sent (local only). Search still works better than folders.");
          markTourProgress();
          location.href = "inbox.html";
        });
      }

      function wireLogin() {
        var form = document.querySelector("[data-gmail-login]");
        if (!form) return;
        form.addEventListener("submit", function (ev) {
          ev.preventDefault();
          var u = (form.querySelector('[name="user"]') || {}).value || "user";
          try { localStorage.setItem(UKEY, u); } catch (e) {}
          markTourProgress();
          location.href = "inbox.html";
        });
      }

      function wireSearch() {
        var btn = document.querySelector("[data-gmail-search]");
        var input = document.querySelector("[data-gmail-q]");
        if (!btn && !input) return;
        function run() {
          var q = ((input && input.value) || "").toLowerCase().trim();
          var host = document.querySelector("[data-gmail-list]");
          if (!host) {
            showFlash(q ? "Search: <b>" + escapeHtml(q) + "</b> (open Inbox)." : "Enter a search term.");
            return;
          }
          var mail = getMail();
          if (q) {
            mail = mail.filter(function (m) {
              var hay = ((m.from || "") + " " + (m.subj || "") + " " + (m.body || "")).toLowerCase();
              return hay.indexOf(q) !== -1;
            });
          }
          if (!mail.length) {
            host.innerHTML = "<p><font size=\"2\">No messages match <b>" + escapeHtml(q) + "</b>.</font></p>";
          } else {
            var html = '<table class="gm04-list" width="100%" cellpadding="0" cellspacing="0">';
            for (var i = 0; i < mail.length; i++) {
              var m = mail[i];
              var cls = m.unread ? "gm04-unread" : "";
              html += '<tr class="' + cls + '">' +
                '<td width="24"><input type="checkbox" data-gmail-check value="' + escapeHtml(m.id) + '"></td>' +
                '<td width="28%"><font size="2">' + escapeHtml(m.from) +
                '</font></td><td><a href="read.html?id=' + escapeHtml(m.id) + '"><font size="2">' +
                escapeHtml(m.subj) + '</font></a></td></tr>';
            }
            html += "</table>";
            host.innerHTML = html;
          }
          showFlash(q ? "Search mail: <b>" + escapeHtml(q) + "</b> — " + mail.length + " hit(s)." : "Showing all mail.");
          markTourProgress();
        }
        if (btn) btn.addEventListener("click", function (ev) { ev.preventDefault(); run(); });
        if (input) {
          input.addEventListener("keydown", function (ev) {
            if (ev.key === "Enter" || ev.keyCode === 13) {
              ev.preventDefault();
              run();
            }
          });
        }
      }

      function wireDraft() {
        var btn = document.querySelector("[data-gmail-draft]");
        if (!btn) return;
        btn.addEventListener("click", function (ev) {
          ev.preventDefault();
          var form = document.querySelector("[data-gmail-compose]");
          var subj = form ? ((form.querySelector('[name="subj"]') || {}).value || "(no subject)") : "Draft";
          var body = form ? ((form.querySelector('[name="body"]') || {}).value || "") : "";
          var mail = getMail();
          mail.unshift({
            id: "draft-" + Date.now(),
            from: "me@gmail.com",
            subj: "Draft: " + subj,
            body: body,
            unread: false,
            folder: "drafts"
          });
          setMail(mail);
          showFlash("Draft saved (local only). Search, don't sort.");
          markTourProgress();
        });
      }

      paintList();
      paintRead();
      wireCompose();
      wireLogin();
      wireSearch();
      wireDraft();
      wireBulk();
    }
  });
})(typeof window !== "undefined" ? window : this);
