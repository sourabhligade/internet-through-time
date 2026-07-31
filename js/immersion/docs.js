/**
 * Google Docs / Writely 2006 — collaborative web office theater
 * Keys: {prefix}-docs via immersionStorageKey
 */
(function (global) {
  "use strict";
  var ITT = global.ITT || (global.ITT = {});

  function U() {
    return ITT.util || {};
  }
  function storageKey() {
    return U().immersionStorageKey
      ? U().immersionStorageKey("docs", "itt06")
      : "itt06-docs";
  }
  function esc(s) {
    if (U().escapeHtml) return U().escapeHtml(s);
    return String(s || "")
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
  }
  function load() {
    try {
      return JSON.parse(localStorage.getItem(storageKey()) || "null");
    } catch (e) {
      return null;
    }
  }
  function save(doc) {
    localStorage.setItem(storageKey(), JSON.stringify(doc));
  }
  function defaultDoc() {
    return {
      title: "Untitled document",
      body:
        "Google acquired Writely (Mar 9, 2006). Docs & Spreadsheets launch energy Oct 10, 2006 — collaborative editing in the browser, not a desktop install.",
      collab: ["you", "classmate@college.edu"]
    };
  }
  function boot(doc) {
    doc = doc || document;
    if (
      !doc.querySelector(
        "[data-docs-title], [data-docs-body], [data-docs-save], [data-docs-list], [data-docs-collab]"
      )
    ) {
      return;
    }
    var data = load() || defaultDoc();
    if (!load()) save(data);

    var titleEl = doc.querySelector("[data-docs-title]");
    var bodyEl = doc.querySelector("[data-docs-body]");
    if (titleEl && titleEl.tagName === "INPUT") titleEl.value = data.title || "";
    else if (titleEl) titleEl.textContent = data.title || "";
    if (bodyEl && (bodyEl.tagName === "TEXTAREA" || bodyEl.tagName === "INPUT")) {
      bodyEl.value = data.body || "";
    } else if (bodyEl) {
      bodyEl.textContent = data.body || "";
    }
    var collab = doc.querySelector("[data-docs-collab]");
    if (collab) {
      collab.innerHTML = (data.collab || [])
        .map(function (c) {
          return "<li>" + esc(c) + "</li>";
        })
        .join("");
    }
    var list = doc.querySelector("[data-docs-list]");
    if (list) {
      list.innerHTML =
        "<li><a href='edit.html'><b>" +
        esc(data.title || "Untitled") +
        "</b></a> · shared with " +
        (data.collab || []).length +
        " people</li>";
    }
    var form = doc.querySelector("[data-docs-save]");
    if (form && form.getAttribute("data-docs-bound") !== "1") {
      form.setAttribute("data-docs-bound", "1");
      form.addEventListener("submit", function (ev) {
        ev.preventDefault();
        var t =
          form.querySelector('[name="title"]') ||
          doc.querySelector("[data-docs-title]");
        var b =
          form.querySelector('[name="body"]') ||
          doc.querySelector("[data-docs-body]");
        data.title = (t && (t.value != null ? t.value : t.textContent)) || data.title;
        data.body = (b && (b.value != null ? b.value : b.textContent)) || data.body;
        save(data);
        var st = doc.querySelector("[data-docs-status]");
        if (st) st.textContent = "Saved in this browser · collaborators can “see” edits (theater).";
      });
    }
    var invite = doc.querySelector("[data-docs-invite]");
    if (invite && invite.getAttribute("data-docs-bound") !== "1") {
      invite.setAttribute("data-docs-bound", "1");
      invite.addEventListener("submit", function (ev) {
        ev.preventDefault();
        var email = (invite.querySelector('[name="email"]') || {}).value || "friend@example.com";
        data.collab = data.collab || [];
        if (data.collab.indexOf(email) < 0) data.collab.unshift(email);
        data.collab = data.collab.slice(0, 12);
        save(data);
        if (collab) {
          collab.innerHTML = data.collab
            .map(function (c) {
              return "<li>" + esc(c) + "</li>";
            })
            .join("");
        }
        var st = doc.querySelector("[data-docs-invite-status]");
        if (st) st.textContent = "Invited " + email + " (local only).";
      });
    }
  }

  if (ITT.ImmersionFeatures && ITT.ImmersionFeatures.registerLocal) {
    ITT.ImmersionFeatures.registerLocal({ id: "docs", boot: boot });
  } else {
    ITT.docs = { boot: boot };
    if (document.readyState === "loading") {
      document.addEventListener("DOMContentLoaded", function () {
        boot(document);
      });
    } else {
      boot(document);
    }
  }
})(typeof window !== "undefined" ? window : this);
