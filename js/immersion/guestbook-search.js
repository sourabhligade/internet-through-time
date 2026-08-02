/**
 * Immersion feature: guestbook-search
 * Registers with ITT.ImmersionFeatures — init(api) only.
 */
(function (global) {
  "use strict";
  var ITT = global.ITT || (global.ITT = {});

  function ittFeedback(msg, st) {
    try {
      if (typeof ITT !== "undefined" && ITT._immersionApi && ITT._immersionApi.actionFeedback) {
        ITT._immersionApi.actionFeedback(msg, { flash: true, status: st || null });
      }
    } catch (eIttFb) { /* */ }
  }

  ITT.ImmersionFeatures = ITT.ImmersionFeatures || [];
  ITT.ImmersionFeatures.push({
    id: "guestbook-search",
    needs: function () { return true; },
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
      var markTourProgress = api.markTourProgress;
      var renderCounter = api.renderCounter;
      var parentBrowser = api.parentBrowser;

function initGuestbook(root) {
  var key = root.getAttribute("data-gb-key") || "guestbook";
  var storage = storageKey("gb", key);
  var listEl = root.querySelector("[data-gb-list]");
  var form = root.querySelector("form[data-gb-form]") || root.querySelector("form");
  var notice = root.querySelector("[data-gb-notice]");
  var seeds = [];
  try { seeds = JSON.parse(root.getAttribute("data-gb-seeds") || "[]"); } catch (e) { seeds = []; }

  var entries = loadJSON(storage, null);
  if (!entries || !entries.length) {
    entries = seeds.slice();
    saveJSON(storage, entries);
  }

  function render() {
    if (!listEl) return;
    listEl.innerHTML = "";
    for (var i = 0; i < entries.length; i++) {
      var e = entries[i];
      var li = document.createElement("li");
      var line = "<b>" + escapeHtml(e.name || "Anonymous") + "</b>";
      if (e.from) line += " (" + escapeHtml(e.from) + ")";
      if (e.url && !/^javascript:/i.test(e.url.trim())) line += ' — <a href="' + escapeHtml(e.url) + '">' + escapeHtml(e.url) + "</a>";
      if (e.msg) line += ' — "' + escapeHtml(e.msg) + '"';
      if (e.date) line += ' <font size="1">' + escapeHtml(e.date) + "</font>";
      li.innerHTML = line;
      listEl.appendChild(li);
    }
  }

  // GET echo submit
  var nameF = root.getAttribute("data-gb-name") || "n";
  var fromF = root.getAttribute("data-gb-from") || "f";
  var msgF = root.getAttribute("data-gb-msg") || "c";
  var urlF = root.getAttribute("data-gb-url") || "u";
  var n = qs(nameF) || qs("name");
  var f = qs(fromF) || qs("from");
  var m = qs(msgF) || qs("m") || qs("msg") || qs("c");
  var u = qs(urlF) || qs("url");
  if (n || m) {
    var entry = {
      name: n || "Anonymous", from: f || "", msg: m || "", url: u || "",
      date: new Date().toLocaleDateString()
    };
    var sig = entry.name + "|" + entry.msg + "|" + entry.date;
    var lastSig = sessionStorage.getItem("itt-gb-last-" + key);
    if (lastSig !== sig) {
      entries.unshift(entry);
      if (entries.length > 40) entries = entries.slice(0, 40);
      saveJSON(storage, entries);
      sessionStorage.setItem("itt-gb-last-" + key, sig);
      if (notice) {
        notice.style.display = "block";
        notice.innerHTML = "Thanks, <b>" + escapeHtml(entry.name) + "</b> — your entry was added.";
      }
      showFlash("Thanks, <b>" + escapeHtml(entry.name) + "</b> — your guestbook entry was added.");
      markTourProgress();
      try {
        if (history.replaceState) history.replaceState(null, "", location.pathname);
      } catch (err) { /* */ }
    }
  }

  render();

  if (form) {
    form.addEventListener("submit", function (ev) {
      // client-side if data-gb-client or always prevent for SPA-like immersion pages
      if (form.getAttribute("data-gb-client") === "1" || form.getAttribute("data-gb-form") != null) {
        ev.preventDefault();
        var fd = new FormData(form);
        var entry2 = {
          name: (fd.get(nameF) || fd.get("name") || "Anonymous") + "",
          from: (fd.get(fromF) || fd.get("from") || "") + "",
          msg: (fd.get(msgF) || fd.get("m") || fd.get("msg") || fd.get("c") || "") + "",
          url: (fd.get(urlF) || fd.get("u") || fd.get("url") || "") + "",
          date: new Date().toLocaleDateString()
        };
        entries.unshift(entry2);
        if (entries.length > 40) entries = entries.slice(0, 40);
        saveJSON(storage, entries);
        form.reset();
        if (notice) {
          notice.style.display = "block";
          notice.innerHTML = "Thanks, <b>" + escapeHtml(entry2.name) + "</b>! Your entry is saved.";
        }
        showFlash("Thanks, <b>" + escapeHtml(entry2.name) + "</b> — your guestbook entry was added.");
        markTourProgress();
        render();
      }
    });
  }
}

/* ---------- Search ---------- */
function scoreEntry(entry, terms) {
  var hay = (entry.title + " " + (entry.kw || entry.keywords || "") + " " + (entry.blurb || "")).toLowerCase();
  var score = 0;
  for (var i = 0; i < terms.length; i++) {
    var t = terms[i];
    if (!t) continue;
    if (hay.indexOf(t) !== -1) score += 2;
    if (entry.title.toLowerCase().indexOf(t) !== -1) score += 3;
  }
  return score;
}

function entryHref(entry) {
  if (entry.path) return R(entry.path);
  if (entry.abs) return R(entry.abs);
  return entry.url || "#";
}

function initSearch(root) {
  var out = root.querySelector("[data-search-results]");
  if (!out) return;
  var q = qs("q") || qs("p") || qs("query") || "";
  var input = root.querySelector('input[name="q"], input[name="p"], input[name="query"], [data-search-q]');
  if (input && q) input.value = q;
  var catalog = config.catalog || [];
  var emptyHint = config.searchEmptyHint || "Enter a search term.";
  if (!q.trim()) {
    out.innerHTML = "<p>" + emptyHint + "</p>";
    return;
  }
  var terms = q.toLowerCase().split(/\s+/).filter(function (t) { return t.length > 1; });
  if (!terms.length) terms = [q.toLowerCase()];
  var hits = [];
  for (var i = 0; i < catalog.length; i++) {
    var s = scoreEntry(catalog[i], terms);
    if (s) hits.push({ e: catalog[i], s: s });
  }
  hits.sort(function (a, b) { return b.s - a.s; });
  var engine = root.getAttribute("data-search-engine") || "Search";
  var html = "<p><b>" + escapeHtml(engine) + "</b>: <b>" + hits.length + "</b> match(es) for <tt>" +
    escapeHtml(q) + "</tt></p>";
  if (!hits.length) {
    html += "<p>No matches.</p>";
  } else {
    html += "<ol>";
    for (var h = 0; h < hits.length; h++) {
      html += "<li><a href=\"" + escapeHtml(entryHref(hits[h].e)) + "\"><b>" +
        escapeHtml(hits[h].e.title) + "</b></a><br><font size=\"2\">" +
        escapeHtml(hits[h].e.blurb || "") + "</font></li>";
    }
    html += "</ol>";
  }
  out.innerHTML = html;
}

/* ---------- Form echo ---------- */
function initFormEcho(root) {
  var map = root.getAttribute("data-echo-fields");
  if (!map) return;
  var fields = map.split(",");
  for (var i = 0; i < fields.length; i++) {
    var pair = fields[i].split(":");
    var param = pair[0];
    var sel = pair[1] || ("#echo-" + param);
    var el = root.querySelector(sel);
    if (el) {
      var val = qs(param);
      if (val) el.textContent = val;
    }
  }
  if (root.getAttribute("data-mail-log") === "1") {
    var name = qs("name");
    var email = qs("email");
    var msg = qs("msg");
    if (name || msg) {
      var log = loadJSON(storageKey("wh-mail"), []);
      log.unshift({ name: name, email: email, msg: msg, date: new Date().toLocaleString() });
      saveJSON(storageKey("wh-mail"), log.slice(0, 20));
    }
  }
  if (root.getAttribute("data-yahoo-add") === "1") {
    var title = qs("title");
    var url = qs("url");
    if (title || url) {
      var adds = loadJSON(storageKey("yahoo-adds"), []);
      adds.unshift({
        title: title, url: url, cat: qs("cat"), desc: qs("desc"),
        email: qs("email"), date: new Date().toLocaleString()
      });
      saveJSON(storageKey("yahoo-adds"), adds.slice(0, 30));
    }
  }
}

function initYahooAddList(root) {
  var list = root.querySelector("[data-yahoo-adds]");
  if (!list) return;
  var adds = loadJSON(storageKey("yahoo-adds"), []);
  if (!adds.length) {
    list.innerHTML = "<li><i>No suggestions yet — be the first.</i></li>";
    return;
  }
  list.innerHTML = "";
  for (var i = 0; i < adds.length; i++) {
    var a = adds[i];
    var li = document.createElement("li");
    li.innerHTML = "<b>" + escapeHtml(a.title || "(untitled)") + "</b> — " +
      escapeHtml(a.url || "") +
      (a.cat ? ' <font size="2">[' + escapeHtml(a.cat) + "]</font>" : "") +
      (a.date ? ' <font size="2">— ' + escapeHtml(a.date) + "</font>" : "");
    list.appendChild(li);
  }
}

/* ---------- Babel Fish (AltaVista) theater ---------- */
function initBabelFish() {
  var forms = document.querySelectorAll("form");
  for (var i = 0; i < forms.length; i++) {
    (function (form) {
      var btn = form.querySelector("[data-babelfish]");
      var hasUrl = form.querySelector('input[name="url"]');
      var hasText = form.querySelector("textarea[name='text'], textarea[name='trtext']");
      if (!btn && !(hasUrl && form.getAttribute("action") === "#") && !hasText) return;
      // Wire text forms with data-babelfish and URL forms that live on babelfish pages
      var isBabelPage = /babelfish/i.test(location.pathname || "");
      if (!btn && !(isBabelPage && (hasUrl || hasText))) return;

      form.addEventListener("submit", function (ev) {
        ev.preventDefault();
        var textEl = form.querySelector("textarea[name='text'], textarea[name='trtext']");
        var urlEl = form.querySelector('input[name="url"]');
        var lpEl = form.querySelector('select[name="lp"], select[name="lp2"]');
        var lp = (lpEl && lpEl.value) || "en_fr";
        var src = textEl ? (textEl.value || "") : "";
        if (urlEl && !src) {
          src = "Web page: " + (urlEl.value || "http://");
        }
        var out = crudeTranslate(src, lp);
        var host = document.getElementById("itt-babelfish-out");
        if (!host) {
          host = document.createElement("div");
          host.id = "itt-babelfish-out";
          host.style.cssText = "margin:16px auto;width:80%;padding:12px;background:#FFFFEE;border:1px solid #003399";
          form.parentNode.insertBefore(host, form.nextSibling);
        }
        host.innerHTML =
          "<font face=\"Arial, Helvetica, sans-serif\" size=\"2\">" +
          "<b>Babel Fish says:</b> <font size=\"1\" color=\"#666\">(demo translation)</font><br><br>" +
          escapeHtml(out).replace(/\n/g, "<br>") +
          "</font>";
        showFlash("Babel Fish translated (" + escapeHtml(lp.replace("_", " → ")) + ").");
        markTourProgress();
      });
    })(forms[i]);
  }
}

function crudeTranslate(text, lp) {
  var t = text || "";
  var dicts = {
    en_es: [
      [/the /gi, "el "], [/and /gi, "y "], [/is /gi, "es "], [/web/gi, "red"],
      [/world/gi, "mundo"], [/people/gi, "gente"], [/amazing/gi, "increíble"],
      [/connects/gi, "conecta"], [/around/gi, "alrededor de"], [/globe/gi, "globo"]
    ],
    en_fr: [
      [/the /gi, "le "], [/and /gi, "et "], [/is /gi, "est "], [/web/gi, "toile"],
      [/world/gi, "monde"], [/people/gi, "gens"], [/amazing/gi, "incroyable"],
      [/connects/gi, "relie"], [/around/gi, "autour du"], [/globe/gi, "globe"]
    ],
    en_de: [
      [/the /gi, "der "], [/and /gi, "und "], [/is /gi, "ist "], [/web/gi, "Netz"],
      [/world/gi, "Welt"], [/people/gi, "Leute"], [/amazing/gi, "erstaunlich"],
      [/connects/gi, "verbindet"], [/around/gi, "um den"], [/globe/gi, "Globus"]
    ],
    en_it: [
      [/the /gi, "il "], [/and /gi, "e "], [/is /gi, "è "], [/web/gi, "rete"],
      [/world/gi, "mondo"], [/people/gi, "gente"], [/amazing/gi, "incredibile"]
    ],
    en_pt: [
      [/the /gi, "o "], [/and /gi, "e "], [/is /gi, "é "], [/web/gi, "rede"],
      [/world/gi, "mundo"], [/people/gi, "pessoas"], [/amazing/gi, "incrível"]
    ],
    es_en: [[/el /gi, "the "], [/y /gi, "and "], [/es /gi, "is "], [/mundo/gi, "world"]],
    fr_en: [[/le /gi, "the "], [/et /gi, "and "], [/est /gi, "is "], [/monde/gi, "world"]],
    de_en: [[/der /gi, "the "], [/und /gi, "and "], [/ist /gi, "is "], [/Welt/gi, "world"]]
  };
  var pairs = dicts[lp] || dicts.en_fr;
  for (var i = 0; i < pairs.length; i++) t = t.replace(pairs[i][0], pairs[i][1]);
  if (t === text) t = "[Babel Fish] " + t + " ¶";
  return t;
}

/* ---------- Yahoo! Mail sign-in theater ---------- */
function initYahooMail() {
  var forms = document.querySelectorAll("form[data-yahoo-mail]");
  for (var i = 0; i < forms.length; i++) {
    (function (form) {
      form.addEventListener("submit", function (ev) {
        ev.preventDefault();
        var login = ((form.querySelector('[name="login"]') || {}).value || "").trim();
        var pass = ((form.querySelector('[name="passwd"]') || {}).value || "").trim();
        if (!login) {
          showFlash("Please enter a Yahoo! ID.");
          return;
        }
        var user = { id: login, at: new Date().toLocaleString() };
        saveJSON(storageKey("yahoo-mail-user"), user);
        var host = document.getElementById("itt-yahoo-mail-out");
        if (!host) {
          host = document.createElement("div");
          host.id = "itt-yahoo-mail-out";
          host.style.cssText = "margin:16px auto;width:450px;padding:12px;background:#eeffee;border:1px solid #6600cc;text-align:left";
          form.parentNode.insertBefore(host, form.nextSibling);
        }
        host.innerHTML =
          "<font face=\"Arial, Helvetica, sans-serif\" size=\"2\">" +
          "<b>Welcome, " + escapeHtml(login) + "@yahoo.com</b><br>" +
          (pass ? "<font size=\"1\">Password accepted (stored only in this browser).</font><br>" : "") +
          "<br><b>Inbox (sample theater)</b><ul>" +
          "<li><b>Yahoo! Mail</b> — Welcome to free email!</li>" +
          "<li><b>Yahoo! Delivers</b> — Today's headlines</li>" +
          "<li><b>A friend</b> — Check out this cool site…</li>" +
          "</ul>" +
          "<font size=\"1\">Free Email for Everyone · museum reconstruction · no real accounts</font>" +
          "</font>";
        showFlash("Welcome, <b>" + escapeHtml(login) + "@yahoo.com</b>");
        markTourProgress();
      });
    })(forms[i]);
  }
}

      var gbs = document.querySelectorAll("[data-guestbook]");
      for (var g = 0; g < gbs.length; g++) initGuestbook(gbs[g]);
      var searches = document.querySelectorAll("[data-search]");
      for (var s = 0; s < searches.length; s++) initSearch(searches[s]);
      var echos = document.querySelectorAll("[data-echo-fields]");
      for (var e = 0; e < echos.length; e++) initFormEcho(echos[e]);
      initYahooAddList(document.body);
      initBabelFish();
      initYahooMail();

    }
  });
})(typeof window !== "undefined" ? window : this);
