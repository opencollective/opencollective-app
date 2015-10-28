export default {
  store: {},
  getItem(key) { return this.store[key]; },
  removeItem(key) { delete this.store[key]; },
  setItem(key, value) { this.store[key] = value; },
  clear() { this.store = {}; }
};
