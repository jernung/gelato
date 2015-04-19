/**
 * @module Core
 */
define([
    'core/modules/GelatoView'
], function(GelatoView) {

    /**
     * @class GelatoPage
     * @extends GelatoView
     */
    var GelatoPage = GelatoView.extend({
        /**
         * @property el
         * @type String
         */
        el: 'gelato-application',
        /**
         * @property title
         * @type String
         */
        title: i18n.global.title,
        /**
         * @method renderTemplate
         * @param {String} template
         * @returns {GelatoView}
         */
        renderTemplate: function(template) {
            GelatoView.prototype.renderTemplate.call(this, template);
            this.adjustNavbarPadding();
            return this;
        },
        /**
         * @method adjustNavbarPadding
         * @returns {GelatoPage}
         */
        adjustNavbarPadding: function() {
            var navbarFixedBottom = this.$('.navbar-fixed-bottom');
            var navbarFixedTop = this.$('.navbar-fixed-top');
            if (navbarFixedBottom) {
                this.$el.css('padding-bottom', navbarFixedBottom.height());
            } else {
                this.$el.css('padding-bottom', '');
            }
            if (navbarFixedTop) {
                this.$el.css('padding-top', navbarFixedTop.height());
            } else {
                this.$el.css('padding-top', '');
            }
            return this;
        },
        /**
         * @method getName
         * @returns {String}
         */
        getName: function() {
            return this.$('gelato-page').data('name');
        }
    });

    return GelatoPage;

});