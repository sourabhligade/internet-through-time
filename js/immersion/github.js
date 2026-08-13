/**
 * GitHub 2008 — fake tree · README · issues · fork (no real git)
 * Keys: itt08-github-issues · itt08-github-fork · summary itt08-github
 */
(function (global) {
  "use strict";
  var ITT = global.ITT || (global.ITT = {});

  var FILES = {
    "README.md": "# hello-web\nMuseum residual repository — educational reconstruction.\n\nApr 2008 public launch class · no real git.",
    "index.html": "<!DOCTYPE html>\n<title>hello-web</title>\n<p>Museum residual.</p>\n",
    LICENSE: "Educational exhibit · trademarks belong to their owners.\n"
  };

  function U() {
    return ITT.util || {};
  }
  function sk(suffix) {
    return U().immersionStorageKey
      ? U().immersionStorageKey(suffix, "itt08")
      : "itt08-" + suffix;
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
        ITT._immersionApi.actionFeedback(msg, { status: st, flash: !err, kind: "github" });
      }
    } catch (e) { /* */ }
  }
  function summary(extra) {
    var issues = loadJSON(sk("github-issues"), []) || [];
    var fork = loadJSON(sk("github-fork"), null);
    var blob = {
      multiStep: true,
      real: true,
      year: "2008",
      issues: issues.length,
      forked: !!(fork && fork.from),
      ts: Date.now()
    };
    if (extra) {
      var k;
      for (k in extra) {
        if (Object.prototype.hasOwnProperty.call(extra, k)) blob[k] = extra[k];
      }
    }
    saveJSON(sk("github"), blob);
  }

  function boot(doc) {
    doc = doc || document;
    if (!doc.querySelector("[data-gh-tree], [data-gh-issue-form], [data-gh-issues], [data-gh-fork], [data-gh-root]")) {
      return;
    }

    var st = doc.querySelector("[data-gh-status], [data-gh-issue-status], [data-itt-action-status]");
    var issues = loadJSON(sk("github-issues"), []) || [];
    var fork = loadJSON(sk("github-fork"), null);

    var body = doc.querySelector("[data-gh-file-body]");
    var tree = doc.querySelector("[data-gh-tree]");
    function fileMap() {
      if (fork && fork.files) return fork.files;
      return FILES;
    }
    function renderTree() {
      if (!tree) return;
      var files = fileMap();
      var label = fork && fork.files ? "you/hello-web (fork)" : "museum/hello-web";
      tree.innerHTML =
        "<div style='font-size:11px;color:#666;margin-bottom:6px' data-gh-tree-label>" +
        esc(label) +
        "</div>" +
        Object.keys(files)
          .map(function (name) {
            return (
              "<div><a href='#' data-gh-file='" +
              esc(name) +
              "' data-ott-click='file-" +
              esc(name.replace(".", "-")) +
              "'>" +
              esc(name) +
              "</a></div>"
            );
          })
          .join("");
      var links = tree.querySelectorAll("[data-gh-file]");
      var i;
      for (i = 0; i < links.length; i++) {
        links[i].addEventListener("click", function (ev) {
          ev.preventDefault();
          var name = ev.currentTarget.getAttribute("data-gh-file");
          var fmap = fileMap();
          if (body) body.textContent = fmap[name] || "";
          feedback("Opened " + name + (fork && fork.files ? " (fork tree)." : " (canned residual)."), st);
        });
      }
    }
    renderTree();
    if (body && !body.textContent) body.textContent = fileMap()["README.md"];

    var list = doc.querySelector("[data-gh-issues]");
    function renderIssues() {
      if (!list) return;
      if (!issues.length) {
        list.innerHTML = "<font size='2' color='#666'>No visitor issues yet.</font>";
        return;
      }
      list.innerHTML = issues
        .map(function (iss, n) {
          return (
            "<div style='border:1px solid #ddd;padding:8px;margin:6px 0;background:#fafafa'>" +
            "<b>#" +
            (n + 1) +
            "</b> · <span style='color:" +
            (iss.open ? "#6cc644" : "#bd2c00") +
            "'>" +
            (iss.open ? "Open" : "Closed") +
            "</span> · <b>" +
            esc(iss.title) +
            "</b><p style='font-size:12px'>" +
            esc(iss.body || "") +
            "</p></div>"
          );
        })
        .join("");
    }
    renderIssues();

    var closeBtn = doc.querySelector("[data-gh-close], [data-ott-click='close']");
    if (closeBtn) {
      closeBtn.addEventListener("click", function () {
        var closed = false;
        var ci;
        for (ci = 0; ci < issues.length; ci++) {
          if (issues[ci].open) {
            issues[ci].open = false;
            closed = true;
            break;
          }
        }
        if (issues.length) saveJSON(sk("github-issues"), issues);
        summary({ closed: true });
        feedback(closed ? "Issue closed residual." : "No open visitor issue · closed residual theater.", st);
        renderIssues();
      });
    }

    var form = doc.querySelector("[data-gh-issue-form]");
    if (form) {
      form.addEventListener("submit", function (ev) {
        ev.preventDefault();
        var titleEl = form.querySelector("[name='title']");
        var bodyEl = form.querySelector("[name='body']");
        var title = titleEl && titleEl.value != null ? String(titleEl.value).replace(/^\s+|\s+$/g, "") : "";
        var bodyTxt = bodyEl && bodyEl.value != null ? String(bodyEl.value).replace(/^\s+|\s+$/g, "") : "";
        if (title.length < 3) {
          feedback("Issue title required (min 3).", st, true);
          return;
        }
        if (bodyTxt.length < 1) {
          feedback("Issue body required (empty blocked).", st, true);
          return;
        }
        issues.unshift({ title: title, body: bodyTxt, open: true, ts: Date.now() });
        saveJSON(sk("github-issues"), issues.slice(0, 40));
        summary({ lastIssue: title });
        if (titleEl) titleEl.value = "";
        if (bodyEl) bodyEl.value = "";
        feedback("Issue opened (theater · no GitHub API).", st);
        try {
          if (ITT._immersionApi && ITT._immersionApi.markTourUsed) ITT._immersionApi.markTourUsed();
        } catch (e) { /* */ }
        renderIssues();
      });
    }

    var forkBtn = doc.querySelector("[data-gh-fork-btn]");
    var forkOut = doc.querySelector("[data-gh-fork]");
    if (forkOut && fork) {
      forkOut.innerHTML = "<b>Your fork:</b> " + esc(fork.name || "you/hello-web") + " from " + esc(fork.from);
    }
    if (forkBtn) {
      forkBtn.addEventListener("click", function (ev) {
        ev.preventDefault();
        var copied = {};
        var names = Object.keys(FILES);
        var ni;
        for (ni = 0; ni < names.length; ni++) {
          copied[names[ni]] = FILES[names[ni]];
        }
        copied["README.md"] =
          "# hello-web\nFork of museum/hello-web by you (this browser only · no real git).\n\n" + FILES["README.md"];
        fork = {
          from: "museum/hello-web",
          name: "you/hello-web",
          ts: Date.now(),
          real: true,
          files: copied,
          tree: names.slice()
        };
        saveJSON(sk("github-fork"), fork);
        summary({ forked: true });
        if (forkOut) {
          forkOut.innerHTML = "<b>Your fork:</b> you/hello-web from museum/hello-web";
        }
        renderTree();
        if (body) body.textContent = copied["README.md"];
        feedback("Forked residual · tree copied in this browser only.", st);
        try {
          if (ITT._immersionApi && ITT._immersionApi.markTourUsed) ITT._immersionApi.markTourUsed();
        } catch (e2) { /* */ }
      });
    }
  }

  var features = ITT.ImmersionFeatures || (ITT.ImmersionFeatures = []);
  if (typeof features.registerLocal === "function") {
    features.registerLocal({ id: "github", featureKey: "github", boot: boot });
  } else {
    features.push({
      id: "github",
      needs: function (cfg) {
        return !cfg.features || cfg.features.github !== false;
      },
      init: function () {
        boot(document);
      }
    });
  }
})(typeof window !== "undefined" ? window : this);
