/**
 * @class GelatoPage
 * @extends {GelatoView}
 */
Gelato.Page = Gelato.View.extend({
  /**
   * @property el
   * @type {String}
   */
  el: 'gelato-page',
  /**
   * @property title
   * @type {Function|String}
   */
  title: null,
  /**
   * @method renderTemplate
   * @param {Object} [context]
   * @returns {GelatoPage}
   */
  renderTemplate: function(context) {
    document.title = _.result(this, 'title');
    return Gelato.View.prototype.renderTemplate.call(this, context);
  },
  /**
   * @method remove
   * @returns {GelatoPage}
   */
  remove: function() {
    return Gelato.View.prototype.remove.call(this);
  }
});
