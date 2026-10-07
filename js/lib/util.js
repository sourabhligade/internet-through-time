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
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#39;");
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

  var USER_KINDS = { official: true, leftover: true, game: true, toy: true, shell: true };

  /**
   * One visitor write. Envelope kind is the user kind.
   * A machine kind on extra (query, hops, checks, wait, toggle) is stored as step.
   */
  function userSave(opts) {
    opts = opts || {};
    var key = opts.key != null ? String(opts.key).replace(/^\s+|\s+$/g, "") : "";
    if (!key) return false;
    var kind = opts.kind != null ? String(opts.kind) : "";
    if (!USER_KINDS[kind]) return false;
    var year = opts.year != null ? String(opts.year) : "";
    var rec = { v: 1, year: year, key: key, kind: kind, real: true, ts: Date.now() };
    var extra = opts.extra;
    if (extra && typeof extra === "object" && !Array.isArray(extra)) {
      var name;
      for (name in extra) {
        if (!Object.prototype.hasOwnProperty.call(extra, name)) continue;
        if (extra[name] === undefined) continue;
        if (name === "v" || name === "real" || name === "key" || name === "ts" || name === "year") continue;
        if (name === "kind") {
          if (!USER_KINDS[String(extra[name])]) rec.step = extra[name];
          continue;
        }
        rec[name] = extra[name];
      }
    }
    rec.v = 1;
    rec.year = year;
    rec.key = key;
    rec.kind = kind;
    rec.real = true;
    return saveJSON(key, rec) === true;
  }

  function userRead(key) {
    if (key == null || String(key).replace(/^\s+|\s+$/g, "") === "") return null;
    var rec = loadJSON(String(key), null);
    if (!rec || typeof rec !== "object" || Array.isArray(rec)) return null;
    return rec;
  }

  function userFinished(key) {
    var rec = userRead(key);
    return !!(rec && rec.real === true);
  }

  function userFailStore() {
    var err = new Error("This browser blocked the save.");
    err.name = "QuotaExceededError";
    throw err;
  }

  function userEnvelope(value) {
    return !!(
      value &&
      typeof value === "object" &&
      !Array.isArray(value) &&
      value.v === 1 &&
      value.real === true &&
      typeof value.key === "string" &&
      USER_KINDS[String(value.kind)]
    );
  }

  /* A read-modify-write of an envelope must edit the original payload, not the wrapper. */
  function userUnwrap(value) {
    if (!userEnvelope(value)) return value;
    if (Object.prototype.hasOwnProperty.call(value, "body")) return value.body;
    var copy = {};
    var skip = { v: 1, real: 1, key: 1, ts: 1, year: 1, kind: 1, step: 1 };
    var name;
    for (name in value) {
      if (!Object.prototype.hasOwnProperty.call(value, name)) continue;
      if (skip[name]) continue;
      copy[name] = value[name];
    }
    return copy;
  }

  function userAdopt(value) {
    var payload = userUnwrap(value);
    if (typeof payload !== "string") return payload;
    var text = payload.replace(/^\s+/, "");
    if (text.charAt(0) !== "{" && text.charAt(0) !== "[") return payload;
    try {
      var decoded = JSON.parse(payload);
      if (decoded && typeof decoded === "object") return userUnwrap(decoded);
    } catch (e) { /* invite counters and mute flags stay strings */ }
    return payload;
  }

  function userInferYear(key, payload) {
    if (
      payload &&
      typeof payload === "object" &&
      !Array.isArray(payload) &&
      payload.year != null &&
      /^\d{4}$/.test(String(payload.year))
    ) {
      return String(payload.year);
    }
    var m = String(key).match(/^itt(\d{2})-/);
    if (m) {
      var n = parseInt(m[1], 10);
      return (n >= 94 ? "19" : "20") + m[1];
    }
    try {
      var y = immersionYear("");
      if (y) return y;
    } catch (eY) { /* */ }
    return "";
  }

  function userInferKind(key, payload) {
    var k = String(key);
    if (payload && typeof payload === "object" && !Array.isArray(payload)) {
      if (payload.official === true) return "official";
      if (payload.leftover === true || payload.pack || payload.pop) return "leftover";
      if (payload.gameId) return "game";
      if (USER_KINDS[String(payload.kind || "")]) return String(payload.kind);
    }
    if (/^itt-yg-/.test(k) || /^itt-games-/.test(k)) return "shell";
    if (/-game(?:-|$)/.test(k)) return "game";
    return "toy";
  }

  /**
   * Brand, game, and toy writes. Objects keep their fields on the envelope.
   * Arrays, strings, and numbers live on body so readers can unwrap them.
   * Throws when the browser refuses the write (existing try/catch stays honest).
   * null clears the key.
   */
  function userStore(key, value, opts) {
    opts = opts || {};
    key = key != null ? String(key).replace(/^\s+|\s+$/g, "") : "";
    if (!key) userFailStore();
    if (value === null || value === undefined) {
      try {
        localStorage.removeItem(key);
        return true;
      } catch (eRm) {
        userFailStore();
      }
    }
    var payload = userAdopt(value);
    var kind = opts.kind != null && USER_KINDS[String(opts.kind)] ? String(opts.kind) : userInferKind(key, payload);
    var year = opts.year != null && String(opts.year) !== "" ? String(opts.year) : userInferYear(key, payload);
    var extra;
    var name;
    if (payload && typeof payload === "object" && !Array.isArray(payload)) {
      extra = {};
      for (name in payload) {
        if (!Object.prototype.hasOwnProperty.call(payload, name)) continue;
        if (payload[name] === undefined) continue;
        extra[name] = payload[name];
      }
      extra.body = payload;
    } else {
      extra = { body: payload };
    }
    if (userSave({ key: key, year: year, kind: kind, extra: extra }) !== true) userFailStore();
    return true;
  }

  /** Original payload. Legacy raw JSON still parses. Plain "1" / "6" stay strings. */
  function userTake(key, fallback) {
    var hasFallback = arguments.length > 1;
    try {
      var raw = localStorage.getItem(key);
      if (raw == null || raw === "") return hasFallback ? fallback : null;
      var parsed;
      try {
        parsed = JSON.parse(raw);
      } catch (eRaw) {
        return raw;
      }
      if (
        parsed &&
        typeof parsed === "object" &&
        !Array.isArray(parsed) &&
        parsed.v === 1 &&
        Object.prototype.hasOwnProperty.call(parsed, "body")
      ) {
        return parsed.body;
      }
      if (parsed && typeof parsed === "object") return parsed;
      if (parsed === null) return hasFallback ? fallback : null;
      return raw;
    } catch (e) {
      return hasFallback ? fallback : null;
    }
  }

  ITT.User = {
    save: userSave,
    read: userRead,
    finished: userFinished,
    store: userStore,
    take: userTake
  };
})(typeof window !== "undefined" ? window : this);
