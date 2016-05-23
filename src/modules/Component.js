/**
 * @class GelatoComponent
 * @extends {GelatoView}
 */
Gelato.Component = Gelato.View.extend({
  /**
   * @method renderTemplate
   * @param {Object} [context]
   * @returns {GelatoPage}
   */
  renderTemplate: function(context) {
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
