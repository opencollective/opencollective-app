import { jsdom } from 'jsdom';
import localStorage from 'localmockage';

/**
 * A super simple DOM ready for React to render into
 */

const doc = jsdom('<!doctype html><html><body></body></html>');

global.document = doc;
global.window = doc.defaultView;

/**
 * Mock implementation of localstorage
 */

global.localStorage = localStorage;
