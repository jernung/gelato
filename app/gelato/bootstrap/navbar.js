var GelatoView = require('gelato/view');

/**
 * @class GelatoNavbar
 * @extends {GelatoView}
 */
module.exports = GelatoView.extend({
    /**
     * @property el
     * @type {String}
     */
    el: 'bootstrap-navbars',
    /**
     * @method renderTemplate
     * @param {Object} [properties]
     * @returns {GelatoNavbar}
     */
    renderTemplate: function(properties) {
        GelatoView.prototype.renderTemplate.call(this, properties);
        this.adjustBodyPadding();
        return this;
    },
    /**
     * @method adjustBodyPadding
     */
    adjustBodyPadding: function() {
        if (this.$el.hasClass('fixed-bottom')) {
            $('body').css('padding-bottom', this.$el.height());
        } else if (this.$el.hasClass('fixed-top')) {
            $('body').css('padding-top', this.$el.height());
        }
    }
});
