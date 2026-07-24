/**
 * Shared utilities — The Internet Through Time
 * Pure helpers used by browser-core and immersion scripts.
 */
(function (global) {
  "use strict";

  var ITT = global.ITT || (global.ITT = {});

  function escapeHtml(s) {
    return String(s)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
  }

  function queryParam(name, search) {
    try {
      var q = (search != null ? search : location.search || "").replace(/^\?/, "");
      var parts = q.split("&");
      for (var i = 0; i < parts.length; i++) {
        var kv = parts[i].split("=");
        if (decodeURIComponent(kv[0] || "") === name) {
          return decodeURIComponent((kv[1] || "").replace(/\+/g, " "));
        }
      }
    } catch (e) { /* ignore */ }
    return "";
  }

  function loadJSON(key, fallback) {
    try {
      var raw = localStorage.getItem(key);
      if (raw != null && raw !== "") return JSON.parse(raw);
    } catch (e) { /* ignore */ }
    return fallback;
  }

  function saveJSON(key, value) {
    try {
      // null/undefined = clear key (logout, reset prefs) — never store the string "null"
      if (value === null || value === undefined) {
        localStorage.removeItem(key);
        return true;
      }
      localStorage.setItem(key, JSON.stringify(value));
      return true;
    } catch (e) {
      return false;
    }
  }

  function loadString(key, fallback) {
    try {
      var v = localStorage.getItem(key);
      return v != null ? v : fallback;
    } catch (e) {
      return fallback;
    }
  }

  function saveString(key, value) {
    try {
      localStorage.setItem(key, String(value));
      return true;
    } catch (e) {
      return false;
    }
  }

  /**
   * Resolve a path relative to years/<year>/ from a nested content page.
   * @param {string} year e.g. "1995"
   * @param {string} [pathname]
   */
  function yearRootPrefix(year, pathname) {
    var path = pathname || location.pathname || "";
    var key = "/years/" + year + "/";
    var i = path.indexOf(key);
    var rest;
    if (i !== -1) {
      rest = path.slice(i + key.length);
    } else {
      var m = path.match(new RegExp("years\\/" + year + "\\/(.*)$"));
      rest = m ? m[1] : "";
    }
    if (!rest || rest.charAt(rest.length - 1) === "/") {
      var parts = rest.replace(/\/$/, "").split("/").filter(Boolean);
      return parts.length ? "../".repeat(parts.length) : "";
    }
    var segs = rest.split("/").filter(Boolean);
    var depth = Math.max(0, segs.length - 1);
    return depth ? "../".repeat(depth) : "";
  }

  function joinRoot(year, relFromRoot, pathname) {
    return yearRootPrefix(year, pathname) + String(relFromRoot || "").replace(/^\//, "");
  }

  /**
   * Absolute path root for year shell, e.g. /years/1995/
   */
  function yearRootPath(year) {
    try {
      var path = window.location.pathname || "";
      var key = "/years/" + year;
      var i = path.indexOf(key);
      if (i !== -1) return path.slice(0, i + key.length) + "/";
    } catch (e) { /* ignore */ }
    try {
      var u = window.location.href.split("?")[0].split("#")[0];
      if (/index\.html$/i.test(u)) u = u.replace(/index\.html$/i, "");
      if (u.charAt(u.length - 1) !== "/") u = u.replace(/\/[^/]*$/, "/");
      return u.replace(/^https?:\/\/[^/]+/i, "") || "./";
    } catch (e2) {
      return "./";
    }
  }

  function resolveRelativePath(href, currentPath) {
    if (!href) return null;
    if (href.charAt(0) === "#") return null;
    if (href.indexOf("mailto:") === 0) return null;
    if (href.indexOf("http://") === 0 || href.indexOf("https://") === 0) {
      return { external: true, href: href };
    }
    var pathOnly = String(currentPath).split("?")[0];
    var baseDir = pathOnly.replace(/\/[^/]*$/, "/");
    if (pathOnly.indexOf("/") === -1) baseDir = "";
    var combined = href.charAt(0) === "/" ? href.replace(/^\//, "") : baseDir + href;
    var segs = combined.split("/");
    var out = [];
    for (var s = 0; s < segs.length; s++) {
      if (segs[s] === "" || segs[s] === ".") continue;
      if (segs[s] === "..") {
        if (out.length) out.pop();
      } else {
        out.push(segs[s]);
      }
    }
    return { external: false, path: out.join("/") };
  }

  function normalizeYearPath(path, year, home) {
    if (!path) return home;
    path = String(path).replace(/^\.\//, "");
    try {
      if (path.indexOf("http") === 0) {
        var u = new URL(path);
        path = u.pathname + u.search;
      }
    } catch (e) { /* ignore */ }
    var marker = "/years/" + year + "/";
    var i = path.indexOf(marker);
    if (i !== -1) path = path.slice(i + marker.length);
    if (path.charAt(0) === "/") {
      var j = path.indexOf("years/" + year + "/");
      if (j !== -1) path = path.slice(j + ("years/" + year + "/").length);
      else path = path.replace(/^\//, "");
    }
    return path;
  }

  function hostFromUrl(url) {
    try {
      return new URL(url).hostname;
    } catch (e) {
      var m = String(url).match(/https?:\/\/([^\/]+)/i);
      return m ? m[1] : "unknown.host";
    }
  }

  ITT.util = {
    escapeHtml: escapeHtml,
    queryParam: queryParam,
    qs: queryParam,
    loadJSON: loadJSON,
    saveJSON: saveJSON,
    loadString: loadString,
    saveString: saveString,
    yearRootPrefix: yearRootPrefix,
    joinRoot: joinRoot,
    yearRootPath: yearRootPath,
    resolveRelativePath: resolveRelativePath,
    normalizeYearPath: normalizeYearPath,
    hostFromUrl: hostFromUrl
  };
})(typeof window !== "undefined" ? window : this);
