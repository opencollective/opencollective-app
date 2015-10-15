const jsdom = require('jsdom');

/**
 * A super simple DOM ready for React to render into
 */

global.document = jsdom.jsdom('<!doctype html><html><body></body></html>');
global.window = document.parentWindow;

/**
 * Mock implementation of localstorage
 */

global.localStorage = {
  store: {},
  getItem(key) { return this.store[key]; },
  setItem(key, value) { this.store[key] = value; },
  clear() { this.store = {}; }
};
