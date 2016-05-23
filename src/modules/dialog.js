/**
 * @class GelatoDialog
 * @extends {GelatoView}
 */
Gelato.Dialog = Gelato.View.extend({
  /**
   * @property el
   * @type {String}
   */
  el: 'gelato-dialogs',
  /**
   * @property element
   * @type {jQuery}
   */
  element: null,
  /**
   * @method renderTemplate
   * @param {Object} [context]
   * @returns {GelatoDialog}
   */
  renderTemplate: function(context) {
    Gelato.View.prototype.renderTemplate.call(this, context);
    this.element = this.$('[role="dialog"]');
    this.element.on('hide.bs.modal', _.bind(this.handleElementHide, this));
    this.element.on('hidden.bs.modal', _.bind(this.handleElementHidden, this));
    this.element.on('show.bs.modal', _.bind(this.handleElementShow, this));
    this.element.on('shown.bs.modal', _.bind(this.handleElementShown, this));
    return this;
  },
  /**
   * @method close
   * @returns {GelatoDialog}
   */
  close: function() {
    this.element.modal('hide');
    return this;
  },
  /**
   * @method handleElementHide
   */
  handleElementHide: function() {
    this.trigger('hide');
  },
  /**
   * @method handleElementHidden
   */
  handleElementHidden: function() {
    this.trigger('hidden');
    this.remove();
  },
  /**
   * @method handleElementShow
   */
  handleElementShow: function() {
    this.trigger('show');
  },
  /**
   * @method handleElementShown
   */
  handleElementShown: function() {
    this.trigger('shown');
  },
  /**
   * @method open
   * @param {Object} [options]
   * @returns {GelatoDialog}
   */
  open: function(options) {
    options = _.defaults(
      options || {},
      {
        backdrop: 'static',
        keyboard: false,
        show: true,
        remote: false
      }
    );
    this.render();
    this.element.modal(options);
    return this;
  }
});
