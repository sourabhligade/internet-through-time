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
      path: "pages/about.html",
      kind: "literacy",
      key: "itt99-thesis-ack",
      hook: "[data-itt-real-save]",
      complete: { action: "literacy", expect: "multiStep" }
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
      path: "pages/about.html",
      kind: "literacy",
      key: "itt01-thesis-ack",
      hook: "[data-itt-real-save]",
      complete: { action: "literacy", expect: "multiStep" }
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
      path: "pages/about.html",
      kind: "literacy",
      key: "itt03-thesis-ack",
      hook: "[data-itt-real-save]",
      complete: { action: "literacy", expect: "multiStep" }
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
      year: "2007",
      prefix: "itt07",
      path: "sites/facebook/beacon.html",
      kind: "literacy",
      key: "itt07-beacon-ack",
      hook: "[data-itt-real-save]",
      complete: { action: "literacy", expect: "multiStep" }
    },
    {
      year: "2008",
      prefix: "itt08",
      path: "pages/about.html",
      kind: "literacy",
      key: "itt08-thesis-ack",
      hook: "[data-itt-real-save]",
      complete: { action: "literacy", expect: "multiStep" }
    },
    {
      year: "2009",
      prefix: "itt09",
      path: "pages/about.html",
      kind: "literacy",
      key: "itt09-thesis-ack",
      hook: "[data-itt-real-save]",
      complete: { action: "literacy", expect: "multiStep" }
    },
    {
      year: "2010",
      prefix: "itt10",
      path: "sites/cablegate/index.html",
      kind: "literacy",
      key: "itt10-cablegate-ack",
      hook: "[data-cablegate-ack]",
      complete: { action: "cablegate", expect: null }
    },
    {
      year: "2011",
      prefix: "itt11",
      path: "pages/about.html",
      kind: "literacy",
      key: "itt11-thesis-ack",
      hook: "[data-itt-real-save]",
      complete: { action: "literacy", expect: "multiStep" }
    },
    {
      year: "2012",
      prefix: "itt12",
      path: "pages/about.html",
      kind: "literacy",
      key: "itt12-thesis-ack",
      hook: "[data-itt-real-save]",
      complete: { action: "literacy", expect: "multiStep" }
    },
    {
      year: "2013",
      prefix: "itt13",
      path: "sites/xboxone/index.html",
      kind: "literacy",
      key: "itt13-xbox",
      hook: "[data-xbox-ack]",
      complete: { action: "xbox", expect: null }
    }
  ];
})(typeof window !== "undefined" ? window : this);
