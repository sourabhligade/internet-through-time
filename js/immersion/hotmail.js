/**
 * Immersion feature: hotmail
 * Registers with ITT.ImmersionFeatures — init(api) only.
 */
(function (global) {
  "use strict";
  var ITT = global.ITT || (global.ITT = {});
  ITT.ImmersionFeatures = ITT.ImmersionFeatures || [];
  ITT.ImmersionFeatures.push({
    id: "hotmail",
    needs: function (cfg) { return cfg.features && cfg.features.hotmail; },
    init: function (api) {
      var config = api.config;
      var YEAR = api.YEAR;
      var R = api.R;
      var storageKey = api.storageKey;
      var qs = api.qs;
      var escapeHtml = api.escapeHtml;
      var loadJSON = api.loadJSON;
      var saveJSON = api.saveJSON;
      var showFlash = api.showFlash;
      var actionFeedback = api.actionFeedback || showFlash;
      var markTourProgress = api.markTourProgress;
      var markTourUsed = api.markTourUsed || api.markTourProgress;
      var renderCounter = api.renderCounter;
      var parentBrowser = api.parentBrowser;

function hotmailHref(file) {
  if ((location.pathname || "").indexOf("/hotmail/") !== -1) return file;
  return R("sites/hotmail/" + file);
}

/** Prefer shell navigate so Location bar / history stay in sync */
function hotmailGo(file) {
  var path = "sites/hotmail/" + file;
  try {
    if (parentBrowser && typeof parentBrowser.navigate === "function") {
      parentBrowser.navigate(path, { instant: true });
      return;
    }
  } catch (eNav) { /* fall through */ }
  try {
    if (window.top && window.top.ITT && window.top.ITT.activeBrowser &&
        typeof window.top.ITT.activeBrowser.navigate === "function") {
      window.top.ITT.activeBrowser.navigate(path, { instant: true });
      return;
    }
  } catch (eTop) { /* fall through */ }
  location.href = hotmailHref(file);
}

function getHotmailUser() {
  return loadJSON(storageKey("hotmail-user"), null);
}

function setHotmailUser(u) {
  saveJSON(storageKey("hotmail-user"), u);
}

function getMail() {
  return loadJSON(storageKey("hotmail-mail"), null);
}

function setMail(list) {
  saveJSON(storageKey("hotmail-mail"), list);
}

function seedMail(user) {
  var mail = getMail();
  if (mail && mail.length) return mail;
  mail = [
    {
      id: "m1",
      from: "welcome@hotmail.com",
      subject: "Welcome to HoTMaiL!",
      body: "Thanks for signing up for free web-based email.\n\nYou can read mail from any computer with a Web browser.\n\n— The HoTMaiL Team",
      date: new Date().toLocaleString(),
      read: false
    },
    {
      id: "m2",
      from: "tips@hotmail.com",
      subject: "Get your free email at HoTMaiL",
      body: "Tell your friends — free email you can check from anywhere on the Web.\n\nGet your free email at HoTMaiL!",
      date: new Date().toLocaleString(),
      read: false
    },
    {
      id: "m3",
      from: "news@hotmail.com",
      subject: "Your 2 MB mailbox",
      body: "Welcome aboard. You have 2 MB of free storage.\n\nCompose a message to try it out!\n\n— The HoTMaiL Team",
      date: new Date().toLocaleString(),
      read: false
    }
  ];
  setMail(mail);
  return mail;
}

function initHotmail() {
  if (!config.features || !config.features.hotmail) return;

  var loginForm = document.querySelector("form[data-hotmail-login]");
  if (loginForm) {
    loginForm.onsubmit = function (e) {
      e.preventDefault();
      var login = ((loginForm.querySelector('[name="login"]') || {}).value || "").trim();
      var pass = ((loginForm.querySelector('[name="pass"]') || {}).value || "").trim();
      if (!login) {
        actionFeedback("Enter a login name.");
        return;
      }
      setHotmailUser({ login: login, pass: pass ? "set" : "" });
      seedMail({ login: login });
      actionFeedback("Signed in as <b>" + escapeHtml(login) + "@hotmail.com</b>");
      markTourUsed();
      hotmailGo("inbox.html");
    };
  }

  var user = getHotmailUser();
  var who = document.querySelectorAll("[data-hotmail-user]");
  for (var i = 0; i < who.length; i++) {
    who[i].textContent = user ? user.login + "@hotmail.com" : "(not signed in)";
  }

  var gate = document.querySelector("[data-hotmail-require-login]");
  if (gate && !user) {
    gate.innerHTML =
      "<p><b>Please sign in first.</b></p><p><a href=\"" +
      hotmailHref("index.html") +
      "\">HoTMaiL login</a></p>";
    return;
  }

  var listEl = document.querySelector("[data-hotmail-inbox]");
  if (listEl && user) {
    var mail = seedMail(user);
    listEl.innerHTML = "";
    if (!mail.length) {
      listEl.innerHTML = "<tr><td colspan=\"4\"><i>No messages.</i></td></tr>";
    } else {
      for (var m = 0; m < mail.length; m++) {
        var msg = mail[m];
        var tr = document.createElement("tr");
        var b0 = msg.read ? "" : "<b>";
        var b1 = msg.read ? "" : "</b>";
        tr.innerHTML =
          "<td>" + b0 + escapeHtml(msg.from) + b1 + "</td>" +
          "<td><a href=\"" + hotmailHref("read.html") + "?id=" + encodeURIComponent(msg.id) + "\">" +
          b0 + escapeHtml(msg.subject) + b1 + "</a></td>" +
          "<td><font size=\"2\">" + escapeHtml(msg.date) + "</font></td>" +
          "<td align=\"center\"><font size=\"2\">" + (msg.read ? "&nbsp;" : "N") + "</font></td>";
        listEl.appendChild(tr);
      }
    }
  }

  var readRoot = document.querySelector("[data-hotmail-read]");
  if (readRoot && user) {
    var id = qs("id");
    var mail2 = seedMail(user);
    var found = null;
    for (var j = 0; j < mail2.length; j++) {
      if (mail2[j].id === id) {
        found = mail2[j];
        mail2[j].read = true;
      }
    }
    setMail(mail2);
    var sub = readRoot.querySelector("[data-hm-subject]");
    var fr = readRoot.querySelector("[data-hm-from]");
    var bd = readRoot.querySelector("[data-hm-body]");
    if (!found) {
      if (sub) sub.textContent = "(message not found)";
    } else {
      if (sub) sub.textContent = found.subject;
      if (fr) fr.textContent = found.from;
      if (bd) bd.textContent = found.body;
    }
  }

  var compose = document.querySelector("form[data-hotmail-compose]");
  if (compose && user) {
    compose.onsubmit = function (e) {
      e.preventDefault();
      var to = ((compose.querySelector('[name="to"]') || {}).value || "").trim();
      var subject = ((compose.querySelector('[name="subject"]') || {}).value || "(no subject)").trim();
      var body = ((compose.querySelector('[name="body"]') || {}).value || "").trim();
      var sent = loadJSON(storageKey("hotmail-sent"), []);
      sent.unshift({
        id: "s" + Date.now(),
        to: to,
        subject: subject,
        body: body,
        date: new Date().toLocaleString()
      });
      saveJSON(storageKey("hotmail-sent"), sent.slice(0, 30));
      actionFeedback(
        "Message queued to <b>" + escapeHtml(to || "recipient") +
        "</b>. <font size=\"1\">Get your free email at HoTMaiL.</font>"
      );
      markTourUsed();
      window.setTimeout(function () {
        hotmailGo("inbox.html");
      }, 800);
    };
  }

  var logout = document.querySelector("[data-hotmail-logout]");
  if (logout) {
    logout.onclick = function (e) {
      e.preventDefault();
      setHotmailUser(null);
      actionFeedback("Signed out of HoTMaiL.");
      hotmailGo("index.html");
    };
  }
}

      if (config.features && config.features.hotmail) initHotmail();

    }
  });
})(typeof window !== "undefined" ? window : this);
