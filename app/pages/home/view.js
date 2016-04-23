/**
 * @class HomePage
 * @extends {GelatoPage}
 */
var HomePage = Gelato.Page.extend({
  /**
   * @method initialize
   * @param {Object} [options]
   * @constructor
   */
  initialize: function(options) {
  },
  /**
   * @property template
   * @type {Function}
   */
  template: require('./template'),
  /**
   * @property title
   * @type {String}
   */
  title: app.locale('title') + ' - ' + app.locale('version'),
  /**
   * @method render
   * @returns {HomePage}
   */
  render: function() {
    this.renderTemplate();
    return this;
  }
});

module.exports = HomePage;
