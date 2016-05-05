/**
 * @class GelatoView
 * @extends {Backbone.View}
 */
Gelato.View = Backbone.View.extend({
  /**
   * @property $view
   * @type {jQuery}
   */
  $view: null,
  /**
   * @property template
   * @type {Function}
   */
  template: null,
  /**
   * @param {String} [selector]
   * @returns {GelatoView}
   */
  disableForm: function(selector) {
    this.$((selector ? selector + ' ' : '') + ':input').prop('disabled', true);
    return this;
  },
  /**
   * @param {String} [selector]
   * @returns {GelatoView}
   */
  enableForm: function(selector) {
    this.$((selector ? selector + ' ' : '') + ':input').prop('disabled', false);
    return this;
  },
  /**
   * @method getHeight
   * @returns {Number}
   */
  getHeight: function() {
    return this.$view.height();
  },
  /**
   * @method getWidth
   * @returns {Number}
   */
  getWidth: function() {
    return this.$view.width();
  },
  /**
   * @method handleClickDataNavigate
   * @param {Event} event
   */
  handleClickDataNavigate: function(event) {
    var $target = $(event.target);
    var href = $target.attr('href');
    var navigate = $target.attr('navigate');
    event.preventDefault();
    if (navigate === 'navigate') {
      window.app.router.navigate(href, {trigger: true});
    } else {
      window.app.router.navigate(navigate, {trigger: true});
    }
  },
  /**
   * @method getContext
   * @param {Object} [context]
   * @returns {Object}
   */
  getContext: function(context) {
    var globals = require('context');
    globals.view = this;
    globals = $.extend(true, globals, context || {});
    return globals;
  },
  /**
   * @method hide
   * @returns {GelatoView}
   */
  hide: function() {
    this.$view.hide(arguments.length ? arguments : 0);
    return this;
  },
  /**
   * @method parseTemplate
   * @param {Function} template
   * @param {Object} [context]
   * @returns {Object}
   */
  parseTemplate: function(template, context) {
    return _.isFunction(template) ? template(this.getContext(context)) : template;
  },
  /**
   * @method remove
   * @returns {GelatoView}
   */
  remove: function() {
    this.stopListening();
    this.undelegateEvents();
    this.$el.find('*').off();
    this.$el.empty();
    return this;
  },
  /**
   * @method render
   * @returns {GelatoView}
   */
  render: function() {
    this.renderTemplate();
    return this;
  },
  /**
   * @method renderTemplate
   * @param {Object} [context]
   * @returns {GelatoView}
   */
  renderTemplate: function(context) {
    this.$view = $(this.parseTemplate(this.template, context));
    this.$el.html(this.$view);
    this.$('[navigate]').on('click', this.handleClickDataNavigate);
    return this;
  },
  /**
   * @method show
   * @returns {GelatoView}
   */
  show: function() {
    this.$view.show(arguments.length ? arguments : 0);
    return this;
  }
});
