var Router = require('./router');

/**
 * @class Application
 * @extends {GelatoApplication}
 */
var Application = Gelato.Application.extend({
  /**
   * @method initialize
   * @param {Object} [options]
   * @constructor
   */
  initialize: function(options) {
    this.router = new Router();
  },
  /**
   * @property defaults
   * @type {Object}
   */
  defaults: {
    locale: 'default'
  },
  /**
   * @method start
   */
  start: function() {
    this.router.start();
  }
});

module.exports = Application;
