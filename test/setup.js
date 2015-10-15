import jsdom from 'jsdom';
import mockLocalStorage from './helpers/mockLocalStorage';

/**
 * A super simple DOM ready for React to render into
 */

global.document = jsdom.jsdom('<!doctype html><html><body></body></html>');
global.window = document.parentWindow;

/**
 * Mock implementation of localstorage
 */

global.localStorage = mockLocalStorage;
