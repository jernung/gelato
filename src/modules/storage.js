/**
 * @class Storage
 * @param {String} [prefix]
 * @constructor
 */
Gelato.Storage = function(prefix) {
  this.prefix = prefix || '';
};

/**
 * @method clear
 * @param {String} key
 */
Gelato.Storage.prototype.clear = function(key) {
  window.localStorage.clear();
};

/**
 * @method has
 * @param {String} key
 * @returns {Boolean}
 */
Gelato.Storage.prototype.has = function(key) {
  return window.localStorage.getItem(this.prefix + key) ? true : false;
};

/**
 * @method get
 * @param {String} key
 * @returns {*}
 */
Gelato.Storage.prototype.get = function(key) {
  try {
    return JSON.parse(window.localStorage.getItem(this.prefix + key))
  } catch (error) {
    return null;
  }
};

/**
 * @method remove
 * @param {String} key
 */
Gelato.Storage.prototype.remove = function(key) {
  window.localStorage.removeItem(this.prefix + key);
};

/**
 * @method set
 * @param {String} key
 * @param {*} value
 */
Gelato.Storage.prototype.set = function(key, value) {
  window.localStorage.setItem(this.prefix + key, JSON.stringify(value));
};
