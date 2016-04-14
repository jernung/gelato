/**
 * @class Router
 * @extends {GelatoRouter}
 */
var Router = Gelato.Router.extend({
  /**
   * @method initialize
   * @constructor
   */
  initialize: function(options) {
  },
  /**
   * @property routes
   * @type {Object}
   */
  routes: {
    '': 'navigateHome',
    '*route': 'navigateHome'
  },
  /**
   * @method navigateHome
   */
  navigateHome: function() {
    this.go('pages/home');
  }
});

module.exports = Router;
