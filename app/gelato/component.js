var GelatoView = require('gelato/view');

/**
 * @class GelatoComponent
 * @extends {GelatoView}
 */
module.exports = GelatoView.extend({
    /**
     * @property $element
     * @type {jQuery}
     */
    $element: null,
    /**
     * @property application
     * @type {GelatoApplication}
     */
    app: null,
    /**
     * @method renderTemplate
     * @param {Object} [properties]
     * @returns {GelatoView}
     */
    renderTemplate: function(properties) {
        GelatoView.prototype.renderTemplate.call(this, properties);
        this.$element = $(this.$('gelato-component').get(0));
        return this;
    },
    /**
     * @method createComponent
     * @param {String} name
     * @param {Object} [options]
     * @returns {GelatoComponent}
     */
    createComponent: function(name, options) {
        return new (require('components/' + name + '/view'))(options, this.app);
    },
    /**
     * @method hide
     * @returns {GelatoComponent}
     */
    hide: function() {
        this.$element.hide();
        return this;
    },
    /**
     * @method remove
     * @returns {GelatoComponent}
     */
    remove: function() {
        this.$element.empty();
        this.$element.find('*').off();
        return GelatoView.prototype.remove.call(this);
    },
    /**
     * @method show
     * @returns {GelatoComponent}
     */
    show: function() {
        this.$element.show();
        return this;
    }
});
