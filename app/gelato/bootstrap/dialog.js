var GelatoView = require('gelato/view');

/**
 * @class GelatoDialog
 * @extends {GelatoView}
 */
module.exports = GelatoView.extend({
    /**
     * @property el
     * @type {String}
     */
    el: 'bootstrap-dialogs',
    /**
     * @property element
     * @type {jQuery}
     */
    element: null,
    /**
     * @method renderTemplate
     * @param {Object} [properties]
     * @returns {GelatoView}
     */
    renderTemplate: function(properties) {
        GelatoView.prototype.renderTemplate.call(this, properties);
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
        options = options || {};
        options.backdrop = options.backdrop || 'static';
        options.keyboard = options.keyboard || false;
        options.show = options.show || true;
        options.remote = options.remote || false;
        this.render().element.modal(options);
        return this;
    }
});
