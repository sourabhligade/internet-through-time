/**
 * Browser navigate helpers (SRP)
 * Pure path / URL / location-bar resolution used by browser/create.js.
 * No DOM history or iframe side effects — those stay in create.js.
 */
(function (global) {
  "use strict";
  var ITT = global.ITT || (global.ITT = {});

  function U() {
    return ITT.util;
  }

  function normalizePath(path, year, home) {
    return U().normalizeYearPath(path, year, home);
  }

  function yearRoot(year) {
    return U().yearRootPath(year);
  }

  /**
   * Absolute content URL for iframe src (year root + rel path + query).
   * @param {string} year
   * @param {string} relPath
   * @param {string} home
   */
  function absContentUrl(year, relPath, home) {
    relPath = normalizePath(relPath || home, year, home);
    var q = "";
    var qi = relPath.indexOf("?");
    if (qi !== -1) {
      q = relPath.slice(qi);
      relPath = relPath.slice(0, qi);
    }
    if (relPath.indexOf("pages/sites/") === 0) relPath = relPath.slice("pages/".length);
    if (relPath.indexOf("sites/pages/") === 0) relPath = relPath.slice("sites/".length);
    return yearRoot(year) + relPath.replace(/^\//, "") + q;
  }

  /**
   * Resolve an immersion/content href to { external, path|href }.
   */
  function resolveHref(href, currentPath, year, home) {
    if (!href) return null;
    try {
      if (href.indexOf("http://") === 0 || href.indexOf("https://") === 0) {
        var absU = new URL(href, window.location.href);
        if (absU.origin === window.location.origin) {
          href = absU.pathname + absU.search + absU.hash;
        } else {
          return { external: true, href: href };
        }
      }
    } catch (eAbs) { /* keep href */ }
    var marker = "/years/" + year + "/";
    var mi = href.indexOf(marker);
    if (mi !== -1) {
      return { external: false, path: normalizePath(href.slice(mi + marker.length), year, home) };
    }
    var resolved = U().resolveRelativePath(href, currentPath);
    if (resolved && !resolved.external && resolved.path) {
      resolved.path = normalizePath(resolved.path, year, home);
    }
    return resolved;
  }

  /**
   * Fake location bar URL from year-relative path + config maps.
   * @param {string} path
   * @param {object} config year browser config (urlMap, urlPrefixes, fallbackUrlBase, displayUrlExtras)
   */
  function displayUrl(path, config) {
    config = config || {};
    var year = String(config.year || "");
    var home = config.home || "pages/home.html";
    var URL_MAP = config.urlMap || {};
    var URL_PREFIXES = config.urlPrefixes || [];
    var FALLBACK_BASE = config.fallbackUrlBase || ("http://home.nerf.edu/web" + year + "/");
    var clean = normalizePath(path, year, home).split("?")[0];
    if (URL_MAP[clean]) return URL_MAP[clean];

    if (typeof config.displayUrlExtras === "function") {
      var extra = config.displayUrlExtras(clean);
      if (extra) return extra;
    }

    for (var i = 0; i < URL_PREFIXES.length; i++) {
      var rule = URL_PREFIXES[i];
      if (clean.indexOf(rule.prefix) === 0) {
        var rest = clean.slice(rule.prefix.length);
        if (rule.stripIndex) rest = rest.replace(/\/index\.html$/, "/").replace(/^index\.html$/, "");
        return rule.base + rest;
      }
    }
    return FALLBACK_BASE + clean;
  }

  function hostFromDisplayUrl(url) {
    return U().hostFromUrl(url);
  }

  /**
   * Window title from path + titleMap.
   */
  function displayTitle(path, config) {
    config = config || {};
    var year = String(config.year || "");
    var home = config.home || "pages/home.html";
    var TITLE_MAP = config.titleMap || {};
    var TITLE_SUFFIX = config.browserTitleSuffix || " - Netscape";
    var clean = normalizePath(path, year, home).split("?")[0];
    if (TITLE_MAP[clean]) return TITLE_MAP[clean] + TITLE_SUFFIX;
    var parts = clean.split("/");
    var last = parts[parts.length - 1].replace(".html", "").replace(/_/g, " ");
    if (last === "index" && parts.length > 1) last = parts[parts.length - 2].replace(/_/g, " ");
    if (clean.indexOf("sites/yahoo/") === 0) return "Yahoo! - " + last + TITLE_SUFFIX;
    return last.charAt(0).toUpperCase() + last.slice(1) + TITLE_SUFFIX;
  }

  /**
   * Defense: collapse bogus pages/sites/* joins before navigate.
   */
  function sanitizeNavPath(path, year, home) {
    path = normalizePath(path, year, home);
    if (path.indexOf("pages/sites/") === 0) path = path.slice("pages/".length);
    if (path.indexOf("sites/pages/") === 0) path = path.slice("sites/".length);
    return path;
  }

  /**
   * Match Open Location / address bar input to an exhibit path.
   * @returns {{path:string}|{protocolHelper:true,val:string}|{unreachable:true,val:string}|null}
   *   null = empty input
   */
  function matchOpenLocation(val, urlMap, locationHints) {
    val = (val || "").trim();
    if (!val) return null;
    var lower = val.toLowerCase();
    urlMap = urlMap || {};
    locationHints = locationHints || [];

    /* Prefer longest urlMap match so /iphone/ wins over apple.com/ and
       /windows-7/ wins over microsoft.com/ (prefix collision). */
    var bestPath = null;
    var bestLen = -1;
    for (var k in urlMap) {
      if (Object.prototype.hasOwnProperty.call(urlMap, k)) {
        var mapped = String(urlMap[k]).toLowerCase();
        if (mapped === lower || lower.indexOf(mapped) === 0) {
          if (mapped.length > bestLen) {
            bestLen = mapped.length;
            bestPath = k;
          }
        }
      }
    }
    if (bestPath) return { path: bestPath };

    for (var h = 0; h < locationHints.length; h++) {
      var hint = locationHints[h];
      if (hint.re && hint.re.test(val)) {
        return { path: hint.path };
      }
    }

    if (lower.indexOf("gopher:") === 0 || lower.indexOf("ftp:") === 0) {
      return { protocolHelper: true, val: val };
    }

    return { unreachable: true, val: val };
  }

  ITT.BrowserNavigate = {
    normalizePath: normalizePath,
    yearRoot: yearRoot,
    absContentUrl: absContentUrl,
    resolveHref: resolveHref,
    displayUrl: displayUrl,
    hostFromDisplayUrl: hostFromDisplayUrl,
    displayTitle: displayTitle,
    sanitizeNavPath: sanitizeNavPath,
    matchOpenLocation: matchOpenLocation
  };
})(typeof window !== "undefined" ? window : this);
