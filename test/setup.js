import jsdom from 'jsdom';
import localStorage from 'localmockage';

/**
 * A super simple DOM ready for React to render into
 */

global.document = jsdom.jsdom('<!doctype html><html><body></body></html>');
global.window = document.parentWindow;
global.window.__env = {
  stripePublicKey: 'pk_test_5olkhgG5FgJDHcGpJllmCj6z'
};

/**
 * Mock implementation of localstorage
 */

global.localStorage = localStorage;
