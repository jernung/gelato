class GelatoStorage {

  constructor(prefix) {
    this._storage = window.localStorage;
    this._prefix = prefix || '';
  }

  clear() {
    this._storage.clear();
  }

  has(key) {
    return this._storage.getItem(this._prefix + key) ? true : false;
  }

  get(key) {
    try {
      return JSON.parse(this._storage.getItem(this._prefix + key))
    } catch (error) {
      return null;
    }
  }

  remove(key) {
    this._storage.removeItem(this._prefix + key);
  }

  set(key, value) {
    this._storage.setItem(this._prefix + key, JSON.stringify(value));
  }

}

Gelato = Gelato || {};

Gelato.Storage = GelatoStorage;
