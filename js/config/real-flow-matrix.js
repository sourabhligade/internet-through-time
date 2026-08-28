/**
 * REAL-flow matrix — signature product flows every year must support.
 * Consumed by e2e/all-years-real-system.spec.js
 * kind: 'product' = existing immersion hook · 'literacy' = data-itt-real-save panel
 */
(function (global) {
  "use strict";
  var ITT = global.ITT || (global.ITT = {});

  /**
   * @typedef {{
   *   year: string,
   *   prefix: string,
   *   path: string,
   *   kind: 'product'|'literacy',
   *   key: string,
   *   incomplete?: { action: string },
   *   complete: { action: string, expect?: string },
   *   hook?: string
   * }} RealFlowRow
   */

  /** @type {RealFlowRow[]} */
  ITT.REAL_FLOW_MATRIX = [
    {
      year: "1994",
      prefix: "itt",
      path: "sites/personal/guestbook.html",
      kind: "product",
      key: "gb-",
      keyMatch: true,
      hook: "form[data-guestbook], form[name='guestbook'], [data-guestbook-form], form",
      complete: { action: "guestbook", expect: null }
    },
    {
      year: "1995",
      prefix: "itt95",
      path: "sites/amazon/book-neuromancer.html",
      kind: "product",
      key: "itt95-amazon-cart",
      hook: "[data-add-cart]",
      complete: { action: "cart", expect: null }
    },
    {
      year: "1996",
      prefix: "itt96",
      path: "sites/hotmail/index.html",
      kind: "product",
      key: "itt96",
      keyMatch: true,
      hook: "form[data-hotmail-login], form",
      complete: { action: "hotmail", expect: null }
    },
    {
      year: "1997",
      prefix: "itt97",
      path: "sites/ebay/item-laptop.html",
      kind: "product",
      key: "itt97",
      keyMatch: true,
      hook: "form[data-bid-form]",
      complete: { action: "bid", expect: null }
    },
    {
      year: "1998",
      prefix: "itt98",
      path: "sites/google/index.html",
      kind: "product",
      key: "itt98",
      keyMatch: true,
      hook: "form[data-google-search], form",
      complete: { action: "google", expect: null }
    },
    {
      year: "1999",
      prefix: "itt99",
      path: "sites/aim/index.html",
      kind: "product",
      key: "itt99-aim",
      hook: "form[data-aim-signon]",
      complete: { action: "aim", expect: null }
    },
    {
      year: "2000",
      prefix: "itt00",
      path: "sites/amazon/index.html",
      kind: "product",
      key: "itt00-amazon-cart",
      hook: "[data-add-cart]",
      complete: { action: "cart", expect: null }
    },
    {
      year: "2001",
      prefix: "itt01",
      path: "sites/wikipedia/edit.html",
      kind: "product",
      key: "itt01-wiki-pages",
      hook: "[data-wiki-save]",
      complete: { action: "wiki", expect: null }
    },
    {
      year: "2002",
      prefix: "itt02",
      path: "sites/friendster/index.html",
      kind: "product",
      key: "itt02",
      keyMatch: true,
      hook: "[data-friendster], form, [data-add-friend]",
      complete: { action: "friendster", expect: null }
    },
    {
      year: "2003",
      prefix: "itt03",
      path: "sites/photobucket/index.html",
      kind: "product",
      key: "itt03-photobucket",
      hook: "form[data-pb-upload]",
      complete: { action: "photobucket", expect: null }
    },
    {
      year: "2004",
      prefix: "itt04",
      path: "sites/gmail/index.html",
      kind: "product",
      key: "itt04-gmail",
      hook: "[data-gmail-login], form",
      complete: { action: "gmail", expect: null }
    },
    {
      year: "2005",
      prefix: "itt05",
      path: "sites/youtube/upload.html",
      kind: "product",
      key: "itt05-yt-uploads",
      hook: "[data-yt-upload]",
      complete: { action: "yt", expect: null }
    },
    {
      year: "2006",
      prefix: "itt06",
      path: "sites/twitter/index.html",
      kind: "product",
      key: "itt06-tweets",
      hook: "[data-twitter-compose]",
      complete: { action: "twitter", expect: null }
    },
    {
      year: "2008",
      prefix: "itt08",
      path: "sites/github/issue.html",
      kind: "product",
      key: "itt08-github",
      hook: "form[data-gh-issue-form]",
      complete: { action: "github", expect: null }
    },
    {
      year: "2009",
      prefix: "itt09",
      path: "sites/stackoverflow/index.html",
      kind: "product",
      key: "itt09-stackoverflow",
      hook: "[data-so-ask], form",
      complete: { action: "so", expect: null }
    },
                            
  ];
})(typeof window !== "undefined" ? window : this);
