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
    el: 'gelato-navbars',
    /**
     * @property $navbar
     * @type {jQuery}
     */
    $navbar: null,
    /**
     * @method renderTemplate
     * @param {Object} [properties]
     * @returns {GelatoNavbar}
     */
    renderTemplate: function(properties) {
        GelatoView.prototype.renderTemplate.call(this, properties);
        this.$navbar = $(this.$('gelato-navbar').get(0));
        this.adjustBodyPadding();
        return this;
    },
    /**
     * @method adjustBodyPadding
     */
    adjustBodyPadding: function() {
        if (this.$navbar.hasClass('fixed-bottom')) {
            $('body').css('padding-bottom', this.$navbar.height());
        } else if (this.$navbar.hasClass('fixed-top')) {
            $('body').css('padding-top', this.$navbar.height());
        }
    },
    /**
     * @method getName
     * @returns {String}
     */
    getName: function() {
        return this.$('gelato-navbar').data('name');
    },
    /**
     * @method hide
     * @returns {GelatoNavbar}
     */
    hide: function() {
        this.$navbar.hide();
        return this;
    },
    /**
     * @method remove
     * @returns {GelatoNavbar}
     */
    remove: function() {
        return GelatoView.prototype.remove.call(this);
    },
    /**
     * @method show
     * @returns {GelatoNavbar}
     */
    show: function() {
        this.$navbar.show();
        return this;
    }
});
