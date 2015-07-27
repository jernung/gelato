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
    el: 'gelato-dialogs',
    /**
     * @property element
     * @type {jQuery}
     */
    element: null,
    /**
     * @method renderTemplate
     * @returns {GelatoView}
     */
    renderTemplate: function() {
        GelatoView.prototype.renderTemplate.call(this);
        this.element = this.$('[role="dialog"]');
        this.element.on('hide.bs.modal', $.proxy(this.handleElementHide, this));
        this.element.on('hidden.bs.modal', $.proxy(this.handleElementHidden, this));
        this.element.on('show.bs.modal', $.proxy(this.handleElementShow, this));
        this.element.on('shown.bs.modal', $.proxy(this.handleElementShown, this));
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
        app.dialog = null;
    },
    /**
     * @method handleElementShow
     */
    handleElementShow: function() {
        this.trigger('show');
        app.dialog = this;
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
        this.element.modal(options);
        return this;
    }
});
