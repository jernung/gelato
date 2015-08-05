var GelatoView = require('gelato/view');

/**
 * @class GelatoComponent
 * @extends {GelatoView}
 */
module.exports = GelatoView.extend({
    /**
     * @property $component
     * @type {jQuery}
     */
    $component: null,
    /**
     * @method renderTemplate
     * @returns {GelatoView}
     */
    renderTemplate: function() {
        GelatoView.prototype.renderTemplate.call(this);
        this.$component = $(this.$('gelato-component').get(0));
        return this;
    },
    /**
     * @method hide
     * @returns {GelatoComponent}
     */
    hide: function() {
        this.$component.hide();
        return this;
    },
    /**
     * @method show
     * @returns {GelatoComponent}
     */
    show: function() {
        this.$component.show();
        return this;
    }
});
