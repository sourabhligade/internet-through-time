/**
 * Four REAL machines from unused external sources (textfiles culture,
 * CSS Zen Garden, Neocities, SpaceHey). Incomplete never writes.
 * Keys: itt94-bbs · itt03-zengarden · itt13-neocities · itt20-spacehey
 */
(function (global) {
  "use strict";
  var ITT = global.ITT || (global.ITT = {});

  function U() {
    return ITT.util || {};
  }
  function yearPfx() {
    try {
      var y =
        (ITT._immersionYear && String(ITT._immersionYear)) ||
        (document.documentElement && document.documentElement.getAttribute("data-itt-year")) ||
        "";
      if (/^\d{4}$/.test(y)) return "itt" + y.slice(2);
    } catch (e) { /* */ }
    return "itt";
  }
  function sk(suffix) {
    var p = yearPfx();
    return U().immersionStorageKey ? U().immersionStorageKey(suffix, p) : p + "-" + suffix;
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
  function trim(s) {
    return String(s == null ? "" : s).replace(/^\s+|\s+$/g, "");
  }
  function feedback(msg, st, err) {
    if (st) {
      st.textContent = msg;
      st.style.color = err ? "#a00" : "#060";
      try {
        st.classList.remove("is-ok", "is-err");
        if (err) st.classList.add("is-err");
        else if (msg) st.classList.add("is-ok");
      } catch (eC) { /* */ }
    }
    try {
      if (ITT._immersionApi && ITT._immersionApi.actionFeedback) {
        ITT._immersionApi.actionFeedback(msg, { status: st, flash: !err });
      }
    } catch (e) { /* */ }
  }
  function stamp() {
    try {
      if (ITT._immersionApi && ITT._immersionApi.markTourUsed) ITT._immersionApi.markTourUsed();
    } catch (e) { /* */ }
  }
  function blob(extra) {
    var o = { multiStep: true, real: true, ts: Date.now() };
    var k;
    if (extra) {
      for (k in extra) {
        if (Object.prototype.hasOwnProperty.call(extra, k)) o[k] = extra[k];
      }
    }
    return o;
  }

  /* 1994 — BBS last session (textfiles.com is a 1998 site; this is the 1994 ritual) */
  function bootBbs(doc) {
    var host = doc.querySelector("[data-bbs]");
    if (!host) return;
    var st = host.querySelector("[data-itt-action-status]");
    var last = host.querySelector("[data-bbs-last]");
    var list = host.querySelector("[data-bbs-log]");
    var form = host.querySelector("[data-bbs-form]");
    var fileLink = host.querySelector("[data-bbs-file]");
    var key = sk("bbs");
    var logKey = sk("bbs-log");
    var wanderKey = "itt94-bbs-read";
    var saved = loadJSON(key, null);
    var entries = loadJSON(logKey, null);
    if (!entries || !entries.length) entries = [];

    function hasRead() {
      try {
        return sessionStorage.getItem(wanderKey) === "1";
      } catch (e) {
        return false;
      }
    }
    function markRead() {
      try {
        sessionStorage.setItem(wanderKey, "1");
      } catch (e) { /* */ }
    }
    if (fileLink) {
      fileLink.addEventListener("click", function () {
        markRead();
      });
    }
    if (host.getAttribute("data-bbs-reading") === "1") markRead();

    function renderLog() {
      if (!list) return;
      if (!entries.length) {
        list.innerHTML = "<font size='2' color='#666'>No sysop log yet.</font>";
        return;
      }
      list.innerHTML = entries
        .map(function (e) {
          return (
            "<li><b>" +
            esc(e.name || "") +
            "</b>" +
            (e.note ? " — " + esc(e.note) : "") +
            " <font size='1' color='#666'>(" +
            esc(e.file || "") +
            ")</font></li>"
          );
        })
        .join("");
    }
    if (last) {
      last.textContent =
        saved && saved.name
          ? "Last call: " + saved.name + " · " + (saved.file || "")
          : "No last-call signature yet.";
    }
    renderLog();

    if (form) {
      form.addEventListener("submit", function (ev) {
        ev.preventDefault();
        var name = trim((form.querySelector("[name='handle']") || {}).value);
        var note = trim((form.querySelector("[name='note']") || {}).value);
        if (name.length < 2) {
          feedback("Type a handle (min 2). Empty log is not a visit.", st, true);
          return;
        }
        if (!hasRead()) {
          feedback("Read a file first — then sign the sysop log.", st, true);
          return;
        }
        var file = fileLink ? trim(fileLink.textContent) || "file" : "file";
        var row = { name: name, note: note, file: file, ts: Date.now() };
        entries.unshift(row);
        entries = entries.slice(0, 20);
        saveJSON(logKey, entries);
        saveJSON(key, blob({ name: name, file: file, wandered: true, year: "1994" }));
        stamp();
        if (last) last.textContent = "Last call: " + name + " · " + file;
        renderLog();
        form.reset();
        feedback("Sysop log signed · itt94-bbs (this browser).", st);
      });
    }
  }

  /* 2003 — CSS Zen Garden: same HTML, pick a museum theme, then save */
  function bootZen(doc) {
    var host = doc.querySelector("[data-zen]");
    if (!host) return;
    var st = host.querySelector("[data-itt-action-status]");
    var savedEl = host.querySelector("[data-zen-saved]");
    var btn = host.querySelector("[data-zen-save]");
    var htmlSame = host.querySelector("[data-zen-html-same]");
    var key = sk("zengarden");
    var picked = "";
    var saved = loadJSON(key, null);

    function applyTheme(id) {
      host.setAttribute("data-zen-theme", id);
      try {
        doc.body.setAttribute("data-zen-theme", id);
      } catch (e) { /* */ }
      picked = id;
      var label = host.querySelector("[data-zen-current]");
      if (label) label.textContent = id;
    }

    var themes = host.querySelectorAll("[data-zen-theme-pick]");
    var i;
    for (i = 0; i < themes.length; i++) {
      themes[i].addEventListener("click", function (ev) {
        ev.preventDefault();
        applyTheme(this.getAttribute("data-zen-theme-pick") || "");
        feedback("Theme loaded. HTML did not change.", st);
      });
    }
    if (saved && saved.theme) {
      applyTheme(saved.theme);
      if (savedEl) savedEl.textContent = "Saved favorite: " + saved.theme;
    }
    if (btn) {
      btn.addEventListener("click", function () {
        if (!picked) {
          feedback("Pick a style sheet first. Incomplete does not write.", st, true);
          return;
        }
        if (!htmlSame || !htmlSame.checked) {
          feedback("Check: the HTML stays the same. That is the 2003 lesson.", st, true);
          return;
        }
        saveJSON(key, blob({ theme: picked, htmlUnchanged: true, year: "2003", launch: "2003-05" }));
        stamp();
        if (savedEl) savedEl.textContent = "Saved favorite: " + picked;
        feedback("Garden favorite saved · itt03-zengarden", st);
      });
    }
  }

  /* 2013 — Neocities: sitename + tag, then publish */
  function bootNeocities(doc) {
    var host = doc.querySelector("[data-neo]");
    if (!host) return;
    var st = host.querySelector("[data-itt-action-status]");
    var form = host.querySelector("[data-neo-form]");
    var preview = host.querySelector("[data-neo-preview]");
    var key = sk("neocities");
    var saved = loadJSON(key, null);

    function paint(state) {
      if (!preview || !state) return;
      preview.removeAttribute("hidden");
      preview.innerHTML =
        "<b>" +
        esc(state.sitename) +
        ".neocities.org</b> residual · tag <i>" +
        esc(state.tag) +
        "</i> · 10 MB theater";
    }
    if (saved) paint(saved);

    if (form) {
      form.addEventListener("submit", function (ev) {
        ev.preventDefault();
        var sitename = trim((form.querySelector("[name='sitename']") || {}).value)
          .toLowerCase()
          .replace(/[^a-z0-9-]/g, "");
        var tagEl = form.querySelector("[name='tag']:checked");
        var tag = trim(tagEl && tagEl.value);
        if (sitename.length < 3) {
          feedback("Need a site name (3+ letters). Empty publish is not a homestead.", st, true);
          return;
        }
        if (!tag) {
          feedback("Pick a browse tag (personal / art / shrine).", st, true);
          return;
        }
        var state = blob({
          sitename: sitename,
          tag: tag,
          mb: 10,
          launched: "2013-06-28",
          year: "2013",
          notGeocities: true
        });
        saveJSON(key, state);
        stamp();
        paint(state);
        feedback("Published residual · itt13-neocities", st);
      });
    }
  }

  /* 2020 — SpaceHey: name + mood, then add one friend */
  function bootSpacehey(doc) {
    var host = doc.querySelector("[data-shy]");
    if (!host) return;
    var st = host.querySelector("[data-itt-action-status]");
    var form = host.querySelector("[data-shy-form]");
    var addBtn = host.querySelector("[data-shy-add]");
    var profile = host.querySelector("[data-shy-profile]");
    var key = sk("spacehey");
    var draftKey = "itt20-spacehey-draft";
    var saved = loadJSON(key, null);

    function readDraft() {
      try {
        var r = sessionStorage.getItem(draftKey);
        return r ? JSON.parse(r) : null;
      } catch (e) {
        return null;
      }
    }
    function writeDraft(d) {
      try {
        sessionStorage.setItem(draftKey, JSON.stringify(d));
      } catch (e) { /* */ }
    }

    function paint(state) {
      if (!profile || !state) return;
      profile.removeAttribute("hidden");
      profile.innerHTML =
        "<b>" +
        esc(state.displayName) +
        "</b> is <i>" +
        esc(state.mood) +
        "</i>" +
        (state.friend ? " · friends with " + esc(state.friend) : " · no friends yet");
    }
    if (saved) paint(saved);
    else if (readDraft()) paint(readDraft());

    if (form) {
      form.addEventListener("submit", function (ev) {
        ev.preventDefault();
        var displayName = trim((form.querySelector("[name='display']") || {}).value);
        var moodEl = form.querySelector("[name='mood']:checked");
        var mood = trim(moodEl && moodEl.value);
        if (displayName.length < 2) {
          feedback("Need a display name (min 2). Join is not the save.", st, true);
          return;
        }
        if (!mood) {
          feedback("Pick a mood. MySpace-shaped, not Instagram.", st, true);
          return;
        }
        writeDraft({ displayName: displayName, mood: mood, joinedAt: Date.now() });
        paint({ displayName: displayName, mood: mood });
        feedback("Profile drafted. Add a friend to write itt20-spacehey.", st);
      });
    }

    if (addBtn) {
      addBtn.addEventListener("click", function () {
        var d = readDraft() || saved;
        if (!d || !d.displayName || !d.mood) {
          feedback("Join with a name and mood first. Add-friend is the save.", st, true);
          return;
        }
        var friend = addBtn.getAttribute("data-shy-friend") || "tibush";
        var state = blob({
          displayName: d.displayName,
          mood: d.mood,
          friend: friend,
          launched: "2020-11-26",
          year: "2020",
          notMyspace: true
        });
        saveJSON(key, state);
        stamp();
        paint(state);
        feedback("Friend added · itt20-spacehey (this browser).", st);
      });
    }
  }

  /* 1998 — textfiles.com launch (May 1998). Archive of BBS files, not a BBS. */
  function bootTextfiles(doc) {
    var host = doc.querySelector("[data-tf]");
    if (!host) return;
    var st = host.querySelector("[data-itt-action-status]");
    var savedEl = host.querySelector("[data-tf-saved]");
    var btn = host.querySelector("[data-tf-save]");
    var archiveAck = host.querySelector("[data-tf-archive]");
    var key = sk("textfiles");
    var picked = "";
    var saved = loadJSON(key, null);

    var files = host.querySelectorAll("[data-tf-file]");
    var i;
    for (i = 0; i < files.length; i++) {
      files[i].addEventListener("click", function (ev) {
        ev.preventDefault();
        picked = this.getAttribute("data-tf-file") || trim(this.textContent);
        var cur = host.querySelector("[data-tf-current]");
        if (cur) cur.textContent = picked;
        feedback("File marked. This is a 1998 archive of older BBS text — not a live board.", st);
      });
    }
    if (saved && saved.file) {
      picked = saved.file;
      if (savedEl) savedEl.textContent = "Shelved: " + saved.file;
      var cur2 = host.querySelector("[data-tf-current]");
      if (cur2) cur2.textContent = saved.file;
    }
    if (btn) {
      btn.addEventListener("click", function () {
        if (!picked) {
          feedback("Pick a file first. Incomplete does not write.", st, true);
          return;
        }
        if (!archiveAck || !archiveAck.checked) {
          feedback("Check: this website is 1998. The files are older.", st, true);
          return;
        }
        saveJSON(key, blob({
          file: picked,
          launched: "1998-05",
          year: "1998",
          archiveNotBbs: true
        }));
        stamp();
        if (savedEl) savedEl.textContent = "Shelved: " + picked;
        feedback("Archived in this browser · itt98-textfiles", st);
      });
    }
  }

  /* 2004 — folklore.org (Andy Hertzfeld). Read two Mac stories, cite one. */
  function bootFolklore(doc) {
    var host = doc.querySelector("[data-folk]");
    if (!host) return;
    var st = host.querySelector("[data-itt-action-status]");
    var btn = host.querySelector("[data-folk-save]");
    var key = sk("folklore");
    var saved = loadJSON(key, null);
    var read = {};

    function countRead() {
      var n = 0;
      var k;
      for (k in read) if (read[k]) n++;
      return n;
    }
    var stories = host.querySelectorAll("[data-folk-story]");
    var s;
    for (s = 0; s < stories.length; s++) {
      stories[s].addEventListener("click", function (ev) {
        ev.preventDefault();
        var id = this.getAttribute("data-folk-story");
        read[id] = true;
        this.setAttribute("data-folk-read", "1");
        feedback("Read “" + id + "”. Need two stories before you cite.", st);
      });
    }
    if (saved && saved.cite) {
      var shown = host.querySelector("[data-folk-saved]");
      if (shown) shown.textContent = "Cited: " + saved.cite;
    }
    if (btn) {
      btn.addEventListener("click", function () {
        var picked = host.querySelector("[name='cite']:checked");
        var citeId = picked ? trim(picked.value) : "";
        if (countRead() < 2) {
          feedback("Open two stories first. A cite without reading is not REAL.", st, true);
          return;
        }
        if (!citeId) {
          feedback("Pick which story to cite.", st, true);
          return;
        }
        if (!read[citeId]) {
          feedback("Cite a story you actually opened.", st, true);
          return;
        }
        saveJSON(key, blob({
          cite: citeId,
          read: countRead(),
          year: "2004",
          launched: "2004",
          author: "hertzfeld"
        }));
        stamp();
        var shown2 = host.querySelector("[data-folk-saved]");
        if (shown2) shown2.textContent = "Cited: " + citeId;
        feedback("Citation saved · itt04-folklore", st);
      });
    }
  }

  /* 2005 — Elon Imagining the Internet Future of the Internet canvassing */
  function bootElon(doc) {
    var host = doc.querySelector("[data-elon]");
    if (!host) return;
    var st = host.querySelector("[data-itt-action-status]");
    var btn = host.querySelector("[data-elon-save]");
    var yearAck = host.querySelector("[data-elon-2005]");
    var key = sk("elon");
    var quoteId = "";
    var saved = loadJSON(key, null);

    var quotes = host.querySelectorAll("[data-elon-quote]");
    var q;
    for (q = 0; q < quotes.length; q++) {
      quotes[q].addEventListener("click", function (ev) {
        ev.preventDefault();
        quoteId = this.getAttribute("data-elon-quote") || "";
        var cur = host.querySelector("[data-elon-current]");
        if (cur) cur.textContent = quoteId;
        feedback("Prediction selected. Judge how it aged — then save.", st);
      });
    }
    if (saved && saved.quote) {
      quoteId = saved.quote;
      var shown = host.querySelector("[data-elon-saved]");
      if (shown) shown.textContent = "Judged: " + saved.quote + " · " + saved.aged;
    }
    if (btn) {
      btn.addEventListener("click", function () {
        var agedEl = host.querySelector("[name='aged']:checked");
        var aged = agedEl ? trim(agedEl.value) : "";
        if (!quoteId) {
          feedback("Pick a 2005 expert line first.", st, true);
          return;
        }
        if (!aged) {
          feedback("Did it age well, mixed, or miss? Pick one.", st, true);
          return;
        }
        if (!yearAck || !yearAck.checked) {
          feedback("Check: this is the 2005 canvassing, not the 1990–95 quote DB.", st, true);
          return;
        }
        saveJSON(key, blob({
          quote: quoteId,
          aged: aged,
          year: "2005",
          canvassing: "2005",
          notEarlyNinetiesDb: true
        }));
        stamp();
        var shown2 = host.querySelector("[data-elon-saved]");
        if (shown2) shown2.textContent = "Judged: " + quoteId + " · " + aged;
        feedback("Survey note saved · itt05-elon", st);
      });
    }
  }

  function bootAll(doc) {
    doc = doc || document;
    bootBbs(doc);
    bootZen(doc);
    bootNeocities(doc);
    bootSpacehey(doc);
    bootTextfiles(doc);
    bootFolklore(doc);
    bootElon(doc);
  }

  var features = ITT.ImmersionFeatures || (ITT.ImmersionFeatures = []);
  if (typeof features.registerLocal === "function") {
    features.registerLocal({ id: "sourceFlows", featureKey: "sourceFlows", boot: bootAll });
  } else {
    features.push({
      id: "sourceFlows",
      needs: function (cfg) {
        return !cfg.features || cfg.features.sourceFlows !== false;
      },
      init: function () {
        bootAll(document);
      }
    });
  }
})(typeof window !== "undefined" ? window : this);
