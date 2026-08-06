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

  /**
   * Build href to a year-root path (sites/…, pages/…).
   * Prefer absolute /years/YYYY/… so links work from any nested page
   * without depending on correct ../ depth (fixes pages/sites/* 404s).
   */
  function joinRoot(year, relFromRoot, pathname) {
    var rel = String(relFromRoot || "").replace(/^\//, "");
    try {
      if (typeof window !== "undefined" && window.location && window.location.pathname) {
        var absRoot = yearRootPath(year);
        if (absRoot && absRoot.charAt(0) === "/") {
          return absRoot + rel;
        }
      }
    } catch (eJoin) { /* fall through */ }
    return yearRootPrefix(year, pathname) + rel;
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

  /**
   * Resolve a content href relative to the current year-page path.
   * Paths that already start with year-root roots (sites/, pages/) are
   * absolute within the year — never join them under pages/ or sites/foo/.
   * That bug produced 404s like pages/sites/fishcam/index.html.
   */
  function resolveRelativePath(href, currentPath) {
    if (!href) return null;
    if (href.charAt(0) === "#") return null;
    if (href.indexOf("mailto:") === 0) return null;
    if (href.indexOf("http://") === 0 || href.indexOf("https://") === 0) {
      return { external: true, href: href };
    }
    if (href.indexOf("javascript:") === 0) return null;

    var q = "";
    var qi = href.indexOf("?");
    if (qi !== -1) {
      q = href.slice(qi);
      href = href.slice(0, qi);
    }

    // Year-root absolute (config / immersion convention)
    if (/^(sites|pages)\//.test(href)) {
      return { external: false, path: fixYearRootPath(href) + q };
    }

    // Absolute site path: /years/1998/sites/foo or /internet-through-time/years/1998/sites/foo
    var ym = href.match(/\/years\/\d{4}\/(.*)$/);
    if (ym) {
      return { external: false, path: fixYearRootPath(ym[1]) + q };
    }

    var pathOnly = String(currentPath || "").split("?")[0];
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
    return { external: false, path: fixYearRootPath(out.join("/")) + q };
  }

  /** Collapse accidental pages/sites/… or sites/pages/… joins */
  function fixYearRootPath(path) {
    path = String(path || "");
    // pages/sites/foo → sites/foo  (href sites/* resolved from pages/*)
    if (path.indexOf("pages/sites/") === 0) path = path.slice("pages/".length);
    if (path.indexOf("sites/pages/") === 0) path = path.slice("sites/".length);
    // double roots
    path = path.replace(/^(sites\/)+/, "sites/");
    path = path.replace(/^(pages\/)+pages\//, "pages/");
    return path;
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
    return fixYearRootPath(path);
  }

  function hostFromUrl(url) {
    try {
      return new URL(url).hostname;
    } catch (e) {
      var m = String(url).match(/https?:\/\/([^\/]+)/i);
      return m ? m[1] : "unknown.host";
    }
  }

  /**
   * Active immersion year (iframe pages set ITT._immersionYear; shell may use data-itt-year).
   */
  function immersionYear(fallback) {
    try {
      if (ITT._immersionYear) return String(ITT._immersionYear);
    } catch (e0) { /* */ }
    try {
      if (typeof document !== "undefined" && document.documentElement) {
        var dy = document.documentElement.getAttribute("data-itt-year");
        if (dy) return String(dy);
      }
    } catch (e1) { /* */ }
    try {
      var path = (typeof location !== "undefined" && location.pathname) || "";
      var m = path.match(/\/years\/(\d{4})\//);
      if (m) return m[1];
    } catch (e2) { /* */ }
    return fallback != null ? String(fallback) : "";
  }

  /**
   * Config storagePrefix for current year (e.g. itt05). Prefer immersion config over inventing keys.
   */
  function immersionStoragePrefix(fallback) {
    var y = immersionYear("");
    try {
      if (y && ITT.immersionConfigs && ITT.immersionConfigs[y] && ITT.immersionConfigs[y].storagePrefix) {
        return String(ITT.immersionConfigs[y].storagePrefix);
      }
    } catch (e) { /* */ }
    if (y && /^\d{4}$/.test(y)) return "itt" + y.slice(2);
    return fallback != null ? String(fallback) : "itt";
  }

  /** Build a namespaced localStorage key: prefix + "-" + suffix */
  function immersionStorageKey(suffix, fallbackPrefix) {
    return immersionStoragePrefix(fallbackPrefix) + "-" + String(suffix || "");
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
    hostFromUrl: hostFromUrl,
    immersionYear: immersionYear,
    immersionStoragePrefix: immersionStoragePrefix,
    immersionStorageKey: immersionStorageKey
  };
})(typeof window !== "undefined" ? window : this);
