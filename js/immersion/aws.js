/**
 * AWS 2006 — S3 / EC2 educational theater (no real cloud APIs)
 * Keys: {prefix}-aws-buckets
 */
(function (global) {
  "use strict";
  var ITT = global.ITT || (global.ITT = {});

  function U() {
    return ITT.util || {};
  }
  function storageKey() {
    return U().immersionStorageKey
      ? U().immersionStorageKey("aws-buckets", "itt06")
      : "itt06-aws-buckets";
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
  function save(list) {
    localStorage.setItem(storageKey(), JSON.stringify(list));
  }
  function seed() {
    var list = load();
    if (list && list.length) return list;
    list = [
      { name: "my-startup-assets", region: "US", objects: 3 },
      { name: "backup-demo", region: "US", objects: 1 }
    ];
    save(list);
    return list;
  }
  function render(doc) {
    var el = doc.querySelector("[data-aws-buckets]");
    if (!el) return;
    var list = seed();
    el.innerHTML = list
      .map(function (b) {
        return (
          "<tr><td><b>" +
          esc(b.name) +
          "</b></td><td>" +
          esc(b.region || "US") +
          "</td><td>" +
          (b.objects || 0) +
          " objects</td></tr>"
        );
      })
      .join("");
  }
  function boot(doc) {
    doc = doc || document;
    if (!doc.querySelector("[data-aws-buckets], [data-aws-create], [data-aws-note]")) {
      return;
    }
    render(doc);
    var form = doc.querySelector("[data-aws-create]");
    if (form && form.getAttribute("data-aws-bound") !== "1") {
      form.setAttribute("data-aws-bound", "1");
      form.addEventListener("submit", function (ev) {
        ev.preventDefault();
        var name = (form.querySelector('[name="name"]') || {}).value || "bucket";
        name = String(name)
          .toLowerCase()
          .replace(/[^a-z0-9-]/g, "-")
          .slice(0, 40);
        var list = load() || seed();
        list.unshift({ name: name || "bucket", region: "US", objects: 0 });
        save(list.slice(0, 20));
        render(doc);
        var st = doc.querySelector("[data-aws-status]");
        if (st) {
          st.textContent =
            "Bucket “" + name + "” created (local only) — S3 launched Mar 14, 2006.";
        }
        form.reset();
      });
    }
  }

  if (ITT.ImmersionFeatures && ITT.ImmersionFeatures.registerLocal) {
    ITT.ImmersionFeatures.registerLocal({ id: "aws", boot: boot });
  } else {
    ITT.aws = { boot: boot };
    if (document.readyState === "loading") {
      document.addEventListener("DOMContentLoaded", function () {
        boot(document);
      });
    } else {
      boot(document);
    }
  }
})(typeof window !== "undefined" ? window : this);
