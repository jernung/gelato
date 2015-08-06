var GelatoView = require('gelato/view');

/**
 * @class GelatoSidebar
 * @extends {GelatoView}
 */
module.exports = GelatoView.extend({
    /**
     * @property el
     * @type {String}
     */
    el: 'gelato-sidebars',
    /**
     * @property element
     * @type {jQuery}
     */
    element: null,
    /**
     * @property navigation
     * @type {jQuery}
     */
    navigation: null,
    /**
     * @method renderTemplate
     * @param {Object} [properties]
     * @returns {GelatoSidebar}
     */
    renderTemplate: function(properties) {
        GelatoView.prototype.renderTemplate.call(this, properties);
        this.element = this.$('[role="navigation"]');
        this.element.on('hide.bs.offcanvas', $.proxy(this.handleElementHide, this));
        this.element.on('hidden.bs.offcanvas', $.proxy(this.handleElementHidden, this));
        this.element.on('show.bs.offcanvas', $.proxy(this.handleElementShow, this));
        this.element.on('shown.bs.offcanvas', $.proxy(this.handleElementShown, this));
        return this;
    },
    /**
     * @property events
     * @type Object
     */
    events: {},
    /**
     * @method close
     * @returns {GelatoSidebar}
     */
    close: function() {
        this.element.offcanvas('hide');
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
        this.navigation.remove();
        this.navigation.find('*').off();
        this.remove();
        app.sidebar = null;
    },
    /**
     * @method handleElementShow
     */
    handleElementShow: function() {
        this.trigger('show');
        app.sidebar = this;
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
     * @returns {GelatoSidebar}
     */
    open: function(options) {
        options = options || {};
        this.element.offcanvas({canvas: 'body', toggle: false});
        this.element.offcanvas('show');
        this.navigation = $('body > [role="navigation"]');
        return this;
    }
});
