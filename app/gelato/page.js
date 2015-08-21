var GelatoView = require('gelato/view');

/**
 * @class GelatoPage
 * @extends {GelatoView}
 */
module.exports = GelatoView.extend({
    /**
     * @property title
     * @type {String}
     */
    title: null,
    /**
     * @property el
     * @type {String}
     */
    el: 'gelato-application',
    /**
     * @property $page
     * @type {jQuery}
     */
    $page: null,
    /**
     * @method renderTemplate
     * @param {Object} [properties]
     * @returns {GelatoPage}
     */
    renderTemplate: function(properties) {
        GelatoView.prototype.renderTemplate.call(this, properties);
        this.$page = $(this.$('gelato-page').get(0));
        return this;
    },
    /**
     * @method adjustNavbarPadding
     * @returns {GelatoPage}
     */
    adjustNavbarPadding: function() {
        var navbarFixedBottom = this.$('.fixed-bottom');
        var navbarFixedTop = this.$('.fixed-top');
        if (navbarFixedBottom.length) {
            $('body').css('padding-bottom', navbarFixedBottom.height());
        } else {
            $('body').css('padding-bottom', '');
        }
        if (navbarFixedTop.length) {
            $('body').css('padding-top', navbarFixedTop.height());
        } else {
            $('body').css('padding-top', '');
        }
        return this;
    },
    /**
     * @method getName
     * @returns {String}
     */
    getName: function() {
        return this.$('gelato-page').data('name');
    },
    /**
     * @method hide
     * @returns {GelatoPage}
     */
    hide: function() {
        this.$page.hide();
        return this;
    },
    /**
     * @method remove
     * @returns {GelatoPage}
     */
    remove: function() {
        return GelatoView.prototype.remove.call(this);
    },
    /**
     * @method show
     * @returns {GelatoPage}
     */
    show: function() {
        this.$page.show();
        return this;
    }
});
