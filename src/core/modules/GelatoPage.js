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
         * @property bodyClass
         * @type String
         */
        bodyClass: null,
        /**
         * @method renderTemplate
         * @param {String} template
         * @returns {GelatoView}
         */
        renderTemplate: function(template) {
            $('body').addClass(this.bodyClass);
            GelatoView.prototype.renderTemplate.call(this, template);
            this.adjustNavbarPadding();
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
                this.$el.css('padding-bottom', navbarFixedBottom.height());
            } else {
                this.$el.css('padding-bottom', '');
            }
            if (navbarFixedTop.length) {
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
        },
        /**
         * @method remove
         * @returns {GelatoPage}
         */
        remove: function() {
            $('body').removeClass(this.bodyClass);
            return GelatoView.prototype.remove.call(this);
        }
    });

    return GelatoPage;

});